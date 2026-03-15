export const SITE = {
  name: "VolatilityForge",
  tagline: "Scanner + Trade Desk",
  description:
    "Structured market detection, staged setup filtering and execution-ready trade delivery.",

  nav: [
    { href: "/how-it-works", label: "How it works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/faq", label: "FAQ" },
    { href: "/pay", label: "Pay" },
  ],

  hero: {
    title: "Scanner first. Trade-ready when it matters.",
    subtitle:
      "VolatilityForge tracks liquid markets, filters them through structured setup stages, and moves the strongest candidates into the Trade Desk for execution-ready delivery.",
    ctaPrimary: { href: "/pricing", label: "See plans" },
    ctaSecondary: { href: "/how-it-works", label: "How it works" },
  },

  homepageSections: [
    {
      title: "From detection to execution",
      body:
        "Our engine does not just scan markets. It tracks momentum, structure and liquidity to surface setups early, then pushes the strongest candidates into an execution-ready Trade Desk.",
    },
    {
      title: "Quality over quantity",
      body:
        "We filter hard. Members get fewer alerts, but cleaner ones. The goal is not noise. The goal is usable structure.",
    },
    {
      title: "Designed for execution",
      body:
        "Signals are created to act on — not to keep people endlessly watching charts without a plan.",
    },
    {
      title: "Risk-aware by design",
      body:
        "We avoid chaotic micro-noise and focus on structured setups with intent, progression and execution bias.",
    },
    {
      title: "Discord-first delivery",
      body:
        "Signals are delivered via private Discord roles and channels based on plan level. No public signal pages. No methodology leakage.",
    },
  ],

  pipeline: [
    {
      stage: "RADAR",
      text: "Early detection. Momentum and liquidity start to matter.",
    },
    {
      stage: "BUILDUP",
      text: "Structure begins forming. Preparation and tracking stage.",
    },
    {
      stage: "ALMOST",
      text: "Near-execution setup. Close to breakout or breakdown structure.",
    },
    {
      stage: "ENTRY",
      text: "Highest-conviction scanner stage. Built for serious execution bias.",
    },
    {
      stage: "TRADE DESK",
      text: "Execution-ready plan with clear structure, direction, risk and target logic.",
    },
  ],

  plans: [
    {
      slug: "buildup",
      badge: "Starter",
      name: "BUILDUP Signals",
      eur: "€39",
      usdt: "45 USDT",
      description:
        "Early momentum building — clean watchlist alerts for preparation and tracking.",
      features: [
        "Includes both BULL + BEAR main signals",
        "Access to MAIN BUILDUP only",
        "No MOON signals in this tier",
        "Built for preparation, tracking and planning",
        "Discord delivery via private role-based channels",
      ],
      cta: "Choose BUILDUP Signals",
    },
    {
      slug: "almost",
      badge: "Most Popular",
      name: "ALMOST Signals",
      eur: "€79",
      usdt: "90 USDT",
      description:
        "Pre-breakout / pre-breakdown setups — close to execution in both MAIN and MOON.",
      features: [
        "Includes both BULL + BEAR main signals",
        "Access to MAIN ALMOST + BUILDUP",
        "Access to MOON ALMOST",
        "Tighter filtering than BUILDUP",
        "Built for active traders who want near-entry structure",
      ],
      cta: "Choose ALMOST Signals",
    },
    {
      slug: "execution",
      badge: "Execution-grade",
      name: "ENTRY + Trade Desk",
      eur: "€149",
      usdt: "170 USDT",
      description:
        "Execution-grade access — strongest MAIN + strongest MOON + Trade Desk delivery.",
      features: [
        "Includes both BULL + BEAR main signals",
        "Access to MAIN ENTRY + ALMOST + BUILDUP",
        "Access to MOON ELITE + MOON ALMOST",
        "Access to the Trade Desk execution layer",
        "Highest filtering and strongest execution bias",
        "Designed for serious execution and lower hesitation",
      ],
      cta: "Choose ENTRY Signals",
    },
  ],

  howItWorks: {
    intro:
      "We explain the workflow without exposing proprietary details. The engine stays private — the delivery stays clear.",
    cards: [
      {
        title: "Market selection",
        body:
          "We track liquid markets and volatility candidates where signals actually matter.",
      },
      {
        title: "Multi-layer filtering",
        body:
          "Momentum plus structure checks. We keep the methodology private — results are what matter.",
      },
      {
        title: "Tiered signals",
        body:
          "BUILDUP is earlier, ALMOST is near-entry, ENTRY is the highest-conviction execution layer.",
      },
      {
        title: "Delivery",
        body:
          "Signals are delivered via private Discord roles and channels based on the member’s plan.",
      },
    ],
    footer:
      "Signals are delivered via Discord roles to private channels. No public signal pages. No methodology leakage.",
  },

  footer: {
    disclaimer:
      "Disclaimer: Not financial advice. Trading is risky. You remain fully responsible for your own decisions.",
  },
};