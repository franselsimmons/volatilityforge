import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';

const LOCALES = ['nl', 'en', 'de', 'es', 'fr'];

const COPY = {
  nl: {
    badge: 'Trade System',
    title: 'Een selectieproces vóórdat een signaal de private feed bereikt.',
    intro:
      'VolatilityForge toont publiek niet de volledige interne motor. Dat blijft privé. Wat leden wel moeten begrijpen: signalen worden niet willekeurig geplaatst. Elk signaal moet door een strak proces van richting, setupkwaliteit, risico en uitvoerbaarheid.',

    primaryCta: 'Vraag toegang aan',
    secondaryCta: 'Bekijk signal room',

    selectionKicker: 'Selectie',
    processKicker: 'Proces',
    publicKicker: 'Publiek',
    privateKicker: 'Privé',
    signalOutputKicker: 'Signal output',
    accessKicker: 'Toegang',

    exampleStructureLabel: 'Voorbeeldstructuur',
    exampleStructureTitle: 'Private Discord alert',
    riskFirstLabel: 'Risk-first',

    deskTitle: 'Geen call-spam. Geen geforceerde trades.',
    deskText:
      'Het systeem is gebouwd om zwakke kansen te weigeren. De waarde zit niet in elke dag iets roepen, maar in wachten tot de markt, setup en risicostructuur voldoende samenkomen.',

    principles: [
      {
        title: 'Richting eerst',
        text: 'LONG en SHORT worden apart beoordeeld. Het systeem hoeft niet altijd bullish of bearish te zijn.'
      },
      {
        title: 'Setupkwaliteit',
        text: 'Een trade-idee moet genoeg structuur hebben voordat het als signaal geschikt is.'
      },
      {
        title: 'Risico vóór hype',
        text: 'Een signaal zonder duidelijke invalidatie hoort niet thuis in een serieuze signal room.'
      },
      {
        title: 'Private uitvoering',
        text: 'De details van live signalen blijven binnen de Discord-feed voor leden.'
      }
    ],

    flowTitle: 'Van markt naar signaal.',
    flowText:
      'Het publieke proces is bewust simpel gehouden. Leden hoeven de volledige technische motor niet te kennen om te begrijpen waarom een signaal wel of niet wordt gedeeld.',
    flow: [
      {
        title: '1. Marktcontext',
        text: 'Eerst wordt bekeken of de marktconditie überhaupt geschikt is voor een LONG of SHORT kans.'
      },
      {
        title: '2. Setupfilter',
        text: 'Daarna wordt gekeken of er genoeg structuur is: momentum, locatie, reactie en ruimte tot targets.'
      },
      {
        title: '3. Risicopoort',
        text: 'Een setup moet een duidelijke stop, invalidatie en realistische targets hebben.'
      },
      {
        title: '4. Signal room',
        text: 'Pas daarna wordt het signaal geplaatst met richting, entry-zone, invalidatie, targets en updates.'
      }
    ],

    whatPublicTitle: 'Wat publiek wordt uitgelegd.',
    whatPublicText:
      'De site legt uit hoe het proces werkt zonder interne logica, technische labels of systeemdetails te publiceren. Dat houdt de merkwaarde beschermd.',
    publicItems: [
      'Signalen zijn selectief, niet geforceerd.',
      'LONG en SHORT worden apart behandeld.',
      'Elk signaal heeft een entry-zone, stop en targetlogica.',
      'Geen trade is een geldige uitkomst wanneer de markt niet goed genoeg is.',
      'Alle leden krijgen dezelfde private feed.'
    ],

    whatPrivateTitle: 'Wat privé blijft.',
    whatPrivateText:
      'De interne motor, exacte filters, technische scoring en selectieparameters blijven buiten de publieke website. De klant koopt toegang tot de output, niet tot de volledige interne blauwdruk.',
    privateItems: [
      'Interne modelstructuur',
      'Exacte selectieparameters',
      'Technische scoringdetails',
      'Onderliggende signaalpools',
      'Live Discord-updates'
    ],

    signalTitle: 'Hoe een signaal eruitziet.',
    signalText:
      'De signaalopbouw blijft praktisch. Een lid moet snel kunnen zien wat de richting is, waar de entry ligt, waar de setup ongeldig wordt en welke targets relevant zijn.',
    signalRows: [
      ['Richting', 'LONG of SHORT'],
      ['Market', 'Bijvoorbeeld BTC / USDT'],
      ['Entry-zone', 'Prijszone waarin de setup actief is'],
      ['Invalidatie', 'Het niveau waar de setup ongeldig wordt'],
      ['Targets', 'Meerdere targetzones voor gedeeltelijke of volledige exits'],
      ['Update', 'Aanpassing of sluiting wanneer de markt verandert']
    ],

    riskTitle: 'Risico is onderdeel van het systeem.',
    riskText:
      'VolatilityForge is geen belofte op winst. Trading heeft risico. Het systeem is ontworpen om discipline te ondersteunen, maar werkelijke resultaten blijven afhankelijk van uitvoering, timing, fees, liquiditeit, positieomvang, leverage en marktomstandigheden.',

    finalTitle: 'Wil je de signalen zien zoals leden ze ontvangen?',
    finalText:
      'Bekijk de private signal room-opbouw of start een aanvraag voor toegang.',
    finalPrimary: 'Aanvraag starten',
    finalSecondary: 'Signal room bekijken'
  },

  en: {
    badge: 'Trade System',
    title: 'A selection process before a signal reaches the private feed.',
    intro:
      'VolatilityForge does not publicly expose the full internal engine. That remains private. What members should understand: signals are not posted randomly. Every signal must pass a structured process of direction, setup quality, risk and execution logic.',

    primaryCta: 'Request access',
    secondaryCta: 'View signal room',

    selectionKicker: 'Selection',
    processKicker: 'Process',
    publicKicker: 'Public',
    privateKicker: 'Private',
    signalOutputKicker: 'Signal Output',
    accessKicker: 'Access',

    exampleStructureLabel: 'Example structure',
    exampleStructureTitle: 'Private Discord alert',
    riskFirstLabel: 'Risk-first',

    deskTitle: 'No call spam. No forced trades.',
    deskText:
      'The system is built to reject weak opportunities. The value is not in posting something every day, but in waiting until market, setup and risk structure align.',

    principles: [
      {
        title: 'Direction first',
        text: 'LONG and SHORT conditions are evaluated separately. The system does not need to be permanently bullish or bearish.'
      },
      {
        title: 'Setup quality',
        text: 'A trade idea needs enough structure before it is suitable as a member signal.'
      },
      {
        title: 'Risk before hype',
        text: 'A signal without clear invalidation does not belong in a serious signal room.'
      },
      {
        title: 'Private execution',
        text: 'Live signal details remain inside the member Discord feed.'
      }
    ],

    flowTitle: 'From market to signal.',
    flowText:
      'The public process is intentionally simple. Members do not need to know the full technical engine to understand why a signal is or is not shared.',
    flow: [
      {
        title: '1. Market context',
        text: 'First, the market condition is checked to see whether a LONG or SHORT opportunity is even suitable.'
      },
      {
        title: '2. Setup filter',
        text: 'Then the setup is reviewed for structure: momentum, location, reaction and room toward targets.'
      },
      {
        title: '3. Risk gate',
        text: 'A setup needs a clear stop, invalidation level and realistic target logic.'
      },
      {
        title: '4. Signal room',
        text: 'Only then is the signal posted with direction, entry zone, invalidation, targets and updates.'
      }
    ],

    whatPublicTitle: 'What is explained publicly.',
    whatPublicText:
      'The site explains how the process works without publishing internal logic, technical labels or system details. That keeps the brand value protected.',
    publicItems: [
      'Signals are selective, not forced.',
      'LONG and SHORT are handled separately.',
      'Every signal has an entry zone, stop and target logic.',
      'No trade is a valid outcome when the market is not good enough.',
      'Every member receives the same private feed.'
    ],

    whatPrivateTitle: 'What stays private.',
    whatPrivateText:
      'The internal engine, exact filters, technical scoring and selection parameters stay outside the public website. The client buys access to the output, not the full internal blueprint.',
    privateItems: [
      'Internal model structure',
      'Exact selection parameters',
      'Technical scoring details',
      'Underlying signal pools',
      'Live Discord updates'
    ],

    signalTitle: 'What a signal looks like.',
    signalText:
      'The signal structure stays practical. A member should quickly see the direction, entry zone, invalidation level and relevant targets.',
    signalRows: [
      ['Direction', 'LONG or SHORT'],
      ['Market', 'For example BTC / USDT'],
      ['Entry zone', 'Price zone where the setup is active'],
      ['Invalidation', 'The level where the setup becomes invalid'],
      ['Targets', 'Multiple target zones for partial or full exits'],
      ['Update', 'Adjustment or closure when the market changes']
    ],

    riskTitle: 'Risk is part of the system.',
    riskText:
      'VolatilityForge is not a promise of profit. Trading involves risk. The system is designed to support discipline, but real results still depend on execution, timing, fees, liquidity, position size, leverage and market conditions.',

    finalTitle: 'Want to see signals as members receive them?',
    finalText:
      'View the private signal room structure or start an application for access.',
    finalPrimary: 'Start application',
    finalSecondary: 'View signal room'
  },

  de: {
    badge: 'Trade System',
    title: 'Ein Auswahlprozess, bevor ein Signal den privaten Feed erreicht.',
    intro:
      'VolatilityForge veröffentlicht die vollständige interne Engine nicht öffentlich. Sie bleibt privat. Was Mitglieder verstehen sollten: Signale werden nicht zufällig gepostet. Jedes Signal muss einen strukturierten Prozess aus Richtung, Setupqualität, Risiko und Ausführbarkeit durchlaufen.',

    primaryCta: 'Zugang anfragen',
    secondaryCta: 'Signal Room ansehen',

    selectionKicker: 'Auswahl',
    processKicker: 'Prozess',
    publicKicker: 'Öffentlich',
    privateKicker: 'Privat',
    signalOutputKicker: 'Signal Output',
    accessKicker: 'Zugang',

    exampleStructureLabel: 'Beispielstruktur',
    exampleStructureTitle: 'Private Discord Alert',
    riskFirstLabel: 'Risk-first',

    deskTitle: 'Kein Call-Spam. Keine erzwungenen Trades.',
    deskText:
      'Das System ist darauf ausgelegt, schwache Chancen abzulehnen. Der Wert liegt nicht darin, jeden Tag irgendetwas zu posten, sondern zu warten, bis Markt, Setup und Risikostruktur ausreichend zusammenpassen.',

    principles: [
      {
        title: 'Richtung zuerst',
        text: 'LONG und SHORT werden getrennt bewertet. Das System muss nicht dauerhaft bullish oder bearish sein.'
      },
      {
        title: 'Setupqualität',
        text: 'Eine Trade-Idee benötigt genügend Struktur, bevor sie als Signal für Mitglieder geeignet ist.'
      },
      {
        title: 'Risiko vor Hype',
        text: 'Ein Signal ohne klare Invalidierung gehört nicht in einen seriösen Signalraum.'
      },
      {
        title: 'Private Ausführung',
        text: 'Die Details von Live-Signalen bleiben im Discord-Feed für Mitglieder.'
      }
    ],

    flowTitle: 'Vom Markt zum Signal.',
    flowText:
      'Der öffentliche Prozess ist bewusst einfach gehalten. Mitglieder müssen die vollständige technische Engine nicht kennen, um zu verstehen, warum ein Signal geteilt wird oder nicht.',
    flow: [
      {
        title: '1. Marktkontext',
        text: 'Zuerst wird geprüft, ob die Marktbedingung überhaupt für eine LONG- oder SHORT-Chance geeignet ist.'
      },
      {
        title: '2. Setupfilter',
        text: 'Danach wird geprüft, ob genügend Struktur vorhanden ist: Momentum, Lage, Reaktion und Raum bis zu den Targets.'
      },
      {
        title: '3. Risikotor',
        text: 'Ein Setup benötigt einen klaren Stop, eine Invalidierung und realistische Targets.'
      },
      {
        title: '4. Signal Room',
        text: 'Erst danach wird das Signal mit Richtung, Entry-Zone, Invalidierung, Targets und Updates gepostet.'
      }
    ],

    whatPublicTitle: 'Was öffentlich erklärt wird.',
    whatPublicText:
      'Die Website erklärt, wie der Prozess funktioniert, ohne interne Logik, technische Labels oder Systemdetails zu veröffentlichen. So bleibt der Markenwert geschützt.',
    publicItems: [
      'Signale sind selektiv, nicht erzwungen.',
      'LONG und SHORT werden getrennt behandelt.',
      'Jedes Signal hat eine Entry-Zone, Stop- und Targetlogik.',
      'Kein Trade ist ein gültiges Ergebnis, wenn der Markt nicht gut genug ist.',
      'Alle Mitglieder erhalten denselben privaten Feed.'
    ],

    whatPrivateTitle: 'Was privat bleibt.',
    whatPrivateText:
      'Die interne Engine, exakte Filter, technisches Scoring und Auswahlparameter bleiben außerhalb der öffentlichen Website. Der Kunde kauft Zugang zum Output, nicht zur vollständigen internen Blaupause.',
    privateItems: [
      'Interne Modellstruktur',
      'Exakte Auswahlparameter',
      'Technische Scoringdetails',
      'Zugrunde liegende Signalpools',
      'Live Discord Updates'
    ],

    signalTitle: 'Wie ein Signal aussieht.',
    signalText:
      'Die Signalstruktur bleibt praktisch. Ein Mitglied sollte schnell erkennen können, welche Richtung gilt, wo die Entry liegt, wo das Setup ungültig wird und welche Targets relevant sind.',
    signalRows: [
      ['Richtung', 'LONG oder SHORT'],
      ['Market', 'Zum Beispiel BTC / USDT'],
      ['Entry-Zone', 'Preiszone, in der das Setup aktiv ist'],
      ['Invalidierung', 'Das Level, an dem das Setup ungültig wird'],
      ['Targets', 'Mehrere Targetzonen für teilweise oder vollständige Exits'],
      ['Update', 'Anpassung oder Schließung, wenn sich der Markt verändert']
    ],

    riskTitle: 'Risiko ist Teil des Systems.',
    riskText:
      'VolatilityForge ist kein Gewinnversprechen. Trading beinhaltet Risiko. Das System ist darauf ausgelegt, Disziplin zu unterstützen, aber reale Ergebnisse hängen weiterhin von Ausführung, Timing, Gebühren, Liquidität, Positionsgröße, Leverage und Marktbedingungen ab.',

    finalTitle: 'Möchtest du die Signale so sehen, wie Mitglieder sie erhalten?',
    finalText:
      'Sieh dir den Aufbau des privaten Signalraums an oder starte eine Anfrage für Zugang.',
    finalPrimary: 'Anfrage starten',
    finalSecondary: 'Signal Room ansehen'
  },

  es: {
    badge: 'Sistema de trading',
    title: 'Un proceso de selección antes de que una señal llegue al feed privado.',
    intro:
      'VolatilityForge no expone públicamente toda la engine interna. Eso permanece privado. Lo que los miembros deben entender: las señales no se publican al azar. Cada señal debe pasar por un proceso estructurado de dirección, calidad del setup, riesgo y lógica de ejecución.',

    primaryCta: 'Solicitar acceso',
    secondaryCta: 'Ver sala de señales',

    selectionKicker: 'Selección',
    processKicker: 'Proceso',
    publicKicker: 'Público',
    privateKicker: 'Privado',
    signalOutputKicker: 'Salida de señal',
    accessKicker: 'Acceso',

    exampleStructureLabel: 'Estructura de ejemplo',
    exampleStructureTitle: 'Alerta privada de Discord',
    riskFirstLabel: 'Risk-first',

    deskTitle: 'Sin spam de calls. Sin trades forzados.',
    deskText:
      'El sistema está diseñado para rechazar oportunidades débiles. El valor no está en publicar algo todos los días, sino en esperar hasta que mercado, setup y estructura de riesgo estén alineados.',

    principles: [
      {
        title: 'Dirección primero',
        text: 'LONG y SHORT se evalúan por separado. El sistema no necesita estar siempre bullish o bearish.'
      },
      {
        title: 'Calidad del setup',
        text: 'Una idea de trade necesita suficiente estructura antes de ser adecuada como señal para miembros.'
      },
      {
        title: 'Riesgo antes que hype',
        text: 'Una señal sin invalidación clara no pertenece a una sala de señales seria.'
      },
      {
        title: 'Ejecución privada',
        text: 'Los detalles de señales live permanecen dentro del feed de Discord para miembros.'
      }
    ],

    flowTitle: 'Del mercado a la señal.',
    flowText:
      'El proceso público se mantiene intencionalmente simple. Los miembros no necesitan conocer toda la engine técnica para entender por qué una señal se comparte o no.',
    flow: [
      {
        title: '1. Contexto de mercado',
        text: 'Primero se comprueba si la condición del mercado es adecuada para una oportunidad LONG o SHORT.'
      },
      {
        title: '2. Filtro de setup',
        text: 'Después se revisa si hay suficiente estructura: momentum, ubicación, reacción y espacio hacia los objetivos.'
      },
      {
        title: '3. Puerta de riesgo',
        text: 'Un setup necesita stop claro, nivel de invalidación y lógica de objetivos realista.'
      },
      {
        title: '4. Sala de señales',
        text: 'Solo entonces se publica la señal con dirección, zona de entrada, invalidación, objetivos y actualizaciones.'
      }
    ],

    whatPublicTitle: 'Qué se explica públicamente.',
    whatPublicText:
      'El sitio explica cómo funciona el proceso sin publicar lógica interna, etiquetas técnicas ni detalles del sistema. Eso mantiene protegido el valor de la marca.',
    publicItems: [
      'Las señales son selectivas, no forzadas.',
      'LONG y SHORT se tratan por separado.',
      'Cada señal tiene zona de entrada, stop y lógica de objetivos.',
      'No operar es un resultado válido cuando el mercado no es suficientemente bueno.',
      'Todos los miembros reciben el mismo feed privado.'
    ],

    whatPrivateTitle: 'Qué permanece privado.',
    whatPrivateText:
      'La engine interna, filtros exactos, scoring técnico y parámetros de selección quedan fuera del sitio público. El cliente compra acceso al output, no al blueprint interno completo.',
    privateItems: [
      'Estructura interna del modelo',
      'Parámetros exactos de selección',
      'Detalles de scoring técnico',
      'Pools de señales subyacentes',
      'Actualizaciones live de Discord'
    ],

    signalTitle: 'Cómo se ve una señal.',
    signalText:
      'La estructura de señal sigue siendo práctica. Un miembro debe ver rápido la dirección, dónde está la entrada, dónde se invalida el setup y qué objetivos son relevantes.',
    signalRows: [
      ['Dirección', 'LONG o SHORT'],
      ['Market', 'Por ejemplo BTC / USDT'],
      ['Zona de entrada', 'Zona de precio donde el setup está activo'],
      ['Invalidación', 'El nivel donde el setup deja de ser válido'],
      ['Objetivos', 'Múltiples zonas objetivo para salidas parciales o completas'],
      ['Actualización', 'Ajuste o cierre cuando el mercado cambia']
    ],

    riskTitle: 'El riesgo forma parte del sistema.',
    riskText:
      'VolatilityForge no es una promesa de beneficio. El trading implica riesgo. El sistema está diseñado para apoyar la disciplina, pero los resultados reales siguen dependiendo de ejecución, timing, comisiones, liquidez, tamaño de posición, apalancamiento y condiciones de mercado.',

    finalTitle: '¿Quieres ver las señales como las reciben los miembros?',
    finalText:
      'Consulta la estructura de la sala privada de señales o inicia una solicitud de acceso.',
    finalPrimary: 'Iniciar solicitud',
    finalSecondary: 'Ver sala de señales'
  },

  fr: {
    badge: 'Système de trading',
    title: 'Un processus de sélection avant qu’un signal atteigne le feed privé.',
    intro:
      'VolatilityForge n’expose pas publiquement toute l’engine interne. Elle reste privée. Ce que les membres doivent comprendre : les signaux ne sont pas publiés au hasard. Chaque signal doit passer par un processus structuré de direction, qualité du setup, risque et logique d’exécution.',

    primaryCta: 'Demander l’accès',
    secondaryCta: 'Voir la salle de signaux',

    selectionKicker: 'Sélection',
    processKicker: 'Processus',
    publicKicker: 'Public',
    privateKicker: 'Privé',
    signalOutputKicker: 'Signal output',
    accessKicker: 'Accès',

    exampleStructureLabel: 'Structure exemple',
    exampleStructureTitle: 'Alerte Discord privée',
    riskFirstLabel: 'Risk-first',

    deskTitle: 'Pas de spam de calls. Pas de trades forcés.',
    deskText:
      'Le système est conçu pour rejeter les opportunités faibles. La valeur ne réside pas dans le fait de publier quelque chose chaque jour, mais dans l’attente que marché, setup et structure de risque soient alignés.',

    principles: [
      {
        title: 'Direction d’abord',
        text: 'LONG et SHORT sont évalués séparément. Le système n’a pas besoin d’être en permanence bullish ou bearish.'
      },
      {
        title: 'Qualité du setup',
        text: 'Une idée de trade doit avoir assez de structure avant d’être adaptée comme signal membre.'
      },
      {
        title: 'Risque avant hype',
        text: 'Un signal sans invalidation claire n’a pas sa place dans une salle de signaux sérieuse.'
      },
      {
        title: 'Exécution privée',
        text: 'Les détails des signaux live restent dans le feed Discord réservé aux membres.'
      }
    ],

    flowTitle: 'Du marché au signal.',
    flowText:
      'Le processus public est volontairement simple. Les membres n’ont pas besoin de connaître toute l’engine technique pour comprendre pourquoi un signal est partagé ou non.',
    flow: [
      {
        title: '1. Contexte de marché',
        text: 'On vérifie d’abord si la condition du marché convient à une opportunité LONG ou SHORT.'
      },
      {
        title: '2. Filtre de setup',
        text: 'Ensuite, le setup est évalué selon sa structure : momentum, emplacement, réaction et espace vers les objectifs.'
      },
      {
        title: '3. Porte de risque',
        text: 'Un setup doit avoir un stop clair, un niveau d’invalidation et une logique d’objectifs réaliste.'
      },
      {
        title: '4. Salle de signaux',
        text: 'Ce n’est qu’ensuite que le signal est publié avec direction, zone d’entrée, invalidation, objectifs et mises à jour.'
      }
    ],

    whatPublicTitle: 'Ce qui est expliqué publiquement.',
    whatPublicText:
      'Le site explique comment fonctionne le processus sans publier la logique interne, les labels techniques ou les détails du système. Cela protège la valeur de la marque.',
    publicItems: [
      'Les signaux sont sélectifs, pas forcés.',
      'LONG et SHORT sont traités séparément.',
      'Chaque signal a une zone d’entrée, un stop et une logique d’objectifs.',
      'Ne pas trader est un résultat valide lorsque le marché n’est pas assez bon.',
      'Tous les membres reçoivent le même feed privé.'
    ],

    whatPrivateTitle: 'Ce qui reste privé.',
    whatPrivateText:
      'L’engine interne, les filtres exacts, le scoring technique et les paramètres de sélection restent hors du site public. Le client achète l’accès à l’output, pas au blueprint interne complet.',
    privateItems: [
      'Structure interne du modèle',
      'Paramètres exacts de sélection',
      'Détails de scoring technique',
      'Pools de signaux sous-jacents',
      'Mises à jour live Discord'
    ],

    signalTitle: 'À quoi ressemble un signal.',
    signalText:
      'La structure du signal reste pratique. Un membre doit voir rapidement la direction, où se trouve l’entrée, où le setup devient invalide et quels objectifs sont pertinents.',
    signalRows: [
      ['Direction', 'LONG ou SHORT'],
      ['Market', 'Par exemple BTC / USDT'],
      ['Zone d’entrée', 'Zone de prix où le setup est actif'],
      ['Invalidation', 'Le niveau où le setup devient invalide'],
      ['Objectifs', 'Plusieurs zones d’objectifs pour sorties partielles ou complètes'],
      ['Mise à jour', 'Ajustement ou clôture lorsque le marché change']
    ],

    riskTitle: 'Le risque fait partie du système.',
    riskText:
      'VolatilityForge n’est pas une promesse de profit. Le trading comporte des risques. Le système est conçu pour soutenir la discipline, mais les résultats réels dépendent toujours de l’exécution, du timing, des frais, de la liquidité, de la taille de position, du levier et des conditions de marché.',

    finalTitle: 'Tu veux voir les signaux comme les membres les reçoivent ?',
    finalText:
      'Consulte la structure de la salle privée de signaux ou démarre une demande d’accès.',
    finalPrimary: 'Démarrer la demande',
    finalSecondary: 'Voir la salle de signaux'
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
    title: locale === 'nl' ? 'Trade System' : copy.badge,
    description: copy.intro
  };
}

