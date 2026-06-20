import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';

const LOCALES = ['en', 'nl', 'de', 'es', 'fr'];

const COPY = {
  nl: {
    badge: 'Access Application',
    title: 'Vraag toegang aan tot de private VolatilityForge signal room.',
    intro:
      'Gebruik dit formulier om je aanvraag voor toegang te starten. De aanvraagflow is voorbereid zodat je later makkelijk kunt koppelen met Stripe, Discord, Make, Zapier, Formspree of je eigen backend.',

    primaryCta: 'Bekijk pricing',
    secondaryCta: 'Bekijk performance',

    formTitle: 'Aanvraagformulier',
    formText:
      'Vul je gegevens in. Zodra de backend-koppeling actief is, kan dit formulier automatisch worden doorgestuurd naar je gekozen workflow.',

    labels: {
      name: 'Naam',
      email: 'E-mail',
      telegram: 'Telegram of Discord gebruikersnaam',
      experience: 'Trading ervaring',
      plan: 'Gewenste membership',
      goal: 'Waarom wil je toegang?',
      risk: 'Risico-bevestiging'
    },

    placeholders: {
      name: 'Je naam',
      email: 'jij@email.com',
      telegram: '@gebruikersnaam of Discord naam',
      goal: 'Vertel kort wat je zoekt in een private signal room.'
    },

    experienceOptions: [
      ['beginner', 'Beginner'],
      ['intermediate', 'Gemiddeld'],
      ['advanced', 'Gevorderd'],
      ['professional', 'Professioneel']
    ],

    planOptions: [
      ['monthly', 'Maandelijks — €99 / maand'],
      ['six_months', '6 maanden — €449 / 6 maanden'],
      ['annual', 'Jaarlijks — €799 / jaar']
    ],

    riskConfirm:
      'Ik begrijp dat VolatilityForge geen financieel advies is, dat trading risico heeft en dat resultaten nooit gegarandeerd zijn.',

    submit: 'Aanvraag versturen',
    hint:
      'Zolang APPLICATION_WEBHOOK_URL nog niet is gekoppeld, kan de aanvraagroute lokaal/logisch worden afgehandeld. Later kun je deze route koppelen aan je echte workflow.',

    sideTitle: 'Wat gebeurt er daarna?',
    sideText:
      'De aanvraag is bedoeld als nette tussenstap voordat iemand toegang krijgt tot de private feed. Je kunt later handmatige goedkeuring, Stripe-betaling en Discord-toegang koppelen.',
    steps: [
      {
        title: '1. Aanvraag ontvangen',
        text: 'De ingevulde gegevens gaan naar de aanvraagroute in je Next.js app.'
      },
      {
        title: '2. Controle of betaling',
        text: 'Je kunt later kiezen voor handmatige controle of directe Stripe Checkout.'
      },
      {
        title: '3. Discord-toegang',
        text: 'Na goedkeuring of betaling kan de gebruiker toegang krijgen tot de private signal room.'
      },
      {
        title: '4. Member feed',
        text: 'De member ontvangt dezelfde LONG en SHORT feed als alle andere leden.'
      }
    ],

    includedTitle: 'Elke membership bevat',
    included: [
      'Private Discord signal room',
      'LONG en SHORT crypto-signalen',
      'Entry-zone, invalidatie en targets',
      'Signal updates wanneer een setup verandert',
      'Geen signaal wanneer de markt niet goed genoeg is',
      'Dezelfde feed voor alle leden'
    ],

    riskTitle: 'Belangrijke risicotoelichting',
    riskText:
      'VolatilityForge is geen financieel advies. Trading heeft risico. Betalen of aanvragen geeft geen garantie op winst. Leden blijven zelf verantwoordelijk voor positieomvang, uitvoering, timing, leverage en risicobeheer.',

    finalTitle: 'Wil je eerst meer informatie bekijken?',
    finalText:
      'Bekijk pricing, performance of de FAQ voordat je een aanvraag verstuurt.',
    finalLinks: [
      ['Pricing bekijken', 'pricing'],
      ['Performance bekijken', 'performance'],
      ['FAQ bekijken', 'faq']
    ]
  },

  en: {
    badge: 'Access Application',
    title: 'Request access to the private VolatilityForge signal room.',
    intro:
      'Use this form to start your access application. The application flow is prepared so it can later connect to Stripe, Discord, Make, Zapier, Formspree or your own backend.',

    primaryCta: 'View pricing',
    secondaryCta: 'View performance',

    formTitle: 'Application form',
    formText:
      'Fill in your details. Once the backend integration is active, this form can automatically forward the request to your chosen workflow.',

    labels: {
      name: 'Name',
      email: 'Email',
      telegram: 'Telegram or Discord username',
      experience: 'Trading experience',
      plan: 'Preferred membership',
      goal: 'Why do you want access?',
      risk: 'Risk confirmation'
    },

    placeholders: {
      name: 'Your name',
      email: 'you@email.com',
      telegram: '@username or Discord name',
      goal: 'Briefly explain what you are looking for in a private signal room.'
    },

    experienceOptions: [
      ['beginner', 'Beginner'],
      ['intermediate', 'Intermediate'],
      ['advanced', 'Advanced'],
      ['professional', 'Professional']
    ],

    planOptions: [
      ['monthly', 'Monthly — €99 / month'],
      ['six_months', '6 months — €449 / 6 months'],
      ['annual', 'Annual — €799 / year']
    ],

    riskConfirm:
      'I understand that VolatilityForge is not financial advice, that trading involves risk and that results are never guaranteed.',

    submit: 'Submit application',
    hint:
      'As long as APPLICATION_WEBHOOK_URL is not connected, the application route can be handled locally/logically. Later you can connect this route to your real workflow.',

    sideTitle: 'What happens next?',
    sideText:
      'The application is intended as a clean step before someone receives access to the private feed. You can later connect manual approval, Stripe payment and Discord access.',
    steps: [
      {
        title: '1. Application received',
        text: 'The submitted details go to the application route in your Next.js app.'
      },
      {
        title: '2. Review or payment',
        text: 'You can later choose manual review or direct Stripe Checkout.'
      },
      {
        title: '3. Discord access',
        text: 'After approval or payment, the user can receive access to the private signal room.'
      },
      {
        title: '4. Member feed',
        text: 'The member receives the same LONG and SHORT feed as every other member.'
      }
    ],

    includedTitle: 'Every membership includes',
    included: [
      'Private Discord signal room',
      'LONG and SHORT crypto signals',
      'Entry zone, invalidation and targets',
      'Signal updates when a setup changes',
      'No signal when the market is not good enough',
      'Same feed for every member'
    ],

    riskTitle: 'Important risk explanation',
    riskText:
      'VolatilityForge is not financial advice. Trading involves risk. Paying or applying does not guarantee profit. Members remain responsible for position size, execution, timing, leverage and risk management.',

    finalTitle: 'Want to review more information first?',
    finalText:
      'View pricing, performance or the FAQ before submitting an application.',
    finalLinks: [
      ['View pricing', 'pricing'],
      ['View performance', 'performance'],
      ['View FAQ', 'faq']
    ]
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
    title: locale === 'nl' ? 'Toegang aanvragen' : 'Request Access',
    description: copy.intro
  };
}

