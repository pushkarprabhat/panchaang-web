import Link from "next/link";
import PlacePanel from "./place-panel";

export default function Home() {
  return (
    <>
      <h1>Today’s tithi, for this place.</h1>
      <p className="muted">Type a city. See the map. Copy the widget.</p>
      <div style={{ marginTop: "1.25rem" }}>
        <PlacePanel />
      </div>
      <p style={{ marginTop: "1.25rem" }}>
        <Link className="btn" href="/temples">
          Temple plans
        </Link>
      </p>
    </>
  );
}
