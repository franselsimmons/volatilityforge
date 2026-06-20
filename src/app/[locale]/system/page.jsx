import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';

const LOCALES = ['en', 'nl', 'de', 'es', 'fr'];

const COPY = {
  nl: {
    badge: 'Trade System',
    title: 'Een selectieproces vóórdat een signaal de private feed bereikt.',
    intro:
      'VolatilityForge toont publiek niet de volledige interne motor. Dat blijft privé. Wat leden wel moeten begrijpen: signalen worden niet willekeurig geplaatst. Elk signaal moet door een strak proces van richting, setupkwaliteit, risico en uitvoerbaarheid.',

    primaryCta: 'Vraag toegang aan',
    secondaryCta: 'Bekijk signal room',

    deskTitle: 'Geen call-spam. Geen geforceerde trades.',
    deskText:
      'Het systeem is gebouwd om zwakke kansen te weigeren. De waarde zit niet in elke dag iets roepen, maar in wachten tot de markt, setup en risicostructuur voldoende samenkomen.',

    principles: [
      {
        title: 'Richting eerst',
        text: 'LONG en SHORT worden apart beoordeeld. Het systeem hoeft niet altijd bullish of bearish te zijn.'
      },
      {
        title: 'Setupkwaliteit',
        text: 'Een trade-idee moet genoeg structuur hebben voordat het als signaal geschikt is.'
      },
      {
        title: 'Risico vóór hype',
        text: 'Een signaal zonder duidelijke invalidatie hoort niet thuis in een serieuze signal room.'
      },
      {
        title: 'Private uitvoering',
        text: 'De details van live signalen blijven binnen de Discord-feed voor leden.'
      }
    ],

    flowTitle: 'Van markt naar signaal.',
    flowText:
      'Het publieke proces is bewust simpel gehouden. Leden hoeven de volledige technische motor niet te kennen om te begrijpen waarom een signaal wel of niet wordt gedeeld.',
    flow: [
      {
        title: '1. Marktcontext',
        text: 'Eerst wordt bekeken of de marktconditie überhaupt geschikt is voor een LONG of SHORT kans.'
      },
      {
        title: '2. Setupfilter',
        text: 'Daarna wordt gekeken of er genoeg structuur is: momentum, locatie, reactie en ruimte tot targets.'
      },
      {
        title: '3. Risicopoort',
        text: 'Een setup moet een duidelijke stop, invalidatie en realistische targets hebben.'
      },
      {
        title: '4. Signal room',
        text: 'Pas daarna wordt het signaal geplaatst met richting, entry-zone, invalidatie, targets en updates.'
      }
    ],

    whatPublicTitle: 'Wat publiek wordt uitgelegd.',
    whatPublicText:
      'De site legt uit hoe het proces werkt zonder interne logica, technische labels of systeemdetails te publiceren. Dat houdt de merkwaarde beschermd.',
    publicItems: [
      'Signalen zijn selectief, niet geforceerd.',
      'LONG en SHORT worden apart behandeld.',
      'Elk signaal heeft een entry-zone, stop en targetlogica.',
      'Geen trade is een geldige uitkomst wanneer de markt niet goed genoeg is.',
      'Alle leden krijgen dezelfde private feed.'
    ],

    whatPrivateTitle: 'Wat privé blijft.',
    whatPrivateText:
      'De interne motor, exacte filters, technische scoring en selectieparameters blijven buiten de publieke website. De klant koopt toegang tot de output, niet tot de volledige interne blauwdruk.',
    privateItems: [
      'Interne modelstructuur',
      'Exacte selectieparameters',
      'Technische scoringdetails',
      'Onderliggende signaalpools',
      'Live Discord-updates'
    ],

    signalTitle: 'Hoe een signaal eruitziet.',
    signalText:
      'De signaalopbouw blijft praktisch. Een lid moet snel kunnen zien wat de richting is, waar de entry ligt, waar de setup ongeldig wordt en welke targets relevant zijn.',
    signalRows: [
      ['Richting', 'LONG of SHORT'],
      ['Market', 'Bijvoorbeeld BTC / USDT'],
      ['Entry-zone', 'Prijszone waarin de setup actief is'],
      ['Invalidatie', 'Het niveau waar de setup ongeldig wordt'],
      ['Targets', 'Meerdere targetzones voor gedeeltelijke of volledige exits'],
      ['Update', 'Aanpassing of sluiting wanneer de markt verandert']
    ],

    riskTitle: 'Risico is onderdeel van het systeem.',
    riskText:
      'VolatilityForge is geen belofte op winst. Trading heeft risico. Het systeem is ontworpen om discipline te ondersteunen, maar werkelijke resultaten blijven afhankelijk van uitvoering, timing, fees, liquiditeit, positieomvang, leverage en marktomstandigheden.',

    finalTitle: 'Wil je de signalen zien zoals leden ze ontvangen?',
    finalText:
      'Bekijk de private signal room-opbouw of start een aanvraag voor toegang.',
    finalPrimary: 'Aanvraag starten',
    finalSecondary: 'Signal room bekijken'
  },

  en: {
    badge: 'Trade System',
    title: 'A selection process before a signal reaches the private feed.',
    intro:
      'VolatilityForge does not publicly expose the full internal engine. That remains private. What members should understand: signals are not posted randomly. Every signal must pass a structured process of direction, setup quality, risk and execution logic.',

    primaryCta: 'Request access',
    secondaryCta: 'View signal room',

    deskTitle: 'No call spam. No forced trades.',
    deskText:
      'The system is built to reject weak opportunities. The value is not in posting something every day, but in waiting until market, setup and risk structure align.',

    principles: [
      {
        title: 'Direction first',
        text: 'LONG and SHORT conditions are evaluated separately. The system does not need to be permanently bullish or bearish.'
      },
      {
        title: 'Setup quality',
        text: 'A trade idea needs enough structure before it is suitable as a member signal.'
      },
      {
        title: 'Risk before hype',
        text: 'A signal without clear invalidation does not belong in a serious signal room.'
      },
      {
        title: 'Private execution',
        text: 'Live signal details remain inside the member Discord feed.'
      }
    ],

    flowTitle: 'From market to signal.',
    flowText:
      'The public process is intentionally simple. Members do not need to know the full technical engine to understand why a signal is or is not shared.',
    flow: [
      {
        title: '1. Market context',
        text: 'First, the market condition is checked to see whether a LONG or SHORT opportunity is even suitable.'
      },
      {
        title: '2. Setup filter',
        text: 'Then the setup is reviewed for structure: momentum, location, reaction and room toward targets.'
      },
      {
        title: '3. Risk gate',
        text: 'A setup needs a clear stop, invalidation level and realistic target logic.'
      },
      {
        title: '4. Signal room',
        text: 'Only then is the signal posted with direction, entry zone, invalidation, targets and updates.'
      }
    ],

    whatPublicTitle: 'What is explained publicly.',
    whatPublicText:
      'The site explains how the process works without publishing internal logic, technical labels or system details. That keeps the brand value protected.',
    publicItems: [
      'Signals are selective, not forced.',
      'LONG and SHORT are handled separately.',
      'Every signal has an entry zone, stop and target logic.',
      'No trade is a valid outcome when the market is not good enough.',
      'Every member receives the same private feed.'
    ],

    whatPrivateTitle: 'What stays private.',
    whatPrivateText:
      'The internal engine, exact filters, technical scoring and selection parameters stay outside the public website. The client buys access to the output, not the full internal blueprint.',
    privateItems: [
      'Internal model structure',
      'Exact selection parameters',
      'Technical scoring details',
      'Underlying signal pools',
      'Live Discord updates'
    ],

    signalTitle: 'What a signal looks like.',
    signalText:
      'The signal structure stays practical. A member should quickly see the direction, entry zone, invalidation level and relevant targets.',
    signalRows: [
      ['Direction', 'LONG or SHORT'],
      ['Market', 'For example BTC / USDT'],
      ['Entry zone', 'Price zone where the setup is active'],
      ['Invalidation', 'The level where the setup becomes invalid'],
      ['Targets', 'Multiple target zones for partial or full exits'],
      ['Update', 'Adjustment or closure when the market changes']
    ],

    riskTitle: 'Risk is part of the system.',
    riskText:
      'VolatilityForge is not a promise of profit. Trading involves risk. The system is designed to support discipline, but real results still depend on execution, timing, fees, liquidity, position size, leverage and market conditions.',

    finalTitle: 'Want to see signals as members receive them?',
    finalText:
      'View the private signal room structure or start an application for access.',
    finalPrimary: 'Start application',
    finalSecondary: 'View signal room'
  }
};

