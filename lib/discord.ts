type DiscordTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
};

export function discordOAuthUrl(state: string) {
  const clientId = process.env.DISCORD_CLIENT_ID || "";
  const redirect = process.env.DISCORD_REDIRECT_URI || "";
  if (!clientId || !redirect) throw new Error("missing_discord_oauth_env");

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirect,
    response_type: "code",
    scope: "identify",
    state
  });

  return `https://discord.com/api/oauth2/authorize?${params.toString()}`;
}

export async function discordExchangeCode(code: string): Promise<DiscordTokenResponse> {
  const clientId = process.env.DISCORD_CLIENT_ID || "";
  const clientSecret = process.env.DISCORD_CLIENT_SECRET || "";
  const redirect = process.env.DISCORD_REDIRECT_URI || "";
  if (!clientId || !clientSecret || !redirect) throw new Error("missing_discord_oauth_env");

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirect
  });

  const r = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body
  });

  const t = await r.text();
  let j: any = null;
  try { j = JSON.parse(t); } catch {}
  if (!r.ok) throw new Error(`discord_token_failed:${r.status}:${(t || "").slice(0,200)}`);

  return j as DiscordTokenResponse;
}

export async function discordGetMe(accessToken: string) {
  const r = await fetch("https://discord.com/api/users/@me", {
    headers: { authorization: `Bearer ${accessToken}` }
  });
  const t = await r.text();
  let j: any = null;
  try { j = JSON.parse(t); } catch {}
  if (!r.ok) throw new Error(`discord_me_failed:${r.status}:${(t || "").slice(0,200)}`);
  return j;
}

export async function discordAddRole(guildId: string, userId: string, roleId: string) {
  const botToken = process.env.DISCORD_BOT_TOKEN || "";
  if (!botToken) throw new Error("missing_DISCORD_BOT_TOKEN");

  const url = `https://discord.com/api/guilds/${guildId}/members/${userId}/roles/${roleId}`;
  const r = await fetch(url, {
    method: "PUT",
    headers: { authorization: `Bot ${botToken}` }
  });

  if (r.status === 204) return { ok: true };
  const t = await r.text();
  return { ok: false, status: r.status, error: t.slice(0, 300) };
}