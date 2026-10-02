export const metadata = { title: "Privacy policy — Panchaang.in" };

export default function PrivacyPage() {
  return (
    <>
      <p className="eyebrow">Legal</p>
      <h1>Privacy policy</h1>
      <p className="muted">Last updated 2 October 2026. This notice follows the Digital Personal Data Protection Act, 2023, as far as it applies to us.</p>

      <h2>1. Who is responsible</h2>
      <p>
        TheiaOne AI Systems LLP (ADA-3003), 308, City Center - 2, Science City Road, Sola,
        Ahmedabad 380060, is the data fiduciary for panchaang.in. Write to legal@panchaang.in.
      </p>

      <h2>2. What we collect</h2>
      <ul>
        <li>Account data, if you sign in: name, email, and the sign-in provider (Google, Facebook, X, or email code), via Clerk.</li>
        <li>City you pick, and browser location only if you press “Use my location”. We do not store a continuous GPS trail.</li>
        <li>Tithis you lock (name, relation, civil date, city) in this browser until an account sync exists.</li>
        <li>Enquiry emails you send to contact@ or legal@.</li>
        <li>Standard server logs: IP address, time, page, browser. Used to keep the site up and to block abuse.</li>
      </ul>
      <p>We do not ask for Aadhaar, PAN, or payment card numbers on the site. Cards are not taken yet.</p>

      <h2>3. Why we use it</h2>
      <ul>
        <li>To show a panchang for the city and time you asked for.</li>
        <li>To run sign-in and, later, a paid plan you requested.</li>
        <li>To answer a support or legal email.</li>
        <li>To secure the service (fraud, overload, abuse).</li>
      </ul>
      <p>We do not sell personal data. We do not use it to build an advertising profile.</p>

      <h2>4. Who else sees it</h2>
      <ul>
        <li>Clerk (authentication), on their processors’ terms.</li>
        <li>Vercel (website hosting) and Cloudflare (API tunnel).</li>
        <li>Oracle Cloud (API virtual machine, Mumbai region).</li>
        <li>Email host for @panchaang.in mailboxes.</li>
      </ul>
      <p>We share data with a government authority only if the law requires it.</p>

      <h2>5. How long</h2>
      <p>
        Account data lasts while the account is open, then up to 90 days in backups.
        Server logs are kept about 30 days. Enquiry mail is kept as long as we need it for the thread
        and any tax record (up to 8 years for invoices).
      </p>

      <h2>6. Your choices</h2>
      <p>
        You may ask for a copy, a correction, or erasure of account data, subject to a legal hold.
        Email legal@panchaang.in. You can stop location use by not pressing the location button
        and by clearing site data in the browser.
      </p>

      <h2>7. Children</h2>
      <p>The service is not directed at children under 18. Do not create an account for a child.</p>

      <h2>8. Cookies</h2>
      <p>
        We use cookies only for sign-in (Clerk) and for the language you picked (local storage).
        We do not run a third-party ad network.
      </p>
    </>
  );
}
