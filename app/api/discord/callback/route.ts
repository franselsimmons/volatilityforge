// app/api/discord/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  addUserToGuildAndRole,
  exchangeDiscordCode,
  getDiscordMe,
  setGuildMemberRole,
} from "@/lib/discord";
import { getDiscordRoleIdForPlan } from "@/lib/plans";
import { getOrder, updateOrder } from "@/lib/store";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    const state = req.nextUrl.searchParams.get("state");

    if (!code || !state) {
      return NextResponse.redirect(new URL("/access?error=missing_code", req.url));
    }

    const decoded = JSON.parse(Buffer.from(state, "base64url").toString("utf8"));
    const orderId = String(decoded?.orderId || "");

    if (!orderId) {
      return NextResponse.redirect(new URL("/access?error=missing_order", req.url));
    }

    const order = await getOrder(orderId);
    if (!order) {
      return NextResponse.redirect(new URL(`/access?orderId=${encodeURIComponent(orderId)}&error=order_not_found`, req.url));
    }

    if (!["waiting_discord", "paid", "finished", "access_granted"].includes(order.paymentStatus)) {
      return NextResponse.redirect(new URL(`/access?orderId=${encodeURIComponent(orderId)}&error=payment_not_ready`, req.url));
    }

    const token = await exchangeDiscordCode(code);
    const me = await getDiscordMe(token.access_token);

    const discordUserId = String(me?.id || "");
    const discordUsername = me?.global_name || me?.username || "Discord user";

    const roleId = getDiscordRoleIdForPlan(order.plan);
    if (!roleId) {
      return NextResponse.redirect(new URL(`/access?orderId=${encodeURIComponent(orderId)}&error=missing_role`, req.url));
    }

    try {
      await addUserToGuildAndRole({
        discordUserId,
        userAccessToken: token.access_token,
        roleId,
      });
    } catch {
      await setGuildMemberRole({ discordUserId, roleId });
    }

    await updateOrder(orderId, {
      discordUserId,
      discordUsername,
      guildMemberAdded: true,
      roleGranted: true,
      paymentStatus: "access_granted",
    });

    return NextResponse.redirect(
      new URL(`/access?orderId=${encodeURIComponent(orderId)}&success=1`, req.url)
    );
  } catch (e: any) {
    return NextResponse.redirect(
      new URL(`/access?error=${encodeURIComponent(e?.message || "discord_callback_failed")}`, req.url)
    );
  }
}