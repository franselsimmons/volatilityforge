import { NextResponse } from "next/server";
import { buildManualOrderMessage } from "../../../lib/manualOrderMessage";
import { plans } from "../../../lib/siteData";

export async function POST(req) {
  try {
    const body = await req.json();

    const planKey = String(body?.planKey || "");
    const discordUsername = String(body?.discordUsername || "").trim();
    const email = String(body?.email || "").trim();
    const paymentMethod = String(body?.paymentMethod || "").trim();
    const txHash = String(body?.txHash || "").trim();
    const notes = String(body?.notes || "").trim();

    if (!planKey) {
      return NextResponse.json({ error: "Missing plan" }, { status: 400 });
    }

    if (!discordUsername) {
      return NextResponse.json(
        { error: "Missing Discord username" },
        { status: 400 }
      );
    }

    if (!txHash) {
      return NextResponse.json(
        { error: "Missing transaction hash" },
        { status: 400 }
      );
    }

    const plan = plans.find((p) => p.key === planKey);
    if (!plan || plan.key === "free") {
      return NextResponse.json({ error: "Invalid paid plan" }, { status: 400 });
    }

    const message = buildManualOrderMessage({
      planKey: plan.key,
      planLabel: plan.name,
      euro: plan.euro,
      usdt: plan.usdt,
      discordUsername,
      email,
      paymentMethod,
      txHash,
      notes,
    });

    const webhook = process.env.DISCORD_WEBHOOK_MEMBER_UPDATES;

    if (!webhook) {
      return NextResponse.json(
        { error: "DISCORD_WEBHOOK_MEMBER_UPDATES not configured" },
        { status: 500 }
      );
    }

    const r = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: "New payment submission",
        embeds: [
          {
            title: `Manual order • ${plan.name}`,
            description: "```" + message + "```",
            color: 0xd6b85f,
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!r.ok) {
      const txt = await r.text().catch(() => "");
      return NextResponse.json(
        { error: `Discord failed: ${txt || r.status}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
