"use client";

import { useState } from "react";
import PanchangView from "../panchang-view";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.panchaang.in";

export default function WidgetPage() {
  const [city, setCity] = useState("Ahmedabad");
  const [data, setData] = useState(null);
  const snippet = `<script src="https://panchaang.in/embed.js" data-city="${city}" data-api="https://api.panchaang.in"></script>`;

  function preview(e) {
    e.preventDefault();
    fetch(`${API}/v1/panchang?city=${encodeURIComponent(city)}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }

  return (
    <>
      <p className="eyebrow">Embed</p>
      <h1>Temple widget</h1>
      <p className="lead">One script tag. Same engine as this site.</p>
      <form className="card" onSubmit={preview}>
        <p>
          <label className="muted">City on the widget</label>
          <br />
          <input value={city} onChange={(e) => setCity(e.target.value)} />
        </p>
        <button type="submit">Preview</button>
        <pre>{snippet}</pre>
        {data && <PanchangView data={data} />}
      </form>
    </>
  );
}
