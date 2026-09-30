import Link from "next/link";
import PlacePanel from "./place-panel";
import { upcomingEclipses } from "../data/eclipses";

export default function Home() {
  const next = upcomingEclipses(new Date(), 1)[0];
  return (
    <>
      <p className="eyebrow">Daily panchang</p>
      <h1>Today’s panchang, for your city.</h1>
      <p className="lead">
        Choose your city for today’s panchang, sunrise and observances.
        Take the month with you, in your calendar or on paper.
      </p>
      <ol className="journey" aria-label="Getting started">
        <li><a href="#today">01 · Choose a city & see today</a></li>
        <li><Link href="/calendar">02 · Download your month</Link></li>
        <li><Link href="/pricing">03 · Find your plan</Link></li>
      </ol>
      <PlacePanel compact />
      <section className="next-step" aria-labelledby="plans-heading">
        <div><p className="eyebrow">For households & organisations</p>
          <h2 id="plans-heading">A plan for your routine.</h2>
          <p className="muted">Explore family plans, temple widgets and managed services.</p>
        </div>
        <Link className="btn" href="/pricing">Explore plans →</Link>
      </section>
      {next && (
        <p className="muted">
          Next eclipse: {next.date} · {next.type} {next.kind}.{" "}
          <Link href="/eclipses">All eclipses</Link>
        </p>
      )}
    </>
  );
}
