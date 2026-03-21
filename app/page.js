import Link from "next/link";
import { channelGroups, siteData } from "../lib/siteData";

export default function HomePage() {
  return (
    <section className="stack">
      <div className="hero">
        <div className="eyebrow">PREMIUM DISCORD SIGNALS</div>
        <h1>Precision signals for volatility traders</h1>
        <p className="lead">
          {siteData.brand} delivers tiered, execution-minded alerts through
          private Discord channels. Members buy cleaner delivery, tighter
          filtering and structured signal access.
        </p>

        <div className="heroActions">
          <Link href="/pricing" className="btn btnPrimary">
            View Pricing
          </Link>
          <Link href="/how-it-works" className="btn btnGhost">
            How it works
          </Link>
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <h2>What customers are buying</h2>
          <p className="muted">
            Not a public dashboard. Not random spam. Members pay for cleaner
            alerts, tighter filtering and structured delivery into private
            channels.
          </p>
        </div>

        <div className="card">
          <h2>Quality over quantity</h2>
          <p className="muted">
            We filter hard. Members get fewer alerts, but cleaner ones that are
            easier to act on.
          </p>
        </div>

        <div className="card">
          <h2>Designed for execution</h2>
          <p className="muted">
            Signals are created to act on — not to keep people endlessly
            watching.
          </p>
        </div>

        <div className="card">
          <h2>Discord-first delivery</h2>
          <p className="muted">
            No public dashboard. No fluff. Straight into private channels via
            Discord roles and manual assignment after payment verification.
          </p>
        </div>
      </div>

      <div className="card">
        <h2>Channel groups</h2>
        <div className="planGrid">
          {channelGroups.map((g) => (
            <div key={g.name} className="planCard">
              <div className="badgePill">{g.quality}</div>
              <h3>{g.name}</h3>
              <p className="muted">{g.summary}</p>
              <ul className="list">
                {g.channels.map((ch) => (
                  <li key={ch}>{ch}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