COPY.de = COPY.en;
COPY.es = COPY.en;
COPY.fr = COPY.en;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }) {
  const locale = params.locale;

  if (!LOCALES.includes(locale)) {
    return {};
  }

  const copy = COPY[locale] || COPY.en;

  return {
    title: locale === 'nl' ? 'Trade System' : 'Trade System',
    description: copy.intro
  };
}

export default function SystemPage({ params }) {
  const locale = params.locale;

  if (!LOCALES.includes(locale)) {
    notFound();
  }

  const copy = COPY[locale] || COPY.en;

  return (
    <SiteShell locale={locale}>
      <section className="pageStack">
        <div className="center narrow">
          <p className="eyebrow">{copy.badge}</p>
          <h1>{copy.title}</h1>
          <p className="lead">{copy.intro}</p>

          <div className="buttonRow center">
            <Link className="primaryButton" href={`/${locale}/apply`}>
              {copy.primaryCta}
            </Link>
            <Link className="secondaryButton" href={`/${locale}/signal-room`}>
              {copy.secondaryCta}
            </Link>
          </div>
        </div>

        <article className="panel">
          <p className="kicker">Selection</p>
          <h2>{copy.deskTitle}</h2>
          <p className="lead">{copy.deskText}</p>
        </article>
      </section>

      <section className="section">
        <div className="fourColumnGrid">
          {copy.principles.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="center narrow">
          <p className="kicker">Process</p>
          <h2>{copy.flowTitle}</h2>
          <p>{copy.flowText}</p>
        </div>

        <div className="fourColumnGrid">
          {copy.flow.map((step) => (
            <article className="card" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section twoColumnGrid">
        <article className="panel">
          <p className="kicker">Public</p>
          <h2>{copy.whatPublicTitle}</h2>
          <p className="lead">{copy.whatPublicText}</p>

          <ul className="checkList">
            {copy.publicItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <p className="kicker">Private</p>
          <h2>{copy.whatPrivateTitle}</h2>
          <p className="lead">{copy.whatPrivateText}</p>

          <ul className="checkList">
            {copy.privateItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section twoColumnGrid">
        <article className="panel">
          <p className="kicker">Signal Output</p>
          <h2>{copy.signalTitle}</h2>
          <p className="lead">{copy.signalText}</p>
        </article>

        <article className="signalCard">
          <div className="signalHeader">
            <div>
              <span>Example structure</span>
              <strong>Private Discord alert</strong>
            </div>
            <em>Risk-first</em>
          </div>

          <div className="signalRows">
            {copy.signalRows.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="section">
        <div className="noticeCard">
          <span>{copy.riskTitle}</span>
          <p>{copy.riskText}</p>
        </div>
      </section>

      <section className="section">
        <article className="panel">
          <p className="kicker">Access</p>
          <h2>{copy.finalTitle}</h2>
          <p className="lead">{copy.finalText}</p>

          <div className="buttonRow">
            <Link className="primaryButton" href={`/${locale}/apply`}>
              {copy.finalPrimary}
            </Link>
            <Link className="secondaryButton" href={`/${locale}/signal-room`}>
              {copy.finalSecondary}
            </Link>
          </div>
        </article>
      </section>
    </SiteShell>
  );
}