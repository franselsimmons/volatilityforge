import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';

const LOCALES = ['en', 'nl', 'de', 'es', 'fr'];

const COPY = {
  nl: {
    badge: 'Signal Room',
    title: 'De private Discord-feed waar LONG & SHORT signalen binnenkomen.',
    intro:
      'De VolatilityForge signal room is gebouwd om signalen overzichtelijk, snel en zonder ruis te leveren. Leden krijgen geen losse hype-calls, maar gestructureerde signalen met richting, entry-zone, invalidatie, targets en updates.',

    primaryCta: 'Vraag toegang aan',
    secondaryCta: 'Bekijk pricing',

    roomTitle: 'Eén private feed. Eén standaard.',
    roomText:
      'Alle leden krijgen dezelfde signal room. Er zijn geen verborgen VIP-lagen, geen aparte premium feed en geen upgrade voor betere signalen. Het verschil zit alleen in de gekozen looptijd van je membership.',

    roomCards: [
      {
        title: 'Private Discord',
        text: 'Toegang tot een afgesloten Discord-omgeving voor members.'
      },
      {
        title: 'LONG & SHORT',
        text: 'Signalen kunnen zowel met als tegen marktrichting werken wanneer de setup sterk genoeg is.'
      },
      {
        title: 'Geen call-spam',
        text: 'Geen geforceerd aantal signalen per dag. Zwakke setups worden geweigerd.'
      },
      {
        title: 'Updates',
        text: 'Wanneer een setup verandert, kan de feed updates, sluitingen of invalidatie delen.'
      }
    ],

    signalTitle: 'Hoe een signaal wordt opgebouwd.',
    signalText:
      'Een signaal moet direct uitvoerbaar en begrijpelijk zijn. De feed toont daarom niet alleen richting, maar ook de risicostructuur eromheen.',
    signalRows: [
      ['Richting', 'SHORT'],
      ['Market', 'BTC / USDT'],
      ['Entry-zone', '67,850 – 68,120'],
      ['Invalidatie', '68,740'],
      ['Targets', '67,100 / 66,420 / 65,800'],
      ['Risk mode', 'Vast risico per signaal']
    ],

    updateTitle: 'Wat leden kunnen verwachten.',
    updateText:
      'De signal room is bedoeld voor praktische uitvoering. De structuur blijft steeds hetzelfde zodat leden niet hoeven te zoeken naar de kern van een signaal.',
    updateItems: [
      'Nieuwe signalen met duidelijke richting',
      'Entry-zone in plaats van vage prijsindicatie',
      'Invalidatieniveau voor risicobeheer',
      'Meerdere targetzones',
      'Updates wanneer de markt verandert',
      'Geen signaal wanneer de setup niet sterk genoeg is'
    ],

    privateTitle: 'Wat privé blijft binnen de room.',
    privateText:
      'Live signalen, updates en uitvoeringscontext blijven binnen de member-omgeving. De publieke site laat alleen voorbeeldstructuur zien.',
    privateItems: [
      'Live entries',
      'Actieve signal updates',
      'Setupwijzigingen',
      'Trade management',
      'Member-only context'
    ],

    exampleTitle: 'Voorbeeldflow in Discord.',
    exampleText:
      'Een member ziet eerst de richting en setup, daarna de risicostructuur, en daarna eventuele updates wanneer de markt beweegt.',
    flow: [
      {
        title: '1. Signal posted',
        text: 'De setup wordt geplaatst met market, richting, entry-zone, invalidatie en targets.'
      },
      {
        title: '2. Member reviews risk',
        text: 'Het lid bepaalt zelf positieomvang, risico en uitvoering. VolatilityForge geeft geen persoonlijk financieel advies.'
      },
      {
        title: '3. Setup develops',
        text: 'Wanneer de markt beweegt, kan de signal room updates of waarschuwingen geven.'
      },
      {
        title: '4. Signal closed or invalidated',
        text: 'Een signaal eindigt door target, stop, invalidatie of handmatige update.'
      }
    ],

    disciplineTitle: 'Waarom de room selectief blijft.',
    disciplineText:
      'De kracht van een signal room zit niet in volume. Een zwakke call vermijden is vaak waardevoller dan toch een signaal sturen om activiteit te tonen.',
    disciplineCards: [
      {
        title: 'Geen forced trades',
        text: 'Wanneer de markt niet goed genoeg is, hoort er geen signaal te komen.'
      },
      {
        title: 'Risk-first',
        text: 'Een setup zonder duidelijke invalidatie hoort niet in de feed.'
      },
      {
        title: 'Zelfde feed voor iedereen',
        text: 'Alle leden krijgen dezelfde informatie op hetzelfde niveau.'
      }
    ],

    riskTitle: 'Belangrijke risicotoelichting',
    riskText:
      'VolatilityForge is geen financieel advies. Leden blijven zelf verantwoordelijk voor positieomvang, uitvoering, leverage, timing en risicobeheer. Trading heeft risico en verliezen zijn mogelijk.',

    finalTitle: 'Wil je toegang tot de private signal room?',
    finalText:
      'Start een aanvraag of bekijk eerst de memberships. De betaalflow is voorbereid zodat Stripe later gekoppeld kan worden.',
    finalPrimary: 'Aanvraag starten',
    finalSecondary: 'Bekijk pricing'
  },

  en: {
    badge: 'Signal Room',
    title: 'The private Discord feed where LONG & SHORT signals are delivered.',
    intro:
      'The VolatilityForge signal room is built to deliver signals clearly, quickly and without noise. Members do not receive random hype calls, but structured signals with direction, entry zone, invalidation, targets and updates.',

    primaryCta: 'Request access',
    secondaryCta: 'View pricing',

    roomTitle: 'One private feed. One standard.',
    roomText:
      'Every member receives the same signal room. There are no hidden VIP layers, no separate premium feed and no upgrade for better signals. The only difference is the selected membership length.',

    roomCards: [
      {
        title: 'Private Discord',
        text: 'Access to a closed Discord environment for members.'
      },
      {
        title: 'LONG & SHORT',
        text: 'Signals can work with or against market direction when the setup is strong enough.'
      },
      {
        title: 'No call spam',
        text: 'No forced number of signals per day. Weak setups are rejected.'
      },
      {
        title: 'Updates',
        text: 'When a setup changes, the feed can share updates, closures or invalidation.'
      }
    ],

    signalTitle: 'How a signal is structured.',
    signalText:
      'A signal should be directly understandable and executable. The feed therefore shows not just direction, but the risk structure around it.',
    signalRows: [
      ['Direction', 'SHORT'],
      ['Market', 'BTC / USDT'],
      ['Entry zone', '67,850 – 68,120'],
      ['Invalidation', '68,740'],
      ['Targets', '67,100 / 66,420 / 65,800'],
      ['Risk mode', 'Fixed risk per signal']
    ],

    updateTitle: 'What members can expect.',
    updateText:
      'The signal room is designed for practical execution. The structure stays consistent so members do not need to search for the core of a signal.',
    updateItems: [
      'New signals with clear direction',
      'Entry zone instead of vague price indication',
      'Invalidation level for risk management',
      'Multiple target zones',
      'Updates when the market changes',
      'No signal when the setup is not strong enough'
    ],

    privateTitle: 'What stays private inside the room.',
    privateText:
      'Live signals, updates and execution context remain inside the member environment. The public site only shows example structure.',
    privateItems: [
      'Live entries',
      'Active signal updates',
      'Setup changes',
      'Trade management',
      'Member-only context'
    ],

    exampleTitle: 'Example Discord flow.',
    exampleText:
      'A member first sees the direction and setup, then the risk structure, and then any updates when the market moves.',
    flow: [
      {
        title: '1. Signal posted',
        text: 'The setup is posted with market, direction, entry zone, invalidation and targets.'
      },
      {
        title: '2. Member reviews risk',
        text: 'The member decides position size, risk and execution. VolatilityForge does not provide personal financial advice.'
      },
      {
        title: '3. Setup develops',
        text: 'When the market moves, the signal room can provide updates or warnings.'
      },
      {
        title: '4. Signal closed or invalidated',
        text: 'A signal ends through target, stop, invalidation or manual update.'
      }
    ],

    disciplineTitle: 'Why the room stays selective.',
    disciplineText:
      'The strength of a signal room is not volume. Avoiding a weak call is often more valuable than posting a signal just to show activity.',
    disciplineCards: [
      {
        title: 'No forced trades',
        text: 'When the market is not good enough, there should be no signal.'
      },
      {
        title: 'Risk-first',
        text: 'A setup without clear invalidation does not belong in the feed.'
      },
      {
        title: 'Same feed for everyone',
        text: 'Every member receives the same information at the same level.'
      }
    ],

    riskTitle: 'Important risk explanation',
    riskText:
      'VolatilityForge is not financial advice. Members remain responsible for position size, execution, leverage, timing and risk management. Trading involves risk and losses are possible.',

    finalTitle: 'Want access to the private signal room?',
    finalText:
      'Start an application or review the memberships first. The payment flow is prepared so Stripe can be connected later.',
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
    title: locale === 'nl' ? 'Signal Room' : 'Signal Room',
    description: copy.intro
  };
}

