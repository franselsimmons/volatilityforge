// lib/crypto.ts
import crypto from "node:crypto";

export function sha512HmacHex(secret: string, payload: string): string {
  return crypto.createHmac("sha512", secret).update(payload).digest("hex");
}

export function safeEqualHex(a: string, b: string): boolean {
  const aa = Buffer.from(String(a || ""), "utf8");
  const bb = Buffer.from(String(b || ""), "utf8");
  if (aa.length !== bb.length) return false;
  return crypto.timingSafeEqual(aa, bb);
}

export function randomId(prefix = "ord"): string {
  return `${prefix}_${crypto.randomUUID()}`;
}