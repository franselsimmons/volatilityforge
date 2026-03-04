import { createHmac, randomBytes } from "crypto";

export function uid(prefix = "vf"): string {
  return `${prefix}_${randomBytes(12).toString("hex")}`;
}

export function hmacHex(secret: string, payload: string): string {
  return createHmac("sha512", secret).update(payload).digest("hex");
}