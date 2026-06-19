// ================= FILE FROM ROOT: src/app/admin/page.jsx =================

import Link from 'next/link';

export default function AdminPage() {
  return (
    <main className="adminShell">
      <section className="adminPanel">
        <div className="brand">
          <span className="brandMark">VF</span>
          <span>VolatilityForge Admin</span>
        </div>

        <h1>Beheer</h1>
        <p>
          Deze V1 is klaar voor handmatige invoer in klanttaal. Voeg hier later
          de formulieren toe voor dagupdates, screenshots en social drafts.
        </p>

        <div className="adminGrid">
          <div className="adminBox">
            <h2>Dagupdates</h2>
            <p>Vul long-acties, short-acties, afgewezen kansen en dagtekst in.</p>
          </div>

          <div className="adminBox">
            <h2>Screenshots</h2>
            <p>Gebruik alleen publieke captions. Geen interne systeemtaal.</p>
          </div>

          <div className="adminBox">
            <h2>Social drafts</h2>
            <p>Bewaar teksten voor Instagram, X en Facebook per taal.</p>
          </div>
        </div>

        <Link className="ghostButton" href="/en">
          Terug naar site
        </Link>
      </section>
    </main>
  );
}