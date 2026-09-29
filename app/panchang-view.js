import {
  ist,
  karanaName,
  nakshatraName,
  tithiName,
  varaName,
  yogaName,
} from "./panchang-labels";

function gregorianLine(iso) {
  const d = new Date(iso || Date.now());
  const date = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
  return date;
}

function samvatYears(iso) {
  const y = Number(
    new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
    }).format(new Date(iso || Date.now()))
  );
  return { vikrama: y + 57, shaka: y - 78, ce: y };
}

export default function PanchangView({ data }) {
  if (!data) return null;
  const tithi = tithiName(data.tithi_number, data.paksha);
  const when = data.sunrise || data.tithi_start;
  const years = samvatYears(when);
  return (
    <div className="panchang-full">
      <p className="muted" style={{ margin: "0.6rem 0 0.2rem" }}>
        {gregorianLine(when)}
      </p>
      <p className="eyebrow">Five limbs</p>
      <p className="panchang-hero">
        <strong>
          {data.paksha} {tithi}
        </strong>
        <span className="muted"> · Tithi {data.tithi_number}</span>
      </p>
      <dl className="panchang-grid">
        <div>
          <dt>1. Tithi</dt>
          <dd>
            {tithi} ({data.paksha})
          </dd>
        </div>
        <div>
          <dt>2. Vara</dt>
          <dd>{varaName(when)}</dd>
        </div>
        <div>
          <dt>3. Nakshatra</dt>
          <dd>{nakshatraName(data.nakshatra_index)}</dd>
        </div>
        <div>
          <dt>4. Yoga</dt>
          <dd>{yogaName(data.yoga_index)}</dd>
        </div>
        <div>
          <dt>5. Karana</dt>
          <dd>{karanaName(data.karana_index)}</dd>
        </div>
        <div>
          <dt>Vikrama</dt>
          <dd>{years.vikrama}</dd>
        </div>
        <div>
          <dt>Shaka</dt>
          <dd>{years.shaka}</dd>
        </div>
        <div>
          <dt>Month system</dt>
          <dd>{data.month_system || "Amanta"}</dd>
        </div>
        <div>
          <dt>Sunrise (IST)</dt>
          <dd>{ist(data.sunrise)}</dd>
        </div>
        <div>
          <dt>Sunset (IST)</dt>
          <dd>{ist(data.sunset)}</dd>
        </div>
        <div>
          <dt>Tithi starts</dt>
          <dd>{ist(data.tithi_start)}</dd>
        </div>
        <div>
          <dt>Tithi ends</dt>
          <dd>{ist(data.tithi_end)}</dd>
        </div>
      </dl>
    </div>
  );
}
