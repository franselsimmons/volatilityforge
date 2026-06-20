import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';

const LOCALES = ['nl', 'en', 'de', 'es', 'fr'];

const COPY = {
  nl: {
    title: 'Modelberekende performance voor LONG & SHORT signalen.',
    intro:
      'Deze pagina geeft een duidelijke performance-weergave van de geselecteerde VolatilityForge signaalpools. De cijfers zijn modelberekend en bedoeld als transparante presentatie van het systeem, niet als garantie op toekomstige resultaten.',
    badge: 'Performance',
    primaryCta: 'Vraag toegang aan',
    secondaryCta: 'Bekijk pricing',

    layerLabel: 'VolatilityForge Performance Layer',
    modelBadge: 'Modelberekend',
    flowSignals: 'signalen',
    flowRisk: 'risico',
    flowModel: 'model',
    flowPnl: 'pnl',

    headlineLabel: 'Model-PnL',
    headlineValue: '+49.2%',
    headlineText:
      'Geschatte accountgroei op basis van 0.25% vast risico per signaal over de geselecteerde modelperiode.',

    stats: [
      ['Model-PnL', '+49.2%', 'Geschatte accountgroei bij 0.25% vast risico per signaal'],
      ['Meetperiode', '6 maanden', 'LONG en SHORT samen doorgerekend'],
      ['Gesloten signalen', '232', 'Afgeronde modeluitkomsten in de geselecteerde pool'],
      ['Winstpercentage', '46.8%', 'Gewogen over LONG en SHORT samen'],
      ['Gemiddeld resultaat', '+0.85R', 'Gemiddelde netto uitkomst per gesloten signaal'],
      ['LONG bijdrage', '+31.5%', 'Geschatte bijdrage vanuit LONG-signalen'],
      ['SHORT bijdrage', '+17.7%', 'Geschatte bijdrage vanuit SHORT-signalen'],
      ['Risico per signaal', '0.25%', 'Conservatieve vaste risicoparameter per signaal']
    ],

    longShortKicker: 'LONG / SHORT',
    splitTitle: 'LONG en SHORT apart bekeken.',
    splitText:
      'VolatilityForge is niet gebouwd rond één marktrichting. De performance-presentatie splitst LONG en SHORT zodat leden beter begrijpen waar de model-PnL vandaan komt.',
    splitCards: [
      {
        title: 'LONG signalen',
        value: '+31.5%',
        text: 'Modelbijdrage vanuit geselecteerde LONG-signaalpools bij 0.25% vast risico per signaal.'
      },
      {
        title: 'SHORT signalen',
        value: '+17.7%',
        text: 'Modelbijdrage vanuit geselecteerde SHORT-signaalpools bij 0.25% vast risico per signaal.'
      },
      {
        title: 'Samen',
        value: '+49.2%',
        text: 'Gecombineerde model-PnL van de geselecteerde LONG- en SHORT-signaalpools.'
      }
    ],

    methodKicker: 'Methode',
    methodTitle: 'Hoe deze performance wordt gepresenteerd.',
    methodText:
      'De technische interne data wordt niet publiek gedeeld. De publieke presentatie vertaalt het resultaat naar begrijpelijke handelsbegrippen: model-PnL, gesloten signalen, win rate, gemiddelde uitkomst en risico per signaal.',
    methodSteps: [
      {
        title: '1. Signalen selecteren',
        text: 'Alleen geselecteerde signaalpools worden meegenomen in de publieke performance-presentatie.'
      },
      {
        title: '2. Resultaat in R meten',
        text: 'Uitkomsten worden vertaald naar R, zodat winst en verlies vergelijkbaar blijven ongeacht markt of prijsniveau.'
      },
      {
        title: '3. Vast risico toepassen',
        text: 'De presentatie gebruikt 0.25% vast risico per signaal om een conservatieve model-accountcurve te tonen.'
      },
      {
        title: '4. Resultaat tonen',
        text: 'De uitkomst wordt gepresenteerd als model-PnL, met aparte toelichting voor LONG en SHORT.'
      }
    ],

    riskTitle: 'Belangrijke risicotoelichting',
    riskText:
      'Model-PnL is geen belofte en geen financieel advies. Werkelijke resultaten kunnen afwijken door uitvoering, timing, fees, slippage, positieomvang, leverage, liquiditeit en marktomstandigheden. Trading heeft risico en verliezen zijn mogelijk.',

    verificationKicker: 'Verificatie',
    disclaimerTitle: 'Gebruik vóór livegang echte gecontroleerde data.',
    disclaimerText:
      'Vervang deze modelpresentatie door je definitieve, gecontroleerde en juridisch getoetste performancecijfers voordat je betaalde toegang publiek aanbiedt.',

    accessKicker: 'Toegang',
    finalTitle: 'Wil je toegang tot de private signal room?',
    finalText:
      'Bekijk de membership-opties of start direct een aanvraag. Alle leden krijgen dezelfde private LONG en SHORT signal feed.',
    finalPrimary: 'Aanvraag starten',
    finalSecondary: 'Bekijk pricing'
  },

  en: {
    title: 'Model-calculated performance for LONG & SHORT signals.',
    intro:
      'This page gives a clear performance view of the selected VolatilityForge signal pools. The numbers are model-calculated and intended as transparent system presentation, not as a guarantee of future results.',
    badge: 'Performance',
    primaryCta: 'Request access',
    secondaryCta: 'View pricing',

    layerLabel: 'VolatilityForge Performance Layer',
    modelBadge: 'Model-calculated',
    flowSignals: 'signals',
    flowRisk: 'risk',
    flowModel: 'model',
    flowPnl: 'pnl',

    headlineLabel: 'Model PnL',
    headlineValue: '+49.2%',
    headlineText:
      'Estimated account growth based on 0.25% fixed risk per signal over the selected model period.',

    stats: [
      ['Model PnL', '+49.2%', 'Estimated account growth at 0.25% fixed risk per signal'],
      ['Measured period', '6 months', 'LONG and SHORT calculated together'],
      ['Closed signals', '232', 'Completed model outcomes in the selected pool'],
      ['Win rate', '46.8%', 'Weighted across LONG and SHORT'],
      ['Average result', '+0.85R', 'Average net outcome per closed signal'],
      ['LONG contribution', '+31.5%', 'Estimated contribution from LONG signals'],
      ['SHORT contribution', '+17.7%', 'Estimated contribution from SHORT signals'],
      ['Risk per signal', '0.25%', 'Conservative fixed-risk parameter per signal']
    ],

    longShortKicker: 'LONG / SHORT',
    splitTitle: 'LONG and SHORT separated.',
    splitText:
      'VolatilityForge is not built around one market direction. The performance presentation separates LONG and SHORT so members can understand where the model PnL comes from.',
    splitCards: [
      {
        title: 'LONG signals',
        value: '+31.5%',
        text: 'Model contribution from selected LONG signal pools at 0.25% fixed risk per signal.'
      },
      {
        title: 'SHORT signals',
        value: '+17.7%',
        text: 'Model contribution from selected SHORT signal pools at 0.25% fixed risk per signal.'
      },
      {
        title: 'Combined',
        value: '+49.2%',
        text: 'Combined model PnL from the selected LONG and SHORT signal pools.'
      }
    ],

    methodKicker: 'Method',
    methodTitle: 'How this performance is presented.',
    methodText:
      'The technical internal data is not publicly exposed. The public presentation translates the result into understandable trading terms: model PnL, closed signals, win rate, average outcome and risk per signal.',
    methodSteps: [
      {
        title: '1. Select signals',
        text: 'Only selected signal pools are included in the public performance presentation.'
      },
      {
        title: '2. Measure result in R',
        text: 'Outcomes are translated into R so wins and losses remain comparable across markets and prices.'
      },
      {
        title: '3. Apply fixed risk',
        text: 'The presentation uses 0.25% fixed risk per signal to show a conservative model account curve.'
      },
      {
        title: '4. Present result',
        text: 'The outcome is shown as model PnL, with separate explanation for LONG and SHORT.'
      }
    ],

    riskTitle: 'Important risk explanation',
    riskText:
      'Model PnL is not a promise and not financial advice. Real results can differ because of execution, timing, fees, slippage, position size, leverage, liquidity and market conditions. Trading involves risk and losses are possible.',

    verificationKicker: 'Verification',
    disclaimerTitle: 'Use verified real data before launch.',
    disclaimerText:
      'Replace this model presentation with your final, verified and legally reviewed performance numbers before offering paid access publicly.',

    accessKicker: 'Access',
    finalTitle: 'Want access to the private signal room?',
    finalText:
      'View the membership options or start an application. Every member receives the same private LONG and SHORT signal feed.',
    finalPrimary: 'Start application',
    finalSecondary: 'View pricing'
  },

  de: {
    title: 'Modellberechnete Performance für LONG- und SHORT-Signale.',
    intro:
      'Diese Seite zeigt eine klare Performance-Übersicht der ausgewählten VolatilityForge Signalpools. Die Zahlen sind modellberechnet und dienen als transparente Darstellung des Systems, nicht als Garantie für zukünftige Ergebnisse.',
    badge: 'Performance',
    primaryCta: 'Zugang anfragen',
    secondaryCta: 'Preise ansehen',

    layerLabel: 'VolatilityForge Performance Layer',
    modelBadge: 'Modellberechnet',
    flowSignals: 'signale',
    flowRisk: 'risiko',
    flowModel: 'modell',
    flowPnl: 'pnl',

    headlineLabel: 'Modell-PnL',
    headlineValue: '+49.2%',
    headlineText:
      'Geschätztes Kontowachstum auf Basis von 0.25% festem Risiko pro Signal über die ausgewählte Modellperiode.',

    stats: [
      ['Modell-PnL', '+49.2%', 'Geschätztes Kontowachstum bei 0.25% festem Risiko pro Signal'],
      ['Messperiode', '6 Monate', 'LONG und SHORT gemeinsam berechnet'],
      ['Geschlossene Signale', '232', 'Abgeschlossene Modellergebnisse im ausgewählten Pool'],
      ['Trefferquote', '46.8%', 'Gewichtet über LONG und SHORT zusammen'],
      ['Durchschnittliches Ergebnis', '+0.85R', 'Durchschnittliches Nettoergebnis pro geschlossenem Signal'],
      ['LONG-Beitrag', '+31.5%', 'Geschätzter Beitrag aus LONG-Signalen'],
      ['SHORT-Beitrag', '+17.7%', 'Geschätzter Beitrag aus SHORT-Signalen'],
      ['Risiko pro Signal', '0.25%', 'Konservativer fester Risikoparameter pro Signal']
    ],

    longShortKicker: 'LONG / SHORT',
    splitTitle: 'LONG und SHORT getrennt betrachtet.',
    splitText:
      'VolatilityForge ist nicht auf eine einzige Marktrichtung ausgelegt. Die Performance-Darstellung trennt LONG und SHORT, damit Mitglieder besser verstehen, woher der Modell-PnL stammt.',
    splitCards: [
      {
        title: 'LONG-Signale',
        value: '+31.5%',
        text: 'Modellbeitrag aus ausgewählten LONG-Signalpools bei 0.25% festem Risiko pro Signal.'
      },
      {
        title: 'SHORT-Signale',
        value: '+17.7%',
        text: 'Modellbeitrag aus ausgewählten SHORT-Signalpools bei 0.25% festem Risiko pro Signal.'
      },
      {
        title: 'Kombiniert',
        value: '+49.2%',
        text: 'Kombinierter Modell-PnL aus den ausgewählten LONG- und SHORT-Signalpools.'
      }
    ],

    methodKicker: 'Methode',
    methodTitle: 'Wie diese Performance dargestellt wird.',
    methodText:
      'Die technischen internen Daten werden nicht öffentlich offengelegt. Die öffentliche Darstellung übersetzt das Ergebnis in verständliche Trading-Begriffe: Modell-PnL, geschlossene Signale, Trefferquote, durchschnittliches Ergebnis und Risiko pro Signal.',
    methodSteps: [
      {
        title: '1. Signale auswählen',
        text: 'Nur ausgewählte Signalpools werden in die öffentliche Performance-Darstellung aufgenommen.'
      },
      {
        title: '2. Ergebnis in R messen',
        text: 'Ergebnisse werden in R übersetzt, damit Gewinne und Verluste über Märkte und Preise hinweg vergleichbar bleiben.'
      },
      {
        title: '3. Festes Risiko anwenden',
        text: 'Die Darstellung verwendet 0.25% festes Risiko pro Signal, um eine konservative Modell-Kontokurve zu zeigen.'
      },
      {
        title: '4. Ergebnis darstellen',
        text: 'Das Ergebnis wird als Modell-PnL dargestellt, mit separater Erläuterung für LONG und SHORT.'
      }
    ],

    riskTitle: 'Wichtige Risikoerklärung',
    riskText:
      'Modell-PnL ist kein Versprechen und keine Finanzberatung. Reale Ergebnisse können durch Ausführung, Timing, Gebühren, Slippage, Positionsgröße, Hebel, Liquidität und Marktbedingungen abweichen. Trading beinhaltet Risiko und Verluste sind möglich.',

    verificationKicker: 'Verifizierung',
    disclaimerTitle: 'Verwende vor dem Livegang echte geprüfte Daten.',
    disclaimerText:
      'Ersetze diese Modelldarstellung durch deine finalen, geprüften und rechtlich kontrollierten Performancezahlen, bevor du bezahlten Zugang öffentlich anbietest.',

    accessKicker: 'Zugang',
    finalTitle: 'Möchtest du Zugang zum privaten Signalraum?',
    finalText:
      'Sieh dir die Mitgliedschaftsoptionen an oder starte direkt eine Anfrage. Alle Mitglieder erhalten denselben privaten LONG- und SHORT-Signalfeed.',
    finalPrimary: 'Anfrage starten',
    finalSecondary: 'Preise ansehen'
  },

  es: {
    title: 'Rendimiento calculado por modelo para señales LONG & SHORT.',
    intro:
      'Esta página ofrece una visión clara del rendimiento de los grupos de señales seleccionados de VolatilityForge. Las cifras son calculadas por modelo y están pensadas como presentación transparente del sistema, no como garantía de resultados futuros.',
    badge: 'Rendimiento',
    primaryCta: 'Solicitar acceso',
    secondaryCta: 'Ver precios',

    layerLabel: 'Capa de rendimiento de VolatilityForge',
    modelBadge: 'Calculado por modelo',
    flowSignals: 'señales',
    flowRisk: 'riesgo',
    flowModel: 'modelo',
    flowPnl: 'pnl',

    headlineLabel: 'PnL del modelo',
    headlineValue: '+49.2%',
    headlineText:
      'Crecimiento estimado de cuenta basado en 0.25% de riesgo fijo por señal durante el período de modelo seleccionado.',

    stats: [
      ['PnL del modelo', '+49.2%', 'Crecimiento estimado de cuenta con 0.25% de riesgo fijo por señal'],
      ['Período medido', '6 meses', 'LONG y SHORT calculados en conjunto'],
      ['Señales cerradas', '232', 'Resultados de modelo completados en el grupo seleccionado'],
      ['Tasa de acierto', '46.8%', 'Ponderada entre LONG y SHORT'],
      ['Resultado medio', '+0.85R', 'Resultado neto medio por señal cerrada'],
      ['Contribución LONG', '+31.5%', 'Contribución estimada de señales LONG'],
      ['Contribución SHORT', '+17.7%', 'Contribución estimada de señales SHORT'],
      ['Riesgo por señal', '0.25%', 'Parámetro conservador de riesgo fijo por señal']
    ],

    longShortKicker: 'LONG / SHORT',
    splitTitle: 'LONG y SHORT separados.',
    splitText:
      'VolatilityForge no está construido alrededor de una sola dirección de mercado. La presentación de rendimiento separa LONG y SHORT para que los miembros entiendan mejor de dónde viene el PnL del modelo.',
    splitCards: [
      {
        title: 'Señales LONG',
        value: '+31.5%',
        text: 'Contribución del modelo desde grupos seleccionados de señales LONG con 0.25% de riesgo fijo por señal.'
      },
      {
        title: 'Señales SHORT',
        value: '+17.7%',
        text: 'Contribución del modelo desde grupos seleccionados de señales SHORT con 0.25% de riesgo fijo por señal.'
      },
      {
        title: 'Combinado',
        value: '+49.2%',
        text: 'PnL combinado del modelo desde los grupos seleccionados de señales LONG y SHORT.'
      }
    ],

    methodKicker: 'Método',
    methodTitle: 'Cómo se presenta este rendimiento.',
    methodText:
      'Los datos técnicos internos no se exponen públicamente. La presentación pública traduce el resultado a términos de trading comprensibles: PnL del modelo, señales cerradas, tasa de acierto, resultado medio y riesgo por señal.',
    methodSteps: [
      {
        title: '1. Seleccionar señales',
        text: 'Solo los grupos de señales seleccionados se incluyen en la presentación pública de rendimiento.'
      },
      {
        title: '2. Medir resultado en R',
        text: 'Los resultados se traducen a R para que ganancias y pérdidas sigan siendo comparables entre mercados y precios.'
      },
      {
        title: '3. Aplicar riesgo fijo',
        text: 'La presentación usa 0.25% de riesgo fijo por señal para mostrar una curva de cuenta de modelo conservadora.'
      },
      {
        title: '4. Presentar resultado',
        text: 'El resultado se muestra como PnL del modelo, con explicación separada para LONG y SHORT.'
      }
    ],

    riskTitle: 'Explicación importante de riesgo',
    riskText:
      'El PnL del modelo no es una promesa ni asesoramiento financiero. Los resultados reales pueden diferir por ejecución, timing, comisiones, slippage, tamaño de posición, apalancamiento, liquidez y condiciones de mercado. El trading implica riesgo y las pérdidas son posibles.',

    verificationKicker: 'Verificación',
    disclaimerTitle: 'Usa datos reales verificados antes del lanzamiento.',
    disclaimerText:
      'Reemplaza esta presentación de modelo por tus cifras finales, verificadas y revisadas legalmente antes de ofrecer acceso pagado públicamente.',

    accessKicker: 'Acceso',
    finalTitle: '¿Quieres acceso a la sala privada de señales?',
    finalText:
      'Consulta las opciones de membresía o inicia una solicitud. Todos los miembros reciben el mismo feed privado de señales LONG y SHORT.',
    finalPrimary: 'Iniciar solicitud',
    finalSecondary: 'Ver precios'
  },

  fr: {
    title: 'Performance calculée par modèle pour les signaux LONG & SHORT.',
    intro:
      'Cette page présente clairement la performance des pools de signaux VolatilityForge sélectionnés. Les chiffres sont calculés par modèle et servent à présenter le système avec transparence, sans garantir les résultats futurs.',
    badge: 'Performance',
    primaryCta: 'Demander l’accès',
    secondaryCta: 'Voir les tarifs',

    layerLabel: 'Couche de performance VolatilityForge',
    modelBadge: 'Calculé par modèle',
    flowSignals: 'signaux',
    flowRisk: 'risque',
    flowModel: 'modèle',
    flowPnl: 'pnl',

    headlineLabel: 'PnL du modèle',
    headlineValue: '+49.2%',
    headlineText:
      'Croissance de compte estimée sur la base de 0.25% de risque fixe par signal pendant la période de modèle sélectionnée.',

    stats: [
      ['PnL du modèle', '+49.2%', 'Croissance de compte estimée avec 0.25% de risque fixe par signal'],
      ['Période mesurée', '6 mois', 'LONG et SHORT calculés ensemble'],
      ['Signaux clôturés', '232', 'Résultats de modèle terminés dans le pool sélectionné'],
      ['Taux de réussite', '46.8%', 'Pondéré sur LONG et SHORT ensemble'],
      ['Résultat moyen', '+0.85R', 'Résultat net moyen par signal clôturé'],
      ['Contribution LONG', '+31.5%', 'Contribution estimée des signaux LONG'],
      ['Contribution SHORT', '+17.7%', 'Contribution estimée des signaux SHORT'],
      ['Risque par signal', '0.25%', 'Paramètre conservateur de risque fixe par signal']
    ],

    longShortKicker: 'LONG / SHORT',
    splitTitle: 'LONG et SHORT séparés.',
    splitText:
      'VolatilityForge n’est pas construit autour d’une seule direction de marché. La présentation de performance sépare LONG et SHORT afin que les membres comprennent mieux d’où vient le PnL du modèle.',
    splitCards: [
      {
        title: 'Signaux LONG',
        value: '+31.5%',
        text: 'Contribution du modèle depuis les pools sélectionnés de signaux LONG avec 0.25% de risque fixe par signal.'
      },
      {
        title: 'Signaux SHORT',
        value: '+17.7%',
        text: 'Contribution du modèle depuis les pools sélectionnés de signaux SHORT avec 0.25% de risque fixe par signal.'
      },
      {
        title: 'Combiné',
        value: '+49.2%',
        text: 'PnL combiné du modèle depuis les pools sélectionnés de signaux LONG et SHORT.'
      }
    ],

    methodKicker: 'Méthode',
    methodTitle: 'Comment cette performance est présentée.',
    methodText:
      'Les données techniques internes ne sont pas exposées publiquement. La présentation publique traduit le résultat en termes de trading compréhensibles : PnL du modèle, signaux clôturés, taux de réussite, résultat moyen et risque par signal.',
    methodSteps: [
      {
        title: '1. Sélectionner les signaux',
        text: 'Seuls les pools de signaux sélectionnés sont inclus dans la présentation publique de performance.'
      },
      {
        title: '2. Mesurer le résultat en R',
        text: 'Les résultats sont traduits en R afin que gains et pertes restent comparables entre marchés et niveaux de prix.'
      },
      {
        title: '3. Appliquer un risque fixe',
        text: 'La présentation utilise 0.25% de risque fixe par signal pour afficher une courbe de compte de modèle conservatrice.'
      },
      {
        title: '4. Présenter le résultat',
        text: 'Le résultat est présenté comme PnL du modèle, avec une explication séparée pour LONG et SHORT.'
      }
    ],

    riskTitle: 'Explication importante du risque',
    riskText:
      'Le PnL du modèle n’est pas une promesse et ne constitue pas un conseil financier. Les résultats réels peuvent différer en raison de l’exécution, du timing, des frais, du slippage, de la taille de position, du levier, de la liquidité et des conditions de marché. Le trading comporte des risques et des pertes sont possibles.',

    verificationKicker: 'Vérification',
    disclaimerTitle: 'Utilise des données réelles vérifiées avant le lancement.',
    disclaimerText:
      'Remplace cette présentation de modèle par tes chiffres finaux, vérifiés et validés juridiquement avant de proposer publiquement un accès payant.',

    accessKicker: 'Accès',
    finalTitle: 'Tu veux accéder à la salle privée de signaux ?',
    finalText:
      'Consulte les options d’abonnement ou démarre une demande. Tous les membres reçoivent le même feed privé de signaux LONG et SHORT.',
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
    title: 'Performance',
    description: copy.intro
  };
}

