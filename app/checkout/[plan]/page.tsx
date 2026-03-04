"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getPlan, Currency } from "@/lib/plans";

type CreateOut = {
  ok: boolean;
  orderId: string;
  planId: string;
  currency: Currency;
  nowPaymentId: string;
  payAddress?: string;
  payAmount?: string;
  payCurrency?: string;
  invoiceUrl?: string;
  status?: string;
  error?: string;
};

export default function CheckoutPage() {
  const params = useParams<{ plan: string }>();
  const sp = useSearchParams();
  const planId = params.plan;
  const currency = (sp.get("currency") || "EUR") as Currency;

  const plan = useMemo(() => getPlan(planId), [planId]);
  const [out, setOut] = useState<CreateOut | null>(null);
  const [checking, setChecking] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string>("");

  useEffect(() => {
    if (!plan) return;
    const run = async () => {
      setStatusMsg("Creating payment...");
      const r = await fetch("/api/nowpayments/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ planId, currency })
      });
      const j = await r.json();
      setOut(j);
      setStatusMsg(j.ok ? "Payment created." : `Error: ${j.error || "unknown"}`);
    };
    run();
  }, [planId, currency, plan]);

  if (!plan) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-14">
        <div className="text-xl font-semibold">Unknown plan</div>
        <Link className="text-[rgb(var(--brand))] underline mt-3 inline-block" href="/pricing">Back to pricing</Link>
      </div>
    );
  }

  const price = currency === "EUR" ? `€${plan.price.EUR}` : `${plan.price.USDT} USDT`;

  async function checkPaid() {
    if (!out?.nowPaymentId || !out?.orderId) return;
    setChecking(true);
    setStatusMsg("Checking payment status...");
    try {
      const r = await fetch(`/api/nowpayments/status?paymentId=${encodeURIComponent(out.nowPaymentId)}&orderId=${encodeURIComponent(out.orderId)}`);
      const j = await r.json();
      if (j.ok && j.paid) {
        setStatusMsg("Payment confirmed. Connect Discord to unlock access.");
      } else {
        setStatusMsg(`Not paid yet. Status: ${j.status || "unknown"}`);
      }
    } catch (e: any) {
      setStatusMsg(`Check failed: ${String(e?.message || e)}`);
    } finally {
      setChecking(false);
    }
  }

  const paidHint = statusMsg.toLowerCase().includes("confirmed");

  return (
    <div className="max-w-4xl mx-auto px-5 py-14">
      <h1 className="text-3xl font-semibold">Checkout</h1>
      <p className="mt-2 text-[rgb(var(--muted))]">
        Plan: <span className="text-white">{plan.name}</span> — Price: <span className="text-white">{price}</span>
      </p>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] p-6">
          <div className="font-semibold">Step 1 — Pay with crypto</div>
          <div className="mt-2 text-sm text-[rgb(var(--muted))]">
            We use NOWPayments. You can pay with many coins; the price is fixed in {currency}.
          </div>

          <div className="mt-4 text-sm">
            <div className="text-[rgb(var(--muted))]">Status</div>
            <div className="mt-1">{statusMsg}</div>
          </div>

          {out?.ok && (
            <div className="mt-5 text-sm space-y-2">
              <div>
                <div className="text-[rgb(var(--muted))]">Payment ID</div>
                <div className="break-all">{out.nowPaymentId}</div>
              </div>
              {out.payAddress && (
                <div>
                  <div className="text-[rgb(var(--muted))]">Pay address</div>
                  <div className="break-all">{out.payAddress}</div>
                </div>
              )}
              {out.payAmount && out.payCurrency && (
                <div>
                  <div className="text-[rgb(var(--muted))]">Amount</div>
                  <div>{out.payAmount} {out.payCurrency}</div>
                </div>
              )}
              {out.invoiceUrl && (
                <div className="pt-2">
                  <a className="px-4 py-2 rounded-xl bg-[rgb(var(--brand))] text-black font-medium inline-block hover:opacity-90"
                     href={out.invoiceUrl} target="_blank" rel="noreferrer">
                    Open Invoice
                  </a>
                </div>
              )}

              <button
                disabled={checking}
                onClick={checkPaid}
                className="mt-4 px-4 py-2 rounded-xl border border-[rgb(var(--stroke))] hover:border-white/30 disabled:opacity-50"
              >
                I’ve paid — check status
              </button>
            </div>
          )}

          {!out?.ok && (
            <div className="mt-5 text-sm text-red-300">
              {out?.error || "Could not create payment. Check server env."}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] p-6">
          <div className="font-semibold">Step 2 — Connect Discord</div>
          <div className="mt-2 text-sm text-[rgb(var(--muted))]">
            After payment confirmation, connect Discord. We’ll assign your access role automatically.
          </div>

          <div className="mt-5">
            <Link
              className="px-4 py-2 rounded-xl bg-white text-black font-medium inline-block hover:opacity-90"
              href={`/api/discord/oauth-start?orderId=${encodeURIComponent(out?.orderId || "")}`}
            >
              Connect Discord
            </Link>
          </div>

          <div className="mt-4 text-xs text-[rgb(var(--muted))]">
            Tip: if you paid and status is still pending, wait for confirmations then check again.
          </div>

          {paidHint && (
            <div className="mt-4 text-sm text-green-300">
              Payment confirmed ✓ — Connect Discord now.
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 text-xs text-[rgb(var(--muted))]">
        Nobody gets access to a public page. Access is private Discord roles/channels only.
      </div>
    </div>
  );
}