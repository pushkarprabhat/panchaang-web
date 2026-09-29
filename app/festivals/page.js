"use client";

import { useEffect, useState } from "react";
import { tithiName } from "../panchang-labels";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.panchaang.in";

const WATCH = [
  { label: "Shukla Ekadashi", paksha: "Shukla", tithi: 11 },
  { label: "Purnima", paksha: "Shukla", tithi: 15 },
  { label: "Krishna Ekadashi", paksha: "Krishna", tithi: 11 },
  { label: "Amavasya", paksha: "Krishna", tithi: 15 },
];

export default function FestivalsPage() {
  const [city, setCity] = useState("Ahmedabad");
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");

  function load(c) {
    setErr("");
    Promise.all(
      WATCH.map((w) =>
        fetch(
          `${API}/v1/next-tithi?city=${encodeURIComponent(c)}&paksha=${w.paksha}&tithi=${w.tithi}&days=80`
        )
          .then((r) => r.json())
          .then((d) => ({ ...w, hits: d.hits || [] }))
      )
    )
      .then(setRows)
      .catch(() => setErr("Engine offline"));
  }

  useEffect(() => {
    load(city);
  }, []);

  return (
    <>
      <p className="eyebrow">Look ahead</p>
      <h1>Ekadashi, purnima, amavasya</h1>
      <p className="lead">
        Next dates from the engine for this city. Festival *names* (Ekadashi titles, Diwali)
        are not labelled yet — only the tithi.
      </p>
      <p>
        <input value={city} onChange={(e) => setCity(e.target.value)} />{" "}
        <button type="button" onClick={() => load(city)}>
          Refresh
        </button>
      </p>
      {err && <p className="muted">{err}</p>}
      <div className="grid two">
        {rows.map((r) => (
          <div className="card" key={r.label}>
            <strong>{r.label}</strong>
            <p className="muted">
              {tithiName(r.tithi, r.paksha)} · {r.paksha}
            </p>
            <ul>
              {(r.hits || []).slice(0, 4).map((h) => (
                <li key={h.date}>{h.date}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
