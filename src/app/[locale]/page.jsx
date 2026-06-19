// ================= FILE FROM ROOT: src/app/[locale]/page.jsx =================

import Link from 'next/link';
import { notFound } from 'next/navigation';

const LOCALES = ['en', 'nl', 'de', 'es', 'fr'];

const PRICES = [
  {
    key: 'monthly',
    price: '€99',
    label: {
      en: 'Monthly',
      nl: 'Maandelijks',
      de: 'Monatlich',
      es: 'Mensual',
      fr: 'Mensuel'
    },
    term: {
      en: '/ month',
      nl: '/ maand',
      de: '/ Monat',
      es: '/ mes',
      fr: '/ mois'
    },
    note: {
      en: 'Flexible access',
      nl: 'Flexibele toegang',
      de: 'Flexibler Zugang',
      es: 'Acceso flexible',
      fr: 'Accès flexible'
    }
  },
  {
    key: 'semiannual',
    price: '€449',
    highlighted: true,
    label: {
      en: '6 months',
      nl: '6 maanden',
      de: '6 Monate',
      es: '6 meses',
      fr: '6 mois'
    },
    term: {
      en: '/ 6 months',
      nl: '/ 6 maanden',
      de: '/ 6 Monate',
      es: '/ 6 meses',
      fr: '/ 6 mois'
    },
    note: {
      en: 'Recommended',
      nl: 'Aanbevolen',
      de: 'Empfohlen',
      es: 'Recomendado',
      fr: 'Recommandé'
    }
  },
  {
    key: 'annual',
    price: '€799',
    label: {
      en: 'Annual',
      nl: 'Jaarlijks',
      de: 'Jährlich',
      es: 'Anual',
      fr: 'Annuel'
    },
    term: {
      en: '/ year',
      nl: '/ jaar',
      de: '/ Jahr',
      es: '/ año',
      fr: '/ an'
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
      proof: 'Proof',
      format: 'Format',
      pricing: 'Pricing',
      faq: 'FAQ'
    },
    badge: 'Private Discord signals for crypto traders',
    heroTitle: 'LONG & SHORT crypto signals without the noise.',
    heroText:
      'VolatilityForge is one private Discord group for traders who want fewer random calls and stricter selection. Members receive LONG and SHORT crypto signals only when direction, setup quality and risk line up.',
    primaryCta: 'Request access',
    secondaryCta: 'View pricing',
    trustItems: ['One private group', 'LONG + SHORT', 'Entry / stop / targets', 'Risk-first filtering'],
    productTitle: 'One product. One standard.',
    productText:
      'Every member receives the same signal feed. No artificial VIP tiers. No separate products. The only difference is subscription length.',
    includedTitle: 'What members receive',
    included: [
      'LONG and SHORT crypto signals in Discord',
      'Clear direction, entry zone, stop level and target zones',
      'Signal updates when a setup changes or becomes invalid',
      'Daily recap when market activity is relevant',
      'No signal when the market does not meet the filter'
    ],
    systemTitle: 'A stricter signal process, explained simply.',
    systemText:
      'The internal engine stays private. Publicly, the system is explained through four clean layers: direction, setup quality, risk and delivery. This shows how the process works without exposing the mechanics under the hood.',
    systemSteps: [
      {
        k: '01',
        t: 'Direction',
        d: 'LONG and SHORT conditions are evaluated separately. The process does not force trades in the wrong market.'
      },
      {
        k: '02',
        t: 'Setup quality',
        d: 'A trade idea needs structure before it can become a member signal. Weak opportunities are ignored.'
      },
      {
        k: '03',
        t: 'Risk gate',
        d: 'A signal needs a clear invalidation level and realistic target logic before it is shared.'
      },
      {
        k: '04',
        t: 'Discord delivery',
        d: 'Members receive a clean message with direction, entry, stop, targets and follow-up updates.'
      }
    ],
    proofTitle: 'Verified performance block',
    proofText:
      'This section is reserved for clean verified data before launch. Do not publish the page with empty numbers. Fill it with real 30-day and 90-day results once the system has enough live proof.',
    stats: [
      ['Last 30 days', '—', 'To be filled with verified data'],
      ['Last 90 days', '—', 'To be filled with verified data'],
      ['Signals sent', '—', 'LONG + SHORT total'],
      ['Win rate', '—', 'Only after clean sample size'],
      ['Net result', '—', 'Use your chosen public metric'],
      ['Rejected setups', '—', 'Shows filtering discipline']
    ],
    proofWarning:
      'Launch rule: this block must contain real data before paid traffic or public launch.',
    formatTitle: 'Member signal format',
    formatText:
      'The signal format is built for fast clarity. No hidden language. No messy screenshots without context. Members see what matters immediately.',
    signalExampleTitle: 'Example layout',
    signalExample: [
      ['Direction', 'LONG or SHORT'],
      ['Market', 'Crypto pair'],
      ['Entry', 'Defined entry zone'],
      ['Risk', 'Stop level / invalidation'],
      ['Targets', 'Target 1, Target 2, Target 3'],
      ['Status', 'Active / updated / invalidated']
    ],
    positioningTitle: 'Built to avoid the signal-group cliché',
    positioningText:
      'Most groups try to look active. VolatilityForge is positioned around selection. The goal is not more calls. The goal is better calls.',
    positioningCards: [
      ['Less noise', 'No forced daily trade count.'],
      ['Clear risk', 'Every signal needs a visible invalidation point.'],
      ['Same feed', 'All paid members receive the same LONG and SHORT signals.'],
      ['Private execution', 'Live entries stay inside the member Discord.']
    ],
    pricingTitle: 'Membership pricing',
    pricingText:
      'One private Discord signal group. Every member receives the same LONG and SHORT signals. Price only changes by subscription length.',
    pricingIncludedTitle: 'Every membership includes',
    pricingIncluded: [
      'Private Discord access',
      'LONG and SHORT crypto signals',
      'Entry, stop and target zones',
      'Signal updates',
      'Risk-first signal format'
    ],
    finalTitle: 'One private signals group. One standard.',
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
      'No financial advice. Trading involves risk. Past performance does not guarantee future results. Legal review is required before paid public launch.'
  },

  nl: {
    nav: {
      system: 'Systeem',
      proof: 'Bewijs',
      format: 'Format',
      pricing: 'Prijzen',
      faq: 'FAQ'
    },
    badge: 'Private Discord-signalen voor crypto traders',
    heroTitle: 'LONG & SHORT crypto-signalen zonder ruis.',
    heroText:
      'VolatilityForge is één private Discord-groep voor traders die minder willekeurige calls en strengere selectie willen. Leden krijgen LONG en SHORT crypto-signalen alleen wanneer richting, setupkwaliteit en risico logisch samenkomen.',
    primaryCta: 'Vraag toegang aan',
    secondaryCta: 'Bekijk prijzen',
    trustItems: ['Eén private groep', 'LONG + SHORT', 'Entry / stop / targets', 'Risico-eerst filter'],
    productTitle: 'Eén product. Eén standaard.',
    productText:
      'Elk lid krijgt dezelfde signalenfeed. Geen kunstmatige VIP-lagen. Geen losse producten. Het enige verschil is de abonnementsduur.',
    includedTitle: 'Wat leden krijgen',
    included: [
      'LONG en SHORT crypto-signalen in Discord',
      'Duidelijke richting, entry-zone, stop-level en targets',
      'Updates wanneer een setup verandert of ongeldig wordt',
      'Dagelijkse recap wanneer marktactiviteit relevant is',
      'Geen signaal wanneer de markt niet door het filter komt'
    ],
    systemTitle: 'Een strenger signaalproces, simpel uitgelegd.',
    systemText:
      'De interne motor blijft privé. Publiek leggen we het systeem uit in vier heldere lagen: richting, setupkwaliteit, risico en levering. Zo ziet de klant hoe het proces werkt zonder dat de motorkap open gaat.',
    systemSteps: [
      {
        k: '01',
        t: 'Richting',
        d: 'LONG en SHORT worden apart beoordeeld. Het proces forceert geen trades in de verkeerde markt.'
      },
      {
        k: '02',
        t: 'Setupkwaliteit',
        d: 'Een trade-idee moet genoeg structuur hebben voordat het een member-signaal wordt. Zwakke kansen worden genegeerd.'
      },
      {
        k: '03',
        t: 'Risicopoort',
        d: 'Een signaal heeft een duidelijke invalidatie en realistische targetlogica nodig voordat het gedeeld wordt.'
      },
      {
        k: '04',
        t: 'Discord-delivery',
        d: 'Leden krijgen een strak bericht met richting, entry, stop, targets en updates wanneer nodig.'
      }
    ],
    proofTitle: 'Gereserveerd bewijs-blok',
    proofText:
      'Deze sectie is gereserveerd voor schone geverifieerde data vóór livegang. Publiceer de pagina niet met lege cijfers. Vul dit later met echte 30-dagen en 90-dagen resultaten zodra het systeem genoeg live bewijs heeft.',
    stats: [
      ['Laatste 30 dagen', '—', 'Later vullen met echte data'],
      ['Laatste 90 dagen', '—', 'Later vullen met echte data'],
      ['Signalen gestuurd', '—', 'LONG + SHORT totaal'],
      ['Winrate', '—', 'Alleen na schone sample size'],
      ['Netto resultaat', '—', 'Gebruik jouw gekozen publieke metric'],
      ['Afgewezen setups', '—', 'Laat filterdiscipline zien']
    ],
    proofWarning:
      'Launch-regel: dit blok moet echte data bevatten vóór betaalde traffic of publieke livegang.',
    formatTitle: 'Member signaalformat',
    formatText:
      'Het signaalformat is gemaakt voor snelle duidelijkheid. Geen verborgen taal. Geen rommelige screenshots zonder context. Leden zien direct wat belangrijk is.',
    signalExampleTitle: 'Voorbeeldopbouw',
    signalExample: [
      ['Richting', 'LONG of SHORT'],
      ['Market', 'Crypto pair'],
      ['Entry', 'Duidelijke entry-zone'],
      ['Risk', 'Stop-level / invalidatie'],
      ['Targets', 'Target 1, Target 2, Target 3'],
      ['Status', 'Actief / update / ongeldig']
    ],
    positioningTitle: 'Gebouwd om niet als standaard signalengroep te voelen',
    positioningText:
      'Veel groepen willen vooral actief lijken. VolatilityForge draait om selectie. Het doel is niet meer calls. Het doel is betere calls.',
    positioningCards: [
      ['Minder ruis', 'Geen geforceerd aantal trades per dag.'],
      ['Duidelijk risico', 'Elk signaal heeft een zichtbaar invalidatiepunt.'],
      ['Dezelfde feed', 'Alle betalende leden krijgen dezelfde LONG en SHORT signalen.'],
      ['Private uitvoering', 'Live entries blijven binnen de member-Discord.']
    ],
    pricingTitle: 'Membership-prijzen',
    pricingText:
      'Eén private Discord-signaalgroep. Elk lid krijgt dezelfde LONG en SHORT signalen. De prijs verandert alleen door abonnementsduur.',
    pricingIncludedTitle: 'Elke membership bevat',
    pricingIncluded: [
      'Private Discord-toegang',
      'LONG en SHORT crypto-signalen',
      'Entry, stop en target-zones',
      'Signaalupdates',
      'Risico-eerst signaalformat'
    ],
    finalTitle: 'Eén private signalengroep. Eén standaard.',
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
      'Geen financieel advies. Trading heeft risico. Resultaten uit het verleden geven geen garantie voor de toekomst. Juridische toetsing is verplicht vóór betaalde publieke livegang.'
  },

  de: {
    nav: { system: 'System', proof: 'Nachweis', format: 'Format', pricing: 'Preise', faq: 'FAQ' },
    badge: 'Private Discord-Signale für Krypto-Trader',
    heroTitle: 'LONG & SHORT Krypto-Signale ohne Lärm.',
    heroText:
      'VolatilityForge ist eine private Discord-Gruppe für Trader, die weniger zufällige Calls und strengere Auswahl wollen. Mitglieder erhalten LONG- und SHORT-Signale nur, wenn Richtung, Setup-Qualität und Risiko zusammenpassen.',
    primaryCta: 'Zugang anfragen',
    secondaryCta: 'Preise ansehen',
    trustItems: ['Eine private Gruppe', 'LONG + SHORT', 'Entry / Stop / Targets', 'Risk-first Filter'],
    productTitle: 'Ein Produkt. Ein Standard.',
    productText:
      'Alle Mitglieder erhalten denselben Signalfeed. Keine künstlichen VIP-Stufen. Nur die Laufzeit ändert den Preis.',
    includedTitle: 'Was Mitglieder erhalten',
    included: [
      'LONG- und SHORT-Signale in Discord',
      'Klare Richtung, Entry-Zone, Stop und Targets',
      'Updates bei Änderung oder Invalidierung',
      'Recap bei relevanter Marktaktivität',
      'Kein Signal, wenn der Markt nicht passt'
    ],
    systemTitle: 'Ein strengerer Signalprozess, einfach erklärt.',
    systemText:
      'Der interne Motor bleibt privat. Öffentlich erklären wir vier Ebenen: Richtung, Setup-Qualität, Risiko und Lieferung.',
    systemSteps: [
      { k: '01', t: 'Richtung', d: 'LONG und SHORT werden getrennt bewertet.' },
      { k: '02', t: 'Setup-Qualität', d: 'Eine Idee braucht genug Struktur, bevor sie ein Signal wird.' },
      { k: '03', t: 'Risikotor', d: 'Ein Signal braucht klare Invalidierung und realistische Targets.' },
      { k: '04', t: 'Discord-Lieferung', d: 'Mitglieder erhalten Richtung, Entry, Stop, Targets und Updates.' }
    ],
    proofTitle: 'Reservierter Nachweisbereich',
    proofText:
      'Dieser Bereich ist für verifizierte Daten vor dem Launch reserviert. Nicht mit leeren Zahlen veröffentlichen.',
    stats: [
      ['Letzte 30 Tage', '—', 'Mit echten Daten füllen'],
      ['Letzte 90 Tage', '—', 'Mit echten Daten füllen'],
      ['Signale gesendet', '—', 'LONG + SHORT total'],
      ['Winrate', '—', 'Nach sauberer Sample Size'],
      ['Nettoergebnis', '—', 'Öffentliche Metrik'],
      ['Abgelehnte Setups', '—', 'Zeigt Filterdisziplin']
    ],
    proofWarning: 'Launch-Regel: echte Daten vor bezahltem öffentlichen Launch.',
    formatTitle: 'Signalformat für Mitglieder',
    formatText: 'Klar, schnell und ohne versteckte Sprache.',
    signalExampleTitle: 'Beispiel',
    signalExample: [
      ['Richtung', 'LONG oder SHORT'],
      ['Markt', 'Krypto-Paar'],
      ['Entry', 'Definierte Entry-Zone'],
      ['Risiko', 'Stop / Invalidierung'],
      ['Targets', 'Target 1, Target 2, Target 3'],
      ['Status', 'Aktiv / Update / Invalidiert']
    ],
    positioningTitle: 'Gegen das typische Signalgruppen-Klischee gebaut',
    positioningText: 'Nicht mehr Calls, sondern bessere Calls.',
    positioningCards: [
      ['Weniger Lärm', 'Kein erzwungenes tägliches Trade-Ziel.'],
      ['Klares Risiko', 'Sichtbare Invalidierung pro Signal.'],
      ['Gleicher Feed', 'Alle Mitglieder erhalten dieselben Signale.'],
      ['Private Ausführung', 'Live Entries bleiben im Discord.']
    ],
    pricingTitle: 'Membership-Preise',
    pricingText: 'Eine private Discord-Signalgruppe. Der Preis ändert sich nur durch die Laufzeit.',
    pricingIncludedTitle: 'Jede Membership enthält',
    pricingIncluded: ['Private Discord-Zugang', 'LONG- und SHORT-Signale', 'Entry, Stop und Targets', 'Updates', 'Risk-first Format'],
    finalTitle: 'Eine private Signalgruppe. Ein Standard.',
    finalText: 'Zugang anfragen für den privaten Discord-Feed.',
    faqTitle: 'FAQ',
    faqs: [
      ['Ist das Finanzberatung?', 'Nein. Trading ist riskant und Verluste sind möglich.'],
      ['Gibt es LONG und SHORT?', 'Ja, wenn der Filter sie zulässt.'],
      ['Gibt es VIP-Stufen?', 'Nein. Eine Gruppe, gleiche Signale.'],
      ['Gibt es täglich Signale?', 'Nur wenn der Markt passt.']
    ],
    disclaimer: 'Keine Finanzberatung. Trading beinhaltet Risiko.'
  },

  es: {
    nav: { system: 'Sistema', proof: 'Prueba', format: 'Formato', pricing: 'Precios', faq: 'FAQ' },
    badge: 'Señales privadas de Discord para traders cripto',
    heroTitle: 'Señales LONG & SHORT cripto sin ruido.',
    heroText:
      'VolatilityForge es un grupo privado de Discord para traders que quieren menos calls aleatorios y una selección más estricta.',
    primaryCta: 'Solicitar acceso',
    secondaryCta: 'Ver precios',
    trustItems: ['Un grupo privado', 'LONG + SHORT', 'Entry / stop / targets', 'Filtro risk-first'],
    productTitle: 'Un producto. Un estándar.',
    productText: 'Todos reciben el mismo feed. Sin niveles VIP artificiales. Solo cambia la duración.',
    includedTitle: 'Qué reciben los miembros',
    included: [
      'Señales LONG y SHORT en Discord',
      'Dirección, entrada, stop y objetivos claros',
      'Actualizaciones si cambia o se invalida',
      'Resumen cuando el mercado lo justifica',
      'Sin señal si el filtro no pasa'
    ],
    systemTitle: 'Un proceso de señales más estricto.',
    systemText: 'El motor interno sigue privado. Público: dirección, setup, riesgo y entrega.',
    systemSteps: [
      { k: '01', t: 'Dirección', d: 'LONG y SHORT se evalúan por separado.' },
      { k: '02', t: 'Calidad', d: 'Una idea necesita estructura antes de ser señal.' },
      { k: '03', t: 'Riesgo', d: 'Debe existir invalidación clara y targets realistas.' },
      { k: '04', t: 'Discord', d: 'Mensaje claro con dirección, entrada, stop, targets y updates.' }
    ],
    proofTitle: 'Bloque de prueba reservado',
    proofText: 'Reservado para datos verificados antes del lanzamiento. No publicar con números vacíos.',
    stats: [
      ['Últimos 30 días', '—', 'Datos reales'],
      ['Últimos 90 días', '—', 'Datos reales'],
      ['Señales enviadas', '—', 'LONG + SHORT total'],
      ['Winrate', '—', 'Tras muestra limpia'],
      ['Resultado neto', '—', 'Métrica pública'],
      ['Setups rechazados', '—', 'Disciplina de filtro']
    ],
    proofWarning: 'Regla de lanzamiento: datos reales antes de tráfico pagado.',
    formatTitle: 'Formato de señal',
    formatText: 'Claridad rápida, sin lenguaje oculto.',
    signalExampleTitle: 'Ejemplo',
    signalExample: [
      ['Dirección', 'LONG o SHORT'],
      ['Mercado', 'Par cripto'],
      ['Entrada', 'Zona definida'],
      ['Riesgo', 'Stop / invalidación'],
      ['Objetivos', 'Target 1, Target 2, Target 3'],
      ['Estado', 'Activa / update / invalidada']
    ],
    positioningTitle: 'No otro grupo ruidoso',
    positioningText: 'No más calls. Mejores calls.',
    positioningCards: [
      ['Menos ruido', 'Sin cuota diaria forzada.'],
      ['Riesgo claro', 'Invalidación visible por señal.'],
      ['Mismo feed', 'Todos reciben las mismas señales.'],
      ['Ejecución privada', 'Las entries live quedan en Discord.']
    ],
    pricingTitle: 'Precios',
    pricingText: 'Un grupo privado. El precio cambia solo por duración.',
    pricingIncludedTitle: 'Incluido',
    pricingIncluded: ['Discord privado', 'LONG y SHORT', 'Entry, stop y targets', 'Updates', 'Formato risk-first'],
    finalTitle: 'Un grupo privado. Un estándar.',
    finalText: 'Solicita acceso al feed privado.',
    faqTitle: 'FAQ',
    faqs: [
      ['¿Es asesoramiento financiero?', 'No. Trading implica riesgo.'],
      ['¿Hay LONG y SHORT?', 'Sí, cuando el filtro lo permite.'],
      ['¿Hay niveles VIP?', 'No. Un grupo, mismas señales.'],
      ['¿Hay señales cada día?', 'Solo si el mercado pasa el filtro.']
    ],
    disclaimer: 'No es asesoramiento financiero. Trading implica riesgo.'
  },

  fr: {
    nav: { system: 'Système', proof: 'Preuve', format: 'Format', pricing: 'Prix', faq: 'FAQ' },
    badge: 'Signaux Discord privés pour traders crypto',
    heroTitle: 'Signaux crypto LONG & SHORT sans bruit.',
    heroText:
      'VolatilityForge est un groupe Discord privé pour traders qui veulent moins de calls aléatoires et une sélection plus stricte.',
    primaryCta: 'Demander accès',
    secondaryCta: 'Voir les prix',
    trustItems: ['Un groupe privé', 'LONG + SHORT', 'Entry / stop / targets', 'Filtre risk-first'],
    productTitle: 'Un produit. Un standard.',
    productText: 'Tous les membres reçoivent le même feed. Pas de niveaux VIP artificiels. Seule la durée change le prix.',
    includedTitle: 'Ce que les membres reçoivent',
    included: [
      'Signaux LONG et SHORT dans Discord',
      'Direction, entry, stop et targets clairs',
      'Updates en cas de changement ou invalidation',
      'Recap quand le marché le justifie',
      'Aucun signal si le filtre ne valide pas'
    ],
    systemTitle: 'Un processus de signaux plus strict.',
    systemText: 'Le moteur interne reste privé. Public : direction, setup, risque et livraison.',
    systemSteps: [
      { k: '01', t: 'Direction', d: 'LONG et SHORT sont évalués séparément.' },
      { k: '02', t: 'Qualité', d: 'Une idée doit avoir assez de structure.' },
      { k: '03', t: 'Risque', d: 'Invalidation claire et targets réalistes.' },
      { k: '04', t: 'Discord', d: 'Message clair avec direction, entry, stop, targets et updates.' }
    ],
    proofTitle: 'Bloc de preuve réservé',
    proofText: 'Réservé aux données vérifiées avant lancement. Ne pas publier avec des chiffres vides.',
    stats: [
      ['30 derniers jours', '—', 'Données réelles'],
      ['90 derniers jours', '—', 'Données réelles'],
      ['Signaux envoyés', '—', 'LONG + SHORT total'],
      ['Winrate', '—', 'Après sample propre'],
      ['Résultat net', '—', 'Métrique publique'],
      ['Setups rejetés', '—', 'Discipline du filtre']
    ],
    proofWarning: 'Règle de lancement : données réelles avant trafic payant.',
    formatTitle: 'Format du signal',
    formatText: 'Clarté rapide, sans langage caché.',
    signalExampleTitle: 'Exemple',
    signalExample: [
      ['Direction', 'LONG ou SHORT'],
      ['Marché', 'Paire crypto'],
      ['Entry', 'Zone définie'],
      ['Risque', 'Stop / invalidation'],
      ['Targets', 'Target 1, Target 2, Target 3'],
      ['Statut', 'Actif / update / invalidé']
    ],
    positioningTitle: 'Pas un autre groupe bruyant',
    positioningText: 'Pas plus de calls. De meilleurs calls.',
    positioningCards: [
      ['Moins de bruit', 'Aucun quota quotidien forcé.'],
      ['Risque clair', 'Invalidation visible par signal.'],
      ['Même feed', 'Tous reçoivent les mêmes signaux.'],
      ['Exécution privée', 'Les entries live restent dans Discord.']
    ],
    pricingTitle: 'Prix membership',
    pricingText: 'Un groupe privé. Le prix change seulement selon la durée.',
    pricingIncludedTitle: 'Inclus',
    pricingIncluded: ['Discord privé', 'LONG et SHORT', 'Entry, stop et targets', 'Updates', 'Format risk-first'],
    finalTitle: 'Un groupe privé. Un standard.',
    finalText: 'Demande accès au feed privé.',
    faqTitle: 'FAQ',
    faqs: [
      ['Est-ce un conseil financier ?', 'Non. Le trading comporte des risques.'],
      ['Y a-t-il LONG et SHORT ?', 'Oui, quand le filtre le permet.'],
      ['Y a-t-il des niveaux VIP ?', 'Non. Un groupe, mêmes signaux.'],
      ['Y a-t-il des signaux tous les jours ?', 'Seulement si le marché valide le filtre.']
    ],
    disclaimer: 'Ceci n’est pas un conseil financier. Le trading comporte des risques.'
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
          <a href="#proof">{copy.nav.proof}</a>
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

          <div className="trustStrip">
            {copy.trustItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <aside className="terminalCard">
          <div className="terminalHeader">
            <span>Signal engine</span>
            <span className="livePill">Private Discord</span>
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

      <section id="proof" className="evidenceSection">
        <div className="sectionIntro narrow">
          <p className="sectionKicker">Verified proof</p>
          <h2>{copy.proofTitle}</h2>
          <p>{copy.proofText}</p>
        </div>

        <div className="statsGrid">
          {copy.stats.map(([label, value, sub]) => (
            <article key={label} className="statCard">
              <span>{label}</span>
              <strong>{value}</strong>
              <p>{sub}</p>
            </article>
          ))}
        </div>

        <div className="evidenceNotice">
          <span>Launch guard</span>
          <p>{copy.proofWarning}</p>
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
          <h2>{copy.positioningTitle}</h2>
          <p>{copy.positioningText}</p>
        </div>

        <div className="proofCards">
          {copy.positioningCards.map(([title, text]) => (
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