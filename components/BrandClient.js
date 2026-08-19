//file: components/BrandClient.js

'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const FIXED_DISCORD_LINKS = {
  kryvant: 'https://discord.gg/ycR5JhrKk',
  lumeriq: 'https://discord.gg/d7dPFAnpk',
  rangenest: 'https://discord.gg/8RbnxRnZs',
  ninetyvale: 'https://discord.gg/377Yu7y2U',
  arcynth: 'https://discord.gg/gYtazvejz'
};


const VISUAL_TOPIC_RULES = {
  kryvant: [
    { terms: ['absorption'], topic: 'ABSORPTION', labels: ['PRESSURE', 'RESPONSE', 'CONFIRM'] },
    { terms: ['cross-market', 'broader participation'], topic: 'CROSS-MARKET', labels: ['VENUES', 'FLOW', 'CONFIRM'] },
    { terms: ['liquidity', 'depth'], topic: 'LIQUIDITY', labels: ['LIQUIDITY', 'DEPTH', 'RESPONSE'] },
    { terms: ['breakout'], topic: 'BREAKOUT FILTER', labels: ['BREAKOUT', 'FLOW', 'FILTER'] },
    { terms: ['participation'], topic: 'PARTICIPATION', labels: ['ACTIVITY', 'RESPONSE', 'QUALITY'] },
    { terms: ['pressure', 'order flow'], topic: 'ORDER FLOW', labels: ['PRESSURE', 'PRICE', 'CONTEXT'] }
  ],
  lumeriq: [
    { terms: ['regime'], topic: 'REGIME FIT', labels: ['REGIME', 'SETUP', 'FIT'] },
    { terms: ['long', 'short'], topic: 'SIDE SELECTION', labels: ['LONG', 'SHORT', 'FILTER'] },
    { terms: ['momentum', 'continuation', 'reversal'], topic: 'SETUP TYPE', labels: ['STYLE', 'REGIME', 'SELECT'] },
    { terms: ['strategy', 'setup'], topic: 'STRATEGY FIT', labels: ['STRATEGY', 'MARKET', 'FIT'] }
  ],
  rangenest: [
    { terms: ['no change', 'leave the bot alone', 'leave'], topic: 'HOLD DECISION', labels: ['HOLD', 'STABILITY', 'REVIEW'] },
    { terms: ['volatility'], topic: 'VOLATILITY FIT', labels: ['VOLATILITY', 'RANGE', 'CONTEXT'] },
    { terms: ['outer zone', 'range behaviour', 'range'], topic: 'RANGE FIT', labels: ['RANGE', 'STRUCTURE', 'FIT'] },
    { terms: ['configuration', 'settings'], topic: 'CONFIGURATION', labels: ['SETTINGS', 'MARKET FIT', 'REVIEW'] }
  ],
  ninetyvale: [
    { terms: ['no selection', 'no value'], topic: 'PASS DISCIPLINE', labels: ['NO EDGE', 'PASS', 'DISCIPLINE'] },
    { terms: ['underdog'], topic: 'UNDERDOG VALUE', labels: ['UNDERDOG', 'PRICE', 'VALUE'] },
    { terms: ['favourite'], topic: 'FAVOURITE PRICING', labels: ['FAVOURITE', 'ODDS', 'VALUE'] },
    { terms: ['probability', 'price', 'value'], topic: 'PRICE VS PROBABILITY', labels: ['MODEL', 'PRICE', 'VALUE'] }
  ],
  arcynth: [
    { terms: ['locked'], topic: 'LOCKED FORECAST', labels: ['LOCKED', 'PATH', 'REVIEW'] },
    { terms: ['pullback', 'local decline', 'short rally'], topic: 'PHASE CONTEXT', labels: ['24H', '7D', '30D'] },
    { terms: ['24h', '7d', '30d'], topic: 'HORIZON ALIGNMENT', labels: ['24H', '7D', '30D'] },
    { terms: ['timeframe'], topic: 'TIMEFRAME CONTEXT', labels: ['24H', '7D', '30D'] }
  ]
};

