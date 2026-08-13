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

function drawVisual(canvas, brand, headline, offset = 0) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  clearCanvas(ctx, canvas);

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

function clearCanvas(ctx, canvas) {
  ctx.fillStyle = '#06090f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawKryvantVisual(ctx, canvas, brand, headline, offset) {
  addLinearGlow(ctx, canvas, brand.color, 0.22, 0, 0, canvas.width, 0);
  drawGrid(ctx, 90, 120, 900, 1080, 6, 6, 'rgba(255,255,255,0.04)');
  drawOrderWave(ctx, brand.color, offset);

  ctx.fillStyle = brand.color;
  ctx.font = '800 34px system-ui';
  ctx.fillText(brand.name, 92, 120);
  ctx.fillStyle = '#8f9db3';
  ctx.font = '700 21px system-ui';
  ctx.fillText(brand.positioning.toUpperCase(), 92, 162);

  pill(ctx, 750, 88, 240, 48, 'rgba(12,17,26,0.95)', '1PX DEPTH READ · LIVE', '#cfe0ff', 18);

  ctx.fillStyle = '#eff4fb';
  ctx.font = '800 84px system-ui';
  wrap(ctx, headline, 92, 380, 720, 90, 4);

  ctx.fillStyle = '#9fb0c4';
  ctx.font = '500 28px system-ui';
  wrap(ctx, pick(brand.visualSubtitles, offset), 92, 700, 650, 42, 3);

  const items = brand.infoItems || [];
  items.forEach((item, index) => {
    const x = 92 + index * 298;
    roundedBox(ctx, x, 860, 270, 120, 18, 'rgba(10,15,23,0.92)', 'rgba(83,111,157,0.35)');
    ctx.fillStyle = brand.color;
    ctx.font = '700 18px system-ui';
    ctx.fillText(item.toUpperCase(), x + 22, 900);
    ctx.fillStyle = '#edf2f8';
    ctx.font = '800 32px system-ui';
    ctx.fillText(kryvantMetric(index, offset), x + 22, 950);
  });

  footerBand(ctx, 92, 1115, 900, 120, 18, 'rgba(11,16,24,0.96)', 'rgba(67,97,148,0.25)');
  ctx.fillStyle = '#8fa0b5';
  ctx.font = '700 19px system-ui';
  ctx.fillText(brand.footer.eyebrow, 124, 1163);
  ctx.fillStyle = '#f5f8fc';
  ctx.font = '800 38px system-ui';
  ctx.fillText(brand.footer.title, 124, 1211);

  ctx.fillStyle = brand.color;
  ctx.fillRect(92, 1272, 900, 6);
}

function drawLumeriqVisual(ctx, canvas, brand, headline, offset) {
  ctx.fillStyle = '#080810';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  addLinearGlow(ctx, canvas, brand.color, 0.28, canvas.width, 0, 140, 400);
  addAngledPanel(ctx, 620, 70, 340, 250, 20, `rgba(${hexRgb(brand.color).join(',')},0.16)`);
  addAngledPanel(ctx, 130, 930, 350, 170, 18, `rgba(${hexRgb(brand.color).join(',')},0.14)`);

  pill(ctx, 92, 88, 156, 44, 'rgba(22,14,33,0.95)', 'LIVE SIGNAL BRAND', '#e6d8ff', 17);
  ctx.fillStyle = brand.color;
  ctx.font = '800 34px system-ui';
  ctx.fillText(brand.name, 92, 180);
  ctx.fillStyle = '#928da7';
  ctx.font = '700 20px system-ui';
  ctx.fillText(brand.positioning.toUpperCase(), 92, 216);

  roundedBox(ctx, 92, 280, 896, 340, 28, 'rgba(18,13,26,0.78)', 'rgba(185,121,255,0.18)');
  ctx.fillStyle = '#fbf7ff';
  ctx.font = '900 88px system-ui';
  wrap(ctx, headline, 128, 408, 740, 92, 4);

  const tags = brand.infoItems || [];
  tags.forEach((tag, index) => {
    pill(ctx, 126 + index * 245, 658, 220, 52, 'rgba(38,24,58,0.95)', tag.toUpperCase(), '#eddcff', 18);
  });

  ctx.fillStyle = '#cbb7df';
  ctx.font = '500 28px system-ui';
  wrap(ctx, pick(brand.visualSubtitles, offset), 126, 780, 720, 40, 3);

  roundedBox(ctx, 92, 1025, 760, 140, 28, 'rgba(19,14,28,0.96)', 'rgba(185,121,255,0.22)');
  ctx.fillStyle = '#a892c1';
  ctx.font = '700 18px system-ui';
  ctx.fillText(brand.footer.eyebrow, 126, 1074);
  ctx.fillStyle = '#f8f1ff';
  ctx.font = '800 40px system-ui';
  ctx.fillText(brand.footer.title, 126, 1127);

  ctx.fillStyle = brand.color;
  ctx.fillRect(92, 1244, 760, 7);
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  ctx.fillRect(878, 1018, 110, 248);
  ctx.fillStyle = '#f6f0ff';
  ctx.font = '900 26px system-ui';
  ctx.save();
  ctx.translate(932, 1158);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('MARKET', 0, 0);
  ctx.restore();
}

