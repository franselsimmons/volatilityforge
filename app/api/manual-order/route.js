import { kv } from "@vercel/kv";
import { getPlanBySlug } from "../../../lib/siteData";
import { formatManualOrderDiscordMessage } from "../../../lib/manualOrderMessage";

export const runtime = "nodejs";

function bad(message, status = 400) {
  return Response.json({ ok: false, error: message }, { status });
}

function uid(prefix = "ord") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

async function sendDiscordWebhook(content) {
  const webhook = process.env.DISCORD_WEBHOOK_PAYMENTS || "";
  if (!webhook) return;

  await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ content }),
  });
}

export async function POST(req) {
  try {
    const body = await req.json();

    const plan = getPlanBySlug(body?.plan);
    if (!plan) return bad("Invalid plan.");

    const discordUsername = String(body?.discordUsername || "").trim();
    const email = String(body?.email || "").trim();
    const paymentMethod = String(body?.paymentMethod || "").trim();
    const txHash = String(body?.txHash || "").trim();
    const notes = String(body?.notes || "").trim();

    if (!discordUsername) return bad("Discord username is required.");
    if (!txHash) return bad("Transaction hash is required.");
    if (!paymentMethod) return bad("Payment method is required.");

    const reference = uid("vf");
    const expectedAmount = `${plan.usdt} USDT / €${plan.euro}`;

    const order = {
      id: reference,
      reference,
      plan: plan.slug,
      planName: plan.name,
      discordUsername,
      email,
      paymentMethod,
      txHash,
      notes,
      expectedAmount,
      status: "pending_manual_review",
      createdAt: Date.now(),
    };

    await kv.set(`vf:manual-order:${reference}`, order, { ex: 60 * 60 * 24 * 30 });
    await kv.lpush("vf:manual-orders:list", JSON.stringify(order));
    await kv.ltrim("vf:manual-orders:list", 0, 999);

    await sendDiscordWebhook(formatManualOrderDiscordMessage(order));

    return Response.json({
      ok: true,
      reference,
      message:
        "Your payment request has been submitted. After manual verification, your Discord access can be assigned.",
    });
  } catch (err) {
    return bad(String(err?.message || err), 500);
  }
}