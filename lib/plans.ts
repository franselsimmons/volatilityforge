// lib/plans.ts

export type PlanKey = "buildup" | "almost" | "entry" | "all_access";

export type PlanDef = {
  key: PlanKey;
  label: string;
  priceEur: number;
  priceUsdt: number;
  discordRoleEnv: string;
};

export const PLANS: Record<PlanKey, PlanDef> = {
  buildup: {
    key: "buildup",
    label: "BUILDUP Signals",
    priceEur: 39,
    priceUsdt: 45,
    discordRoleEnv: "DISCORD_ROLE_BUILDUP",
  },
  almost: {
    key: "almost",
    label: "ALMOST Signals",
    priceEur: 79,
    priceUsdt: 90,
    discordRoleEnv: "DISCORD_ROLE_ALMOST",
  },
  entry: {
    key: "entry",
    label: "ENTRY Signals",
    priceEur: 149,
    priceUsdt: 170,
    discordRoleEnv: "DISCORD_ROLE_ENTRY",
  },
  all_access: {
    key: "all_access",
    label: "ALL-ACCESS",
    priceEur: 219,
    priceUsdt: 250,
    discordRoleEnv: "DISCORD_ROLE_ALL_ACCESS",
  },
};

export function getPlan(plan: string) {
  const key = String(plan || "").toLowerCase() as PlanKey;
  return PLANS[key] || null;
}

export function getDiscordRoleIdForPlan(plan: string): string | null {
  const p = getPlan(plan);
  if (!p) return null;
  return process.env[p.discordRoleEnv] || null;
}