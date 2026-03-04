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
      "BULL + BEAR inbegrepen",
      "Focus op momentum-opbouw (minder noise)",
      "Discord alerts, geen dashboard nodig",
      "Ideaal voor voorbereiding & planning"
    ],
    price: { EUR: 39, USDT: 45 },
    discordRoleEnv: "DISCORD_ROLE_BUILDUP"
  },
  {
    id: "almost",
    name: "ALMOST Signals",
    subtitle: "Pre-breakout / pre-breakdown — close to execution",
    bullets: [
      "BULL + BEAR inbegrepen",
      "Strakkere filters dan BUILDUP",
      "Meer ‘near-entry’ meldingen",
      "Voor actieve traders"
    ],
    price: { EUR: 79, USDT: 90 },
    discordRoleEnv: "DISCORD_ROLE_ALMOST",
    featured: true
  },
  {
    id: "entry",
    name: "ENTRY Signals",
    subtitle: "Execution-grade alerts — highest conviction",
    bullets: [
      "BULL + BEAR inbegrepen",
      "Maximale filtering & quality gates",
      "Sneller beslissen, minder twijfel",
      "Voor serieuze executie"
    ],
    price: { EUR: 149, USDT: 170 },
    discordRoleEnv: "DISCORD_ROLE_ENTRY"
  },
  {
    id: "all",
    name: "ALL-ACCESS",
    subtitle: "Alles (BUILDUP + ALMOST + ENTRY) — complete coverage",
    bullets: [
      "BULL + BEAR inbegrepen",
      "Alle tiers in één",
      "Beste value voor power users",
      "Eén betaling, alles open"
    ],
    price: { EUR: 219, USDT: 250 },
    discordRoleEnv: "DISCORD_ROLE_ALL"
  }
];

export function getPlan(planId: string): Plan | null {
  return PLANS.find(p => p.id === planId) ?? null;
}