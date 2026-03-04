import { uid } from "@/lib/crypto";
import { Currency, getPlan } from "@/lib/plans";

type CreatePaymentArgs = {
  planId: string;
  currency: Currency;
  customerEmail?: string;
  successUrl: string;
  ipnCallbackUrl: string;
};

export async function nowCreatePayment(args: CreatePaymentArgs) {
  const plan = getPlan(args.planId);
  if (!plan) throw new Error("invalid_plan");

  const apiKey = process.env.NOWPAYMENTS_API_KEY || "";
  if (!apiKey) throw new Error("missing_NOWPAYMENTS_API_KEY");

  const priceCurrency = args.currency === "EUR" ? "eur" : "usdt";
  const priceAmount = args.currency === "EUR" ? plan.price.EUR : plan.price.USDT;

  const orderId = uid(`order_${plan.id}`);
  const orderDescription = `${plan.name} — monthly access`;

  const body = {
    price_amount: priceAmount,
    price_currency: priceCurrency,
    order_id: orderId,
    order_description: orderDescription,
    ipn_callback_url: args.ipnCallbackUrl,
    success_url: args.successUrl,
    cancel_url: args.successUrl,
    is_fixed_rate: true
  };

  const r = await fetch("https://api.nowpayments.io/v1/payment", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey
    },
    body: JSON.stringify(body)
  });

  const t = await r.text();
  let j: any = null;
  try { j = JSON.parse(t); } catch {}

  if (!r.ok) {
    throw new Error(`nowpayments_create_failed:${r.status}:${(j?.message || t || "").slice(0,200)}`);
  }

  return { plan, currency: args.currency, priceAmount, priceCurrency, orderId, now: j };
}

export async function nowGetStatus(paymentId: string) {
  const apiKey = process.env.NOWPAYMENTS_API_KEY || "";
  if (!apiKey) throw new Error("missing_NOWPAYMENTS_API_KEY");

  const r = await fetch(`https://api.nowpayments.io/v1/payment/${encodeURIComponent(paymentId)}`, {
    headers: { "x-api-key": apiKey, "accept": "application/json" }
  });

  const t = await r.text();
  let j: any = null;
  try { j = JSON.parse(t); } catch {}

  if (!r.ok) throw new Error(`nowpayments_status_failed:${r.status}:${(j?.message || t || "").slice(0,200)}`);
  return j;
}