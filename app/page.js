import Link from "next/link";
import { SITE } from "@/lib/siteData";

export default function HomePage() {
  return (
    <main className="page">
      <section className="hero">
        <div className="heroBox">
          <h1>{SITE.hero.title}</h1>
          <p>{SITE.hero.subtitle}</p>

          <div className="heroActions">
            <Link href={SITE.hero.ctaPrimary.href} className="btn btnGold">
              {SITE.hero.ctaPrimary.label}
            </Link>
            <Link href={SITE.hero.ctaSecondary.href} className="btn btnDark">
              {SITE.hero.ctaSecondary.label}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h2>Scanner + Trade Desk</h2>
          <p>
            VolatilityForge is no longer just a scanner product.
            It is a staged signal system that starts with detection and ends with
            execution-ready delivery.
          </p>
        </div>
      </section>

      <section className="section">
        <h2 className="sectionTitle">From detection to execution</h2>
        <div className="pipelineGrid">
          {SITE.pipeline.map((item) => (
            <div key={item.stage} className="card pipelineCard">
              <h3>{item.stage}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid2">
          {SITE.homepageSections.map((item) => (
            <div key={item.title} className="card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="card cardHighlight">
          <h2>Three plans. Clear positioning.</h2>
          <p>
            Lower tiers get earlier setup visibility. Higher tiers get tighter
            filtering and stronger execution-grade access. You do not reveal the
            engine. You sell the result.
          </p>

          <div className="callout">
            Members do not buy “secret code.” They buy structured signal delivery,
            cleaner selection and private Discord access.
          </div>

          <div className="heroActions">
            <Link href="/pricing" className="btn btnGold">
              See plans
            </Link>
            <Link href="/faq" className="btn btnDark">
              Read FAQ
            </Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 {SITE.name}</p>
        <p>{SITE.footer.disclaimer}</p>
      </footer>
    </main>
  );
}