import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';
import PricingCards from '@/components/PricingCards';

const LOCALES = ['en', 'nl', 'de', 'es', 'fr'];

const COPY = {
  nl: {
    badge: 'Pricing',
    title: 'Eén private signal room. Eén standaard. Drie looptijden.',
    intro:
      'Elke membership geeft toegang tot dezelfde private VolatilityForge signal room. Er zijn geen verborgen VIP-lagen, geen aparte premium feed en geen upgrade voor betere signalen. Alleen de looptijd verschilt.',

    primaryCta: 'Aanvraag starten',
    secondaryCta: 'Bekijk performance',

    pricingTitle: 'Membership-opties',
    pricingText:
      'De betaalstructuur is voorbereid voor Stripe. Tot Stripe is gekoppeld, sturen de knoppen naar de aanvraagpagina.',

    includedTitle: 'Elke membership bevat',
    includedText:
      'De inhoud is voor alle leden hetzelfde. Je betaalt niet voor een hogere signaalkwaliteit, maar voor de duur van je toegang.',
    included: [
      'Private Discord signal room',
      'LONG en SHORT crypto-signalen',
      'Entry-zone, invalidatie en targets',
      'Signal updates wanneer een setup verandert',
      'Geen signaal wanneer de markt niet goed genoeg is',
      'Dezelfde feed voor alle leden',
      'Risk-first signal structuur',
      'Voorbereid op Stripe-betaling'
    ],

    plansTitle: 'Wat de looptijden betekenen.',
    plansText:
      'De maandoptie is flexibel. De 6-maanden optie is bedoeld als kernmembership. De jaaroptie is voor leden die VolatilityForge langer willen volgen.',
    planCards: [
      {
        title: 'Maandelijks',
        text: 'Flexibele toegang. Geschikt als je eerst wilt ervaren hoe de private signal room werkt.'
      },
      {
        title: '6 maanden',
        text: 'Aanbevolen optie. Genoeg tijd om de signal room over meerdere marktfases te volgen.'
      },
      {
        title: 'Jaarlijks',
        text: 'Beste waarde voor leden die structureel toegang willen tot de VolatilityForge feed.'
      }
    ],

    paymentTitle: 'Betaalflow voorbereid.',
    paymentText:
      'De site is voorbereid op koppeling met Stripe Checkout. Zodra je Stripe keys en price IDs toevoegt in Vercel, kunnen de pricing-knoppen direct naar betaling sturen.',
    paymentItems: [
      'Stripe Checkout API-route voorbereid',
      'Monthly, 6 months en annual price IDs voorbereid',
      'Success-route aanwezig',
      'Aanvraagroute aanwezig als fallback',
      'Environment variables voorbereid voor Vercel'
    ],

    envTitle: 'Later nodig voor Stripe.',
    envText:
      'Wanneer je live wilt met betalingen, voeg je deze environment variables toe in Vercel.',
    envVars: [
      'NEXT_PUBLIC_ENABLE_PAYMENTS=true',
      'NEXT_PUBLIC_SITE_URL=https://jouwdomein.nl',
      'STRIPE_SECRET_KEY=sk_live_...',
      'STRIPE_PRICE_MONTHLY=price_...',
      'STRIPE_PRICE_SIX_MONTHS=price_...',
      'STRIPE_PRICE_ANNUAL=price_...'
    ],

    riskTitle: 'Belangrijke risicotoelichting',
    riskText:
      'VolatilityForge is geen financieel advies. Trading heeft risico. Betalen voor toegang tot de signal room geeft geen garantie op winst. Werkelijke resultaten kunnen afwijken door uitvoering, timing, fees, slippage, leverage, positieomvang en marktomstandigheden.',

    finalTitle: 'Wil je toegang aanvragen?',
    finalText:
      'Start een aanvraag of bekijk eerst de performance-pagina. De betaalstructuur staat klaar om later direct met Stripe te koppelen.',
    finalPrimary: 'Aanvraag starten',
    finalSecondary: 'Bekijk performance'
  },

  en: {
    badge: 'Pricing',
    title: 'One private signal room. One standard. Three access lengths.',
    intro:
      'Every membership gives access to the same private VolatilityForge signal room. There are no hidden VIP layers, no separate premium feed and no upgrade for better signals. Only the access length changes.',

    primaryCta: 'Start application',
    secondaryCta: 'View performance',

    pricingTitle: 'Membership options',
    pricingText:
      'The payment structure is prepared for Stripe. Until Stripe is connected, the buttons send users to the application page.',

    includedTitle: 'Every membership includes',
    includedText:
      'The content is the same for every member. You do not pay for higher signal quality, but for the length of your access.',
    included: [
      'Private Discord signal room',
      'LONG and SHORT crypto signals',
      'Entry zone, invalidation and targets',
      'Signal updates when a setup changes',
      'No signal when the market is not good enough',
      'Same feed for every member',
      'Risk-first signal structure',
      'Prepared for Stripe payment'
    ],

    plansTitle: 'What the access lengths mean.',
    plansText:
      'The monthly option is flexible. The 6-month option is the core membership. The annual option is for members who want longer-term access to VolatilityForge.',
    planCards: [
      {
        title: 'Monthly',
        text: 'Flexible access. Suitable if you first want to experience how the private signal room works.'
      },
      {
        title: '6 months',
        text: 'Recommended option. Enough time to follow the signal room across multiple market phases.'
      },
      {
        title: 'Annual',
        text: 'Best value for members who want structured access to the VolatilityForge feed.'
      }
    ],

    paymentTitle: 'Payment flow prepared.',
    paymentText:
      'The site is prepared for Stripe Checkout integration. Once you add your Stripe keys and price IDs in Vercel, the pricing buttons can send users directly to payment.',
    paymentItems: [
      'Stripe Checkout API route prepared',
      'Monthly, 6-month and annual price IDs prepared',
      'Success route included',
      'Application route included as fallback',
      'Environment variables prepared for Vercel'
    ],

    envTitle: 'Needed later for Stripe.',
    envText:
      'When you want to go live with payments, add these environment variables in Vercel.',
    envVars: [
      'NEXT_PUBLIC_ENABLE_PAYMENTS=true',
      'NEXT_PUBLIC_SITE_URL=https://yourdomain.com',
      'STRIPE_SECRET_KEY=sk_live_...',
      'STRIPE_PRICE_MONTHLY=price_...',
      'STRIPE_PRICE_SIX_MONTHS=price_...',
      'STRIPE_PRICE_ANNUAL=price_...'
    ],

    riskTitle: 'Important risk explanation',
    riskText:
      'VolatilityForge is not financial advice. Trading involves risk. Paying for access to the signal room does not guarantee profit. Real results can differ because of execution, timing, fees, slippage, leverage, position size and market conditions.',

    finalTitle: 'Want to request access?',
    finalText:
      'Start an application or view the performance page first. The payment structure is ready to connect to Stripe later.',
    finalPrimary: 'Start application',
    finalSecondary: 'View performance'
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
    title: locale === 'nl' ? 'Pricing' : 'Pricing',
    description: copy.intro
  };
}

