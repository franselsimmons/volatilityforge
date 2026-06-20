import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';

const LOCALES = ['nl', 'en', 'de', 'es', 'fr'];

const COPY = {
  nl: {
    badge: 'Risk Disclaimer',
    title: 'Risicodisclaimer voor VolatilityForge.',
    intro:
      'Deze pagina beschrijft de belangrijkste risico’s en beperkingen rond VolatilityForge, crypto trading, modelberekende performance en toegang tot de private signal room.',

    summaryKicker: 'Samenvatting',
    legalKicker: 'Juridisch',
    navigationKicker: 'Navigatie',

    sections: [
      {
        title: 'Geen financieel advies',
        paragraphs: [
          'VolatilityForge verstrekt geen financieel advies, beleggingsadvies, vermogensbeheer, juridisch advies of fiscaal advies.',
          'Alle informatie, signalen, voorbeelden, modelresultaten en toelichtingen zijn uitsluitend bedoeld voor algemene informatiedoeleinden.',
          'Gebruikers blijven zelf verantwoordelijk voor hun eigen beslissingen, positieomvang, uitvoering, risicobeheer en eventuele verliezen.'
        ]
      },
      {
        title: 'Trading heeft risico',
        paragraphs: [
          'Crypto trading brengt aanzienlijke risico’s met zich mee. De waarde van crypto-activa kan snel en sterk bewegen.',
          'Gebruikers kunnen een deel of het volledige ingelegde kapitaal verliezen.',
          'Gebruik van leverage kan winsten vergroten, maar ook verliezen versnellen en vergroten.'
        ]
      },
      {
        title: 'Geen garantie op winst',
        paragraphs: [
          'Toegang tot VolatilityForge, de private signal room of voorbeeldsignalen geeft geen garantie op winst.',
          'Resultaten uit het verleden bieden geen garantie voor toekomstige resultaten.',
          'Een signaal dat modelmatig of technisch sterk lijkt, kan alsnog verlies opleveren.'
        ]
      },
      {
        title: 'Model-PnL en performance',
        paragraphs: [
          'Model-PnL is een modelberekende inschatting op basis van vaste aannames, zoals een vaste risicoparameter per signaal.',
          'Modelresultaten kunnen afwijken van werkelijke resultaten door timing, uitvoering, fees, slippage, liquiditeit, spread, positieomvang, leverage en marktomstandigheden.',
          'Performancecijfers op deze website zijn bedoeld als presentatie van een modeluitkomst en mogen niet worden gelezen als gegarandeerd rendement.'
        ]
      },
      {
        title: 'Signal room en uitvoering',
        paragraphs: [
          'Signalen kunnen richting, entry-zone, invalidatie, targets en updates bevatten, maar de gebruiker bepaalt zelf of, hoe en wanneer een signaal wordt uitgevoerd.',
          'VolatilityForge is niet verantwoordelijk voor afwijkingen tussen een gedeeld signaal en de werkelijke uitvoering van een gebruiker.',
          'Vertragingen, exchange-problemen, liquiditeit, ordertypes, latency en persoonlijke instellingen kunnen het uiteindelijke resultaat beïnvloeden.'
        ]
      },
      {
        title: 'Eigen verantwoordelijkheid',
        paragraphs: [
          'Iedere gebruiker moet zelf beoordelen of crypto trading past bij zijn of haar kennis, ervaring, financiële situatie en risicobereidheid.',
          'Trade nooit met geld dat je niet kunt missen.',
          'Raadpleeg waar nodig een onafhankelijke financieel, juridisch of fiscaal adviseur voordat je handelsbeslissingen neemt.'
        ]
      },
      {
        title: 'Wijzigingen en beschikbaarheid',
        paragraphs: [
          'VolatilityForge kan informatie, pricing, signal room-structuur, features en voorwaarden wijzigen.',
          'Er is geen garantie dat signalen altijd beschikbaar zijn, dat er dagelijks signalen worden geplaatst of dat de Discord-omgeving zonder onderbreking beschikbaar blijft.',
          'Geen signaal plaatsen kan een bewuste keuze zijn wanneer de marktcondities onvoldoende zijn.'
        ]
      }
    ],

    bulletsTitle: 'Samengevat',
    bullets: [
      'Geen financieel advies.',
      'Trading heeft risico.',
      'Verliezen zijn mogelijk.',
      'Model-PnL is geen garantie.',
      'Resultaten uit het verleden voorspellen geen toekomstige resultaten.',
      'Gebruikers blijven zelf verantwoordelijk voor uitvoering en risicobeheer.'
    ],

    legalNoteTitle: 'Juridische controle aanbevolen',
    legalNote:
      'Laat deze disclaimer, je algemene voorwaarden, betaalvoorwaarden en marketingclaims juridisch controleren voordat je VolatilityForge publiek en betaald aanbiedt.',

    finalTitle: 'Terug naar VolatilityForge',
    finalText:
      'Bekijk de homepage, pricing of FAQ voor meer context over de private signal room.',
    links: [
      ['Homepage', ''],
      ['Pricing', 'pricing'],
      ['FAQ', 'faq']
    ]
  },

  en: {
    badge: 'Risk Disclaimer',
    title: 'Risk disclaimer for VolatilityForge.',
    intro:
      'This page describes the main risks and limitations around VolatilityForge, crypto trading, model-calculated performance and access to the private signal room.',

    summaryKicker: 'Summary',
    legalKicker: 'Legal',
    navigationKicker: 'Navigation',

    sections: [
      {
        title: 'No financial advice',
        paragraphs: [
          'VolatilityForge does not provide financial advice, investment advice, asset management, legal advice or tax advice.',
          'All information, signals, examples, model results and explanations are provided for general informational purposes only.',
          'Users remain responsible for their own decisions, position sizing, execution, risk management and possible losses.'
        ]
      },
      {
        title: 'Trading involves risk',
        paragraphs: [
          'Crypto trading involves significant risk. The value of crypto assets can move quickly and sharply.',
          'Users can lose part or all of their invested capital.',
          'Using leverage can increase profits, but can also accelerate and increase losses.'
        ]
      },
      {
        title: 'No profit guarantee',
        paragraphs: [
          'Access to VolatilityForge, the private signal room or example signals does not guarantee profit.',
          'Past performance does not guarantee future results.',
          'A signal that appears technically or model-supported can still result in a loss.'
        ]
      },
      {
        title: 'Model PnL and performance',
        paragraphs: [
          'Model PnL is a model-calculated estimate based on fixed assumptions, such as a fixed risk parameter per signal.',
          'Model results can differ from real results because of timing, execution, fees, slippage, liquidity, spread, position size, leverage and market conditions.',
          'Performance figures on this website are intended as a model outcome presentation and should not be read as guaranteed returns.'
        ]
      },
      {
        title: 'Signal room and execution',
        paragraphs: [
          'Signals may include direction, entry zone, invalidation, targets and updates, but the user decides whether, how and when a signal is executed.',
          'VolatilityForge is not responsible for differences between a shared signal and the actual execution of a user.',
          'Delays, exchange issues, liquidity, order types, latency and personal settings can affect the final result.'
        ]
      },
      {
        title: 'Personal responsibility',
        paragraphs: [
          'Every user must decide whether crypto trading fits their knowledge, experience, financial situation and risk tolerance.',
          'Never trade with money you cannot afford to lose.',
          'Where needed, consult an independent financial, legal or tax adviser before making trading decisions.'
        ]
      },
      {
        title: 'Changes and availability',
        paragraphs: [
          'VolatilityForge may change information, pricing, signal room structure, features and terms.',
          'There is no guarantee that signals are always available, that signals are posted daily or that the Discord environment remains available without interruption.',
          'Posting no signal can be a deliberate choice when market conditions are not strong enough.'
        ]
      }
    ],

    bulletsTitle: 'Summary',
    bullets: [
      'No financial advice.',
      'Trading involves risk.',
      'Losses are possible.',
      'Model PnL is not a guarantee.',
      'Past performance does not predict future results.',
      'Users remain responsible for execution and risk management.'
    ],

    legalNoteTitle: 'Legal review recommended',
    legalNote:
      'Have this disclaimer, your terms, payment terms and marketing claims legally reviewed before offering VolatilityForge publicly as a paid service.',

    finalTitle: 'Back to VolatilityForge',
    finalText:
      'View the homepage, pricing or FAQ for more context about the private signal room.',
    links: [
      ['Homepage', ''],
      ['Pricing', 'pricing'],
      ['FAQ', 'faq']
    ]
  },

  de: {
    badge: 'Risikohinweis',
    title: 'Risikohinweis für VolatilityForge.',
    intro:
      'Diese Seite beschreibt die wichtigsten Risiken und Einschränkungen rund um VolatilityForge, Krypto-Trading, modellberechnete Performance und den Zugang zum privaten Signalraum.',

    summaryKicker: 'Zusammenfassung',
    legalKicker: 'Rechtlich',
    navigationKicker: 'Navigation',

    sections: [
      {
        title: 'Keine Finanzberatung',
        paragraphs: [
          'VolatilityForge bietet keine Finanzberatung, Anlageberatung, Vermögensverwaltung, Rechtsberatung oder Steuerberatung.',
          'Alle Informationen, Signale, Beispiele, Modellergebnisse und Erläuterungen dienen ausschließlich allgemeinen Informationszwecken.',
          'Nutzer bleiben selbst verantwortlich für ihre Entscheidungen, Positionsgröße, Ausführung, Risikomanagement und mögliche Verluste.'
        ]
      },
      {
        title: 'Trading beinhaltet Risiko',
        paragraphs: [
          'Krypto-Trading ist mit erheblichen Risiken verbunden. Der Wert von Krypto-Assets kann sich schnell und stark bewegen.',
          'Nutzer können einen Teil oder das gesamte eingesetzte Kapital verlieren.',
          'Der Einsatz von Leverage kann Gewinne erhöhen, aber auch Verluste beschleunigen und vergrößern.'
        ]
      },
      {
        title: 'Keine Gewinngarantie',
        paragraphs: [
          'Der Zugang zu VolatilityForge, zum privaten Signalraum oder zu Beispielsignalen garantiert keinen Gewinn.',
          'Vergangene Ergebnisse garantieren keine zukünftigen Resultate.',
          'Ein Signal, das technisch oder modellgestützt stark erscheint, kann trotzdem zu einem Verlust führen.'
        ]
      },
      {
        title: 'Modell-PnL und Performance',
        paragraphs: [
          'Modell-PnL ist eine modellberechnete Einschätzung auf Basis fester Annahmen, etwa eines festen Risikoparameters pro Signal.',
          'Modellergebnisse können von realen Ergebnissen abweichen, unter anderem durch Timing, Ausführung, Gebühren, Slippage, Liquidität, Spread, Positionsgröße, Leverage und Marktbedingungen.',
          'Performancezahlen auf dieser Website dienen als Darstellung eines Modellergebnisses und dürfen nicht als garantierte Rendite verstanden werden.'
        ]
      },
      {
        title: 'Signalraum und Ausführung',
        paragraphs: [
          'Signale können Richtung, Entry-Zone, Invalidierung, Targets und Updates enthalten, aber der Nutzer entscheidet selbst, ob, wie und wann ein Signal ausgeführt wird.',
          'VolatilityForge ist nicht verantwortlich für Abweichungen zwischen einem geteilten Signal und der tatsächlichen Ausführung eines Nutzers.',
          'Verzögerungen, Exchange-Probleme, Liquidität, Ordertypen, Latenz und persönliche Einstellungen können das endgültige Ergebnis beeinflussen.'
        ]
      },
      {
        title: 'Eigene Verantwortung',
        paragraphs: [
          'Jeder Nutzer muss selbst beurteilen, ob Krypto-Trading zu Wissen, Erfahrung, finanzieller Situation und Risikobereitschaft passt.',
          'Trade niemals mit Geld, dessen Verlust du dir nicht leisten kannst.',
          'Ziehe bei Bedarf einen unabhängigen Finanz-, Rechts- oder Steuerberater hinzu, bevor du Handelsentscheidungen triffst.'
        ]
      },
      {
        title: 'Änderungen und Verfügbarkeit',
        paragraphs: [
          'VolatilityForge kann Informationen, Preise, Signalraum-Struktur, Features und Bedingungen ändern.',
          'Es gibt keine Garantie, dass Signale immer verfügbar sind, täglich gepostet werden oder die Discord-Umgebung ohne Unterbrechung verfügbar bleibt.',
          'Kein Signal zu posten kann eine bewusste Entscheidung sein, wenn die Marktbedingungen nicht stark genug sind.'
        ]
      }
    ],

    bulletsTitle: 'Zusammengefasst',
    bullets: [
      'Keine Finanzberatung.',
      'Trading beinhaltet Risiko.',
      'Verluste sind möglich.',
      'Modell-PnL ist keine Garantie.',
      'Vergangene Ergebnisse sagen zukünftige Ergebnisse nicht voraus.',
      'Nutzer bleiben selbst verantwortlich für Ausführung und Risikomanagement.'
    ],

    legalNoteTitle: 'Rechtliche Prüfung empfohlen',
    legalNote:
      'Lass diesen Disclaimer, deine allgemeinen Geschäftsbedingungen, Zahlungsbedingungen und Marketingclaims rechtlich prüfen, bevor du VolatilityForge öffentlich und kostenpflichtig anbietest.',

    finalTitle: 'Zurück zu VolatilityForge',
    finalText:
      'Sieh dir die Homepage, Preise oder FAQ an, um mehr Kontext zum privaten Signalraum zu erhalten.',
    links: [
      ['Homepage', ''],
      ['Preise', 'pricing'],
      ['FAQ', 'faq']
    ]
  },

  es: {
    badge: 'Aviso de riesgo',
    title: 'Aviso de riesgo para VolatilityForge.',
    intro:
      'Esta página describe los principales riesgos y limitaciones relacionados con VolatilityForge, el trading cripto, el rendimiento calculado por modelo y el acceso a la sala privada de señales.',

    summaryKicker: 'Resumen',
    legalKicker: 'Legal',
    navigationKicker: 'Navegación',

    sections: [
      {
        title: 'No es asesoramiento financiero',
        paragraphs: [
          'VolatilityForge no ofrece asesoramiento financiero, asesoramiento de inversión, gestión de activos, asesoramiento legal ni asesoramiento fiscal.',
          'Toda la información, señales, ejemplos, resultados de modelo y explicaciones se proporcionan únicamente con fines informativos generales.',
          'Los usuarios siguen siendo responsables de sus propias decisiones, tamaño de posición, ejecución, gestión de riesgo y posibles pérdidas.'
        ]
      },
      {
        title: 'El trading implica riesgo',
        paragraphs: [
          'El trading cripto implica riesgos significativos. El valor de los activos cripto puede moverse rápida y bruscamente.',
          'Los usuarios pueden perder parte o la totalidad del capital invertido.',
          'El uso de apalancamiento puede aumentar las ganancias, pero también acelerar y ampliar las pérdidas.'
        ]
      },
      {
        title: 'Sin garantía de beneficio',
        paragraphs: [
          'El acceso a VolatilityForge, a la sala privada de señales o a señales de ejemplo no garantiza beneficios.',
          'El rendimiento pasado no garantiza resultados futuros.',
          'Una señal que parece sólida técnica o modeladamente puede terminar en pérdida.'
        ]
      },
      {
        title: 'PnL del modelo y rendimiento',
        paragraphs: [
          'El PnL del modelo es una estimación calculada por modelo basada en supuestos fijos, como un parámetro de riesgo fijo por señal.',
          'Los resultados del modelo pueden diferir de los resultados reales por timing, ejecución, comisiones, slippage, liquidez, spread, tamaño de posición, apalancamiento y condiciones de mercado.',
          'Las cifras de rendimiento en este sitio web están pensadas como presentación de un resultado de modelo y no deben leerse como rentabilidad garantizada.'
        ]
      },
      {
        title: 'Sala de señales y ejecución',
        paragraphs: [
          'Las señales pueden incluir dirección, zona de entrada, invalidación, objetivos y actualizaciones, pero el usuario decide si, cómo y cuándo ejecuta una señal.',
          'VolatilityForge no es responsable de diferencias entre una señal compartida y la ejecución real de un usuario.',
          'Retrasos, problemas de exchange, liquidez, tipos de órdenes, latencia y configuraciones personales pueden afectar el resultado final.'
        ]
      },
      {
        title: 'Responsabilidad personal',
        paragraphs: [
          'Cada usuario debe decidir si el trading cripto encaja con su conocimiento, experiencia, situación financiera y tolerancia al riesgo.',
          'Nunca operes con dinero que no puedas permitirte perder.',
          'Cuando sea necesario, consulta a un asesor financiero, legal o fiscal independiente antes de tomar decisiones de trading.'
        ]
      },
      {
        title: 'Cambios y disponibilidad',
        paragraphs: [
          'VolatilityForge puede cambiar información, precios, estructura de la sala de señales, funciones y condiciones.',
          'No hay garantía de que las señales estén siempre disponibles, que se publiquen señales a diario o que el entorno de Discord permanezca disponible sin interrupciones.',
          'No publicar una señal puede ser una decisión deliberada cuando las condiciones del mercado no son suficientemente fuertes.'
        ]
      }
    ],

    bulletsTitle: 'Resumen',
    bullets: [
      'No es asesoramiento financiero.',
      'El trading implica riesgo.',
      'Las pérdidas son posibles.',
      'El PnL del modelo no es una garantía.',
      'El rendimiento pasado no predice resultados futuros.',
      'Los usuarios siguen siendo responsables de la ejecución y la gestión de riesgo.'
    ],

    legalNoteTitle: 'Se recomienda revisión legal',
    legalNote:
      'Haz revisar legalmente este aviso, tus términos, condiciones de pago y claims de marketing antes de ofrecer VolatilityForge públicamente como servicio pagado.',

    finalTitle: 'Volver a VolatilityForge',
    finalText:
      'Consulta la homepage, precios o FAQ para más contexto sobre la sala privada de señales.',
    links: [
      ['Homepage', ''],
      ['Precios', 'pricing'],
      ['FAQ', 'faq']
    ]
  },

  fr: {
    badge: 'Avertissement de risque',
    title: 'Avertissement de risque pour VolatilityForge.',
    intro:
      'Cette page décrit les principaux risques et limites liés à VolatilityForge, au trading crypto, à la performance calculée par modèle et à l’accès à la salle privée de signaux.',

    summaryKicker: 'Résumé',
    legalKicker: 'Juridique',
    navigationKicker: 'Navigation',

    sections: [
      {
        title: 'Aucun conseil financier',
        paragraphs: [
          'VolatilityForge ne fournit aucun conseil financier, conseil en investissement, gestion d’actifs, conseil juridique ou conseil fiscal.',
          'Toutes les informations, signaux, exemples, résultats de modèle et explications sont fournis uniquement à des fins d’information générale.',
          'Les utilisateurs restent responsables de leurs propres décisions, de la taille de position, de l’exécution, de la gestion du risque et des pertes éventuelles.'
        ]
      },
      {
        title: 'Le trading comporte des risques',
        paragraphs: [
          'Le trading crypto comporte des risques importants. La valeur des actifs crypto peut évoluer rapidement et fortement.',
          'Les utilisateurs peuvent perdre une partie ou la totalité du capital investi.',
          'L’utilisation du levier peut augmenter les gains, mais peut aussi accélérer et amplifier les pertes.'
        ]
      },
      {
        title: 'Aucune garantie de profit',
        paragraphs: [
          'L’accès à VolatilityForge, à la salle privée de signaux ou aux exemples de signaux ne garantit aucun profit.',
          'Les performances passées ne garantissent pas les résultats futurs.',
          'Un signal qui semble techniquement ou modellement solide peut tout de même entraîner une perte.'
        ]
      },
      {
        title: 'PnL du modèle et performance',
        paragraphs: [
          'Le PnL du modèle est une estimation calculée par modèle sur la base d’hypothèses fixes, comme un paramètre de risque fixe par signal.',
          'Les résultats du modèle peuvent différer des résultats réels en raison du timing, de l’exécution, des frais, du slippage, de la liquidité, du spread, de la taille de position, du levier et des conditions de marché.',
          'Les chiffres de performance sur ce site sont présentés comme un résultat de modèle et ne doivent pas être lus comme un rendement garanti.'
        ]
      },
      {
        title: 'Salle de signaux et exécution',
        paragraphs: [
          'Les signaux peuvent inclure la direction, la zone d’entrée, l’invalidation, les objectifs et des mises à jour, mais l’utilisateur décide lui-même si, comment et quand un signal est exécuté.',
          'VolatilityForge n’est pas responsable des écarts entre un signal partagé et l’exécution réelle d’un utilisateur.',
          'Les retards, problèmes d’exchange, liquidité, types d’ordres, latence et paramètres personnels peuvent influencer le résultat final.'
        ]
      },
      {
        title: 'Responsabilité personnelle',
        paragraphs: [
          'Chaque utilisateur doit déterminer si le trading crypto correspond à ses connaissances, son expérience, sa situation financière et sa tolérance au risque.',
          'Ne trade jamais avec de l’argent que tu ne peux pas te permettre de perdre.',
          'Si nécessaire, consulte un conseiller financier, juridique ou fiscal indépendant avant de prendre des décisions de trading.'
        ]
      },
      {
        title: 'Modifications et disponibilité',
        paragraphs: [
          'VolatilityForge peut modifier les informations, les tarifs, la structure de la salle de signaux, les fonctionnalités et les conditions.',
          'Il n’y a aucune garantie que les signaux soient toujours disponibles, que des signaux soient publiés quotidiennement ou que l’environnement Discord reste disponible sans interruption.',
          'Ne publier aucun signal peut être un choix volontaire lorsque les conditions de marché ne sont pas suffisamment solides.'
        ]
      }
    ],

    bulletsTitle: 'Résumé',
    bullets: [
      'Aucun conseil financier.',
      'Le trading comporte des risques.',
      'Des pertes sont possibles.',
      'Le PnL du modèle n’est pas une garantie.',
      'Les performances passées ne prédisent pas les résultats futurs.',
      'Les utilisateurs restent responsables de l’exécution et de la gestion du risque.'
    ],

    legalNoteTitle: 'Vérification juridique recommandée',
    legalNote:
      'Fais vérifier juridiquement cet avertissement, tes conditions générales, tes conditions de paiement et tes claims marketing avant de proposer VolatilityForge publiquement comme service payant.',

    finalTitle: 'Retour à VolatilityForge',
    finalText:
      'Consulte la homepage, les tarifs ou la FAQ pour plus de contexte sur la salle privée de signaux.',
    links: [
      ['Homepage', ''],
      ['Tarifs', 'pricing'],
      ['FAQ', 'faq']
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
    title: locale === 'nl' ? 'Risicodisclaimer' : copy.title,
    description: copy.intro
  };
}

export default async function RiskDisclaimerPage({ params }) {
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
        </div>
      </section>

      <section className="section">
        <article className="legalCard">
          {copy.sections.map((section) => (
            <div key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ))}
        </article>
      </section>

      <section className="section twoColumnGrid">
        <article className="panel">
          <p className="kicker">{copy.summaryKicker}</p>
          <h2>{copy.bulletsTitle}</h2>

          <ul className="checkList">
            {copy.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <p className="kicker">{copy.legalKicker}</p>
          <h2>{copy.legalNoteTitle}</h2>
          <p className="lead">{copy.legalNote}</p>
        </article>
      </section>

      <section className="section">
        <article className="panel">
          <p className="kicker">{copy.navigationKicker}</p>
          <h2>{copy.finalTitle}</h2>
          <p className="lead">{copy.finalText}</p>

          <div className="buttonRow">
            {copy.links.map(([label, slug]) => (
              <Link
                key={label}
                className="secondaryButton"
                href={slug ? `/${locale}/${slug}` : `/${locale}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </article>
      </section>
    </SiteShell>
  );
}