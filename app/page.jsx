import Logo from '../components/Logo';
import {
  DISCORD_URL,
  isPreview,
  todayUpdate,
  recentDays,
  principles
} from '../data/sample';

function ArrowRight() {
  return (
    <svg
      className="btn__arrow"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 8h11M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function resultClass(sign) {
  if (sign === 'pos') return 'result--pos';
  if (sign === 'neg') return 'result--neg';
  return 'result--flat';
}

export default function Home() {
  return (
    <>
      <header className="header">
        <div className="container header__inner">
          <Logo size={32} />
          {isPreview && <span className="badge">Voorbeeld</span>}
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="container hero">
          <p className="hero__eyebrow">Gefilterde crypto-selectie</p>
          <h1 className="hero__title">
            Niet méér signalen. <span className="soft">Betere signalen.</span>
          </h1>
          <p className="hero__sub">
            VolatilityForge volgt een streng selectieproces. Niet elke kans wordt genomen — soms
            is het sterkste signaal om te wachten.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              Bekijk de Discord-preview <ArrowRight />
            </a>
            <a className="btn btn--ghost" href="#waarom">
              Hoe het werkt
            </a>
          </div>

          {/* Vandaag-uitlezing */}
          <div className="today">
            <div className="today__head">
              <span className="today__label">Vandaag</span>
              {todayUpdate ? (
                <span className="today__meta">
                  {todayUpdate.date}
                  <span className="dot">·</span>
                  <span className="today__tone">{todayUpdate.tone}</span>
                </span>
              ) : null}
            </div>

            {todayUpdate ? (
              <>
                <div className="today__grid">
                  <div className="stat">
                    <div className="stat__num">{todayUpdate.long}</div>
                    <div className="stat__label">long-acties</div>
                  </div>
                  <div className="stat">
                    <div className="stat__num">{todayUpdate.short}</div>
                    <div className="stat__label">short-acties</div>
                  </div>
                  <div className="stat">
                    <div className="stat__num">{todayUpdate.rejected}</div>
                    <div className="stat__label">afgewezen kansen</div>
                  </div>
                  <div className="stat">
                    <div className={`stat__num ${resultClass(todayUpdate.resultSign)}`}>
                      {todayUpdate.result}
                    </div>
                    <div className="stat__label">resultaat</div>
                  </div>
                </div>
                <p className="today__summary">{todayUpdate.summary}</p>
              </>
            ) : (
              <p className="today__empty">
                Vandaag nog geen update. Zodra het selectieproces iets te melden heeft, verschijnt
                het hier.
              </p>
            )}
          </div>
        </section>

        <div className="container">
          <hr className="divider" />
        </div>

        {/* Waarom anders */}
        <section className="container section" id="waarom">
          <p className="eyebrow">Waarom dit anders is</p>
          <h2 className="section__title">De meeste groepen sturen te snel iets door.</h2>
          <p className="section__lead">
            VolatilityForge kijkt eerst of markt, richting en risico logisch samenvallen. Is dat
            niet zo, dan komt er geen signaal. Zo simpel is het.
          </p>

          <div className="principles">
            {principles.map((p, i) => (
              <div className="principle" key={p.title}>
                <div className="principle__index">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="principle__title">{p.title}</h3>
                <p className="principle__body">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="container">
          <hr className="divider" />
        </div>

        {/* Resultaten */}
        <section className="container section">
          <p className="eyebrow">Laatste dagen</p>
          <h2 className="section__title">Rustig, en zonder mooier maken dan het is.</h2>
          <p className="section__lead">
            Een eenvoudig overzicht van de afgelopen dagen. Verliesdagen horen er net zo goed bij
            als winstdagen.
          </p>

          <div className="results">
            <table className="rtable">
              <thead>
                <tr>
                  <th>Dag</th>
                  <th>Long</th>
                  <th>Short</th>
                  <th>Afgewezen</th>
                  <th>Resultaat</th>
                </tr>
              </thead>
              <tbody>
                {recentDays.map((d) => (
                  <tr key={d.day}>
                    <td>{d.day}</td>
                    <td>{d.long}</td>
                    <td>{d.short}</td>
                    <td>{d.rejected}</td>
                    <td className={resultClass(d.sign)}>{d.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isPreview && (
            <p className="results__note">
              Voorbeeldweergave — deze cijfers zijn illustratief tijdens de testfase.
            </p>
          )}
        </section>

        {/* CTA */}
        <section className="container section--tight">
          <div className="cta">
            <div>
              <h2 className="cta__title">Meekijken zonder verplichting</h2>
              <p className="cta__body">
                In de preview delen we rustige updates, resultaten en uitleg over het
                selectieproces. Geen druk, geen hype.
              </p>
            </div>
            <a className="btn btn--primary" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              Join de preview <ArrowRight />
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <Logo size={28} />
          </div>
          <p className="footer__disclaimer">
            Geen financieel advies. Trading in crypto brengt aanzienlijk risico met zich mee en je
            kunt (een deel van) je inleg verliezen. Resultaten uit het verleden bieden geen
            garantie voor de toekomst. VolatilityForge deelt observaties en uitleg over een eigen
            selectieproces; beslissingen die je neemt zijn je eigen verantwoordelijkheid.
          </p>
          <p className="footer__meta">© {new Date().getFullYear()} VolatilityForge</p>
        </div>
      </footer>
    </>
  );
}
