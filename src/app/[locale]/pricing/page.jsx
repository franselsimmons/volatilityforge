import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';
import PricingCards from '@/components/PricingCards';

const LOCALES = ['nl', 'en', 'de', 'es', 'fr'];

const COPY = {
  nl: {
    badge: 'Pricing',
    title: 'Eén private signal room. Eén standaard. Drie looptijden.',
    intro:
      'Elke membership geeft toegang tot dezelfde private VolatilityForge signal room. Er zijn geen verborgen VIP-lagen, geen aparte premium feed en geen upgrade voor betere signalen. Alleen de looptijd verschilt.',

    primaryCta: 'Aanvraag starten',
    secondaryCta: 'Bekijk performance',

    membershipKicker: 'Membership',
    includedKicker: 'Inbegrepen',
    accessLengthKicker: 'Looptijd',
    stripeKicker: 'Stripe voorbereid',
    environmentKicker: 'Environment',
    accessKicker: 'Toegang',

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

    membershipKicker: 'Membership',
    includedKicker: 'Included',
    accessLengthKicker: 'Access Length',
    stripeKicker: 'Stripe Ready',
    environmentKicker: 'Environment',
    accessKicker: 'Access',

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
  },

  de: {
    badge: 'Preise',
    title: 'Ein privater Signalraum. Ein Standard. Drei Laufzeiten.',
    intro:
      'Jede Mitgliedschaft gibt Zugang zum gleichen privaten VolatilityForge Signalraum. Es gibt keine versteckten VIP-Stufen, keinen separaten Premium-Feed und kein Upgrade für bessere Signale. Nur die Laufzeit unterscheidet sich.',

    primaryCta: 'Anfrage starten',
    secondaryCta: 'Performance ansehen',

    membershipKicker: 'Mitgliedschaft',
    includedKicker: 'Enthalten',
    accessLengthKicker: 'Laufzeit',
    stripeKicker: 'Stripe vorbereitet',
    environmentKicker: 'Environment',
    accessKicker: 'Zugang',

    pricingTitle: 'Mitgliedschaftsoptionen',
    pricingText:
      'Die Zahlungsstruktur ist für Stripe vorbereitet. Solange Stripe noch nicht verbunden ist, führen die Buttons zur Anfrageseite.',

    includedTitle: 'Jede Mitgliedschaft enthält',
    includedText:
      'Der Inhalt ist für alle Mitglieder gleich. Du bezahlst nicht für höhere Signalqualität, sondern für die Dauer deines Zugangs.',
    included: [
      'Privater Discord-Signalraum',
      'LONG- und SHORT-Krypto-Signale',
      'Entry-Zone, Invalidierung und Targets',
      'Signal-Updates, wenn sich ein Setup verändert',
      'Kein Signal, wenn der Markt nicht gut genug ist',
      'Derselbe Feed für alle Mitglieder',
      'Risk-first Signalstruktur',
      'Vorbereitet für Stripe-Zahlung'
    ],

    plansTitle: 'Was die Laufzeiten bedeuten.',
    plansText:
      'Die Monatsoption ist flexibel. Die 6-Monats-Option ist als Kernmitgliedschaft gedacht. Die Jahresoption ist für Mitglieder, die VolatilityForge längerfristig folgen möchten.',
    planCards: [
      {
        title: 'Monatlich',
        text: 'Flexibler Zugang. Geeignet, wenn du zuerst erleben möchtest, wie der private Signalraum funktioniert.'
      },
      {
        title: '6 Monate',
        text: 'Empfohlene Option. Genug Zeit, um den Signalraum über mehrere Marktphasen hinweg zu verfolgen.'
      },
      {
        title: 'Jährlich',
        text: 'Bester Wert für Mitglieder, die strukturierten Zugang zum VolatilityForge Feed möchten.'
      }
    ],

    paymentTitle: 'Zahlungsflow vorbereitet.',
    paymentText:
      'Die Website ist für die Verbindung mit Stripe Checkout vorbereitet. Sobald du deine Stripe Keys und Price IDs in Vercel hinzufügst, können die Pricing-Buttons direkt zur Zahlung führen.',
    paymentItems: [
      'Stripe Checkout API-Route vorbereitet',
      'Monthly, 6 months und annual Price IDs vorbereitet',
      'Success-Route vorhanden',
      'Anfrageroute als Fallback vorhanden',
      'Environment Variables für Vercel vorbereitet'
    ],

    envTitle: 'Später für Stripe erforderlich.',
    envText:
      'Wenn du mit Zahlungen live gehen möchtest, füge diese Environment Variables in Vercel hinzu.',
    envVars: [
      'NEXT_PUBLIC_ENABLE_PAYMENTS=true',
      'NEXT_PUBLIC_SITE_URL=https://deinedomain.de',
      'STRIPE_SECRET_KEY=sk_live_...',
      'STRIPE_PRICE_MONTHLY=price_...',
      'STRIPE_PRICE_SIX_MONTHS=price_...',
      'STRIPE_PRICE_ANNUAL=price_...'
    ],

    riskTitle: 'Wichtige Risikoerklärung',
    riskText:
      'VolatilityForge ist keine Finanzberatung. Trading beinhaltet Risiko. Für den Zugang zum Signalraum zu bezahlen garantiert keinen Gewinn. Reale Ergebnisse können durch Ausführung, Timing, Gebühren, Slippage, Leverage, Positionsgröße und Marktbedingungen abweichen.',

    finalTitle: 'Möchtest du Zugang anfragen?',
    finalText:
      'Starte eine Anfrage oder sieh dir zuerst die Performance-Seite an. Die Zahlungsstruktur ist bereit, später direkt mit Stripe verbunden zu werden.',
    finalPrimary: 'Anfrage starten',
    finalSecondary: 'Performance ansehen'
  },

  es: {
    badge: 'Precios',
    title: 'Una sala privada de señales. Un estándar. Tres duraciones.',
    intro:
      'Cada membresía da acceso a la misma sala privada de señales de VolatilityForge. No hay niveles VIP ocultos, no hay feed premium separado y no hay upgrade para mejores señales. Solo cambia la duración del acceso.',

    primaryCta: 'Iniciar solicitud',
    secondaryCta: 'Ver rendimiento',

    membershipKicker: 'Membresía',
    includedKicker: 'Incluido',
    accessLengthKicker: 'Duración',
    stripeKicker: 'Stripe preparado',
    environmentKicker: 'Environment',
    accessKicker: 'Acceso',

    pricingTitle: 'Opciones de membresía',
    pricingText:
      'La estructura de pago está preparada para Stripe. Hasta que Stripe esté conectado, los botones envían a los usuarios a la página de solicitud.',

    includedTitle: 'Cada membresía incluye',
    includedText:
      'El contenido es el mismo para todos los miembros. No pagas por una mayor calidad de señal, sino por la duración de tu acceso.',
    included: [
      'Sala privada de señales en Discord',
      'Señales cripto LONG y SHORT',
      'Zona de entrada, invalidación y objetivos',
      'Actualizaciones cuando un setup cambia',
      'Sin señal cuando el mercado no es suficientemente bueno',
      'El mismo feed para todos los miembros',
      'Estructura de señales risk-first',
      'Preparado para pago con Stripe'
    ],

    plansTitle: 'Qué significan las duraciones.',
    plansText:
      'La opción mensual es flexible. La opción de 6 meses está pensada como membresía principal. La opción anual es para miembros que quieren seguir VolatilityForge a largo plazo.',
    planCards: [
      {
        title: 'Mensual',
        text: 'Acceso flexible. Adecuado si primero quieres experimentar cómo funciona la sala privada de señales.'
      },
      {
        title: '6 meses',
        text: 'Opción recomendada. Tiempo suficiente para seguir la sala de señales durante varias fases de mercado.'
      },
      {
        title: 'Anual',
        text: 'Mejor valor para miembros que quieren acceso estructurado al feed de VolatilityForge.'
      }
    ],

    paymentTitle: 'Flujo de pago preparado.',
    paymentText:
      'El sitio está preparado para integrarse con Stripe Checkout. Cuando añadas tus Stripe keys y price IDs en Vercel, los botones de pricing podrán enviar directamente al pago.',
    paymentItems: [
      'Ruta API de Stripe Checkout preparada',
      'Price IDs mensual, 6 meses y anual preparados',
      'Ruta de éxito incluida',
      'Ruta de solicitud incluida como fallback',
      'Environment variables preparadas para Vercel'
    ],

    envTitle: 'Necesario más adelante para Stripe.',
    envText:
      'Cuando quieras activar pagos en vivo, añade estas environment variables en Vercel.',
    envVars: [
      'NEXT_PUBLIC_ENABLE_PAYMENTS=true',
      'NEXT_PUBLIC_SITE_URL=https://tudominio.com',
      'STRIPE_SECRET_KEY=sk_live_...',
      'STRIPE_PRICE_MONTHLY=price_...',
      'STRIPE_PRICE_SIX_MONTHS=price_...',
      'STRIPE_PRICE_ANNUAL=price_...'
    ],

    riskTitle: 'Explicación importante de riesgo',
    riskText:
      'VolatilityForge no es asesoramiento financiero. El trading implica riesgo. Pagar por acceso a la sala de señales no garantiza beneficios. Los resultados reales pueden diferir por ejecución, timing, comisiones, slippage, apalancamiento, tamaño de posición y condiciones de mercado.',

    finalTitle: '¿Quieres solicitar acceso?',
    finalText:
      'Inicia una solicitud o revisa primero la página de rendimiento. La estructura de pago está lista para conectarse más adelante directamente con Stripe.',
    finalPrimary: 'Iniciar solicitud',
    finalSecondary: 'Ver rendimiento'
  },

  fr: {
    badge: 'Tarifs',
    title: 'Une salle privée de signaux. Un standard. Trois durées.',
    intro:
      'Chaque abonnement donne accès à la même salle privée de signaux VolatilityForge. Il n’y a pas de niveaux VIP cachés, pas de feed premium séparé et pas d’upgrade pour de meilleurs signaux. Seule la durée d’accès change.',

    primaryCta: 'Démarrer la demande',
    secondaryCta: 'Voir la performance',

    membershipKicker: 'Abonnement',
    includedKicker: 'Inclus',
    accessLengthKicker: 'Durée d’accès',
    stripeKicker: 'Stripe préparé',
    environmentKicker: 'Environment',
    accessKicker: 'Accès',

    pricingTitle: 'Options d’abonnement',
    pricingText:
      'La structure de paiement est préparée pour Stripe. Tant que Stripe n’est pas connecté, les boutons envoient les utilisateurs vers la page de demande.',

    includedTitle: 'Chaque abonnement inclut',
    includedText:
      'Le contenu est identique pour tous les membres. Tu ne paies pas pour une meilleure qualité de signaux, mais pour la durée de ton accès.',
    included: [
      'Salle privée de signaux Discord',
      'Signaux crypto LONG et SHORT',
      'Zone d’entrée, invalidation et objectifs',
      'Mises à jour lorsqu’un setup change',
      'Aucun signal lorsque le marché n’est pas assez bon',
      'Le même feed pour tous les membres',
      'Structure de signaux risk-first',
      'Préparé pour paiement Stripe'
    ],

    plansTitle: 'Ce que signifient les durées.',
    plansText:
      'L’option mensuelle est flexible. L’option 6 mois est l’abonnement central. L’option annuelle est destinée aux membres qui veulent suivre VolatilityForge plus longtemps.',
    planCards: [
      {
        title: 'Mensuel',
        text: 'Accès flexible. Adapté si tu veux d’abord découvrir comment fonctionne la salle privée de signaux.'
      },
      {
        title: '6 mois',
        text: 'Option recommandée. Assez de temps pour suivre la salle de signaux sur plusieurs phases de marché.'
      },
      {
        title: 'Annuel',
        text: 'Meilleure valeur pour les membres qui veulent un accès structuré au feed VolatilityForge.'
      }
    ],

    paymentTitle: 'Flux de paiement préparé.',
    paymentText:
      'Le site est préparé pour une intégration Stripe Checkout. Une fois tes Stripe keys et price IDs ajoutés dans Vercel, les boutons de pricing pourront envoyer directement vers le paiement.',
    paymentItems: [
      'Route API Stripe Checkout préparée',
      'Price IDs mensuel, 6 mois et annuel préparés',
      'Route success présente',
      'Route de demande présente comme fallback',
      'Environment variables préparées pour Vercel'
    ],

    envTitle: 'Nécessaire plus tard pour Stripe.',
    envText:
      'Lorsque tu veux activer les paiements en live, ajoute ces environment variables dans Vercel.',
    envVars: [
      'NEXT_PUBLIC_ENABLE_PAYMENTS=true',
      'NEXT_PUBLIC_SITE_URL=https://tondomaine.fr',
      'STRIPE_SECRET_KEY=sk_live_...',
      'STRIPE_PRICE_MONTHLY=price_...',
      'STRIPE_PRICE_SIX_MONTHS=price_...',
      'STRIPE_PRICE_ANNUAL=price_...'
    ],

    riskTitle: 'Explication importante du risque',
    riskText:
      'VolatilityForge ne constitue pas un conseil financier. Le trading comporte des risques. Payer pour accéder à la salle de signaux ne garantit aucun profit. Les résultats réels peuvent différer en raison de l’exécution, du timing, des frais, du slippage, du levier, de la taille de position et des conditions de marché.',

    finalTitle: 'Tu veux demander l’accès ?',
    finalText:
      'Démarre une demande ou consulte d’abord la page performance. La structure de paiement est prête à être connectée directement à Stripe plus tard.',
    finalPrimary: 'Démarrer la demande',
    finalSecondary: 'Voir la performance'
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
    title: locale === 'nl' ? 'Pricing' : copy.badge,
    description: copy.intro
  };
}

export default async function PricingPage({ params }) {
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
            <Link className="primaryButton" href={`/${locale}/apply`}>
              {copy.primaryCta}
            </Link>
            <Link className="secondaryButton" href={`/${locale}/performance`}>
              {copy.secondaryCta}
            </Link>
          </div>
        </div>

        <article className="panel">
          <p className="kicker">{copy.membershipKicker}</p>
          <h2>{copy.pricingTitle}</h2>
          <p className="lead">{copy.pricingText}</p>
        </article>
      </section>

      <section className="section">
        <PricingCards locale={locale} />
      </section>

      <section className="section twoColumnGrid">
        <article className="panel">
          <p className="kicker">{copy.includedKicker}</p>
          <h2>{copy.includedTitle}</h2>
          <p className="lead">{copy.includedText}</p>

          <ul className="checkList">
            {copy.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <p className="kicker">{copy.accessLengthKicker}</p>
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
          <p className="kicker">{copy.stripeKicker}</p>
          <h2>{copy.paymentTitle}</h2>
          <p className="lead">{copy.paymentText}</p>

          <ul className="checkList">
            {copy.paymentItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <p className="kicker">{copy.environmentKicker}</p>
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
          <p className="kicker">{copy.accessKicker}</p>
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