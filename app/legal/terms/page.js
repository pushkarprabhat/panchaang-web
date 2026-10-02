export const metadata = { title: "Terms of service — Panchaang.in" };

export default function TermsPage() {
  return (
    <>
      <p className="eyebrow">Legal</p>
      <h1>Terms of service</h1>
      <p className="muted">Last updated 2 October 2026. These terms govern use of panchaang.in and api.panchaang.in.</p>

      <h2>1. Who we are</h2>
      <p>
        Panchaang.in is operated by TheiaOne AI Systems LLP (ADA-3003), 308, City Center - 2,
        Science City Road, Sola, Ahmedabad 380060, Gujarat, India. Contact legal@panchaang.in.
      </p>

      <h2>2. The service</h2>
      <p>
        We publish a Hindu panchang (tithi, nakshatra, yoga, karana, vara, sunrise and related timings),
        calendars, converters, widgets and optional paid plans. Calculations use our own engine
        (Lahiri ayanamsa, sunrise-based). They are informational. They are not a fatwa, a court order,
        medical advice, or a substitute for a local pandit where a rite needs one.
      </p>
      <p>
        City, ayanamsa and calendar system (Amanta / Purnimanta, Shaka / Vikrama) can shift a tithi by a day.
        You choose the city. We do not guarantee that every regional festival list is complete.
      </p>

      <h2>3. Accounts</h2>
      <p>
        Sign-in, when offered, is provided by Clerk. You must give a real email you control.
        You are responsible for activity under your account. We may suspend an account that abuses
        the API, scrapes beyond fair use, or breaks these terms.
      </p>

      <h2>4. Acceptable use</h2>
      <p>You may not:</p>
      <ul>
        <li>resell the raw API as your own engine without a written licence;</li>
        <li>overload the service, probe it, or bypass rate limits;</li>
        <li>upload unlawful content, or use the site to harass anyone;</li>
        <li>present our timings as an official government almanac.</li>
      </ul>

      <h2>5. Plans and add-ons</h2>
      <p>
        Free use of Today does not need a contract. Paid home and temple plans are annual.
        Add-ons are optional and priced on the Plans page. Online checkout is not live yet.
        A plan starts only after we confirm the enquiry in writing (email). Prices are in Indian rupees
        and exclude GST unless we say otherwise on the invoice.
      </p>

      <h2>6. Our content</h2>
      <p>
        Site text, layout, logo and engine output format are ours or our licensors.
        You may quote a day’s tithi with credit to Panchaang.in. You may embed the widget
        on a site you control, within the plan you bought. You may not copy the codebase.
      </p>

      <h2>7. Disclaimer and liability</h2>
      <p>
        The service is provided “as is”. We do not warrant uninterrupted uptime or that a muhurta
        will suit a particular rite. To the extent Indian law allows, our total liability in a year
        is limited to the fees you paid us in that year, or Rs 1,000 if you paid nothing.
        We are not liable for indirect loss, missed rites, or travel booked on a date we showed.
      </p>

      <h2>8. Law</h2>
      <p>
        These terms are governed by the laws of India. Courts at Ahmedabad, Gujarat, have jurisdiction,
        subject to any non-waivable consumer right you have.
      </p>
    </>
  );
}
