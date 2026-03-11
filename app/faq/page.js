import SiteShell from "../../components/SiteShell";

export default function FaqPage() {
  const items = [
    {
      q: "Do I get access to a website or dashboard?",
      a: "No. Customers receive Discord alerts in private channels through roles. The product is the signal delivery, not a public dashboard.",
    },
    {
      q: "Is this financial advice?",
      a: "No. These are signals and alerts. Every member remains fully responsible for their own execution, position sizing and risk management.",
    },
    {
      q: "How does access work after payment?",
      a: "After payment, the customer submits their Discord username and payment details. You verify manually and then assign the correct Discord role.",
    },
    {
      q: "Why are there different tiers?",
      a: "Lower tiers get earlier or narrower access. Higher tiers get stronger filtering and more execution-grade delivery, including Moon access where applicable.",
    },
  ];

  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container">
          <h1>FAQ</h1>
          <p>Clear answers for potential customers without exposing your proprietary backend or engine logic.</p>
        </div>
      </section>

      <section className="section">
        <div className="container faq-grid">
          {items.map((item) => (
            <div className="card faq-card" key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}