import { NextResponse } from "next/server";
import { nowGetStatus } from "@/lib/nowpayments";
import { get, set } from "@/lib/store";

function isPaidStatus(st: string): boolean {
  const s = String(st || "").toLowerCase();
  return ["finished", "confirmed"].includes(s);
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const paymentId = String(url.searchParams.get("paymentId") || "");
    const orderId = String(url.searchParams.get("orderId") || "");

    if (!paymentId || !orderId) {
      return NextResponse.json({ ok: false, error: "missing_paymentId_or_orderId" }, { status: 400 });
    }

    const status = await nowGetStatus(paymentId);
    const paymentStatus = String(status?.payment_status || "");
    const paid = isPaidStatus(paymentStatus);

    const key = `vf:order:${orderId}`;
    const cur = (await get(key)) || null;
    if (cur && paid && !cur.paid) {
      await set(key, { ...cur, paid: true, status: paymentStatus, paidAt: Date.now() }, { ex: 60 * 60 * 24 * 30 });
    } else if (cur) {
      await set(key, { ...cur, status: paymentStatus }, { ex: 60 * 60 * 24 * 30 });
    }

    return NextResponse.json({ ok: true, status: paymentStatus, paid });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}