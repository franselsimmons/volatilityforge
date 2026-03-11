import Link from "next/link";
import SiteShell from "../components/SiteShell";

export default function HomePage() {
  return (
    <SiteShell>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">Premium Discord Signals</div>
            <h1>Precision Signals for Volatility Traders</h1>
            <p>
              VolatilityForge delivers tiered, execution-minded alerts through private Discord channels.
              We show the workflow, the quality standard and the delivery model — not the proprietary engine itself.
            </p>

            <div className="cta-row">
              <Link href="/pricing" className="btn btn-primary">View Pricing</Link>
              <Link href="/how-it-works" className="btn btn-secondary">How it works</Link>
            </div>
          </div>

          <div className="card hero-card">
            <h3>What customers are buying</h3>
            <p>
              Not a public dashboard. Not random spam. Members pay for cleaner alerts, tighter filtering and
              structured delivery into private channels.
            </p>

            <div className="kpi-list">
              <div className="kpi">
                <strong>Tiered delivery</strong>
                <span className="muted">BUILDUP, ALMOST and ENTRY access via Discord roles.</span>
              </div>
              <div className="kpi">
                <strong>Main + Moon</strong>
                <span className="muted">Higher plans unlock stronger Main and Moon funnels.</span>
              </div>
              <div className="kpi">
                <strong>Execution bias</strong>
                <span className="muted">Signals are meant to be actionable, not endless noise.</span>
              </div>
              <div className="kpi">
                <strong>Manual crypto onboarding</strong>
                <span className="muted">Customer pays manually, you verify and add them to Discord.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="feature-grid">
            <div className="card feature-card">
              <h3>Quality over quantity</h3>
              <p>We filter hard. Members get fewer alerts, but cleaner ones.</p>
            </div>
            <div className="card feature-card">
              <h3>Designed for execution</h3>
              <p>Signals are created to act on — not to keep people endlessly watching.</p>
            </div>
            <div className="card feature-card">
              <h3>Risk-aware by design</h3>
              <p>We avoid chaotic micro-noise and focus on structured setups with intent.</p>
            </div>
            <div className="card feature-card">
              <h3>Discord-first delivery</h3>
              <p>No public dashboard. No fluff. Straight into private channels via roles.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Three plans. Clear positioning.</h2>
            <p>
              The offer is simple: lower tiers get earlier setup visibility, higher tiers get tighter filtering and
              stronger execution-grade access. You do not reveal the engine. You sell the result.
            </p>
          </div>

          <div className="note-box">
            Members do not buy “secret code.” They buy structured signal delivery, cleaner selection and private Discord access.
          </div>

          <div className="cta-row" style={{ marginTop: 22 }}>
            <Link href="/pricing" className="btn btn-primary">See plans</Link>
            <Link href="/faq" className="btn btn-secondary">Read FAQ</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}