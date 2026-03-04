import { NextResponse } from "next/server";
import { discordOAuthUrl } from "@/lib/discord";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const orderId = String(url.searchParams.get("orderId") || "");
  if (!orderId) return NextResponse.redirect(new URL("/pricing", url.origin));

  const authUrl = discordOAuthUrl(orderId);
  return NextResponse.redirect(authUrl);
}