export default function BrandClient({ slug, brand }) {
  const [data, setData] = useState(null);
  const [offset, setOffset] = useState(0);
  const [discord, setDiscord] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState('');
  const [customText, setCustomText] = useState('');
  const [customResult, setCustomResult] = useState(null);
  const [customLoading, setCustomLoading] = useState(false);
  const [customError, setCustomError] = useState('');
  const [visualPreview, setVisualPreview] = useState('');
  const canvasRef = useRef(null);
  const promoCanvasRef = useRef(null);

  const fixedDiscord = FIXED_DISCORD_LINKS[slug] || '';

  useEffect(() => {
    if (fixedDiscord) {
      setDiscord(fixedDiscord);
      return;
    }

    const stored = localStorage.getItem(`discord:${slug}`) || '';
    setDiscord(stored);
  }, [slug, fixedDiscord]);

  useEffect(() => {
    setCustomText(localStorage.getItem(`custom-text:${slug}`) || '');
    setCustomResult(null);
    setCustomError('');
    setVisualPreview('');
  }, [slug]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const params = new URLSearchParams({ brand: slug, offset: String(offset) });
    if (discord) params.set('discord', discord);
    fetch(`/api/content?${params.toString()}`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug, offset, discord]);

  useEffect(() => {
    if (!data || !canvasRef.current) return;
    drawVisual(canvasRef.current, brand, data.post, data.postVariant ?? offset);
  }, [data, brand, offset]);

  useEffect(() => {
    if (!data?.promotion || !promoCanvasRef.current) return;
    drawPromotionVisual(
      promoCanvasRef.current,
      brand,
      data.promotion,
      data.promotionHeadline,
      data.promotionVisualSubtitle,
      data.promotionCycleIndex ?? 0
    );
  }, [data, brand]);

  function saveDiscord(value) {
    if (fixedDiscord) return;
    setDiscord(value);
    localStorage.setItem(`discord:${slug}`, value);
  }

  async function copy(text, label) {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 1500);
  }

  function saveCustomText(value) {
    setCustomText(value);
    localStorage.setItem(`custom-text:${slug}`, value);
  }

  async function optimizeCustomText() {
    const input = customText.trim();
    if (!input || customLoading) return;

    setCustomLoading(true);
    setCustomError('');
    setCustomResult(null);

    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          brand: slug,
          text: input,
          discord
        })
      });
      const json = await response.json();

      if (!response.ok || !json?.ok) {
        throw new Error(json?.error || 'OPTIMIZE_FAILED');
      }

      setCustomResult(json);
    } catch (error) {
      setCustomError(
        error?.message === 'OPENAI_API_KEY_MISSING'
          ? 'OPENAI_API_KEY ontbreekt in Vercel.'
          : 'Optimaliseren is niet gelukt. Probeer het opnieuw.'
      );
    } finally {
      setCustomLoading(false);
    }
  }

  function openVisual() {
    if (!canvasRef.current) return;
    setVisualPreview(canvasRef.current.toDataURL('image/png'));
  }

  function openPromotionVisual() {
    if (!promoCanvasRef.current) return;
    setVisualPreview(promoCanvasRef.current.toDataURL('image/png'));
  }

  return (
    <main className="shell">
      <div className="back"><Link href="/">← Dashboard</Link></div>
      <header className="brand-hero" style={{ '--brand': brand.color }}>
        <p className="eyebrow">{brand.system.toUpperCase()}</p>
        <h1>{brand.name}</h1>
        <p>{brand.positioning}</p>
      </header>

      <section className="settings-card">
        <label>Discord invite link voor {brand.name}</label>
        <input
          value={discord}
          onChange={(e) => saveDiscord(e.target.value)}
          placeholder="https://discord.gg/..."
          readOnly={Boolean(fixedDiscord)}
        />
        <small>
          {fixedDiscord
            ? `Vast ingesteld voor ${brand.name} en automatisch toegevoegd aan het bericht.`
            : 'Wordt alleen lokaal in jouw browser opgeslagen en automatisch onder het bericht gezet.'}
        </small>
      </section>

      <section className="content-card custom-copy-card">
        <div className="split-title">
          <div>
            <p className="eyebrow">EIGEN TEKST</p>
            <h2>Nederlands → sterk Engels bericht</h2>
          </div>
          <span>max. 280 tekens incl. hashtags + Discord</span>
        </div>

        <textarea
          className="custom-textarea"
          value={customText}
          onChange={(e) => saveCustomText(e.target.value)}
          placeholder={`Typ hier jouw eigen tekst voor ${brand.name}. Nederlands is prima.`}
          maxLength={3000}
        />

        <div className="buttons">
          <button onClick={optimizeCustomText} disabled={!customText.trim() || customLoading}>
            {customLoading ? 'Bezig…' : 'Vertaal + optimaliseer'}
          </button>
          {customText && (
            <button className="secondary" onClick={() => {
              saveCustomText('');
              setCustomResult(null);
              setCustomError('');
            }}>
              Wissen
            </button>
          )}
        </div>

        {customError && <p className="custom-error">{customError}</p>}

        {customResult?.post && (
          <div className="custom-result">
            <div className="split-title">
              <h2>Geoptimaliseerd Engels</h2>
              <span>{customResult.characterCount}/280</span>
            </div>
            <pre className="postbox">{customResult.post}</pre>
            <div className="buttons">
              <button onClick={() => copy(customResult.post, 'custom')}>
                {copied === 'custom' ? 'Gekopieerd ✓' : 'Kopieer bericht'}
              </button>
            </div>
          </div>
        )}
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
            <div className="split-title"><h2>Afbeelding</h2><span>Klik om groot te openen</span></div>
            <button className="visual-open" type="button" onClick={openVisual} aria-label="Afbeelding vergroten">
              <canvas ref={canvasRef} width="1080" height="1350" className="visual" />
            </button>
            <small className="visual-hint">Tik op de afbeelding. Daarna kun je direct een screenshot maken.</small>
          </section>

          <section className="content-card promo-card">
            <div className="split-title">
              <div>
                <p className="eyebrow">BETAALDE PROMOTIE</p>
                <h2>{data.promotionDue ? 'Vandaag promotiebericht gebruiken' : '14-daags hoofdbericht'}</h2>
              </div>
              <span>Volgende: {new Date(data.nextPromotionDate).toLocaleDateString('nl-NL')}</span>
            </div>

            <pre className="postbox">{data.promotion}</pre>
            <div className="buttons">
              <button onClick={() => copy(data.promotion, 'promo')}>
                {copied === 'promo' ? 'Gekopieerd ✓' : 'Kopieer promotiebericht'}
              </button>
            </div>

            <div className="split-title" style={{ marginTop: 18 }}>
              <h2>14-daagse advertentie-afbeelding</h2>
              <span>Wisselt automatisch met het bericht</span>
            </div>
            <button
              className="visual-open"
              type="button"
              onClick={openPromotionVisual}
              aria-label="14-daagse advertentie-afbeelding vergroten"
            >
              <canvas ref={promoCanvasRef} width="1080" height="1350" className="visual" />
            </button>
            <small className="visual-hint">
              Speciaal voor de betaalde campagne. Geen “Paid Promotion”-tekst in de afbeelding.
            </small>
          </section>
        </div>
      )}

      {visualPreview && (
        <div className="visual-modal" role="dialog" aria-modal="true" aria-label={`${brand.name} afbeelding groot`}>
          <button className="visual-modal-backdrop" type="button" onClick={() => setVisualPreview('')} aria-label="Sluiten" />
          <div className="visual-modal-content">
            <button className="visual-modal-close" type="button" onClick={() => setVisualPreview('')}>Sluiten ×</button>
            <img src={visualPreview} alt={`${brand.name} social afbeelding`} />
          </div>
        </div>
      )}
    </main>
  );
}

function drawPromotionVisual(canvas, brand, postText, suppliedHeadline, suppliedSubtitle, cycleIndex = 0) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const visual = buildPromotionVisualModel(
    brand,
    postText,
    suppliedHeadline,
    suppliedSubtitle,
    cycleIndex
  );

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (brand.visualMode) {
    case 'kryvant':
      drawKryvantPromotion(ctx, canvas, brand, visual);
      break;
    case 'lumeriq':
      drawLumeriqPromotion(ctx, canvas, brand, visual);
      break;
    case 'rangenest':
      drawRangenestPromotion(ctx, canvas, brand, visual);
      break;
    case 'ninetyvale':
      drawNinetyValePromotion(ctx, canvas, brand, visual);
      break;
    case 'arcynth':
      drawArcynthPromotion(ctx, canvas, brand, visual);
      break;
    default:
      drawKryvantPromotion(ctx, canvas, brand, visual);
  }
}

function buildPromotionVisualModel(brand, postText, suppliedHeadline, suppliedSubtitle, cycleIndex = 0) {
  const body = cleanVisualPostBody(postText);
  const rule = findVisualTopicRule(brand.visualMode, body);
  const seed = (
    hashText(body || brand.name) ^
    Math.imul((Number(cycleIndex) || 0) + 101, 2654435761)
  ) >>> 0;

  return {
    seed,
    cycleIndex: Number(cycleIndex) || 0,
    topic: rule?.topic || String(brand.infoItems?.[0] || brand.system || 'SYSTEM').toUpperCase(),
    labels: rule?.labels || (brand.infoItems || []).map((item) => String(item).toUpperCase()).slice(0, 3),
    headline: clipVisualText(suppliedHeadline || body || brand.positioning, 72),
    summary: clipVisualText(suppliedSubtitle || body || pick(brand.visualSubtitles, cycleIndex), 178),
    body
  };
}

