// lib/store.ts
// Eenvoudige in-memory fallback store.
// Voor productie kun je dit later vervangen door Upstash Redis / Vercel KV / database.

type PaymentStatus =
  | "pending"
  | "confirming"
  | "paid"
  | "finished"
  | "failed"
  | "expired"
  | "partially_paid"
  | "refunded"
  | "waiting_discord"
  | "access_granted";

export type OrderRecord = {
  orderId: string;
  plan: string;
  amount: number;
  priceCurrency: string;
  payCurrency?: string | null;
  paymentId?: string | null;
  paymentStatus: PaymentStatus;
  payAddress?: string | null;
  payAmount?: number | null;
  payinExtraId?: string | null;
  discordUserId?: string | null;
  discordUsername?: string | null;
  guildMemberAdded?: boolean;
  roleGranted?: boolean;
  createdAt: number;
  paidAt?: number | null;
  expiresAt?: number | null;
  metadata?: Record<string, unknown>;
};

declare global {
  // eslint-disable-next-line no-var
  var __vf_store__: Map<string, OrderRecord> | undefined;
}

const mem = global.__vf_store__ || new Map<string, OrderRecord>();
if (!global.__vf_store__) global.__vf_store__ = mem;

export async function saveOrder(order: OrderRecord): Promise<void> {
  mem.set(order.orderId, order);
}

export async function getOrder(orderId: string): Promise<OrderRecord | null> {
  return mem.get(orderId) || null;
}

export async function updateOrder(
  orderId: string,
  patch: Partial<OrderRecord>
): Promise<OrderRecord | null> {
  const cur = mem.get(orderId);
  if (!cur) return null;
  const next = { ...cur, ...patch };
  mem.set(orderId, next);
  return next;
}

export async function findOrderByPaymentId(paymentId: string): Promise<OrderRecord | null> {
  for (const o of mem.values()) {
    if (o.paymentId === paymentId) return o;
  }
  return null;
}