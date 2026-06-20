import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';
import PricingCards from '@/components/PricingCards';

const LOCALES = ['en', 'nl', 'de', 'es', 'fr'];

const COPY = {
  nl: {
    badge: 'Private LONG & SHORT crypto-signalen',
    heroTitle: 'Een private signal room voor selectieve crypto-executie.',
    heroText:
      'VolatilityForge is gebouwd voor traders die geen ruis willen, maar een strak proces: selectieve LONG en SHORT crypto-signalen, duidelijke entry-zones, invalidatie, targets en risk-first uitvoering via een private Discord signal room.',
    primaryCta: 'Vraag toegang aan',
    secondaryCta: 'Bekijk performance',
    panelLabel: 'Model PnL',
    panelValue: '+49.2%',
    panelText: 'Modelberekende accountgroei met 0.25% vast risico per signaal.',
    measured: 'Meetperiode',
    signals: 'Signalen',
    direction: 'Richting',
    risk: 'Risico',
    months: '6 maanden',
    closedSignals: '232 gesloten',
    longShort: 'LONG + SHORT',
    fixedRisk: '0.25% / signaal',

    introTitle: 'Gebouwd als een private trading desk, niet als een drukke signalengroep.',
    introText:
      'De homepage blijft bewust kort. Klanten kunnen vanuit het menu naar performance, systeem, signal room, pricing en FAQ. Geen eindeloze scroll, wel een duidelijke route naar vertrouwen en betaling.',

    proofTitle: 'De kern in cijfers.',
    proofText:
      'De modelresultaten hieronder zijn bedoeld als duidelijke performance-presentatie. Vervang dit vóór livegang door jouw definitieve, juridisch getoetste resultaatdata.',
    stats: [
      ['Model PnL', '+49.2%', 'Geschatte accountgroei bij 0.25% vast risico per signaal'],
      ['Meetperiode', '6 maanden', 'LONG en SHORT samen doorgerekend'],
      ['Gesloten signalen', '232', 'Afgeronde modeluitkomsten in de geselecteerde pool'],
      ['Winstpercentage', '46.8%', 'Gewogen over LONG en SHORT samen'],
      ['Gemiddeld resultaat', '+0.85R', 'Gemiddelde netto uitkomst per gesloten signaal'],
      ['LONG / SHORT split', '+31.5% / +17.7%', 'Geschatte bijdrage per richting']
    ],

    pillarsTitle: 'Wat leden krijgen.',
    pillarsText:
      'VolatilityForge draait om één standaard: dezelfde private feed voor alle leden, geen kunstmatige VIP-lagen.',
    pillars: [
      {
        title: 'Private Discord',
        text: 'Eén afgesloten signal room waar leden de signalen en updates ontvangen.'
      },
      {
        title: 'LONG én SHORT',
        text: 'De feed is niet afhankelijk van één marktrichting. Zowel LONG als SHORT setups kunnen worden gedeeld.'
      },
      {
        title: 'Entry, stop en targets',
        text: 'Elk signaal heeft een concrete structuur: entry-zone, invalidatie, targets en risicomodus.'
      },
      {
        title: 'Selectief proces',
        text: 'Geen geforceerde dagelijkse calls. Geen signaal is beter dan een zwakke setup.'
      }
    ],

    signalTitle: 'Voorbeeld van de signal-structuur.',
    signalText:
      'De live feed blijft privé. Dit voorbeeld laat zien hoe duidelijk de informatie wordt aangeboden.',
    signalRows: [
      ['Richting', 'SHORT'],
      ['Market', 'BTC / USDT'],
      ['Entry-zone', '67,850 – 68,120'],
      ['Invalidatie', '68,740'],
      ['Targets', '67,100 / 66,420 / 65,800'],
      ['Risk mode', 'Vast risico per signaal']
    ],

    pagesTitle: 'Bekijk de volledige site.',
    pagesText:
      'Gebruik de aparte pagina’s voor meer detail. Dit houdt de homepage scherp en voorkomt eindeloos scrollen.',
    pages: [
      ['Performance', 'Bekijk de modelresultaten en risicotoelichting.', 'performance'],
      ['Trade System', 'Lees hoe signalen publiek worden uitgelegd zonder de interne motor open te leggen.', 'system'],
      ['Signal Room', 'Bekijk hoe de private Discord-feed is opgebouwd.', 'signal-room'],
      ['Pricing', 'Bekijk memberships en betaalvoorbereiding.', 'pricing'],
      ['FAQ', 'Antwoorden op de belangrijkste vragen.', 'faq']
    ],

    pricingTitle: 'Kies je toegang.',
    pricingText:
      'Alle memberships geven toegang tot dezelfde private signal room. Alleen de looptijd verschilt.',

    riskNoticeTitle: 'Risk notice',
    riskNotice:
      'Geen financieel advies. Trading heeft risico. Resultaten uit het verleden en modelberekeningen geven geen garantie voor toekomstige resultaten. Uitvoering, fees, timing, positieomvang, leverage en marktomstandigheden kunnen resultaten beïnvloeden.',

    finalTitle: 'Klaar om VolatilityForge serieus neer te zetten?',
    finalText:
      'Vraag toegang aan of bekijk eerst de performance-pagina. De site is voorbereid op betaling, aanvraagflow en latere koppeling met Stripe.',
    finalCta: 'Aanvraag starten'
  },

  en: {
    badge: 'Private LONG & SHORT crypto signals',
    heroTitle: 'A private signal room built for selective crypto execution.',
    heroText:
      'VolatilityForge is built for traders who do not want noise, but a structured process: selective LONG and SHORT crypto signals, clear entry zones, invalidation, targets and risk-first execution through a private Discord signal room.',
    primaryCta: 'Request access',
    secondaryCta: 'View performance',
    panelLabel: 'Model PnL',
    panelValue: '+49.2%',
    panelText: 'Model-calculated account growth using 0.25% fixed risk per signal.',
    measured: 'Measured',
    signals: 'Signals',
    direction: 'Direction',
    risk: 'Risk',
    months: '6 months',
    closedSignals: '232 closed',
    longShort: 'LONG + SHORT',
    fixedRisk: '0.25% / signal',

    introTitle: 'Built like a private trading desk, not a noisy signal group.',
    introText:
      'The homepage stays intentionally short. Clients can use the menu to visit performance, system, signal room, pricing and FAQ. No endless scrolling, just a clear path to trust and payment.',

    proofTitle: 'The core numbers.',
    proofText:
      'The model results below are intended as clear performance presentation. Replace this before launch with your final legally reviewed result data.',
    stats: [
      ['Model PnL', '+49.2%', 'Estimated account growth at 0.25% fixed risk per signal'],
      ['Measured period', '6 months', 'LONG and SHORT calculated together'],
      ['Closed signals', '232', 'Completed model outcomes in the selected pool'],
      ['Win rate', '46.8%', 'Weighted across LONG and SHORT'],
      ['Average result', '+0.85R', 'Average net outcome per closed signal'],
      ['LONG / SHORT split', '+31.5% / +17.7%', 'Estimated contribution by direction']
    ],

    pillarsTitle: 'What members receive.',
    pillarsText:
      'VolatilityForge works around one standard: the same private feed for every member, without artificial VIP layers.',
    pillars: [
      {
        title: 'Private Discord',
        text: 'One closed signal room where members receive signals and updates.'
      },
      {
        title: 'LONG and SHORT',
        text: 'The feed is not dependent on one market direction. Both LONG and SHORT setups can be shared.'
      },
      {
        title: 'Entry, stop and targets',
        text: 'Every signal has a concrete structure: entry zone, invalidation, targets and risk mode.'
      },
      {
        title: 'Selective process',
        text: 'No forced daily calls. No signal is better than a weak setup.'
      }
    ],

    signalTitle: 'Example signal structure.',
    signalText:
      'The live feed remains private. This example shows how clearly information is presented.',
    signalRows: [
      ['Direction', 'SHORT'],
      ['Market', 'BTC / USDT'],
      ['Entry zone', '67,850 – 68,120'],
      ['Invalidation', '68,740'],
      ['Targets', '67,100 / 66,420 / 65,800'],
      ['Risk mode', 'Fixed risk per signal']
    ],

    pagesTitle: 'View the full site.',
    pagesText:
      'Use the separate pages for more detail. This keeps the homepage sharp and avoids endless scrolling.',
    pages: [
      ['Performance', 'View model results and risk explanation.', 'performance'],
      ['Trade System', 'Read how signals are explained publicly without exposing the internal engine.', 'system'],
      ['Signal Room', 'See how the private Discord feed is structured.', 'signal-room'],
      ['Pricing', 'View memberships and payment preparation.', 'pricing'],
      ['FAQ', 'Answers to the main questions.', 'faq']
    ],

    pricingTitle: 'Choose your access.',
    pricingText:
      'Every membership gives access to the same private signal room. Only the access length changes.',

    riskNoticeTitle: 'Risk notice',
    riskNotice:
      'No financial advice. Trading involves risk. Past performance and model calculations do not guarantee future results. Execution, fees, timing, position size, leverage and market conditions can affect results.',

    finalTitle: 'Ready to position VolatilityForge seriously?',
    finalText:
      'Request access or review the performance page first. The site is prepared for payment, application flow and later Stripe integration.',
    finalCta: 'Start application'
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
    title: locale === 'nl' ? 'Private Crypto Signal Room' : 'Private Crypto Signal Room',
    description: copy.heroText
  };
}

