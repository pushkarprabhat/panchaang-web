"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PLACES } from "../../data/places";
import { observances, tithiName } from "../panchang-labels";
import { festivalsOn } from "../../data/festivals-2026";
import { eclipsesOn } from "../../data/eclipses";
import { bandsOn, panchakMarksOn } from "../../data/bands-2026";
import { TithiMoon } from "../sky-icons";
import LangToggle from "../lang-toggle";
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

function hm(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(d);
}

function dayLabel(iso) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
  }).format(new Date(iso));
}

function pakshaMark(p) {
  if (p === "Shukla") return "Sh";
  if (p === "Krishna") return "Kr";
  return p || "";
}

export default function CalendarPage() {
  const now = new Date();
  const [city, setCity] = useState("Ahmedabad");
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [days, setDays] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("city");
    if (PLACES.some((p) => p.name === requested)) setCity(requested);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const controller = new AbortController();
    setErr("");
    setDays([]);
    setLoading(true);
    fetch(`${API}/v1/calendar?city=${encodeURIComponent(city)}&year=${year}&month=${month}`, { signal: controller.signal })
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((d) => { if (!controller.signal.aborted) setDays(d.days || []); })
      .catch(() => { if (!controller.signal.aborted) setErr("Panchang data could not be loaded. Select a month or city to try again."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    const noon = new Date(Date.UTC(year, month - 1, 1, 6, 30, 0)).toISOString();
    fetch(`${API}/v1/panchang?city=${encodeURIComponent(city)}&date_time=${encodeURIComponent(noon)}`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (!controller.signal.aborted) setPlanets(d?.planets || []); })
      .catch(() => { if (!controller.signal.aborted) setPlanets([]); });
    return () => controller.abort();
  }, [city, year, month, ready]);

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
    if (dt.getFullYear() < 100 || dt.getFullYear() > 9999) return;
    setYear(dt.getFullYear());
    setMonth(dt.getMonth() + 1);
  }

  function downloadIcs() {
    const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Panchaang.in//EN", "CALSCALE:GREGORIAN"];
    for (const c of cells) {
      if (!c) continue;
      const row = byDate[c.key];
      const named = festivalsOn(c.key).map((f) => f.name);
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
      <h1>Your month, at a glance.</h1>
      <p className="lead">Panchang, observances and planetary transits for your city. Browse, download or print the month.</p>
      <div className="row calendar-toolbar">
        <button type="button" onClick={() => shift(-1)} aria-label="Previous month">←</button>
        <strong>{first.toLocaleString("en-IN", { month: "long", year: "numeric" })}</strong>
        <button type="button" onClick={() => shift(1)} aria-label="Next month">→</button>
        <select aria-label="Month" value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(2026, i, 1).toLocaleString("en-IN", { month: "short" })}
            </option>
          ))}
        </select>
        <input aria-label="Year" type="number" min="100" max="9999" value={year} onChange={(e) => setYear(Math.min(9999, Math.max(100, Number(e.target.value))))} style={{ width: 90 }} />
        <select aria-label="City" value={city} onChange={(e) => setCity(e.target.value)}>
          {Array.from(new Set([...CITIES, city])).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <LangToggle />
        <button type="button" disabled={loading || !!err || !days.length} onClick={downloadIcs}>Download month (.ics)</button>
        <button type="button" onClick={() => window.print()}>Print / PDF</button>
      </div>
      <p className="calendar-caption">{city} · {first.toLocaleString("en-IN", { month: "long", year: "numeric" })}</p>
      <div role="status">{loading ? <p>Loading month…</p> : err ? <p>{err}</p> : !days.length ? <p>No panchang data is available for this month.</p> : null}</div>

      <div className="calendar-board">
        <div className="calendar-scroll" role="region" aria-label="Month calendar" tabIndex={0}>
          <div className="cal" role="list" aria-label="Days of the month">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((h) => (
              <div className="cal-h" aria-hidden="true" key={h}>{h}</div>
            ))}
            {cells.map((c, i) => {
              if (!c) return <div className="cal-cell empty" aria-hidden="true" key={`e${i}`} />;
              const row = byDate[c.key];
              const named = festivalsOn(c.key);
              const ecl = eclipsesOn(c.key);
              const bands = bandsOn(c.key);
              const panchak = panchakMarksOn(c.key);
              const vrats = row ? observances(row) : [];
              const weekend = dowClass(year, month, c.d);
              const weekendLabel = weekend === "dow-sun" ? "Sun" : weekend === "dow-sat-off" ? `${satNumber(year, month, c.d) === 2 ? "2nd" : "4th"} Sat` : "Sat";
              const cls = ["cal-cell", weekend, ...bands.map((b) => `band-${b.id}`)].join(" ");
              return (
                <div className={cls} key={c.key} role="listitem" aria-label={new Date(Date.UTC(year, month - 1, c.d)).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}>
                  <div className="cal-date"><strong className="cal-daynum">{c.d}</strong>
                    {weekend && <span className="weekend-label">{weekendLabel}</span>}
                  </div>
                  {row && (
                    <span className="cal-tithi">
                      <TithiMoon tithi={row.tithi_number} paksha={row.paksha} size={22} />
                      {pakshaMark(row.paksha)} {tithiName(row.tithi_number, row.paksha)}
                    </span>
                  )}
                  {row && (
                    <span className="muted cal-sun">Rise {hm(row.sunrise)} · Set {hm(row.sunset)}</span>
                  )}
                  {row && row.saura_rashi && (
                    <span className="muted">{row.saura_rashi}{row.surya_rashi_exits ? ` → ${dayLabel(row.surya_rashi_exits)}` : ""}</span>
                  )}
                  {panchak.map((p) => (
                    <span className="band-label" key={p.label}>{p.label}</span>
                  ))}
                  {bands.filter((b) => b.id !== "panchak" || panchak.length === 0).map((b) => (
                    <span className="band-label" key={b.id}>{b.label}</span>
                  ))}
                  {vrats.map((v) => (
                    <em key={v}>{v}</em>
                  ))}
                  {named.map((f) => (
                    <em key={f.name}>{f.name}{f.state ? ` · ${f.state}` : ""}</em>
                  ))}
                  {ecl.map((e) => (
                    <em key={e.kind}>{e.type} {e.kind}</em>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <aside className="calendar-side" aria-labelledby="planet-heading">
          <h2 className="reference-heading" id="planet-heading">Planet transits</h2>
          {planets.length === 0 ? (
            <p className="muted">Planet transit data is not available for this selection.</p>
          ) : (
            <table className="side-table">
              <caption className="sr-only">Planet transits for {city}</caption>
              <thead>
                <tr><th scope="col">Planet</th><th scope="col">Rashi</th><th scope="col">Entered</th><th scope="col">Exits</th></tr>
              </thead>
              <tbody>
                {planets.map((p) => (
                  <tr key={p.body}>
                    <td>{p.body}</td>
                    <td>{p.name}</td>
                    <td>{dayLabel(p.entered)} {hm(p.entered)}</td>
                    <td>{dayLabel(p.exits)} {hm(p.exits)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </aside>
      </div>

      <h2 className="reference-heading" id="day-heading">Day table</h2>
      <div className="calendar-scroll day-scroll" role="region" aria-labelledby="day-heading" tabIndex={0}>
        <table className="side-table day-table">
          <caption className="sr-only">Daily panchang and end times for {city}</caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Tithi</th>
              <th scope="col">Tithi ends</th>
              <th scope="col">Nakshatra</th>
              <th scope="col">Nakshatra ends</th>
              <th scope="col">Karana</th>
              <th scope="col">Karana ends</th>
              <th scope="col">Yoga</th>
              <th scope="col">Yoga ends</th>
              <th scope="col">Sunset</th>
            </tr>
          </thead>
          <tbody>
            {days.map((row) => (
              <tr key={row.date}>
                <td>{row.date}</td>
                <td>{pakshaMark(row.paksha)} {tithiName(row.tithi_number, row.paksha)}</td>
                <td>{hm(row.tithi_end)}</td>
                <td>{row.nakshatra || "—"}</td>
                <td>{hm(row.nakshatra_end)}</td>
                <td>{row.karana || "—"}</td>
                <td>{hm(row.karana_end)}</td>
                <td>{row.yoga || "—"}</td>
                <td>{hm(row.yoga_end)}</td>
                <td>{hm(row.sunset)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="calendar-legend">
        <p><strong>Legend</strong></p>
        <ul>
          <li><strong>Sun / Sat</strong> mark weekends; <strong>2nd / 4th Sat</strong> mark typical bank holidays.</li>
          <li><strong>Panchak</strong> is labelled on every day in its marked period.</li>
          <li><strong>Sh</strong> = Shukla paksha. <strong>Kr</strong> = Krishna paksha.</li>
          <li>Moon disc = tithi at sunrise. Larger light area = more illumination.</li>
          <li>Rise / Set = sunrise and sunset at the selected city (IST).</li>
          <li>A dash indicates unavailable data.</li>
        </ul>
      </div>
      <p className="calendar-plans"><Link href="/pricing">Explore family and temple plans →</Link></p>
    </>
  );
}
