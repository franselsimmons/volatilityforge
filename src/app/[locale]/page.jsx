import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import PricingCards from '@/components/PricingCards';

const LOCALES = ['nl', 'en', 'de', 'es', 'fr'];

const COPY = {
  nl: {
    eyebrow: 'Private LONG & SHORT crypto signals',
    title: 'Een private signal room gebouwd voor selectieve crypto execution.',
    lead:
      'VolatilityForge is gebouwd voor traders die geen ruis willen, maar een gestructureerd proces: selectieve LONG en SHORT crypto signals, duidelijke entry zones, invalidation, targets en risk-first execution via een private Discord signal room.',
    primaryCta: 'Toegang aanvragen',
    secondaryCta: 'Bekijk performance',
    panelStatus: 'Model actief',
    panelMetricLabel: 'Model-PnL',
    panelMetricValue: '+49.2%',
    panelMetricText:
      'Gemeten over 6 maanden met 232 gesloten signalen. Model-PnL is geen garantie voor toekomstige resultaten.',
    statOneLabel: 'Gesloten signalen',
    statOneValue: '232',
    statOneText: 'Alleen gesloten model-signalen binnen de meetperiode.',
    statTwoLabel: 'Win rate',
    statTwoValue: '46.8%',
    statTwoText: 'Risk-first benadering met vaste risicoparameter per signaal.',
    statThreeLabel: 'Average result',
    statThreeValue: '+0.85R',
    statThreeText: 'Resultaat uitgedrukt in R, niet in willekeurige procentclaims.',
    statFourLabel: 'LONG / SHORT',
    statFourValue: '+31.5% / +17.7%',
    statFourText: 'Modelberekende bijdrage uit beide marktrichtingen.',
    flowOne: 'Signal scan',
    flowTwo: 'Entry zone',
    flowThree: 'Risk plan',
    flowFour: 'Targets',
    noticeLabel: 'Risico',
    noticeText:
      'Geen financieel advies. Trading heeft risico. Resultaten uit het verleden en modelberekeningen geven geen garantie voor toekomstige resultaten.',
    sectionEyebrow: 'Waarom VolatilityForge',
    sectionTitle: 'Gebouwd voor traders die structuur willen.',
    sectionLead:
      'Elke signal room kan alerts sturen. Het verschil zit in filtering, risk-first selectie, duidelijke invalidation en discipline rond uitvoering.',
    cardOneTitle: 'LONG & SHORT',
    cardOneText:
      'Signalen kunnen inspelen op zowel stijgende als dalende marktomstandigheden, afhankelijk van de setup.',
    cardTwoTitle: 'Risk-first',
    cardTwoText:
      'Elke setup draait om entry, invalidation en targets. Niet om willekeurige hype of late calls.',
    cardThreeTitle: 'Private Discord',
    cardThreeText:
      'De signalen worden gedeeld in een private omgeving, zodat leden snel en overzichtelijk kunnen handelen.',
    processEyebrow: 'Proces',
    processTitle: 'Van marktscan naar uitvoerbaar signaal.',
    processText:
      'Het systeem is gebouwd rond selectieve signaalselectie. Niet elke beweging is een setup. Alleen situaties met een duidelijke structuur worden omgezet naar een signaal.',
    processItems: [
      'Marktconditie en volatiliteit worden beoordeeld.',
      'LONG of SHORT richting wordt alleen gekozen bij voldoende setup-kwaliteit.',
      'Entry, stop en targets worden vooraf gedefinieerd.',
      'Model-PnL wordt gemeten op gesloten signalen, niet op losse screenshots.'
    ],
    pricingEyebrow: 'Membership',
    pricingTitle: 'Kies je toegang tot de private signal room.',
    pricingLead:
      'Alle plannen geven toegang tot dezelfde private Discord signal room. Er zijn geen VIP-tiers.'
  },

  en: {
    eyebrow: 'Private LONG & SHORT crypto signals',
    title: 'A private signal room built for selective crypto execution.',
    lead:
      'VolatilityForge is built for traders who do not want noise, but a structured process: selective LONG and SHORT crypto signals, clear entry zones, invalidation, targets and risk-first execution through a private Discord signal room.',
    primaryCta: 'Request access',
    secondaryCta: 'View performance',
    panelStatus: 'Model active',
    panelMetricLabel: 'Model PnL',
    panelMetricValue: '+49.2%',
    panelMetricText:
      'Measured over 6 months with 232 closed signals. Model PnL does not guarantee future results.',
    statOneLabel: 'Closed signals',
    statOneValue: '232',
    statOneText: 'Only closed model signals within the measured period.',
    statTwoLabel: 'Win rate',
    statTwoValue: '46.8%',
    statTwoText: 'Risk-first approach with a fixed risk parameter per signal.',
    statThreeLabel: 'Average result',
    statThreeValue: '+0.85R',
    statThreeText: 'Result expressed in R, not in arbitrary percentage claims.',
    statFourLabel: 'LONG / SHORT',
    statFourValue: '+31.5% / +17.7%',
    statFourText: 'Model-calculated contribution from both market directions.',
    flowOne: 'Signal scan',
    flowTwo: 'Entry zone',
    flowThree: 'Risk plan',
    flowFour: 'Targets',
    noticeLabel: 'Risk',
    noticeText:
      'No financial advice. Trading involves risk. Past performance and model calculations do not guarantee future results.',
    sectionEyebrow: 'Why VolatilityForge',
    sectionTitle: 'Built for traders who want structure.',
    sectionLead:
      'Any signal room can send alerts. The difference is filtering, risk-first selection, clear invalidation and discipline around execution.',
    cardOneTitle: 'LONG & SHORT',
    cardOneText:
      'Signals can respond to both rising and falling market conditions, depending on the setup.',
    cardTwoTitle: 'Risk-first',
    cardTwoText:
      'Every setup is centered around entry, invalidation and targets. Not random hype or late calls.',
    cardThreeTitle: 'Private Discord',
    cardThreeText:
      'Signals are shared in a private environment so members can act quickly and clearly.',
    processEyebrow: 'Process',
    processTitle: 'From market scan to executable signal.',
    processText:
      'The system is built around selective signal selection. Not every move is a setup. Only situations with clear structure are turned into a signal.',
    processItems: [
      'Market condition and volatility are evaluated.',
      'LONG or SHORT direction is chosen only when setup quality is sufficient.',
      'Entry, stop and targets are defined in advance.',
      'Model PnL is measured on closed signals, not isolated screenshots.'
    ],
    pricingEyebrow: 'Membership',
    pricingTitle: 'Choose your access to the private signal room.',
    pricingLead:
      'All plans give access to the same private Discord signal room. There are no VIP tiers.'
  },

  de: {
    eyebrow: 'Private LONG & SHORT Krypto-Signale',
    title: 'Ein privater Signalraum für selektive Krypto-Ausführung.',
    lead:
      'VolatilityForge ist für Trader gebaut, die keinen Lärm wollen, sondern einen strukturierten Prozess: selektive LONG- und SHORT-Krypto-Signale, klare Einstiegszonen, Invalidierung, Ziele und risk-first Ausführung über einen privaten Discord-Signalraum.',
    primaryCta: 'Zugang anfragen',
    secondaryCta: 'Performance ansehen',
    panelStatus: 'Modell aktiv',
    panelMetricLabel: 'Modell-PnL',
    panelMetricValue: '+49.2%',
    panelMetricText:
      'Gemessen über 6 Monate mit 232 geschlossenen Signalen. Modell-PnL garantiert keine zukünftigen Ergebnisse.',
    statOneLabel: 'Geschlossene Signale',
    statOneValue: '232',
    statOneText: 'Nur geschlossene Modell-Signale innerhalb des Messzeitraums.',
    statTwoLabel: 'Trefferquote',
    statTwoValue: '46.8%',
    statTwoText: 'Risk-first Ansatz mit festem Risikoparameter pro Signal.',
    statThreeLabel: 'Durchschnittliches Ergebnis',
    statThreeValue: '+0.85R',
    statThreeText: 'Ergebnis in R ausgedrückt, nicht in willkürlichen Prozentangaben.',
    statFourLabel: 'LONG / SHORT',
    statFourValue: '+31.5% / +17.7%',
    statFourText: 'Modellberechneter Beitrag aus beiden Marktrichtungen.',
    flowOne: 'Signal-Scan',
    flowTwo: 'Einstiegszone',
    flowThree: 'Risikoplan',
    flowFour: 'Ziele',
    noticeLabel: 'Risiko',
    noticeText:
      'Keine Finanzberatung. Trading beinhaltet Risiko. Frühere Ergebnisse und Modellberechnungen garantieren keine zukünftigen Resultate.',
    sectionEyebrow: 'Warum VolatilityForge',
    sectionTitle: 'Gebaut für Trader, die Struktur wollen.',
    sectionLead:
      'Jeder Signalraum kann Alerts senden. Der Unterschied liegt in Filterung, risk-first Auswahl, klarer Invalidierung und Disziplin bei der Ausführung.',
    cardOneTitle: 'LONG & SHORT',
    cardOneText:
      'Signale können je nach Setup sowohl auf steigende als auch auf fallende Marktbedingungen reagieren.',
    cardTwoTitle: 'Risk-first',
    cardTwoText:
      'Jedes Setup basiert auf Einstieg, Invalidierung und Zielen. Nicht auf zufälligem Hype oder späten Calls.',
    cardThreeTitle: 'Privater Discord',
    cardThreeText:
      'Signale werden in einer privaten Umgebung geteilt, damit Mitglieder schnell und übersichtlich handeln können.',
    processEyebrow: 'Prozess',
    processTitle: 'Vom Marktscan zum ausführbaren Signal.',
    processText:
      'Das System basiert auf selektiver Signalauswahl. Nicht jede Bewegung ist ein Setup. Nur Situationen mit klarer Struktur werden in ein Signal umgewandelt.',
    processItems: [
      'Marktbedingungen und Volatilität werden bewertet.',
      'LONG- oder SHORT-Richtung wird nur bei ausreichender Setup-Qualität gewählt.',
      'Entry, Stop und Ziele werden vorab definiert.',
      'Modell-PnL wird auf geschlossene Signale gemessen, nicht auf einzelne Screenshots.'
    ],
    pricingEyebrow: 'Mitgliedschaft',
    pricingTitle: 'Wähle deinen Zugang zum privaten Signalraum.',
    pricingLead:
      'Alle Pläne geben Zugang zum gleichen privaten Discord-Signalraum. Es gibt keine VIP-Stufen.'
  },

  es: {
    eyebrow: 'Señales cripto privadas LONG & SHORT',
    title: 'Una sala privada de señales creada para ejecución cripto selectiva.',
    lead:
      'VolatilityForge está construido para traders que no quieren ruido, sino un proceso estructurado: señales cripto LONG y SHORT selectivas, zonas de entrada claras, invalidación, objetivos y ejecución centrada en el riesgo mediante una sala privada de Discord.',
    primaryCta: 'Solicitar acceso',
    secondaryCta: 'Ver rendimiento',
    panelStatus: 'Modelo activo',
    panelMetricLabel: 'PnL del modelo',
    panelMetricValue: '+49.2%',
    panelMetricText:
      'Medido durante 6 meses con 232 señales cerradas. El PnL del modelo no garantiza resultados futuros.',
    statOneLabel: 'Señales cerradas',
    statOneValue: '232',
    statOneText: 'Solo señales del modelo cerradas dentro del período medido.',
    statTwoLabel: 'Tasa de acierto',
    statTwoValue: '46.8%',
    statTwoText: 'Enfoque risk-first con parámetro de riesgo fijo por señal.',
    statThreeLabel: 'Resultado medio',
    statThreeValue: '+0.85R',
    statThreeText: 'Resultado expresado en R, no en reclamos porcentuales arbitrarios.',
    statFourLabel: 'LONG / SHORT',
    statFourValue: '+31.5% / +17.7%',
    statFourText: 'Contribución calculada por el modelo desde ambas direcciones del mercado.',
    flowOne: 'Escaneo de señal',
    flowTwo: 'Zona de entrada',
    flowThree: 'Plan de riesgo',
    flowFour: 'Objetivos',
    noticeLabel: 'Riesgo',
    noticeText:
      'No es asesoramiento financiero. El trading implica riesgo. El rendimiento pasado y los cálculos del modelo no garantizan resultados futuros.',
    sectionEyebrow: 'Por qué VolatilityForge',
    sectionTitle: 'Creado para traders que quieren estructura.',
    sectionLead:
      'Cualquier sala de señales puede enviar alertas. La diferencia está en el filtrado, la selección risk-first, la invalidación clara y la disciplina de ejecución.',
    cardOneTitle: 'LONG & SHORT',
    cardOneText:
      'Las señales pueden responder tanto a mercados alcistas como bajistas, dependiendo del setup.',
    cardTwoTitle: 'Risk-first',
    cardTwoText:
      'Cada setup se centra en entrada, invalidación y objetivos. No en hype aleatorio ni llamadas tardías.',
    cardThreeTitle: 'Discord privado',
    cardThreeText:
      'Las señales se comparten en un entorno privado para que los miembros puedan actuar de forma rápida y clara.',
    processEyebrow: 'Proceso',
    processTitle: 'Del escaneo de mercado a una señal ejecutable.',
    processText:
      'El sistema está construido alrededor de la selección selectiva de señales. No cada movimiento es un setup. Solo situaciones con estructura clara se convierten en señal.',
    processItems: [
      'Se evalúan la condición del mercado y la volatilidad.',
      'La dirección LONG o SHORT solo se elige cuando la calidad del setup es suficiente.',
      'Entrada, stop y objetivos se definen por adelantado.',
      'El PnL del modelo se mide sobre señales cerradas, no sobre capturas aisladas.'
    ],
    pricingEyebrow: 'Membresía',
    pricingTitle: 'Elige tu acceso a la sala privada de señales.',
    pricingLead:
      'Todos los planes dan acceso a la misma sala privada de Discord. No hay niveles VIP.'
  },

  fr: {
    eyebrow: 'Signaux crypto privés LONG & SHORT',
    title: 'Une salle privée de signaux conçue pour une exécution crypto sélective.',
    lead:
      'VolatilityForge est conçu pour les traders qui ne veulent pas de bruit, mais un processus structuré : signaux crypto LONG et SHORT sélectifs, zones d’entrée claires, invalidation, objectifs et exécution centrée sur le risque via une salle privée Discord.',
    primaryCta: 'Demander l’accès',
    secondaryCta: 'Voir la performance',
    panelStatus: 'Modèle actif',
    panelMetricLabel: 'PnL du modèle',
    panelMetricValue: '+49.2%',
    panelMetricText:
      'Mesuré sur 6 mois avec 232 signaux clôturés. Le PnL du modèle ne garantit pas les résultats futurs.',
    statOneLabel: 'Signaux clôturés',
    statOneValue: '232',
    statOneText: 'Uniquement les signaux du modèle clôturés pendant la période mesurée.',
    statTwoLabel: 'Taux de réussite',
    statTwoValue: '46.8%',
    statTwoText: 'Approche risk-first avec paramètre de risque fixe par signal.',
    statThreeLabel: 'Résultat moyen',
    statThreeValue: '+0.85R',
    statThreeText: 'Résultat exprimé en R, pas en promesses de pourcentage arbitraires.',
    statFourLabel: 'LONG / SHORT',
    statFourValue: '+31.5% / +17.7%',
    statFourText: 'Contribution calculée par le modèle dans les deux directions de marché.',
    flowOne: 'Scan du signal',
    flowTwo: 'Zone d’entrée',
    flowThree: 'Plan de risque',
    flowFour: 'Objectifs',
    noticeLabel: 'Risque',
    noticeText:
      'Aucun conseil financier. Le trading comporte des risques. Les performances passées et les calculs du modèle ne garantissent pas les résultats futurs.',
    sectionEyebrow: 'Pourquoi VolatilityForge',
    sectionTitle: 'Conçu pour les traders qui veulent de la structure.',
    sectionLead:
      'N’importe quelle salle de signaux peut envoyer des alertes. La différence se trouve dans le filtrage, la sélection risk-first, l’invalidation claire et la discipline d’exécution.',
    cardOneTitle: 'LONG & SHORT',
    cardOneText:
      'Les signaux peuvent répondre aux marchés haussiers comme baissiers, selon le setup.',
    cardTwoTitle: 'Risk-first',
    cardTwoText:
      'Chaque setup est centré sur l’entrée, l’invalidation et les objectifs. Pas sur le hype ou des appels tardifs.',
    cardThreeTitle: 'Discord privé',
    cardThreeText:
      'Les signaux sont partagés dans un environnement privé pour permettre aux membres d’agir rapidement et clairement.',
    processEyebrow: 'Processus',
    processTitle: 'Du scan de marché au signal exécutable.',
    processText:
      'Le système est construit autour d’une sélection sélective des signaux. Chaque mouvement n’est pas un setup. Seules les situations avec une structure claire deviennent un signal.',
    processItems: [
      'La condition du marché et la volatilité sont évaluées.',
      'La direction LONG ou SHORT n’est choisie que si la qualité du setup est suffisante.',
      'L’entrée, le stop et les objectifs sont définis à l’avance.',
      'Le PnL du modèle est mesuré sur des signaux clôturés, pas sur des captures isolées.'
    ],
    pricingEyebrow: 'Abonnement',
    pricingTitle: 'Choisis ton accès à la salle privée de signaux.',
    pricingLead:
      'Tous les plans donnent accès à la même salle privée Discord. Il n’y a pas de niveaux VIP.'
  }
};

