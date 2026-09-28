export default function WidgetPage() {
  const snippet = `<script src="https://panchaang.in/embed.js" data-city="Ahmedabad"></script>`;
  return (
    <>
      <h1>Widget</h1>
      <p>Paste on a temple or city site. Same engine.</p>
      <pre>{snippet}</pre>
      <p className="muted">Or pick a city on the home page — the snippet fills lat/long.</p>
    </>
  );
}