export default async function SystemPage({ params }) {
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
            <Link className="secondaryButton" href={`/${locale}/signal-room`}>
              {copy.secondaryCta}
            </Link>
          </div>
        </div>

        <article className="panel">
          <p className="kicker">{copy.selectionKicker}</p>
          <h2>{copy.deskTitle}</h2>
          <p className="lead">{copy.deskText}</p>
        </article>
      </section>

      <section className="section">
        <div className="fourColumnGrid">
          {copy.principles.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="center narrow">
          <p className="kicker">{copy.processKicker}</p>
          <h2>{copy.flowTitle}</h2>
          <p>{copy.flowText}</p>
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
          <p className="kicker">{copy.publicKicker}</p>
          <h2>{copy.whatPublicTitle}</h2>
          <p className="lead">{copy.whatPublicText}</p>

          <ul className="checkList">
            {copy.publicItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <p className="kicker">{copy.privateKicker}</p>
          <h2>{copy.whatPrivateTitle}</h2>
          <p className="lead">{copy.whatPrivateText}</p>

          <ul className="checkList">
            {copy.privateItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section twoColumnGrid">
        <article className="panel">
          <p className="kicker">{copy.signalOutputKicker}</p>
          <h2>{copy.signalTitle}</h2>
          <p className="lead">{copy.signalText}</p>
        </article>

        <article className="signalCard">
          <div className="signalHeader">
            <div>
              <span>{copy.exampleStructureLabel}</span>
              <strong>{copy.exampleStructureTitle}</strong>
            </div>
            <em>{copy.riskFirstLabel}</em>
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
            <Link className="secondaryButton" href={`/${locale}/signal-room`}>
              {copy.finalSecondary}
            </Link>
          </div>
        </article>
      </section>
    </SiteShell>
  );
}