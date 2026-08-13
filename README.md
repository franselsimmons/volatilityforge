//file: README.md
# Content HQ

Eenvoudige werkende marketing-content site voor vijf losse merken.

## Merken
- KRYVANT — Orderflow
- LUMERIQ — Micro Families
- RANGENEST — Bot Optimization
- NINETYVALE — Football Quant
- ARCYNTH — Forecast Intelligence

## Wat hij doet
- Nederlandse interne interface
- Iedere dag automatisch een andere Engelse social post per merk
- Crypto hashtags worden waar mogelijk aangevuld met live CoinGecko trending symbols
- Discord-link per merk wordt lokaal opgeslagen
- Eén klik copy
- Eén klik 1080×1350 PNG downloaden
- Iedere 14 dagen promotiebericht
- Geen database, login, AI-model of externe API-key nodig

## Lokaal starten
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Vercel
Upload de map naar een Git repo en importeer hem in Vercel, of run `vercel` vanuit de projectmap.

//file: app/[brand]/page.js
import { notFound } from 'next/navigation';
import BrandClient from '../../components/BrandClient';
import { BRANDS } from '../../lib/brands';

export default async function BrandPage({ params }) {
  const { brand } = await params;
  if (!BRANDS[brand]) notFound();
  return <BrandClient slug={brand} brand={BRANDS[brand]} />;
}

//file: app/api/content/route.js
import { NextResponse } from 'next/server';
import { BRANDS } from '../../../lib/brands';
import { getVariant, getPromotion, promotionDue, nextPromotionDate } from '../../../lib/content';

export const dynamic = 'force-dynamic';

async function cryptoTrending() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/search/trending', {
      cache: 'no-store',
      headers: { accept: 'application/json' }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return (data.coins || [])
      .slice(0, 8)
      .map((row) => row?.item?.symbol)
      .filter(Boolean)
      .map((symbol) => `#${String(symbol).toLowerCase().replace(/[^a-z0-9]/g, '')}`)
      .filter((value) => value.length > 1);
  } catch {
    return [];
  }
}

function mergeHashtags(base, live) {
  return [...new Set([...live, ...base])].slice(0, 7);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('brand');
  const offset = Number(searchParams.get('offset') || 0);
  const discord = searchParams.get('discord') || '';

  if (!slug || !BRANDS[slug]) {
    return NextResponse.json({ ok: false, error: 'unknown_brand' }, { status: 400 });
  }

  const brand = BRANDS[slug];
  const variant = getVariant(slug, Number.isFinite(offset) ? offset : 0);
  const live = slug === 'ninetyvale' ? [] : await cryptoTrending();
  const hashtags = mergeHashtags(brand.hashtags, live);
  const cta = discord ? `\n\nJoin Discord: ${discord}` : '';

  return NextResponse.json({
    ok: true,
    brand: brand.name,
    headline: variant.headline,
    explanationNl: brand.descriptionNl,
    post: `${variant.text}${cta}\n\n${hashtags.join(' ')}`,
    hashtags,
    trendSource: live.length ? 'CoinGecko live + curated' : 'curated',
    promotion: `${getPromotion(slug)}${cta}`,
    promotionDue: promotionDue(),
    nextPromotionDate: nextPromotionDate().toISOString(),
    generatedAt: new Date().toISOString()
  });
}

