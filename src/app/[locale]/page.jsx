// ================= FILE FROM ROOT: src/app/[locale]/page.jsx =================

import Link from 'next/link';
import { notFound } from 'next/navigation';

const LOCALES = ['en', 'nl', 'de', 'es', 'fr'];

const PRICES = [
  {
    key: 'monthly',
    price: '€99',
    label: {
      en: 'Monthly Access',
      nl: 'Maandtoegang'
    },
    term: {
      en: '/ month',
      nl: '/ maand'
    },
    note: {
      en: 'Flexible',
      nl: 'Flexibel'
    }
  },
  {
    key: 'sixMonths',
    price: '€449',
    highlighted: true,
    label: {
      en: '6-Month Access',
      nl: '6 maanden toegang'
    },
    term: {
      en: '/ 6 months',
      nl: '/ 6 maanden'
    },
    note: {
      en: 'Recommended',
      nl: 'Aanbevolen'
    }
  },
  {
    key: 'annual',
    price: '€799',
    label: {
      en: 'Annual Access',
      nl: 'Jaartoegang'
    },
    term: {
      en: '/ year',
      nl: '/ jaar'
    },
    note: {
      en: 'Best value',
      nl: 'Beste waarde'
    }
  }
];

const EN = {
  nav: {
    proof: 'Performance',
    system: 'System',
    format: 'Signal room',
    pricing: 'Pricing',
    faq: 'FAQ'
  },
  badge: 'Private LONG & SHORT crypto signals',
  heroTitle: 'A private signal room built for selective crypto execution.',
  heroText:
    'VolatilityForge is one private Discord group for serious crypto traders. LONG and SHORT signals are only sent when market direction, setup quality and risk logic align. No call spam. No VIP tiers. One feed. One standard.',
  primaryCta: 'Request access',
  secondaryCta: 'View membership',
  trustItems: ['Private Discord', 'LONG + SHORT', 'Entry / stop / targets', 'Risk-first selection'],

  metricLabel: 'Model PnL',
  metricValue: '+49.2%',
  metricText:
    'Model-calculated account growth using 0.25% fixed risk per signal.',

  performanceTitle: '6 months of model-calculated signal performance.',
  performanceText:
    'The selected LONG and SHORT signal pools are translated into clear model-account PnL. This makes the performance easier to understand than raw technical scoring. The calculation uses a conservative 0.25% fixed risk per signal.',
  stats: [
    ['Model PnL', '+49.2%', 'Estimated account growth at 0.25% fixed risk per signal'],
    ['Measured period', '6 months', 'LONG and SHORT pools calculated together'],
    ['Closed signals', '232', 'Completed model outcomes in the selected pool'],
    ['Win rate', '46.8%', 'Weighted across LONG and SHORT'],
    ['Average result', '+0.85R', 'Average net gain per closed signal'],
    ['LONG / SHORT split', '+31.5% / +17.7%', 'Estimated contribution by direction']
  ],
  performanceNote:
    'Model PnL is not a promise of future results. Individual results can differ because of execution, fees, timing, position size, leverage and market conditions.',

  systemTitle: 'How a signal gets approved.',
  systemText:
    'The internal system stays private. Publicly, the process is simple: direction, setup quality and risk must align before a signal reaches the Discord feed.',
  systemSteps: [
    {
      k: '01',
      t: 'Market direction',
      d: 'LONG and SHORT conditions are evaluated separately. The process does not force trades in every market.'
    },
    {
      k: '02',
      t: 'Setup quality',
      d: 'A trade idea needs enough structure before it can become a member signal.'
    },
    {
      k: '03',
      t: 'Risk gate',
      d: 'A signal needs a clear invalidation level and realistic target logic before it is sent.'
    },
    {
      k: '04',
      t: 'Discord delivery',
      d: 'Members receive direction, entry zone, stop level, targets and follow-up updates.'
    }
  ],

  previewTitle: 'Private signal preview',
  previewSubtitle:
    'The live member feed is private. This example shows the clean structure members can expect.',
  signalRows: [
    ['Direction', 'SHORT'],
    ['Market', 'BTC / USDT'],
    ['Entry zone', '67,850 – 68,120'],
    ['Invalidation', '68,740'],
    ['Targets', '67,100 / 66,420 / 65,800'],
    ['Risk mode', 'Fixed risk per signal']
  ],

  productTitle: 'One signal room. One standard.',
  productText:
    'Every member receives the same private Discord feed. No artificial VIP layers, no hidden higher tier and no upgrade for better signals. The only difference is subscription length.',
  includedTitle: 'Every membership includes',
  included: [
    'Private Discord access',
    'LONG and SHORT crypto signals',
    'Entry zone, stop level and target zones',
    'Signal updates when a setup changes',
    'No signal when the market does not pass the filter'
  ],

  positioningTitle: 'Not another noisy signal group.',
  positioningText:
    'The value is not in sending more calls. The value is in rejecting weak opportunities and only sending signals when the setup, market and risk make sense.',
  positioningCards: [
    ['Selective by design', 'No forced daily signal count.'],
    ['Risk before excitement', 'Every signal needs a visible invalidation point.'],
    ['Same feed for everyone', 'All members receive the same LONG and SHORT alerts.'],
    ['Private execution', 'Live entries remain inside the member Discord.']
  ],

  pricingTitle: 'Membership pricing',
  pricingText:
    'One private Discord signal room. Every member receives the same LONG and SHORT signals. Price only changes by access length.',
  finalTitle: 'Built for traders who want discipline, not noise.',
  finalText:
    'Request access when you want the private Discord feed. VolatilityForge keeps the offer simple: one group, one standard, LONG and SHORT signals.',
  faqTitle: 'FAQ',
  faqs: [
    ['Is this financial advice?', 'No. VolatilityForge is not financial advice. Trading involves risk and losses are possible.'],
    ['Do members receive both LONG and SHORT signals?', 'Yes. The private Discord feed can send both LONG and SHORT crypto signals when the filter allows them.'],
    ['Are there multiple VIP tiers?', 'No. There is one private signal room. Subscription length changes the price, not the quality of signals.'],
    ['Do signals come every day?', 'Only when the market meets the filter. No-trade days are part of a disciplined process.']
  ],
  disclaimer:
    'No financial advice. Trading involves risk. Past performance does not guarantee future results. Model PnL is an estimate, not a guarantee.'
};

