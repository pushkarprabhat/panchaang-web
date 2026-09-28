import Link from "next/link";
import PlacePanel from "./place-panel";

export default function Home() {
  return (
    <>
      <p className="eyebrow">Family calendar + temple widget</p>
      <h1>Today’s tithi, for this place.</h1>
      <p className="lead">Type a city. See the map. Copy the widget. Pay when you want alerts.</p>
      <p className="row">
        <Link className="btn" href="/pricing">See plans</Link>
        <Link href="/temples">For temples →</Link>
      </p>
      <div style={{ marginTop: "1.5rem" }}>
        <PlacePanel />
      </div>
    </>
  );
}
