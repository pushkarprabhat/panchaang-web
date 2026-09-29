import Link from "next/link";

const ITEMS = [
  ["Today’s five limbs", "Tithi, vara, nakshatra, yoga, karana for a city or GPS.", "/"],
  ["Gregorian → panchang", "Any civil date.", "/tools"],
  ["Samvat → civil date", "Vikrama or Shaka + month + tithi.", "/tools"],
  ["Next tithi", "Find the next ekadashi or family tithi.", "/tools"],
  ["Month calendar", "Tithi list for a Gregorian month.", "/calendar"],
  ["Two-city compare", "Same moment, two sunrises.", "/compare"],
  ["Ekadashi / purnima / amavasya", "Next dates from the engine.", "/festivals"],
  ["Temple widget", "One script tag on another site.", "/widget"],
  ["HTTP API", "JSON for developers.", "/api-docs"],
  ["Family alerts (planned)", "Email the day a saved tithi falls.", "/pricing"],
  ["Temple plan (planned)", "Managed or self-serve widget + year list.", "/temples"],
];

export default function ServicesPage() {
  return (
    <>
      <p className="eyebrow">Catalogue</p>
      <h1>Services</h1>
      <p className="lead">
        Digital panchang software. No physical goods. Paid plans are listed on{" "}
        <Link href="/pricing">Pricing</Link>. Checkout is not live until a gateway is approved.
      </p>
      <div className="grid two">
        {ITEMS.map(([title, blurb, href]) => (
          <Link className="card" href={href} key={title} style={{ color: "inherit", textDecoration: "none" }}>
            <strong>{title}</strong>
            <p className="muted">{blurb}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
