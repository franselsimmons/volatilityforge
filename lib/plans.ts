export type Currency = "EUR" | "USDT";
export type PlanId = "buildup" | "almost" | "entry" | "all";

export type Plan = {
  id: PlanId;
  name: string;
  subtitle: string;
  bullets: string[];
  price: { EUR: number; USDT: number };
  discordRoleEnv: string;
  featured?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "buildup",
    name: "BUILDUP Signals",
    subtitle: "Early momentum building — high quality watchlist alerts",
    bullets: [
      "Includes both BULL + BEAR signals",
      "Focused on momentum build-up (less noise)",
      "Discord alerts — no dashboard required",
      "Ideal for preparation and planning",
    ],
    price: { EUR: 39, USDT: 45 },
    discordRoleEnv: "DISCORD_ROLE_BUILDUP",
  },
  {
    id: "almost",
    name: "ALMOST Signals",
    subtitle: "Pre-breakout / pre-breakdown — close to execution",
    bullets: [
      "Includes both BULL + BEAR signals",
      "Tighter filtering than BUILDUP",
      "More “near-entry” alerts",
      "Built for active traders",
    ],
    price: { EUR: 79, USDT: 90 },
    discordRoleEnv: "DISCORD_ROLE_ALMOST",
    featured: true,
  },
  {
    id: "entry",
    name: "ENTRY Signals",
    subtitle: "Execution-grade alerts — highest conviction",
    bullets: [
      "Includes both BULL + BEAR signals",
      "Maximum filtering & quality gates",
      "Faster decisions, less hesitation",
      "Designed for serious execution",
    ],
    price: { EUR: 149, USDT: 170 },
    discordRoleEnv: "DISCORD_ROLE_ENTRY",
  },
  {
    id: "all",
    name: "ALL-ACCESS",
    subtitle: "Everything (BUILDUP + ALMOST + ENTRY) — complete coverage",
    bullets: [
      "Includes both BULL + BEAR signals",
      "All tiers in one plan",
      "Best value for power users",
      "One payment unlocks everything",
    ],
    price: { EUR: 219, USDT: 250 },
    discordRoleEnv: "DISCORD_ROLE_ALL",
  },
];

export function getPlan(planId: string): Plan | null {
  return PLANS.find((p) => p.id === planId) ?? null;
}