export default function ApplyPage({ params }) {
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
            <Link className="primaryButton" href={`/${locale}/pricing`}>
              {copy.primaryCta}
            </Link>
            <Link className="secondaryButton" href={`/${locale}/performance`}>
              {copy.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="section twoColumnGrid">
        <article className="formPanel">
          <p className="kicker">Application</p>
          <h2>{copy.formTitle}</h2>
          <p>{copy.formText}</p>

          <form className="formGrid" action="/api/apply" method="post">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="redirectTo" value={`/${locale}/success`} />

            <div className="formRow">
              <div className="field">
                <label htmlFor="name">{copy.labels.name}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={copy.placeholders.name}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="email">{copy.labels.email}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={copy.placeholders.email}
                  required
                />
              </div>
            </div>

            <div className="formRow">
              <div className="field">
                <label htmlFor="telegram">{copy.labels.telegram}</label>
                <input
                  id="telegram"
                  name="telegram"
                  type="text"
                  placeholder={copy.placeholders.telegram}
                />
              </div>

              <div className="field">
                <label htmlFor="experience">{copy.labels.experience}</label>
                <select id="experience" name="experience" defaultValue="intermediate" required>
                  {copy.experienceOptions.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="plan">{copy.labels.plan}</label>
              <select id="plan" name="plan" defaultValue="six_months" required>
                {copy.planOptions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="goal">{copy.labels.goal}</label>
              <textarea
                id="goal"
                name="goal"
                placeholder={copy.placeholders.goal}
                required
              />
            </div>

            <div className="field">
              <label>
                <input type="checkbox" name="riskAccepted" value="yes" required />{' '}
                {copy.riskConfirm}
              </label>
            </div>

            <button className="primaryButton fullButton" type="submit">
              {copy.submit}
            </button>

            <p className="formHint">{copy.hint}</p>
          </form>
        </article>

        <aside className="panel">
          <p className="kicker">Workflow</p>
          <h2>{copy.sideTitle}</h2>
          <p className="lead">{copy.sideText}</p>

          <div className="pageStack">
            {copy.steps.map((step) => (
              <article className="card" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className="section twoColumnGrid">
        <article className="panel">
          <p className="kicker">Included</p>
          <h2>{copy.includedTitle}</h2>

          <ul className="checkList">
            {copy.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <p className="kicker">Access</p>
          <h2>{copy.finalTitle}</h2>
          <p className="lead">{copy.finalText}</p>

          <div className="buttonRow">
            {copy.finalLinks.map(([label, slug]) => (
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