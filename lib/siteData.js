export const plans = [
  {
    slug: "buildup",
    name: "BUILDUP Signals",
    badge: "Starter",
    euro: 39,
    usdt: 45,
    subtitle: "Early momentum building — clean watchlist alerts without moon access.",
    features: [
      "Includes both BULL + BEAR main signals",
      "Access to MAIN BUILDUP only",
      "No MOON signals in this tier",
      "Built for preparation, tracking and planning",
      "Discord delivery via private role-based channels",
    ],
    channelAccess: {
      main: ["BUILDUP"],
      moon: [],
    },
  },
  {
    slug: "almost",
    name: "ALMOST Signals",
    badge: "Most Popular",
    euro: 79,
    usdt: 90,
    subtitle: "Pre-breakout / pre-breakdown — close to execution in both MAIN and MOON.",
    features: [
      "Includes both BULL + BEAR main signals",
      "Access to MAIN ALMOST + BUILDUP",
      "Access to MOON ALMOST",
      "Tighter filtering than BUILDUP",
      "Built for active traders who want near-entry structure",
    ],
    channelAccess: {
      main: ["ALMOST", "BUILDUP"],
      moon: ["ALMOST"],
    },
  },
  {
    slug: "entry",
    name: "ENTRY Signals",
    badge: "Highest Conviction",
    euro: 149,
    usdt: 170,
    subtitle: "Execution-grade alerts — best MAIN + best MOON access.",
    features: [
      "Includes both BULL + BEAR main signals",
      "Access to MAIN ENTRY + ALMOST + BUILDUP",
      "Access to MOON ELITE + MOON ALMOST",
      "Highest filtering and strongest execution bias",
      "Designed for serious execution and lower hesitation",
    ],
    channelAccess: {
      main: ["ENTRY", "ALMOST", "BUILDUP"],
      moon: ["ELITE", "ALMOST"],
    },
  },
];

export function getPlanBySlug(slug) {
  return plans.find((p) => p.slug === slug) || null;
}