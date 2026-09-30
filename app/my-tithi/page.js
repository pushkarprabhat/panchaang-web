"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { tithiName } from "../panchang-labels";
import { KINDS, listRemembered, removeRemembered, saveRemembered } from "../tithi-memory";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.panchaang.in";
const CITIES = ["Ahmedabad", "Ujjain", "Jaipur", "Mumbai", "Delhi", "Varanasi", "Kolkata", "Chennai"];

export default function MyTithiPage() {
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({
    label: "",
    relation: "self",
    kind: "birthday",
    city: "Ahmedabad",
    gregorian: "",
    follow: "tithi",
    note: "",
  });

  useEffect(() => { setItems(listRemembered()); }, []);

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!form.label || !form.gregorian) {
      setErr("Name and a calendar date are required.");
      return;
    }
    setBusy(true);
    try {
      const iso = `${form.gregorian}T00:30:00.000Z`;
      const r = await fetch(`${API}/v1/panchang?city=${encodeURIComponent(form.city)}&date_time=${encodeURIComponent(iso)}`);
      if (!r.ok) throw new Error("engine");
      const j = await r.json();
      saveRemembered({
        ...form,
        paksha: j.paksha,
        tithi: j.tithi_number,
        nakshatra: j.nakshatra?.name || "",
      });
      setItems(listRemembered());
      setForm((f) => ({ ...f, label: "", note: "", gregorian: "" }));
    } catch {
      setErr("Could not read tithi for that date. Check the city and try again.");
    } finally {
      setBusy(false);
    }
  }

  function downloadList() {
    const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Panchaang.in//MyTithi", "CALSCALE:GREGORIAN"];
    for (const it of items) {
      if (!it.gregorian) continue;
      const ymd = it.gregorian.replace(/-/g, "");
      const title = `${it.label} (${it.paksha} ${tithiName(it.tithi, it.paksha)})`;
      lines.push("BEGIN:VEVENT", `DTSTART;VALUE=DATE:${ymd}`, `RRULE:FREQ=YEARLY`, `SUMMARY:${title}`, "END:VEVENT");
    }
    lines.push("END:VCALENDAR");
    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "my-tithi.ics";
    a.click();
  }

  return (
    <>
      <p className="eyebrow">My Tithi</p>
      <h1>Lock a life date to a tithi.</h1>
      <p className="lead">
        Enter a birthday, wedding or shraddh on the civil calendar. We store the sunrise tithi at that city.
        Next year we follow the <strong>tithi</strong>, not 14 June, unless you choose otherwise.
      </p>

      <form onSubmit={onSubmit} className="card" style={{ display: "grid", gap: "0.7rem", maxWidth: 36 * 16 }}>
        <label>Who is this for
          <input required value={form.label} onChange={(e) => set("label", e.target.value)} placeholder="Maa, Anaya, Dada" />
        </label>
        <label>Relation
          <select value={form.relation} onChange={(e) => set("relation", e.target.value)}>
            <option value="self">Self</option>
            <option value="family">Family</option>
            <option value="friend">Friend</option>
            <option value="guru">Guru / other</option>
          </select>
        </label>
        <label>Kind
          <select value={form.kind} onChange={(e) => set("kind", e.target.value)}>
            {KINDS.map((k) => <option key={k.id} value={k.id}>{k.label}</option>)}
          </select>
        </label>
        <label>Civil date (the day it happened)
          <input required type="date" value={form.gregorian} onChange={(e) => set("gregorian", e.target.value)} />
        </label>
        <label>City for sunrise tithi
          <select value={form.city} onChange={(e) => set("city", e.target.value)}>
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <fieldset>
          <legend>Remind me by</legend>
          <label><input type="radio" name="follow" checked={form.follow === "tithi"} onChange={() => set("follow", "tithi")} /> Tithi each year (recommended)</label>
          <label><input type="radio" name="follow" checked={form.follow === "gregorian"} onChange={() => set("follow", "gregorian")} /> Same civil date each year</label>
        </fieldset>
        <label>Note
          <input value={form.note} onChange={(e) => set("note", e.target.value)} placeholder="Home puja, call at sunrise" />
        </label>
        {err && <p role="alert">{err}</p>}
        <button type="submit" disabled={busy}>{busy ? "Reading tithi…" : "Lock this tithi"}</button>
      </form>

      <p className="eyebrow" style={{ marginTop: "2rem" }}>Your list</p>
      {items.length === 0 ? (
        <p className="muted">Nothing saved yet. This list stays in this browser until you sign in on a paid plan.</p>
      ) : (
        <>
          <button type="button" onClick={downloadList}>Download my tithi (.ics)</button>
          <ul style={{ paddingLeft: "1.1rem" }}>
            {items.map((it) => (
              <li key={it.id} style={{ margin: "0.6rem 0" }}>
                <strong>{it.label}</strong> · {it.kind} · {it.relation}<br />
                Locked: {it.paksha} {tithiName(it.tithi, it.paksha)}
                {it.nakshatra ? ` · ${it.nakshatra}` : ""}<br />
                From {it.gregorian} at {it.city} · follow {it.follow}
                {it.note ? <><br />{it.note}</> : null}
                {" "}
                <button type="button" onClick={() => { removeRemembered(it.id); setItems(listRemembered()); }}>Remove</button>
              </li>
            ))}
          </ul>
        </>
      )}
      <p><Link href="/calendar">See them on this month →</Link></p>
    </>
  );
}
