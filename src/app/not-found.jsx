// ================= FILE FROM ROOT: src/app/not-found.jsx =================

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="adminShell">
      <section className="loginCard">
        <div className="brand center">
          <span className="brandMark">VF</span>
          <span>VolatilityForge</span>
        </div>

        <h1>404</h1>
        <p>Deze pagina bestaat niet.</p>

        <Link className="primaryButton" href="/en">
          Terug naar homepage
        </Link>
      </section>
    </main>
  );
}