import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';

const LOCALES = ['nl', 'en', 'de', 'es', 'fr'];

const COPY = {
  nl: {
    badge: 'Signal Room',
    title: 'De private Discord-feed waar LONG & SHORT signalen binnenkomen.',
    intro:
      'De VolatilityForge signal room is gebouwd om signalen overzichtelijk, snel en zonder ruis te leveren. Leden krijgen geen losse hype-calls, maar gestructureerde signalen met richting, entry-zone, invalidatie, targets en updates.',

    primaryCta: 'Vraag toegang aan',
    secondaryCta: 'Bekijk pricing',

    privateFeedKicker: 'Private Feed',
    signalStructureKicker: 'Signal structuur',
    memberViewKicker: 'Member view',
    privateKicker: 'Privé',
    discordFlowKicker: 'Discord flow',
    disciplineKicker: 'Discipline',
    accessKicker: 'Toegang',

    exampleSignalLabel: 'Voorbeeldsignaal',
    exampleSignalTitle: 'Private Discord alert',
    riskFirstLabel: 'Risk-first',

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
        title: '1. Signal geplaatst',
        text: 'De setup wordt geplaatst met market, richting, entry-zone, invalidatie en targets.'
      },
      {
        title: '2. Member controleert risico',
        text: 'Het lid bepaalt zelf positieomvang, risico en uitvoering. VolatilityForge geeft geen persoonlijk financieel advies.'
      },
      {
        title: '3. Setup ontwikkelt',
        text: 'Wanneer de markt beweegt, kan de signal room updates of waarschuwingen geven.'
      },
      {
        title: '4. Signal gesloten of geïnvalideerd',
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

    privateFeedKicker: 'Private Feed',
    signalStructureKicker: 'Signal Structure',
    memberViewKicker: 'Member View',
    privateKicker: 'Private',
    discordFlowKicker: 'Discord Flow',
    disciplineKicker: 'Discipline',
    accessKicker: 'Access',

    exampleSignalLabel: 'Example signal',
    exampleSignalTitle: 'Private Discord alert',
    riskFirstLabel: 'Risk-first',

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
  },

  de: {
    badge: 'Signal Room',
    title: 'Der private Discord-Feed, in dem LONG- und SHORT-Signale eingehen.',
    intro:
      'Der VolatilityForge Signalraum ist darauf ausgelegt, Signale klar, schnell und ohne Rauschen zu liefern. Mitglieder erhalten keine zufälligen Hype-Calls, sondern strukturierte Signale mit Richtung, Entry-Zone, Invalidierung, Targets und Updates.',

    primaryCta: 'Zugang anfragen',
    secondaryCta: 'Preise ansehen',

    privateFeedKicker: 'Privater Feed',
    signalStructureKicker: 'Signalstruktur',
    memberViewKicker: 'Member View',
    privateKicker: 'Privat',
    discordFlowKicker: 'Discord Flow',
    disciplineKicker: 'Disziplin',
    accessKicker: 'Zugang',

    exampleSignalLabel: 'Beispielsignal',
    exampleSignalTitle: 'Private Discord Alert',
    riskFirstLabel: 'Risk-first',

    roomTitle: 'Ein privater Feed. Ein Standard.',
    roomText:
      'Alle Mitglieder erhalten denselben Signalraum. Es gibt keine versteckten VIP-Stufen, keinen separaten Premium-Feed und kein Upgrade für bessere Signale. Der einzige Unterschied ist die gewählte Laufzeit der Mitgliedschaft.',

    roomCards: [
      {
        title: 'Privater Discord',
        text: 'Zugang zu einer geschlossenen Discord-Umgebung für Mitglieder.'
      },
      {
        title: 'LONG & SHORT',
        text: 'Signale können mit oder gegen die Marktrichtung arbeiten, wenn das Setup stark genug ist.'
      },
      {
        title: 'Kein Call-Spam',
        text: 'Keine erzwungene Anzahl von Signalen pro Tag. Schwache Setups werden abgelehnt.'
      },
      {
        title: 'Updates',
        text: 'Wenn sich ein Setup verändert, kann der Feed Updates, Schließungen oder Invalidierungen teilen.'
      }
    ],

    signalTitle: 'Wie ein Signal aufgebaut ist.',
    signalText:
      'Ein Signal sollte direkt verständlich und ausführbar sein. Der Feed zeigt deshalb nicht nur die Richtung, sondern auch die Risikostruktur darum herum.',
    signalRows: [
      ['Richtung', 'SHORT'],
      ['Market', 'BTC / USDT'],
      ['Entry-Zone', '67,850 – 68,120'],
      ['Invalidierung', '68,740'],
      ['Targets', '67,100 / 66,420 / 65,800'],
      ['Risk Mode', 'Festes Risiko pro Signal']
    ],

    updateTitle: 'Was Mitglieder erwarten können.',
    updateText:
      'Der Signalraum ist für praktische Ausführung gedacht. Die Struktur bleibt konsistent, damit Mitglieder nicht nach dem Kern eines Signals suchen müssen.',
    updateItems: [
      'Neue Signale mit klarer Richtung',
      'Entry-Zone statt vager Preisangabe',
      'Invalidierungsniveau für Risikomanagement',
      'Mehrere Targetzonen',
      'Updates, wenn sich der Markt verändert',
      'Kein Signal, wenn das Setup nicht stark genug ist'
    ],

    privateTitle: 'Was innerhalb des Raums privat bleibt.',
    privateText:
      'Live-Signale, Updates und Ausführungskontext bleiben innerhalb der Member-Umgebung. Die öffentliche Website zeigt nur eine Beispielstruktur.',
    privateItems: [
      'Live Entries',
      'Aktive Signal-Updates',
      'Setupänderungen',
      'Trade Management',
      'Member-only Kontext'
    ],

    exampleTitle: 'Beispiel-Flow in Discord.',
    exampleText:
      'Ein Mitglied sieht zuerst Richtung und Setup, danach die Risikostruktur und anschließend mögliche Updates, wenn sich der Markt bewegt.',
    flow: [
      {
        title: '1. Signal gepostet',
        text: 'Das Setup wird mit Market, Richtung, Entry-Zone, Invalidierung und Targets gepostet.'
      },
      {
        title: '2. Mitglied prüft Risiko',
        text: 'Das Mitglied entscheidet selbst über Positionsgröße, Risiko und Ausführung. VolatilityForge bietet keine persönliche Finanzberatung.'
      },
      {
        title: '3. Setup entwickelt sich',
        text: 'Wenn sich der Markt bewegt, kann der Signalraum Updates oder Warnungen geben.'
      },
      {
        title: '4. Signal geschlossen oder invalidiert',
        text: 'Ein Signal endet durch Target, Stop, Invalidierung oder manuelles Update.'
      }
    ],

    disciplineTitle: 'Warum der Raum selektiv bleibt.',
    disciplineText:
      'Die Stärke eines Signalraums liegt nicht im Volumen. Einen schwachen Call zu vermeiden ist oft wertvoller, als nur Aktivität zu zeigen.',
    disciplineCards: [
      {
        title: 'Keine Forced Trades',
        text: 'Wenn der Markt nicht gut genug ist, sollte es kein Signal geben.'
      },
      {
        title: 'Risk-first',
        text: 'Ein Setup ohne klare Invalidierung gehört nicht in den Feed.'
      },
      {
        title: 'Derselbe Feed für alle',
        text: 'Alle Mitglieder erhalten dieselben Informationen auf demselben Niveau.'
      }
    ],

    riskTitle: 'Wichtige Risikoerklärung',
    riskText:
      'VolatilityForge ist keine Finanzberatung. Mitglieder bleiben selbst verantwortlich für Positionsgröße, Ausführung, Leverage, Timing und Risikomanagement. Trading beinhaltet Risiko und Verluste sind möglich.',

    finalTitle: 'Möchtest du Zugang zum privaten Signalraum?',
    finalText:
      'Starte eine Anfrage oder sieh dir zuerst die Mitgliedschaften an. Der Zahlungsflow ist vorbereitet, damit Stripe später verbunden werden kann.',
    finalPrimary: 'Anfrage starten',
    finalSecondary: 'Preise ansehen'
  },

  es: {
    badge: 'Sala de señales',
    title: 'El feed privado de Discord donde llegan señales LONG & SHORT.',
    intro:
      'La sala de señales de VolatilityForge está creada para entregar señales de forma clara, rápida y sin ruido. Los miembros no reciben llamadas de hype aleatorias, sino señales estructuradas con dirección, zona de entrada, invalidación, objetivos y actualizaciones.',

    primaryCta: 'Solicitar acceso',
    secondaryCta: 'Ver precios',

    privateFeedKicker: 'Feed privado',
    signalStructureKicker: 'Estructura de señal',
    memberViewKicker: 'Vista del miembro',
    privateKicker: 'Privado',
    discordFlowKicker: 'Flujo Discord',
    disciplineKicker: 'Disciplina',
    accessKicker: 'Acceso',

    exampleSignalLabel: 'Señal de ejemplo',
    exampleSignalTitle: 'Alerta privada de Discord',
    riskFirstLabel: 'Risk-first',

    roomTitle: 'Un feed privado. Un estándar.',
    roomText:
      'Todos los miembros reciben la misma sala de señales. No hay niveles VIP ocultos, no hay feed premium separado y no hay upgrade para mejores señales. La única diferencia es la duración elegida de la membresía.',

    roomCards: [
      {
        title: 'Discord privado',
        text: 'Acceso a un entorno cerrado de Discord para miembros.'
      },
      {
        title: 'LONG & SHORT',
        text: 'Las señales pueden trabajar a favor o en contra de la dirección del mercado cuando el setup es suficientemente fuerte.'
      },
      {
        title: 'Sin spam de calls',
        text: 'No hay número forzado de señales por día. Los setups débiles se rechazan.'
      },
      {
        title: 'Actualizaciones',
        text: 'Cuando un setup cambia, el feed puede compartir actualizaciones, cierres o invalidación.'
      }
    ],

    signalTitle: 'Cómo se estructura una señal.',
    signalText:
      'Una señal debe ser directamente comprensible y ejecutable. Por eso el feed muestra no solo dirección, sino también la estructura de riesgo alrededor.',
    signalRows: [
      ['Dirección', 'SHORT'],
      ['Market', 'BTC / USDT'],
      ['Zona de entrada', '67,850 – 68,120'],
      ['Invalidación', '68,740'],
      ['Objetivos', '67,100 / 66,420 / 65,800'],
      ['Modo de riesgo', 'Riesgo fijo por señal']
    ],

    updateTitle: 'Qué pueden esperar los miembros.',
    updateText:
      'La sala de señales está diseñada para ejecución práctica. La estructura se mantiene consistente para que los miembros no tengan que buscar el núcleo de una señal.',
    updateItems: [
      'Nuevas señales con dirección clara',
      'Zona de entrada en lugar de indicación vaga de precio',
      'Nivel de invalidación para gestión de riesgo',
      'Múltiples zonas objetivo',
      'Actualizaciones cuando cambia el mercado',
      'Sin señal cuando el setup no es suficientemente fuerte'
    ],

    privateTitle: 'Qué permanece privado dentro de la sala.',
    privateText:
      'Las señales live, actualizaciones y contexto de ejecución permanecen dentro del entorno de miembros. El sitio público solo muestra estructura de ejemplo.',
    privateItems: [
      'Entradas live',
      'Actualizaciones activas de señales',
      'Cambios de setup',
      'Trade management',
      'Contexto solo para miembros'
    ],

    exampleTitle: 'Flujo de ejemplo en Discord.',
    exampleText:
      'Un miembro ve primero la dirección y el setup, luego la estructura de riesgo y después posibles actualizaciones cuando el mercado se mueve.',
    flow: [
      {
        title: '1. Señal publicada',
        text: 'El setup se publica con mercado, dirección, zona de entrada, invalidación y objetivos.'
      },
      {
        title: '2. El miembro revisa el riesgo',
        text: 'El miembro decide tamaño de posición, riesgo y ejecución. VolatilityForge no ofrece asesoramiento financiero personal.'
      },
      {
        title: '3. El setup se desarrolla',
        text: 'Cuando el mercado se mueve, la sala de señales puede proporcionar actualizaciones o advertencias.'
      },
      {
        title: '4. Señal cerrada o invalidada',
        text: 'Una señal termina por objetivo, stop, invalidación o actualización manual.'
      }
    ],

    disciplineTitle: 'Por qué la sala sigue siendo selectiva.',
    disciplineText:
      'La fuerza de una sala de señales no está en el volumen. Evitar una call débil suele ser más valioso que publicar una señal solo para mostrar actividad.',
    disciplineCards: [
      {
        title: 'Sin trades forzados',
        text: 'Cuando el mercado no es suficientemente bueno, no debería haber señal.'
      },
      {
        title: 'Risk-first',
        text: 'Un setup sin invalidación clara no pertenece al feed.'
      },
      {
        title: 'El mismo feed para todos',
        text: 'Todos los miembros reciben la misma información al mismo nivel.'
      }
    ],

    riskTitle: 'Explicación importante de riesgo',
    riskText:
      'VolatilityForge no es asesoramiento financiero. Los miembros siguen siendo responsables del tamaño de posición, ejecución, apalancamiento, timing y gestión de riesgo. El trading implica riesgo y las pérdidas son posibles.',

    finalTitle: '¿Quieres acceso a la sala privada de señales?',
    finalText:
      'Inicia una solicitud o revisa primero las membresías. El flujo de pago está preparado para que Stripe pueda conectarse más adelante.',
    finalPrimary: 'Iniciar solicitud',
    finalSecondary: 'Ver precios'
  },

  fr: {
    badge: 'Salle de signaux',
    title: 'Le feed Discord privé où arrivent les signaux LONG & SHORT.',
    intro:
      'La salle de signaux VolatilityForge est conçue pour livrer des signaux clairement, rapidement et sans bruit. Les membres ne reçoivent pas des calls de hype aléatoires, mais des signaux structurés avec direction, zone d’entrée, invalidation, objectifs et mises à jour.',

    primaryCta: 'Demander l’accès',
    secondaryCta: 'Voir les tarifs',

    privateFeedKicker: 'Feed privé',
    signalStructureKicker: 'Structure du signal',
    memberViewKicker: 'Vue membre',
    privateKicker: 'Privé',
    discordFlowKicker: 'Flow Discord',
    disciplineKicker: 'Discipline',
    accessKicker: 'Accès',

    exampleSignalLabel: 'Signal exemple',
    exampleSignalTitle: 'Alerte Discord privée',
    riskFirstLabel: 'Risk-first',

    roomTitle: 'Un feed privé. Un standard.',
    roomText:
      'Tous les membres reçoivent la même salle de signaux. Il n’y a pas de niveaux VIP cachés, pas de feed premium séparé et pas d’upgrade pour de meilleurs signaux. La seule différence est la durée choisie de l’abonnement.',

    roomCards: [
      {
        title: 'Discord privé',
        text: 'Accès à un environnement Discord fermé pour les membres.'
      },
      {
        title: 'LONG & SHORT',
        text: 'Les signaux peuvent travailler avec ou contre la direction du marché lorsque le setup est assez fort.'
      },
      {
        title: 'Pas de spam de calls',
        text: 'Aucun nombre forcé de signaux par jour. Les setups faibles sont rejetés.'
      },
      {
        title: 'Mises à jour',
        text: 'Lorsqu’un setup change, le feed peut partager des mises à jour, clôtures ou invalidations.'
      }
    ],

    signalTitle: 'Comment un signal est structuré.',
    signalText:
      'Un signal doit être directement compréhensible et exécutable. Le feed montre donc non seulement la direction, mais aussi la structure de risque autour.',
    signalRows: [
      ['Direction', 'SHORT'],
      ['Market', 'BTC / USDT'],
      ['Zone d’entrée', '67,850 – 68,120'],
      ['Invalidation', '68,740'],
      ['Objectifs', '67,100 / 66,420 / 65,800'],
      ['Mode risque', 'Risque fixe par signal']
    ],

    updateTitle: 'Ce que les membres peuvent attendre.',
    updateText:
      'La salle de signaux est conçue pour une exécution pratique. La structure reste cohérente afin que les membres n’aient pas à chercher le cœur d’un signal.',
    updateItems: [
      'Nouveaux signaux avec direction claire',
      'Zone d’entrée au lieu d’une indication de prix vague',
      'Niveau d’invalidation pour la gestion du risque',
      'Plusieurs zones d’objectifs',
      'Mises à jour lorsque le marché change',
      'Aucun signal lorsque le setup n’est pas assez fort'
    ],

    privateTitle: 'Ce qui reste privé dans la salle.',
    privateText:
      'Les signaux live, les mises à jour et le contexte d’exécution restent dans l’environnement membre. Le site public montre seulement une structure d’exemple.',
    privateItems: [
      'Entrées live',
      'Mises à jour actives des signaux',
      'Changements de setup',
      'Trade management',
      'Contexte réservé aux membres'
    ],

    exampleTitle: 'Flow exemple dans Discord.',
    exampleText:
      'Un membre voit d’abord la direction et le setup, puis la structure de risque, puis les éventuelles mises à jour lorsque le marché bouge.',
    flow: [
      {
        title: '1. Signal publié',
        text: 'Le setup est publié avec marché, direction, zone d’entrée, invalidation et objectifs.'
      },
      {
        title: '2. Le membre vérifie le risque',
        text: 'Le membre décide lui-même de la taille de position, du risque et de l’exécution. VolatilityForge ne fournit pas de conseil financier personnel.'
      },
      {
        title: '3. Le setup évolue',
        text: 'Lorsque le marché bouge, la salle de signaux peut fournir des mises à jour ou avertissements.'
      },
      {
        title: '4. Signal clôturé ou invalidé',
        text: 'Un signal se termine par objectif, stop, invalidation ou mise à jour manuelle.'
      }
    ],

    disciplineTitle: 'Pourquoi la salle reste sélective.',
    disciplineText:
      'La force d’une salle de signaux n’est pas le volume. Éviter un call faible est souvent plus précieux que publier un signal juste pour montrer de l’activité.',
    disciplineCards: [
      {
        title: 'Pas de trades forcés',
        text: 'Lorsque le marché n’est pas assez bon, il ne devrait pas y avoir de signal.'
      },
      {
        title: 'Risk-first',
        text: 'Un setup sans invalidation claire n’a pas sa place dans le feed.'
      },
      {
        title: 'Même feed pour tous',
        text: 'Tous les membres reçoivent la même information au même niveau.'
      }
    ],

    riskTitle: 'Explication importante du risque',
    riskText:
      'VolatilityForge ne constitue pas un conseil financier. Les membres restent responsables de la taille de position, de l’exécution, du levier, du timing et de la gestion du risque. Le trading comporte des risques et des pertes sont possibles.',

    finalTitle: 'Tu veux accéder à la salle privée de signaux ?',
    finalText:
      'Démarre une demande ou consulte d’abord les abonnements. Le flow de paiement est préparé afin que Stripe puisse être connecté plus tard.',
    finalPrimary: 'Démarrer la demande',
    finalSecondary: 'Voir les tarifs'
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
    title: locale === 'nl' ? 'Signal Room' : copy.badge,
    description: copy.intro
  };
}

export default async function SignalRoomPage({ params }) {
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
            <Link className="secondaryButton" href={`/${locale}/pricing`}>
              {copy.secondaryCta}
            </Link>
          </div>
        </div>

        <article className="panel">
          <p className="kicker">{copy.privateFeedKicker}</p>
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
          <p className="kicker">{copy.signalStructureKicker}</p>
          <h2>{copy.signalTitle}</h2>
          <p className="lead">{copy.signalText}</p>
        </article>

        <article className="signalCard">
          <div className="signalHeader">
            <div>
              <span>{copy.exampleSignalLabel}</span>
              <strong>{copy.exampleSignalTitle}</strong>
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

      <section className="section twoColumnGrid">
        <article className="panel">
          <p className="kicker">{copy.memberViewKicker}</p>
          <h2>{copy.updateTitle}</h2>
          <p className="lead">{copy.updateText}</p>

          <ul className="checkList">
            {copy.updateItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <p className="kicker">{copy.privateKicker}</p>
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
          <p className="kicker">{copy.discordFlowKicker}</p>
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
          <p className="kicker">{copy.disciplineKicker}</p>
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
          <p className="kicker">{copy.accessKicker}</p>
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