//file: app/globals.css
:root { color-scheme: dark; --bg:#07090d; --panel:#0d1118; --border:#202938; --text:#f4f7fb; --muted:#8d99aa; }
*{box-sizing:border-box} html,body{margin:0;min-height:100%;background:var(--bg);color:var(--text);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif} a{color:inherit;text-decoration:none}
.shell{max-width:1280px;margin:0 auto;padding:36px 24px 70px}.topbar,.split-title{display:flex;justify-content:space-between;gap:20px;align-items:flex-start}.topbar h1,.brand-hero h1{font-size:44px;line-height:1;margin:7px 0 10px;letter-spacing:-.04em}.muted,.brand-hero p,.settings-card small{color:var(--muted)}.eyebrow{font-size:10px;letter-spacing:.15em;font-weight:900;color:#708097;margin:0}.status{padding:9px 12px;border:1px solid var(--border);border-radius:999px;color:#9db0c9;font-size:10px;font-weight:800}.intro-card,.brand-card,.content-card,.settings-card{background:var(--panel);border:1px solid var(--border);border-radius:18px}.intro-card{padding:18px 20px;margin:24px 0}.intro-card p{margin:7px 0 0;color:var(--muted);line-height:1.6}.brand-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}.brand-card{padding:20px;min-height:210px;position:relative;overflow:hidden}.brand-card:before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:var(--brand)}.brand-card:hover{border-color:#35445b;transform:translateY(-1px)}.brand-kicker{color:var(--brand);font-size:10px;font-weight:900;letter-spacing:.1em}.brand-card h2{font-size:22px;margin:13px 0 7px}.brand-card p{font-size:12px;line-height:1.55;color:var(--muted)}.open{position:absolute;bottom:18px;left:20px;color:#c3cfdd;font-size:11px}.back{margin-bottom:20px;color:#92a0b3;font-size:12px}.brand-hero{padding:26px;border:1px solid var(--border);border-radius:18px;background:radial-gradient(circle at 100% 0%,color-mix(in srgb,var(--brand) 20%,transparent),transparent 43%),var(--panel)}.settings-card{padding:16px;margin:12px 0}.settings-card label{display:block;font-size:12px;font-weight:800;margin-bottom:8px}.settings-card input{width:100%;background:#090d13;border:1px solid #263244;border-radius:10px;padding:11px;color:#fff;outline:none}.settings-card small{display:block;margin-top:7px;font-size:10px}.content-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.content-card{padding:20px;min-width:0}.content-card h2{margin:4px 0 12px;font-size:20px}.explanation{color:#bdc8d6;line-height:1.6;font-size:12px;background:#0a0f16;border:1px solid #1c2634;border-radius:12px;padding:13px}.split-title span{font-size:10px;color:#7f8da0;padding-top:5px}.postbox{white-space:pre-wrap;font:inherit;font-size:13px;line-height:1.7;background:#090d13;border:1px solid #1c2531;border-radius:13px;padding:15px;color:#e4eaf0}.buttons{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}button{background:#4168ca;color:#fff;border:1px solid #577fe2;border-radius:10px;padding:10px 12px;font:inherit;font-size:11px;font-weight:800;cursor:pointer}.secondary{background:#111824;border-color:#2b3749;color:#c1ccda}.visual{width:100%;height:auto;border:1px solid #243147;border-radius:14px;background:#080d14}.promo-card{grid-column:1/-1}.promo-card .postbox{max-width:none}
@media(max-width:1050px){.brand-grid{grid-template-columns:repeat(2,1fr)}.content-grid{grid-template-columns:1fr}.promo-card{grid-column:auto}}@media(max-width:650px){.shell{padding:22px 14px 50px}.topbar{flex-direction:column}.brand-grid{grid-template-columns:1fr}.topbar h1,.brand-hero h1{font-size:36px}.status{align-self:flex-start}}

//file: app/layout.js
import './globals.css';

export const metadata = {
  title: 'Content HQ',
  description: 'Interne social content generator voor vijf merken'
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}

//file: app/page.js
import Link from 'next/link';
import { BRANDS } from '../lib/brands';

export default function Home() {
  return (
    <main className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">INTERN · NEDERLANDS</p>
          <h1>Content HQ</h1>
          <p className="muted">Vijf bedrijven. Iedere dag één Engels bericht + afbeelding.</p>
        </div>
        <div className="status">WERKEND SYSTEEM</div>
      </header>

      <section className="intro-card">
        <strong>Dagelijkse workflow</strong>
        <p>Open een merk, controleer kort de Nederlandse uitleg, kopieer het Engelse bericht, download de afbeelding en plaats het. Iedere 14 dagen staat er automatisch een extra promotiebericht klaar.</p>
      </section>

      <section className="brand-grid">
        {Object.entries(BRANDS).map(([slug, brand]) => (
          <Link className="brand-card" key={slug} href={`/${slug}`} style={{'--brand': brand.color}}>
            <span className="brand-kicker">{brand.system}</span>
            <h2>{brand.name}</h2>
            <p>{brand.positioning}</p>
            <span className="open">Open merk →</span>
          </Link>
        ))}
      </section>
    </main>
  );
}

//file: components/BrandClient.js
'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function BrandClient({ slug, brand }) {
  const [data, setData] = useState(null);
  const [offset, setOffset] = useState(0);
  const [discord, setDiscord] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem(`discord:${slug}`) || '';
    setDiscord(stored);
  }, [slug]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const params = new URLSearchParams({ brand: slug, offset: String(offset) });
    if (discord) params.set('discord', discord);
    fetch(`/api/content?${params.toString()}`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((json) => { if (!cancelled) setData(json); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [slug, offset, discord]);

  useEffect(() => {
    if (!data || !canvasRef.current) return;
    drawVisual(canvasRef.current, brand, data.headline);
  }, [data, brand]);

  function saveDiscord(value) {
    setDiscord(value);
    localStorage.setItem(`discord:${slug}`, value);
  }

  async function copy(text, label) {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 1500);
  }

  function downloadPng() {
    const a = document.createElement('a');
    a.download = `${brand.name.toLowerCase()}-${new Date().toISOString().slice(0, 10)}.png`;
    a.href = canvasRef.current.toDataURL('image/png');
    a.click();
  }

  return (
    <main className="shell">
      <div className="back"><Link href="/">← Dashboard</Link></div>
      <header className="brand-hero" style={{'--brand': brand.color}}>
        <p className="eyebrow">{brand.system.toUpperCase()}</p>
        <h1>{brand.name}</h1>
        <p>{brand.positioning}</p>
      </header>

      <section className="settings-card">
        <label>Discord invite link voor {brand.name}</label>
        <input value={discord} onChange={(e) => saveDiscord(e.target.value)} placeholder="https://discord.gg/..." />
        <small>Wordt alleen lokaal in jouw browser opgeslagen en automatisch onder het bericht gezet.</small>
      </section>

      {loading && <section className="content-card"><p>Bericht maken…</p></section>}
      {!loading && data?.ok && (
        <div className="content-grid">
          <section className="content-card">
            <p className="eyebrow">WAAROM DIT KLOPT BIJ HET SYSTEEM</p>
            <p className="explanation">{data.explanationNl}</p>
            <div className="split-title"><h2>Engels bericht van vandaag</h2><span>{data.trendSource}</span></div>
            <pre className="postbox">{data.post}</pre>
            <div className="buttons">
              <button onClick={() => copy(data.post, 'post')}>{copied === 'post' ? 'Gekopieerd ✓' : 'Kopieer bericht'}</button>
              <button className="secondary" onClick={() => setOffset((v) => v + 1)}>Andere versie</button>
            </div>
          </section>

          <section className="content-card">
            <div className="split-title"><h2>Afbeelding</h2><span>1080 × 1350 PNG</span></div>
            <canvas ref={canvasRef} width="1080" height="1350" className="visual" />
            <div className="buttons"><button onClick={downloadPng}>Download afbeelding</button></div>
          </section>

          <section className="content-card promo-card">
            <div className="split-title"><div><p className="eyebrow">BETAALDE PROMOTIE</p><h2>{data.promotionDue ? 'Vandaag promotiebericht gebruiken' : '14-daags hoofdbericht'}</h2></div><span>Volgende: {new Date(data.nextPromotionDate).toLocaleDateString('nl-NL')}</span></div>
            <pre className="postbox">{data.promotion}</pre>
            <div className="buttons"><button onClick={() => copy(data.promotion, 'promo')}>{copied === 'promo' ? 'Gekopieerd ✓' : 'Kopieer promotiebericht'}</button></div>
          </section>
        </div>
      )}
    </main>
  );
}

function drawVisual(canvas, brand, headline) {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#070a0f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createRadialGradient(900, 140, 30, 900, 140, 650);
  gradient.addColorStop(0, hexToRgba(brand.color, 0.30));
  gradient.addColorStop(1, 'rgba(7,10,15,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, 800);

  ctx.strokeStyle = 'rgba(255,255,255,.055)';
  for (let y = 180; y < 1160; y += 120) {
    ctx.beginPath(); ctx.moveTo(80, y); ctx.lineTo(1000, y); ctx.stroke();
  }

  ctx.fillStyle = brand.color;
  ctx.font = '800 36px system-ui';
  ctx.fillText(brand.name, 90, 130);
  ctx.fillStyle = '#8e9aad';
  ctx.font = '700 23px system-ui';
  ctx.fillText(brand.positioning.toUpperCase(), 90, 180);

  ctx.fillStyle = '#f5f7fb';
  ctx.font = '800 78px system-ui';
  wrap(ctx, headline, 90, 430, 850, 92, 4);

  ctx.fillStyle = '#a8b4c5';
  ctx.font = '500 31px system-ui';
  wrap(ctx, visualSubtitle(brand.name), 90, 770, 850, 46, 3);

  ctx.fillStyle = '#101621';
  rounded(ctx, 90, 980, 900, 160, 26);
  ctx.fill();
  ctx.fillStyle = '#7f8da0';
  ctx.font = '700 22px system-ui';
  ctx.fillText('PUBLIC TRACK RECORD PHASE', 125, 1040);
  ctx.fillStyle = '#eff3f8';
  ctx.font = '800 39px system-ui';
  ctx.fillText('FOUNDING ACCESS · FREE', 125, 1100);

  ctx.fillStyle = brand.color;
  ctx.fillRect(90, 1260, 900, 6);
}

function visualSubtitle(name) {
  const map = {
    KRYVANT: 'Market moves matter more when the underlying flow confirms them.',
    LUMERIQ: 'Different market conditions require different setup profiles.',
    RANGENEST: 'Change bot settings only when the market structure justifies it.',
    NINETYVALE: 'A likely winner is not automatically a value bet.',
    ARCYNTH: 'Short-, medium- and long-term direction belong to the same market story.'
  };
  return map[name];
}

function wrap(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = word; }
    else line = test;
  }
  if (line) lines.push(line);
  lines.slice(0, maxLines).forEach((value, index) => ctx.fillText(value, x, y + index * lineHeight));
}