function drawRangenestVisual(ctx, canvas, brand, headline, offset) {
  ctx.fillStyle = '#071017';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  addLinearGlow(ctx, canvas, brand.color, 0.22, canvas.width, 140, 220, 140);
  drawDashboardDots(ctx, 910, 114, brand.color);

  ctx.fillStyle = '#dff9ee';
  ctx.font = '800 34px system-ui';
  ctx.fillText(brand.name, 92, 120);
  ctx.fillStyle = '#89a498';
  ctx.font = '700 20px system-ui';
  ctx.fillText(brand.positioning.toUpperCase(), 92, 154);

  roundedBox(ctx, 92, 208, 896, 170, 24, 'rgba(10,20,24,0.92)', 'rgba(71,141,112,0.32)');
  ctx.fillStyle = '#f2fbf6';
  ctx.font = '900 74px system-ui';
  wrap(ctx, headline, 122, 302, 590, 78, 3);
  pill(ctx, 760, 242, 188, 48, 'rgba(17,39,31,0.95)', 'CONFIG LIVE', '#d8fff0', 18);
  ctx.fillStyle = '#a2b7ad';
  ctx.font = '500 28px system-ui';
  wrap(ctx, pick(brand.visualSubtitles, offset), 122, 440, 710, 38, 3);

  const labels = brand.infoItems || [];
  const values = [
    ['VALID', 'Current structure still fits.'],
    ['ELEVATED', 'Higher than base, still acceptable.'],
    ['HOLD', 'No justified change.']
  ];
  labels.forEach((label, index) => {
    const x = 92 + index * 300;
    roundedBox(ctx, x, 610, 270, 200, 22, 'rgba(10,19,22,0.98)', 'rgba(66,119,96,0.27)');
    ctx.fillStyle = brand.color;
    ctx.font = '700 18px system-ui';
    ctx.fillText(label.toUpperCase(), x + 22, 652);
    ctx.fillStyle = '#eff7f1';
    ctx.font = '900 38px system-ui';
    ctx.fillText(values[index][0], x + 22, 708);
    ctx.fillStyle = '#93aba0';
    ctx.font = '500 22px system-ui';
    wrap(ctx, values[index][1], x + 22, 748, 220, 28, 3);
  });

  roundedBox(ctx, 92, 885, 896, 250, 24, 'rgba(8,15,18,0.96)', 'rgba(65,121,99,0.25)');
  ctx.fillStyle = '#9db1a7';
  ctx.font = '700 18px system-ui';
  ctx.fillText('CONFIGURATION NOTES', 122, 934);
  drawConfigRow(ctx, 122, 990, 'Range Status', 'STRUCTURE INTACT');
  drawConfigRow(ctx, 122, 1048, 'Bot Action', 'KEEP SETTINGS');
  drawConfigRow(ctx, 122, 1106, 'Review Logic', 'CHANGE ONLY IF JUSTIFIED');

  footerBand(ctx, 92, 1184, 760, 92, 22, 'rgba(14,24,30,0.96)', 'rgba(87,143,119,0.20)');
  ctx.fillStyle = '#8fa59a';
  ctx.font = '700 17px system-ui';
  ctx.fillText(brand.footer.eyebrow, 122, 1220);
  ctx.fillStyle = '#f1f8f3';
  ctx.font = '800 34px system-ui';
  ctx.fillText(brand.footer.title, 122, 1258);
}

