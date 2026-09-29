"use client";

import { useState } from "react";
import PanchangView from "../panchang-view";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.panchaang.in";

const MONTHS = [
  [1, "Chaitra"],
  [2, "Vaishakha"],
  [3, "Jyeshtha"],
  [4, "Ashadha"],
  [5, "Shravana"],
  [6, "Bhadrapada"],
  [7, "Ashwin"],
  [8, "Kartika"],
  [9, "Margashirsha"],
  [10, "Pausha"],
  [11, "Magha"],
  [12, "Phalguna"],
];

export default function ToolsPage() {
  const [city, setCity] = useState("Ahmedabad");
  const [gDate, setGDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [forward, setForward] = useState(null);
  const [ferr, setFerr] = useState("");

  const [samvat, setSamvat] = useState(2083);
  const [era, setEra] = useState("vikrama");
  const [lmonth, setLmonth] = useState(6);
  const [paksha, setPaksha] = useState("Shukla");
  const [tithi, setTithi] = useState(1);
  const [rev, setRev] = useState(null);
  const [rerr, setRerr] = useState("");

  const [pakshaN, setPakshaN] = useState("Shukla");
  const [tithiN, setTithiN] = useState(11);
  const [next, setNext] = useState(null);

  function toRfc(dateStr) {
    return `${dateStr}T06:30:00+05:30`;
  }

  function runForward(e) {
    e.preventDefault();
    setFerr("");
    setForward(null);
    fetch(
      `${API}/v1/panchang?city=${encodeURIComponent(city)}&date_time=${encodeURIComponent(toRfc(gDate))}`
    )
      .then((r) => r.json())
      .then(setForward)
      .catch(() => setFerr("Engine offline"));
  }

  function runReverse(e) {
    e.preventDefault();
    setRerr("");
    setRev(null);
    const q = new URLSearchParams({
      city,
      samvat_year: String(samvat),
      era,
      lunar_month: String(lmonth),
      paksha,
      tithi: String(tithi),
    });
    fetch(`${API}/v1/to-gregorian?${q}`)
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.message || d.error || r.statusText);
        setRev(d);
      })
      .catch((err) => {
        const y = era === "shaka" ? samvat + 78 : samvat - 57;
        setRerr(
          `${err.message}. Year-only estimate: Vikrama ${era === "vikrama" ? samvat : samvat + 135} ≈ ${y} CE. Full tithi search needs the new API on the server.`
        );
      });
  }

  function runNext(e) {
    e.preventDefault();
    setNext(null);
    fetch(
      `${API}/v1/next-tithi?city=${encodeURIComponent(city)}&paksha=${pakshaN}&tithi=${tithiN}&days=60`
    )
      .then((r) => r.json())
      .then(setNext)
      .catch(() => setNext({ error: "offline" }));
  }

  return (
    <>
      <p className="eyebrow">Utilities</p>
      <h1>Convert dates</h1>
      <p className="lead">
        Gregorian ↔ Hindu panchang for a city. Vikrama ≈ CE + 57. Shaka ≈ CE − 78.
        Exact civil day also needs tithi + paksha + month.
      </p>

      <h2>Gregorian → panchang</h2>
      <form className="card" onSubmit={runForward}>
        <p>
          <label className="muted">City</label>
          <br />
          <input value={city} onChange={(e) => setCity(e.target.value)} />
        </p>
        <p>
          <label className="muted">Gregorian date</label>
          <br />
          <input type="date" value={gDate} onChange={(e) => setGDate(e.target.value)} />
        </p>
        <button type="submit">Show five limbs</button>
        {ferr && <p className="muted">{ferr}</p>}
        {forward && <PanchangView data={forward} />}
      </form>

      <h2>Samvat + tithi → Gregorian</h2>
      <form className="card" onSubmit={runReverse}>
        <p>
          <label className="muted">Era</label>
          <br />
          <select value={era} onChange={(e) => setEra(e.target.value)}>
            <option value="vikrama">Vikrama</option>
            <option value="shaka">Shaka</option>
          </select>
        </p>
        <p>
          <label className="muted">Samvat year</label>
          <br />
          <input type="number" value={samvat} onChange={(e) => setSamvat(Number(e.target.value))} />
        </p>
        <p>
          <label className="muted">Lunar month</label>
          <br />
          <select value={lmonth} onChange={(e) => setLmonth(Number(e.target.value))}>
            {MONTHS.map(([n, name]) => (
              <option key={n} value={n}>
                {n}. {name}
              </option>
            ))}
          </select>
        </p>
        <p>
          <label className="muted">Paksha / tithi</label>
          <br />
          <select value={paksha} onChange={(e) => setPaksha(e.target.value)}>
            <option>Shukla</option>
            <option>Krishna</option>
          </select>{" "}
          <input
            type="number"
            min="1"
            max="15"
            value={tithi}
            onChange={(e) => setTithi(Number(e.target.value))}
            style={{ width: 80 }}
          />
        </p>
        <button type="submit">Find civil date</button>
        {rerr && <p className="muted">{rerr}</p>}
        {rev && (
          <pre>{JSON.stringify(rev, null, 2)}</pre>
        )}
      </form>

      <h2>Next tithi (alert helper)</h2>
      <form className="card" onSubmit={runNext}>
        <p>
          <select value={pakshaN} onChange={(e) => setPakshaN(e.target.value)}>
            <option>Shukla</option>
            <option>Krishna</option>
          </select>{" "}
          tithi{" "}
          <input
            type="number"
            min="1"
            max="15"
            value={tithiN}
            onChange={(e) => setTithiN(Number(e.target.value))}
            style={{ width: 80 }}
          />
        </p>
        <button type="submit">Find next 60 days</button>
        {next && <pre>{JSON.stringify(next, null, 2)}</pre>}
      </form>
    </>
  );
}
