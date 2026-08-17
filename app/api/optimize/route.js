import { NextResponse } from 'next/server';
import { BRANDS } from '../../../lib/brands';

export const dynamic = 'force-dynamic';

const X_MAX_CHARACTERS = 280;
const X_MAX_HASHTAGS = 4;
const INPUT_MAX_CHARACTERS = 3000;

function cleanText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function cleanModelText(value) {
  return cleanText(value)
    .replace(/^```(?:text)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .replace(/^['“”"]+|['“”"]+$/g, '')
    .trim();
}

function clipAtWord(text, maxLength) {
  const clean = cleanText(text);
  if (clean.length <= maxLength) return clean;
  if (maxLength <= 1) return clean.slice(0, Math.max(0, maxLength));

  const slice = clean.slice(0, maxLength - 1);
  const lastSpace = slice.lastIndexOf(' ');
  const safe = lastSpace >= Math.min(40, Math.floor(maxLength * 0.6))
    ? slice.slice(0, lastSpace)
    : slice;
  return `${safe.trimEnd()}…`;
}

function normalizeDiscord(value) {
  const clean = cleanText(value);
  if (!clean || clean.length > 160) return '';
  if (!/^https:\/\/(discord\.gg|discord\.com)\//i.test(clean)) return '';
  return clean;
}

async function cryptoTrending() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/search/trending', {
      cache: 'no-store',
      headers: { accept: 'application/json' }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return (data.coins || [])
      .slice(0, 6)
      .map((row) => row?.item?.symbol)
      .filter(Boolean)
      .map((symbol) => `#${String(symbol).toLowerCase().replace(/[^a-z0-9]/g, '')}`)
      .filter((value) => value.length > 1);
  } catch {
    return [];
  }
}

function mergeHashtags(base, live) {
  const liveTags = [...new Set(live)].slice(0, 2);
  const curated = [...new Set(base || [])].filter((tag) => !liveTags.includes(tag));
  return [...liveTags, ...curated].slice(0, X_MAX_HASHTAGS);
}

function composeSuffix(discord, hashtags) {
  const parts = [];
  if (discord) parts.push(`Join: ${discord}`);
  if (hashtags.length) parts.push(hashtags.join(' '));
  return parts.join('\n');
}

function extractOutputText(payload) {
  const parts = [];
  for (const item of Array.isArray(payload?.output) ? payload.output : []) {
    for (const content of Array.isArray(item?.content) ? item.content : []) {
      if (content?.type === 'output_text' && content?.text) parts.push(content.text);
    }
  }
  return parts.join('\n').trim();
}

export async function POST(request) {
  const apiKey = cleanText(process.env.OPENAI_API_KEY);
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: 'OPENAI_API_KEY_MISSING' }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'INVALID_JSON' }, { status: 400 });
  }

  const slug = cleanText(body?.brand).toLowerCase();
  const sourceText = cleanText(body?.text).slice(0, INPUT_MAX_CHARACTERS);
  const discord = normalizeDiscord(body?.discord);
  const brand = BRANDS[slug];

  if (!brand) {
    return NextResponse.json({ ok: false, error: 'UNKNOWN_BRAND' }, { status: 400 });
  }
  if (!sourceText) {
    return NextResponse.json({ ok: false, error: 'TEXT_REQUIRED' }, { status: 400 });
  }

  const live = slug === 'ninetyvale' ? [] : await cryptoTrending();
  const hashtags = mergeHashtags(brand.hashtags, live);
  const suffix = composeSuffix(discord, hashtags);
  const bodyBudget = Math.max(80, X_MAX_CHARACTERS - (suffix ? suffix.length + 1 : 0));

  const instructions = [
    'You are a senior international social-media copy editor.',
    `Brand: ${brand.name}. Positioning: ${brand.positioning}.`,
    'Rewrite the supplied text into natural, concise, high-impact English.',
    'Preserve the real meaning and facts. Improve clarity, wording, rhythm and marketing strength.',
    'Do not invent performance, results, customers, statistics, guarantees, urgency, scarcity or product features.',
    'Never promise profits, winning bets, guaranteed trading results or certainty.',
    'If the input is already English, improve it instead of translating it.',
    `Return exactly one finished post body of at most ${bodyBudget} characters.`,
    'Do not add hashtags, links, labels, quotation marks, markdown or explanations.'
  ].join(' ');

  let openaiResponse;
  try {
    openaiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: cleanText(process.env.OPENAI_MARKETING_MODEL) || 'gpt-5-mini',
        instructions,
        input: sourceText,
        max_output_tokens: 220,
        store: false
      }),
      cache: 'no-store'
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'OPENAI_UNREACHABLE' }, { status: 502 });
  }

  let payload = {};
  try {
    payload = await openaiResponse.json();
  } catch {
    // handled below
  }

  if (!openaiResponse.ok) {
    console.error('CONTENT_HQ_OPTIMIZE_OPENAI_ERROR', {
      status: openaiResponse.status,
      error: payload?.error?.message || 'unknown_error'
    });
    return NextResponse.json({ ok: false, error: 'OPENAI_REQUEST_FAILED' }, { status: 502 });
  }

  const optimizedBody = clipAtWord(cleanModelText(extractOutputText(payload)), bodyBudget);
  if (!optimizedBody) {
    return NextResponse.json({ ok: false, error: 'OPENAI_EMPTY_OUTPUT' }, { status: 502 });
  }

  const post = suffix ? `${optimizedBody}\n${suffix}` : optimizedBody;

  return NextResponse.json({
    ok: true,
    brand: brand.name,
    post: post.slice(0, X_MAX_CHARACTERS),
    characterCount: Math.min(post.length, X_MAX_CHARACTERS),
    hashtags,
    trendSource: live.length ? 'CoinGecko live + curated' : 'curated',
    generatedAt: new Date().toISOString()
  });
}