function drawPromotionBrandHeader(ctx, brand, x = 76, y = 108, align = 'left') {
  ctx.textAlign = align;
  ctx.fillStyle = '#f7fbff';
  ctx.font = '900 34px system-ui';
  ctx.fillText(brand.name, x, y);
  ctx.fillStyle = hexToRgba(brand.color, 0.92);
  ctx.font = '700 16px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(brand.positioning.toUpperCase(), x, y + 30);
  ctx.textAlign = 'left';
}

function drawPromotionHeadline(ctx, visual, x, y, maxWidth, color = '#f8fbff', accent = null) {
  ctx.fillStyle = color;
  ctx.font = '900 70px system-ui';
  wrap(ctx, visual.headline, x, y, maxWidth, 74, 4);

  if (accent) {
    ctx.fillStyle = accent;
    ctx.fillRect(x, y + 14, Math.min(220, maxWidth * 0.28), 7);
  }
}

function drawPromotionSummary(ctx, visual, x, y, maxWidth, color = '#aeb9ca') {
  ctx.fillStyle = color;
  ctx.font = '500 25px system-ui';
  wrap(ctx, visual.summary, x, y, maxWidth, 35, 4);
}

function drawPromotionCta(ctx, brand, y = 1160) {
  roundedFill(ctx, 150, y, 780, 112, 28, hexToRgba(brand.color, 0.96));
  ctx.fillStyle = '#071015';
  ctx.font = '900 42px system-ui';
  ctx.fillText('JOIN THE DISCORD', 250, y + 70);

  ctx.strokeStyle = '#071015';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(820, y + 56);
  ctx.lineTo(866, y + 56);
  ctx.lineTo(844, y + 34);
  ctx.moveTo(866, y + 56);
  ctx.lineTo(844, y + 78);
  ctx.stroke();
}

function drawPromoFeature(ctx, x, y, w, title, subtitle, accent) {
  roundedFill(ctx, x, y, w, 112, 20, 'rgba(8,16,24,0.88)');
  roundedStroke(ctx, x, y, w, 112, 20, hexToRgba(accent, 0.22));
  ctx.fillStyle = accent;
  ctx.font = '800 17px system-ui';
  ctx.fillText(title, x + 20, y + 34);
  ctx.fillStyle = '#9eacbd';
  ctx.font = '500 16px system-ui';
  wrap(ctx, subtitle, x + 20, y + 68, w - 40, 21, 2);
}

function drawKryvantPromotion(ctx, canvas, brand, visual) {
  fillBackground(ctx, canvas, '#020711');
  drawFineGrid(ctx, 52, 54, 976, 1238, 10, 12, 'rgba(255,255,255,0.035)');
  drawGradientBlob(ctx, 225, 760, 360, '#ff4f5e', 0.16);
  drawGradientBlob(ctx, 850, 760, 390, '#3b82f6', 0.22);

  drawPromotionBrandHeader(ctx, brand);
  drawPromotionHeadline(ctx, visual, 76, 274, 928, '#f8fbff', brand.color);
  drawPromotionSummary(ctx, visual, 76, 516, 890);

  const centerX = 540;
  const centerY = 796;
  for (let i = 0; i < 16; i++) {
    const y = 660 + i * 18;
    const bend = (seededUnit(visual.seed, 120 + i) - 0.5) * 80;

    ctx.strokeStyle = `rgba(255,79,94,${0.22 + (i % 4) * 0.08})`;
    ctx.lineWidth = 1.6 + (i % 3);
    ctx.beginPath();
    ctx.moveTo(68, y);
    ctx.bezierCurveTo(240, y + bend, 380, centerY + bend * 0.3, centerX, centerY);
    ctx.stroke();

    ctx.strokeStyle = `rgba(59,130,246,${0.24 + (i % 4) * 0.08})`;
    ctx.beginPath();
    ctx.moveTo(1012, y + 8);
    ctx.bezierCurveTo(850, y - bend, 700, centerY - bend * 0.3, centerX, centerY);
    ctx.stroke();
  }

  const core = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 76);
  core.addColorStop(0, '#ffffff');
  core.addColorStop(0.18, brand.color);
  core.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = core;
  ctx.fillRect(centerX - 90, centerY - 90, 180, 180);
  ctx.fillStyle = '#dceaff';
  ctx.font = '800 16px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText('LIQUIDITY CORE', 470, 914);

  drawPromoFeature(ctx, 70, 964, 220, 'AGGRESSIVE ACTIVITY', 'Track intent behind the move.', '#ff6c79');
  drawPromoFeature(ctx, 310, 964, 220, 'LIQUIDITY SHIFTS', 'See where depth changes.', brand.color);
  drawPromoFeature(ctx, 550, 964, 220, 'ABSORPTION', 'Measure failed pressure.', '#8db3ff');
  drawPromoFeature(ctx, 790, 964, 220, 'CONFIRMATION', 'Filter before signal.', brand.color);
  drawPromotionCta(ctx, brand);
}

