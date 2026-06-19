// FILE: src/lib/data.js

import { prisma } from '@/lib/prisma';
import { LOCALES, normalizeLocale } from '@/lib/i18n';

export async function getPublicHomeData(localeInput) {
  const locale = normalizeLocale(localeInput);

  const updates = await prisma.dailyUpdate.findMany({
    where: { status: 'published' },
    orderBy: { date: 'desc' },
    take: 7,
    include: {
      translations: true
    }
  });

  const latestUpdate = updates[0] || null;

  const screenshots = await prisma.screenshot.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' },
    take: 6,
    include: {
      translations: true
    }
  });

  return {
    locale,
    updates: updates.map((update) => withUpdateTranslation(update, locale)),
    latestUpdate: latestUpdate ? withUpdateTranslation(latestUpdate, locale) : null,
    screenshots: screenshots.map((screenshot) => withScreenshotTranslation(screenshot, locale))
  };
}

export function withUpdateTranslation(update, locale) {
  const translation = update.translations.find((item) => item.locale === locale)
    || update.translations.find((item) => item.locale === 'en')
    || update.translations[0]
    || null;

  return {
    ...update,
    translation
  };
}

export function withScreenshotTranslation(screenshot, locale) {
  const translation = screenshot.translations.find((item) => item.locale === locale)
    || screenshot.translations.find((item) => item.locale === 'en')
    || screenshot.translations[0]
    || null;

  return {
    ...screenshot,
    translation
  };
}

export function emptyTranslationsForLocales(prefix = '') {
  return LOCALES.reduce((acc, locale) => {
    acc[`${prefix}${locale}`] = '';
    return acc;
  }, {});
}