export default function SignalRoomPage({ params }) {
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

        <article className="panel">
          <p className="kicker">Private Feed</p>
          <h2>{copy.roomTitle}</h2>
          <p className="lead">{copy.roomText}</p>
        </article>
      </section>

      <section className="section">
        <div className="fourColumnGrid">
          {copy.roomCards.map((card) => (
            <article className="card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section twoColumnGrid">
        <article className="panel">
          <p className="kicker">Signal Structure</p>
          <h2>{copy.signalTitle}</h2>
          <p className="lead">{copy.signalText}</p>
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

      <section className="section twoColumnGrid">
        <article className="panel">
          <p className="kicker">Member View</p>
          <h2>{copy.updateTitle}</h2>
          <p className="lead">{copy.updateText}</p>

          <ul className="checkList">
            {copy.updateItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <p className="kicker">Private</p>
          <h2>{copy.privateTitle}</h2>
          <p className="lead">{copy.privateText}</p>

          <ul className="checkList">
            {copy.privateItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section">
        <div className="center narrow">
          <p className="kicker">Discord Flow</p>
          <h2>{copy.exampleTitle}</h2>
          <p>{copy.exampleText}</p>
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
          <p className="kicker">Discipline</p>
          <h2>{copy.disciplineTitle}</h2>
          <p className="lead">{copy.disciplineText}</p>
        </article>

        <div className="threeColumnGrid">
          {copy.disciplineCards.map((card) => (
            <article className="card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
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

      <section className="section">
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