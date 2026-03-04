import { NextResponse } from "next/server";
import { discordExchangeCode, discordGetMe } from "@/lib/discord";
import { get, set } from "@/lib/store";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = String(url.searchParams.get("code") || "");
  const state = String(url.searchParams.get("state") || "");
  const orderId = state;

  if (!code || !orderId) {
    return NextResponse.redirect(new URL(`/access?ok=0&msg=${encodeURIComponent("Missing code/state")}`, url.origin));
  }

  try {
    const tok = await discordExchangeCode(code);
    const me = await discordGetMe(tok.access_token);
    const discordUserId = String(me?.id || "");
    if (!discordUserId) throw new Error("missing_discord_user_id");

    const key = `vf:order:${orderId}`;
    const cur = (await get(key)) || null;
    if (!cur) {
      return NextResponse.redirect(new URL(`/access?ok=0&msg=${encodeURIComponent("Order not found")}`, url.origin));
    }

    await set(key, { ...cur, discordUserId, discordUsername: me?.username || null, discordLinkedAt: Date.now() }, { ex: 60 * 60 * 24 * 30 });

    return NextResponse.redirect(new URL(`/api/discord/grant?orderId=${encodeURIComponent(orderId)}`, url.origin));
  } catch (e: any) {
    return NextResponse.redirect(new URL(`/access?ok=0&msg=${encodeURIComponent(String(e?.message || e))}`, url.origin));
  }
}