import { upcomingEclipses, ECLIPSES } from "../../data/eclipses";

export default function EclipsesPage() {
  const next = upcomingEclipses(new Date(), 12);
  return (
    <>
      <p className="eyebrow">Sky</p>
      <h1>Eclipses</h1>
      <p className="lead">
        Dated from the public NASA eclipse lists. This is not a local visibility map for your rooftop yet.
      </p>
      <table>
        <thead>
          <tr>
            <th>Date (UTC day)</th>
            <th>Kind</th>
            <th>Type</th>
            <th>Greatest (UTC)</th>
            <th>Where it is spoken of</th>
          </tr>
        </thead>
        <tbody>
          {next.map((e) => (
            <tr key={e.date + e.kind}>
              <td>{e.date}</td>
              <td>{e.kind}</td>
              <td>{e.type}</td>
              <td>{e.utc}</td>
              <td className="muted">{e.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="muted">
        Catalog has {ECLIPSES.length} events through 2028. India visibility must be computed per city later.
      </p>
    </>
  );
}
