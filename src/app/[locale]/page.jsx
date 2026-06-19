// ================= FILE FROM ROOT: src/app/[locale]/page.jsx =================

import Link from 'next/link';

const COPY = {
  en: {
    badge: 'Independent trading journal',
    heroTitle: 'Crypto signals without hype.',
    heroText:
      'VolatilityForge shows in plain language when the process acts, when it deliberately does nothing, and what the daily result was.',
    cta: 'View Discord preview',
    today: 'Today',
    todayText:
      'The public dashboard is being prepared. Daily updates will appear here once the clean measurement period is ready.',
    differentTitle: 'Why this is different',
    differentText:
      'The goal is not to send more signals. The goal is to filter better. If the market, direction and risk do not make sense, no action is taken.',
    resultsTitle: 'Latest public updates',
    emptyResult: 'No public updates yet.',
    screenshotsTitle: 'Screenshots',
    screenshotsText:
      'Trade screenshots and public result cards can be added later from the protected admin area.',
    disclaimer:
      'No financial advice. Trading involves risk. Past results do not guarantee future performance.'
  },
  nl: {
    badge: 'Onafhankelijk trading-dagboek',
    heroTitle: 'Crypto-signalen zonder hype.',
    heroText:
      'VolatilityForge laat in gewone taal zien wanneer het proces handelt, wanneer het bewust niets doet, en wat het dagresultaat was.',
    cta: 'Bekijk Discord preview',
    today: 'Vandaag',
    todayText:
      'Het publieke dashboard wordt voorbereid. Dagupdates verschijnen hier zodra de schone meetperiode klaar is.',
    differentTitle: 'Waarom dit anders is',
    differentText:
      'Het doel is niet om meer signalen te sturen. Het doel is beter filteren. Als markt, richting en risico niet logisch genoeg zijn, wordt er niets gedaan.',
    resultsTitle: 'Laatste publieke updates',
    emptyResult: 'Nog geen publieke updates.',
    screenshotsTitle: 'Screenshots',
    screenshotsText:
      'Trade-screenshots en publieke resultaatkaarten kun je later toevoegen via het beveiligde beheer.',
    disclaimer:
      'Geen financieel advies. Trading heeft risico. Resultaten uit het verleden geven geen garantie.'
  },
  de: {
    badge: 'Unabhängiges Trading-Journal',
    heroTitle: 'Krypto-Signale ohne Hype.',
    heroText:
      'VolatilityForge zeigt in einfacher Sprache, wann der Prozess handelt, wann bewusst nichts getan wird und wie das Tagesergebnis ausfiel.',
    cta: 'Discord-Vorschau ansehen',
    today: 'Heute',
    todayText:
      'Das öffentliche Dashboard wird vorbereitet. Tagesupdates erscheinen hier, sobald die saubere Messphase bereit ist.',
    differentTitle: 'Warum das anders ist',
    differentText:
      'Das Ziel ist nicht, mehr Signale zu senden. Das Ziel ist besser zu filtern. Wenn Markt, Richtung und Risiko nicht passen, wird nicht gehandelt.',
    resultsTitle: 'Letzte öffentliche Updates',
    emptyResult: 'Noch keine öffentlichen Updates.',
    screenshotsTitle: 'Screenshots',
    screenshotsText:
      'Trade-Screenshots und öffentliche Ergebniskarten können später im geschützten Admin-Bereich hinzugefügt werden.',
    disclaimer:
      'Keine Finanzberatung. Trading ist riskant. Vergangene Ergebnisse garantieren keine zukünftigen Resultate.'
  },
  es: {
    badge: 'Diario de trading independiente',
    heroTitle: 'Señales cripto sin hype.',
    heroText:
      'VolatilityForge muestra en lenguaje claro cuándo el proceso actúa, cuándo decide no hacer nada y cuál fue el resultado del día.',
    cta: 'Ver vista previa de Discord',
    today: 'Hoy',
    todayText:
      'El panel público se está preparando. Las actualizaciones diarias aparecerán aquí cuando el periodo de medición limpio esté listo.',
    differentTitle: 'Por qué es diferente',
    differentText:
      'El objetivo no es enviar más señales. El objetivo es filtrar mejor. Si mercado, dirección y riesgo no tienen sentido, no se actúa.',
    resultsTitle: 'Últimas actualizaciones públicas',
    emptyResult: 'Todavía no hay actualizaciones públicas.',
    screenshotsTitle: 'Capturas',
    screenshotsText:
      'Las capturas de operaciones y tarjetas públicas de resultados podrán añadirse más tarde desde el área protegida.',
    disclaimer:
      'No es asesoramiento financiero. El trading implica riesgo. Los resultados pasados no garantizan resultados futuros.'
  },
  fr: {
    badge: 'Journal de trading indépendant',
    heroTitle: 'Signaux crypto sans battage.',
    heroText:
      'VolatilityForge montre en langage simple quand le processus agit, quand il choisit de ne rien faire, et quel a été le résultat du jour.',
    cta: 'Voir l’aperçu Discord',
    today: 'Aujourd’hui',
    todayText:
      'Le tableau public est en préparation. Les mises à jour quotidiennes apparaîtront ici lorsque la période de mesure propre sera prête.',
    differentTitle: 'Pourquoi c’est différent',
    differentText:
      'Le but n’est pas d’envoyer plus de signaux. Le but est de mieux filtrer. Si le marché, la direction et le risque ne sont pas cohérents, aucune action n’est prise.',
    resultsTitle: 'Dernières mises à jour publiques',
    emptyResult: 'Aucune mise à jour publique pour le moment.',
    screenshotsTitle: 'Captures',
    screenshotsText:
      'Les captures de trades et cartes publiques de résultats pourront être ajoutées plus tard depuis l’espace protégé.',
    disclaimer:
      'Ceci n’est pas un conseil financier. Le trading comporte des risques. Les résultats passés ne garantissent pas les performances futures.'
  }
};

