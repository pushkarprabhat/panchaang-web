"use client";

import { useEffect, useState } from "react";
import {
  ist,
  karanaName,
  nakshatraName,
  observances,
  rahuKalam,
  tithiName,
  vahanName,
  varaName,
  yogaName,
} from "./panchang-labels";
import { choghadiyaDay } from "./choghadiya";
import { MoonDown, MoonUp, SunDown, SunUp, TithiMoon } from "./sky-icons";
import { namedOn } from "../data/named-vrats-2026";
import { upcomingEclipses } from "../data/eclipses";

function gregorianLine(iso, hi) {
  return new Intl.DateTimeFormat(hi ? "hi-IN" : "en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso || Date.now()));
}

function samvatYears(iso) {
  const y = Number(
    new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", year: "numeric" }).format(
      new Date(iso || Date.now())
    )
  );
  return { vikrama: y + 57, shaka: y - 78 };
}

function Row({ name, value }) {
  return (
    <div>
      <dt>{name}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export default function PanchangView({ data }) {
  const [hi, setHi] = useState(false);
  useEffect(() => {
    const read = () => setHi((localStorage.getItem("lang") || "en") === "hi");
    read();
    window.addEventListener("langchange", read);
    return () => window.removeEventListener("langchange", read);
  }, []);
  if (!data) return null;
  const tithi = tithiName(data.tithi_number, data.paksha, hi);
  const when = data.sunrise || data.tithi_start;
  const years = samvatYears(when);
  const vrats = observances(data);
  const named = namedOn(when);
  const chog = choghadiyaDay(data.sunrise, data.sunset);
  const nextEcl = upcomingEclipses(new Date(), 1)[0];
  const isPurnima = data.tithi_number === 15 && data.paksha === "Shukla";
  return (
    <div className="panchang-full">
      <p className="muted" style={{ margin: "0.6rem 0 0" }}>
        {gregorianLine(when, hi)}
      </p>
      <p className="panchang-hero" style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
        <TithiMoon tithi={data.tithi_number} paksha={data.paksha} />
        <span>
          {data.paksha} {tithi}
        </span>
      </p>
      {vrats.length > 0 && <p className="eyebrow">{vrats.join(" · ")}</p>}
      {named.ekadashi && <p className="eyebrow">{named.ekadashi}</p>}
      {named.purnima && <p className="eyebrow">{named.purnima}</p>}
      <dl className="kv">
        <Row name={hi ? "तिथि" : "Tithi"} value={`${tithi} (${data.paksha})`} />
        <Row name={hi ? "वार" : "Vara"} value={varaName(when, hi)} />
        <Row name={hi ? "वाहन" : "Vahan"} value={vahanName(when, hi)} />
        <Row name={hi ? "नक्षत्र" : "Nakshatra"} value={nakshatraName(data.nakshatra_index, hi)} />
        <Row name={hi ? "योग" : "Yoga"} value={yogaName(data.yoga_index)} />
        <Row name={hi ? "करण" : "Karana"} value={karanaName(data.karana_index)} />
        <Row name={hi ? "सौर राशि" : "Surya rashi"} value={data.saura_masa_name || "—"} />
        <Row name="Vikrama" value={years.vikrama} />
        <Row name="Shaka" value={years.shaka} />
        <Row name={hi ? "सूर्योदय" : "Sunrise"} value={<><SunUp /> {ist(data.sunrise)}</>} />
        <Row name={hi ? "सूर्यास्त" : "Sunset"} value={<><SunDown /> {ist(data.sunset)}</>} />
        <Row name={hi ? "चन्द्रोदय" : "Moonrise"} value={<><MoonUp /> {data.moonrise ? ist(data.moonrise) : "—"}</>} />
        <Row name={hi ? "चन्द्रास्त" : "Moonset"} value={<><MoonDown /> {data.moonset ? ist(data.moonset) : "—"}</>} />
        <Row name="Rahu Kalam" value={rahuKalam(data.sunrise, data.sunset)} />
        <Row name={isPurnima ? "Purnima starts" : "Tithi starts"} value={ist(data.tithi_start)} />
        <Row name={isPurnima ? "Purnima ends" : "Tithi ends"} value={ist(data.tithi_end)} />
      </dl>
      <p className="eyebrow" style={{ marginTop: "1.2rem" }}>{hi ? "अंग" : "Limbs (current)"}</p>
      <table>
        <thead>
          <tr><th>{hi ? "अंग" : "Limb"}</th><th>{hi ? "नाम" : "Name"}</th><th>{hi ? "आरंभ–अंत" : "Start – end"}</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Tithi</td>
            <td>{tithi}</td>
            <td>{ist(data.tithi_start)} – {ist(data.tithi_end)}</td>
          </tr>
          <tr>
            <td>Nakshatra</td>
            <td>{nakshatraName(data.nakshatra_index, hi)}</td>
            <td className="muted">Entry time after engine update</td>
          </tr>
          <tr>
            <td>Yoga</td>
            <td>{yogaName(data.yoga_index)}</td>
            <td className="muted">Entry time after engine update</td>
          </tr>
          <tr>
            <td>Karana</td>
            <td>{karanaName(data.karana_index)}</td>
            <td className="muted">Entry time after engine update</td>
          </tr>
        </tbody>
      </table>
      {nextEcl && (
        <p className="muted">Next eclipse: {nextEcl.date} · {nextEcl.type} {nextEcl.kind}</p>
      )}
      {chog.length > 0 && (
        <>
          <p className="eyebrow" style={{ marginTop: "1.2rem" }}>Day Choghadiya</p>
          <table>
            <thead>
              <tr><th>Name</th><th>Window</th><th>Note</th></tr>
            </thead>
            <tbody>
              {chog.map((c) => (
                <tr key={c.start}>
                  <td>{c.name}</td>
                  <td>{c.start} – {c.end}</td>
                  <td className="muted">{c.good ? "Favourable" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
