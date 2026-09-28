import Link from "next/link";
import { FAMILY, TEMPLE } from "../../data/plans";

function Grid({ title, plans }) {
  return (
    <>
      <h2>{title}</h2>
      <div className="grid three">
        {plans.map((p) => (
          <div className={p.featured ? "card featured" : "card"} key={p.id}>
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
            <Link className="btn" href={p.href}>
              {p.cta}
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
      <h1>Plans</h1>
      <p className="muted">Pay on the site. Razorpay when keys are in. Renew each year or month.</p>
      <Grid title="Families" plans={FAMILY} />
      <Grid title="Temples" plans={TEMPLE} />
    </>
  );
}
