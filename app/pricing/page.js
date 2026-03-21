import Link from "next/link";
import { plans } from "../../lib/siteData";

export default function PricingPage() {
  return (
    <section className="stack">
      <div className="card">
        <h1>Pricing</h1>
        <p className="lead">
          Choose your tier. All plans include both BULL and BEAR direction where
          applicable. Payment is manual in crypto. Access is delivered through
          private Discord roles.
        </p>
      </div>

      <div className="planGrid">
        {plans.map((plan) => (
          <div key={plan.key} className="planCard">
            <div className="badgePill">{plan.badge}</div>
            <div className="smallCaps">{plan.tier}</div>
            <h2>{plan.name}</h2>
            <p className="muted">{plan.description}</p>

            <div className="priceRow">
              <div>
                <div className="priceBig">€{plan.euro}</div>
                <div className="muted">per month</div>
              </div>
              <div>
                <div className="priceBig">{plan.usdt} USDT</div>
                <div className="muted">per month</div>
              </div>
            </div>

            <ul className="list">
              {plan.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            <div className="scoreLine">Signal quality: {plan.score}</div>

            <Link
              href={plan.key === "free" ? "/how-it-works" : `/pay?plan=${plan.key}`}
              className="btn btnPrimary"
            >
              {plan.key === "free" ? `View ${plan.name}` : `Choose ${plan.name}`}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
