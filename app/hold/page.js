import { HOLD } from "../../data/hold-list";

export const metadata = { title: "Hold list — Panchaang.in" };

export default function HoldPage() {
  return (
    <>
      <p className="eyebrow">Hold</p>
      <h1>Not building these yet.</h1>
      <p className="lead">Numbered on 2 October 2026. Review before any of them is started.</p>
      <table>
        <thead>
          <tr><th>No.</th><th>Added</th><th>Item</th><th>Note</th></tr>
        </thead>
        <tbody>
          {HOLD.map((row) => (
            <tr key={row.n}>
              <td>{row.n}</td>
              <td>{row.added}</td>
              <td>{row.name}</td>
              <td>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
