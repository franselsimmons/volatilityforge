import { NextResponse } from "next/server";
import { discordAddRole } from "@/lib/discord";
import { get, set } from "@/lib/store";
import { getPlan } from "@/lib/plans";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const orderId = String(url.searchParams.get("orderId") || "");

  if (!orderId) {
    return NextResponse.redirect(new URL(`/access?ok=0&msg=${encodeURIComponent("Missing orderId")}`, url.origin));
  }

  const key = `vf:order:${orderId}`;
  const cur = (await get(key)) || null;

  if (!cur) {
    return NextResponse.redirect(new URL(`/access?ok=0&msg=${encodeURIComponent("Order not found")}`, url.origin));
  }

  if (!cur.discordUserId) {
    return NextResponse.redirect(new URL(`/access?ok=0&msg=${encodeURIComponent("Discord not connected yet")}`, url.origin));
  }

  if (!cur.paid) {
    return NextResponse.redirect(new URL(`/access?ok=0&msg=${encodeURIComponent("Payment not confirmed yet. Go back and click check status.")}`, url.origin));
  }

  const plan = getPlan(String(cur.planId || ""));
  if (!plan) {
    return NextResponse.redirect(new URL(`/access?ok=0&msg=${encodeURIComponent("Invalid plan on order")}`, url.origin));
  }

  const guildId = process.env.DISCORD_GUILD_ID || "";
  if (!guildId) {
    return NextResponse.redirect(new URL(`/access?ok=0&msg=${encodeURIComponent("Missing DISCORD_GUILD_ID")}`, url.origin));
  }

  const roleId = process.env[plan.discordRoleEnv] || "";
  if (!roleId) {
    return NextResponse.redirect(new URL(`/access?ok=0&msg=${encodeURIComponent(`Missing role env: ${plan.discordRoleEnv}`)}`, url.origin));
  }

  const add = await discordAddRole(guildId, String(cur.discordUserId), roleId);
  if (!add.ok) {
    return NextResponse.redirect(new URL(`/access?ok=0&msg=${encodeURIComponent(`Discord role grant failed: ${add.status} ${add.error || ""}`)}`, url.origin));
  }

  await set(key, { ...cur, roleGranted: true, roleGrantedAt: Date.now(), roleId }, { ex: 60 * 60 * 24 * 30 });

  const invite = process.env.DISCORD_INVITE_URL || "";
  const dest = `/access?ok=1&invite=${encodeURIComponent(invite)}`;

  return NextResponse.redirect(new URL(dest, url.origin));
}