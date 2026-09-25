export default function WidgetPage() {
  const snippet = `<script src="https://panchaang.in/embed.js" data-city="Ahmedabad"></script>`;
  return (
    <>
      <h1>Widget</h1>
      <p>Paste on a temple or city site. Same engine. Their visitors stay on their page.</p>
      <pre>{snippet}</pre>
      <p className="muted">data-city can be any gazetteer name. Or pass data-lat and data-lon.</p>
    </>
  );
}
