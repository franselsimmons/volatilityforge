import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';

const LOCALES = ['nl', 'en', 'de', 'es', 'fr'];

const COPY = {
  nl: {
    badge: 'Aanvraag ontvangen',
    title: 'Je aanvraag is ontvangen.',
    intro:
      'Dank je. Je aanvraag voor VolatilityForge is succesvol doorgestuurd. De volgende stap is controle, betaling of handmatige toegang, afhankelijk van hoe je de workflow straks koppelt.',

    homeCta: 'Terug naar homepage',
    pricingCta: 'Bekijk pricing',

    statusKicker: 'Status',
    checkoutKicker: 'Checkout',
    nextKicker: 'Volgende stap',

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
      'VolatilityForge is geen financieel advies. Trading heeft risico. Toegang tot een signal room geeft geen garantie op winst. Resultaten kunnen afwijken door uitvoering, timing, fees, slippage, leverage, positieomvang en marktomstandigheden.'
  },

  en: {
    badge: 'Application received',
    title: 'Your application has been received.',
    intro:
      'Thank you. Your VolatilityForge application has been submitted successfully. The next step is review, payment or manual access, depending on how you connect the workflow later.',

    homeCta: 'Back to homepage',
    pricingCta: 'View pricing',

    statusKicker: 'Status',
    checkoutKicker: 'Checkout',
    nextKicker: 'Next',

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
      'VolatilityForge is not financial advice. Trading involves risk. Access to a signal room does not guarantee profit. Results can differ because of execution, timing, fees, slippage, leverage, position size and market conditions.'
  },

  de: {
    badge: 'Anfrage erhalten',
    title: 'Deine Anfrage wurde empfangen.',
    intro:
      'Danke. Deine Anfrage für VolatilityForge wurde erfolgreich übermittelt. Der nächste Schritt ist Prüfung, Zahlung oder manueller Zugang, abhängig davon, wie du den Workflow später verbindest.',

    homeCta: 'Zurück zur Homepage',
    pricingCta: 'Preise ansehen',

    statusKicker: 'Status',
    checkoutKicker: 'Checkout',
    nextKicker: 'Nächster Schritt',

    statusTitle: 'Was passiert jetzt?',
    statusText:
      'Diese Seite ist als Erfolgsseite für Anfragen vorbereitet und später auch für Zahlungen über Stripe Checkout nutzbar.',

    steps: [
      {
        title: '1. Anfrage gespeichert',
        text: 'Deine Daten wurden von der Anfrageroute der Website empfangen.'
      },
      {
        title: '2. Prüfung oder Zahlung',
        text: 'VolatilityForge kann die Anfrage manuell prüfen oder später direkt mit Stripe Checkout verbinden.'
      },
      {
        title: '3. Discord-Zugang',
        text: 'Nach Freigabe oder Zahlung kann Zugang zum privaten Signalraum bereitgestellt werden.'
      },
      {
        title: '4. Privater Feed',
        text: 'Nach dem Zugang erhältst du denselben LONG- und SHORT-Signalfeed wie alle anderen Mitglieder.'
      }
    ],

    paymentTitle: 'Zahlungsflow vorbereitet',
    paymentText:
      'Wenn Stripe später verbunden wird, kann diese Seite auch als Success URL nach einer abgeschlossenen Zahlung verwendet werden.',

    paymentItems: [
      'Stripe Success Redirect vorbereitet',
      'Anfrageflow vorbereitet',
      'Discord-Zugang später automatisierbar',
      'Environment Variables in der Root vorbereitet'
    ],

    nextTitle: 'Sieh dir währenddessen die wichtigsten Seiten an.',
    nextText:
      'Du kannst zurück zu Preisen, Performance oder Signal Room gehen, um die Struktur noch einmal anzusehen.',

    links: [
      ['Preise ansehen', 'pricing'],
      ['Performance ansehen', 'performance'],
      ['Signal Room ansehen', 'signal-room'],
      ['FAQ ansehen', 'faq']
    ],

    riskTitle: 'Wichtige Risikoerklärung',
    riskText:
      'VolatilityForge ist keine Finanzberatung. Trading beinhaltet Risiko. Zugang zu einem Signalraum garantiert keinen Gewinn. Ergebnisse können durch Ausführung, Timing, Gebühren, Slippage, Leverage, Positionsgröße und Marktbedingungen abweichen.'
  },

  es: {
    badge: 'Solicitud recibida',
    title: 'Tu solicitud ha sido recibida.',
    intro:
      'Gracias. Tu solicitud para VolatilityForge se ha enviado correctamente. El siguiente paso es revisión, pago o acceso manual, dependiendo de cómo conectes el flujo más adelante.',

    homeCta: 'Volver a la homepage',
    pricingCta: 'Ver precios',

    statusKicker: 'Estado',
    checkoutKicker: 'Checkout',
    nextKicker: 'Siguiente',

    statusTitle: '¿Qué ocurre ahora?',
    statusText:
      'Esta página está preparada como página de éxito para solicitudes y más adelante también para pagos mediante Stripe Checkout.',

    steps: [
      {
        title: '1. Solicitud guardada',
        text: 'Tus datos han sido recibidos por la ruta de solicitud del sitio.'
      },
      {
        title: '2. Revisión o pago',
        text: 'VolatilityForge puede revisar la solicitud manualmente o conectarla más adelante directamente a Stripe Checkout.'
      },
      {
        title: '3. Acceso a Discord',
        text: 'Después de la aprobación o el pago, se puede proporcionar acceso a la sala privada de señales.'
      },
      {
        title: '4. Feed privado',
        text: 'Después del acceso, recibes el mismo feed de señales LONG y SHORT que todos los demás miembros.'
      }
    ],

    paymentTitle: 'Flujo de pago preparado',
    paymentText:
      'Cuando Stripe se conecte más adelante, esta página también puede usarse como success URL después de un pago completado.',

    paymentItems: [
      'Redirect de éxito de Stripe preparado',
      'Flujo de solicitud preparado',
      'Acceso a Discord automatizable más adelante',
      'Environment variables preparadas en la root'
    ],

    nextTitle: 'Mientras tanto, revisa las páginas principales.',
    nextText:
      'Puedes volver a precios, rendimiento o sala de señales para revisar la estructura otra vez.',

    links: [
      ['Ver precios', 'pricing'],
      ['Ver rendimiento', 'performance'],
      ['Ver sala de señales', 'signal-room'],
      ['Ver FAQ', 'faq']
    ],

    riskTitle: 'Explicación importante de riesgo',
    riskText:
      'VolatilityForge no es asesoramiento financiero. El trading implica riesgo. El acceso a una sala de señales no garantiza beneficios. Los resultados pueden diferir por ejecución, timing, comisiones, slippage, apalancamiento, tamaño de posición y condiciones de mercado.'
  },

  fr: {
    badge: 'Demande reçue',
    title: 'Ta demande a été reçue.',
    intro:
      'Merci. Ta demande VolatilityForge a été envoyée avec succès. La prochaine étape est la vérification, le paiement ou l’accès manuel, selon la façon dont tu connectes le workflow plus tard.',

    homeCta: 'Retour à la homepage',
    pricingCta: 'Voir les tarifs',

    statusKicker: 'Statut',
    checkoutKicker: 'Checkout',
    nextKicker: 'Suite',

    statusTitle: 'Que se passe-t-il maintenant ?',
    statusText:
      'Cette page est préparée comme page de succès pour les demandes et plus tard aussi pour les paiements via Stripe Checkout.',

    steps: [
      {
        title: '1. Demande enregistrée',
        text: 'Tes informations ont été reçues par la route de demande du site.'
      },
      {
        title: '2. Vérification ou paiement',
        text: 'VolatilityForge peut vérifier la demande manuellement ou la connecter plus tard directement à Stripe Checkout.'
      },
      {
        title: '3. Accès Discord',
        text: 'Après approbation ou paiement, l’accès à la salle privée de signaux peut être fourni.'
      },
      {
        title: '4. Feed privé',
        text: 'Après l’accès, tu reçois le même feed de signaux LONG et SHORT que tous les autres membres.'
      }
    ],

    paymentTitle: 'Flux de paiement préparé',
    paymentText:
      'Lorsque Stripe sera connecté plus tard, cette page pourra aussi être utilisée comme success URL après un paiement terminé.',

    paymentItems: [
      'Redirect success Stripe préparé',
      'Flux de demande préparé',
      'Accès Discord automatisable plus tard',
      'Environment variables préparées dans la root'
    ],

    nextTitle: 'Consulte les pages principales en attendant.',
    nextText:
      'Tu peux revenir aux tarifs, à la performance ou à la salle de signaux pour revoir la structure.',

    links: [
      ['Voir les tarifs', 'pricing'],
      ['Voir la performance', 'performance'],
      ['Voir la salle de signaux', 'signal-room'],
      ['Voir la FAQ', 'faq']
    ],

    riskTitle: 'Explication importante du risque',
    riskText:
      'VolatilityForge ne constitue pas un conseil financier. Le trading comporte des risques. L’accès à une salle de signaux ne garantit aucun profit. Les résultats peuvent différer en raison de l’exécution, du timing, des frais, du slippage, du levier, de la taille de position et des conditions de marché.'
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
    title: locale === 'nl' ? 'Aanvraag ontvangen' : copy.badge,
    description: copy.intro
  };
}

export default async function SuccessPage({ params }) {
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
            <Link className="primaryButton" href={`/${locale}`}>
              {copy.homeCta}
            </Link>
            <Link className="secondaryButton" href={`/${locale}/pricing`}>
              {copy.pricingCta}
            </Link>
          </div>
        </div>

        <article className="panel">
          <p className="kicker">{copy.statusKicker}</p>
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
          <p className="kicker">{copy.checkoutKicker}</p>
          <h2>{copy.paymentTitle}</h2>
          <p className="lead">{copy.paymentText}</p>

          <ul className="checkList">
            {copy.paymentItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <p className="kicker">{copy.nextKicker}</p>
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