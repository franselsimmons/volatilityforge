# VolatilityForge — Laag 1 (publieke etalage)

De publieke homepage. Bewust losgekoppeld van het tradesysteem: geen database,
geen login, geen koppeling met enige bot of scanner.

## Lokaal draaien

    npm install
    npm run dev

Open http://localhost:3000

## Op Vercel zetten

1. Maak een nieuwe GitHub-repo en push deze map ernaartoe.
2. Ga naar vercel.com -> Add New… -> Project -> kies je repo.
3. Vercel herkent Next.js automatisch. Klik Deploy. Geen environment variables nodig.

## Wat pas je aan?

Alle tekst en cijfers staan in data/sample.js
- DISCORD_URL — vervang door je echte Discord-invite.
- todayUpdate — de update van vandaag. Zet op null voor de "nog geen update"-staat.
- recentDays — de regels in de resultatentabel.
- principles — de drie "waarom anders"-punten.
- isPreview — laat op true zolang je met voorbeeldcijfers werkt.
