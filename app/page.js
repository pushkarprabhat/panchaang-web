import Link from "next/link";
import TodayBox from "./today-box";

export default function Home() {
  return (
    <>
      <h1>Today’s tithi, for this place.</h1>
      <p className="muted">Family reminders. Temple widgets. One engine.</p>
      <div className="grid two" style={{ marginTop: "1.25rem" }}>
        <TodayBox />
        <div className="card">
          <h2>Subscribe</h2>
          <p>Dainik Panchang + janma / anniversary / death tithi alerts.</p>
          <p className="muted">₹499–699 / year per family. Temple plans separate.</p>
          <Link className="btn" href="/temples">Temple plans</Link>
        </div>
      </div>
    </>
  );
}
