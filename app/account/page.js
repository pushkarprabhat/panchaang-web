export default function AccountPage() {
  return (
    <>
      <p className="eyebrow">Accounts</p>
      <h1>Login is not live yet.</h1>
      <p className="lead">
        We will use Google + email OTP (Clerk or Auth.js), not a home-grown password
        table. After that: saved cities, family tithis, Razorpay, temple logins.
      </p>
      <div className="card">
        <p>What an account will hold</p>
        <ul>
          <li>Saved places</li>
          <li>Family tithis (janma, vivah, shradh)</li>
          <li>Alert channel: email first, WhatsApp after consent</li>
          <li>Temple role for widget + events</li>
        </ul>
        <p className="muted">
          Write to legal@theiaone-ai.com if you want early access. Do not send passwords.
        </p>
      </div>
    </>
  );
}