const NL = {
  nav: {
    proof: 'Resultaten',
    system: 'Systeem',
    format: 'Signal room',
    pricing: 'Prijzen',
    faq: 'FAQ'
  },
  badge: 'Private LONG & SHORT crypto-signalen',
  heroTitle: 'Een private signal room voor selectieve crypto-executie.',
  heroText:
    'VolatilityForge is één private Discord-groep voor serieuze crypto traders. LONG en SHORT signalen worden alleen gestuurd wanneer marktrichting, setupkwaliteit en risk-logica samen kloppen. Geen call-spam. Geen VIP-lagen. Eén feed. Eén standaard.',
  primaryCta: 'Vraag toegang aan',
  secondaryCta: 'Bekijk membership',
  trustItems: ['Private Discord', 'LONG + SHORT', 'Entry / stop / targets', 'Risico-eerst selectie'],

  metricLabel: 'Model PnL',
  metricValue: '+49.2%',
  metricText:
    'Modelberekende accountgroei met 0.25% vast risico per signaal.',

  performanceTitle: '6 maanden modelberekende signaalresultaten.',
  performanceText:
    'De geselecteerde LONG- en SHORT-signaalpools worden vertaald naar duidelijke model-PnL. Zo wordt performance begrijpelijker dan alleen technische scoredata. De berekening gebruikt conservatief 0.25% vast risico per signaal.',
  stats: [
    ['Model PnL', '+49.2%', 'Geschatte accountgroei bij 0.25% vast risico per signaal'],
    ['Meetperiode', '6 maanden', 'LONG en SHORT samen doorgerekend'],
    ['Gesloten signalen', '232', 'Afgeronde modeluitkomsten in de geselecteerde pool'],
    ['Winstpercentage', '46.8%', 'Gewogen over LONG en SHORT samen'],
    ['Gemiddeld resultaat', '+0.85R', 'Gemiddelde netto winst per gesloten signaal'],
    ['LONG / SHORT split', '+31.5% / +17.7%', 'Geschatte bijdrage per richting']
  ],
  performanceNote:
    'Model-PnL is geen belofte voor toekomstige resultaten. Individuele resultaten kunnen afwijken door uitvoering, fees, timing, positieomvang, leverage en marktomstandigheden.',

  systemTitle: 'Hoe een signaal wordt goedgekeurd.',
  systemText:
    'Het interne systeem blijft privé. Publiek is het proces simpel: richting, setupkwaliteit en risico moeten samen kloppen voordat een signaal naar de Discord-feed gaat.',
  systemSteps: [
    {
      k: '01',
      t: 'Marktrichting',
      d: 'LONG en SHORT worden apart beoordeeld. Het proces forceert geen trades in iedere markt.'
    },
    {
      k: '02',
      t: 'Setupkwaliteit',
      d: 'Een trade-idee moet genoeg structuur hebben voordat het een member-signaal wordt.'
    },
    {
      k: '03',
      t: 'Risicopoort',
      d: 'Een signaal heeft duidelijke invalidatie en realistische targetlogica nodig voordat het gestuurd wordt.'
    },
    {
      k: '04',
      t: 'Discord-delivery',
      d: 'Leden krijgen richting, entry-zone, stop-level, targets en vervolgupdates.'
    }
  ],

  previewTitle: 'Private signal preview',
  previewSubtitle:
    'De live member-feed is privé. Dit voorbeeld laat zien welke duidelijke structuur leden kunnen verwachten.',
  signalRows: [
    ['Richting', 'SHORT'],
    ['Market', 'BTC / USDT'],
    ['Entry-zone', '67,850 – 68,120'],
    ['Invalidatie', '68,740'],
    ['Targets', '67,100 / 66,420 / 65,800'],
    ['Risk mode', 'Vast risico per signaal']
  ],

  productTitle: 'Eén signal room. Eén standaard.',
  productText:
    'Elk lid krijgt dezelfde private Discord-feed. Geen kunstmatige VIP-lagen, geen verborgen hogere tier en geen upgrade voor betere signalen. Het enige verschil is de abonnementsduur.',
  includedTitle: 'Elke membership bevat',
  included: [
    'Private Discord-toegang',
    'LONG en SHORT crypto-signalen',
    'Entry-zone, stop-level en target-zones',
    'Signaalupdates wanneer een setup verandert',
    'Geen signaal wanneer de markt niet door het filter komt'
  ],

  positioningTitle: 'Niet weer een drukke signalengroep.',
  positioningText:
    'De waarde zit niet in meer calls sturen. De waarde zit in zwakke kansen afwijzen en alleen signalen sturen wanneer setup, markt en risico logisch genoeg zijn.',
  positioningCards: [
    ['Selectief gebouwd', 'Geen geforceerd aantal signalen per dag.'],
    ['Risico vóór enthousiasme', 'Elk signaal heeft een zichtbaar invalidatiepunt.'],
    ['Dezelfde feed voor iedereen', 'Alle leden krijgen dezelfde LONG en SHORT alerts.'],
    ['Private uitvoering', 'Live entries blijven binnen de member-Discord.']
  ],

  pricingTitle: 'Membership-prijzen',
  pricingText:
    'Eén private Discord signal room. Elk lid krijgt dezelfde LONG en SHORT signalen. De prijs verandert alleen door toegangsduur.',
  finalTitle: 'Gebouwd voor traders die discipline willen, geen ruis.',
  finalText:
    'Vraag toegang aan wanneer je de private Discord-feed wilt. VolatilityForge houdt het aanbod simpel: één groep, één standaard, LONG en SHORT signalen.',
  faqTitle: 'FAQ',
  faqs: [
    ['Is dit financieel advies?', 'Nee. VolatilityForge is geen financieel advies. Trading heeft risico en verliezen zijn mogelijk.'],
    ['Krijgen leden LONG én SHORT signalen?', 'Ja. De private Discord-feed kan LONG en SHORT crypto-signalen sturen wanneer het filter ze toelaat.'],
    ['Zijn er meerdere VIP-lagen?', 'Nee. Er is één private signal room. De abonnementsduur verandert de prijs, niet de kwaliteit van de signalen.'],
    ['Komen er elke dag signalen?', 'Alleen wanneer de markt door het filter komt. Geen-trade dagen horen bij een gedisciplineerd proces.']
  ],
  disclaimer:
    'Geen financieel advies. Trading heeft risico. Resultaten uit het verleden geven geen garantie voor de toekomst. Model-PnL is een schatting, geen garantie.'
};

