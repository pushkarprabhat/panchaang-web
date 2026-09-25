export default function TemplesPage() {
  return (
    <>
      <h1>Temples</h1>
      <p>Put tithi and festival dates on the temple site. We host the clock.</p>
      <div className="grid two" style={{ marginTop: "1rem" }}>
        <div className="card">
          <h2>Self-serve</h2>
          <p>₹2,000 / month</p>
          <ul>
            <li>Widget + month calendar</li>
            <li>One city locked</li>
            <li>You paste the snippet</li>
          </ul>
        </div>
        <div className="card">
          <h2>We manage</h2>
          <p>₹5,000 / month</p>
          <ul>
            <li>We install and update events</li>
            <li>Festival list for the year</li>
            <li>Email to the trust office</li>
          </ul>
        </div>
      </div>
      <p className="muted" style={{ marginTop: "1rem" }}>
        Write to legal@theiaone-ai.com to start. Payments next.
      </p>
    </>
  );
}
