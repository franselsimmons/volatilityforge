import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';

const LOCALES = ['en', 'nl', 'de', 'es', 'fr'];

const COPY = {
  nl: {
    badge: 'Aanvraag ontvangen',
    title: 'Je aanvraag is ontvangen.',
    intro:
      'Dank je. Je aanvraag voor VolatilityForge is succesvol doorgestuurd. De volgende stap is controle, betaling of handmatige toegang, afhankelijk van hoe je de workflow straks koppelt.',

    statusTitle: 'Wat gebeurt er nu?',
    statusText:
      'Deze pagina is voorbereid als succesvolle eindpagina voor aanvragen en later ook voor betalingen via Stripe Checkout.',

    steps: [
      {
        title: '1. Aanvraag opgeslagen',
        text: 'Je gegevens zijn ontvangen door de aanvraagroute van de site.'
      },
      {
        title: '2. Controle of betaling',
        text: 'VolatilityForge kan de aanvraag handmatig beoordelen of later automatisch koppelen aan Stripe Checkout.'
      },
      {
        title: '3. Discord-toegang',
        text: 'Na goedkeuring of betaling kan toegang tot de private signal room worden verstrekt.'
      },
      {
        title: '4. Private feed',
        text: 'Na toegang ontvang je dezelfde LONG en SHORT signal feed als alle andere leden.'
      }
    ],

    paymentTitle: 'Betaalflow voorbereid',
    paymentText:
      'Wanneer Stripe later wordt gekoppeld, kan deze pagina ook worden gebruikt als success URL na een afgeronde betaling.',

    paymentItems: [
      'Stripe success redirect voorbereid',
      'Aanvraagflow voorbereid',
      'Discord-toegang later te automatiseren',
      'Environment variables voorbereid in de root'
    ],

    nextTitle: 'Bekijk ondertussen de belangrijkste pagina’s.',
    nextText:
      'Je kunt terug naar pricing, performance of de signal room-pagina om de structuur nogmaals te bekijken.',

    links: [
      ['Pricing bekijken', 'pricing'],
      ['Performance bekijken', 'performance'],
      ['Signal room bekijken', 'signal-room'],
      ['FAQ bekijken', 'faq']
    ],

    riskTitle: 'Belangrijke risicotoelichting',
    riskText:
      'VolatilityForge is geen financieel advies. Trading heeft risico. Toegang tot een signal room geeft geen garantie op winst. Resultaten kunnen afwijken door uitvoering, timing, fees, slippage, leverage, positieomvang en marktomstandigheden.',

    homeCta: 'Terug naar homepage'
  },

  en: {
    badge: 'Application received',
    title: 'Your application has been received.',
    intro:
      'Thank you. Your VolatilityForge application has been submitted successfully. The next step is review, payment or manual access, depending on how you connect the workflow later.',

    statusTitle: 'What happens now?',
    statusText:
      'This page is prepared as the success page for applications and later also for Stripe Checkout payments.',

    steps: [
      {
        title: '1. Application stored',
        text: 'Your details have been received by the site’s application route.'
      },
      {
        title: '2. Review or payment',
        text: 'VolatilityForge can review the application manually or later connect it directly to Stripe Checkout.'
      },
      {
        title: '3. Discord access',
        text: 'After approval or payment, access to the private signal room can be provided.'
      },
      {
        title: '4. Private feed',
        text: 'After access, you receive the same LONG and SHORT signal feed as every other member.'
      }
    ],

    paymentTitle: 'Payment flow prepared',
    paymentText:
      'When Stripe is connected later, this page can also be used as the success URL after a completed payment.',

    paymentItems: [
      'Stripe success redirect prepared',
      'Application flow prepared',
      'Discord access can be automated later',
      'Environment variables prepared in the root'
    ],

    nextTitle: 'Review the key pages meanwhile.',
    nextText:
      'You can go back to pricing, performance or the signal room page to review the structure again.',

    links: [
      ['View pricing', 'pricing'],
      ['View performance', 'performance'],
      ['View signal room', 'signal-room'],
      ['View FAQ', 'faq']
    ],

    riskTitle: 'Important risk explanation',
    riskText:
      'VolatilityForge is not financial advice. Trading involves risk. Access to a signal room does not guarantee profit. Results can differ because of execution, timing, fees, slippage, leverage, position size and market conditions.',

    homeCta: 'Back to homepage'
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
    title: locale === 'nl' ? 'Aanvraag ontvangen' : 'Application Received',
    description: copy.intro
  };
}

export default function SuccessPage({ params }) {
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
            <Link className="primaryButton" href={`/${locale}`}>
              {copy.homeCta}
            </Link>
            <Link className="secondaryButton" href={`/${locale}/pricing`}>
              {locale === 'nl' ? 'Bekijk pricing' : 'View pricing'}
            </Link>
          </div>
        </div>

        <article className="panel">
          <p className="kicker">Status</p>
          <h2>{copy.statusTitle}</h2>
          <p className="lead">{copy.statusText}</p>
        </article>
      </section>

      <section className="section">
        <div className="fourColumnGrid">
          {copy.steps.map((step) => (
            <article className="card" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section twoColumnGrid">
        <article className="panel">
          <p className="kicker">Checkout</p>
          <h2>{copy.paymentTitle}</h2>
          <p className="lead">{copy.paymentText}</p>

          <ul className="checkList">
            {copy.paymentItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <p className="kicker">Next</p>
          <h2>{copy.nextTitle}</h2>
          <p className="lead">{copy.nextText}</p>

          <div className="buttonRow">
            {copy.links.map(([label, slug]) => (
              <Link key={slug} className="secondaryButton" href={`/${locale}/${slug}`}>
                {label}
              </Link>
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
    </SiteShell>
  );
}