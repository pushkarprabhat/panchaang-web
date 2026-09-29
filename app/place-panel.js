"use client";

import { useEffect, useMemo, useState } from "react";
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
    setErr("");
    fetch(
      `${API}/v1/panchang?city=${encodeURIComponent(p.name)}&latitude=${p.lat}&longitude=${p.lon}`
    )
      .then((r) => r.json())
      .then(setData)
      .catch(() => setErr("Engine offline"));
  }

  function loadCoords(lat, lon, label) {
    setErr("");
    fetch(`${API}/v1/panchang?latitude=${lat}&longitude=${lon}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setPlace({
          name: label || d.place?.name || "This location",
          admin: d.place?.province || "",
          country: d.place?.country || "",
          lat,
          lon,
          iso2: "XX",
        });
        setQ(label || `${lat.toFixed(3)}, ${lon.toFixed(3)}`);
      })
      .catch(() => setErr("Engine offline"));
  }

  useEffect(() => {
    load(PLACES[0]);
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const near = nearest(lat, lon);
        setLocNote(`Near ${near.name}`);
        loadCoords(lat, lon, near.name);
      },
      () => setLocNote("Ahmedabad default")
    );
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
      <div className="card">
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="City"
          style={{ width: "100%" }}
        />
        {locNote && <p className="muted">{locNote}</p>}
        {open && (
          <ul className="suggest">
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
        {data ? <PanchangView data={data} /> : <p className="muted">{err || "Loading…"}</p>}
      </div>
      {!compact && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <iframe title="map" src={mapSrc} width="100%" height="360" style={{ border: 0, display: "block" }} loading="lazy" />
        </div>
      )}
    </div>
  );
}
