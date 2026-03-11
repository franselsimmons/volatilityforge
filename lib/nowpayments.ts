// lib/nowpayments.ts

const NP_BASE = "https://api.nowpayments.io/v1";

function npHeaders() {
  const apiKey = process.env.NOWPAYMENTS_API_KEY;
  if (!apiKey) throw new Error("Missing NOWPAYMENTS_API_KEY");

  return {
    "x-api-key": apiKey,
    "content-type": "application/json",
  };
}

export type CreatePaymentInput = {
  price_amount: number;
  price_currency: string;
  pay_currency?: string;
  order_id: string;
  order_description: string;
  ipn_callback_url: string;
  success_url?: string;
  cancel_url?: string;
};

export async function createNowPayment(input: CreatePaymentInput) {
  const res = await fetch(`${NP_BASE}/payment`, {
    method: "POST",
    headers: npHeaders(),
    body: JSON.stringify(input),
    cache: "no-store",
  });

  const text = await res.text();
  let json: any = null;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`NOWPayments invalid JSON: ${text.slice(0, 300)}`);
  }

  if (!res.ok) {
    throw new Error(json?.message || `NOWPayments ${res.status}`);
  }

  return json;
}

export async function getNowPaymentStatus(paymentId: string) {
  const res = await fetch(`${NP_BASE}/payment/${encodeURIComponent(paymentId)}`, {
    method: "GET",
    headers: {
      "x-api-key": process.env.NOWPAYMENTS_API_KEY || "",
    },
    cache: "no-store",
  });

  const text = await res.text();
  let json: any = null;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`NOWPayments invalid JSON: ${text.slice(0, 300)}`);
  }

  if (!res.ok) {
    throw new Error(json?.message || `NOWPayments ${res.status}`);
  }

  return json;
}