function drawLumeriqPromotion(ctx, canvas, brand, visual) {
  fillBackground(ctx, canvas, '#090313');
  drawGradientBlob(ctx, 820, 700, 520, brand.color, 0.28);
  drawGradientBlob(ctx, 310, 1120, 320, '#6d28d9', 0.16);
  drawPromotionBrandHeader(ctx, brand);
  drawPromotionHeadline(ctx, visual, 76, 280, 900, '#fff8ff', brand.color);
  drawPromotionSummary(ctx, visual, 76, 532, 830, '#cdbde0');

  const targetX = 840;
  const targetY = 830;
  for (let row = 0; row < 15; row++) {
    const sourceY = 650 + row * 30;
    for (let col = 0; col < 4; col++) {
      const sourceX = 90 + col * 105;
      const dot = 3 + ((row + col) % 3);
      ctx.fillStyle = col % 2 ? '#8b5cf6' : brand.color;
      ctx.beginPath();
      ctx.arc(sourceX, sourceY, dot, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = col % 2 ? 'rgba(139,92,246,0.34)' : hexToRgba(brand.color, 0.34);
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(sourceX + 8, sourceY);
      ctx.bezierCurveTo(520, sourceY, 650, targetY + (sourceY - targetY) * 0.2, targetX, targetY);
      ctx.stroke();
    }
  }

  ctx.strokeStyle = hexToRgba(brand.color, 0.7);
  ctx.lineWidth = 3;
  [126, 96, 66].forEach((radius) => {
    ctx.beginPath();
    ctx.arc(targetX, targetY, radius, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.fillStyle = '#f8edff';
  ctx.beginPath();
  ctx.arc(targetX, targetY, 24, 0, Math.PI * 2);
  ctx.fill();

  drawPromoFeature(ctx, 70, 970, 220, 'FILTERS MANY', 'Many strategies compete.', brand.color);
  drawPromoFeature(ctx, 310, 970, 220, 'REGIME AWARE', 'Conditions change selection.', '#a78bfa');
  drawPromoFeature(ctx, 550, 970, 220, 'LONG + SHORT', 'Sides judged independently.', '#c084fc');
  drawPromoFeature(ctx, 790, 970, 220, 'ONE SIGNAL', 'Clarity after filtering.', brand.color);
  drawPromotionCta(ctx, brand);
}

function drawRangenestPromotion(ctx, canvas, brand, visual) {
  fillBackground(ctx, canvas, '#06110e');
  drawFineGrid(ctx, 54, 54, 972, 1238, 9, 12, 'rgba(130,255,207,0.035)');
  drawGradientBlob(ctx, 850, 740, 460, brand.color, 0.18);
  drawPromotionBrandHeader(ctx, brand);
  drawPromotionHeadline(ctx, visual, 76, 284, 900, '#f3fff9', brand.color);
  drawPromotionSummary(ctx, visual, 76, 526, 860, '#a8c5b8');

  const chartX = 88;
  const chartY = 690;
  const chartW = 904;
  const chartH = 340;
  roundedFill(ctx, chartX, chartY, chartW, chartH, 28, 'rgba(8,24,20,0.92)');
  roundedStroke(ctx, chartX, chartY, chartW, chartH, 28, hexToRgba(brand.color, 0.26));

  const bands = [
    { y: chartY + 38, h: 82, label: 'UPPER RANGE', alpha: 0.15 },
    { y: chartY + 130, h: 82, label: 'CORE RANGE', alpha: 0.08 },
    { y: chartY + 222, h: 82, label: 'LOWER RANGE', alpha: 0.12 }
  ];
  bands.forEach((band) => {
    ctx.fillStyle = hexToRgba(brand.color, band.alpha);
    ctx.fillRect(chartX + 26, band.y, chartW - 52, band.h);
    ctx.strokeStyle = hexToRgba(brand.color, 0.34);
    ctx.setLineDash([10, 8]);
    ctx.beginPath();
    ctx.moveTo(chartX + 26, band.y);
    ctx.lineTo(chartX + chartW - 26, band.y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#8fd8b8';
    ctx.font = '700 14px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillText(band.label, chartX + 42, band.y + 28);
  });

  let py = chartY + 245;
  ctx.strokeStyle = brand.color;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(chartX + 42, py);
  for (let i = 1; i <= 15; i++) {
    py += (seededUnit(visual.seed, 200 + i) - 0.46) * 70;
    py = Math.max(chartY + 70, Math.min(chartY + chartH - 40, py));
    ctx.lineTo(chartX + 42 + i * 54, py);
  }
  ctx.stroke();

  drawPromoFeature(ctx, 88, 1052, 210, 'VOLATILITY', 'Range must fit movement.', brand.color);
  drawPromoFeature(ctx, 316, 1052, 210, 'STRUCTURE', 'Context before settings.', '#7dd3aa');
  drawPromoFeature(ctx, 544, 1052, 210, 'RANGE FIT', 'Optimize the operating zone.', brand.color);
  drawPromoFeature(ctx, 772, 1052, 220, 'CONTROL', 'Change only with evidence.', '#99f6d3');
  drawPromotionCta(ctx, brand, 1190);
}

function drawNinetyValePromotion(ctx, canvas, brand, visual) {
  fillBackground(ctx, canvas, '#070b13');
  drawPitchStripes(ctx, 54, 54, 972, 1240, 'rgba(255,255,255,0.02)');
  drawGradientBlob(ctx, 900, 520, 450, '#2563eb', 0.16);
  drawPromotionBrandHeader(ctx, brand);
  drawPromotionHeadline(ctx, visual, 76, 278, 900, '#fffaf7', '#3b82f6');
  drawPromotionSummary(ctx, visual, 76, 520, 850, '#bdc6d6');

  roundedFill(ctx, 82, 690, 916, 344, 30, 'rgba(10,16,27,0.94)');
  roundedStroke(ctx, 82, 690, 916, 344, 30, 'rgba(59,130,246,0.24)');
  ctx.fillStyle = '#6799ff';
  ctx.font = '800 16px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText('NINETYVALE ANALYTICS', 116, 734);

  const cols = [
    { label: 'MODEL', value: '52.4%' },
    { label: 'MARKET', value: '47.6%' },
    { label: 'EDGE', value: '+4.8%' }
  ];
  cols.forEach((item, i) => {
    const x = 116 + i * 274;
    ctx.fillStyle = '#7c899c';
    ctx.font = '700 15px system-ui';
    ctx.fillText(item.label, x, 792);
    ctx.fillStyle = i === 2 ? '#f4b860' : '#f7f9fc';
    ctx.font = '900 44px system-ui';
    ctx.fillText(item.value, x, 850);
  });

  ctx.strokeStyle = '#315fba';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(116, 920);
  for (let i = 0; i < 8; i++) {
    const x = 116 + i * 102;
    const y = 950 - seededUnit(visual.seed, 260 + i) * 80;
    ctx.lineTo(x, y);
  }
  ctx.stroke();

  drawPromoFeature(ctx, 82, 1054, 210, 'DATA DRIVEN', 'Probability before opinion.', '#3b82f6');
  drawPromoFeature(ctx, 310, 1054, 210, 'PRICE FOCUSED', 'Odds change the decision.', '#f4b860');
  drawPromoFeature(ctx, 538, 1054, 210, 'DISCIPLINED', 'No edge means no pick.', '#3b82f6');
  drawPromoFeature(ctx, 766, 1054, 232, 'BEFORE KICK-OFF', 'Selections to Discord.', '#f4b860');
  drawPromotionCta(ctx, { ...brand, color: '#3b82f6' }, 1190);
}

function drawArcynthPromotion(ctx, canvas, brand, visual) {
  fillBackground(ctx, canvas, '#031119');
  drawResearchGrid(ctx, canvas, brand.color);
  drawGradientBlob(ctx, 840, 590, 490, brand.color, 0.18);
  drawPromotionBrandHeader(ctx, brand);
  drawPromotionHeadline(ctx, visual, 76, 286, 900, '#f2fdff', brand.color);
  drawPromotionSummary(ctx, visual, 76, 528, 830, '#aac5cb');

  const originX = 150;
  const originY = 930;
  const horizons = [
    { label: '24H', color: '#74a9ff', lift: 80, salt: 320 },
    { label: '7D', color: '#55d6e6', lift: 160, salt: 340 },
    { label: '30D', color: brand.color, lift: 250, salt: 360 }
  ];

  horizons.forEach((horizon, index) => {
    ctx.strokeStyle = horizon.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    let px = originX;
    let py = originY;
    for (let i = 1; i <= 10; i++) {
      px = originX + i * 76;
      const progress = i / 10;
      const noise = (seededUnit(visual.seed, horizon.salt + i) - 0.5) * 46;
      py = originY - horizon.lift * progress + noise;
      ctx.lineTo(px, py);
    }
    ctx.stroke();

    roundedFill(ctx, 890, 772 - index * 112, 112, 64, 16, 'rgba(8,28,37,0.94)');
    roundedStroke(ctx, 890, 772 - index * 112, 112, 64, 16, hexToRgba(horizon.color, 0.4));
    ctx.fillStyle = horizon.color;
    ctx.font = '900 24px system-ui';
    ctx.fillText(horizon.label, 916, 812 - index * 112);
  });

  drawPromoFeature(ctx, 82, 1038, 210, 'ONE STORY', 'Connected market narrative.', brand.color);
  drawPromoFeature(ctx, 310, 1038, 210, 'THREE HORIZONS', '24H · 7D · 30D.', '#55d6e6');
  drawPromoFeature(ctx, 538, 1038, 210, 'LOCKED ROUTES', 'Judge forecast vs outcome.', '#74a9ff');
  drawPromoFeature(ctx, 766, 1038, 232, 'FIVE ASSETS', 'BTC · ETH · SOL · XRP · ADA.', brand.color);
  drawPromotionCta(ctx, brand, 1180);
}

function drawVisual(canvas, brand, postText, variantSeed = 0) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const visual = buildVisualModel(brand, postText, variantSeed);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (brand.visualMode) {
    case 'kryvant':
      drawKryvantVisual(ctx, canvas, brand, visual);
      break;
    case 'lumeriq':
      drawLumeriqVisual(ctx, canvas, brand, visual);
      break;
    case 'rangenest':
      drawRangenestVisual(ctx, canvas, brand, visual);
      break;
    case 'ninetyvale':
      drawNinetyValeVisual(ctx, canvas, brand, visual);
      break;
    case 'arcynth':
      drawArcynthVisual(ctx, canvas, brand, visual);
      break;
    default:
      drawKryvantVisual(ctx, canvas, brand, visual);
  }
}

function buildVisualModel(brand, postText, variantSeed = 0) {
  const body = cleanVisualPostBody(postText);
  const sentences = body.match(/[^.!?]+[.!?]?/g)?.map((item) => item.trim()).filter(Boolean) || [];
  const first = sentences[0] || brand.positioning;
  const second = sentences[1] || pick(brand.visualSubtitles, variantSeed);
  const third = sentences[2] || second;
  const rule = findVisualTopicRule(brand.visualMode, body);
  const textHash = hashText(body || brand.name);
  const numericSeed = Number.isFinite(Number(variantSeed)) ? Number(variantSeed) : 0;
  const seed = (textHash ^ Math.imul(numericSeed + 1, 2654435761)) >>> 0;

  return {
    seed,
    variant: seed % 7,
    topic: rule?.topic || String(brand.infoItems?.[0] || brand.system || 'SYSTEM').toUpperCase(),
    labels: rule?.labels || (brand.infoItems || []).map((item) => String(item).toUpperCase()).slice(0, 3),
    headline: clipVisualText(first, 64),
    summary: clipVisualText(second, 150),
    detail: clipVisualText(third, 170),
    body
  };
}

function cleanVisualPostBody(value) {
  const lines = String(value || '')
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/^join\s*:/i.test(line))
    .filter((line) => !/^#/.test(line));
  return lines.join(' ').replace(/\s+/g, ' ').trim();
}

function findVisualTopicRule(mode, body) {
  const normalized = String(body || '').toLowerCase();
  const rules = VISUAL_TOPIC_RULES[mode] || [];
  return rules.find((rule) => rule.terms.some((term) => normalized.includes(term))) || null;
}

function clipVisualText(value, maxLength) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  const slice = text.slice(0, Math.max(1, maxLength - 1));
  const split = slice.lastIndexOf(' ');
  return `${(split > 24 ? slice.slice(0, split) : slice).trim()}…`;
}

function hashText(value) {
  let hash = 2166136261;
  const text = String(value || '');
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededUnit(seed, salt = 0) {
  let value = (Number(seed) >>> 0) ^ Math.imul((salt + 1) >>> 0, 2246822519);
  value ^= value >>> 15;
  value = Math.imul(value, 3266489917);
  value ^= value >>> 16;
  return (value >>> 0) / 4294967295;
}

function visualLabel(visual, index, fallback) {
  return String(visual.labels?.[index] || fallback || '').toUpperCase();
}

function drawKryvantVisual(ctx, canvas, brand, visual) {
  fillBackground(ctx, canvas, '#05080d');
  drawFineGrid(ctx, 72, 92, 936, 1156, 8, 10, 'rgba(255,255,255,0.045)');
  drawTopStatusBar(ctx, 72, 66, 936, 34, ['FLOW DESK', visual.topic, `VISUAL ${visual.variant + 1}`], '#97b8ff');
  drawOrderChart(ctx, 720, 170, 250, 185, brand.color, visual.seed);
  drawMicroBars(ctx, 748, 392, 194, 165, brand.color, visual.seed);

  ctx.fillStyle = brand.color;
  ctx.font = '800 26px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(brand.name, 86, 158);
  ctx.fillStyle = '#8390a4';
  ctx.font = '600 16px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(brand.positioning.toUpperCase(), 86, 188);

  ctx.fillStyle = '#f4f8ff';
  ctx.font = '800 70px system-ui';
  wrap(ctx, visual.headline, 86, 328, 560, 76, 4);

  ctx.fillStyle = '#99a7bb';
  ctx.font = '500 24px system-ui';
  wrap(ctx, visual.summary, 86, 620, 560, 34, 4);

  drawDeskStat(ctx, 744, 614, 220, 112, 'CONTENT FOCUS', visualLabel(visual, 0, 'FLOW'), brand.color);
  drawDeskStat(ctx, 744, 756, 220, 112, 'SECOND LENS', visualLabel(visual, 1, 'LIQUIDITY'), brand.color);
  drawDeskStat(ctx, 744, 898, 220, 112, 'DECISION LENS', visualLabel(visual, 2, 'CONFIRM'), brand.color);

  strokeBox(ctx, 72, 1118, 936, 86, 18, 'rgba(94,124,175,0.24)');
  ctx.fillStyle = '#90a0b8';
  ctx.font = '600 15px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(brand.footer.eyebrow, 98, 1160);
  ctx.fillStyle = '#f4f8ff';
  ctx.font = '800 28px system-ui';
  ctx.fillText(brand.footer.title, 98, 1196);

  ctx.fillStyle = brand.color;
  ctx.fillRect(72, 1268, 936, 4);
}

function drawLumeriqVisual(ctx, canvas, brand, visual) {
  const xShift = Math.round((seededUnit(visual.seed, 1) - 0.5) * 180);
  const yShift = Math.round((seededUnit(visual.seed, 2) - 0.5) * 120);
  fillBackground(ctx, canvas, '#11071a');
  drawGradientBlob(ctx, 820 + xShift, 160 + yShift, 420 + Math.round(seededUnit(visual.seed, 3) * 100), brand.color, 0.32);
  drawGradientBlob(ctx, 200 - Math.round(xShift / 2), 1120 - Math.round(yShift / 2), 260 + Math.round(seededUnit(visual.seed, 4) * 90), '#ff69ff', 0.14);
  drawDiagonalSlice(ctx, 0, 0, 1080, 160 + visual.variant * 10, 'rgba(255,255,255,0.03)');
  drawDiagonalSlice(ctx, 0, 1040, 1080, 190 + visual.variant * 8, 'rgba(255,255,255,0.025)');

  sticker(ctx, 86, 90, 198, 46, brand.color, visual.topic);
  ctx.fillStyle = '#f3eaff';
  ctx.font = '800 30px system-ui';
  ctx.fillText(brand.name, 86, 184);
  ctx.fillStyle = '#b7a7c7';
  ctx.font = '700 18px system-ui';
  ctx.fillText(brand.positioning.toUpperCase(), 86, 214);

  ctx.fillStyle = '#fff4ff';
  ctx.font = '900 82px system-ui';
  wrap(ctx, visual.headline, 86, 360, 820, 86, 4);

  ctx.fillStyle = '#ceb8df';
  ctx.font = '500 27px system-ui';
  wrap(ctx, visual.summary, 86, 690, 760, 38, 4);

  const labels = visual.labels?.length ? visual.labels : (brand.infoItems || []);
  labels.slice(0, 3).forEach((item, index) => {
    sticker(ctx, 86 + index * 228, 828, 204, 58, '#241233', String(item).toUpperCase(), '#f5e6ff', 'stroke');
  });

  roundedFill(ctx, 86, 952, 908, 172, 34, 'rgba(20,12,29,0.84)');
  ctx.fillStyle = '#b59fc8';
  ctx.font = '700 17px system-ui';
  ctx.fillText(brand.footer.eyebrow, 118, 1006);
  ctx.fillStyle = '#fff5ff';
  ctx.font = '900 44px system-ui';
  ctx.fillText(brand.footer.title, 118, 1072);
  pill(ctx, 700, 996, 252, 46, brand.color, 'DISCORD SIGNALS', '#1c1028', 16);
  pill(ctx, 700, 1054, 218, 46, '#ffffff', 'JOIN VIA DISCORD', '#1c1028', 16);

  ctx.fillStyle = brand.color;
  ctx.fillRect(86, 1248, 908, 8);
}

function drawRangenestVisual(ctx, canvas, brand, visual) {
  fillBackground(ctx, canvas, '#081114');
  roundedFill(ctx, 54, 54, 972, 1242, 30, '#0b1519');
  ctx.fillStyle = '#122127';
  ctx.fillRect(54, 54, 972, 72);
  drawWindowDots(ctx, 86, 91, [brand.color, '#9ca3af', '#475569']);
  ctx.fillStyle = '#7b9187';
  ctx.font = '700 16px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(`CONFIGURATION WORKSPACE · ${visual.topic}`, 160, 96);

  drawPanel(ctx, 86, 160, 364, 292, 'TODAY\'S IDEA', visual.topic, '#edf7f1', brand.color, 48);
  drawPanel(ctx, 476, 160, 518, 192, 'POST MESSAGE', visual.headline, '#d7ebe0', brand.color, 27, true);
  drawMetricTile(ctx, 476, 384, 160, 128, 'FOCUS', visualLabel(visual, 0, 'RANGE'), brand.color);
  drawMetricTile(ctx, 654, 384, 160, 128, 'LENS', visualLabel(visual, 1, 'STRUCTURE'), brand.color);
  drawMetricTile(ctx, 832, 384, 162, 128, 'RULE', visualLabel(visual, 2, 'FIT'), brand.color);

  drawPanel(ctx, 86, 490, 364, 328, 'WHY THIS FITS', visual.summary, '#d2e6db', brand.color, 28, true);
  drawChecklist(ctx, 476, 548, 518, 256, buildRangenestChecklist(visual), brand.color);

  drawPanel(ctx, 86, 854, 908, 248, 'TAKEAWAY', visual.detail, '#d6e7df', brand.color, 30, true);

  roundedFill(ctx, 86, 1138, 908, 114, 24, '#0f1b20');
  ctx.fillStyle = '#86a296';
  ctx.font = '700 17px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(brand.footer.eyebrow, 116, 1186);
  ctx.fillStyle = '#f0f9f4';
  ctx.font = '800 34px system-ui';
  ctx.fillText(brand.footer.title, 116, 1230);
}

function buildRangenestChecklist(visual) {
  const topic = visual.topic;
  if (topic.includes('VOLATILITY')) {
    return ['Check volatility change', 'Compare with range behaviour', 'Separate noise from regime shift', 'Change only when justified'];
  }
  if (topic.includes('HOLD')) {
    return ['Current settings remain useful', 'No forced weekly rebuild', 'Stability is a valid output', 'Review before changing'];
  }
  if (topic.includes('RANGE')) {
    return ['Check active range behaviour', 'Watch stress near outer zones', 'Compare price with structure', 'Keep or rebuild with context'];
  }
  return ['Review configuration fit', 'Compare with market regime', 'Avoid isolated parameter changes', 'Adjust only with evidence'];
}

function drawNinetyValeVisual(ctx, canvas, brand, visual) {
  fillBackground(ctx, canvas, '#140b0b');
  drawPitchStripes(ctx, 70, 86, 940, 1170, 'rgba(255,255,255,0.03)');
  roundedStroke(ctx, 70, 86, 940, 1170, 28, 'rgba(238,138,120,0.18)');

  ctx.fillStyle = brand.color;
  ctx.font = '800 28px system-ui';
  ctx.fillText(brand.name, 100, 146);
  ctx.fillStyle = '#cba49a';
  ctx.font = '700 17px system-ui';
  ctx.fillText(brand.positioning.toUpperCase(), 100, 174);

  roundedFill(ctx, 100, 214, 880, 148, 22, 'rgba(36,19,18,0.88)');
  drawScoreHeader(
    ctx,
    126,
    244,
    ['CONTENT FOCUS', 'MARKET LENS', 'DECISION RULE'],
    [visualLabel(visual, 0, 'MODEL'), visualLabel(visual, 1, 'PRICE'), visualLabel(visual, 2, 'VALUE')],
    brand.color
  );

  ctx.fillStyle = '#fff3ef';
  ctx.font = '900 72px system-ui';
  wrap(ctx, visual.headline, 100, 510, 820, 76, 4);

  ctx.fillStyle = '#d2aba0';
  ctx.font = '500 27px system-ui';
  wrap(ctx, visual.summary, 100, 790, 790, 38, 4);

  roundedFill(ctx, 100, 874, 420, 214, 24, 'rgba(31,17,17,0.92)');
  ctx.fillStyle = '#b89289';
  ctx.font = '700 16px system-ui';
  ctx.fillText('POST TOPIC', 128, 920);
  ctx.fillStyle = '#fff5f1';
  ctx.font = '800 38px system-ui';
  wrap(ctx, visual.topic, 128, 986, 340, 42, 3);

  roundedFill(ctx, 548, 874, 432, 214, 24, 'rgba(31,17,17,0.92)');
  ctx.fillStyle = '#b89289';
  ctx.font = '700 16px system-ui';
  ctx.fillText('OFFICIAL DISCORD', 576, 920);
  pill(ctx, 576, 956, 214, 46, brand.color, 'OFFICIAL ACCESS', '#240f0d', 16);
  pill(ctx, 576, 1016, 252, 46, '#fff5f1', 'BEFORE KICK-OFF', '#240f0d', 16);
  ctx.fillStyle = '#d8b2a6';
  ctx.font = '500 21px system-ui';
  ctx.fillText('Selections are published before the result is known.', 576, 1082);

  ctx.fillStyle = brand.color;
  ctx.fillRect(100, 1146, 880, 6);
}

function drawArcynthVisual(ctx, canvas, brand, visual) {
  fillBackground(ctx, canvas, '#061217');
  drawResearchGrid(ctx, canvas, brand.color);
  drawOrbit(ctx, 825, 370, 170, brand.color, visual.seed);
  drawForecastWave(ctx, 110, 700, 860, brand.color, visual.seed);

  ctx.fillStyle = brand.color;
  ctx.font = '800 28px system-ui';
  ctx.fillText(brand.name, 90, 138);
  ctx.fillStyle = '#95acb2';
  ctx.font = '700 18px system-ui';
  ctx.fillText(brand.positioning.toUpperCase(), 90, 170);

  const horizons = brand.infoItems || ['24H', '7D', '30D'];
  horizons.forEach((item, index) => {
    pill(ctx, 90 + index * 126, 216, 104, 42, '#0d232a', item, '#d8f9ff', 18);
  });

  ctx.fillStyle = '#f0fcff';
  ctx.font = '900 72px system-ui';
  wrap(ctx, visual.headline, 90, 410, 560, 76, 4);

  ctx.fillStyle = '#a8c1c7';
  ctx.font = '500 26px system-ui';
  wrap(ctx, visual.summary, 90, 646, 600, 36, 4);

  drawForecastChip(ctx, 760, 624, 240, 94, 'CONTENT FOCUS', visualLabel(visual, 0, '24H'), brand.color);
  drawForecastChip(ctx, 760, 740, 240, 94, 'SECOND LENS', visualLabel(visual, 1, '7D'), brand.color);
  drawForecastChip(ctx, 760, 856, 240, 94, 'THIRD LENS', visualLabel(visual, 2, '30D'), brand.color);

  roundedFill(ctx, 90, 1010, 910, 166, 24, 'rgba(11,24,29,0.92)');
  ctx.fillStyle = '#93b2b8';
  ctx.font = '700 17px system-ui';
  ctx.fillText(brand.footer.eyebrow, 118, 1060);
  ctx.fillStyle = '#f2fcff';
  ctx.font = '800 38px system-ui';
  ctx.fillText(brand.footer.title, 118, 1114);
  ctx.fillStyle = '#b0cbd0';
  ctx.font = '500 22px system-ui';
  wrap(ctx, visual.detail, 118, 1160, 790, 30, 2);

  ctx.fillStyle = brand.color;
  ctx.fillRect(90, 1222, 910, 6);
}

function fillBackground(ctx, canvas, color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawFineGrid(ctx, x, y, w, h, cols, rows, stroke) {
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1;
  for (let i = 0; i <= cols; i++) {
    const dx = x + (w / cols) * i;
    ctx.beginPath();
    ctx.moveTo(dx, y);
    ctx.lineTo(dx, y + h);
    ctx.stroke();
  }
  for (let j = 0; j <= rows; j++) {
    const dy = y + (h / rows) * j;
    ctx.beginPath();
    ctx.moveTo(x, dy);
    ctx.lineTo(x + w, dy);
    ctx.stroke();
  }
}

function drawTopStatusBar(ctx, x, y, w, h, labels, color) {
  roundedFill(ctx, x, y, w, h, 999, '#0b121b');
  ctx.fillStyle = color;
  ctx.font = '700 14px ui-monospace, SFMono-Regular, Menlo, monospace';
  labels.forEach((label, index) => {
    const dx = x + 20 + index * 265;
    ctx.fillText(label, dx, y + 23);
  });
}

function drawOrderChart(ctx, x, y, w, h, color, seed) {
  roundedStroke(ctx, x, y, w, h, 18, 'rgba(102,153,255,0.22)');
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  for (let i = 1; i < 5; i++) {
    const dy = y + i * (h / 5);
    ctx.beginPath();
    ctx.moveTo(x + 16, dy);
    ctx.lineTo(x + w - 16, dy);
    ctx.stroke();
  }

  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  let level = y + h * 0.66;
  ctx.moveTo(x + 18, level);
  for (let i = 1; i < 10; i++) {
    level += (seededUnit(seed, 20 + i) - 0.48) * 48;
    level = Math.max(y + 26, Math.min(y + h - 24, level));
    ctx.lineTo(x + 18 + i * 22, level);
  }
  ctx.stroke();
}

function drawMicroBars(ctx, x, y, w, h, color, seed) {
  roundedStroke(ctx, x, y, w, h, 18, 'rgba(102,153,255,0.22)');
  for (let i = 0; i < 8; i++) {
    const bw = 12;
    const bh = 34 + Math.round(seededUnit(seed, 40 + i) * 96);
    const bx = x + 20 + i * 20;
    const by = y + h - bh - 18;
    ctx.fillStyle = i % 2 === 0 ? color : 'rgba(255,255,255,0.15)';
    roundedFill(ctx, bx, by, bw, bh, 6);
  }
}

function drawDeskStat(ctx, x, y, w, h, label, value, color) {
  roundedFill(ctx, x, y, w, h, 18, '#0a1119');
  roundedStroke(ctx, x, y, w, h, 18, 'rgba(102,153,255,0.16)');
  ctx.fillStyle = '#7f90a7';
  ctx.font = '700 14px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(label, x + 18, y + 28);
  ctx.fillStyle = color;
  ctx.font = '800 30px system-ui';
  ctx.fillText(value, x + 18, y + 74);
}

function drawGradientBlob(ctx, x, y, radius, color, alpha) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, hexToRgba(color, alpha));
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
}

function drawDiagonalSlice(ctx, x, y, w, h, fill) {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.moveTo(x, y + 40);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + h - 40);
  ctx.lineTo(x, y + h);
  ctx.closePath();
  ctx.fill();
}

function sticker(ctx, x, y, w, h, fill, text, textColor = '#12081d', mode = 'fill') {
  ctx.beginPath();
  ctx.moveTo(x + 16, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w - 16, y + h);
  ctx.lineTo(x, y + h);
  ctx.closePath();
  if (mode === 'stroke') {
    ctx.fillStyle = '#170d23';
    ctx.fill();
    ctx.strokeStyle = fill;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  } else {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  ctx.fillStyle = textColor;
  ctx.font = '800 15px system-ui';
  ctx.fillText(text, x + 18, y + h / 2 + 6);
}

function drawWindowDots(ctx, x, y, colors) {
  colors.forEach((color, i) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + i * 22, y, 6.5, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawPanel(ctx, x, y, w, h, label, text, textColor, accent, fontSize = 40, paragraph = false) {
  roundedFill(ctx, x, y, w, h, 22, '#0e1a1f');
  roundedStroke(ctx, x, y, w, h, 22, 'rgba(96,211,157,0.16)');
  ctx.fillStyle = '#7c968b';
  ctx.font = '700 14px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(label, x + 24, y + 30);
  ctx.fillStyle = textColor;
  ctx.font = paragraph ? `500 ${fontSize}px system-ui` : `900 ${fontSize}px system-ui`;
  wrap(ctx, text, x + 24, y + 92, w - 48, paragraph ? fontSize + 10 : fontSize + 8, paragraph ? 5 : 4);
  ctx.fillStyle = accent;
  ctx.fillRect(x + 24, y + h - 22, 140, 4);
}

function drawMetricTile(ctx, x, y, w, h, label, value, accent) {
  roundedFill(ctx, x, y, w, h, 18, '#0e1a1f');
  roundedStroke(ctx, x, y, w, h, 18, 'rgba(96,211,157,0.16)');
  ctx.fillStyle = '#7c968b';
  ctx.font = '700 13px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(label, x + 18, y + 28);
  ctx.fillStyle = accent;
  ctx.font = '800 30px system-ui';
  wrap(ctx, value, x + 18, y + 74, w - 36, 30, 2);
}

function drawChecklist(ctx, x, y, w, h, items, accent) {
  roundedFill(ctx, x, y, w, h, 22, '#0e1a1f');
  roundedStroke(ctx, x, y, w, h, 22, 'rgba(96,211,157,0.16)');
  ctx.fillStyle = '#7c968b';
  ctx.font = '700 14px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText('DECISION CHECKLIST', x + 24, y + 30);
  items.forEach((item, index) => {
    const cy = y + 76 + index * 48;
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(x + 34, cy - 5, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#d9ebe2';
    ctx.font = '500 21px system-ui';
    ctx.fillText(item, x + 52, cy);
  });
}

function drawPitchStripes(ctx, x, y, w, h, fill) {
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.015)' : fill;
    ctx.fillRect(x, y + i * (h / 8), w, h / 8);
  }
}

function drawScoreHeader(ctx, x, y, labels, values, accent) {
  labels.forEach((label, index) => {
    const bx = x + index * 275;
    ctx.fillStyle = '#a88680';
    ctx.font = '700 13px system-ui';
    ctx.fillText(label, bx, y);
    ctx.fillStyle = accent;
    const value = String(values[index] || '');
    ctx.font = value.length > 9 ? '800 27px system-ui' : '900 36px system-ui';
    wrap(ctx, value, bx, y + 54, 235, 30, 2);
  });
}

function drawResearchGrid(ctx, canvas, accent) {
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  for (let x = 90; x <= 990; x += 90) {
    ctx.beginPath();
    ctx.moveTo(x, 80);
    ctx.lineTo(x, 1260);
    ctx.stroke();
  }
  for (let y = 90; y <= 1230; y += 90) {
    ctx.beginPath();
    ctx.moveTo(90, y);
    ctx.lineTo(990, y);
    ctx.stroke();
  }
  ctx.strokeStyle = hexToRgba(accent, 0.18);
  roundedStroke(ctx, 72, 72, 936, 1206, 24, hexToRgba(accent, 0.16));
}

function drawOrbit(ctx, x, y, radius, accent, seed = 0) {
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1.5;
  [radius, radius - 34, radius - 68].forEach((r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  });
  const angle = seededUnit(seed, 70) * Math.PI * 2;
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(x + Math.cos(angle) * (radius - 18), y + Math.sin(angle) * (radius - 18), 10, 0, Math.PI * 2);
  ctx.fill();
}

function drawForecastWave(ctx, x, y, w, accent, seed) {
  const a = (seededUnit(seed, 80) - 0.5) * 80;
  const b = (seededUnit(seed, 81) - 0.5) * 100;
  const c = (seededUnit(seed, 82) - 0.5) * 90;
  const d = (seededUnit(seed, 83) - 0.5) * 70;
  ctx.strokeStyle = accent;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x, y + 60 + a * 0.25);
  ctx.bezierCurveTo(x + 140, y + 10 + a, x + 230, y + 110 + b, x + 340, y + 50 + c);
  ctx.bezierCurveTo(x + 450, y - 10 + b * 0.35, x + 540, y + 110 + d, x + 650, y + 52 - a * 0.25);
  ctx.bezierCurveTo(x + 760, y + 10 + c * 0.3, x + 820, y + 80 - d * 0.2, x + w, y + 24 + b * 0.15);
  ctx.stroke();
}

function drawForecastChip(ctx, x, y, w, h, label, value, accent) {
  roundedFill(ctx, x, y, w, h, 20, '#0d1d23');
  roundedStroke(ctx, x, y, w, h, 20, 'rgba(107,212,223,0.20)');
  ctx.fillStyle = '#8baeb4';
  ctx.font = '700 14px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(label, x + 18, y + 28);
  ctx.fillStyle = accent;
  ctx.font = '800 30px system-ui';
  ctx.fillText(value, x + 18, y + 68);
}

function roundedFill(ctx, x, y, w, h, r, fill) {
  ctx.fillStyle = fill;
  rounded(ctx, x, y, w, h, r);
  ctx.fill();
}

function roundedStroke(ctx, x, y, w, h, r, stroke) {
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1.2;
  rounded(ctx, x, y, w, h, r);
  ctx.stroke();
}

function pill(ctx, x, y, width, height, fill, text, textColor, fontSize = 18) {
  roundedFill(ctx, x, y, width, height, height / 2, fill);
  ctx.fillStyle = textColor;
  ctx.font = `800 ${fontSize}px system-ui`;
  ctx.fillText(text, x + 18, y + height / 2 + fontSize / 3 - 2);
}

function strokeBox(ctx, x, y, w, h, r, stroke) {
  roundedStroke(ctx, x, y, w, h, r, stroke);
}

function wrap(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  lines.slice(0, maxLines).forEach((value, index) => ctx.fillText(value, x, y + index * lineHeight));
}

function pick(values = [], offset = 0) {
  if (!values.length) return '';
  return values[offset % values.length];
}

function rounded(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
}

function hexToRgba(hex, alpha) {
  const value = parseInt(hex.slice(1), 16);
  return `rgba(${(value >> 16) & 255},${(value >> 8) & 255},${value & 255},${alpha})`;
}
