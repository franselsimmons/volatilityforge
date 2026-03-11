// app/api/checkout/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createNowPayment } from "@/lib/nowpayments";
import { randomId } from "@/lib/crypto";
import { getPlan } from "@/lib/plans";
import { saveOrder } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const plan = getPlan(body?.plan);
    const payCurrency = String(body?.payCurrency || "usdttrc20").toLowerCase();

    if (!plan) {
      return NextResponse.json({ ok: false, error: "Invalid plan" }, { status: 400 });
    }

    const appBase = process.env.APP_BASE_URL;
    if (!appBase) {
      return NextResponse.json({ ok: false, error: "Missing APP_BASE_URL" }, { status: 500 });
    }

    const orderId = randomId("vf");

    const payment = await createNowPayment({
      price_amount: plan.priceUsdt,
      price_currency: "usd",
      pay_currency: payCurrency,
      order_id: orderId,
      order_description: `${plan.label} monthly access`,
      ipn_callback_url: `${appBase}/app/api/nowpayments/webhook`,
      success_url: `${appBase}/access?orderId=${encodeURIComponent(orderId)}`,
      cancel_url: `${appBase}/pricing`,
    });

    await saveOrder({
      orderId,
      plan: plan.key,
      amount: plan.priceUsdt,
      priceCurrency: "usd",
      payCurrency,
      paymentId: payment?.payment_id ? String(payment.payment_id) : null,
      paymentStatus: "pending",
      payAddress: payment?.pay_address || null,
      payAmount: Number(payment?.pay_amount || 0) || null,
      payinExtraId: payment?.payin_extra_id || null,
      guildMemberAdded: false,
      roleGranted: false,
      createdAt: Date.now(),
      metadata: {
        invoice_url: payment?.invoice_url || null,
      },
    });

    return NextResponse.json({
      ok: true,
      orderId,
      plan: plan.key,
      paymentId: payment?.payment_id || null,
      payAddress: payment?.pay_address || null,
      payAmount: payment?.pay_amount || null,
      payCurrency: payment?.pay_currency || payCurrency,
      paymentStatus: payment?.payment_status || "pending",
      invoiceUrl: payment?.invoice_url || null,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Checkout create failed" },
      { status: 500 }
    );
  }
}