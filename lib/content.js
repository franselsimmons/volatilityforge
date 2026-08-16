import { BRANDS, PROMOTIONS } from './brands';

export const X_DAILY_VARIANT_COUNT = 366;

const X_PACKS = Object.freeze({
  kryvant: Object.freeze({
    hooks: Object.freeze([
      `Price moves first. Confirmation decides if it matters.`,
      `A fast candle is not automatically a strong move.`,
      `The chart shows the move. Order flow shows the pressure behind it.`,
      `KRYVANT does not chase every breakout.`,
      `Liquidity can tell a different story than price.`,
      `Strong-looking moves still need real participation.`,
      `Signal quality starts below the surface of the chart.`
    ]),
    insights: Object.freeze([
      `We compare aggressive buying and selling with liquidity behaviour before a setup is allowed through.`,
      `A move becomes more useful when participation, liquidity and direction confirm the same story.`,
      `Thin liquidity can create speed without the depth we want behind a signal.`,
      `Absorption matters when price keeps moving but pressure is no longer progressing with it.`,
      `Cross-market confirmation helps separate isolated bursts from broader participation.`,
      `We care less about one candle and more about whether pressure persists after the first push.`,
      `Order flow is most valuable when price and participation begin to disagree.`,
      `A setup can look clean on price and still be rejected when the underlying flow weakens.`,
      `The objective is not more alerts. It is stronger confirmation before an alert exists.`
    ]),
    closers: Object.freeze([
      `Confirmed setups go to Discord.`,
      `Founding Access is free.`,
      `We wait for confirmation, not excitement.`,
      `Only coherent setups progress.`,
      `Live signals are shared in Discord.`,
      `Less noise. Better confirmation.`
    ])
  }),

  lumeriq: Object.freeze({
    hooks: Object.freeze([
      `One strategy should not trade every market regime.`,
      `A market move is not enough. The setup type must fit it.`,
      `LONG or SHORT is only the final decision.`,
      `LUMERIQ selects before it signals.`,
      `Different regimes reward different setup behaviour.`,
      `A missed move is not the same as a missed valid setup.`,
      `The right direction with the wrong setup can still be rejected.`
    ]),
    insights: Object.freeze([
      `We evaluate different LONG and SHORT setup profiles independently instead of forcing one model everywhere.`,
      `Trend, continuation and reversal conditions are treated differently as market structure changes.`,
      `A strong rally can still produce no LONG when the active setup profile does not fit the regime.`,
      `The same market can reward momentum today and punish it when volatility or structure shifts.`,
      `Selection adapts as the environment changes, so activity is never the objective by itself.`,
      `Multiple strategy types compete for relevance before a signal is allowed to reach Discord.`,
      `The system can stay inactive when no strategy profile has enough alignment with current conditions.`,
      `Market regime determines which setup families deserve attention and which should remain silent.`,
      `The goal is simple: use the setup that fits the environment instead of forcing constant trades.`
    ]),
    closers: Object.freeze([
      `Approved signals go to Discord.`,
      `Founding Access is free.`,
      `Selection over prediction.`,
      `No forced trades.`,
      `LONG and SHORT signals are shared live.`,
      `Right setup. Right regime.`
    ])
  }),

  rangenest: Object.freeze({
    hooks: Object.freeze([
      `Bot settings should not be permanent.`,
      `Changing a bot more often does not make it smarter.`,
      `A good range today can become a bad range later.`,
      `RANGENEST optimizes for market fit, not constant activity.`,
      `No change can be the correct bot decision.`,
      `Grid performance starts with the configuration.`,
      `The market changes. Bot settings should react only when justified.`
    ]),
    insights: Object.freeze([
      `We review range behaviour, volatility and market structure before recommending a new configuration.`,
      `Price touching an outer zone is not enough by itself to justify rebuilding the bot.`,
      `A configuration should change when the operating regime changes, not after every noisy move.`,
      `We focus on whether the current range still matches the conditions the bot is actually trading.`,
      `Volatility matters, but so does whether price is respecting or repeatedly stressing the active range.`,
      `Weekly review keeps the bot aligned without turning optimization into endless adjustment.`,
      `The aim is to keep useful settings and replace them only when the structure gives a reason.`,
      `Range placement and configuration are evaluated together instead of guessed independently.`,
      `Optimization means knowing when to adjust, when to widen and when to leave the bot alone.`
    ]),
    closers: Object.freeze([
      `Weekly configurations go to Discord.`,
      `Founding Access is free.`,
      `Configure for the regime.`,
      `Less guessing. Better fit.`,
      `New settings only when justified.`,
      `The range should fit the market.`
    ])
  }),

  ninetyvale: Object.freeze({
    hooks: Object.freeze([
      `The most likely winner is not automatically the best bet.`,
      `Football probability and betting value are not the same thing.`,
      `NINETYVALE selects prices, not famous team names.`,
      `A favourite can win and still have been a bad price.`,
      `Good betting starts after the match prediction.`,
      `Sometimes the strongest selection is no selection.`,
      `The question is not only who wins. It is whether the price is worth taking.`
    ]),
    insights: Object.freeze([
      `We compare our estimated probability with the bookmaker price and act only when the difference creates value.`,
      `A strong team can be rejected when the market has already priced its advantage too aggressively.`,
      `An underdog becomes interesting only when the offered price compensates for the lower win probability.`,
      `Predictable matches can still offer no betting edge when model probability and market price are too close.`,
      `We evaluate the price attached to the outcome instead of treating favourites as automatic selections.`,
      `Value appears when the market price and our probability estimate disagree enough to matter.`,
      `A winning pick is not proof of value, just as a losing pick is not proof the price was wrong.`,
      `The objective is repeatable price selection, not chasing whichever team looks strongest on paper.`,
      `Every approved bet must earn its place through probability and price, not reputation.`
    ]),
    closers: Object.freeze([
      `Selections go to Discord before kick-off.`,
      `Founding Access is free.`,
      `Probability first. Price decides.`,
      `No value means no bet.`,
      `We publish before the result is known.`,
      `Price over popularity.`
    ])
  }),

  arcynth: Object.freeze({
    hooks: Object.freeze([
      `Markets do not move in one timeframe.`,
      `A 24H pullback can exist inside a bullish 30D structure.`,
      `Short-term direction is only one part of the market story.`,
      `ARCYNTH separates the next move from the larger route.`,
      `One candle should not rewrite a 30-day outlook.`,
      `Direction needs timeframe context.`,
      `24H, 7D and 30D can disagree without the forecast being broken.`
    ]),
    insights: Object.freeze([
      `We track BTC, ETH, SOL, XRP and ADA across 24H, 7D and 30D horizons instead of forcing one direction everywhere.`,
      `A local decline can be a temporary phase while the broader multi-day structure remains constructive.`,
      `Short rallies can also occur inside a weakening higher-timeframe path, so horizon context matters.`,
      `Locked forecasts let the route be judged against what happened later instead of rewritten after every move.`,
      `We focus on direction, market phase and turning behaviour across connected but separate horizons.`,
      `The shorter route can adapt without pretending the entire medium- and long-term thesis has changed.`,
      `Forecast continuity matters because constant direction flips make a longer horizon almost meaningless.`,
      `Each horizon has its own job: 24H for the near path, 7D for swing structure and 30D for broader direction.`,
      `The objective is a coherent multi-horizon view rather than one forecast stretched across every timeframe.`
    ]),
    closers: Object.freeze([
      `Locked outlooks go to Discord.`,
      `Founding Access is free.`,
      `One market. Multiple horizons.`,
      `Direction needs context.`,
      `Forecast first. Outcome later.`,
      `Follow the route, not one candle.`
    ])
  })
});

