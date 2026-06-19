// FILE: src/lib/auth.js

import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

const SESSION_COOKIE = 'vf_session';
const SESSION_DAYS = 30;

function getSecret() {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error('SESSION_SECRET must be set and at least 32 characters.');
  }

  return secret;
}

function hmac(value) {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('hex');
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function signToken(token) {
  return `${token}.${hmac(token)}`;
}

function verifySignedToken(signedToken) {
  if (!signedToken || !signedToken.includes('.')) return null;

  const [token, signature] = signedToken.split('.');
  const expected = hmac(token);

  const safeA = Buffer.from(signature || '');
  const safeB = Buffer.from(expected || '');

  if (safeA.length !== safeB.length) return null;

  if (!crypto.timingSafeEqual(safeA, safeB)) return null;

  return token;
}

export async function loginWithPassword(email, password) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  if (!user) return { ok: false, error: 'Invalid email or password.' };

  const matches = await bcrypt.compare(String(password || ''), user.passwordHash);

  if (!matches) return { ok: false, error: 'Invalid email or password.' };

  const token = crypto.randomBytes(32).toString('hex');
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  await prisma.session.create({
    data: {
      tokenHash,
      userId: user.id,
      expiresAt
    }
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() }
  });

  cookies().set(SESSION_COOKIE, signToken(token), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: expiresAt
  });

  return { ok: true };
}

export async function getSessionUser() {
  const signedToken = cookies().get(SESSION_COOKIE)?.value;
  const token = verifySignedToken(signedToken);

  if (!token) return null;

  const tokenHash = hashToken(token);

  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: { user: true }
  });

  if (!session) return null;

  if (session.expiresAt.getTime() < Date.now()) {
    await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }

  return session.user;
}

export async function requireAdmin() {
  const user = await getSessionUser();

  if (!user) {
    redirect('/admin/login');
  }

  if (!['OWNER', 'EDITOR', 'VIEWER'].includes(user.role)) {
    redirect('/admin/login');
  }

  return user;
}

export async function logout() {
  const signedToken = cookies().get(SESSION_COOKIE)?.value;
  const token = verifySignedToken(signedToken);

  if (token) {
    const tokenHash = hashToken(token);
    await prisma.session.deleteMany({ where: { tokenHash } });
  }

  cookies().delete(SESSION_COOKIE);
}
