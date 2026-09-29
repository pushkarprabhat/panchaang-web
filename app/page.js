import Link from "next/link";
import PlacePanel from "./place-panel";

export default function Home() {
  return (
    <>
      <p className="eyebrow">Panchaang.in</p>
      <h1>Today’s five limbs, for this place.</h1>
      <p className="lead">
        Tithi, vara, nakshatra, yoga, karana — calculated on our engine.
        No third-party panchang. Pick a city. Copy the widget when you need it on a temple site.
      </p>
      <p className="row">
        <Link className="btn" href="/tools">Date tools</Link>
        <Link href="/calendar">Month calendar</Link>
        <Link href="/pricing">Plans</Link>
        <Link href="/account">Account (soon)</Link>
      </p>
      <div style={{ marginTop: "1.5rem" }}>
        <PlacePanel />
      </div>
    </>
  );
}
