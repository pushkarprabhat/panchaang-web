"use client";

import { useState } from "react";
import PanchangView from "../panchang-view";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.panchaang.in";

export default function ComparePage() {
  const [a, setA] = useState("Ahmedabad");
  const [b, setB] = useState("Varanasi");
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
  const [err, setErr] = useState("");

  function run(e) {
    e.preventDefault();
    setErr("");
    Promise.all([
      fetch(`${API}/v1/panchang?city=${encodeURIComponent(a)}`).then((r) => r.json()),
      fetch(`${API}/v1/panchang?city=${encodeURIComponent(b)}`).then((r) => r.json()),
    ])
      .then(([x, y]) => {
        setLeft(x);
        setRight(y);
      })
      .catch(() => setErr("Engine offline"));
  }

  return (
    <>
      <p className="eyebrow">Travel</p>
      <h1>Same moment, two cities</h1>
      <p className="lead">Sunrise changes the civil tithi. Useful before a yatra.</p>
      <form className="card" onSubmit={run}>
        <p>
          <input value={a} onChange={(e) => setA(e.target.value)} />{" "}
          <input value={b} onChange={(e) => setB(e.target.value)} />
        </p>
        <button type="submit">Compare now</button>
        {err && <p className="muted">{err}</p>}
      </form>
      <div className="grid two" style={{ marginTop: "1rem" }}>
        <div className="card">
          <strong>{a}</strong>
          {left ? <PanchangView data={left} /> : <p className="muted">—</p>}
        </div>
        <div className="card">
          <strong>{b}</strong>
          {right ? <PanchangView data={right} /> : <p className="muted">—</p>}
        </div>
      </div>
    </>
  );
}
