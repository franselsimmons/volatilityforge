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
