# FILE: README.md

# VolatilityForge — Multilingual V1

VolatilityForge is a standalone public proof/content site for trading updates written in customer language.

It is deliberately **not connected** to any trading bot, Redis database, scanner, analyze dashboard, or execution system.

## What this V1 includes

- Public multilingual website:
  - `/en`
  - `/nl`
  - `/de`
  - `/es`
  - `/fr`
- Strong inline SVG logo and brand styling.
- Server-enforced admin login.
- Manual daily updates in customer language.
- Manual translations per language.
- Screenshot URL storage with multilingual captions.
- Content draft storage for Instagram / X / Facebook, per language.
- Copy buttons for drafts.
- Forbidden-words filter to reduce risk of internal jargon leaking.
- Prisma + SQLite database.
- One owner account seeded from `.env`.

## What this V1 does not include

- No Stripe.
- No customer accounts.
- No Discord automation.
- No AI content generator.
- No trade import.
- No Redis.
- No trading-system connection.

## Install

```bash
npm install
cp .env.example .env
```

Edit `.env`:

```bash
DATABASE_URL="file:./dev.db"
SESSION_SECRET="replace-this-with-a-long-random-secret-minimum-32-characters"
ADMIN_EMAIL="franselsimmons@hotmail.com"
ADMIN_PASSWORD="choose-a-strong-password-minimum-12-characters"
NEXT_PUBLIC_DEFAULT_LOCALE="en"
NEXT_PUBLIC_DISCORD_INVITE_URL="https://discord.gg/your-preview"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Run database migration and seed admin:

```bash
npx prisma migrate dev --name init
npm run seed:admin
npm run dev
```

Open:

```text
Public English:     http://localhost:3000/en
Public Dutch:       http://localhost:3000/nl
Admin:              http://localhost:3000/admin/login
```

## Admin security

All admin pages call server-side session checks. If there is no valid session, the server redirects to `/admin/login`.

Admin API/actions use server-side validation. Hidden navigation is not used as security.

## Language policy

All public-facing fields must stay in customer language. The forbidden-words filter blocks obvious internal terms such as:

```text
MISFIT, CurrentFit, micro, family, scanner, analyze, Redis, 75-child, FitScore, MICRO_LONG, MICRO_SHORT
```

The filter is a safety net, not a replacement for judgment.

## Public language examples

Use:

```text
Long stayed on the sidelines today. The market was not strong enough for that direction.
```

Do not use:

```text
LONG 75/75 MISFIT, CurrentFit blocked Discord, MICRO_SHORT_RETEST...
```

## Production notes

Before production:

- Use a real hosted database.
- Use HTTPS.
- Use a long random `SESSION_SECRET`.
- Replace the preview Discord invite.
- Do not publish performance numbers until the measurement period is clean and trusted.
- Get legal review before paid crypto signals, Stripe subscriptions, or automated Discord roles.
