export default function PrivacyPage() {
  return (
    <>
      <h1>Privacy policy</h1>
      <p>Last updated: 29 September 2026.</p>
      <p>We collect only what a calendar product needs.</p>
      <ul>
        <li>Account: name, email, optional phone.</li>
        <li>Product: city, saved tithis, language, optional device location if you allow it.</li>
        <li>Payments: handled by the gateway. We store payment id and plan, not full card numbers.</li>
      </ul>
      <p>We do not sell this list. We use it to run the service, alerts, and invoices.</p>
      <p>You may ask for deletion at legal@panchaang.in.</p>
      <p>Location is requested in the browser and is optional. Refusing location keeps the Ahmedabad default.</p>
    </>
  );
}
