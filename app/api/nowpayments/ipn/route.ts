import { NextResponse } from "next/server";
import { hmacHex } from "@/lib/crypto";
import { get, set } from "@/lib/store";

function isPaidStatus(st: string): boolean {
  const s = String(st || "").toLowerCase();
  return ["finished", "confirmed"].includes(s);
}

export async function POST(req: Request) {
  try {
    const secret = process.env.NOWPAYMENTS_IPN_SECRET || "";
    if (!secret) {
      return NextResponse.json({ ok: false, error: "missing_NOWPAYMENTS_IPN_SECRET" }, { status: 500 });
    }

    const sig = req.headers.get("x-nowpayments-sig") || "";
    const raw = await req.text();

    const computed = hmacHex(secret, raw);
    if (!sig || computed !== sig) {
      return NextResponse.json({ ok: false, error: "invalid_signature" }, { status: 401 });
    }

    let j: any = null;
    try { j = JSON.parse(raw); } catch {}
    if (!j) return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });

    const orderId = String(j?.order_id || "");
    const paymentId = String(j?.payment_id || "");
    const paymentStatus = String(j?.payment_status || "");

    if (!orderId) return NextResponse.json({ ok: false, error: "missing_order_id" }, { status: 400 });

    const key = `vf:order:${orderId}`;
    const cur = (await get(key)) || { orderId };

    const paid = isPaidStatus(paymentStatus);

    await set(key, {
      ...cur,
      nowPaymentId: cur.nowPaymentId || paymentId,
      status: paymentStatus || cur.status || "unknown",
      paid: cur.paid || paid,
      paidAt: cur.paidAt || (paid ? Date.now() : undefined),
      ipnLastAt: Date.now()
    }, { ex: 60 * 60 * 24 * 30 });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}