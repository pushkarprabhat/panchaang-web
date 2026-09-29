"use client";

import { useEffect, useState } from "react";
import PanchangView from "./panchang-view";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.panchaang.in";

export default function TodayBox() {
  const [city, setCity] = useState("Ahmedabad");
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch(`${API}/v1/panchang?city=${encodeURIComponent(city)}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setErr("Engine offline"));
  }, [city]);

  return (
    <div className="card">
      <label className="muted">City</label>
      <div style={{ margin: "0.4rem 0 0.8rem" }}>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          {["Ahmedabad", "Ujjain", "Jaipur", "Mumbai", "Delhi"].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      {data ? <PanchangView data={data} /> : <p className="muted">{err || "Loading…"}</p>}
    </div>
  );
}