export default async function PerformancePage({ params }) {
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

        <article className="heroPanel">
          <div className="heroPanelTop">
            <span>{copy.layerLabel}</span>
            <em>{copy.modelBadge}</em>
          </div>

          <div className="heroMetric">
            <span>{copy.headlineLabel}</span>
            <strong>{copy.headlineValue}</strong>
            <p>{copy.headlineText}</p>
          </div>

          <div className="flowLine">
            <span>{copy.flowSignals}</span>
            <i />
            <span>{copy.flowRisk}</span>
            <i />
            <span>{copy.flowModel}</span>
            <i />
            <span>{copy.flowPnl}</span>
          </div>
        </article>
      </section>

      <section className="section">
        <div className="statsGrid">
          {copy.stats.map(([label, value, description], index) => (
            <article key={label} className={index === 0 ? 'statCard highlight' : 'statCard'}>
              <span>{label}</span>
              <strong>{value}</strong>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section twoColumnGrid">
        <div className="panel">
          <p className="kicker">{copy.longShortKicker}</p>
          <h2>{copy.splitTitle}</h2>
          <p className="lead">{copy.splitText}</p>
        </div>

        <div className="threeColumnGrid">
          {copy.splitCards.map((card) => (
            <article className="card" key={card.title}>
              <h3>{card.title}</h3>
              <div className="priceValue">
                <strong>{card.value}</strong>
              </div>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="center narrow">
          <p className="kicker">{copy.methodKicker}</p>
          <h2>{copy.methodTitle}</h2>
          <p>{copy.methodText}</p>
        </div>

        <div className="fourColumnGrid">
          {copy.methodSteps.map((step) => (
            <article className="card" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
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

      <section className="section twoColumnGrid">
        <article className="panel">
          <p className="kicker">{copy.verificationKicker}</p>
          <h2>{copy.disclaimerTitle}</h2>
          <p className="lead">{copy.disclaimerText}</p>
        </article>

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