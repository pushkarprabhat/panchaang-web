import Link from "next/link";
import { ADDONS, FAMILY, TEMPLE } from "../../data/plans";

function Grid({ title, plans }) {
  return (
    <>
      <h2>{title}</h2>
      <div className="grid three pricing-grid">
        {plans.map((p) => (
          <div className={p.featured ? "card plan-card featured" : "card plan-card"} key={p.id}>
            <p className="muted">{p.who}</p>
            <h3>{p.name}</h3>
            <p className="price">
              {p.price}
              <span className="muted">{p.period}</span>
            </p>
            <ul>
              {p.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <Link className="btn" href={p.href}>{p.cta}</Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default function PricingPage() {
  return (
    <>
      <p className="eyebrow">Plans</p>
      <h1>Five plans. Add only what you need.</h1>
      <p className="lead">
        Home and mandir are billed once a year. Add-ons are optional extras on top of a paid plan.
      </p>
      <p className="pricing-note">No cards yet. <Link href="/contact">Write to us</Link> with the plan and any add-on.</p>
      <Grid title="Home" plans={FAMILY} />
      <Grid title="Mandir" plans={TEMPLE} />
      <h2>Add-ons</h2>
      <div className="card">
        <table>
          <thead>
            <tr><th>Add-on</th><th>Price</th><th></th></tr>
          </thead>
          <tbody>
            {ADDONS.map((a) => (
              <tr key={a.id}>
                <td>
                  <strong>{a.name}</strong>
                  <div className="muted">{a.note}</div>
                </td>
                <td>{a.price}</td>
                <td><Link href="/contact">Ask</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="row"><Link href="/compare">Compare</Link> <Link href="/legal/refund">Refund</Link></p>
    </>
  );
}
