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
              {p.id === "free" ? p.cta : `Enquire about ${p.name}`}
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
      <p className="eyebrow">Plans & pricing</p>
      <h1>Choose what fits your routine.</h1>
      <p className="lead">Start with today’s panchang, free. Explore annual family plans or monthly services for your temple or trust.</p>
      <p className="pricing-note">Online payments are not yet available. <Link href="/contact">Contact us</Link> to enquire about a paid plan.</p>
      <Grid title="Families" plans={FAMILY} />
      <Grid title="Temples" plans={TEMPLE} />
      <p className="row"><Link href="/compare">Compare services →</Link><Link href="/legal/refund">Refund policy</Link><Link href="/legal/terms">Terms of service</Link></p>
    </>
  );
}
