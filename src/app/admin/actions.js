// FILE: src/app/admin/actions.js

'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { loginWithPassword, logout, requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { LOCALES } from '@/lib/i18n';
import { assertManyPublicTextsSafe, assertPublicTextSafe } from '@/lib/contentSafety';

function asInt(value) {
  const n = Number.parseInt(String(value || '0'), 10);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function asText(formData, key) {
  return String(formData.get(key) || '').trim();
}

function asStatus(value) {
  const status = String(value || 'draft');
  return ['draft', 'review', 'published', 'hidden'].includes(status) ? status : 'draft';
}

function refreshAll() {
  revalidatePath('/admin');
  for (const locale of LOCALES) {
    revalidatePath(`/${locale}`);
  }
}

export async function loginAction(formData) {
  const email = asText(formData, 'email');
  const password = asText(formData, 'password');
  const result = await loginWithPassword(email, password);

  if (!result.ok) {
    redirect('/admin/login?error=1');
  }

  redirect('/admin');
}

export async function logoutAction() {
  await logout();
  redirect('/admin/login');
}

export async function createDailyUpdateAction(formData) {
  await requireAdmin();

  const dateRaw = asText(formData, 'date');
  if (!dateRaw) throw new Error('Date is required.');

  const resultText = asText(formData, 'resultText') || '0.0';
  assertPublicTextSafe(resultText, 'result');

  const translationEntries = [];
  for (const locale of LOCALES) {
    translationEntries.push({ label: `${locale} summary`, value: asText(formData, `summary_${locale}`) });
    translationEntries.push({ label: `${locale} lesson`, value: asText(formData, `lesson_${locale}`) });
    translationEntries.push({ label: `${locale} seo title`, value: asText(formData, `seoTitle_${locale}`) });
    translationEntries.push({ label: `${locale} seo description`, value: asText(formData, `seoDescription_${locale}`) });
  }
  assertManyPublicTextsSafe(translationEntries);

  const update = await prisma.dailyUpdate.upsert({
    where: { date: new Date(`${dateRaw}T00:00:00.000Z`) },
    update: {
      marketTone: asText(formData, 'marketTone') || 'cautious',
      longActions: asInt(formData.get('longActions')),
      shortActions: asInt(formData.get('shortActions')),
      rejectedOpportunities: asInt(formData.get('rejectedOpportunities')),
      wins: asInt(formData.get('wins')),
      losses: asInt(formData.get('losses')),
      breakevens: asInt(formData.get('breakevens')),
      resultText,
      status: asStatus(formData.get('status'))
    },
    create: {
      date: new Date(`${dateRaw}T00:00:00.000Z`),
      marketTone: asText(formData, 'marketTone') || 'cautious',
      longActions: asInt(formData.get('longActions')),
      shortActions: asInt(formData.get('shortActions')),
      rejectedOpportunities: asInt(formData.get('rejectedOpportunities')),
      wins: asInt(formData.get('wins')),
      losses: asInt(formData.get('losses')),
      breakevens: asInt(formData.get('breakevens')),
      resultText,
      status: asStatus(formData.get('status'))
    }
  });

  for (const locale of LOCALES) {
    await prisma.dailyUpdateTranslation.upsert({
      where: {
        dailyUpdateId_locale: {
          dailyUpdateId: update.id,
          locale
        }
      },
      update: {
        publicSummary: asText(formData, `summary_${locale}`),
        lessonText: asText(formData, `lesson_${locale}`),
        seoTitle: asText(formData, `seoTitle_${locale}`),
        seoDescription: asText(formData, `seoDescription_${locale}`)
      },
      create: {
        dailyUpdateId: update.id,
        locale,
        publicSummary: asText(formData, `summary_${locale}`),
        lessonText: asText(formData, `lesson_${locale}`),
        seoTitle: asText(formData, `seoTitle_${locale}`),
        seoDescription: asText(formData, `seoDescription_${locale}`)
      }
    });
  }

  refreshAll();
  redirect('/admin');
}

export async function setDailyUpdateStatusAction(formData) {
  await requireAdmin();
  const id = asText(formData, 'id');
  const status = asStatus(formData.get('status'));

  await prisma.dailyUpdate.update({
    where: { id },
    data: { status }
  });

  refreshAll();
}

export async function deleteDailyUpdateAction(formData) {
  await requireAdmin();
  const id = asText(formData, 'id');
  await prisma.dailyUpdate.delete({ where: { id } });
  refreshAll();
}

export async function createScreenshotAction(formData) {
  await requireAdmin();

  const imageUrl = asText(formData, 'imageUrl');
  if (!imageUrl) throw new Error('Image URL is required.');

  assertPublicTextSafe(imageUrl, 'image URL');

  const dailyUpdateId = asText(formData, 'dailyUpdateId') || null;
  const status = asStatus(formData.get('status'));

  const entries = [];
  for (const locale of LOCALES) {
    entries.push({ label: `${locale} screenshot caption`, value: asText(formData, `caption_${locale}`) });
  }
  assertManyPublicTextsSafe(entries);

  const screenshot = await prisma.screenshot.create({
    data: {
      imageUrl,
      dailyUpdateId,
      status
    }
  });

  for (const locale of LOCALES) {
    await prisma.screenshotTranslation.create({
      data: {
        screenshotId: screenshot.id,
        locale,
        caption: asText(formData, `caption_${locale}`)
      }
    });
  }

  refreshAll();
  redirect('/admin');
}

export async function deleteScreenshotAction(formData) {
  await requireAdmin();
  const id = asText(formData, 'id');
  await prisma.screenshot.delete({ where: { id } });
  refreshAll();
}

export async function createContentDraftAction(formData) {
  await requireAdmin();

  const dailyUpdateId = asText(formData, 'dailyUpdateId') || null;
  const locale = asText(formData, 'locale') || 'en';
  const platform = asText(formData, 'platform') || 'x';
  const body = asText(formData, 'body');
  const status = String(formData.get('status') || 'draft');

  assertPublicTextSafe(body, 'content draft');

  await prisma.contentDraft.create({
    data: {
      dailyUpdateId,
      locale,
      platform,
      body,
      status: ['draft', 'copied', 'posted', 'archived'].includes(status) ? status : 'draft'
    }
  });

  revalidatePath('/admin');
  redirect('/admin');
}

export async function setContentDraftStatusAction(formData) {
  await requireAdmin();
  const id = asText(formData, 'id');
  const status = String(formData.get('status') || 'draft');

  await prisma.contentDraft.update({
    where: { id },
    data: { status: ['draft', 'copied', 'posted', 'archived'].includes(status) ? status : 'draft' }
  });

  revalidatePath('/admin');
}

export async function deleteContentDraftAction(formData) {
  await requireAdmin();
  const id = asText(formData, 'id');
  await prisma.contentDraft.delete({ where: { id } });
  revalidatePath('/admin');
}
