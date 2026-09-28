import Link from "next/link";

export default function TemplesPage() {
  return (
    <>
      <h1>Temples</h1>
      <p>Put tithi on the temple site. Visitors stay on your page.</p>
      <div className="grid two">
        <div className="card">
          <h2>Self-serve · ₹2,000 / month</h2>
          <p>You paste one script. One city. You change nothing each year.</p>
          <Link className="btn" href="/start?plan=self">Start</Link>
        </div>
        <div className="card featured">
          <h2>We manage · ₹5,000 / month</h2>
          <p>We install. Festival list by email. You forward dates to the priest.</p>
          <Link className="btn" href="/start?plan=managed">Start</Link>
        </div>
      </div>
    </>
  );
}
