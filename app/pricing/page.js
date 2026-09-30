import Link from "next/link";
import { FAMILY, TEMPLE } from "../../data/plans";

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
            <Link className="btn" href={p.id === "free" ? p.href : "/contact"}>
              {p.id === "free" ? p.cta : p.cta}
            </Link>
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
      <h1>Pay once a year, if you pay at all.</h1>
      <p className="lead">
        Today is free. Family and temple work is billed per annum only. No monthly temple fee.
        If the number is high, write to us and we will talk.
      </p>
      <p className="pricing-note">We are not taking cards yet. <Link href="/contact">Contact</Link> is enough.</p>
      <Grid title="Home" plans={FAMILY} />
      <Grid title="Mandir" plans={TEMPLE} />
      <p className="row"><Link href="/compare">Compare</Link> <Link href="/legal/refund">Refund</Link> <Link href="/legal/terms">Terms</Link></p>
    </>
  );
}