export default function PricingPage({ params }) {
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
            <Link className="secondaryButton" href={`/${locale}/performance`}>
              {copy.secondaryCta}
            </Link>
          </div>
        </div>

        <article className="panel">
          <p className="kicker">Membership</p>
          <h2>{copy.pricingTitle}</h2>
          <p className="lead">{copy.pricingText}</p>
        </article>
      </section>

      <section className="section">
        <PricingCards locale={locale} />
      </section>

      <section className="section twoColumnGrid">
        <article className="panel">
          <p className="kicker">Included</p>
          <h2>{copy.includedTitle}</h2>
          <p className="lead">{copy.includedText}</p>

          <ul className="checkList">
            {copy.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <p className="kicker">Access Length</p>
          <h2>{copy.plansTitle}</h2>
          <p className="lead">{copy.plansText}</p>
        </article>
      </section>

      <section className="section">
        <div className="threeColumnGrid">
          {copy.planCards.map((card) => (
            <article className="card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section twoColumnGrid">
        <article className="panel">
          <p className="kicker">Stripe Ready</p>
          <h2>{copy.paymentTitle}</h2>
          <p className="lead">{copy.paymentText}</p>

          <ul className="checkList">
            {copy.paymentItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <p className="kicker">Environment</p>
          <h2>{copy.envTitle}</h2>
          <p className="lead">{copy.envText}</p>

          <ul className="checkList">
            {copy.envVars.map((item) => (
              <li key={item}>
                <code>{item}</code>
              </li>
            ))}
          </ul>
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
            <Link className="secondaryButton" href={`/${locale}/performance`}>
              {copy.finalSecondary}
            </Link>
          </div>
        </article>
      </section>
    </SiteShell>
  );
}