// app/api/nowpayments/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { findOrderByPaymentId, getOrder, saveOrder, updateOrder } from "@/lib/store";
import { safeEqualHex, sha512HmacHex } from "@/lib/crypto";

function normalizePaymentStatus(status: string): string {
  const s = String(status || "").toLowerCase();

  if (["finished", "confirmed", "sending", "partially_paid"].includes(s)) return s;
  if (["failed", "expired", "refunded"].includes(s)) return s;
  return s || "pending";
}

export async function POST(req: NextRequest) {
  try {
    const raw = await req.text();
    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET;
    const sig =
      req.headers.get("x-nowpayments-sig") ||
      req.headers.get("x-nowpayments-signature") ||
      "";

    if (!ipnSecret) {
      return NextResponse.json({ ok: false, error: "Missing NOWPAYMENTS_IPN_SECRET" }, { status: 500 });
    }

    const expected = sha512HmacHex(ipnSecret, raw);
    if (!safeEqualHex(expected, sig)) {
      return NextResponse.json({ ok: false, error: "Invalid IPN signature" }, { status: 401 });
    }

    const body = JSON.parse(raw);
    const paymentId = body?.payment_id ? String(body.payment_id) : "";
    const orderId = body?.order_id ? String(body.order_id) : "";

    let order = orderId ? await getOrder(orderId) : null;
    if (!order && paymentId) order = await findOrderByPaymentId(paymentId);

    if (!order) {
      return NextResponse.json({ ok: true, ignored: true, reason: "order_not_found" });
    }

    const paymentStatus = normalizePaymentStatus(body?.payment_status);

    const paid =
      paymentStatus === "finished" ||
      paymentStatus === "confirmed" ||
      paymentStatus === "sending";

    const next = await updateOrder(order.orderId, {
      paymentId: paymentId || order.paymentId || null,
      paymentStatus: paid ? "waiting_discord" : (paymentStatus as any),
      paidAt: paid ? Date.now() : order.paidAt || null,
      metadata: {
        ...(order.metadata || {}),
        ipn: body,
      },
    });

    return NextResponse.json({ ok: true, orderId: order.orderId, paymentStatus: next?.paymentStatus });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "NOWPayments webhook failed" },
      { status: 500 }
    );
  }
}