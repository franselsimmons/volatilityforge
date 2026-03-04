# VolatilityForge

Chique, professionele Discord-first signals website.

## Features
- Next.js App Router + Tailwind
- Pricing: BUILDUP / ALMOST / ENTRY / ALL
- Crypto payments via NOWPayments (price in EUR or USDT)
- After payment: Connect Discord -> bot assigns role -> private channels open

## Local run
1) Copy env:
   cp .env.example .env.local

2) Fill env values.

3) Install & run:
   npm i
   npm run dev

Open: http://localhost:3000

## Notes
- IPN webhook needs a public URL to work locally (use ngrok).
- Without IPN, you can still click "I’ve paid — check status" (NOWPayments status endpoint).
- Create Discord roles and set channel permissions based on those roles.