function drawNinetyValeVisual(ctx, canvas, brand, headline, offset) {
  ctx.fillStyle = '#0d090a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  addLinearGlow(ctx, canvas, brand.color, 0.20, canvas.width, 100, 140, 420);
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.fillRect(525, 120, 2, 1060);

  ctx.fillStyle = brand.color;
  ctx.font = '800 34px system-ui';
  ctx.fillText(brand.name, 92, 124);
  ctx.fillStyle = '#b2928c';
  ctx.font = '700 20px system-ui';
  ctx.fillText(brand.positioning.toUpperCase(), 92, 160);

  ctx.fillStyle = '#fff6f3';
  ctx.font = '900 84px system-ui';
  wrap(ctx, headline, 92, 340, 380, 88, 4);

  ctx.fillStyle = '#ceb0a8';
  ctx.font = '500 28px system-ui';
  wrap(ctx, pick(brand.visualSubtitles, offset), 92, 650, 380, 40, 4);

  roundedBox(ctx, 578, 160, 330, 160, 24, 'rgba(29,15,15,0.92)', 'rgba(238,138,120,0.24)');
  ctx.fillStyle = '#9e807b';
  ctx.font = '700 16px system-ui';
  ctx.fillText('MODEL VIEW', 604, 204);
  ctx.fillStyle = '#fff3ef';
  ctx.font = '900 48px system-ui';
  ctx.fillText('58%', 604, 268);
  ctx.fillStyle = '#d6b2a8';
  ctx.font = '500 20px system-ui';
  ctx.fillText('Estimated win probability', 604, 302);

  roundedBox(ctx, 578, 352, 330, 160, 24, 'rgba(29,15,15,0.92)', 'rgba(238,138,120,0.24)');
  ctx.fillStyle = '#9e807b';
  ctx.font = '700 16px system-ui';
  ctx.fillText('MARKET PRICE', 604, 396);
  ctx.fillStyle = '#fff3ef';
  ctx.font = '900 48px system-ui';
  ctx.fillText('52%', 604, 460);
  ctx.fillStyle = '#d6b2a8';
  ctx.font = '500 20px system-ui';
  ctx.fillText('Implied probability', 604, 494);

  roundedBox(ctx, 578, 544, 330, 240, 24, 'rgba(29,15,15,0.92)', 'rgba(238,138,120,0.24)');
  ctx.fillStyle = '#9e807b';
  ctx.font = '700 16px system-ui';
  ctx.fillText('VALUE CALL', 604, 588);
  ctx.fillStyle = '#fff3ef';
  ctx.font = '900 54px system-ui';
  ctx.fillText('EDGE', 604, 656);
  ctx.fillText('+6%', 604, 714);
  pill(ctx, 604, 732, 190, 44, 'rgba(59,22,20,0.95)', 'PRICE WORTH REVIEWING', '#ffe1d7', 16);

  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.fillRect(92, 835, 816, 2);
  footerBand(ctx, 92, 930, 816, 180, 24, 'rgba(25,12,12,0.96)', 'rgba(238,138,120,0.20)');
  ctx.fillStyle = '#b8948c';
  ctx.font = '700 18px system-ui';
  ctx.fillText(brand.footer.eyebrow, 122, 984);
  ctx.fillStyle = '#fff4ef';
  ctx.font = '800 38px system-ui';
  ctx.fillText(brand.footer.title, 122, 1038);
  ctx.fillStyle = '#dab4a9';
  ctx.font = '500 23px system-ui';
  ctx.fillText('Selections are published before kick-off during the public phase.', 122, 1088);

  ctx.fillStyle = brand.color;
  ctx.fillRect(92, 1160, 816, 6);
}

