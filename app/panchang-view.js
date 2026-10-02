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
import { t } from "./i18n";
import { choghadiyaDay } from "./choghadiya";
import { MoonDown, MoonUp, SunDown, SunUp, TithiMoon } from "./sky-icons";
import { namedOn } from "../data/named-vrats-2026";
import { upcomingEclipses } from "../data/eclipses";

const LOCALE = { en: "en-IN", hi: "hi-IN", gu: "gu-IN", mr: "mr-IN", bn: "bn-IN", ta: "ta-IN" };

function gregorianLine(iso, lang) {
  return new Intl.DateTimeFormat(LOCALE[lang] || "en-IN", {
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

function win(obj) {
  if (!obj) return "\u2014";
  return `${ist(obj.start || obj.entered)} \u2013 ${ist(obj.end || obj.exits)}`;
}

export default function PanchangView({ data }) {
  const [lang, setLang] = useState("en");
  useEffect(() => {
    const read = () => setLang(localStorage.getItem("lang") || "en");
    read();
    window.addEventListener("langchange", read);
    return () => window.removeEventListener("langchange", read);
  }, []);
  if (!data) return null;
  const hi = lang === "hi" || lang === "mr";
  const tithi = tithiName(data.tithi_number, data.paksha, hi);
  const when = data.sunrise || data.tithi_start;
  const years = samvatYears(when);
  const vrats = observances(data);
  const named = namedOn(when);
  const chog = choghadiyaDay(data.sunrise, data.sunset);
  const nextEcl = upcomingEclipses(new Date(), 1)[0];
  const isPurnima = data.tithi_number === 15 && data.paksha === "Shukla";
  const planets = Array.isArray(data.planets) ? data.planets : [];
  return (
    <div className="panchang-full" lang={lang}>
      <p className="muted" style={{ margin: "0.6rem 0 0" }}>
        {gregorianLine(when, lang)}
      </p>
      <p className="panchang-hero" style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
        <TithiMoon tithi={data.tithi_number} paksha={data.paksha} />
        <span>
          {data.paksha} {tithi}
        </span>
      </p>
      {vrats.length > 0 && <p className="eyebrow">{vrats.join(" \u00b7 ")}</p>}
      {named.ekadashi && <p className="eyebrow">{named.ekadashi}</p>}
      {named.purnima && <p className="eyebrow">{named.purnima}</p>}
      <dl className="kv">
        <Row name={t(lang, "tithi")} value={`${tithi} (${data.paksha})`} />
        <Row name={t(lang, "vara")} value={varaName(when, hi)} />
        <Row name={t(lang, "vahan")} value={vahanName(when, hi)} />
        <Row name={t(lang, "nakshatra")} value={data.nakshatra?.name || nakshatraName(data.nakshatra_index, hi)} />
        <Row name={t(lang, "yoga")} value={data.yoga?.name || yogaName(data.yoga_index)} />
        <Row name={t(lang, "karana")} value={data.karana?.name || karanaName(data.karana_index)} />
        <Row name={t(lang, "surya")} value={data.surya_rashi ? `${data.surya_rashi.name} (${data.surya_rashi.longitude}\u00b0)` : data.saura_masa_name || "\u2014"} />
        <Row name={t(lang, "chandra")} value={data.chandra_rashi ? `${data.chandra_rashi.name} (${data.chandra_rashi.longitude}\u00b0)` : "\u2014"} />
        <Row name="Vikrama" value={years.vikrama} />
        <Row name="Shaka" value={years.shaka} />
        <Row name={t(lang, "sunrise")} value={<><SunUp /> {ist(data.sunrise)}</>} />
        <Row name={t(lang, "sunset")} value={<><SunDown /> {ist(data.sunset)}</>} />
        <Row name={t(lang, "moonrise")} value={<><MoonUp /> {data.moonrise ? ist(data.moonrise) : "\u2014"}</>} />
        <Row name={t(lang, "moonset")} value={<><MoonDown /> {data.moonset ? ist(data.moonset) : "\u2014"}</>} />
        <Row name="Rahu Kalam" value={rahuKalam(data.sunrise, data.sunset)} />
        <Row name={isPurnima ? "Purnima starts" : "Tithi starts"} value={ist(data.tithi_start)} />
        <Row name={isPurnima ? "Purnima ends" : "Tithi ends"} value={ist(data.tithi_end)} />
      </dl>
      <p className="eyebrow" style={{ marginTop: "1.2rem" }}>{t(lang, "limbs")}</p>
      <div className="table-scroll" role="region" aria-label="Limb times" tabIndex={0}>
        <table>
          <thead>
            <tr><th scope="col">Limb</th><th scope="col">Name</th><th scope="col">Start \u2013 end</th></tr>
          </thead>
          <tbody>
            <tr><td>Tithi</td><td>{tithi}</td><td>{ist(data.tithi_start)} \u2013 {ist(data.tithi_end)}</td></tr>
            <tr><td>Nakshatra</td><td>{data.nakshatra?.name || nakshatraName(data.nakshatra_index, hi)}</td><td>{win(data.nakshatra)}</td></tr>
            <tr><td>Yoga</td><td>{data.yoga?.name || yogaName(data.yoga_index)}</td><td>{win(data.yoga)}</td></tr>
            <tr><td>Karana</td><td>{data.karana?.name || karanaName(data.karana_index)}</td><td>{win(data.karana)}</td></tr>
          </tbody>
        </table>
      </div>
      <p className="eyebrow" style={{ marginTop: "1.2rem" }}>Rashi</p>
      <div className="table-scroll" role="region" aria-label="Rashi windows" tabIndex={0}>
        <table>
          <thead>
            <tr><th scope="col">Body</th><th scope="col">Rashi</th><th scope="col">Entered \u2013 exits</th></tr>
          </thead>
          <tbody>
            <tr><td>Surya</td><td>{data.surya_rashi?.name || data.saura_masa_name}</td><td>{win(data.surya_rashi)}</td></tr>
            <tr><td>Chandra</td><td>{data.chandra_rashi?.name || "\u2014"}</td><td>{win(data.chandra_rashi)}</td></tr>
          </tbody>
        </table>
      </div>
      {planets.length > 0 && (
        <>
          <p className="eyebrow" style={{ marginTop: "1.2rem" }}>Planet transits</p>
          <div className="table-scroll" role="region" aria-label="Planet transits" tabIndex={0}>
            <table>
              <thead>
                <tr><th scope="col">Planet</th><th scope="col">Rashi</th><th scope="col">Long</th><th scope="col">Entered \u2013 exits</th></tr>
              </thead>
              <tbody>
                {planets.map((p) => (
                  <tr key={p.body}>
                    <td>{p.body}</td>
                    <td>{p.name}</td>
                    <td>{p.longitude}\u00b0</td>
                    <td>{win(p)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {nextEcl && (
        <p className="muted">Next eclipse: {nextEcl.date} \u00b7 {nextEcl.type} {nextEcl.kind}</p>
      )}
      {chog.length > 0 && (
        <>
          <p className="eyebrow" style={{ marginTop: "1.2rem" }}>Day Choghadiya</p>
          <div className="table-scroll" role="region" aria-label="Day Choghadiya" tabIndex={0}>
            <table>
              <thead>
                <tr><th scope="col">Name</th><th scope="col">Window</th><th scope="col">Note</th></tr>
              </thead>
              <tbody>
                {chog.map((c) => (
                  <tr key={c.start}>
                    <td>{c.name}</td>
                    <td>{c.start} \u2013 {c.end}</td>
                    <td className="muted">{c.good ? "Favourable" : "\u2014"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
