import { NextResponse } from 'next/server';
import { BRANDS } from '../../../lib/brands';
import { getVariant, getPromotion, promotionDue, nextPromotionDate } from '../../../lib/content';

export const dynamic = 'force-dynamic';

const X_MAX_CHARACTERS = 280;
const X_MAX_HASHTAGS = 4;
const X_MIN_BODY_BUDGET = 80;

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
  const liveTags = [...new Set(live)].slice(0, 2);
  const curated = [...new Set(base)].filter((tag) => !liveTags.includes(tag));
  return [...liveTags, ...curated].slice(0, X_MAX_HASHTAGS);
}

function cleanText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
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

function composeSuffix(discord, hashtags) {
  const parts = [];
  if (discord) parts.push(`Join: ${discord}`);
  if (hashtags.length) parts.push(hashtags.join(' '));
  return parts.join('\n');
}

function buildXPost(text, hashtags, discord) {
  const clean = cleanText(text);
  let selectedTags = [...new Set(hashtags)].slice(0, X_MAX_HASHTAGS);
  let selectedDiscord = cleanText(discord);
  let suffix = composeSuffix(selectedDiscord, selectedTags);
  let bodyBudget = X_MAX_CHARACTERS - (suffix ? suffix.length + 1 : 0);

  // Preserve the unique daily copy whenever possible. Hashtags are reduced before the message itself is shortened.
  while (selectedTags.length > 1 && clean.length > bodyBudget) {
    selectedTags = selectedTags.slice(0, -1);
    suffix = composeSuffix(selectedDiscord, selectedTags);
    bodyBudget = X_MAX_CHARACTERS - (suffix ? suffix.length + 1 : 0);
  }

  // A pathological custom Discord URL must never make an X post exceed 280 characters.
  if (bodyBudget < X_MIN_BODY_BUDGET && selectedDiscord) {
    selectedDiscord = '';
    suffix = composeSuffix(selectedDiscord, selectedTags);
    bodyBudget = X_MAX_CHARACTERS - (suffix ? suffix.length + 1 : 0);
  }

  const body = clipAtWord(clean, Math.max(0, bodyBudget));
  const post = suffix ? `${body}\n${suffix}` : body;

  return {
    post: post.slice(0, X_MAX_CHARACTERS),
    hashtags: selectedTags,
    characterCount: Math.min(post.length, X_MAX_CHARACTERS)
  };
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
  const hashtagPool = mergeHashtags(brand.hashtags, live);
  const daily = buildXPost(variant.text, hashtagPool, discord);
  const promotion = buildXPost(getPromotion(slug), hashtagPool, discord);

  return NextResponse.json({
    ok: true,
    brand: brand.name,
    headline: variant.headline,
    explanationNl: brand.descriptionNl,
    post: daily.post,
    postCharacterCount: daily.characterCount,
    postVariant: variant.index + 1,
    postVariantTotal: variant.total,
    hashtags: daily.hashtags,
    trendSource: live.length ? 'CoinGecko live + curated' : 'curated',
    promotion: promotion.post,
    promotionCharacterCount: promotion.characterCount,
    promotionDue: promotionDue(),
    nextPromotionDate: nextPromotionDate().toISOString(),
    generatedAt: new Date().toISOString()
  });
}
