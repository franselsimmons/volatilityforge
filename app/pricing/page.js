import Link from "next/link";
import SiteShell from "../../components/SiteShell";
import { plans } from "../../lib/siteData";

export default function PricingPage() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container">
          <h1>Pricing</h1>
          <p>
            Choose your tier. All plans include both BULL and BEAR signal direction where applicable.
            Payment is manual in crypto. Access is delivered through private Discord roles.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container pricing-grid">
          {plans.map((plan) => (
            <div className="card price-card" key={plan.slug}>
              <div className="badge">{plan.badge}</div>
              <h3>{plan.name}</h3>
              <div className="subtitle">{plan.subtitle}</div>

              <div className="price-row">
                <div>
                  <div className="price-big">€{plan.euro}</div>
                  <div className="price-small">per month</div>
                </div>
                <div>
                  <div className="price-big" style={{ fontSize: "2.2rem" }}>{plan.usdt} USDT</div>
                  <div className="price-small">per month</div>
                </div>
              </div>

              <ul className="price-features">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <Link href={`/pay?plan=${plan.slug}`} className="btn btn-primary">
                Choose {plan.name}
              </Link>

              <div className="help" style={{ marginTop: 16 }}>
                Access is delivered manually after payment verification and Discord confirmation.
              </div>
            </div>
          ))}
        </div>

        <div className="note-box" style={{ marginTop: 26 }}>
          Note: subscriptions are monthly. Renewals can be done by repurchasing. Auto-renew can be added later if needed.
        </div>
      </section>
    </SiteShell>
  );
}