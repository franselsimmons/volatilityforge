'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LOCALES = ['nl', 'en', 'de', 'es', 'fr'];

const NAV_ITEMS = [
  {
    slug: '',
    labels: {
      nl: 'Home',
      en: 'Home',
      de: 'Start',
      es: 'Inicio',
      fr: 'Accueil'
    }
  },
  {
    slug: 'performance',
    labels: {
      nl: 'Performance',
      en: 'Performance',
      de: 'Performance',
      es: 'Rendimiento',
      fr: 'Performance'
    }
  },
  {
    slug: 'system',
    labels: {
      nl: 'Systeem',
      en: 'System',
      de: 'System',
      es: 'Sistema',
      fr: 'Système'
    }
  },
  {
    slug: 'signal-room',
    labels: {
      nl: 'Signal Room',
      en: 'Signal Room',
      de: 'Signal Room',
      es: 'Sala de señales',
      fr: 'Salle de signaux'
    }
  },
  {
    slug: 'pricing',
    labels: {
      nl: 'Pricing',
      en: 'Pricing',
      de: 'Preise',
      es: 'Precios',
      fr: 'Tarifs'
    }
  },
  {
    slug: 'faq',
    labels: {
      nl: 'FAQ',
      en: 'FAQ',
      de: 'FAQ',
      es: 'FAQ',
      fr: 'FAQ'
    }
  }
];

const TEXT = {
  nl: {
    menu: 'Menu',
    privateFeed: 'Private feed',
    language: 'Taal',
    apply: 'Toegang aanvragen',
    footerTagline: 'Private LONG & SHORT crypto signal room.',
    risk:
      'Geen financieel advies. Trading heeft risico. Resultaten uit het verleden, modelberekeningen en voorbeeldsignalen geven geen garantie voor toekomstige resultaten.',
    riskLink: 'Risicodisclaimer'
  },
  en: {
    menu: 'Menu',
    privateFeed: 'Private feed',
    language: 'Language',
    apply: 'Request access',
    footerTagline: 'Private LONG & SHORT crypto signal room.',
    risk:
      'No financial advice. Trading involves risk. Past performance, model calculations and example signals do not guarantee future results.',
    riskLink: 'Risk disclaimer'
  },
  de: {
    menu: 'Menü',
    privateFeed: 'Private Feed',
    language: 'Sprache',
    apply: 'Zugang beantragen',
    footerTagline: 'Private LONG & SHORT Krypto-Signalgruppe.',
    risk:
      'Keine Finanzberatung. Trading ist mit Risiken verbunden. Vergangene Ergebnisse, Modellberechnungen und Beispielsignale garantieren keine zukünftigen Resultate.',
    riskLink: 'Risikohinweis'
  },
  es: {
    menu: 'Menú',
    privateFeed: 'Feed privado',
    language: 'Idioma',
    apply: 'Solicitar acceso',
    footerTagline: 'Sala privada de señales cripto LONG & SHORT.',
    risk:
      'No es asesoramiento financiero. El trading implica riesgo. Los resultados pasados, cálculos de modelo y señales de ejemplo no garantizan resultados futuros.',
    riskLink: 'Aviso de riesgo'
  },
  fr: {
    menu: 'Menu',
    privateFeed: 'Flux privé',
    language: 'Langue',
    apply: 'Demander l’accès',
    footerTagline: 'Salle privée de signaux crypto LONG & SHORT.',
    risk:
      'Aucun conseil financier. Le trading comporte des risques. Les performances passées, calculs de modèle et exemples de signaux ne garantissent pas les résultats futurs.',
    riskLink: 'Avertissement sur les risques'
  }
};

function getCopy(locale) {
  return TEXT[locale] || TEXT.en;
}

function getNavLabel(item, locale) {
  return item.labels[locale] || item.labels.en;
}

function getHref(locale, slug = '') {
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

function getLocaleSwitchHref(targetLocale, currentPathname) {
  if (!currentPathname || currentPathname === '/') {
    return `/${targetLocale}`;
  }

  const parts = currentPathname.split('/').filter(Boolean);
  const firstPart = parts[0];

  if (LOCALES.includes(firstPart)) {
    parts[0] = targetLocale;
    return `/${parts.join('/')}`;
  }

  return `/${targetLocale}`;
}

export default function SiteShell({ locale = 'nl', children }) {
  const pathname = usePathname();
  const safeLocale = LOCALES.includes(locale) ? locale : 'nl';
  const copy = getCopy(safeLocale);

  return (
    <div className="appShell">
      <header className="siteHeader">
        <div className="headerTop">
          <Link
            className="brandBannerLink"
            href={`/${safeLocale}`}
            aria-label="VolatilityForge home"
          >
            <div className="logoBanner">
              <img
                src="/volatilityforge-logo.svg"
                alt="VolatilityForge"
                width="1551"
                height="455"
                loading="eager"
                decoding="async"
              />
            </div>
          </Link>

          <div className="headerActions">
            <nav className="langSwitch" aria-label={copy.language}>
              {LOCALES.map((item) => (
                <Link
                  key={item}
                  href={getLocaleSwitchHref(item, pathname)}
                  className={item === safeLocale ? 'active' : undefined}
                  hrefLang={item}
                >
                  {item.toUpperCase()}
                </Link>
              ))}
            </nav>

            <details className="menuDrawer">
              <summary className="menuButton" aria-label={copy.menu}>
                <span className="menuIcon" aria-hidden="true">
                  <span />
                </span>
              </summary>

              <div className="drawerPanel">
                <div className="drawerTitle">
                  <span>VolatilityForge</span>
                  <em>{copy.privateFeed}</em>
                </div>

                <nav className="drawerNav" aria-label="Main navigation">
                  {NAV_ITEMS.map((item) => (
                    <Link key={item.slug || 'home'} href={getHref(safeLocale, item.slug)}>
                      {getNavLabel(item, safeLocale)}
                    </Link>
                  ))}

                  <Link href={`/${safeLocale}/apply`}>{copy.apply}</Link>
                </nav>

                <div className="drawerLanguages">
                  <span>{copy.language}</span>

                  <div className="drawerLanguageGrid">
                    {LOCALES.map((item) => (
                      <Link
                        key={item}
                        href={getLocaleSwitchHref(item, pathname)}
                        className={item === safeLocale ? 'active' : undefined}
                        hrefLang={item}
                      >
                        {item.toUpperCase()}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </header>

      <main className="mainContent">{children}</main>

      <footer className="siteFooter">
        <div className="footerTop">
          <div className="footerBrand">
            <strong>VolatilityForge</strong>
            <span>{copy.footerTagline}</span>
          </div>

          <nav className="footerLinks" aria-label="Footer navigation">
            {NAV_ITEMS.map((item) => (
              <Link key={item.slug || 'home'} href={getHref(safeLocale, item.slug)}>
                {getNavLabel(item, safeLocale)}
              </Link>
            ))}

            <Link href={`/${safeLocale}/apply`}>{copy.apply}</Link>
            <Link href={`/${safeLocale}/legal/risk-disclaimer`}>{copy.riskLink}</Link>
          </nav>
        </div>

        <p className="footerDisclaimer">{copy.risk}</p>
      </footer>
    </div>
  );
}