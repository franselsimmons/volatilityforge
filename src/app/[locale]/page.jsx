// ================= FILE FROM ROOT: src/app/[locale]/page.jsx =================

import Link from 'next/link';
import { notFound } from 'next/navigation';

const LOCALES = ['en', 'nl', 'de', 'es', 'fr'];

const PRICES = [
  {
    key: 'monthly',
    price: '€99',
    term: {
      en: '/ month',
      nl: '/ maand',
      de: '/ Monat',
      es: '/ mes',
      fr: '/ mois'
    },
    label: {
      en: 'Monthly',
      nl: 'Maandelijks',
      de: 'Monatlich',
      es: 'Mensual',
      fr: 'Mensuel'
    },
    note: {
      en: 'Maximum flexibility',
      nl: 'Maximale flexibiliteit',
      de: 'Maximale Flexibilität',
      es: 'Máxima flexibilidad',
      fr: 'Flexibilité maximale'
    }
  },
  {
    key: 'quarterly',
    price: '€249',
    term: {
      en: '/ 3 months',
      nl: '/ 3 maanden',
      de: '/ 3 Monate',
      es: '/ 3 meses',
      fr: '/ 3 mois'
    },
    label: {
      en: 'Quarterly',
      nl: 'Per kwartaal',
      de: 'Quartal',
      es: 'Trimestral',
      fr: 'Trimestriel'
    },
    note: {
      en: 'Most selected',
      nl: 'Meest gekozen',
      de: 'Am häufigsten gewählt',
      es: 'Más elegido',
      fr: 'Le plus choisi'
    },
    highlighted: true
  },
  {
    key: 'semiannual',
    price: '€449',
    term: {
      en: '/ 6 months',
      nl: '/ 6 maanden',
      de: '/ 6 Monate',
      es: '/ 6 meses',
      fr: '/ 6 mois'
    },
    label: {
      en: 'Semi-annual',
      nl: 'Halfjaar',
      de: 'Halbjährlich',
      es: 'Semestral',
      fr: 'Semestriel'
    },
    note: {
      en: 'Lower monthly average',
      nl: 'Lagere maandgemiddelde',
      de: 'Niedrigerer Monatsdurchschnitt',
      es: 'Promedio mensual más bajo',
      fr: 'Moyenne mensuelle plus basse'
    }
  },
  {
    key: 'annual',
    price: '€799',
    term: {
      en: '/ year',
      nl: '/ jaar',
      de: '/ Jahr',
      es: '/ año',
      fr: '/ an'
    },
    label: {
      en: 'Annual',
      nl: 'Jaarlijks',
      de: 'Jährlich',
      es: 'Anual',
      fr: 'Annuel'
    },
    note: {
      en: 'Best value',
      nl: 'Beste waarde',
      de: 'Bester Wert',
      es: 'Mejor valor',
      fr: 'Meilleure valeur'
    }
  }
];

