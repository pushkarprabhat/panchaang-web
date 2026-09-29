import {
  ist,
  karanaName,
  nakshatraName,
  observances,
  rahuKalam,
  tithiName,
  varaName,
  yogaName,
} from "./panchang-labels";
import { choghadiyaDay } from "./choghadiya";

function gregorianLine(iso) {
  return new Intl.DateTimeFormat("en-IN", {
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

export default function PanchangView({ data }) {
  if (!data) return null;
  const tithi = tithiName(data.tithi_number, data.paksha);
  const when = data.sunrise || data.tithi_start;
  const years = samvatYears(when);
  const vrats = observances(data);
  const chog = choghadiyaDay(data.sunrise, data.sunset);
  return (
    <div className="panchang-full">
      <p className="muted" style={{ margin: "0.5rem 0 0" }}>
        {gregorianLine(when)}
      </p>
      <p className="panchang-hero">
        {data.paksha} {tithi}
      </p>
      {vrats.length > 0 && <p className="eyebrow">{vrats.join(" · ")}</p>}
      <dl className="panchang-grid">
        <div><dt>Tithi</dt><dd>{tithi} ({data.paksha})</dd></div>
        <div><dt>Vara</dt><dd>{varaName(when)}</dd></div>
        <div><dt>Nakshatra</dt><dd>{nakshatraName(data.nakshatra_index)}</dd></div>
        <div><dt>Yoga</dt><dd>{yogaName(data.yoga_index)}</dd></div>
        <div><dt>Karana</dt><dd>{karanaName(data.karana_index)}</dd></div>
        <div><dt>Vikrama / Shaka</dt><dd>{years.vikrama} / {years.shaka}</dd></div>
        <div><dt>Sunrise</dt><dd>{ist(data.sunrise)}</dd></div>
        <div><dt>Sunset</dt><dd>{ist(data.sunset)}</dd></div>
        <div><dt>Rahu Kalam</dt><dd>{rahuKalam(data.sunrise, data.sunset)}</dd></div>
        <div><dt>Tithi window</dt><dd>{ist(data.tithi_start)} – {ist(data.tithi_end)}</dd></div>
      </dl>
      {chog.length > 0 && (
        <>
          <p className="eyebrow">Day Choghadiya</p>
          <table>
            <tbody>
              {chog.map((c) => (
                <tr key={c.start}>
                  <td>{c.name}{c.good ? " · good" : ""}</td>
                  <td>{c.start} – {c.end}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
