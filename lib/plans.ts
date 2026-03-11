// lib/plans.ts

export type Plan = {
  slug: string;
  name: string;
  subtitle: string;
  eur: number;
  usdt: number;
  badge?: string;
  bullets: string[];
  note: string;
};

export const plans: Plan[] = [
  {
    slug: "buildup",
    name: "BUILDUP Signals",
    subtitle: "Early momentum building — high quality watchlist alerts",
    eur: 39,
    usdt: 45,
    bullets: [
      "Includes both BULL + BEAR signals",
      "Focused on structured setup development",
      "Cleaner early-stage alerts with less noise",
      "Built for preparation and planning",
    ],
    note: "Access is delivered via Discord role-based private channels.",
  },
  {
    slug: "almost",
    name: "ALMOST Signals",
    subtitle: "Pre-breakout / pre-breakdown — closer to execution",
    eur: 89,
    usdt: 99,
    badge: "Most Popular",
    bullets: [
      "Includes both BULL + BEAR signals",
      "Tighter filtering than BUILDUP",
      "More near-entry alerts",
      "May include selective volatility-event alerts when conditions justify it",
    ],
    note: "Access is delivered via Discord role-based private channels.",
  },
  {
    slug: "entry",
    name: "ENTRY Signals",
    subtitle: "Execution-grade alerts — highest conviction",
    eur: 159,
    usdt: 179,
    bullets: [
      "Includes both BULL + BEAR signals",
      "Maximum filtering and quality gates",
      "Faster decisions, less hesitation",
      "Includes high-conviction structured alerts plus rare volatility-event alerts when triggered",
    ],
    note: "Access is delivered via Discord role-based private channels.",
  },
  {
    slug: "all-access",
    name: "ALL-ACCESS",
    subtitle: "Complete coverage across structured signals and volatility events",
    eur: 249,
    usdt: 279,
    bullets: [
      "Includes both BULL + BEAR signals",
      "All structured tiers in one plan",
      "Best access to both internal signal layers",
      "Best value for serious users who want full coverage",
    ],
    note: "Access is delivered via Discord role-based private channels.",
  },
];