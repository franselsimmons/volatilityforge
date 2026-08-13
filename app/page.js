import Link from 'next/link';
import { BRANDS } from '../lib/brands';

export default function Home() {
  return (
    <main className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">INTERN · NEDERLANDS</p>
          <h1>Content HQ</h1>
          <p className="muted">Vijf bedrijven. Iedere dag één Engels bericht + afbeelding.</p>
        </div>
        <div className="status">WERKEND SYSTEEM</div>
      </header>

      <section className="intro-card">
        <strong>Dagelijkse workflow</strong>
        <p>Open een merk, controleer kort de Nederlandse uitleg, kopieer het Engelse bericht, download de afbeelding en plaats het. Iedere 14 dagen staat er automatisch een extra promotiebericht klaar.</p>
      </section>

      <section className="brand-grid">
        {Object.entries(BRANDS).map(([slug, brand]) => (
          <Link className="brand-card" key={slug} href={`/${slug}`} style={{'--brand': brand.color}}>
            <span className="brand-kicker">{brand.system}</span>
            <h2>{brand.name}</h2>
            <p>{brand.positioning}</p>
            <span className="open">Open merk →</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
