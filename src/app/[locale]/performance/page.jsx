import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';

const LOCALES = ['en', 'nl', 'de', 'es', 'fr'];

const COPY = {
  nl: {
    title: 'Modelberekende performance voor LONG & SHORT signalen.',
    intro:
      'Deze pagina geeft een duidelijke performance-weergave van de geselecteerde VolatilityForge signaalpools. De cijfers zijn modelberekend en bedoeld als transparante presentatie van het systeem, niet als garantie op toekomstige resultaten.',
    badge: 'Performance',
    primaryCta: 'Vraag toegang aan',
    secondaryCta: 'Bekijk pricing',

    headlineLabel: 'Model PnL',
    headlineValue: '+49.2%',
    headlineText:
      'Geschatte accountgroei op basis van 0.25% vast risico per signaal over de geselecteerde modelperiode.',

    stats: [
      ['Model PnL', '+49.2%', 'Geschatte accountgroei bij 0.25% vast risico per signaal'],
      ['Meetperiode', '6 maanden', 'LONG en SHORT samen doorgerekend'],
      ['Gesloten signalen', '232', 'Afgeronde modeluitkomsten in de geselecteerde pool'],
      ['Winstpercentage', '46.8%', 'Gewogen over LONG en SHORT samen'],
      ['Gemiddeld resultaat', '+0.85R', 'Gemiddelde netto uitkomst per gesloten signaal'],
      ['LONG bijdrage', '+31.5%', 'Geschatte bijdrage vanuit LONG-signalen'],
      ['SHORT bijdrage', '+17.7%', 'Geschatte bijdrage vanuit SHORT-signalen'],
      ['Risico per signaal', '0.25%', 'Conservatieve vaste risicoparameter per signaal']
    ],

    splitTitle: 'LONG en SHORT apart bekeken.',
    splitText:
      'VolatilityForge is niet gebouwd rond één marktrichting. De performance-presentatie splitst LONG en SHORT zodat leden beter begrijpen waar de model-PnL vandaan komt.',
    splitCards: [
      {
        title: 'LONG signalen',
        value: '+31.5%',
        text: 'Modelbijdrage vanuit geselecteerde LONG-signaalpools bij 0.25% vast risico per signaal.'
      },
      {
        title: 'SHORT signalen',
        value: '+17.7%',
        text: 'Modelbijdrage vanuit geselecteerde SHORT-signaalpools bij 0.25% vast risico per signaal.'
      },
      {
        title: 'Samen',
        value: '+49.2%',
        text: 'Gecombineerde model-PnL van de geselecteerde LONG- en SHORT-signaalpools.'
      }
    ],

    methodTitle: 'Hoe deze performance wordt gepresenteerd.',
    methodText:
      'De technische interne data wordt niet publiek gedeeld. De publieke presentatie vertaalt het resultaat naar begrijpelijke handelsbegrippen: model-PnL, gesloten signalen, win rate, gemiddelde uitkomst en risico per signaal.',
    methodSteps: [
      {
        title: '1. Signalen selecteren',
        text: 'Alleen geselecteerde signaalpools worden meegenomen in de publieke performance-presentatie.'
      },
      {
        title: '2. Resultaat in R meten',
        text: 'Uitkomsten worden vertaald naar R, zodat winst en verlies vergelijkbaar blijven ongeacht markt of prijsniveau.'
      },
      {
        title: '3. Vast risico toepassen',
        text: 'De presentatie gebruikt 0.25% vast risico per signaal om een conservatieve model-accountcurve te tonen.'
      },
      {
        title: '4. Resultaat tonen',
        text: 'De uitkomst wordt gepresenteerd als model-PnL, met aparte toelichting voor LONG en SHORT.'
      }
    ],

    riskTitle: 'Belangrijke risicotoelichting',
    riskText:
      'Model-PnL is geen belofte en geen financieel advies. Werkelijke resultaten kunnen afwijken door uitvoering, timing, fees, slippage, positieomvang, leverage, liquiditeit en marktomstandigheden. Trading heeft risico en verliezen zijn mogelijk.',

    disclaimerTitle: 'Gebruik vóór livegang echte gecontroleerde data.',
    disclaimerText:
      'Vervang deze modelpresentatie door je definitieve, gecontroleerde en juridisch getoetste performancecijfers voordat je betaalde toegang publiek aanbiedt.',

    finalTitle: 'Wil je toegang tot de private signal room?',
    finalText:
      'Bekijk de membership-opties of start direct een aanvraag. Alle leden krijgen dezelfde private LONG en SHORT signal feed.',
    finalPrimary: 'Aanvraag starten',
    finalSecondary: 'Bekijk pricing'
  },

  en: {
    title: 'Model-calculated performance for LONG & SHORT signals.',
    intro:
      'This page gives a clear performance view of the selected VolatilityForge signal pools. The numbers are model-calculated and intended as transparent system presentation, not as a guarantee of future results.',
    badge: 'Performance',
    primaryCta: 'Request access',
    secondaryCta: 'View pricing',

    headlineLabel: 'Model PnL',
    headlineValue: '+49.2%',
    headlineText:
      'Estimated account growth based on 0.25% fixed risk per signal over the selected model period.',

    stats: [
      ['Model PnL', '+49.2%', 'Estimated account growth at 0.25% fixed risk per signal'],
      ['Measured period', '6 months', 'LONG and SHORT calculated together'],
      ['Closed signals', '232', 'Completed model outcomes in the selected pool'],
      ['Win rate', '46.8%', 'Weighted across LONG and SHORT'],
      ['Average result', '+0.85R', 'Average net outcome per closed signal'],
      ['LONG contribution', '+31.5%', 'Estimated contribution from LONG signals'],
      ['SHORT contribution', '+17.7%', 'Estimated contribution from SHORT signals'],
      ['Risk per signal', '0.25%', 'Conservative fixed-risk parameter per signal']
    ],

    splitTitle: 'LONG and SHORT separated.',
    splitText:
      'VolatilityForge is not built around one market direction. The performance presentation separates LONG and SHORT so members can understand where the model PnL comes from.',
    splitCards: [
      {
        title: 'LONG signals',
        value: '+31.5%',
        text: 'Model contribution from selected LONG signal pools at 0.25% fixed risk per signal.'
      },
      {
        title: 'SHORT signals',
        value: '+17.7%',
        text: 'Model contribution from selected SHORT signal pools at 0.25% fixed risk per signal.'
      },
      {
        title: 'Combined',
        value: '+49.2%',
        text: 'Combined model PnL from the selected LONG and SHORT signal pools.'
      }
    ],

    methodTitle: 'How this performance is presented.',
    methodText:
      'The technical internal data is not publicly exposed. The public presentation translates the result into understandable trading terms: model PnL, closed signals, win rate, average outcome and risk per signal.',
    methodSteps: [
      {
        title: '1. Select signals',
        text: 'Only selected signal pools are included in the public performance presentation.'
      },
      {
        title: '2. Measure result in R',
        text: 'Outcomes are translated into R so wins and losses remain comparable across markets and prices.'
      },
      {
        title: '3. Apply fixed risk',
        text: 'The presentation uses 0.25% fixed risk per signal to show a conservative model account curve.'
      },
      {
        title: '4. Present result',
        text: 'The outcome is shown as model PnL, with separate explanation for LONG and SHORT.'
      }
    ],

    riskTitle: 'Important risk explanation',
    riskText:
      'Model PnL is not a promise and not financial advice. Real results can differ because of execution, timing, fees, slippage, position size, leverage, liquidity and market conditions. Trading involves risk and losses are possible.',

    disclaimerTitle: 'Use verified real data before launch.',
    disclaimerText:
      'Replace this model presentation with your final, verified and legally reviewed performance numbers before offering paid access publicly.',

    finalTitle: 'Want access to the private signal room?',
    finalText:
      'View the membership options or start an application. Every member receives the same private LONG and SHORT signal feed.',
    finalPrimary: 'Start application',
    finalSecondary: 'View pricing'
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
    title: locale === 'nl' ? 'Performance' : 'Performance',
    description: copy.intro
  };
}