function hexToRgba(hex, alpha) {
  const value = parseInt(hex.slice(1), 16);
  return `rgba(${(value >> 16) & 255},${(value >> 8) & 255},${value & 255},${alpha})`;
}

function rounded(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
}

//file: lib/brands.js
export const BRANDS = {
  kryvant: {
    name: 'KRYVANT',
    system: 'Orderflow',
    positioning: 'Crypto Order Flow Intelligence',
    color: '#6699ff',
    descriptionNl: 'Laat publiek zien dat KRYVANT prijs koppelt aan echte koop-/verkoopdruk, liquiditeit en bevestiging tussen markten — zonder thresholds of spoofinglogica te onthullen.',
    headlines: ['PRICE IS ONLY HALF THE STORY', 'CONFIRMATION OVER CHASING', 'READ THE FLOW BEHIND THE MOVE'],
    daily: [
      `Most traders see the candle. We care about what had to happen underneath it.\n\nKRYVANT reads price together with aggressive buying and selling, liquidity behaviour and cross-market confirmation. A fast move can look strong on a chart while the underlying participation is already weakening.\n\nThat difference matters. We do not turn every move into a signal. We wait until the flow, liquidity and direction tell a coherent story.\n\nConfirmed setups are published in Discord before the outcome is known.`,
      `A market can move quickly for two very different reasons: genuine participation, or temporarily thin liquidity. KRYVANT is built to separate those situations.\n\nWe focus on how buyers and sellers interact, whether liquidity absorbs pressure, and whether the move is confirmed beyond one isolated burst.\n\nThe goal is not more signals. It is better confirmation before a signal is allowed through.\n\nFounding access is currently free on Discord.`,
      `Order flow becomes most useful when price and participation stop telling the same story.\n\nKRYVANT looks for that disagreement. Price may continue higher while underlying support weakens, or trade lower while selling pressure is being absorbed. Neither observation alone is enough. Context decides whether the setup deserves attention.\n\nWe prefer missing an early move over pretending confirmation exists when it does not.\n\nLive setups are shared through Discord.`
    ],
    hashtags: ['#bitcoin','#btc','#orderflow','#cryptotrading','#crypto','#futures','#liquidity','#trading']
  },
  lumeriq: {
    name: 'LUMERIQ',
    system: 'Micro Families',
    positioning: 'Adaptive Crypto Signal Intelligence',
    color: '#b979ff',
    descriptionNl: 'Legt uit dat verschillende LONG/SHORT-strategietypes per marktregime anders worden behandeld, zonder families, scores of parameters te onthullen.',
    headlines: ['RIGHT SETUP. RIGHT REGIME.', 'SELECTION OVER PREDICTION', 'ONE MARKET. DIFFERENT STRATEGIES.'],
    daily: [
      `One strategy should not be trusted in every market.\n\nLUMERIQ evaluates different LONG and SHORT setup profiles independently. Momentum, continuation and reversal conditions are not treated the same when volatility, trend strength and market structure change.\n\nThat means a coin can move strongly and still produce no approved signal if the strategy profile does not fit the current regime.\n\nWe focus on selecting the right type of setup for the environment — not forcing trades into every move.`,
      `Missing a move is not the same as missing a valid setup.\n\nLUMERIQ can watch an asset rally without approving a LONG when the market regime and strategy profile do not line up. The same applies on the short side.\n\nDifferent conditions reward different behaviours, so the system adapts which types of setups are allowed to progress.\n\nConfirmed LONG and SHORT signals are published in Discord before the result is known.`,
      `The useful question is not simply “long or short?”\n\nThe better question is: which type of setup is allowed to operate in this market? LUMERIQ separates strategy profiles so trend, reversal and continuation logic do not receive the same treatment in every condition.\n\nThe objective is selection, not activity.\n\nFounding access is currently free through Discord.`
    ],
    hashtags: ['#crypto','#altcoins','#cryptotrading','#bitcoin','#ethereum','#solana','#trading','#futures']
  },
  rangenest: {
    name: 'RANGENEST',
    system: 'Bot Optimization',
    positioning: 'Crypto Bot Configuration Intelligence',
    color: '#60d39d',
    descriptionNl: 'Benadrukt dat botinstellingen alleen veranderen als volatiliteit, range en marktstructuur daar aanleiding toe geven. Geen interne range- of leverageformules publiceren.',
    headlines: ['NO CHANGE IS ALSO A DECISION', 'CONFIGURE FOR THE REGIME', 'STOP GUESSING BOT SETTINGS'],
    daily: [
      `A bot does not become better because its settings change more often.\n\nRangeNest reviews whether the current trading range is still valid, how volatility is evolving and whether market structure has actually changed before recommending a new configuration.\n\nIf price moves but the regime remains intact, leaving the settings alone can be the better decision.\n\nOptimization is not constant adjustment. It is knowing when an adjustment is justified.`,
      `Higher volatility does not automatically mean a grid needs to be rebuilt.\n\nWhat matters is whether the existing range is still doing its job, whether price keeps stressing its outer zones and whether the market is genuinely transitioning into a different regime.\n\nRangeNest changes configurations only when the structure supports that decision.\n\nWeekly configurations are shared through Discord.`,
      `Most bot problems begin before the bot starts trading: the configuration does not match the market it is expected to operate in.\n\nRangeNest focuses on that fit. Range behaviour, volatility and structural change are evaluated before current settings are kept or rebuilt.\n\nSometimes the best optimization is no change at all.\n\nFounding access is currently free.`
    ],
    hashtags: ['#cryptobot','#gridbot','#crypto','#bitcoin','#bitget','#cryptotrading','#automation','#tradingbot']
  },
  ninetyvale: {
    name: 'NINETYVALE',
    system: 'Football Quant',
    positioning: 'Data-Driven Football Value Intelligence',
    color: '#ee8a78',
    descriptionNl: 'Positioneert NinetyVale als prijs- en waarschijnlijkheidsmodel in plaats van tipster. Geen featureweights, EV-drempels of stakingmodel publiceren.',
    headlines: ['WE SELECT PRICES, NOT TEAMS', 'PROBABILITY IS NOT VALUE', 'A FAVOURITE CAN STILL BE A BAD BET'],
    daily: [
      `A team can be the most likely winner and still be a bad bet.\n\nNinetyVale is not built to pick the strongest name on the page. We estimate probabilities, compare them with the market price and only care when the difference is meaningful enough to create value.\n\nIf the bookmaker has already priced the advantage correctly, there is nothing to chase.\n\nA good prediction is not automatically a good bet. Price decides whether the opportunity exists.`,
      `“Who wins?” is only half of the betting question.\n\nThe other half is the price attached to that probability. NinetyVale compares its own match view with the market instead of treating every favourite as value.\n\nStrong teams can be rejected. Underdogs can become interesting. And sometimes no bet is the correct decision.\n\nWe select prices, not team names.`,
      `The market can agree with our football model and still leave us with no selection.\n\nIf our estimated probability and the bookmaker's implied probability are too close, there is no meaningful edge to buy. A match can be predictable without being mispriced.\n\nNinetyVale waits for the price to create the opportunity.\n\nSelections are published before kick-off in Discord.`
    ],
    hashtags: ['#football','#footballanalytics','#footballbetting','#soccer','#premierleague','#sportsanalytics','#valuebetting','#footballtips']
  },
  arcynth: {
    name: 'ARCYNTH',
    system: 'Forecast Intelligence',
    positioning: 'Crypto Market Forecast Intelligence',
    color: '#6bd4df',
    descriptionNl: 'Legt de 24H/7D/30D-denkwijze uit en hoe lokale fases in een groter pad passen, zonder forecastformules, gewichten of smoothing te onthullen.',
    headlines: ['24H · 7D · 30D', 'DIRECTION NEEDS CONTEXT', 'ONE MARKET. MULTIPLE HORIZONS.'],
    daily: [
      `A short-term pullback and a bullish multi-day outlook can both be true at the same time.\n\nARCYNTH tracks BTC, ETH, SOL, XRP and ADA across 24H, 7D and 30D horizons because market direction is not one-dimensional. The shorter path can cool while the broader structure remains constructive — or the reverse.\n\nWe focus on the relationship between direction, phase and potential turning behaviour instead of reacting to every candle as a new market regime.\n\nForecasts are locked before the outcome is known and reviewed afterwards.`,
      `Markets do not move in one timeframe.\n\nARCYNTH separates the 24H path from the 7D and 30D structure, then looks at how those horizons fit together. A local decline can be a temporary phase inside a broader bullish route, while a short rally can still sit inside a weakening higher-timeframe outlook.\n\nThe objective is continuity, not rewriting the entire story after every candle.\n\nLocked outlooks are shared through Discord.`,
      `The most useful forecast is not the one that changes direction every time price moves.\n\nARCYNTH follows BTC, ETH, SOL, XRP and ADA across multiple horizons and treats short-term turns, medium-term structure and longer-term direction as separate but connected pieces.\n\nThat lets the outlook adapt without pretending the entire market thesis changed.\n\nFounding access is currently free.`
    ],
    hashtags: ['#bitcoin','#crypto','#ethereum','#solana','#xrp','#cardano','#cryptoforecast','#marketanalysis']
  }
};

