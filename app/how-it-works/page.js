import SiteShell from "../../components/SiteShell";

export default function HowItWorksPage() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container">
          <h1>How it works</h1>
          <p>
            We explain the workflow without exposing proprietary details. The engine stays private — the delivery stays clear.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container info-grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
          <div className="card info-card">
            <h3>Market selection</h3>
            <p>We track liquid markets and volatility candidates where signals actually matter.</p>
          </div>
          <div className="card info-card">
            <h3>Multi-layer filtering</h3>
            <p>Momentum plus structure checks. We keep the methodology private — results are what matter.</p>
          </div>
          <div className="card info-card">
            <h3>Tiered signals</h3>
            <p>BUILDUP is earlier, ALMOST is near-entry, ENTRY is the highest-conviction execution layer.</p>
          </div>
          <div className="card info-card">
            <h3>Delivery</h3>
            <p>Signals are delivered via private Discord roles and channels based on the member’s plan.</p>
          </div>
        </div>

        <div className="note-box" style={{ marginTop: 22 }}>
          Signals are delivered via Discord roles to private channels. No public signal pages. No methodology leakage.
        </div>
      </section>
    </SiteShell>
  );
}