import Link from "next/link";
import PlacePanel from "./place-panel";
import { upcomingEclipses } from "../data/eclipses";

export default function Home() {
  const next = upcomingEclipses(new Date(), 1)[0];
  return (
    <>
      <p className="eyebrow">Daily panchang</p>
      <h1>Today, for this place.</h1>
      <p className="lead">
        Five limbs, sunrise, Rahu Kalam, and today’s vrat if the tithi is one.
      </p>
      {next && (
        <p className="muted">
          Next eclipse: {next.date} · {next.type} {next.kind}.{" "}
          <Link href="/eclipses">All eclipses</Link>
        </p>
      )}
      <PlacePanel compact />
    </>
  );
}
