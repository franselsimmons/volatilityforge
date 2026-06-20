# VolatilityForge

VolatilityForge is een premium Next.js website voor een private crypto signal room met selectieve LONG en SHORT signalen.

De site is gebouwd voor:

- private Discord-toegang
- LONG en SHORT crypto-signalen
- pricing met Stripe Checkout voorbereiding
- aanvraagformulier als fallback of handmatige onboarding
- meertalige routes
- duidelijke risicodisclaimer
- Vercel deployment

---

## Tech stack

- Next.js App Router
- React
- Plain CSS
- Stripe Checkout voorbereid
- Vercel-ready

---

## Installatie

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open daarna:

```bash
http://localhost:3000
```

De root route stuurt automatisch door naar:

```bash
/nl
```

---

## Build

```bash
npm run build
```

Start productie lokaal:

```bash
npm run start
```

---

## Projectstructuur

```txt
.
├── package.json
├── next.config.mjs
├── jsconfig.json
├── vercel.json
├── .env.example
├── .gitignore
├── README.md
├── public
│   ├── favicon.svg
│   └── volatilityforge-logo.svg
└── src
    ├── app
    │   ├── globals.css
    │   ├── layout.jsx
    │   ├── page.jsx
    │   ├── api
    │   │   ├── apply
    │   │   │   └── route.js
    │   │   └── checkout
    │   │       └── route.js
    │   └── [locale]
    │       ├── page.jsx
    │       ├── performance
    │       │   └── page.jsx
    │       ├── system
    │       │   └── page.jsx
    │       ├── signal-room
    │       │   └── page.jsx
    │       ├── pricing
    │       │   └── page.jsx
    │       ├── faq
    │       │   └── page.jsx
    │       ├── apply
    │       │   └── page.jsx
    │       ├── success
    │       │   └── page.jsx
    │       └── legal
    │           └── risk-disclaimer
    │               └── page.jsx
    ├── components
    │   ├── SiteShell.jsx
    │   └── PricingCards.jsx
    └── lib
        └── siteContent.js
```

---

## Routes

De site ondersteunt deze locale-routes:

```txt
/nl
/en
/de
/es
/fr
```

Beschikbare pagina’s:

```txt
/[locale]
/[locale]/performance
/[locale]/system
/[locale]/signal-room
/[locale]/pricing
/[locale]/faq
/[locale]/apply
/[locale]/success
/[locale]/legal/risk-disclaimer
```

Voorbeeld:

```txt
/nl/performance
/nl/pricing
/nl/apply
```

---

## Environment variables

Maak lokaal een `.env.local` bestand op basis van `.env.example`.

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_ENABLE_PAYMENTS=false

STRIPE_SECRET_KEY=
STRIPE_PRICE_MONTHLY=
STRIPE_PRICE_SIX_MONTHS=
STRIPE_PRICE_ANNUAL=

APPLICATION_WEBHOOK_URL=
```

---

## Betalingen

De betaalflow is voorbereid via:

```txt
src/app/api/checkout/route.js
```

Zolang betalingen niet actief zijn:

```env
NEXT_PUBLIC_ENABLE_PAYMENTS=false
```

Dan sturen pricing-knoppen gebruikers door naar:

```txt
/[locale]/apply
```

Wanneer Stripe actief moet worden:

```env
NEXT_PUBLIC_ENABLE_PAYMENTS=true
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PRICE_MONTHLY=price_...
STRIPE_PRICE_SIX_MONTHS=price_...
STRIPE_PRICE_ANNUAL=price_...
```

De drie memberships zijn:

| Plan | Prijs |
|---|---:|
| Monthly | €99 / maand |
| 6 months | €449 / 6 maanden |
| Annual | €799 / jaar |

De 6 maanden membership is de aanbevolen optie.

---

## Aanvraagformulier

De aanvraagpagina staat op:

```txt
/[locale]/apply
```

Het formulier stuurt naar:

```txt
/api/apply
```

Als `APPLICATION_WEBHOOK_URL` is ingesteld, stuurt de API-route de aanvraag door naar die webhook.

Voorbeelden van mogelijke koppelingen:

- Make
- Zapier
- Discord workflow
- eigen backend
- CRM
- e-mailnotificatie

---

## Logo en favicon

Gebruik SVG-bestanden voor GitHub copy-paste en Vercel deployment:

```txt
public/favicon.svg
public/volatilityforge-logo.svg
```

Vermijd `.png` voor bestanden die rechtstreeks via GitHub code editor worden geplakt. PNG is binair en niet geschikt als copy-paste codebestand.

---

## Vercel deployment

Gebruik deze Vercel-instellingen:

```json
{
  "framework": "nextjs",
  "installCommand": "npm install",
  "buildCommand": "npm run build"
}
```

Deploy-stappen:

1. Push de code naar GitHub.
2. Maak een nieuw project aan in Vercel.
3. Koppel de GitHub repository.
4. Voeg environment variables toe.
5. Deploy.

---

## Contentpositie

VolatilityForge wordt publiek gepositioneerd als:

- private Discord signal room
- LONG en SHORT crypto-signalen
- selectieve signalen
- risk-first structuur
- modelberekende performance
- één standaard membership-feed
- geen verborgen VIP-lagen

Publieke termen:

- modelberekend
- private signal room
- LONG & SHORT
- entry-zone
- invalidatie
- targets
- risk-first
- model-PnL

---

## Risico

VolatilityForge is geen financieel advies.

Trading heeft risico. Resultaten uit het verleden, modelberekeningen en voorbeeldsignalen geven geen garantie voor toekomstige resultaten.

Werkelijke resultaten kunnen afwijken door:

- uitvoering
- timing
- fees
- slippage
- liquiditeit
- leverage
- positieomvang
- marktomstandigheden

Laat disclaimers, betaalvoorwaarden en marketingclaims juridisch controleren voordat je publiek betaalde toegang aanbiedt.

---

## Belangrijke performancecijfers

De site gebruikt deze modelpresentatie:

| Metric | Waarde |
|---|---:|
| Model PnL | +49.2% |
| Meetperiode | 6 maanden |
| Gesloten signalen | 232 |
| Win rate | 46.8% |
| Gemiddeld resultaat | +0.85R |
| LONG bijdrage | +31.5% |
| SHORT bijdrage | +17.7% |
| Risico per signaal | 0.25% |

Deze cijfers zijn modelberekend en geen garantie.

---

## Scripts

```bash
npm run dev
npm run build
npm run start
```

---

## Status

VolatilityForge is voorbereid voor:

- Vercel deployment
- private Discord-positionering
- aanvraagflow
- Stripe Checkout
- meertalige routes
- risk disclaimer
- premium branding