export default function PerformancePage({ params }) {
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
            <Link className="secondaryButton" href={`/${locale}/pricing`}>
              {copy.secondaryCta}
            </Link>
          </div>
        </div>

        <article className="heroPanel">
          <div className="heroPanelTop">
            <span>VolatilityForge Performance Layer</span>
            <em>Model-calculated</em>
          </div>

          <div className="heroMetric">
            <span>{copy.headlineLabel}</span>
            <strong>{copy.headlineValue}</strong>
            <p>{copy.headlineText}</p>
          </div>

          <div className="flowLine">
            <span>signals</span>
            <i />
            <span>risk</span>
            <i />
            <span>model</span>
            <i />
            <span>pnl</span>
          </div>
        </article>
      </section>

      <section className="section">
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
          <p className="kicker">LONG / SHORT</p>
          <h2>{copy.splitTitle}</h2>
          <p className="lead">{copy.splitText}</p>
        </div>

        <div className="threeColumnGrid">
          {copy.splitCards.map((card) => (
            <article className="card" key={card.title}>
              <h3>{card.title}</h3>
              <div className="priceValue">
                <strong>{card.value}</strong>
              </div>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="center narrow">
          <p className="kicker">Method</p>
          <h2>{copy.methodTitle}</h2>
          <p>{copy.methodText}</p>
        </div>

        <div className="fourColumnGrid">
          {copy.methodSteps.map((step) => (
            <article className="card" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="noticeCard">
          <span>{copy.riskTitle}</span>
          <p>{copy.riskText}</p>
        </div>
      </section>

      <section className="section twoColumnGrid">
        <article className="panel">
          <p className="kicker">Verification</p>
          <h2>{copy.disclaimerTitle}</h2>
          <p className="lead">{copy.disclaimerText}</p>
        </article>

        <article className="panel">
          <p className="kicker">Access</p>
          <h2>{copy.finalTitle}</h2>
          <p className="lead">{copy.finalText}</p>

          <div className="buttonRow">
            <Link className="primaryButton" href={`/${locale}/apply`}>
              {copy.finalPrimary}
            </Link>
            <Link className="secondaryButton" href={`/${locale}/pricing`}>
              {copy.finalSecondary}
            </Link>
          </div>
        </article>
      </section>
    </SiteShell>
  );
}