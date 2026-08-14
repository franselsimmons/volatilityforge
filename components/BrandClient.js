//file: components/BrandClient.js

'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const FIXED_DISCORD_LINKS = {
  kryvant: 'https://discord.com/channels/1537804227915550740/1537805885194117150',
  rangenest: 'https://discord.com/channels/1537833094722232352/1537834560174297108'
};

export default function BrandClient({ slug, brand }) {
  const [data, setData] = useState(null);
  const [offset, setOffset] = useState(0);
  const [discord, setDiscord] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState('');
  const canvasRef = useRef(null);

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
    drawVisual(canvasRef.current, brand, data.headline, offset);
  }, [data, brand, offset]);

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

  function downloadPng() {
    const a = document.createElement('a');
    a.download = `${brand.name.toLowerCase()}-${new Date().toISOString().slice(0, 10)}.png`;
    a.href = canvasRef.current.toDataURL('image/png');
    a.click();
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

function drawVisual(canvas, brand, headline, offset = 0) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (brand.visualMode) {
    case 'kryvant':
      drawKryvantVisual(ctx, canvas, brand, headline, offset);
      break;
    case 'lumeriq':
      drawLumeriqVisual(ctx, canvas, brand, headline, offset);
      break;
    case 'rangenest':
      drawRangenestVisual(ctx, canvas, brand, headline, offset);
      break;
    case 'ninetyvale':
      drawNinetyValeVisual(ctx, canvas, brand, headline, offset);
      break;
    case 'arcynth':
      drawArcynthVisual(ctx, canvas, brand, headline, offset);
      break;
    default:
      drawKryvantVisual(ctx, canvas, brand, headline, offset);
  }
}

