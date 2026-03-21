import { faqItems } from "../../lib/siteData";

export default function FaqPage() {
  return (
    <section className="stack">
      <div className="card">
        <h1>FAQ</h1>
        <p className="lead">
          Straight answers about delivery, access and what each plan includes.
        </p>
      </div>

      <div className="stack">
        {faqItems.map((item) => (
          <div key={item.q} className="card">
            <h2>{item.q}</h2>
            <p className="muted">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
