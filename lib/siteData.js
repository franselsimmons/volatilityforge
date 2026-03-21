export const siteData = {
  brand: "VolatilityForge",
  tagline: "Private Discord signal delivery for volatility traders",
  description:
    "VolatilityForge delivers structured crypto alerts through private Discord channels with tiered access, tighter filtering and action-focused delivery.",

  nav: [
    { href: "/how-it-works", label: "How it works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/faq", label: "FAQ" },
    { href: "/pay", label: "Pay" },
  ],

  plans: [
    {
      key: "free",
      tier: "Free",
      name: "Market Radar",
      euro: 0,
      usdt: 0,
      badge: "Free",
      description:
        "Early market visibility for members who want to track structure and momentum before stronger setups appear.",
      channels: ["#market-radar"],
      bullets: [
        "Early market radar alerts",
        "Broad watchlist visibility",
        "Useful for preparation and tracking",
        "Best for members who want to follow the market before higher-conviction alerts appear",
      ],
      delivery:
        "Free Discord delivery for members who want early visibility without premium filtering or execution-style alerts.",
      score: "5.5/10",
    },
    {
      key: "starter",
      tier: "Starter",
      name: "Early Setups",
      euro: 79,
      usdt: 90,
      badge: "Most Popular",
      description:
        "Near-ready setups delivered before premium action-grade alerts, built for members who want to prepare manually.",
      channels: ["#setup-watch", "#high-alert"],
      bullets: [
        "Near-ready setup alerts",
        "Higher quality than free market radar",
        "Closer to action than broad watchlist alerts",
        "Best for members who want to prepare entries manually",
      ],
      delivery:
        "This tier is designed for members who want earlier setup visibility with cleaner filtering, while still making their own final execution decisions.",
      score: "7.4/10",
    },
    {
      key: "pro",
      tier: "Pro",
      name: "High-Conviction Signals",
      euro: 149,
      usdt: 169,
      badge: "Pro",
      description:
        "Stronger filtered premium alerts built for members who want cleaner, faster and more actionable signal delivery.",
      channels: ["#trade-alerts"],
      bullets: [
        "High-conviction signal alerts",
        "Stronger filtering than Starter",
        "Cleaner and more actionable than early setup tiers",
        "Built for members who want premium signal quality without full execution delivery",
      ],
      delivery:
        "This is the premium signal tier. Members receive the strongest filtered alert stream short of the full execution-style delivery.",
      score: "8.7/10",
    },
    {
      key: "elite",
      tier: "Elite",
      name: "Execution Alerts",
      euro: 249,
      usdt: 279,
      badge: "Elite",
      description:
        "Highest-priority delivery with live trade lifecycle alerts, close updates and structured result tracking.",
      channels: [
        "#pre-trade-setup",
        "#trade-opened",
        "#trade-closed",
        "#track-record",
      ],
      bullets: [
        "Highest-priority alert stream",
        "Pre-action setup notifications",
        "Live open and close updates",
        "Structured result tracking",
        "Lowest-noise and most action-focused delivery",
      ],
      delivery:
        "This is the highest tier. Members receive the cleanest and most execution-focused delivery, including lifecycle updates and result tracking.",
      score: "9.4/10",
    },
  ],

  channelGroups: [
    {
      name: "FREE — Market Radar",
      channels: ["#market-radar"],
      quality: "5.5/10",
      summary:
        "Early market visibility only. Useful for tracking development and building context, not for blind execution.",
    },
    {
      name: "STARTER — Early Setups",
      channels: ["#setup-watch", "#high-alert"],
      quality: "7.4/10",
      summary:
        "Good pre-action zone. Better than radar and more focused, but still one layer below the strongest premium alerts.",
    },
    {
      name: "PRO — High-Conviction Signals",
      channels: ["#trade-alerts"],
      quality: "8.7/10",
      summary:
        "Premium filtered alerts with stronger quality and cleaner actionability than Starter, without the full lifecycle delivery.",
    },
    {
      name: "ELITE — Execution Alerts",
      channels: ["#pre-trade-setup", "#trade-opened", "#trade-closed", "#track-record"],
      quality: "9.4/10",
      summary:
        "Highest-quality delivery. Full execution-style alert chain with the cleanest filtering and strongest action bias.",
    },
  ],

  faq: [
    {
      q: "Do members get access to a public dashboard?",
      a: "No. Delivery is Discord-first. Members only receive access to the private channels included in their plan.",
    },
    {
      q: "What does Starter include?",
      a: "Starter includes early setup alerts delivered through the private setup channels. It is designed for members who want to prepare manually before higher-conviction alerts appear.",
    },
    {
      q: "What does Pro include?",
      a: "Pro includes stronger filtered premium alerts with cleaner actionability than Starter. It is built for members who want higher-conviction signal delivery without the full execution-style tier.",
    },
    {
      q: "What does Elite include?",
      a: "Elite includes the highest-priority alert stream, including pre-action updates, open alerts, close alerts and structured result tracking.",
    },
    {
      q: "Is this financial advice?",
      a: "No. This is structured signal delivery. Every member remains fully responsible for their own decisions.",
    },
    {
      q: "How is access delivered?",
      a: "Access is assigned manually in Discord after payment verification.",
    },
  ],
};

export const plans = siteData.plans;
export const faqItems = siteData.faq;
export const navItems = siteData.nav;
export const channelGroups = siteData.channelGroups;