function getCopy(locale) {
  return COPY[locale] || COPY.nl;
}

export default async function LocaleHomePage({ params }) {
  const resolvedParams = await params;
  const safeLocale = LOCALES.includes(resolvedParams?.locale) ? resolvedParams.locale : 'nl';
  const copy = getCopy(safeLocale);

  return (
    <SiteShell locale={safeLocale}>
      <section className="hero">
        <div className="heroCopy">
          <span className="eyebrow">{copy.eyebrow}</span>
          <h1>{copy.title}</h1>
          <p className="lead">{copy.lead}</p>

          <div className="buttonRow">
            <Link className="primaryButton" href={`/${safeLocale}/apply`}>
              {copy.primaryCta}
            </Link>

            <Link className="secondaryButton" href={`/${safeLocale}/performance`}>
              {copy.secondaryCta}
            </Link>
          </div>
        </div>

        <aside className="heroPanel">
          <div className="heroPanelTop">
            <span>VolatilityForge</span>
            <em>{copy.panelStatus}</em>
          </div>

          <div className="heroMetric">
            <span>{copy.panelMetricLabel}</span>
            <strong>{copy.panelMetricValue}</strong>
            <p>{copy.panelMetricText}</p>
          </div>

          <div className="heroPanelGrid">
            <div>
              <span>{copy.statOneLabel}</span>
              <strong>{copy.statOneValue}</strong>
            </div>

            <div>
              <span>{copy.statTwoLabel}</span>
              <strong>{copy.statTwoValue}</strong>
            </div>

            <div>
              <span>{copy.statThreeLabel}</span>
              <strong>{copy.statThreeValue}</strong>
            </div>

            <div>
              <span>{copy.statFourLabel}</span>
              <strong>{copy.statFourValue}</strong>
            </div>
          </div>

          <div className="flowLine">
            <span>{copy.flowOne}</span>
            <i />
            <span>{copy.flowTwo}</span>
            <i />
            <span>{copy.flowThree}</span>
            <i />
            <span>{copy.flowFour}</span>
          </div>
        </aside>
      </section>

      <div className="noticeCard">
        <span>{copy.noticeLabel}</span>
        <p>{copy.noticeText}</p>
      </div>

      <section className="section">
        <div className="center narrow">
          <span className="eyebrow">{copy.sectionEyebrow}</span>
          <h2>{copy.sectionTitle}</h2>
          <p className="lead">{copy.sectionLead}</p>
        </div>

        <div className="threeColumnGrid">
          <article className="card">
            <h3>{copy.cardOneTitle}</h3>
            <p>{copy.cardOneText}</p>
          </article>

          <article className="card">
            <h3>{copy.cardTwoTitle}</h3>
            <p>{copy.cardTwoText}</p>
          </article>

          <article className="card">
            <h3>{copy.cardThreeTitle}</h3>
            <p>{copy.cardThreeText}</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="twoColumnGrid">
          <div className="panel">
            <span className="eyebrow">{copy.processEyebrow}</span>
            <h2>{copy.processTitle}</h2>
            <p>{copy.processText}</p>
          </div>

          <div className="panel">
            <ul className="checkList">
              {copy.processItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="center narrow">
          <span className="eyebrow">{copy.pricingEyebrow}</span>
          <h2>{copy.pricingTitle}</h2>
          <p className="lead">{copy.pricingLead}</p>
        </div>

        <PricingCards locale={safeLocale} />
      </section>
    </SiteShell>
  );
}