const LOCALES = ['en', 'nl', 'de', 'es', 'fr'];

export default function LocaleHomePage({ params }) {
  const locale = LOCALES.includes(params.locale) ? params.locale : 'en';
  const copy = COPY[locale];

  return (
    <main className="pageShell">
      <header className="topbar">
        <Link href={`/${locale}`} className="brand">
          <span className="brandMark">VF</span>
          <span>VolatilityForge</span>
        </Link>

        <nav className="localeNav">
          {LOCALES.map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              className={item === locale ? 'activeLocale' : ''}
            >
              {item.toUpperCase()}
            </Link>
          ))}
        </nav>
      </header>

      <section className="hero">
        <div>
          <p className="badge">{copy.badge}</p>
          <h1>{copy.heroTitle}</h1>
          <p className="heroText">{copy.heroText}</p>

          <div className="heroActions">
            <a
              className="primaryButton"
              href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || '#'}
              target="_blank"
              rel="noreferrer"
            >
              {copy.cta}
            </a>
            <Link className="ghostButton" href="/admin/login">
              Admin
            </Link>
          </div>
        </div>

        <div className="statusCard">
          <div className="cardHeader">
            <span>{copy.today}</span>
            <span className="statusDot">Preparing</span>
          </div>
          <p>{copy.todayText}</p>
        </div>
      </section>

      <section className="gridTwo">
        <article className="panel">
          <h2>{copy.differentTitle}</h2>
          <p>{copy.differentText}</p>
        </article>

        <article className="panel">
          <h2>{copy.resultsTitle}</h2>
          <div className="emptyState">{copy.emptyResult}</div>
        </article>
      </section>

      <section className="panel">
        <h2>{copy.screenshotsTitle}</h2>
        <p>{copy.screenshotsText}</p>
      </section>

      <footer className="footer">
        <p>{copy.disclaimer}</p>
      </footer>
    </main>
  );
}