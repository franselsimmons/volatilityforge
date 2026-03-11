// app/api/discord/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDiscordAuthorizeUrl } from "@/lib/discord";

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("orderId");
  if (!orderId) {
    return NextResponse.json({ ok: false, error: "Missing orderId" }, { status: 400 });
  }

  const state = Buffer.from(JSON.stringify({ orderId, ts: Date.now() }), "utf8").toString("base64url");
  const url = getDiscordAuthorizeUrl(state);

  return NextResponse.redirect(url);
}