export const PROMOTIONS = {
  kryvant: `Most crypto signals start with price. KRYVANT starts underneath it.\n\nWe study how liquidity behaves, how aggressive buyers and sellers interact, and whether a move is being confirmed before a setup is allowed through.\n\nConfirmed signals are published in Discord before the outcome is known while we build the public track record.\n\nFounding Access is currently free.`,
  lumeriq: `One strategy should not be trusted in every market.\n\nLUMERIQ evaluates different LONG and SHORT setup profiles and adapts which types are allowed to operate as market conditions change.\n\nThe objective is simple: stop forcing the same setup into every regime.\n\nSignals are published before the outcome is known. Founding Access is currently free.`,
  rangenest: `Stop treating bot settings as permanent.\n\nRangeNest reviews whether a bot's range and configuration still fit the market it is operating in. Volatility, range behaviour and structural changes matter — not just where price happens to be today.\n\nSometimes the configuration changes. Sometimes the correct decision is to leave it alone.\n\nFounding Access is currently free.`,
  ninetyvale: `We do not sell “sure winners.”\n\nNinetyVale estimates football probabilities and compares them with bookmaker prices. A favourite can be rejected when the price is too short, and an unpopular side can become interesting when the market leaves enough value.\n\nEvery selection is published before kick-off while we build the public track record.\n\nFounding Access is currently free.`,
  arcynth: `What happens after the next candle matters more than the next candle itself.\n\nARCYNTH tracks BTC, ETH, SOL, XRP and ADA across 24H, 7D and 30D horizons, focusing on direction, market phases and expected turning behaviour.\n\nForecasts are locked before the outcome is known and reviewed afterwards.\n\nFounding Access is currently free.`
};

//file: lib/content.js
import { BRANDS, PROMOTIONS } from './brands';

function dayNumber(date = new Date()) {
  return Math.floor(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 86400000);
}

export function getVariant(slug, offset = 0) {
  const brand = BRANDS[slug];
  const index = (dayNumber() + offset + brand.name.length) % brand.daily.length;
  return { text: brand.daily[index], headline: brand.headlines[index % brand.headlines.length] };
}

export function promotionDue(date = new Date()) {
  const anchor = Date.UTC(2026, 7, 13);
  const today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return Math.floor((today - anchor) / 86400000) % 14 === 0;
}

export function getPromotion(slug) {
  return PROMOTIONS[slug];
}

export function nextPromotionDate(date = new Date()) {
  const anchor = new Date(Date.UTC(2026, 7, 13));
  const today = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  let diff = Math.floor((today - anchor) / 86400000);
  let mod = ((diff % 14) + 14) % 14;
  let add = mod === 0 ? 0 : 14 - mod;
  const result = new Date(today);
  result.setUTCDate(result.getUTCDate() + add);
  return result;
}

//file: package.json
{
  "name": "content-hq",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  }
}

//file: vercel.json
{
  "framework": "nextjs"
}
