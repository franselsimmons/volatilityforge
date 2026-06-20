import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';

const LOCALES = ['nl', 'en', 'de', 'es', 'fr'];

const COPY = {
  nl: {
    badge: 'FAQ',
    title: 'Veelgestelde vragen over VolatilityForge.',
    intro:
      'Hier vind je de belangrijkste vragen over de private signal room, performance, betalingen, risico en toegang. De antwoorden zijn bewust helder gehouden zodat klanten snel begrijpen wat VolatilityForge wel en niet is.',

    primaryCta: 'Vraag toegang aan',
    secondaryCta: 'Bekijk pricing',
    sectionKicker: 'FAQ',
    accessKicker: 'Toegang',

    sections: [
      {
        title: 'Toegang en membership',
        questions: [
          {
            q: 'Wat is VolatilityForge?',
            a: 'VolatilityForge is een private crypto signal room voor selectieve LONG en SHORT signalen. Leden ontvangen signalen via een afgesloten Discord-omgeving.'
          },
          {
            q: 'Is er één signal room of zijn er meerdere VIP-lagen?',
            a: 'Er is één private signal room. Alle leden krijgen dezelfde feed. Er zijn geen verborgen VIP-lagen en geen aparte hogere tier voor betere signalen.'
          },
          {
            q: 'Wat is het verschil tussen de memberships?',
            a: 'Alle memberships geven toegang tot dezelfde private feed. Het verschil zit alleen in de looptijd: maandelijks, 6 maanden of jaarlijks.'
          },
          {
            q: 'Krijg ik direct toegang na betaling?',
            a: 'De site is voorbereid op een betaal- en aanvraagflow. Zodra Stripe en de toegangsautomatisering zijn gekoppeld, kan toegang automatisch of semi-automatisch worden verwerkt.'
          }
        ]
      },
      {
        title: 'Signalen',
        questions: [
          {
            q: 'Krijgen leden LONG én SHORT signalen?',
            a: 'Ja. De private feed kan zowel LONG als SHORT signalen delen wanneer de markt, setup en risicostructuur voldoende kloppen.'
          },
          {
            q: 'Hoe ziet een signaal eruit?',
            a: 'Een signaal bevat normaal gesproken richting, market, entry-zone, invalidatie, targets en eventuele updates. De exacte live signalen blijven binnen de private Discord.'
          },
          {
            q: 'Komen er elke dag signalen?',
            a: 'Niet verplicht. Geen signaal is beter dan een zwakke setup. VolatilityForge is gebouwd rond selectie, niet rond geforceerde dagelijkse activiteit.'
          },
          {
            q: 'Geeft VolatilityForge trade management?',
            a: 'Binnen de private room kunnen updates worden gedeeld wanneer een setup verandert. Leden blijven zelf verantwoordelijk voor uitvoering, positieomvang en risicobeheer.'
          }
        ]
      },
      {
        title: 'Performance',
        questions: [
          {
            q: 'Wat betekent Model-PnL?',
            a: 'Model-PnL is een modelberekende presentatie van resultaat op basis van vaste risicoparameters. Het is bedoeld om performance begrijpelijker te tonen, maar het is geen garantie op toekomstige resultaten.'
          },
          {
            q: 'Is +49.2% gegarandeerd?',
            a: 'Nee. Geen enkel resultaat is gegarandeerd. Modelberekeningen en eerdere resultaten geven geen garantie voor toekomstige prestaties.'
          },
          {
            q: 'Waarom wordt er met 0.25% risico per signaal gerekend?',
            a: 'Dat is een conservatieve vaste risicoparameter om resultaten overzichtelijk te presenteren. Werkelijke resultaten kunnen afwijken door uitvoering, timing, fees, slippage, leverage en positieomvang.'
          },
          {
            q: 'Worden alle interne details openbaar gemaakt?',
            a: 'Nee. De publieke website toont alleen een begrijpelijke presentatie. De interne selectieparameters, technische modelstructuur en live uitvoeringscontext blijven privé.'
          }
        ]
      },
      {
        title: 'Betaling en koppelingen',
        questions: [
          {
            q: 'Is Stripe al gekoppeld?',
            a: 'De code is voorbereid op Stripe Checkout. Je hoeft later alleen je Stripe secret key, price IDs en site URL als environment variables in Vercel te zetten.'
          },
          {
            q: 'Wat gebeurt er zolang Stripe nog niet live staat?',
            a: 'Zolang betalingen niet actief zijn, sturen de pricing-knoppen naar de aanvraagpagina. Zo kun je eerst handmatig of semi-handmatig toegang verwerken.'
          },
          {
            q: 'Welke betaalopties zijn voorbereid?',
            a: 'De structuur is voorbereid voor maandtoegang, 6 maanden toegang en jaartoegang.'
          },
          {
            q: 'Kan ik later automatisering toevoegen?',
            a: 'Ja. De aanvraagroute is voorbereid om later te koppelen met bijvoorbeeld Make, Zapier, Formspree, een eigen backend of een Discord-toegangsflow.'
          }
        ]
      },
      {
        title: 'Risico en verantwoordelijkheid',
        questions: [
          {
            q: 'Is VolatilityForge financieel advies?',
            a: 'Nee. VolatilityForge is geen financieel advies en geeft geen persoonlijk beleggingsadvies. Tradingbeslissingen blijven altijd de verantwoordelijkheid van de gebruiker.'
          },
          {
            q: 'Kan ik geld verliezen?',
            a: 'Ja. Trading heeft risico. Verliezen zijn mogelijk, ook wanneer een signaal logisch of modelmatig sterk lijkt.'
          },
          {
            q: 'Waar moet ik rekening mee houden?',
            a: 'Resultaten kunnen worden beïnvloed door uitvoering, timing, fees, slippage, liquiditeit, positieomvang, leverage en marktomstandigheden.'
          },
          {
            q: 'Moet de juridische tekst nog gecontroleerd worden?',
            a: 'Ja. Laat disclaimers, betaalvoorwaarden en marketingclaims juridisch toetsen voordat je publiek betaalde toegang aanbiedt.'
          }
        ]
      }
    ],

    riskTitle: 'Belangrijke risicotoelichting',
    riskText:
      'VolatilityForge is geen financieel advies. Trading heeft risico. Resultaten uit het verleden, modelberekeningen en voorbeeldsignalen geven geen garantie voor toekomstige resultaten. Leden blijven zelf verantwoordelijk voor uitvoering, positieomvang, leverage en risicobeheer.',

    finalTitle: 'Nog vragen of klaar om toegang aan te vragen?',
    finalText:
      'Start een aanvraag of bekijk eerst de pricing-pagina. Alle leden krijgen dezelfde private LONG en SHORT signal feed.',
    finalPrimary: 'Aanvraag starten',
    finalSecondary: 'Bekijk pricing'
  },

  en: {
    badge: 'FAQ',
    title: 'Frequently asked questions about VolatilityForge.',
    intro:
      'Here you will find the main questions about the private signal room, performance, payments, risk and access. The answers are intentionally clear so clients quickly understand what VolatilityForge is and is not.',

    primaryCta: 'Request access',
    secondaryCta: 'View pricing',
    sectionKicker: 'FAQ',
    accessKicker: 'Access',

    sections: [
      {
        title: 'Access and membership',
        questions: [
          {
            q: 'What is VolatilityForge?',
            a: 'VolatilityForge is a private crypto signal room for selective LONG and SHORT signals. Members receive signals through a closed Discord environment.'
          },
          {
            q: 'Is there one signal room or multiple VIP tiers?',
            a: 'There is one private signal room. Every member receives the same feed. There are no hidden VIP layers and no higher tier for better signals.'
          },
          {
            q: 'What is the difference between memberships?',
            a: 'Every membership gives access to the same private feed. The only difference is the access length: monthly, 6 months or annual.'
          },
          {
            q: 'Do I get access immediately after payment?',
            a: 'The site is prepared for a payment and application flow. Once Stripe and access automation are connected, access can be processed automatically or semi-automatically.'
          }
        ]
      },
      {
        title: 'Signals',
        questions: [
          {
            q: 'Do members receive both LONG and SHORT signals?',
            a: 'Yes. The private feed can share both LONG and SHORT signals when market, setup and risk structure align.'
          },
          {
            q: 'What does a signal look like?',
            a: 'A signal normally includes direction, market, entry zone, invalidation, targets and possible updates. Exact live signals remain inside the private Discord.'
          },
          {
            q: 'Are signals posted every day?',
            a: 'Not necessarily. No signal is better than a weak setup. VolatilityForge is built around selection, not forced daily activity.'
          },
          {
            q: 'Does VolatilityForge provide trade management?',
            a: 'Inside the private room, updates can be shared when a setup changes. Members remain responsible for execution, position size and risk management.'
          }
        ]
      },
      {
        title: 'Performance',
        questions: [
          {
            q: 'What does Model PnL mean?',
            a: 'Model PnL is a model-calculated presentation of results based on fixed risk parameters. It is intended to make performance easier to understand, but it is not a guarantee of future results.'
          },
          {
            q: 'Is +49.2% guaranteed?',
            a: 'No. No result is guaranteed. Model calculations and past results do not guarantee future performance.'
          },
          {
            q: 'Why use 0.25% risk per signal?',
            a: 'It is a conservative fixed-risk parameter to present results clearly. Real results can differ because of execution, timing, fees, slippage, leverage and position size.'
          },
          {
            q: 'Are all internal details made public?',
            a: 'No. The public website only shows an understandable presentation. Internal selection parameters, technical model structure and live execution context remain private.'
          }
        ]
      },
      {
        title: 'Payment and integrations',
        questions: [
          {
            q: 'Is Stripe already connected?',
            a: 'The code is prepared for Stripe Checkout. Later you only need to add your Stripe secret key, price IDs and site URL as environment variables in Vercel.'
          },
          {
            q: 'What happens while Stripe is not live yet?',
            a: 'As long as payments are not active, pricing buttons send users to the application page. This allows you to process access manually or semi-manually first.'
          },
          {
            q: 'Which payment options are prepared?',
            a: 'The structure is prepared for monthly access, 6-month access and annual access.'
          },
          {
            q: 'Can I add automation later?',
            a: 'Yes. The application route is prepared to connect later with Make, Zapier, Formspree, your own backend or a Discord access flow.'
          }
        ]
      },
      {
        title: 'Risk and responsibility',
        questions: [
          {
            q: 'Is VolatilityForge financial advice?',
            a: 'No. VolatilityForge is not financial advice and does not provide personal investment advice. Trading decisions remain the user’s own responsibility.'
          },
          {
            q: 'Can I lose money?',
            a: 'Yes. Trading involves risk. Losses are possible, even when a signal looks logical or model-supported.'
          },
          {
            q: 'What should I take into account?',
            a: 'Results can be affected by execution, timing, fees, slippage, liquidity, position size, leverage and market conditions.'
          },
          {
            q: 'Should the legal text be reviewed?',
            a: 'Yes. Have disclaimers, payment terms and marketing claims legally reviewed before offering paid public access.'
          }
        ]
      }
    ],

    riskTitle: 'Important risk explanation',
    riskText:
      'VolatilityForge is not financial advice. Trading involves risk. Past performance, model calculations and example signals do not guarantee future results. Members remain responsible for execution, position size, leverage and risk management.',

    finalTitle: 'Still have questions or ready to request access?',
    finalText:
      'Start an application or review the pricing page first. Every member receives the same private LONG and SHORT signal feed.',
    finalPrimary: 'Start application',
    finalSecondary: 'View pricing'
  },

  de: {
    badge: 'FAQ',
    title: 'Häufig gestellte Fragen zu VolatilityForge.',
    intro:
      'Hier findest du die wichtigsten Fragen zum privaten Signalraum, zur Performance, zu Zahlungen, Risiken und Zugang. Die Antworten sind bewusst klar gehalten, damit Kunden schnell verstehen, was VolatilityForge ist und was nicht.',

    primaryCta: 'Zugang anfragen',
    secondaryCta: 'Preise ansehen',
    sectionKicker: 'FAQ',
    accessKicker: 'Zugang',

    sections: [
      {
        title: 'Zugang und Mitgliedschaft',
        questions: [
          {
            q: 'Was ist VolatilityForge?',
            a: 'VolatilityForge ist ein privater Krypto-Signalraum für selektive LONG- und SHORT-Signale. Mitglieder erhalten Signale über eine geschlossene Discord-Umgebung.'
          },
          {
            q: 'Gibt es einen Signalraum oder mehrere VIP-Stufen?',
            a: 'Es gibt einen privaten Signalraum. Alle Mitglieder erhalten denselben Feed. Es gibt keine versteckten VIP-Stufen und keine höhere Stufe für bessere Signale.'
          },
          {
            q: 'Was ist der Unterschied zwischen den Mitgliedschaften?',
            a: 'Alle Mitgliedschaften geben Zugang zum gleichen privaten Feed. Der Unterschied liegt nur in der Laufzeit: monatlich, 6 Monate oder jährlich.'
          },
          {
            q: 'Erhalte ich direkt nach der Zahlung Zugang?',
            a: 'Die Website ist für einen Zahlungs- und Anfrageprozess vorbereitet. Sobald Stripe und die Zugangsaautomatisierung verbunden sind, kann Zugang automatisch oder halbautomatisch verarbeitet werden.'
          }
        ]
      },
      {
        title: 'Signale',
        questions: [
          {
            q: 'Erhalten Mitglieder sowohl LONG- als auch SHORT-Signale?',
            a: 'Ja. Der private Feed kann LONG- und SHORT-Signale teilen, wenn Markt, Setup und Risikostruktur ausreichend zusammenpassen.'
          },
          {
            q: 'Wie sieht ein Signal aus?',
            a: 'Ein Signal enthält normalerweise Richtung, Markt, Entry-Zone, Invalidierung, Targets und mögliche Updates. Exakte Live-Signale bleiben im privaten Discord.'
          },
          {
            q: 'Werden jeden Tag Signale gepostet?',
            a: 'Nicht zwingend. Kein Signal ist besser als ein schwaches Setup. VolatilityForge ist auf Auswahl ausgelegt, nicht auf erzwungene tägliche Aktivität.'
          },
          {
            q: 'Bietet VolatilityForge Trade-Management?',
            a: 'Im privaten Raum können Updates geteilt werden, wenn sich ein Setup verändert. Mitglieder bleiben selbst verantwortlich für Ausführung, Positionsgröße und Risikomanagement.'
          }
        ]
      },
      {
        title: 'Performance',
        questions: [
          {
            q: 'Was bedeutet Modell-PnL?',
            a: 'Modell-PnL ist eine modellberechnete Darstellung von Ergebnissen auf Basis fester Risikoparameter. Sie soll Performance verständlicher machen, garantiert aber keine zukünftigen Ergebnisse.'
          },
          {
            q: 'Ist +49.2% garantiert?',
            a: 'Nein. Kein Ergebnis ist garantiert. Modellberechnungen und frühere Ergebnisse garantieren keine zukünftige Performance.'
          },
          {
            q: 'Warum wird 0.25% Risiko pro Signal verwendet?',
            a: 'Das ist ein konservativer fester Risikoparameter, um Ergebnisse klar darzustellen. Reale Ergebnisse können durch Ausführung, Timing, Gebühren, Slippage, Hebel und Positionsgröße abweichen.'
          },
          {
            q: 'Werden alle internen Details öffentlich gemacht?',
            a: 'Nein. Die öffentliche Website zeigt nur eine verständliche Darstellung. Interne Auswahlparameter, technische Modellstruktur und Live-Ausführungskontext bleiben privat.'
          }
        ]
      },
      {
        title: 'Zahlung und Integrationen',
        questions: [
          {
            q: 'Ist Stripe bereits verbunden?',
            a: 'Der Code ist für Stripe Checkout vorbereitet. Später musst du nur deinen Stripe Secret Key, Price IDs und die Site URL als Environment Variables in Vercel eintragen.'
          },
          {
            q: 'Was passiert, solange Stripe noch nicht live ist?',
            a: 'Solange Zahlungen nicht aktiv sind, schicken die Pricing-Buttons Nutzer zur Anfrageseite. So kannst du Zugang zunächst manuell oder halbmanuell verarbeiten.'
          },
          {
            q: 'Welche Zahlungsoptionen sind vorbereitet?',
            a: 'Die Struktur ist für monatlichen Zugang, 6-Monats-Zugang und Jahreszugang vorbereitet.'
          },
          {
            q: 'Kann ich später Automatisierung hinzufügen?',
            a: 'Ja. Die Anfrageroute ist vorbereitet, um später mit Make, Zapier, Formspree, deinem eigenen Backend oder einem Discord-Zugangsflow verbunden zu werden.'
          }
        ]
      },
      {
        title: 'Risiko und Verantwortung',
        questions: [
          {
            q: 'Ist VolatilityForge Finanzberatung?',
            a: 'Nein. VolatilityForge ist keine Finanzberatung und bietet keine persönliche Anlageberatung. Trading-Entscheidungen bleiben immer die eigene Verantwortung des Nutzers.'
          },
          {
            q: 'Kann ich Geld verlieren?',
            a: 'Ja. Trading beinhaltet Risiko. Verluste sind möglich, auch wenn ein Signal logisch oder modellgestützt wirkt.'
          },
          {
            q: 'Was muss ich berücksichtigen?',
            a: 'Ergebnisse können durch Ausführung, Timing, Gebühren, Slippage, Liquidität, Positionsgröße, Hebel und Marktbedingungen beeinflusst werden.'
          },
          {
            q: 'Sollte der Rechtstext geprüft werden?',
            a: 'Ja. Lass Disclaimer, Zahlungsbedingungen und Marketingclaims rechtlich prüfen, bevor du bezahlten öffentlichen Zugang anbietest.'
          }
        ]
      }
    ],

    riskTitle: 'Wichtige Risikoerklärung',
    riskText:
      'VolatilityForge ist keine Finanzberatung. Trading beinhaltet Risiko. Frühere Ergebnisse, Modellberechnungen und Beispielsignale garantieren keine zukünftigen Ergebnisse. Mitglieder bleiben selbst verantwortlich für Ausführung, Positionsgröße, Hebel und Risikomanagement.',

    finalTitle: 'Noch Fragen oder bereit, Zugang anzufragen?',
    finalText:
      'Starte eine Anfrage oder sieh dir zuerst die Preise an. Alle Mitglieder erhalten denselben privaten LONG- und SHORT-Signalfeed.',
    finalPrimary: 'Anfrage starten',
    finalSecondary: 'Preise ansehen'
  },

  es: {
    badge: 'FAQ',
    title: 'Preguntas frecuentes sobre VolatilityForge.',
    intro:
      'Aquí encontrarás las preguntas principales sobre la sala privada de señales, rendimiento, pagos, riesgo y acceso. Las respuestas son claras para que los clientes entiendan rápidamente qué es VolatilityForge y qué no es.',

    primaryCta: 'Solicitar acceso',
    secondaryCta: 'Ver precios',
    sectionKicker: 'FAQ',
    accessKicker: 'Acceso',

    sections: [
      {
        title: 'Acceso y membresía',
        questions: [
          {
            q: '¿Qué es VolatilityForge?',
            a: 'VolatilityForge es una sala privada de señales cripto para señales LONG y SHORT selectivas. Los miembros reciben señales mediante un entorno cerrado de Discord.'
          },
          {
            q: '¿Hay una sola sala de señales o varios niveles VIP?',
            a: 'Hay una sola sala privada de señales. Todos los miembros reciben el mismo feed. No hay niveles VIP ocultos ni una tier superior para mejores señales.'
          },
          {
            q: '¿Cuál es la diferencia entre las membresías?',
            a: 'Todas las membresías dan acceso al mismo feed privado. La única diferencia es la duración: mensual, 6 meses o anual.'
          },
          {
            q: '¿Recibo acceso inmediatamente después del pago?',
            a: 'El sitio está preparado para un flujo de pago y solicitud. Cuando Stripe y la automatización de acceso estén conectados, el acceso podrá procesarse de forma automática o semiautomática.'
          }
        ]
      },
      {
        title: 'Señales',
        questions: [
          {
            q: '¿Los miembros reciben señales LONG y SHORT?',
            a: 'Sí. El feed privado puede compartir señales LONG y SHORT cuando el mercado, el setup y la estructura de riesgo encajan.'
          },
          {
            q: '¿Cómo es una señal?',
            a: 'Una señal normalmente incluye dirección, mercado, zona de entrada, invalidación, objetivos y posibles actualizaciones. Las señales live exactas permanecen dentro del Discord privado.'
          },
          {
            q: '¿Se publican señales todos los días?',
            a: 'No necesariamente. Ninguna señal es mejor que un setup débil. VolatilityForge está construido alrededor de selección, no actividad diaria forzada.'
          },
          {
            q: '¿VolatilityForge ofrece gestión de trades?',
            a: 'Dentro de la sala privada se pueden compartir actualizaciones cuando un setup cambia. Los miembros siguen siendo responsables de la ejecución, tamaño de posición y gestión de riesgo.'
          }
        ]
      },
      {
        title: 'Rendimiento',
        questions: [
          {
            q: '¿Qué significa PnL del modelo?',
            a: 'El PnL del modelo es una presentación calculada por modelo basada en parámetros de riesgo fijos. Está pensada para hacer el rendimiento más comprensible, pero no garantiza resultados futuros.'
          },
          {
            q: '¿Está garantizado el +49.2%?',
            a: 'No. Ningún resultado está garantizado. Los cálculos del modelo y resultados pasados no garantizan rendimiento futuro.'
          },
          {
            q: '¿Por qué se usa 0.25% de riesgo por señal?',
            a: 'Es un parámetro conservador de riesgo fijo para presentar los resultados claramente. Los resultados reales pueden diferir por ejecución, timing, comisiones, slippage, apalancamiento y tamaño de posición.'
          },
          {
            q: '¿Se hacen públicos todos los detalles internos?',
            a: 'No. El sitio público solo muestra una presentación comprensible. Los parámetros internos de selección, la estructura técnica del modelo y el contexto live de ejecución permanecen privados.'
          }
        ]
      },
      {
        title: 'Pago e integraciones',
        questions: [
          {
            q: '¿Stripe ya está conectado?',
            a: 'El código está preparado para Stripe Checkout. Más adelante solo tienes que añadir tu Stripe secret key, price IDs y site URL como environment variables en Vercel.'
          },
          {
            q: '¿Qué ocurre mientras Stripe aún no está live?',
            a: 'Mientras los pagos no estén activos, los botones de pricing envían a los usuarios a la página de solicitud. Así puedes procesar acceso manual o semimanual primero.'
          },
          {
            q: '¿Qué opciones de pago están preparadas?',
            a: 'La estructura está preparada para acceso mensual, acceso de 6 meses y acceso anual.'
          },
          {
            q: '¿Puedo añadir automatización más adelante?',
            a: 'Sí. La ruta de solicitud está preparada para conectarse más adelante con Make, Zapier, Formspree, tu propio backend o un flujo de acceso a Discord.'
          }
        ]
      },
      {
        title: 'Riesgo y responsabilidad',
        questions: [
          {
            q: '¿VolatilityForge es asesoramiento financiero?',
            a: 'No. VolatilityForge no es asesoramiento financiero y no ofrece asesoramiento de inversión personal. Las decisiones de trading siguen siendo responsabilidad del usuario.'
          },
          {
            q: '¿Puedo perder dinero?',
            a: 'Sí. El trading implica riesgo. Las pérdidas son posibles, incluso cuando una señal parece lógica o respaldada por modelo.'
          },
          {
            q: '¿Qué debo tener en cuenta?',
            a: 'Los resultados pueden verse afectados por ejecución, timing, comisiones, slippage, liquidez, tamaño de posición, apalancamiento y condiciones de mercado.'
          },
          {
            q: '¿Debe revisarse el texto legal?',
            a: 'Sí. Haz revisar legalmente disclaimers, términos de pago y claims de marketing antes de ofrecer acceso público pagado.'
          }
        ]
      }
    ],

    riskTitle: 'Explicación importante de riesgo',
    riskText:
      'VolatilityForge no es asesoramiento financiero. El trading implica riesgo. El rendimiento pasado, los cálculos del modelo y señales de ejemplo no garantizan resultados futuros. Los miembros siguen siendo responsables de ejecución, tamaño de posición, apalancamiento y gestión de riesgo.',

    finalTitle: '¿Aún tienes preguntas o estás listo para solicitar acceso?',
    finalText:
      'Inicia una solicitud o revisa primero la página de precios. Todos los miembros reciben el mismo feed privado de señales LONG y SHORT.',
    finalPrimary: 'Iniciar solicitud',
    finalSecondary: 'Ver precios'
  },

  fr: {
    badge: 'FAQ',
    title: 'Questions fréquentes sur VolatilityForge.',
    intro:
      'Tu trouveras ici les principales questions sur la salle privée de signaux, la performance, les paiements, le risque et l’accès. Les réponses sont volontairement claires afin que les clients comprennent rapidement ce qu’est VolatilityForge et ce qu’il n’est pas.',

    primaryCta: 'Demander l’accès',
    secondaryCta: 'Voir les tarifs',
    sectionKicker: 'FAQ',
    accessKicker: 'Accès',

    sections: [
      {
        title: 'Accès et abonnement',
        questions: [
          {
            q: 'Qu’est-ce que VolatilityForge ?',
            a: 'VolatilityForge est une salle privée de signaux crypto pour des signaux LONG et SHORT sélectifs. Les membres reçoivent les signaux via un environnement Discord fermé.'
          },
          {
            q: 'Y a-t-il une seule salle de signaux ou plusieurs niveaux VIP ?',
            a: 'Il y a une seule salle privée de signaux. Tous les membres reçoivent le même feed. Il n’y a pas de niveaux VIP cachés ni de tier supérieur pour de meilleurs signaux.'
          },
          {
            q: 'Quelle est la différence entre les abonnements ?',
            a: 'Tous les abonnements donnent accès au même feed privé. La seule différence est la durée : mensuelle, 6 mois ou annuelle.'
          },
          {
            q: 'Est-ce que j’obtiens l’accès immédiatement après paiement ?',
            a: 'Le site est préparé pour un flux de paiement et de demande. Une fois Stripe et l’automatisation d’accès connectés, l’accès pourra être traité automatiquement ou semi-automatiquement.'
          }
        ]
      },
      {
        title: 'Signaux',
        questions: [
          {
            q: 'Les membres reçoivent-ils des signaux LONG et SHORT ?',
            a: 'Oui. Le feed privé peut partager des signaux LONG et SHORT lorsque le marché, le setup et la structure de risque sont alignés.'
          },
          {
            q: 'À quoi ressemble un signal ?',
            a: 'Un signal contient généralement la direction, le marché, la zone d’entrée, l’invalidation, les objectifs et d’éventuelles mises à jour. Les signaux live exacts restent dans le Discord privé.'
          },
          {
            q: 'Y a-t-il des signaux tous les jours ?',
            a: 'Pas nécessairement. Aucun signal vaut mieux qu’un setup faible. VolatilityForge est construit autour de la sélection, pas autour d’une activité quotidienne forcée.'
          },
          {
            q: 'VolatilityForge fournit-il du trade management ?',
            a: 'Dans la salle privée, des mises à jour peuvent être partagées lorsqu’un setup évolue. Les membres restent responsables de l’exécution, de la taille de position et de la gestion du risque.'
          }
        ]
      },
      {
        title: 'Performance',
        questions: [
          {
            q: 'Que signifie PnL du modèle ?',
            a: 'Le PnL du modèle est une présentation calculée par modèle sur la base de paramètres de risque fixes. Il sert à rendre la performance plus compréhensible, mais ne garantit pas les résultats futurs.'
          },
          {
            q: '+49.2% est-il garanti ?',
            a: 'Non. Aucun résultat n’est garanti. Les calculs du modèle et les résultats passés ne garantissent pas la performance future.'
          },
          {
            q: 'Pourquoi utiliser 0.25% de risque par signal ?',
            a: 'C’est un paramètre conservateur de risque fixe pour présenter les résultats clairement. Les résultats réels peuvent différer à cause de l’exécution, du timing, des frais, du slippage, du levier et de la taille de position.'
          },
          {
            q: 'Tous les détails internes sont-ils rendus publics ?',
            a: 'Non. Le site public montre seulement une présentation compréhensible. Les paramètres internes de sélection, la structure technique du modèle et le contexte live d’exécution restent privés.'
          }
        ]
      },
      {
        title: 'Paiement et intégrations',
        questions: [
          {
            q: 'Stripe est-il déjà connecté ?',
            a: 'Le code est préparé pour Stripe Checkout. Plus tard, il suffit d’ajouter ta Stripe secret key, tes price IDs et ton site URL comme environment variables dans Vercel.'
          },
          {
            q: 'Que se passe-t-il tant que Stripe n’est pas live ?',
            a: 'Tant que les paiements ne sont pas actifs, les boutons de pricing envoient les utilisateurs vers la page de demande. Cela permet de traiter l’accès manuellement ou semi-manuellement au début.'
          },
          {
            q: 'Quelles options de paiement sont préparées ?',
            a: 'La structure est préparée pour un accès mensuel, un accès de 6 mois et un accès annuel.'
          },
          {
            q: 'Puis-je ajouter de l’automatisation plus tard ?',
            a: 'Oui. La route de demande est préparée pour être connectée plus tard à Make, Zapier, Formspree, ton propre backend ou un flux d’accès Discord.'
          }
        ]
      },
      {
        title: 'Risque et responsabilité',
        questions: [
          {
            q: 'VolatilityForge est-il un conseil financier ?',
            a: 'Non. VolatilityForge ne constitue pas un conseil financier et ne fournit pas de conseil d’investissement personnel. Les décisions de trading restent toujours la responsabilité de l’utilisateur.'
          },
          {
            q: 'Puis-je perdre de l’argent ?',
            a: 'Oui. Le trading comporte des risques. Des pertes sont possibles, même lorsqu’un signal semble logique ou soutenu par le modèle.'
          },
          {
            q: 'Que dois-je prendre en compte ?',
            a: 'Les résultats peuvent être influencés par l’exécution, le timing, les frais, le slippage, la liquidité, la taille de position, le levier et les conditions de marché.'
          },
          {
            q: 'Le texte juridique doit-il être vérifié ?',
            a: 'Oui. Fais vérifier les disclaimers, les conditions de paiement et les claims marketing juridiquement avant de proposer un accès payant public.'
          }
        ]
      }
    ],

    riskTitle: 'Explication importante du risque',
    riskText:
      'VolatilityForge ne constitue pas un conseil financier. Le trading comporte des risques. Les performances passées, les calculs du modèle et les exemples de signaux ne garantissent pas les résultats futurs. Les membres restent responsables de l’exécution, de la taille de position, du levier et de la gestion du risque.',

    finalTitle: 'Encore des questions ou prêt à demander l’accès ?',
    finalText:
      'Démarre une demande ou consulte d’abord la page des tarifs. Tous les membres reçoivent le même feed privé de signaux LONG et SHORT.',
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
    title: 'FAQ',
    description: copy.intro
  };
}

export default async function FAQPage({ params }) {
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
      </section>

      {copy.sections.map((section) => (
        <section className="section" key={section.title}>
          <div className="center narrow">
            <p className="kicker">{copy.sectionKicker}</p>
            <h2>{section.title}</h2>
          </div>

          <div className="faqGrid">
            {section.questions.map((item) => (
              <article className="faqCard" key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </section>
      ))}

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