import Link from "next/link";
import { SITE } from "@/lib/siteData";

export default function PricingPage() {
  return (
    <main className="page">
      <section className="section">
        <div className="card cardHighlight">
          <h1>Pricing</h1>
          <p>
            Plans are structured around signal depth and execution access.
            The higher the tier, the closer the member gets to execution-ready delivery.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="pricingGrid">
          {SITE.plans.map((plan) => (
            <div key={plan.slug} className="card pricingCard">
              <div className="badge">{plan.badge}</div>
              <h2>{plan.name}</h2>
              <p>{plan.description}</p>

              <div className="priceRow">
                <div>
                  <div className="priceBig">{plan.eur}</div>
                  <div className="priceSub">per month</div>
                </div>
                <div>
                  <div className="priceBigAlt">{plan.usdt}</div>
                  <div className="priceSub">per month</div>
                </div>
              </div>

              <ul className="featureList">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <Link href="/pay" className="btn btnGold btnFull">
                {plan.cta}
              </Link>

              <p className="smallNote">
                Access is delivered manually after payment verification and Discord confirmation.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}