const COPY = {
  en: {
    nav: {
      system: 'System',
      format: 'Signal format',
      pricing: 'Pricing',
      faq: 'FAQ'
    },
    badge: 'Private Discord signals for crypto traders',
    heroTitle: 'LONG & SHORT crypto signals without the noise.',
    heroText:
      'VolatilityForge is one private Discord group for traders who want fewer random calls and stricter selection. Members receive LONG and SHORT crypto signals only when direction, setup quality and risk line up.',
    primaryCta: 'Request access',
    secondaryCta: 'View pricing',
    trustItems: ['One private group', 'LONG + SHORT', 'Entry / stop / targets', 'No overtrading'],
    productTitle: 'One product. One standard.',
    productText:
      'Every member receives the same signal feed. No artificial VIP tiers. The only difference is subscription length.',
    includedTitle: 'What members receive',
    included: [
      'LONG and SHORT crypto signals in Discord',
      'Clear direction, entry zone, stop level and target zones',
      'Updates when a signal changes or becomes invalid',
      'Daily recap when market activity is relevant',
      'No signal when the market does not meet the filter'
    ],
    systemTitle: 'How the signal engine is presented publicly',
    systemText:
      'The internal engine stays private. The public explanation is simple: the system filters direction, market condition, setup quality and risk before a signal can reach Discord.',
    systemSteps: [
      {
        k: '01',
        t: 'Direction filter',
        d: 'LONG and SHORT conditions are evaluated separately, so the process does not force trades in the wrong market.'
      },
      {
        k: '02',
        t: 'Setup quality',
        d: 'A trade idea needs enough structure before it becomes a member signal. Weak opportunities are ignored.'
      },
      {
        k: '03',
        t: 'Risk gate',
        d: 'A signal must have a clear invalidation level and realistic target logic before it is shared.'
      },
      {
        k: '04',
        t: 'Discord delivery',
        d: 'Members receive a clean message: direction, entry, stop, targets and follow-up updates when needed.'
      }
    ],
    formatTitle: 'Member signal format',
    formatText:
      'The signal format is built to be clear quickly. No hidden language. No messy screenshots without context.',
    signalExampleTitle: 'Example layout',
    signalExample: [
      ['Direction', 'LONG or SHORT'],
      ['Market', 'Crypto pair'],
      ['Entry', 'Defined entry zone'],
      ['Risk', 'Stop level / invalidation'],
      ['Targets', 'Target 1, Target 2, Target 3'],
      ['Status', 'Active / updated / invalidated']
    ],
    proofTitle: 'Built to avoid the signal-group cliché',
    proofText:
      'Most groups try to look active. VolatilityForge is positioned around selection. The goal is not more calls. The goal is better calls.',
    proofCards: [
      ['Less noise', 'No forced daily trade count.'],
      ['Clear risk', 'Every signal needs a visible invalidation point.'],
      ['Same feed', 'All paid members receive the same LONG and SHORT signals.'],
      ['Private execution', 'Live entries stay inside the member Discord.']
    ],
    pricingTitle: 'Membership pricing',
    pricingText:
      'One private Discord signal group. Pricing changes only by subscription length.',
    pricingIncludedTitle: 'All memberships include',
    pricingIncluded: [
      'Private Discord access',
      'LONG and SHORT crypto signals',
      'Entry, stop and target zones',
      'Signal updates',
      'Risk-first signal format'
    ],
    finalTitle: 'Built for traders who want signal discipline, not noise.',
    finalText:
      'Request access when you want the private Discord feed. VolatilityForge keeps the offer simple: one group, one standard, LONG and SHORT signals.',
    faqTitle: 'FAQ',
    faqs: [
      ['Is this financial advice?', 'No. VolatilityForge is not financial advice. Trading involves risk and losses are possible.'],
      ['Do members receive both LONG and SHORT signals?', 'Yes. The private Discord feed contains both LONG and SHORT crypto signals when the filter allows them.'],
      ['Are there multiple VIP tiers?', 'No. There is one signal group. Subscription length changes the price, not the quality of signals.'],
      ['Do you send signals every day?', 'Only when the market meets the filter. No-trade days are part of a disciplined process.']
    ],
    disclaimer:
      'No financial advice. Trading involves risk. Past performance does not guarantee future results.'
  },
  nl: {
    nav: {
      system: 'Systeem',
      format: 'Signaalformat',
      pricing: 'Prijzen',
      faq: 'FAQ'
    },
    badge: 'Private Discord-signalen voor crypto traders',
    heroTitle: 'LONG & SHORT crypto-signalen zonder ruis.',
    heroText:
      'VolatilityForge is één private Discord-groep voor traders die minder willekeurige calls en strengere selectie willen. Leden krijgen LONG en SHORT crypto-signalen alleen wanneer richting, setupkwaliteit en risico logisch samenkomen.',
    primaryCta: 'Vraag toegang aan',
    secondaryCta: 'Bekijk prijzen',
    trustItems: ['Eén private groep', 'LONG + SHORT', 'Entry / stop / targets', 'Geen overtrading'],
    productTitle: 'Eén product. Eén standaard.',
    productText:
      'Elk lid krijgt dezelfde signalenfeed. Geen kunstmatige VIP-lagen. Het enige verschil is de abonnementsduur.',
    includedTitle: 'Wat leden krijgen',
    included: [
      'LONG en SHORT crypto-signalen in Discord',
      'Duidelijke richting, entry-zone, stop-level en targets',
      'Updates wanneer een signaal verandert of ongeldig wordt',
      'Dagelijkse recap wanneer de marktactiviteit relevant is',
      'Geen signaal wanneer de markt niet door het filter komt'
    ],
    systemTitle: 'Hoe we het handelssysteem publiek uitleggen',
    systemText:
      'De interne motor blijft privé. De publieke uitleg is simpel: het systeem filtert richting, marktconditie, setupkwaliteit en risico voordat een signaal Discord bereikt.',
    systemSteps: [
      {
        k: '01',
        t: 'Richtingsfilter',
        d: 'LONG en SHORT worden apart beoordeeld, zodat het proces geen trades forceert in de verkeerde markt.'
      },
      {
        k: '02',
        t: 'Setupkwaliteit',
        d: 'Een trade-idee moet genoeg structuur hebben voordat het een member-signaal wordt. Zwakke kansen worden genegeerd.'
      },
      {
        k: '03',
        t: 'Risicopoort',
        d: 'Een signaal moet een duidelijke invalidatie en realistische targetlogica hebben voordat het gedeeld wordt.'
      },
      {
        k: '04',
        t: 'Discord-delivery',
        d: 'Leden krijgen een strak bericht: richting, entry, stop, targets en updates wanneer nodig.'
      }
    ],
    formatTitle: 'Member signaalformat',
    formatText:
      'Het signaalformat is gemaakt om snel duidelijk te zijn. Geen verborgen taal. Geen rommelige screenshots zonder context.',
    signalExampleTitle: 'Voorbeeldopbouw',
    signalExample: [
      ['Richting', 'LONG of SHORT'],
      ['Market', 'Crypto pair'],
      ['Entry', 'Duidelijke entry-zone'],
      ['Risk', 'Stop-level / invalidatie'],
      ['Targets', 'Target 1, Target 2, Target 3'],
      ['Status', 'Actief / update / ongeldig']
    ],
    proofTitle: 'Gebouwd om niet als standaard signalengroep te voelen',
    proofText:
      'Veel groepen willen vooral actief lijken. VolatilityForge draait om selectie. Het doel is niet meer calls. Het doel is betere calls.',
    proofCards: [
      ['Minder ruis', 'Geen geforceerd aantal trades per dag.'],
      ['Duidelijk risico', 'Elk signaal heeft een zichtbaar invalidatiepunt.'],
      ['Dezelfde feed', 'Alle betalende leden krijgen dezelfde LONG en SHORT signalen.'],
      ['Private uitvoering', 'Live entries blijven binnen de member-Discord.']
    ],
    pricingTitle: 'Membership-prijzen',
    pricingText:
      'Eén private Discord-signaalgroep. De prijs verandert alleen door de abonnementsduur.',
    pricingIncludedTitle: 'Alle memberships bevatten',
    pricingIncluded: [
      'Private Discord-toegang',
      'LONG en SHORT crypto-signalen',
      'Entry, stop en target-zones',
      'Signaalupdates',
      'Risico-eerst signaalformat'
    ],
    finalTitle: 'Gebouwd voor traders die discipline willen, geen ruis.',
    finalText:
      'Vraag toegang aan wanneer je de private Discord-feed wilt. VolatilityForge houdt het aanbod simpel: één groep, één standaard, LONG en SHORT signalen.',
    faqTitle: 'FAQ',
    faqs: [
      ['Is dit financieel advies?', 'Nee. VolatilityForge is geen financieel advies. Trading heeft risico en verliezen zijn mogelijk.'],
      ['Krijgen leden LONG én SHORT signalen?', 'Ja. De private Discord-feed bevat LONG en SHORT crypto-signalen wanneer het filter ze toelaat.'],
      ['Zijn er meerdere VIP-lagen?', 'Nee. Er is één signaalgroep. De abonnementsduur verandert de prijs, niet de kwaliteit van de signalen.'],
      ['Sturen jullie elke dag signalen?', 'Alleen wanneer de markt door het filter komt. Geen-trade dagen horen bij een gedisciplineerd proces.']
    ],
    disclaimer:
      'Geen financieel advies. Trading heeft risico. Resultaten uit het verleden geven geen garantie voor de toekomst.'
  },
  de: {
    nav: { system: 'System', format: 'Signalformat', pricing: 'Preise', faq: 'FAQ' },
    badge: 'Private Discord-Signale für Krypto-Trader',
    heroTitle: 'LONG & SHORT Krypto-Signale ohne Lärm.',
    heroText:
      'VolatilityForge ist eine private Discord-Gruppe für Trader, die weniger zufällige Calls und strengere Auswahl wollen. Mitglieder erhalten LONG- und SHORT-Signale nur, wenn Richtung, Setup-Qualität und Risiko zusammenpassen.',
    primaryCta: 'Zugang anfragen',
    secondaryCta: 'Preise ansehen',
    trustItems: ['Eine private Gruppe', 'LONG + SHORT', 'Entry / Stop / Targets', 'Kein Overtrading'],
    productTitle: 'Ein Produkt. Ein Standard.',
    productText: 'Alle Mitglieder erhalten denselben Signalfeed. Keine künstlichen VIP-Stufen. Nur die Laufzeit ändert den Preis.',
    includedTitle: 'Was Mitglieder erhalten',
    included: ['LONG- und SHORT-Signale in Discord', 'Klare Richtung, Entry-Zone, Stop und Targets', 'Updates bei Änderung oder Invalidierung', 'Recap bei relevanter Marktaktivität', 'Kein Signal, wenn der Markt nicht passt'],
    systemTitle: 'Wie das System öffentlich erklärt wird',
    systemText: 'Der interne Motor bleibt privat. Öffentlich erklären wir nur: Richtung, Marktbedingung, Setup-Qualität und Risiko werden gefiltert, bevor ein Signal Discord erreicht.',
    systemSteps: [
      { k: '01', t: 'Richtungsfilter', d: 'LONG und SHORT werden getrennt bewertet, damit keine Trades im falschen Markt erzwungen werden.' },
      { k: '02', t: 'Setup-Qualität', d: 'Eine Idee braucht genug Struktur, bevor sie ein Mitgliedersignal wird.' },
      { k: '03', t: 'Risikotor', d: 'Ein Signal braucht eine klare Invalidierung und realistische Target-Logik.' },
      { k: '04', t: 'Discord-Lieferung', d: 'Mitglieder erhalten Richtung, Entry, Stop, Targets und nötige Updates.' }
    ],
    formatTitle: 'Signalformat für Mitglieder',
    formatText: 'Das Format ist auf schnelle Klarheit ausgelegt. Keine versteckte Sprache. Kein Chaos ohne Kontext.',
    signalExampleTitle: 'Beispielaufbau',
    signalExample: [['Richtung', 'LONG oder SHORT'], ['Markt', 'Krypto-Paar'], ['Entry', 'Definierte Entry-Zone'], ['Risiko', 'Stop / Invalidierung'], ['Targets', 'Target 1, Target 2, Target 3'], ['Status', 'Aktiv / Update / Invalidiert']],
    proofTitle: 'Gebaut gegen das Signalgruppen-Klischee',
    proofText: 'Viele Gruppen wollen aktiv wirken. VolatilityForge steht für Auswahl: nicht mehr Calls, sondern bessere Calls.',
    proofCards: [['Weniger Lärm', 'Kein erzwungenes tägliches Trade-Ziel.'], ['Klares Risiko', 'Jedes Signal braucht eine sichtbare Invalidierung.'], ['Gleicher Feed', 'Alle Mitglieder erhalten dieselben Signale.'], ['Private Ausführung', 'Live Entries bleiben im Discord.']],
    pricingTitle: 'Membership-Preise',
    pricingText: 'Eine private Discord-Signalgruppe. Der Preis ändert sich nur durch die Laufzeit.',
    pricingIncludedTitle: 'Alle Memberships enthalten',
    pricingIncluded: ['Private Discord-Zugang', 'LONG- und SHORT-Signale', 'Entry, Stop und Targets', 'Signal-Updates', 'Risiko-zuerst Signalformat'],
    finalTitle: 'Für Trader, die Disziplin wollen, nicht Lärm.',
    finalText: 'Zugang anfragen für den privaten Discord-Feed. Ein Gruppe, ein Standard, LONG und SHORT Signale.',
    faqTitle: 'FAQ',
    faqs: [['Ist das Finanzberatung?', 'Nein. Trading ist riskant und Verluste sind möglich.'], ['Gibt es LONG und SHORT?', 'Ja, wenn der Filter sie zulässt.'], ['Gibt es VIP-Stufen?', 'Nein. Eine Gruppe, gleiche Signale.'], ['Gibt es täglich Signale?', 'Nur wenn der Markt passt.']],
    disclaimer: 'Keine Finanzberatung. Trading beinhaltet Risiko. Vergangene Ergebnisse garantieren keine Zukunft.'
  },
  es: {
    nav: { system: 'Sistema', format: 'Formato', pricing: 'Precios', faq: 'FAQ' },
    badge: 'Señales privadas de Discord para traders cripto',
    heroTitle: 'Señales LONG & SHORT cripto sin ruido.',
    heroText: 'VolatilityForge es un grupo privado de Discord para traders que quieren menos llamadas aleatorias y una selección más estricta. Los miembros reciben señales LONG y SHORT cuando dirección, setup y riesgo encajan.',
    primaryCta: 'Solicitar acceso',
    secondaryCta: 'Ver precios',
    trustItems: ['Un grupo privado', 'LONG + SHORT', 'Entry / stop / targets', 'Sin overtrading'],
    productTitle: 'Un producto. Un estándar.',
    productText: 'Todos reciben el mismo feed. Sin niveles VIP artificiales. Solo cambia la duración de la suscripción.',
    includedTitle: 'Qué reciben los miembros',
    included: ['Señales LONG y SHORT en Discord', 'Dirección, entrada, stop y objetivos claros', 'Actualizaciones si cambia o se invalida', 'Resumen cuando el mercado lo justifica', 'Sin señal si el filtro no pasa'],
    systemTitle: 'Cómo se explica el sistema públicamente',
    systemText: 'El motor interno sigue privado. La explicación pública es simple: dirección, condición de mercado, calidad de setup y riesgo antes de Discord.',
    systemSteps: [
      { k: '01', t: 'Filtro de dirección', d: 'LONG y SHORT se evalúan por separado.' },
      { k: '02', t: 'Calidad del setup', d: 'Una idea necesita estructura antes de convertirse en señal.' },
      { k: '03', t: 'Puerta de riesgo', d: 'Debe existir invalidación clara y objetivos realistas.' },
      { k: '04', t: 'Entrega en Discord', d: 'Mensaje limpio con dirección, entrada, stop, objetivos y updates.' }
    ],
    formatTitle: 'Formato de señal',
    formatText: 'Diseñado para claridad rápida. Sin lenguaje oculto ni capturas sin contexto.',
    signalExampleTitle: 'Ejemplo',
    signalExample: [['Dirección', 'LONG o SHORT'], ['Mercado', 'Par cripto'], ['Entrada', 'Zona definida'], ['Riesgo', 'Stop / invalidación'], ['Objetivos', 'Target 1, Target 2, Target 3'], ['Estado', 'Activa / update / invalidada']],
    proofTitle: 'Diseñado para no parecer otro grupo ruidoso',
    proofText: 'Muchos grupos quieren parecer activos. VolatilityForge se centra en selección: no más calls, mejores calls.',
    proofCards: [['Menos ruido', 'Sin número diario forzado.'], ['Riesgo claro', 'Cada señal necesita invalidación visible.'], ['Mismo feed', 'Todos reciben las mismas señales.'], ['Ejecución privada', 'Las entradas live quedan en Discord.']],
    pricingTitle: 'Precios',
    pricingText: 'Un grupo privado de señales. El precio cambia solo por duración.',
    pricingIncludedTitle: 'Incluido',
    pricingIncluded: ['Acceso privado a Discord', 'Señales LONG y SHORT', 'Entry, stop y targets', 'Updates', 'Formato risk-first'],
    finalTitle: 'Para traders que quieren disciplina, no ruido.',
    finalText: 'Solicita acceso al feed privado de Discord. Un grupo, un estándar, señales LONG y SHORT.',
    faqTitle: 'FAQ',
    faqs: [['¿Es asesoramiento financiero?', 'No. Trading implica riesgo y pérdidas posibles.'], ['¿Hay LONG y SHORT?', 'Sí, cuando el filtro lo permite.'], ['¿Hay niveles VIP?', 'No. Un grupo, mismas señales.'], ['¿Hay señales cada día?', 'Solo cuando el mercado pasa el filtro.']],
    disclaimer: 'No es asesoramiento financiero. Trading implica riesgo. Resultados pasados no garantizan resultados futuros.'
  },
  fr: {
    nav: { system: 'Système', format: 'Format', pricing: 'Prix', faq: 'FAQ' },
    badge: 'Signaux Discord privés pour traders crypto',
    heroTitle: 'Signaux crypto LONG & SHORT sans bruit.',
    heroText: 'VolatilityForge est un groupe Discord privé pour traders qui veulent moins de calls aléatoires et une sélection plus stricte. Les membres reçoivent des signaux LONG et SHORT quand direction, setup et risque sont alignés.',
    primaryCta: 'Demander accès',
    secondaryCta: 'Voir les prix',
    trustItems: ['Un groupe privé', 'LONG + SHORT', 'Entry / stop / targets', 'Pas d’overtrading'],
    productTitle: 'Un produit. Un standard.',
    productText: 'Tous les membres reçoivent le même feed. Pas de niveaux VIP artificiels. Seule la durée change le prix.',
    includedTitle: 'Ce que les membres reçoivent',
    included: ['Signaux LONG et SHORT dans Discord', 'Direction, zone d’entrée, stop et targets clairs', 'Updates en cas de changement ou invalidation', 'Recap quand le marché le justifie', 'Aucun signal si le filtre ne valide pas'],
    systemTitle: 'Comment le système est expliqué publiquement',
    systemText: 'Le moteur interne reste privé. L’explication publique est simple : direction, condition du marché, qualité du setup et risque avant Discord.',
    systemSteps: [
      { k: '01', t: 'Filtre directionnel', d: 'LONG et SHORT sont évalués séparément.' },
      { k: '02', t: 'Qualité du setup', d: 'Une idée doit avoir assez de structure avant de devenir un signal.' },
      { k: '03', t: 'Porte de risque', d: 'Un signal doit avoir une invalidation claire et des targets réalistes.' },
      { k: '04', t: 'Livraison Discord', d: 'Message clair avec direction, entry, stop, targets et updates.' }
    ],
    formatTitle: 'Format du signal',
    formatText: 'Conçu pour être clair rapidement. Pas de langage caché. Pas de captures sans contexte.',
    signalExampleTitle: 'Exemple',
    signalExample: [['Direction', 'LONG ou SHORT'], ['Marché', 'Paire crypto'], ['Entry', 'Zone définie'], ['Risque', 'Stop / invalidation'], ['Targets', 'Target 1, Target 2, Target 3'], ['Statut', 'Actif / update / invalidé']],
    proofTitle: 'Construit pour éviter le cliché du groupe de signaux',
    proofText: 'Beaucoup de groupes veulent paraître actifs. VolatilityForge met l’accent sur la sélection : pas plus de calls, de meilleurs calls.',
    proofCards: [['Moins de bruit', 'Aucun quota quotidien forcé.'], ['Risque clair', 'Chaque signal doit avoir une invalidation visible.'], ['Même feed', 'Tous les membres reçoivent les mêmes signaux.'], ['Exécution privée', 'Les entries live restent dans Discord.']],
    pricingTitle: 'Prix membership',
    pricingText: 'Un groupe Discord privé. Le prix change seulement selon la durée.',
    pricingIncludedTitle: 'Inclus',
    pricingIncluded: ['Accès Discord privé', 'Signaux LONG et SHORT', 'Entry, stop et targets', 'Updates', 'Format risk-first'],
    finalTitle: 'Pour traders qui veulent de la discipline, pas du bruit.',
    finalText: 'Demande accès au feed Discord privé. Un groupe, un standard, signaux LONG et SHORT.',
    faqTitle: 'FAQ',
    faqs: [['Est-ce un conseil financier ?', 'Non. Le trading comporte des risques et des pertes sont possibles.'], ['Y a-t-il LONG et SHORT ?', 'Oui, quand le filtre le permet.'], ['Y a-t-il des niveaux VIP ?', 'Non. Un groupe, mêmes signaux.'], ['Y a-t-il des signaux tous les jours ?', 'Seulement quand le marché valide le filtre.']],
    disclaimer: 'Ceci n’est pas un conseil financier. Le trading comporte des risques. Les résultats passés ne garantissent pas les futurs.'
  }
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocaleHomePage({ params }) {
  const locale = params.locale;

  if (!LOCALES.includes(locale)) {
    notFound();
  }

  const copy = COPY[locale];
  const discordUrl = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || '#pricing';

  return (
    <main className="siteShell">
      <header className="topbar">
        <Link href={`/${locale}`} className="brand" aria-label="VolatilityForge home">
          <span className="brandMark">VF</span>
          <span className="brandText">VolatilityForge</span>
        </Link>

        <nav className="desktopNav" aria-label="Main navigation">
          <a href="#system">{copy.nav.system}</a>
          <a href="#format">{copy.nav.format}</a>
          <a href="#pricing">{copy.nav.pricing}</a>
          <a href="#faq">{copy.nav.faq}</a>
        </nav>

        <nav className="localeNav" aria-label="Language navigation">
          {LOCALES.map((item) => (
            <Link key={item} href={`/${item}`} className={item === locale ? 'activeLocale' : ''}>
              {item.toUpperCase()}
            </Link>
          ))}
        </nav>
      </header>

      <section className="heroSection">
        <div className="heroCopy">
          <p className="eyebrow">{copy.badge}</p>
          <h1>{copy.heroTitle}</h1>
          <p className="heroText">{copy.heroText}</p>

          <div className="heroActions">
            <a className="primaryButton" href={discordUrl}>
              {copy.primaryCta}
            </a>
            <a className="secondaryButton" href="#pricing">
              {copy.secondaryCta}
            </a>
          </div>

          <div className="trustStrip" aria-label="Trust indicators">
            {copy.trustItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <aside className="terminalCard" aria-label="Signal engine summary">
          <div className="terminalHeader">
            <span>Signal engine</span>
            <span className="livePill">Discord ready</span>
          </div>
          <div className="terminalGrid">
            <div>
              <span className="terminalLabel">Product</span>
              <strong>One private group</strong>
            </div>
            <div>
              <span className="terminalLabel">Direction</span>
              <strong>LONG + SHORT</strong>
            </div>
            <div>
              <span className="terminalLabel">Delivery</span>
              <strong>Discord alerts</strong>
            </div>
            <div>
              <span className="terminalLabel">Standard</span>
              <strong>Risk first</strong>
            </div>
          </div>
          <div className="terminalFlow">
            <span>market</span>
            <i />
            <span>setup</span>
            <i />
            <span>risk</span>
            <i />
            <span>signal</span>
          </div>
        </aside>
      </section>

      <section className="sectionGrid twoColumns">
        <article className="panel panelLarge">
          <p className="sectionKicker">Membership</p>
          <h2>{copy.productTitle}</h2>
          <p>{copy.productText}</p>
        </article>

        <article className="panel panelList">
          <p className="sectionKicker">Included</p>
          <h2>{copy.includedTitle}</h2>
          <ul className="checkList">
            {copy.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section id="system" className="systemSection">
        <div className="sectionIntro">
          <p className="sectionKicker">Trade system</p>
          <h2>{copy.systemTitle}</h2>
          <p>{copy.systemText}</p>
        </div>

        <div className="systemSteps">
          {copy.systemSteps.map((step) => (
            <article key={step.k} className="stepCard">
              <span>{step.k}</span>
              <h3>{step.t}</h3>
              <p>{step.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="format" className="sectionGrid twoColumns alignTop">
        <article className="panel">
          <p className="sectionKicker">Signal format</p>
          <h2>{copy.formatTitle}</h2>
          <p>{copy.formatText}</p>
        </article>

        <article className="signalCard">
          <div className="signalCardHeader">
            <span>{copy.signalExampleTitle}</span>
            <span>LONG / SHORT</span>
          </div>
          <div className="signalRows">
            {copy.signalExample.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="proofSection">
        <div className="sectionIntro narrow">
          <p className="sectionKicker">Positioning</p>
          <h2>{copy.proofTitle}</h2>
          <p>{copy.proofText}</p>
        </div>
        <div className="proofCards">
          {copy.proofCards.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="pricingSection">
        <div className="sectionIntro narrow">
          <p className="sectionKicker">Pricing</p>
          <h2>{copy.pricingTitle}</h2>
          <p>{copy.pricingText}</p>
        </div>

        <div className="priceGrid">
          {PRICES.map((plan) => (
            <article key={plan.key} className={plan.highlighted ? 'priceCard highlightedPrice' : 'priceCard'}>
              <div className="priceTopline">
                <span>{plan.label[locale]}</span>
                <em>{plan.note[locale]}</em>
              </div>
              <div className="priceValue">
                <strong>{plan.price}</strong>
                <span>{plan.term[locale]}</span>
              </div>
              <a className={plan.highlighted ? 'primaryButton fullButton' : 'secondaryButton fullButton'} href={discordUrl}>
                {copy.primaryCta}
              </a>
            </article>
          ))}
        </div>

        <div className="includedPanel">
          <h3>{copy.pricingIncludedTitle}</h3>
          <ul>
            {copy.pricingIncluded.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="finalCta">
        <div>
          <p className="sectionKicker">VolatilityForge</p>
          <h2>{copy.finalTitle}</h2>
          <p>{copy.finalText}</p>
        </div>
        <a className="primaryButton" href={discordUrl}>
          {copy.primaryCta}
        </a>
      </section>

      <section id="faq" className="faqSection">
        <div className="sectionIntro narrow">
          <p className="sectionKicker">FAQ</p>
          <h2>{copy.faqTitle}</h2>
        </div>
        <div className="faqGrid">
          {copy.faqs.map(([question, answer]) => (
            <article key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <span>© VolatilityForge</span>
        <p>{copy.disclaimer}</p>
      </footer>
    </main>
  );
}