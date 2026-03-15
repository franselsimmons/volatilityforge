import { SITE } from "@/lib/siteData";

export default function HowItWorksPage() {
  return (
    <main className="page">
      <section className="section">
        <div className="card cardHighlight">
          <h1>How it works</h1>
          <p>{SITE.howItWorks.intro}</p>
        </div>
      </section>

      <section className="section">
        <div className="grid2">
          {SITE.howItWorks.cards.map((card) => (
            <div key={card.title} className="card">
              <h2>{card.title}</h2>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h2>Scanner → Trade Desk</h2>
          <p>
            The workflow starts with market detection, moves through staged setup
            filtering, and only the strongest candidates reach the execution-ready
            Trade Desk layer.
          </p>
        </div>
      </section>

      <section className="section">
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
        <div className="callout">
          {SITE.howItWorks.footer}
        </div>
      </section>
    </main>
  );
}