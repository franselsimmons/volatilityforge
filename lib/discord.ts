// lib/discord.ts

const DISCORD_API = "https://discord.com/api";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

export function getDiscordAuthorizeUrl(state: string) {
  const clientId = requireEnv("DISCORD_CLIENT_ID");
  const redirectUri = requireEnv("DISCORD_REDIRECT_URI");

  const u = new URL(`${DISCORD_API}/oauth2/authorize`);
  u.searchParams.set("client_id", clientId);
  u.searchParams.set("response_type", "code");
  u.searchParams.set("redirect_uri", redirectUri);
  u.searchParams.set("scope", "identify guilds.join");
  u.searchParams.set("state", state);
  u.searchParams.set("prompt", "consent");
  return u.toString();
}

export async function exchangeDiscordCode(code: string) {
  const clientId = requireEnv("DISCORD_CLIENT_ID");
  const clientSecret = requireEnv("DISCORD_CLIENT_SECRET");
  const redirectUri = requireEnv("DISCORD_REDIRECT_URI");

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });

  const res = await fetch(`${DISCORD_API}/oauth2/token`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  const text = await res.text();
  let json: any = null;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Discord token invalid JSON: ${text.slice(0, 300)}`);
  }

  if (!res.ok) {
    throw new Error(json?.error_description || json?.message || `Discord token ${res.status}`);
  }

  return json;
}

export async function getDiscordMe(accessToken: string) {
  const res = await fetch(`${DISCORD_API}/users/@me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const text = await res.text();
  let json: any = null;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Discord me invalid JSON: ${text.slice(0, 300)}`);
  }

  if (!res.ok) {
    throw new Error(json?.message || `Discord me ${res.status}`);
  }

  return json;
}

export async function addUserToGuildAndRole(params: {
  discordUserId: string;
  userAccessToken: string;
  roleId: string;
}) {
  const botToken = requireEnv("DISCORD_BOT_TOKEN");
  const guildId = requireEnv("DISCORD_GUILD_ID");

  const res = await fetch(
    `${DISCORD_API}/guilds/${guildId}/members/${params.discordUserId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bot ${botToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        access_token: params.userAccessToken,
        roles: [params.roleId],
      }),
      cache: "no-store",
    }
  );

  const text = await res.text();
  let json: any = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }

  if (!(res.status === 201 || res.status === 204 || res.ok)) {
    throw new Error(json?.message || `Discord add guild member ${res.status}`);
  }

  return { ok: true, status: res.status, body: json };
}

export async function setGuildMemberRole(params: {
  discordUserId: string;
  roleId: string;
}) {
  const botToken = requireEnv("DISCORD_BOT_TOKEN");
  const guildId = requireEnv("DISCORD_GUILD_ID");

  const res = await fetch(
    `${DISCORD_API}/guilds/${guildId}/members/${params.discordUserId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bot ${botToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        roles: [params.roleId],
      }),
      cache: "no-store",
    }
  );

  const text = await res.text();
  let json: any = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }

  if (!res.ok) {
    throw new Error(json?.message || `Discord modify member ${res.status}`);
  }

  return json;
}