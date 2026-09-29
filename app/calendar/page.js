"use client";

import { useEffect, useMemo, useState } from "react";
import { observances, tithiName } from "../panchang-labels";
import { festivalsOn } from "../../data/festivals-2026";
import { eclipsesOn } from "../../data/eclipses";
import "./calendar.css";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.panchaang.in";
const CITIES = ["Ahmedabad", "Ujjain", "Jaipur", "Mumbai", "Delhi", "Varanasi", "Kolkata", "Chennai"];

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
      </p>
      {err && <p className="muted">{err}</p>}
      <div className="cal">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((h) => (
          <div className="cal-h" key={h}>{h}</div>
        ))}
        {cells.map((c, i) => {
          if (!c) return <div className="cal-cell empty" key={`e${i}`} />;
          const row = byDate[c.key];
          const named = festivalsOn(c.key);
          const ecl = eclipsesOn(c.key);
          const vrats = row ? observances(row) : [];
          return (
            <div className="cal-cell" key={c.key}>
              <strong>{c.d}</strong>
              {row && (
                <span className="muted">
                  {row.paksha[0]} {tithiName(row.tithi_number, row.paksha)}
                </span>
              )}
              {vrats.map((v) => (
                <em key={v}>{v}</em>
              ))}
              {named.map((f) => (
                <em key={f.name}>{f.name}</em>
              ))}
              {ecl.map((e) => (
                <em key={e.kind}>{e.type} {e.kind} eclipse</em>
              ))}
            </div>
          );
        })}
      </div>
      <p className="muted">Tithi from the engine. Eclipses are NASA civil dates, not a city visibility map.</p>
    </>
  );
}