export default function LocaleHomePage({ params }) {
  const locale = params.locale;

  if (!LOCALES.includes(locale)) {
    notFound();
  }

  const copy = COPY[locale] || COPY.en;
  const performanceHref = `/${locale}/performance`;
  const applyHref = `/${locale}/apply`;

  return (
    <SiteShell locale={locale}>
      <section className="hero">
        <div className="heroCopy">
          <p className="eyebrow">{copy.badge}</p>
          <h1>{copy.heroTitle}</h1>
          <p className="lead">{copy.heroText}</p>

          <div className="buttonRow">
            <Link className="primaryButton" href={applyHref}>
              {copy.primaryCta}
            </Link>
            <Link className="secondaryButton" href={performanceHref}>
              {copy.secondaryCta}
            </Link>
          </div>
        </div>

        <aside className="heroPanel">
          <div className="heroPanelTop">
            <span>VolatilityForge Command Layer</span>
            <em>Private Signal Room</em>
          </div>

          <div className="heroMetric">
            <span>{copy.panelLabel}</span>
            <strong>{copy.panelValue}</strong>
            <p>{copy.panelText}</p>
          </div>

          <div className="heroPanelGrid">
            <div>
              <span>{copy.measured}</span>
              <strong>{copy.months}</strong>
            </div>
            <div>
              <span>{copy.signals}</span>
              <strong>{copy.closedSignals}</strong>
            </div>
            <div>
              <span>{copy.direction}</span>
              <strong>{copy.longShort}</strong>
            </div>
            <div>
              <span>{copy.risk}</span>
              <strong>{copy.fixedRisk}</strong>
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

      <section className="section">
        <div className="panel">
          <p className="kicker">Overview</p>
          <h2>{copy.introTitle}</h2>
          <p className="lead">{copy.introText}</p>
        </div>
      </section>

      <section className="section">
        <div className="center narrow">
          <p className="kicker">Performance</p>
          <h2>{copy.proofTitle}</h2>
          <p>{copy.proofText}</p>
        </div>

        <div className="statsGrid">
          {copy.stats.map(([label, value, description], index) => (
            <article key={label} className={index === 0 ? 'statCard highlight' : 'statCard'}>
              <span>{label}</span>
              <strong>{value}</strong>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section twoColumnGrid">
        <div className="panel">
          <p className="kicker">Membership</p>
          <h2>{copy.pillarsTitle}</h2>
          <p className="lead">{copy.pillarsText}</p>
        </div>

        <div className="fourColumnGrid">
          {copy.pillars.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section twoColumnGrid">
        <article className="panel">
          <p className="kicker">Signal Room</p>
          <h2>{copy.signalTitle}</h2>
          <p className="lead">{copy.signalText}</p>
          <div className="buttonRow">
            <Link className="secondaryButton" href={`/${locale}/signal-room`}>
              Signal room bekijken
            </Link>
          </div>
        </article>

        <article className="signalCard">
          <div className="signalHeader">
            <div>
              <span>Example signal</span>
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
        <div className="center narrow">
          <p className="kicker">Navigation</p>
          <h2>{copy.pagesTitle}</h2>
          <p>{copy.pagesText}</p>
        </div>

        <div className="threeColumnGrid">
          {copy.pages.map(([title, text, slug]) => (
            <Link href={`/${locale}/${slug}`} className="card" key={slug}>
              <h3>{title}</h3>
              <p>{text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="center narrow">
          <p className="kicker">Pricing</p>
          <h2>{copy.pricingTitle}</h2>
          <p>{copy.pricingText}</p>
        </div>

        <PricingCards locale={locale} />
      </section>

      <section className="section">
        <div className="noticeCard">
          <span>{copy.riskNoticeTitle}</span>
          <p>{copy.riskNotice}</p>
        </div>
      </section>

      <section className="section">
        <div className="panel">
          <p className="kicker">Access</p>
          <h2>{copy.finalTitle}</h2>
          <p className="lead">{copy.finalText}</p>

          <div className="buttonRow">
            <Link className="primaryButton" href={applyHref}>
              {copy.finalCta}
            </Link>
            <Link className="secondaryButton" href={performanceHref}>
              {copy.secondaryCta}
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}