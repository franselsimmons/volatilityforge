import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';

const LOCALES = ['nl', 'en', 'de', 'es', 'fr'];

const COPY = {
  nl: {
    badge: 'Access Application',
    title: 'Vraag toegang aan tot de private VolatilityForge signal room.',
    intro:
      'Gebruik dit formulier om je aanvraag voor toegang te starten. De aanvraagflow is voorbereid zodat je later makkelijk kunt koppelen met Stripe, Discord, Make, Zapier, Formspree of je eigen backend.',

    primaryCta: 'Bekijk pricing',
    secondaryCta: 'Bekijk performance',

    applicationKicker: 'Aanvraag',
    workflowKicker: 'Workflow',
    includedKicker: 'Inbegrepen',
    accessKicker: 'Toegang',

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

    applicationKicker: 'Application',
    workflowKicker: 'Workflow',
    includedKicker: 'Included',
    accessKicker: 'Access',

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
  },

  de: {
    badge: 'Zugangsanfrage',
    title: 'Beantrage Zugang zum privaten VolatilityForge Signalraum.',
    intro:
      'Nutze dieses Formular, um deine Zugangsanfrage zu starten. Der Anfrageprozess ist so vorbereitet, dass er später einfach mit Stripe, Discord, Make, Zapier, Formspree oder deinem eigenen Backend verbunden werden kann.',

    primaryCta: 'Preise ansehen',
    secondaryCta: 'Performance ansehen',

    applicationKicker: 'Anfrage',
    workflowKicker: 'Workflow',
    includedKicker: 'Enthalten',
    accessKicker: 'Zugang',

    formTitle: 'Anfrageformular',
    formText:
      'Fülle deine Daten aus. Sobald die Backend-Integration aktiv ist, kann dieses Formular die Anfrage automatisch an deinen gewählten Workflow weiterleiten.',

    labels: {
      name: 'Name',
      email: 'E-Mail',
      telegram: 'Telegram- oder Discord-Benutzername',
      experience: 'Trading-Erfahrung',
      plan: 'Gewünschte Mitgliedschaft',
      goal: 'Warum möchtest du Zugang?',
      risk: 'Risikobestätigung'
    },

    placeholders: {
      name: 'Dein Name',
      email: 'du@email.com',
      telegram: '@benutzername oder Discord-Name',
      goal: 'Beschreibe kurz, was du in einem privaten Signalraum suchst.'
    },

    experienceOptions: [
      ['beginner', 'Anfänger'],
      ['intermediate', 'Fortgeschritten'],
      ['advanced', 'Erfahren'],
      ['professional', 'Professionell']
    ],

    planOptions: [
      ['monthly', 'Monatlich — €99 / Monat'],
      ['six_months', '6 Monate — €449 / 6 Monate'],
      ['annual', 'Jährlich — €799 / Jahr']
    ],

    riskConfirm:
      'Ich verstehe, dass VolatilityForge keine Finanzberatung ist, dass Trading Risiken beinhaltet und dass Ergebnisse niemals garantiert sind.',

    submit: 'Anfrage senden',
    hint:
      'Solange APPLICATION_WEBHOOK_URL noch nicht verbunden ist, kann die Anfrageroute lokal/logisch verarbeitet werden. Später kannst du diese Route mit deinem echten Workflow verbinden.',

    sideTitle: 'Was passiert danach?',
    sideText:
      'Die Anfrage ist als sauberer Zwischenschritt gedacht, bevor jemand Zugang zum privaten Feed erhält. Später kannst du manuelle Freigabe, Stripe-Zahlung und Discord-Zugang verbinden.',
    steps: [
      {
        title: '1. Anfrage erhalten',
        text: 'Die eingereichten Daten gehen an die Anfrageroute in deiner Next.js App.'
      },
      {
        title: '2. Prüfung oder Zahlung',
        text: 'Du kannst später zwischen manueller Prüfung und direktem Stripe Checkout wählen.'
      },
      {
        title: '3. Discord-Zugang',
        text: 'Nach Freigabe oder Zahlung kann der Nutzer Zugang zum privaten Signalraum erhalten.'
      },
      {
        title: '4. Member-Feed',
        text: 'Das Mitglied erhält denselben LONG- und SHORT-Feed wie alle anderen Mitglieder.'
      }
    ],

    includedTitle: 'Jede Mitgliedschaft enthält',
    included: [
      'Privater Discord-Signalraum',
      'LONG- und SHORT-Krypto-Signale',
      'Entry-Zone, Invalidierung und Targets',
      'Signal-Updates, wenn sich ein Setup verändert',
      'Kein Signal, wenn der Markt nicht gut genug ist',
      'Derselbe Feed für alle Mitglieder'
    ],

    riskTitle: 'Wichtige Risikohinweise',
    riskText:
      'VolatilityForge ist keine Finanzberatung. Trading beinhaltet Risiko. Eine Zahlung oder Anfrage garantiert keinen Gewinn. Mitglieder bleiben selbst verantwortlich für Positionsgröße, Ausführung, Timing, Hebel und Risikomanagement.',

    finalTitle: 'Möchtest du zuerst mehr Informationen ansehen?',
    finalText:
      'Sieh dir Preise, Performance oder die FAQ an, bevor du eine Anfrage sendest.',
    finalLinks: [
      ['Preise ansehen', 'pricing'],
      ['Performance ansehen', 'performance'],
      ['FAQ ansehen', 'faq']
    ]
  },

  es: {
    badge: 'Solicitud de acceso',
    title: 'Solicita acceso a la sala privada de señales de VolatilityForge.',
    intro:
      'Usa este formulario para iniciar tu solicitud de acceso. El flujo de solicitud está preparado para conectarse más adelante con Stripe, Discord, Make, Zapier, Formspree o tu propio backend.',

    primaryCta: 'Ver precios',
    secondaryCta: 'Ver rendimiento',

    applicationKicker: 'Solicitud',
    workflowKicker: 'Flujo',
    includedKicker: 'Incluido',
    accessKicker: 'Acceso',

    formTitle: 'Formulario de solicitud',
    formText:
      'Rellena tus datos. Cuando la integración backend esté activa, este formulario podrá enviar automáticamente la solicitud a tu flujo elegido.',

    labels: {
      name: 'Nombre',
      email: 'Correo electrónico',
      telegram: 'Usuario de Telegram o Discord',
      experience: 'Experiencia en trading',
      plan: 'Membresía preferida',
      goal: '¿Por qué quieres acceso?',
      risk: 'Confirmación de riesgo'
    },

    placeholders: {
      name: 'Tu nombre',
      email: 'tu@email.com',
      telegram: '@usuario o nombre de Discord',
      goal: 'Explica brevemente qué buscas en una sala privada de señales.'
    },

    experienceOptions: [
      ['beginner', 'Principiante'],
      ['intermediate', 'Intermedio'],
      ['advanced', 'Avanzado'],
      ['professional', 'Profesional']
    ],

    planOptions: [
      ['monthly', 'Mensual — €99 / mes'],
      ['six_months', '6 meses — €449 / 6 meses'],
      ['annual', 'Anual — €799 / año']
    ],

    riskConfirm:
      'Entiendo que VolatilityForge no es asesoramiento financiero, que el trading implica riesgo y que los resultados nunca están garantizados.',

    submit: 'Enviar solicitud',
    hint:
      'Mientras APPLICATION_WEBHOOK_URL no esté conectado, la ruta de solicitud puede gestionarse de forma local/lógica. Más adelante puedes conectar esta ruta a tu flujo real.',

    sideTitle: '¿Qué ocurre después?',
    sideText:
      'La solicitud está pensada como un paso ordenado antes de que alguien reciba acceso al feed privado. Más adelante puedes conectar aprobación manual, pago con Stripe y acceso a Discord.',
    steps: [
      {
        title: '1. Solicitud recibida',
        text: 'Los datos enviados van a la ruta de solicitud en tu app Next.js.'
      },
      {
        title: '2. Revisión o pago',
        text: 'Más adelante puedes elegir revisión manual o Stripe Checkout directo.'
      },
      {
        title: '3. Acceso a Discord',
        text: 'Después de la aprobación o el pago, el usuario puede recibir acceso a la sala privada de señales.'
      },
      {
        title: '4. Feed de miembro',
        text: 'El miembro recibe el mismo feed LONG y SHORT que todos los demás miembros.'
      }
    ],

    includedTitle: 'Cada membresía incluye',
    included: [
      'Sala privada de señales en Discord',
      'Señales cripto LONG y SHORT',
      'Zona de entrada, invalidación y objetivos',
      'Actualizaciones cuando un setup cambia',
      'Sin señal cuando el mercado no es suficientemente bueno',
      'El mismo feed para todos los miembros'
    ],

    riskTitle: 'Explicación importante de riesgo',
    riskText:
      'VolatilityForge no es asesoramiento financiero. El trading implica riesgo. Pagar o solicitar acceso no garantiza beneficios. Los miembros siguen siendo responsables del tamaño de posición, ejecución, timing, apalancamiento y gestión de riesgo.',

    finalTitle: '¿Quieres revisar más información primero?',
    finalText:
      'Consulta los precios, el rendimiento o la FAQ antes de enviar una solicitud.',
    finalLinks: [
      ['Ver precios', 'pricing'],
      ['Ver rendimiento', 'performance'],
      ['Ver FAQ', 'faq']
    ]
  },

  fr: {
    badge: 'Demande d’accès',
    title: 'Demande l’accès à la salle privée de signaux VolatilityForge.',
    intro:
      'Utilise ce formulaire pour démarrer ta demande d’accès. Le flux de demande est préparé pour être connecté plus tard à Stripe, Discord, Make, Zapier, Formspree ou ton propre backend.',

    primaryCta: 'Voir les tarifs',
    secondaryCta: 'Voir la performance',

    applicationKicker: 'Demande',
    workflowKicker: 'Workflow',
    includedKicker: 'Inclus',
    accessKicker: 'Accès',

    formTitle: 'Formulaire de demande',
    formText:
      'Remplis tes informations. Une fois l’intégration backend active, ce formulaire pourra envoyer automatiquement la demande vers le workflow choisi.',

    labels: {
      name: 'Nom',
      email: 'E-mail',
      telegram: 'Nom d’utilisateur Telegram ou Discord',
      experience: 'Expérience en trading',
      plan: 'Abonnement souhaité',
      goal: 'Pourquoi veux-tu accéder ?',
      risk: 'Confirmation du risque'
    },

    placeholders: {
      name: 'Ton nom',
      email: 'toi@email.com',
      telegram: '@utilisateur ou nom Discord',
      goal: 'Explique brièvement ce que tu recherches dans une salle privée de signaux.'
    },

    experienceOptions: [
      ['beginner', 'Débutant'],
      ['intermediate', 'Intermédiaire'],
      ['advanced', 'Avancé'],
      ['professional', 'Professionnel']
    ],

    planOptions: [
      ['monthly', 'Mensuel — €99 / mois'],
      ['six_months', '6 mois — €449 / 6 mois'],
      ['annual', 'Annuel — €799 / an']
    ],

    riskConfirm:
      'Je comprends que VolatilityForge ne constitue pas un conseil financier, que le trading comporte des risques et que les résultats ne sont jamais garantis.',

    submit: 'Envoyer la demande',
    hint:
      'Tant que APPLICATION_WEBHOOK_URL n’est pas connecté, la route de demande peut être traitée localement/logiquement. Plus tard, tu peux connecter cette route à ton vrai workflow.',

    sideTitle: 'Que se passe-t-il ensuite ?',
    sideText:
      'La demande sert d’étape propre avant qu’une personne reçoive l’accès au feed privé. Tu peux ensuite connecter une approbation manuelle, un paiement Stripe et l’accès Discord.',
    steps: [
      {
        title: '1. Demande reçue',
        text: 'Les informations soumises vont vers la route de demande dans ton app Next.js.'
      },
      {
        title: '2. Vérification ou paiement',
        text: 'Tu peux ensuite choisir une vérification manuelle ou un Stripe Checkout direct.'
      },
      {
        title: '3. Accès Discord',
        text: 'Après approbation ou paiement, l’utilisateur peut recevoir l’accès à la salle privée de signaux.'
      },
      {
        title: '4. Feed membre',
        text: 'Le membre reçoit le même feed LONG et SHORT que tous les autres membres.'
      }
    ],

    includedTitle: 'Chaque abonnement inclut',
    included: [
      'Salle privée de signaux Discord',
      'Signaux crypto LONG et SHORT',
      'Zone d’entrée, invalidation et objectifs',
      'Mises à jour lorsqu’un setup change',
      'Aucun signal lorsque le marché n’est pas assez bon',
      'Le même feed pour tous les membres'
    ],

    riskTitle: 'Explication importante du risque',
    riskText:
      'VolatilityForge ne constitue pas un conseil financier. Le trading comporte des risques. Payer ou faire une demande ne garantit pas de profit. Les membres restent responsables de la taille de position, de l’exécution, du timing, du levier et de la gestion du risque.',

    finalTitle: 'Tu veux d’abord consulter plus d’informations ?',
    finalText:
      'Consulte les tarifs, la performance ou la FAQ avant d’envoyer une demande.',
    finalLinks: [
      ['Voir les tarifs', 'pricing'],
      ['Voir la performance', 'performance'],
      ['Voir la FAQ', 'faq']
    ]
  }
};

function getCopy(locale) {
  return COPY[locale] || COPY.nl;
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale;

  if (!LOCALES.includes(locale)) {
    return {};
  }

  const copy = getCopy(locale);

  return {
    title: locale === 'nl' ? 'Toegang aanvragen' : copy.title,
    description: copy.intro
  };
}

export default async function ApplyPage({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale;

  if (!LOCALES.includes(locale)) {
    notFound();
  }

  const copy = getCopy(locale);

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
          <p className="kicker">{copy.applicationKicker}</p>
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
          <p className="kicker">{copy.workflowKicker}</p>
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
          <p className="kicker">{copy.includedKicker}</p>
          <h2>{copy.includedTitle}</h2>

          <ul className="checkList">
            {copy.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <p className="kicker">{copy.accessKicker}</p>
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