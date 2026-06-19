// FILE: src/lib/contentSafety.js

export const FORBIDDEN_TERMS = [
  'micro',
  'family',
  'families',
  'misfit',
  'currentfit',
  'fitscore',
  '75-child',
  '75 child',
  'net totalr',
  'totalr',
  'avgr',
  'avgcostr',
  'directsl',
  'adaptive',
  'scanner',
  'analyze',
  'redis',
  'long_live',
  'short_live',
  'micro_long',
  'micro_short',
  'trueMicroFamilyId'.toLowerCase(),
  'marketweather',
  'current fit'
];

export const HYPE_TERMS = [
  'guaranteed profit',
  'guaranteed profits',
  'zeker winst',
  'gegarandeerde winst',
  '100% winrate',
  'risk-free',
  'no risk',
  'no loss',
  'word rijk',
  'get rich',
  'lambo',
  'moonshot',
  'to the moon'
];

function normalize(value) {
  return String(value || '').toLowerCase();
}

export function findBlockedTerms(value) {
  const text = normalize(value);
  const terms = [...FORBIDDEN_TERMS, ...HYPE_TERMS];
  return terms.filter((term) => text.includes(term));
}

export function assertPublicTextSafe(value, label = 'text') {
  const found = findBlockedTerms(value);

  if (found.length > 0) {
    throw new Error(`${label} contains blocked internal or unsafe language: ${found.join(', ')}`);
  }
}

export function assertManyPublicTextsSafe(entries) {
  for (const entry of entries) {
    const label = entry?.label || 'text';
    const value = entry?.value || '';
    assertPublicTextSafe(value, label);
  }
}
