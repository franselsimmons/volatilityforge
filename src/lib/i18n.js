// FILE: src/lib/i18n.js

export const LOCALES = ['en', 'nl', 'de', 'es', 'fr'];
export const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';

export function isLocale(value) {
  return LOCALES.includes(value);
}

export function normalizeLocale(value) {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export const LANGUAGE_LABELS = {
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français'
};

export const STATIC_TEXT = {
  en: {
    metaTitle: 'VolatilityForge — Crypto signals without hype',
    metaDescription: 'A disciplined public proof layer for trading updates in plain language.',
    heroBadge: 'Independent proof layer',
    heroTitle: 'Crypto signals without hype.',
    heroSubtitle: 'VolatilityForge shows when the process acts, when it deliberately waits, and what the daily result was. Hood closed. Discipline visible.',
    primaryCta: 'View Discord preview',
    secondaryCta: 'See latest updates',
    todayTitle: 'Today',
    noPublicDataTitle: 'Public updates are not live yet',
    noPublicDataText: 'VolatilityForge is currently being tested with a closed trading process. Public updates will follow once the measurement period is clean enough.',
    whyTitle: 'Why this is different',
    whyText: 'Most signal groups try to create activity. VolatilityForge focuses on filtering. If the market, direction and risk do not make enough sense, there is no signal.',
    resultsTitle: 'Latest results',
    screenshotsTitle: 'Screenshots',
    noScreenshots: 'No public screenshots yet.',
    footerRisk: 'No financial advice. Trading involves risk. Past results do not guarantee future results.',
    tableDate: 'Day',
    tableLong: 'Long',
    tableShort: 'Short',
    tableRejected: 'Rejected',
    tableResult: 'Result',
    lessonTitle: 'Lesson',
    wins: 'Wins',
    losses: 'Losses',
    breakevens: 'Break-even'
  },
  nl: {
    metaTitle: 'VolatilityForge — Crypto-signalen zonder hype',
    metaDescription: 'Een rustige publieke bewijslaag voor tradingupdates in gewone taal.',
    heroBadge: 'Onafhankelijke bewijslaag',
    heroTitle: 'Crypto-signalen zonder hype.',
    heroSubtitle: 'VolatilityForge laat zien wanneer het proces handelt, wanneer het bewust wacht, en wat het dagresultaat was. Motorkap dicht. Discipline zichtbaar.',
    primaryCta: 'Bekijk Discord preview',
    secondaryCta: 'Bekijk laatste updates',
    todayTitle: 'Vandaag',
    noPublicDataTitle: 'Publieke updates staan nog niet live',
    noPublicDataText: 'VolatilityForge wordt momenteel getest met een gesloten tradingproces. Publieke updates volgen zodra de meetperiode schoon genoeg is.',
    whyTitle: 'Waarom dit anders is',
    whyText: 'De meeste signalengroepen proberen activiteit te maken. VolatilityForge draait om filteren. Als markt, richting en risico niet logisch genoeg zijn, komt er geen signaal.',
    resultsTitle: 'Laatste resultaten',
    screenshotsTitle: 'Screenshots',
    noScreenshots: 'Nog geen publieke screenshots.',
    footerRisk: 'Geen financieel advies. Trading heeft risico. Resultaten uit het verleden geven geen garantie voor de toekomst.',
    tableDate: 'Dag',
    tableLong: 'Long',
    tableShort: 'Short',
    tableRejected: 'Afgewezen',
    tableResult: 'Resultaat',
    lessonTitle: 'Les',
    wins: 'Gewonnen',
    losses: 'Verloren',
    breakevens: 'Break-even'
  },
  de: {
    metaTitle: 'VolatilityForge — Krypto-Signale ohne Hype',
    metaDescription: 'Eine disziplinierte öffentliche Proof-Schicht für Trading-Updates in klarer Sprache.',
    heroBadge: 'Unabhängige Proof-Schicht',
    heroTitle: 'Krypto-Signale ohne Hype.',
    heroSubtitle: 'VolatilityForge zeigt, wann der Prozess handelt, wann er bewusst wartet und wie das Tagesergebnis war. Motorhaube geschlossen. Disziplin sichtbar.',
    primaryCta: 'Discord-Vorschau ansehen',
    secondaryCta: 'Neueste Updates ansehen',
    todayTitle: 'Heute',
    noPublicDataTitle: 'Öffentliche Updates sind noch nicht live',
    noPublicDataText: 'VolatilityForge wird derzeit mit einem geschlossenen Trading-Prozess getestet. Öffentliche Updates folgen, sobald die Messphase sauber genug ist.',
    whyTitle: 'Warum das anders ist',
    whyText: 'Viele Signalgruppen erzeugen vor allem Aktivität. VolatilityForge konzentriert sich auf Filterung. Wenn Markt, Richtung und Risiko nicht ausreichend zusammenpassen, gibt es kein Signal.',
    resultsTitle: 'Neueste Ergebnisse',
    screenshotsTitle: 'Screenshots',
    noScreenshots: 'Noch keine öffentlichen Screenshots.',
    footerRisk: 'Keine Finanzberatung. Trading ist riskant. Vergangene Ergebnisse garantieren keine zukünftigen Ergebnisse.',
    tableDate: 'Tag',
    tableLong: 'Long',
    tableShort: 'Short',
    tableRejected: 'Abgelehnt',
    tableResult: 'Ergebnis',
    lessonTitle: 'Lektion',
    wins: 'Gewinne',
    losses: 'Verluste',
    breakevens: 'Break-even'
  },
  es: {
    metaTitle: 'VolatilityForge — Señales cripto sin hype',
    metaDescription: 'Una capa pública de prueba para actualizaciones de trading en lenguaje claro.',
    heroBadge: 'Capa independiente de prueba',
    heroTitle: 'Señales cripto sin hype.',
    heroSubtitle: 'VolatilityForge muestra cuándo el proceso actúa, cuándo espera deliberadamente y cuál fue el resultado diario. Sin mostrar el motor. Disciplina visible.',
    primaryCta: 'Ver preview de Discord',
    secondaryCta: 'Ver últimas actualizaciones',
    todayTitle: 'Hoy',
    noPublicDataTitle: 'Las actualizaciones públicas aún no están activas',
    noPublicDataText: 'VolatilityForge se está probando actualmente con un proceso de trading cerrado. Las actualizaciones públicas llegarán cuando el periodo de medición sea suficientemente limpio.',
    whyTitle: 'Por qué es diferente',
    whyText: 'La mayoría de grupos de señales intentan crear actividad. VolatilityForge se centra en filtrar. Si mercado, dirección y riesgo no tienen suficiente sentido, no hay señal.',
    resultsTitle: 'Últimos resultados',
    screenshotsTitle: 'Capturas',
    noScreenshots: 'Aún no hay capturas públicas.',
    footerRisk: 'No es asesoramiento financiero. El trading implica riesgo. Los resultados pasados no garantizan resultados futuros.',
    tableDate: 'Día',
    tableLong: 'Long',
    tableShort: 'Short',
    tableRejected: 'Rechazadas',
    tableResult: 'Resultado',
    lessonTitle: 'Lección',
    wins: 'Ganadas',
    losses: 'Perdidas',
    breakevens: 'Break-even'
  },
  fr: {
    metaTitle: 'VolatilityForge — Signaux crypto sans battage',
    metaDescription: 'Une couche publique de preuve pour des mises à jour de trading en langage clair.',
    heroBadge: 'Couche de preuve indépendante',
    heroTitle: 'Signaux crypto sans battage.',
    heroSubtitle: 'VolatilityForge montre quand le processus agit, quand il attend volontairement, et quel a été le résultat du jour. Capot fermé. Discipline visible.',
    primaryCta: 'Voir l’aperçu Discord',
    secondaryCta: 'Voir les dernières mises à jour',
    todayTitle: 'Aujourd’hui',
    noPublicDataTitle: 'Les mises à jour publiques ne sont pas encore en ligne',
    noPublicDataText: 'VolatilityForge est actuellement testé avec un processus de trading fermé. Les mises à jour publiques suivront lorsque la période de mesure sera suffisamment propre.',
    whyTitle: 'Pourquoi c’est différent',
    whyText: 'La plupart des groupes de signaux cherchent à créer de l’activité. VolatilityForge se concentre sur le filtrage. Si le marché, la direction et le risque ne sont pas assez cohérents, il n’y a pas de signal.',
    resultsTitle: 'Derniers résultats',
    screenshotsTitle: 'Captures',
    noScreenshots: 'Aucune capture publique pour le moment.',
    footerRisk: 'Ceci n’est pas un conseil financier. Le trading comporte des risques. Les résultats passés ne garantissent pas les résultats futurs.',
    tableDate: 'Jour',
    tableLong: 'Long',
    tableShort: 'Short',
    tableRejected: 'Rejetées',
    tableResult: 'Résultat',
    lessonTitle: 'Leçon',
    wins: 'Gagnées',
    losses: 'Perdues',
    breakevens: 'Break-even'
  }
};

export function t(locale) {
  return STATIC_TEXT[normalizeLocale(locale)] || STATIC_TEXT.en;
}

export function formatDate(date, locale) {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).format(new Date(date));
}
