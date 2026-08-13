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
