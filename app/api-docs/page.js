export default function ApiDocsPage() {
  const base = "https://api.panchaang.in";
  return (
    <>
      <p className="eyebrow">Developers</p>
      <h1>API</h1>
      <p className="lead">Open while we are in preview. CORS is open. Do not hammer it.</p>
      <div className="card">
        <pre>{`${base}/v1/panchang?city=Ahmedabad
${base}/v1/panchang?city=Ahmedabad&date_time=2026-08-13T06:30:00+05:30
${base}/v1/panchang?latitude=23.02&longitude=72.57
${base}/v1/calendar?city=Ujjain&year=2026&month=10
${base}/v1/next-tithi?city=Ujjain&paksha=Shukla&tithi=11&days=60
${base}/v1/to-gregorian?city=Ahmedabad&samvat_year=2083&era=vikrama&lunar_month=6&paksha=Shukla&tithi=1
${base}/v1/cities?q=London`}</pre>
      </div>
    </>
  );
}
