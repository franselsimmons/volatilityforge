import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';

const LOCALES = ['nl', 'en', 'de', 'es', 'fr'];

const COPY = {
  nl: {
    badge: 'Aanvraag ontvangen',
    title: 'Je aanvraag is ontvangen.',
    intro:
      'Dank je. Je aanvraag voor VolatilityForge is succesvol ontvangen. De volgende stap is handmatige controle en daarna ontvang je crypto-betaalinstructies.',

    homeCta: 'Terug naar homepage',
    pricingCta: 'Bekijk pricing',

    statusKicker: 'Status',
    cryptoKicker: 'Crypto betaling',
    nextKicker: 'Volgende stap',

    statusTitle: 'Wat gebeurt er nu?',
    statusText:
      'Je aanvraag is ontvangen. VolatilityForge controleert de aanvraag handmatig. Daarna ontvang je betaalinstructies voor crypto. Na bevestigde betaling kan toegang tot de private Discord signal room worden gegeven.',

    steps: [
      {
        title: '1. Aanvraag ontvangen',
        text: 'Je gegevens zijn ontvangen door de aanvraagroute van de site.'
      },
      {
        title: '2. Handmatige controle',
        text: 'De aanvraag wordt gecontroleerd voordat betaalinstructies worden gestuurd.'
      },
      {
        title: '3. Crypto-betaling',
        text: 'Je ontvangt handmatig crypto-betaalinstructies. Plaats geen betaling voordat je de juiste instructies hebt ontvangen.'
      },
      {
        title: '4. Discord-toegang',
        text: 'Na bevestigde betaling kan toegang tot de private Discord signal room worden verstrekt.'
      }
    ],

    paymentTitle: 'Handmatige crypto-betaling',
    paymentText:
      'Voor nu werkt VolatilityForge met handmatige crypto-betaling. Er wordt geen wallet-adres openbaar op deze pagina getoond. Je ontvangt de betaalinstructies handmatig, zodat elke aanvraag eerst gecontroleerd kan worden.',

    paymentItems: [
      'Aanvraag ontvangen',
      'Plan handmatig gecontroleerd',
      'Crypto-betaalinstructies worden handmatig verzonden',
      'Betaling wordt handmatig bevestigd',
      'Discord-toegang wordt pas na bevestiging gegeven'
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
      'Thank you. Your VolatilityForge application has been received successfully. The next step is manual review, after which you will receive crypto payment instructions.',

    homeCta: 'Back to homepage',
    pricingCta: 'View pricing',

    statusKicker: 'Status',
    cryptoKicker: 'Crypto payment',
    nextKicker: 'Next',

    statusTitle: 'What happens now?',
    statusText:
      'Your application has been received. VolatilityForge will review the application manually. After that, you will receive crypto payment instructions. Once payment is confirmed, access to the private Discord signal room can be granted.',

    steps: [
      {
        title: '1. Application received',
        text: 'Your details have been received by the site’s application route.'
      },
      {
        title: '2. Manual review',
        text: 'The application is reviewed before payment instructions are sent.'
      },
      {
        title: '3. Crypto payment',
        text: 'You will receive crypto payment instructions manually. Do not send payment before receiving the correct instructions.'
      },
      {
        title: '4. Discord access',
        text: 'After confirmed payment, access to the private Discord signal room can be provided.'
      }
    ],

    paymentTitle: 'Manual crypto payment',
    paymentText:
      'For now, VolatilityForge uses manual crypto payment. No wallet address is shown publicly on this page. You will receive payment instructions manually so every application can be reviewed first.',

    paymentItems: [
      'Application received',
      'Selected plan manually reviewed',
      'Crypto payment instructions sent manually',
      'Payment confirmed manually',
      'Discord access granted only after confirmation'
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
      'Danke. Deine Anfrage für VolatilityForge wurde erfolgreich empfangen. Der nächste Schritt ist eine manuelle Prüfung. Danach erhältst du Krypto-Zahlungsanweisungen.',

    homeCta: 'Zurück zur Homepage',
    pricingCta: 'Preise ansehen',

    statusKicker: 'Status',
    cryptoKicker: 'Krypto-Zahlung',
    nextKicker: 'Nächster Schritt',

    statusTitle: 'Was passiert jetzt?',
    statusText:
      'Deine Anfrage wurde empfangen. VolatilityForge prüft die Anfrage manuell. Danach erhältst du Krypto-Zahlungsanweisungen. Nach bestätigter Zahlung kann Zugang zum privaten Discord-Signalraum gewährt werden.',

    steps: [
      {
        title: '1. Anfrage erhalten',
        text: 'Deine Daten wurden von der Anfrageroute der Website empfangen.'
      },
      {
        title: '2. Manuelle Prüfung',
        text: 'Die Anfrage wird geprüft, bevor Zahlungsanweisungen gesendet werden.'
      },
      {
        title: '3. Krypto-Zahlung',
        text: 'Du erhältst die Krypto-Zahlungsanweisungen manuell. Sende keine Zahlung, bevor du die korrekten Anweisungen erhalten hast.'
      },
      {
        title: '4. Discord-Zugang',
        text: 'Nach bestätigter Zahlung kann Zugang zum privaten Discord-Signalraum bereitgestellt werden.'
      }
    ],

    paymentTitle: 'Manuelle Krypto-Zahlung',
    paymentText:
      'VolatilityForge arbeitet vorerst mit manueller Krypto-Zahlung. Auf dieser Seite wird keine Wallet-Adresse öffentlich angezeigt. Du erhältst die Zahlungsanweisungen manuell, damit jede Anfrage zuerst geprüft werden kann.',

    paymentItems: [
      'Anfrage erhalten',
      'Gewählter Plan manuell geprüft',
      'Krypto-Zahlungsanweisungen werden manuell gesendet',
      'Zahlung wird manuell bestätigt',
      'Discord-Zugang erst nach Bestätigung'
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
      'Gracias. Tu solicitud para VolatilityForge se ha recibido correctamente. El siguiente paso es una revisión manual y después recibirás instrucciones de pago cripto.',

    homeCta: 'Volver a la homepage',
    pricingCta: 'Ver precios',

    statusKicker: 'Estado',
    cryptoKicker: 'Pago cripto',
    nextKicker: 'Siguiente',

    statusTitle: '¿Qué ocurre ahora?',
    statusText:
      'Tu solicitud ha sido recibida. VolatilityForge revisará la solicitud manualmente. Después recibirás instrucciones de pago cripto. Una vez confirmado el pago, se puede conceder acceso a la sala privada de señales en Discord.',

    steps: [
      {
        title: '1. Solicitud recibida',
        text: 'Tus datos han sido recibidos por la ruta de solicitud del sitio.'
      },
      {
        title: '2. Revisión manual',
        text: 'La solicitud se revisa antes de enviar instrucciones de pago.'
      },
      {
        title: '3. Pago cripto',
        text: 'Recibirás las instrucciones de pago cripto manualmente. No envíes ningún pago antes de recibir las instrucciones correctas.'
      },
      {
        title: '4. Acceso a Discord',
        text: 'Después de confirmar el pago, se puede proporcionar acceso a la sala privada de señales en Discord.'
      }
    ],

    paymentTitle: 'Pago cripto manual',
    paymentText:
      'Por ahora, VolatilityForge usa pago cripto manual. No se muestra ninguna dirección de wallet públicamente en esta página. Recibirás las instrucciones de pago manualmente para que cada solicitud pueda revisarse primero.',

    paymentItems: [
      'Solicitud recibida',
      'Plan seleccionado revisado manualmente',
      'Instrucciones de pago cripto enviadas manualmente',
      'Pago confirmado manualmente',
      'Acceso a Discord solo después de confirmación'
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
      'Merci. Ta demande VolatilityForge a été reçue avec succès. La prochaine étape est une vérification manuelle, puis tu recevras les instructions de paiement crypto.',

    homeCta: 'Retour à la homepage',
    pricingCta: 'Voir les tarifs',

    statusKicker: 'Statut',
    cryptoKicker: 'Paiement crypto',
    nextKicker: 'Suite',

    statusTitle: 'Que se passe-t-il maintenant ?',
    statusText:
      'Ta demande a été reçue. VolatilityForge vérifiera la demande manuellement. Ensuite, tu recevras les instructions de paiement crypto. Une fois le paiement confirmé, l’accès à la salle privée de signaux Discord peut être accordé.',

    steps: [
      {
        title: '1. Demande reçue',
        text: 'Tes informations ont été reçues par la route de demande du site.'
      },
      {
        title: '2. Vérification manuelle',
        text: 'La demande est vérifiée avant l’envoi des instructions de paiement.'
      },
      {
        title: '3. Paiement crypto',
        text: 'Tu recevras les instructions de paiement crypto manuellement. N’envoie aucun paiement avant d’avoir reçu les instructions correctes.'
      },
      {
        title: '4. Accès Discord',
        text: 'Après confirmation du paiement, l’accès à la salle privée de signaux Discord peut être fourni.'
      }
    ],

    paymentTitle: 'Paiement crypto manuel',
    paymentText:
      'Pour le moment, VolatilityForge utilise un paiement crypto manuel. Aucune adresse wallet n’est affichée publiquement sur cette page. Tu recevras les instructions de paiement manuellement afin que chaque demande puisse être vérifiée d’abord.',

    paymentItems: [
      'Demande reçue',
      'Plan sélectionné vérifié manuellement',
      'Instructions de paiement crypto envoyées manuellement',
      'Paiement confirmé manuellement',
      'Accès Discord uniquement après confirmation'
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
          <p className="kicker">{copy.cryptoKicker}</p>
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