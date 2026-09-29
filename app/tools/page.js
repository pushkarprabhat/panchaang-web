"use client";

import { useState } from "react";
import Link from "next/link";
import PanchangView from "../panchang-view";
import { ist } from "../panchang-labels";

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

function toRfc(dateStr) {
  return `${dateStr}T06:30:00+05:30`;
}

export default function ToolsPage() {
  const [city, setCity] = useState("Ahmedabad");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [system, setSystem] = useState("amanta");
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

  const [ce, setCe] = useState(2026);

  function placeQuery() {
    if (lat && lon) return `latitude=${lat}&longitude=${lon}`;
    return `city=${encodeURIComponent(city)}`;
  }

  function runForward(e) {
    e.preventDefault();
    setFerr("");
    setForward(null);
    fetch(
      `${API}/v1/panchang?${placeQuery()}&month_system=${system}&date_time=${encodeURIComponent(toRfc(gDate))}`
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
      samvat_year: String(samvat),
      era,
      lunar_month: String(lmonth),
      paksha,
      tithi: String(tithi),
      month_system: system,
    });
    if (lat && lon) {
      q.set("latitude", lat);
      q.set("longitude", lon);
    } else {
      q.set("city", city);
    }
    fetch(`${API}/v1/to-gregorian?${q}`)
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.message || JSON.stringify(d));
        setRev(d);
      })
      .catch((err) => setRerr(String(err.message || err)));
  }

  function runNext(e) {
    e.preventDefault();
    setNext(null);
    fetch(`${API}/v1/next-tithi?${placeQuery()}&paksha=${pakshaN}&tithi=${tithiN}&days=90`)
      .then((r) => r.json())
      .then(setNext)
      .catch(() => setNext({ error: "offline" }));
  }

  return (
    <>
      <p className="eyebrow">Utilities</p>
      <h1>Converters and lookups</h1>
      <p className="lead">
        Both directions. City name or raw lat/long. Also{" "}
        <Link href="/compare">compare two cities</Link> and{" "}
        <Link href="/festivals">upcoming ekadashi / purnima</Link>.
      </p>

      <p className="muted">Place used by the tools below</p>
      <div className="card" style={{ marginBottom: "1.2rem" }}>
        <p>
          <label className="muted">City</label>
          <br />
          <input value={city} onChange={(e) => setCity(e.target.value)} />
        </p>
        <p>
          <label className="muted">Or lat, long</label>
          <br />
          <input
            placeholder="23.02"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            style={{ width: 120 }}
          />{" "}
          <input
            placeholder="72.57"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            style={{ width: 120 }}
          />
        </p>
        <p>
          <label className="muted">Month system</label>
          <br />
          <select value={system} onChange={(e) => setSystem(e.target.value)}>
            <option value="amanta">Amanta (Gujarat / South)</option>
            <option value="purnimanta">Purnimanta (North print)</option>
          </select>
        </p>
      </div>

      <h2>Gregorian → five limbs</h2>
      <form className="card" onSubmit={runForward}>
        <p>
          <label className="muted">Civil date</label>
          <br />
          <input type="date" value={gDate} onChange={(e) => setGDate(e.target.value)} />
        </p>
        <button type="submit">Calculate</button>
        {ferr && <p className="muted">{ferr}</p>}
        {forward && <PanchangView data={forward} />}
      </form>

      <h2>Samvat + tithi → civil date</h2>
      <form className="card" onSubmit={runReverse}>
        <p>
          <select value={era} onChange={(e) => setEra(e.target.value)}>
            <option value="vikrama">Vikrama</option>
            <option value="shaka">Shaka</option>
          </select>{" "}
          <input type="number" value={samvat} onChange={(e) => setSamvat(Number(e.target.value))} />
        </p>
        <p>
          <select value={lmonth} onChange={(e) => setLmonth(Number(e.target.value))}>
            {MONTHS.map(([n, name]) => (
              <option key={n} value={n}>
                {n}. {name}
              </option>
            ))}
          </select>{" "}
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
        <button type="submit">Find sunrise</button>
        <p className="muted">May return more than one date until month names are locked in the engine.</p>
        {rerr && <p className="muted">{rerr}</p>}
        {rev && (
          <table>
            <thead>
              <tr>
                <th>Sunrise (IST)</th>
                <th>Tithi start</th>
                <th>Tithi end</th>
              </tr>
            </thead>
            <tbody>
              {(rev.matches || []).map((m) => (
                <tr key={m.sunrise_at_tithi}>
                  <td>{ist(m.sunrise_at_tithi)}</td>
                  <td>{ist(m.date_time_start)}</td>
                  <td>{ist(m.date_time_end)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </form>

      <h2>Next occurrence</h2>
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
        <button type="submit">Next 90 days</button>
        {next?.hits && (
          <ul>
            {next.hits.map((h) => (
              <li key={h.date}>
                {h.date} — {h.paksha} {h.tithi_number}
              </li>
            ))}
          </ul>
        )}
        {next?.error && <p className="muted">Engine offline</p>}
      </form>

      <h2>Year numbers only</h2>
      <div className="card">
        <p>
          Gregorian{" "}
          <input type="number" value={ce} onChange={(e) => setCe(Number(e.target.value))} style={{ width: 100 }} />
        </p>
        <p>
          Vikrama ≈ <strong>{ce + 57}</strong> · Shaka ≈ <strong>{ce - 78}</strong>
        </p>
        <p className="muted">
          Year labels only. New Year day is not 1 January. Use the converters above for a tithi.
        </p>
      </div>
    </>
  );
}
