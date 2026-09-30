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
import { MoonDown, MoonUp, SunDown, SunUp, TithiMoon } from "./sky-icons";

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

function Row({ name, value }) {
  return (
    <div>
      <dt>{name}</dt>
      <dd>{value}</dd>
    </div>
  );
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
      <p className="muted" style={{ margin: "0.6rem 0 0" }}>
        {gregorianLine(when)}
      </p>
      <p className="panchang-hero" style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
        <TithiMoon tithi={data.tithi_number} paksha={data.paksha} />
        <span>
          {data.paksha} {tithi}
        </span>
      </p>
      {vrats.length > 0 && <p className="eyebrow">{vrats.join(" · ")}</p>}
      <dl className="kv">
        <Row name="Tithi" value={`${tithi} (${data.paksha})`} />
        <Row name="Vara" value={varaName(when)} />
        <Row name="Nakshatra" value={nakshatraName(data.nakshatra_index)} />
        <Row name="Yoga" value={yogaName(data.yoga_index)} />
        <Row name="Karana" value={karanaName(data.karana_index)} />
        <Row name="Saura masa" value={data.saura_masa_name || "—"} />
        <Row name="Vikrama" value={years.vikrama} />
        <Row name="Shaka" value={years.shaka} />
        <Row name="Sunrise" value={<><SunUp /> {ist(data.sunrise)}</>} />
        <Row name="Sunset" value={<><SunDown /> {ist(data.sunset)}</>} />
        <Row name="Moonrise" value={<><MoonUp /> {data.moonrise ? ist(data.moonrise) : "—"}</>} />
        <Row name="Moonset" value={<><MoonDown /> {data.moonset ? ist(data.moonset) : "—"}</>} />
        <Row name="Rahu Kalam" value={rahuKalam(data.sunrise, data.sunset)} />
        <Row name="Tithi starts" value={ist(data.tithi_start)} />
        <Row name="Tithi ends" value={ist(data.tithi_end)} />
        <Row name="System" value={data.month_system || "Amanta"} />
      </dl>
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
