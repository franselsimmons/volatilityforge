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
