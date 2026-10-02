"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import PanchangView from "../../panchang-view";
import { festivalsOn } from "../../../data/festivals-2026";
import { eclipsesOn } from "../../../data/eclipses";
import { bandsOn, panchakMarksOn } from "../../../data/bands-2026";
import PersonalMarks from "../../personal-marks";
import { namedOn } from "../../../data/named-vrats-2026";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.panchaang.in";

export default function DayPage() {
  const params = useParams();
  const q = useSearchParams();
  const date = String(params.date || "");
  const city = q.get("city") || "Ahmedabad";
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      setErr("That date is not valid.");
      return;
    }
    const iso = `${date}T00:30:00.000Z`;
    fetch(`${API}/v1/panchang?city=${encodeURIComponent(city)}&date_time=${encodeURIComponent(iso)}`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setData)
      .catch(() => setErr("Could not load this day."));
  }, [date, city]);

  const named = namedOn(`${date}T00:30:00.000Z`);
  const fests = festivalsOn(date);
  const ecl = eclipsesOn(date);
  const bands = bandsOn(date);
  const panchak = panchakMarksOn(date);
  const [y, m] = date.split("-");

  return (
    <>
      <p className="eyebrow">Day</p>
      <h1>{date}</h1>
      <p className="lead">{city}</p>
      <p>
        <Link href={`/calendar?city=${encodeURIComponent(city)}&year=${y}&month=${Number(m)}`}>Back to month</Link>
        {" | "}
        <Link href={`/my-tithi`}>Save a tithi</Link>
      </p>
      {err && <p role="alert">{err}</p>}
      {!err && !data && <p>Loading this day...</p>}
      {bands.map((b) => <p className="eyebrow" key={b.id}>{b.label}</p>)}
      {panchak.map((p) => <p className="eyebrow" key={p.label}>{p.label}</p>)}
      {named.ekadashi && <p>{named.ekadashi}</p>}
      {named.purnima && <p>{named.purnima}</p>}
      {fests.map((f) => <p key={f.name}>{f.name}{f.state ? ` (${f.state})` : ""}</p>)}
      {ecl.map((e) => <p key={e.kind}>{e.type} {e.kind} {e.region || ""}</p>)}
      <PersonalMarks row={data ? { ...data, date, tithi_number: data.tithi_number } : { date }} />
      {data && <PanchangView data={data} />}
    </>
  );
}