function drawArcynthVisual(ctx, canvas, brand, headline, offset) {
  ctx.fillStyle = '#071014';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  addLinearGlow(ctx, canvas, brand.color, 0.18, canvas.width, 0, 80, 400);
  drawHorizonPaths(ctx, brand.color, offset);

  ctx.fillStyle = brand.color;
  ctx.font = '800 34px system-ui';
  ctx.fillText(brand.name, 92, 120);
  ctx.fillStyle = '#8ea7ad';
  ctx.font = '700 20px system-ui';
  ctx.fillText(brand.positioning.toUpperCase(), 92, 156);

  const horizons = ['24H', '7D', '30D'];
  horizons.forEach((item, index) => {
    pill(ctx, 92 + index * 134, 208, 110, 44, 'rgba(12,24,29,0.92)', item, '#defaff', 18);
  });

  ctx.fillStyle = '#f0fbfd';
  ctx.font = '900 82px system-ui';
  wrap(ctx, headline, 92, 392, 620, 88, 4);

  ctx.fillStyle = '#a6c3c8';
  ctx.font = '500 28px system-ui';
  wrap(ctx, pick(brand.visualSubtitles, offset), 92, 660, 620, 40, 4);

  roundedBox(ctx, 750, 216, 240, 120, 20, 'rgba(9,24,28,0.94)', 'rgba(107,212,223,0.24)');
  ctx.fillStyle = '#90bac1';
  ctx.font = '700 16px system-ui';
  ctx.fillText('NEXT PHASE', 778, 258);
  ctx.fillStyle = '#f0fbfd';
  ctx.font = '900 34px system-ui';
  ctx.fillText('BUILDING', 778, 306);

  roundedBox(ctx, 750, 370, 240, 120, 20, 'rgba(9,24,28,0.94)', 'rgba(107,212,223,0.24)');
  ctx.fillStyle = '#90bac1';
  ctx.font = '700 16px system-ui';
  ctx.fillText('TURN ZONE', 778, 412);
  ctx.fillStyle = '#f0fbfd';
  ctx.font = '900 34px system-ui';
  ctx.fillText('AHEAD', 778, 460);

  roundedBox(ctx, 750, 524, 240, 120, 20, 'rgba(9,24,28,0.94)', 'rgba(107,212,223,0.24)');
  ctx.fillStyle = '#90bac1';
  ctx.font = '700 16px system-ui';
  ctx.fillText('OUTLOOK', 778, 566);
  ctx.fillStyle = '#f0fbfd';
  ctx.font = '900 34px system-ui';
  ctx.fillText('LOCKED', 778, 614);

  roundedBox(ctx, 92, 870, 898, 250, 26, 'rgba(10,20,24,0.96)', 'rgba(107,212,223,0.20)');
  ctx.fillStyle = '#91bcc3';
  ctx.font = '700 18px system-ui';
  ctx.fillText('HORIZON MAP', 122, 922);
  drawTimelineRow(ctx, 122, 980, '24H', 'Short-term phase can cool without breaking the broader route.', brand.color, 0.95);
  drawTimelineRow(ctx, 122, 1044, '7D', 'Medium-term structure keeps the market path coherent.', brand.color, 0.72);
  drawTimelineRow(ctx, 122, 1108, '30D', 'Long-term direction gives context to smaller turns.', brand.color, 0.55);

  ctx.fillStyle = brand.color;
  ctx.fillRect(92, 1240, 898, 6);
  ctx.fillStyle = '#8eaeb2';
  ctx.font = '700 18px system-ui';
  ctx.fillText(brand.footer.eyebrow, 92, 1280);
  ctx.fillStyle = '#f2fcfd';
  ctx.font = '800 34px system-ui';
  ctx.fillText(brand.footer.title, 326, 1280);
}

function kryvantMetric(index, offset) {
  const rows = [
    ['BALANCED', 'SHIFTING', 'BUILDING'],
    ['ACTIVE', 'THINNING', 'FIRM'],
    ['WAITING', 'MIXED', 'CLEAR']
  ];
  return rows[index][offset % rows[index].length];
}

