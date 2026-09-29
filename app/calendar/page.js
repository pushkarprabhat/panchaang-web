"use client";

import { useEffect, useState } from "react";
import { tithiName } from "../panchang-labels";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.panchaang.in";

export default function CalendarPage() {
  const [city, setCity] = useState("Ahmedabad");
  const [days, setDays] = useState([]);
  const [meta, setMeta] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch(`${API}/v1/calendar?city=${encodeURIComponent(city)}`)
      .then((r) => r.json())
      .then((d) => {
        setDays(d.days || []);
        setMeta(d);
      })
      .catch(() => setErr("Engine offline"));
  }, [city]);

  return (
    <>
      <h1>Month calendar</h1>
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        {["Ahmedabad", "Ujjain", "Jaipur", "Mumbai", "Delhi"].map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      {meta && (
        <p className="muted">
          {meta.year}-{meta.month} · {meta.place?.name || city}
        </p>
      )}
      {err && <p className="muted">{err}</p>}
      {days.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Paksha</th>
              <th>Tithi</th>
            </tr>
          </thead>
          <tbody>
            {days.map((d) => (
              <tr key={d.date}>
                <td>{d.date}</td>
                <td>{d.paksha}</td>
                <td>
                  {d.tithi_number} {tithiName(d.tithi_number, d.paksha)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