function drawKryvantVisual(ctx, canvas, brand, headline, offset) {
  fillBackground(ctx, canvas, '#05080d');
  drawFineGrid(ctx, 72, 92, 936, 1156, 8, 10, 'rgba(255,255,255,0.045)');
  drawTopStatusBar(ctx, 72, 66, 936, 34, ['FLOW DESK', 'MULTI-VENUE', 'INTRADAY CONTEXT'], '#97b8ff');
  drawOrderChart(ctx, 720, 170, 250, 185, brand.color, offset);
  drawMicroBars(ctx, 748, 392, 194, 165, brand.color, offset);

  ctx.fillStyle = brand.color;
  ctx.font = '800 26px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(brand.name, 86, 158);
  ctx.fillStyle = '#8390a4';
  ctx.font = '600 16px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(brand.positioning.toUpperCase(), 86, 188);

  ctx.fillStyle = '#f4f8ff';
  ctx.font = '800 76px system-ui';
  wrap(ctx, headline, 86, 328, 560, 82, 4);

  ctx.fillStyle = '#99a7bb';
  ctx.font = '500 24px system-ui';
  wrap(ctx, pick(brand.visualSubtitles, offset), 86, 620, 560, 34, 4);

  drawDeskStat(ctx, 744, 614, 220, 112, 'FLOW BIAS', pick(['BALANCED', 'SHIFTING', 'BUILDING'], offset), brand.color);
  drawDeskStat(ctx, 744, 756, 220, 112, 'LIQUIDITY', pick(['ACTIVE', 'THINNING', 'FIRM'], offset), brand.color);
  drawDeskStat(ctx, 744, 898, 220, 112, 'CONFIRMATION', pick(['WAITING', 'MIXED', 'CLEAR'], offset), brand.color);

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

function drawLumeriqVisual(ctx, canvas, brand, headline, offset) {
  fillBackground(ctx, canvas, '#11071a');
  drawGradientBlob(ctx, 820, 160, 460, brand.color, 0.32);
  drawGradientBlob(ctx, 200, 1120, 300, '#ff69ff', 0.14);
  drawDiagonalSlice(ctx, 0, 0, 1080, 180, 'rgba(255,255,255,0.03)');
  drawDiagonalSlice(ctx, 0, 1040, 1080, 220, 'rgba(255,255,255,0.025)');

  sticker(ctx, 86, 90, 170, 46, brand.color, 'SIGNAL LAB');
  ctx.fillStyle = '#f3eaff';
  ctx.font = '800 30px system-ui';
  ctx.fillText(brand.name, 86, 184);
  ctx.fillStyle = '#b7a7c7';
  ctx.font = '700 18px system-ui';
  ctx.fillText(brand.positioning.toUpperCase(), 86, 214);

  ctx.fillStyle = '#fff4ff';
  ctx.font = '900 92px system-ui';
  wrap(ctx, headline, 86, 360, 820, 94, 4);

  ctx.fillStyle = '#ceb8df';
  ctx.font = '500 28px system-ui';
  wrap(ctx, pick(brand.visualSubtitles, offset), 86, 690, 760, 38, 4);

  const labels = brand.infoItems || [];
  labels.forEach((item, index) => {
    sticker(ctx, 86 + index * 228, 828, 204, 58, '#241233', item.toUpperCase(), '#f5e6ff', 'stroke');
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

function drawRangenestVisual(ctx, canvas, brand, headline, offset) {
  fillBackground(ctx, canvas, '#081114');
  roundedFill(ctx, 54, 54, 972, 1242, 30, '#0b1519');
  ctx.fillStyle = '#122127';
  ctx.fillRect(54, 54, 972, 72);
  drawWindowDots(ctx, 86, 91, [brand.color, '#9ca3af', '#475569']);
  ctx.fillStyle = '#7b9187';
  ctx.font = '700 16px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText('CONFIGURATION WORKSPACE', 160, 96);

  drawPanel(ctx, 86, 160, 364, 292, 'PRIMARY ACTION', headline, '#edf7f1', brand.color, 60);
  drawPanel(ctx, 476, 160, 518, 192, 'SYSTEM LOGIC', pick(brand.visualSubtitles, offset), '#d7ebe0', brand.color, 28, true);
  drawMetricTile(ctx, 476, 384, 160, 128, 'RANGE', 'VALID', brand.color);
  drawMetricTile(ctx, 654, 384, 160, 128, 'VOLATILITY', pick(['ELEVATED', 'STABLE', 'TRANSITION'], offset), brand.color);
  drawMetricTile(ctx, 832, 384, 162, 128, 'ACTION', pick(['HOLD', 'REVIEW', 'KEEP'], offset), brand.color);

  drawPanel(ctx, 86, 490, 364, 328, 'CONFIGURATION FIT', 'A useful bot configuration matches the market it is actually trading.', '#d2e6db', brand.color, 30, true);
  drawChecklist(ctx, 476, 548, 518, 256, [
    'Range still contains price effectively',
    'Outer zones are not being stressed repeatedly',
    'Structure does not justify a full rebuild',
    'No unnecessary setting changes'
  ], brand.color);

  drawPanel(ctx, 86, 854, 908, 248, 'WHY THIS MATTERS', 'Optimization is not constant adjustment. It is knowing when the market has changed enough to justify a new configuration.', '#d6e7df', brand.color, 32, true);

  roundedFill(ctx, 86, 1138, 908, 114, 24, '#0f1b20');
  ctx.fillStyle = '#86a296';
  ctx.font = '700 17px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(brand.footer.eyebrow, 116, 1186);
  ctx.fillStyle = '#f0f9f4';
  ctx.font = '800 34px system-ui';
  ctx.fillText(brand.footer.title, 116, 1230);
}

function drawNinetyValeVisual(ctx, canvas, brand, headline, offset) {
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
  drawScoreHeader(ctx, 126, 244, ['MODEL VIEW', 'MARKET PRICE', 'VALUE CASE'], [pick(['58%', '56%', '61%'], offset), pick(['52%', '53%', '55%'], offset), pick(['+6%', '+3%', '+8%'], offset)], brand.color);

  ctx.fillStyle = '#fff3ef';
  ctx.font = '900 78px system-ui';
  wrap(ctx, headline, 100, 510, 820, 82, 4);

  ctx.fillStyle = '#d2aba0';
  ctx.font = '500 28px system-ui';
  wrap(ctx, pick(brand.visualSubtitles, offset), 100, 790, 790, 38, 4);

  roundedFill(ctx, 100, 874, 420, 214, 24, 'rgba(31,17,17,0.92)');
  ctx.fillStyle = '#b89289';
  ctx.font = '700 16px system-ui';
  ctx.fillText('SELECTION LOGIC', 128, 920);
  ctx.fillStyle = '#fff5f1';
  ctx.font = '800 46px system-ui';
  ctx.fillText('PRICES', 128, 990);
  ctx.fillText('NOT TEAMS', 128, 1048);

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

function drawArcynthVisual(ctx, canvas, brand, headline, offset) {
  fillBackground(ctx, canvas, '#061217');
  drawResearchGrid(ctx, canvas, brand.color);
  drawOrbit(ctx, 825, 370, 170, brand.color);
  drawForecastWave(ctx, 110, 700, 860, brand.color, offset);

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
  ctx.font = '900 82px system-ui';
  wrap(ctx, headline, 90, 410, 560, 86, 4);

  ctx.fillStyle = '#a8c1c7';
  ctx.font = '500 27px system-ui';
  wrap(ctx, pick(brand.visualSubtitles, offset), 90, 646, 600, 38, 4);

  drawForecastChip(ctx, 760, 624, 240, 94, 'NEXT PHASE', pick(['BUILDING', 'COOLING', 'SHIFTING'], offset), brand.color);
  drawForecastChip(ctx, 760, 740, 240, 94, 'TURNING ZONE', pick(['AHEAD', 'ACTIVE', 'MONITORED'], offset), brand.color);
  drawForecastChip(ctx, 760, 856, 240, 94, 'STATUS', 'LOCKED', brand.color);

  roundedFill(ctx, 90, 1010, 910, 166, 24, 'rgba(11,24,29,0.92)');
  ctx.fillStyle = '#93b2b8';
  ctx.font = '700 17px system-ui';
  ctx.fillText(brand.footer.eyebrow, 118, 1060);
  ctx.fillStyle = '#f2fcff';
  ctx.font = '800 38px system-ui';
  ctx.fillText(brand.footer.title, 118, 1114);
  ctx.fillStyle = '#b0cbd0';
  ctx.font = '500 22px system-ui';
  ctx.fillText('Locked outlooks connect short-, medium- and long-term direction.', 118, 1160);

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

function drawOrderChart(ctx, x, y, w, h, color, offset) {
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
  ctx.moveTo(x + 18, y + h - 40);
  const points = [0, -18, -10, -32, -14, -54, -26, -46, -74, -58];
  points.forEach((delta, idx) => {
    ctx.lineTo(x + 18 + idx * 22, y + h - 40 + delta + ((offset % 2) ? 4 : -4));
  });
  ctx.stroke();
}

function drawMicroBars(ctx, x, y, w, h, color, offset) {
  roundedStroke(ctx, x, y, w, h, 18, 'rgba(102,153,255,0.22)');
  for (let i = 0; i < 8; i++) {
    const bw = 12;
    const bh = 38 + ((i + offset) % 5) * 18;
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
    ctx.font = '700 14px system-ui';
    ctx.fillText(label, bx, y);
    ctx.fillStyle = accent;
    ctx.font = '900 44px system-ui';
    ctx.fillText(values[index], bx, y + 58);
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

function drawOrbit(ctx, x, y, radius, accent) {
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1.5;
  [radius, radius - 34, radius - 68].forEach((r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(x + radius - 18, y - 22, 10, 0, Math.PI * 2);
  ctx.fill();
}

function drawForecastWave(ctx, x, y, w, accent, offset) {
  ctx.strokeStyle = accent;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x, y + 60);
  ctx.bezierCurveTo(x + 140, y + 10, x + 230, y + 110, x + 340, y + 50 + (offset % 2 ? 18 : -12));
  ctx.bezierCurveTo(x + 450, y - 10, x + 540, y + 110, x + 650, y + 52);
  ctx.bezierCurveTo(x + 760, y + 10, x + 820, y + 80, x + w, y + 24);
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