const X_PROMOTIONS = Object.freeze({
  kryvant: `Price alone is not confirmation. KRYVANT combines order flow, liquidity behaviour and cross-market participation before a setup is allowed through. Confirmed signals go to Discord. Founding Access is free.`,
  lumeriq: `One strategy should not trade every regime. LUMERIQ evaluates different LONG and SHORT setup profiles and selects what fits current conditions. Approved signals go to Discord. Founding Access is free.`,
  rangenest: `Stop guessing bot settings. RANGENEST reviews range behaviour, volatility and market structure before recommending a configuration change. Weekly configurations go to Discord. Founding Access is free.`,
  ninetyvale: `The favourite is not automatically the value bet. NINETYVALE compares estimated probability with bookmaker price and only selects when the price creates an edge. Picks go to Discord before kick-off.`,
  arcynth: `One market can tell three different timeframe stories. ARCYNTH tracks BTC, ETH, SOL, XRP and ADA across 24H, 7D and 30D locked forecasts. Outlooks go to Discord. Founding Access is free.`
});

function dayNumber(date = new Date()) {
  return Math.floor(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 86400000);
}

function normalizeIndex(value, modulo) {
  return ((value % modulo) + modulo) % modulo;
}

function buildDailyText(slug, index) {
  const pack = X_PACKS[slug];
  if (!pack) return BRANDS[slug]?.daily?.[0] || '';

  // 7 hooks × 9 insights × 6 closers = 378 unique combinations.
  // A coprime permutation spreads the combinations out so consecutive days do not feel templated.
  const combinationCount = pack.hooks.length * pack.insights.length * pack.closers.length;
  const slot = (index * 73 + 19) % combinationCount;

  const hookIndex = slot % pack.hooks.length;
  const insightIndex = Math.floor(slot / pack.hooks.length) % pack.insights.length;
  const closerIndex = Math.floor(slot / (pack.hooks.length * pack.insights.length)) % pack.closers.length;

  return `${pack.hooks[hookIndex]} ${pack.insights[insightIndex]} ${pack.closers[closerIndex]}`;
}

export function getVariant(slug, offset = 0) {
  const brand = BRANDS[slug];
  const index = normalizeIndex(dayNumber() + offset + brand.name.length, X_DAILY_VARIANT_COUNT);
  return {
    text: buildDailyText(slug, index),
    headline: brand.headlines[index % brand.headlines.length],
    index,
    total: X_DAILY_VARIANT_COUNT
  };
}

export function promotionDue(date = new Date()) {
  const anchor = Date.UTC(2026, 7, 13);
  const today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return Math.floor((today - anchor) / 86400000) % 14 === 0;
}

export function getPromotion(slug) {
  return X_PROMOTIONS[slug] || PROMOTIONS[slug];
}

export function nextPromotionDate(date = new Date()) {
  const anchor = new Date(Date.UTC(2026, 7, 13));
  const today = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  let diff = Math.floor((today - anchor) / 86400000);
  let mod = ((diff % 14) + 14) % 14;
  let add = mod === 0 ? 0 : 14 - mod;
  const result = new Date(today);
  result.setUTCDate(result.getUTCDate() + add);
  return result;
}