function drawOrderWave(ctx, color, offset) {
  ctx.strokeStyle = hexToRgba(color, 0.7);
  ctx.lineWidth = 2;
  ctx.beginPath();
  let x = 720;
  let y = 250;
  ctx.moveTo(x, y);
  for (let i = 0; i < 12; i++) {
    x += 28;
    y += ((i + offset) % 2 === 0 ? -14 : 18);
    ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function drawDashboardDots(ctx, x, y, color) {
  ['#364356', '#364356', color].forEach((fill, index) => {
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(x + index * 24, y, 6, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawConfigRow(ctx, x, y, left, right) {
  ctx.fillStyle = '#8ea69b';
  ctx.font = '700 18px system-ui';
  ctx.fillText(left.toUpperCase(), x, y);
  ctx.fillStyle = '#f1f8f3';
  ctx.font = '800 24px system-ui';
  ctx.fillText(right, x + 290, y);
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.fillRect(x, y + 18, 780, 1.5);
}

function drawHorizonPaths(ctx, color, offset) {
  const opacity = [0.9, 0.65, 0.42];
  const starts = [270, 350, 430];
  starts.forEach((startY, index) => {
    ctx.strokeStyle = hexToRgba(color, opacity[index]);
    ctx.lineWidth = index === 0 ? 4 : 3;
    ctx.beginPath();
    ctx.moveTo(700, startY);
    ctx.bezierCurveTo(775, startY - 18 + index * 6, 835, startY + 35 - index * 4, 915, startY + ((offset + index) % 2 === 0 ? -10 : 20));
    ctx.bezierCurveTo(950, startY + 15, 975, startY - 12, 995, startY + 2);
    ctx.stroke();
  });
}

function drawTimelineRow(ctx, x, y, label, text, color, widthScale) {
  ctx.fillStyle = '#effbfd';
  ctx.font = '800 22px system-ui';
  ctx.fillText(label, x, y);
  ctx.fillStyle = '#a7c4c8';
  ctx.font = '500 21px system-ui';
  ctx.fillText(text, x + 110, y);
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  rounded(ctx, x + 110, y + 16, 650, 10, 999);
  ctx.fill();
  ctx.fillStyle = color;
  rounded(ctx, x + 110, y + 16, 650 * widthScale, 10, 999);
  ctx.fill();
}

function addLinearGlow(ctx, canvas, color, alpha, x0, y0, x1, y1) {
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
  gradient.addColorStop(0, hexToRgba(color, alpha));
  gradient.addColorStop(1, 'rgba(7,10,15,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGrid(ctx, x, y, width, height, cols, rows, stroke) {
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1;
  for (let i = 0; i <= cols; i++) {
    const dx = x + (width / cols) * i;
    ctx.beginPath();
    ctx.moveTo(dx, y);
    ctx.lineTo(dx, y + height);
    ctx.stroke();
  }
  for (let j = 0; j <= rows; j++) {
    const dy = y + (height / rows) * j;
    ctx.beginPath();
    ctx.moveTo(x, dy);
    ctx.lineTo(x + width, dy);
    ctx.stroke();
  }
}

function addAngledPanel(ctx, x, y, width, height, slant, fill) {
  ctx.beginPath();
  ctx.moveTo(x + slant, y);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width - slant, y + height);
  ctx.lineTo(x, y + height);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function pill(ctx, x, y, width, height, fill, text, textColor, fontSize = 18) {
  ctx.fillStyle = fill;
  rounded(ctx, x, y, width, height, height / 2);
  ctx.fill();
  ctx.fillStyle = textColor;
  ctx.font = `800 ${fontSize}px system-ui`;
  ctx.fillText(text, x + 18, y + height / 2 + fontSize / 3 - 2);
}

function footerBand(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1.2;
  rounded(ctx, x, y, width, height, radius);
  ctx.fill();
  ctx.stroke();
}

function roundedBox(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1.2;
  rounded(ctx, x, y, width, height, radius);
  ctx.fill();
  ctx.stroke();
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
  return values[offset % values.length] || '';
}

function rounded(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
}

function hexToRgba(hex, alpha) {
  const [r, g, b] = hexRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

function hexRgb(hex) {
  const value = parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}