const COPY = {
  en: EN,
  nl: NL,
  de: EN,
  es: EN,
  fr: EN
};

function localize(value, locale) {
  return value?.[locale] || value?.en || value?.nl || '';
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocaleHomePage({ params }) {
  const locale = params.locale;

  if (!LOCALES.includes(locale)) {
    notFound();
  }

  const copy = COPY[locale] || EN;
  const discordUrl = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || '#pricing';

  return (
    <main className="siteShell">
      <header className="topbar">
        <Link href={`/${locale}`} className="brand" aria-label="VolatilityForge home">
          <span className="logoFrame">
            <img className="brandLogo" src="/volatilityforge-logo.svg" alt="VolatilityForge" />
          </span>
        </Link>

        <nav className="desktopNav" aria-label="Main navigation">
          <a href="#proof">{copy.nav.proof}</a>
          <a href="#system">{copy.nav.system}</a>
          <a href="#format">{copy.nav.format}</a>
          <a href="#pricing">{copy.nav.pricing}</a>
          <a href="#faq">{copy.nav.faq}</a>
        </nav>

        <nav className="localeNav" aria-label="Language navigation">
          {LOCALES.map((item) => (
            <Link key={item} href={`/${item}`} className={item === locale ? 'activeLocale' : ''}>
              {item.toUpperCase()}
            </Link>
          ))}
        </nav>
      </header>

      <section className="heroSection">
        <div className="heroCopy">
          <p className="eyebrow">{copy.badge}</p>
          <h1>{copy.heroTitle}</h1>
          <p className="heroText">{copy.heroText}</p>

          <div className="heroActions">
            <a className="primaryButton" href={discordUrl}>
              {copy.primaryCta}
            </a>
            <a className="secondaryButton" href="#pricing">
              {copy.secondaryCta}
            </a>
          </div>

          <div className="trustStrip">
            {copy.trustItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <aside className="eliteConsole">
          <div className="consoleTop">
            <span>VolatilityForge Command Layer</span>
            <em>Private Signal Room</em>
          </div>

          <div className="heroMetric">
            <span>{copy.metricLabel}</span>
            <strong>{copy.metricValue}</strong>
            <p>{copy.metricText}</p>
          </div>

          <div className="consoleMetrics">
            <div>
              <span>Measured</span>
              <strong>6 months</strong>
            </div>
            <div>
              <span>Signals</span>
              <strong>232 closed</strong>
            </div>
            <div>
              <span>Direction</span>
              <strong>LONG + SHORT</strong>
            </div>
            <div>
              <span>Risk</span>
              <strong>0.25% / signal</strong>
            </div>
          </div>

          <div className="flowLine">
            <span>market</span>
            <i />
            <span>setup</span>
            <i />
            <span>risk</span>
            <i />
            <span>discord</span>
          </div>
        </aside>
      </section>

      <section id="proof" className="evidenceSection">
        <div className="sectionIntro narrow">
          <p className="sectionKicker">Performance</p>
          <h2>{copy.performanceTitle}</h2>
          <p>{copy.performanceText}</p>
        </div>

        <div className="statsGrid">
          {copy.stats.map(([label, value, sub]) => (
            <article key={label} className="statCard">
              <span>{label}</span>
              <strong>{value}</strong>
              <p>{sub}</p>
            </article>
          ))}
        </div>

        <div className="evidenceNotice">
          <span>Risk notice</span>
          <p>{copy.performanceNote}</p>
        </div>
      </section>

      <section id="format" className="signalPreviewSection">
        <article className="signalIntro">
          <p className="sectionKicker">Private feed</p>
          <h2>{copy.previewTitle}</h2>
          <p>{copy.previewSubtitle}</p>
        </article>

        <article className="premiumSignalCard">
          <div className="premiumSignalHeader">
            <div>
              <span>Example signal structure</span>
              <strong>Private Discord alert</strong>
            </div>
            <em>Risk-first</em>
          </div>

          <div className="premiumSignalRows">
            {copy.signalRows.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="sectionGrid twoColumns">
        <article className="panel panelLarge">
          <p className="sectionKicker">Membership</p>
          <h2>{copy.productTitle}</h2>
          <p>{copy.productText}</p>
        </article>

        <article className="panel panelList">
          <p className="sectionKicker">Included</p>
          <h2>{copy.includedTitle}</h2>
          <ul className="checkList">
            {copy.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section id="system" className="systemSection">
        <div className="sectionIntro">
          <p className="sectionKicker">Trade system</p>
          <h2>{copy.systemTitle}</h2>
          <p>{copy.systemText}</p>
        </div>

        <div className="systemSteps">
          {copy.systemSteps.map((step) => (
            <article key={step.k} className="stepCard">
              <span>{step.k}</span>
              <h3>{step.t}</h3>
              <p>{step.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="positioningSection">
        <div className="sectionIntro narrow">
          <p className="sectionKicker">Positioning</p>
          <h2>{copy.positioningTitle}</h2>
          <p>{copy.positioningText}</p>
        </div>

        <div className="proofCards">
          {copy.positioningCards.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="pricingSection">
        <div className="sectionIntro narrow">
          <p className="sectionKicker">Pricing</p>
          <h2>{copy.pricingTitle}</h2>
          <p>{copy.pricingText}</p>
        </div>

        <div className="priceGrid">
          {PRICES.map((plan) => (
            <article key={plan.key} className={plan.highlighted ? 'priceCard highlightedPrice' : 'priceCard'}>
              <div className="priceTopline">
                <span>{localize(plan.label, locale)}</span>
                <em>{localize(plan.note, locale)}</em>
              </div>

              <div className="priceValue">
                <strong>{plan.price}</strong>
                <span>{localize(plan.term, locale)}</span>
              </div>

              <a className={plan.highlighted ? 'primaryButton fullButton' : 'secondaryButton fullButton'} href={discordUrl}>
                {copy.primaryCta}
              </a>
            </article>
          ))}
        </div>

        <div className="includedPanel">
          <h3>{copy.includedTitle}</h3>
          <ul>
            {copy.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="finalCta">
        <div>
          <p className="sectionKicker">VolatilityForge</p>
          <h2>{copy.finalTitle}</h2>
          <p>{copy.finalText}</p>
        </div>
        <a className="primaryButton" href={discordUrl}>
          {copy.primaryCta}
        </a>
      </section>

      <section id="faq" className="faqSection">
        <div className="sectionIntro narrow">
          <p className="sectionKicker">FAQ</p>
          <h2>{copy.faqTitle}</h2>
        </div>

        <div className="faqGrid">
          {copy.faqs.map(([question, answer]) => (
            <article key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <span>© VolatilityForge</span>
        <p>{copy.disclaimer}</p>
      </footer>
    </main>
  );
}