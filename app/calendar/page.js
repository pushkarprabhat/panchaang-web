"use client";

import { useEffect, useMemo, useState } from "react";
import { observances, tithiName } from "../panchang-labels";
import { festivalsOn } from "../../data/festivals-2026";
import { eclipsesOn } from "../../data/eclipses";
import { bandsOn } from "../../data/bands-2026";
import "./calendar.css";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.panchaang.in";
const CITIES = ["Ahmedabad", "Ujjain", "Jaipur", "Mumbai", "Delhi", "Varanasi", "Kolkata", "Chennai"];

function icsEscape(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,");
}

function satNumber(year, month, day) {
  let n = 0;
  for (let d = 1; d <= day; d += 1) {
    if (new Date(Date.UTC(year, month - 1, d)).getUTCDay() === 6) n += 1;
  }
  return n;
}

function dowClass(year, month, day) {
  const wd = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  if (wd === 0) return "dow-sun";
  if (wd === 6) {
    const n = satNumber(year, month, day);
    if (n === 2 || n === 4) return "dow-sat-off";
    return "dow-sat";
  }
  return "";
}

export default function CalendarPage() {
  const now = new Date();
  const [city, setCity] = useState("Ahmedabad");
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(now.getMonth() + 1 >= 10 ? 10 : now.getMonth() + 1);
  const [days, setDays] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    setErr("");
    fetch(`${API}/v1/calendar?city=${encodeURIComponent(city)}&year=${year}&month=${month}`)
      .then((r) => r.json())
      .then((d) => setDays(d.days || []))
      .catch(() => setErr("Engine offline"));
  }, [city, year, month]);

  const byDate = useMemo(() => {
    const m = {};
    for (const d of days) m[d.date] = d;
    return m;
  }, [days]);

  const first = new Date(Date.UTC(year, month - 1, 1));
  const startWeek = first.getUTCDay();
  const lastDate = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const cells = [];
  for (let i = 0; i < startWeek; i += 1) cells.push(null);
  for (let d = 1; d <= lastDate; d += 1) {
    const key = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ d, key });
  }

  function shift(delta) {
    const dt = new Date(year, month - 1 + delta, 1);
    setYear(dt.getFullYear());
    setMonth(dt.getMonth() + 1);
  }

  function downloadIcs() {
    const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Panchaang.in//EN", "CALSCALE:GREGORIAN"];
    for (const c of cells) {
      if (!c) continue;
      const row = byDate[c.key];
      const named = festivalsOn(c.key, city).map((f) => f.name);
      const vrats = row ? observances(row) : [];
      const title = [...named, ...vrats][0] || (row ? `${row.paksha} ${tithiName(row.tithi_number, row.paksha)}` : "");
      if (!title) continue;
      const ymd = c.key.replace(/-/g, "");
      lines.push("BEGIN:VEVENT", `DTSTART;VALUE=DATE:${ymd}`, `SUMMARY:${icsEscape(`${title} (${city})`)}`, "END:VEVENT");
    }
    lines.push("END:VCALENDAR");
    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `panchaang-${city}-${year}-${String(month).padStart(2, "0")}.ics`;
    a.click();
  }

  return (
    <>
      <p className="eyebrow">Month</p>
      <h1>Calendar</h1>
      <p className="row">
        <button type="button" onClick={() => shift(-1)}>Prev</button>
        <strong>{first.toLocaleString("en-IN", { month: "long", year: "numeric" })}</strong>
        <button type="button" onClick={() => shift(1)}>Next</button>
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(2026, i, 1).toLocaleString("en-IN", { month: "short" })}
            </option>
          ))}
        </select>
        <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} style={{ width: 90 }} />
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          {CITIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button type="button" onClick={downloadIcs}>Download .ics</button>
        <button type="button" onClick={() => window.print()}>Print / PDF</button>
      </p>
      {err && <p className="muted">{err}</p>}
      <div className="cal">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((h) => (
          <div className="cal-h" key={h}>{h}</div>
        ))}
        {cells.map((c, i) => {
          if (!c) return <div className="cal-cell empty" key={`e${i}`} />;
          const row = byDate[c.key];
          const named = festivalsOn(c.key, city);
          const ecl = eclipsesOn(c.key);
          const bands = bandsOn(c.key);
          const vrats = row ? observances(row) : [];
          const cls = ["cal-cell", dowClass(year, month, c.d), ...bands.map((b) => `band-${b.id}`)].join(" ");
          return (
            <div className={cls} key={c.key}>
              <strong>{c.d}</strong>
              {row && (
                <span className="muted">
                  {row.paksha[0]} {tithiName(row.tithi_number, row.paksha)}
                </span>
              )}
              {bands.map((b) => (
                <span className="band-label" key={b.id}>{b.label}</span>
              ))}
              {vrats.map((v) => (
                <em key={v}>{v}</em>
              ))}
              {named.map((f) => (
                <em key={f.name}>
                  {f.name}
                  {f.state ? ` · ${f.state}` : ""}
                </em>
              ))}
              {ecl.map((e) => (
                <em key={e.kind}>{e.type} {e.kind}</em>
              ))}
            </div>
          );
        })}
      </div>
      <p className="muted">
        Sunday = rose. Saturday = stone. 2nd and 4th Saturday = stronger stone (typical bank off).
        Festivals are an IN overlay with tithi + state. Not every mela in every district.
      </p>
    </>
  );
}
