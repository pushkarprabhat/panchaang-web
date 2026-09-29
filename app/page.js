import Link from "next/link";
import PlacePanel from "./place-panel";

export default function Home() {
  return (
    <>
      <p className="eyebrow">Daily panchang</p>
      <h1>Today’s five limbs, for this place.</h1>
      <p className="lead">
        Tithi, vara, nakshatra, yoga, karana — from our engine, for a city you choose.
        Convert a date. Embed a widget. Pay later for alerts.
      </p>
      <p className="row">
        <Link className="btn" href="/tools">Convert a date</Link>
        <Link href="/calendar">Month calendar</Link>
        <Link href="/widget">Temple widget</Link>
      </p>
      <div className="trust">
        <div>
          <strong>Both ways</strong>
          <span className="muted">Gregorian ↔ tithi</span>
        </div>
        <div>
          <strong>Any city</strong>
          <span className="muted">Search + map</span>
        </div>
        <div>
          <strong>Own math</strong>
          <span className="muted">No Drik dependency</span>
        </div>
        <div>
          <strong>API live</strong>
          <span className="muted">api.panchaang.in</span>
        </div>
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <PlacePanel />
      </div>
    </>
  );
}
