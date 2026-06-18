// ============================================================
// VolatilityForge — voorbeelddata voor laag 1
// ------------------------------------------------------------
// Dit is de ENIGE plek waar je de tekst en cijfers aanpast.
// Alles is bewust in klanttaal. Geen interne systeemtermen.
//
// LET OP: dit zijn illustratieve voorbeeldcijfers tijdens de
// testfase. Vervang ze pas door echte cijfers wanneer je
// meetperiode schoon en betrouwbaar is.
// ============================================================

// Vervang dit door je echte Discord-invite zodra die er is.
export const DISCORD_URL = 'https://discord.gg/your-invite-here';

// Zet op false zodra je met echte, gecontroleerde cijfers werkt.
export const isPreview = true;

// De update van vandaag. Zet op null om de "nog geen update"-staat te tonen.
export const todayUpdate = {
  date: '18 juni',
  tone: 'Short-kansrijk',
  long: 0,
  short: 2,
  rejected: 7,
  result: '+1,4',
  resultSign: 'pos', // 'pos' | 'neg' | 'flat'
  summary:
    'De markt was niet sterk genoeg voor long, dus die kant is vandaag overgeslagen. Short bleef bruikbaar.'
};

// De laatste dagen, voor het resultatenoverzicht.
export const recentDays = [
  { day: '18 jun', long: 0, short: 2, rejected: 7, result: '+1,4', sign: 'pos' },
  { day: '17 jun', long: 1, short: 1, rejected: 5, result: '+0,8', sign: 'pos' },
  { day: '16 jun', long: 0, short: 0, rejected: 9, result: '0,0', sign: 'flat' },
  { day: '15 jun', long: 2, short: 0, rejected: 4, result: '-0,6', sign: 'neg' },
  { day: '14 jun', long: 0, short: 3, rejected: 6, result: '+2,1', sign: 'pos' }
];

// De drie "waarom anders"-punten. Gewone taal, geen techniek.
export const principles = [
  {
    title: 'We wachten op uitlijning',
    body:
      'Een signaal komt alleen als markt, richting en risico samen kloppen. Klopt het niet, dan gebeurt er niets.'
  },
  {
    title: 'Afgewezen kansen tellen mee',
    body:
      'Niet handelen is een keuze, geen gemiste kans. Juist het afwijzen van zwakke setups beschermt het resultaat.'
  },
  {
    title: 'Alles wordt gemeten',
    body:
      'Elke dag en elk resultaat — gewonnen én verloren — wordt vastgelegd en hier rustig getoond.'
  }
];
