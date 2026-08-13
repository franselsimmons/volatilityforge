//file: lib/content.js

import { BRANDS, PROMOTIONS } from './brands';

const COMBINATION_SPACE = 4096; // 8 × 8 × 8 × 8
const PERMUTATION_MULTIPLIER = 137; // odd => coprime with 4096
const DAYS_PER_CONTENT_CYCLE = 366;

function dayOfYearUtc(date = new Date()) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 1);
  const current = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return Math.floor((current - start) / 86400000);
}

function positiveModulo(value, modulo) {
  return ((value % modulo) + modulo) % modulo;
}

function selectContentIndexes(brand, dayIndex, offset) {
  const sequence = dayIndex + (offset * DAYS_PER_CONTENT_CYCLE);
  let mixed = positiveModulo(
    (sequence * PERMUTATION_MULTIPLIER) + brand.contentSeed,
    COMBINATION_SPACE
  );

  const hook = mixed % 8;
  mixed = Math.floor(mixed / 8);
  const observation = mixed % 8;
  mixed = Math.floor(mixed / 8);
  const interpretation = mixed % 8;
  mixed = Math.floor(mixed / 8);
  const decision = mixed % 8;

  return { hook, observation, interpretation, decision };
}

function buildPost(brand, dayIndex, offset) {
  const indexes = selectContentIndexes(brand, dayIndex, offset);
  const closingIndex = positiveModulo(
    (dayIndex * 5) + (offset * 3) + brand.contentSeed,
    brand.content.closers.length
  );

  return [
    brand.content.hooks[indexes.hook],
    brand.content.observations[indexes.observation],
    brand.content.interpretations[indexes.interpretation],
    brand.content.decisions[indexes.decision],
    brand.content.closers[closingIndex]
  ].join('\n\n');
}

export function getVariant(slug, offset = 0, date = new Date()) {
  const brand = BRANDS[slug];
  if (!brand) return null;

  const dayIndex = dayOfYearUtc(date);
  const safeOffset = Number.isFinite(offset) ? Math.trunc(offset) : 0;
  const text = buildPost(brand, dayIndex, safeOffset);

  const headlineIndex = positiveModulo(
    (dayIndex * 7) + safeOffset + brand.contentSeed,
    brand.headlines.length
  );

  return {
    text,
    headline: brand.headlines[headlineIndex]
  };
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
  const diff = Math.floor((today - anchor) / 86400000);
  const mod = positiveModulo(diff, 14);
  const add = mod === 0 ? 0 : 14 - mod;
  const result = new Date(today);
  result.setUTCDate(result.getUTCDate() + add);
  return result;
}
