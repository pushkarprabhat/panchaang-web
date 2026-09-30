"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { PLACES } from "../data/places";
import PanchangView from "./panchang-view";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.panchaang.in";

function nearest(lat, lon) {
  let best = PLACES[0];
  let d0 = 1e9;
  for (const p of PLACES) {
    const d = (p.lat - lat) ** 2 + (p.lon - lon) ** 2;
    if (d < d0) {
      d0 = d;
      best = p;
    }
  }
  return best;
}

export default function PlacePanel({ compact }) {
  const requestId = useRef(0);
  const [q, setQ] = useState("Ahmedabad");
  const [place, setPlace] = useState(PLACES[0]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [locNote, setLocNote] = useState("");

  const hits = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 2) return PLACES.slice(0, 8);
    return PLACES.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.admin.toLowerCase().includes(s) ||
        p.country.toLowerCase().includes(s)
    ).slice(0, 12);
  }, [q]);

  function load(p) {
    const id = ++requestId.current;
    setErr("");
    setData(null);
    fetch(
      `${API}/v1/panchang?city=${encodeURIComponent(p.name)}&latitude=${p.lat}&longitude=${p.lon}`
    )
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((d) => { if (id === requestId.current) setData(d); })
      .catch(() => { if (id === requestId.current) setErr("Today’s panchang could not be loaded. Please try again."); });
  }

  function locate() {
    if (!navigator.geolocation) { setLocNote("Location is unavailable. Please choose a city."); return; }
    const id = ++requestId.current;
    setLocNote("Finding your nearest city…");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (id !== requestId.current) return;
        const near = nearest(pos.coords.latitude, pos.coords.longitude);
        pick(near);
        setLocNote(`Using the nearest listed city: ${near.name}`);
      },
      () => { if (id === requestId.current) { setLocNote("Location is unavailable. Please choose a city."); load(place); } },
      { timeout: 10000 }
    );
  }

  useEffect(() => {
    load(PLACES[0]);
    return () => { requestId.current += 1; };
  }, []);

  function pick(p) {
    setPlace(p);
    setQ(p.name);
    setOpen(false);
    setData(null);
    setLocNote("");
    load(p);
  }

  const mapSrc = `https://maps.google.com/maps?q=${place.lat},${place.lon}&z=11&output=embed`;

  return (
    <div className={compact ? "" : "grid two"}>
      <section className="card today-card" id="today" aria-labelledby="today-heading">
        <p className="eyebrow">01 · Your daily panchang</p>
        <h2 id="today-heading">Today in {place.name}</h2>
        <label htmlFor="city-search" className="field-label">Choose your city</label>
        <p className="muted city-help" id="city-help">Times depend on your location. Search and select a city below.</p>
        <input
          id="city-search"
          type="search"
          aria-describedby="city-help"
          aria-expanded={open}
          aria-controls="city-suggestions"
          onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search city, state or country"
          style={{ width: "100%" }}
        />
        <button className="location-button" type="button" onClick={locate}>Use my location</button>
        {locNote && <p className="muted" role="status">{locNote}</p>}
        {open && (
          <ul className="suggest" id="city-suggestions">
            {hits.length === 0 && <li className="empty-search">No matching city. Try a nearby city or state.</li>}
            {hits.map((p) => (
              <li key={`${p.iso2}-${p.name}-${p.admin}`}>
                <button type="button" className="suggest-btn" onClick={() => pick(p)}>
                  <strong>{p.name}</strong>
                  <span className="muted">
                    {" "}
                    {p.admin}, {p.country}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="today-actions">
          <Link className="btn" href={`/calendar?city=${encodeURIComponent(place.name)}`}>View month & download →</Link>
          <span className="muted">Calendar file (.ics) or print / PDF</span>
        </div>
        <div aria-live="polite" aria-busy={!data && !err}>
          {data ? <PanchangView data={data} /> : <p className="muted">{err || "Loading today’s panchang…"}</p>}
        </div>
        {err && <button type="button" onClick={() => load(place)}>Try again</button>}
      </section>
      {!compact && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <iframe title="map" src={mapSrc} width="100%" height="360" style={{ border: 0, display: "block" }} loading="lazy" />
        </div>
      )}
    </div>
  );
}
