import { NextResponse } from "next/server";
import { nowCreatePayment } from "@/lib/nowpayments";
import { set } from "@/lib/store";
import { getPlan, Currency } from "@/lib/plans";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const planId = String(body?.planId || "");
    const currency = String(body?.currency || "EUR").toUpperCase() as Currency;

    const plan = getPlan(planId);
    if (!plan) return NextResponse.json({ ok: false, error: "invalid_plan" }, { status: 400 });
    if (currency !== "EUR" && currency !== "USDT") return NextResponse.json({ ok: false, error: "invalid_currency" }, { status: 400 });

    const siteUrl = process.env.SITE_URL || "http://localhost:3000";
    const successUrl = `${siteUrl}/checkout/${planId}?currency=${currency}`;
    const ipnCallbackUrl = `${siteUrl}/api/nowpayments/ipn`;

    const created = await nowCreatePayment({ planId, currency, successUrl, ipnCallbackUrl });

    const nowPaymentId = String(created.now?.payment_id || "");
    const invoiceUrl = created.now?.invoice_url || created.now?.payment_url || null;

    const orderId = String(created.orderId);
    await set(`vf:order:${orderId}`, {
      orderId,
      planId,
      currency,
      nowPaymentId,
      status: String(created.now?.payment_status || "created"),
      paid: false,
      createdAt: Date.now()
    }, { ex: 60 * 60 * 24 * 30 });

    return NextResponse.json({
      ok: true,
      orderId,
      planId,
      currency,
      nowPaymentId,
      payAddress: created.now?.pay_address || null,
      payAmount: created.now?.pay_amount ? String(created.now.pay_amount) : null,
      payCurrency: created.now?.pay_currency || null,
      invoiceUrl
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}