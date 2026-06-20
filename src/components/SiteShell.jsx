import Link from 'next/link';

const LOCALES = ['nl', 'en', 'de', 'es', 'fr'];

const NAV_ITEMS = [
  {
    slug: '',
    labels: {
      nl: 'Home',
      en: 'Home',
      de: 'Home',
      es: 'Home',
      fr: 'Home'
    }
  },
  {
    slug: 'performance',
    labels: {
      nl: 'Performance',
      en: 'Performance',
      de: 'Performance',
      es: 'Performance',
      fr: 'Performance'
    }
  },
  {
    slug: 'system',
    labels: {
      nl: 'Systeem',
      en: 'System',
      de: 'System',
      es: 'System',
      fr: 'System'
    }
  },
  {
    slug: 'signal-room',
    labels: {
      nl: 'Signal Room',
      en: 'Signal Room',
      de: 'Signal Room',
      es: 'Signal Room',
      fr: 'Signal Room'
    }
  },
  {
    slug: 'pricing',
    labels: {
      nl: 'Pricing',
      en: 'Pricing',
      de: 'Pricing',
      es: 'Pricing',
      fr: 'Pricing'
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
    menu: 'Menu',
    privateFeed: 'Private feed',
    language: 'Language',
    apply: 'Request access',
    footerTagline: 'Private LONG & SHORT crypto signal room.',
    risk:
      'No financial advice. Trading involves risk. Past performance, model calculations and example signals do not guarantee future results.',
    riskLink: 'Risk disclaimer'
  },
  es: {
    menu: 'Menu',
    privateFeed: 'Private feed',
    language: 'Language',
    apply: 'Request access',
    footerTagline: 'Private LONG & SHORT crypto signal room.',
    risk:
      'No financial advice. Trading involves risk. Past performance, model calculations and example signals do not guarantee future results.',
    riskLink: 'Risk disclaimer'
  },
  fr: {
    menu: 'Menu',
    privateFeed: 'Private feed',
    language: 'Language',
    apply: 'Request access',
    footerTagline: 'Private LONG & SHORT crypto signal room.',
    risk:
      'No financial advice. Trading involves risk. Past performance, model calculations and example signals do not guarantee future results.',
    riskLink: 'Risk disclaimer'
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

export default function SiteShell({ locale = 'nl', children }) {
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
                width="1672"
                height="941"
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
                  href={`/${item}`}
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
                        href={`/${item}`}
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