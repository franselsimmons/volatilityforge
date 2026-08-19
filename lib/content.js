//file: lib/content.js

import { BRANDS, PROMOTIONS } from './brands';

export const X_DAILY_VARIANT_COUNT = 366;
export const REEL_DAILY_VARIANT_COUNT = 366;

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

const REEL_PACKS = Object.freeze({
  kryvant: Object.freeze({
    topics: Object.freeze([
      'ORDER FLOW', 'ABSORPTION', 'LIQUIDITY', 'PRESSURE',
      'PARTICIPATION', 'BREAKOUT FILTER', 'RESPONSE', 'CONFIRMATION'
    ]),
    hooks: Object.freeze([
      `THE CANDLE MOVED. DID THE FLOW AGREE?`,
      `PRESSURE MEANS NOTHING WITHOUT RESPONSE.`,
      `A FAST BREAKOUT CAN STILL BE EMPTY.`,
      `LIQUIDITY CAN DISAGREE WITH PRICE.`,
      `REAL PARTICIPATION LEAVES A DIFFERENT FOOTPRINT.`,
      `ABSORPTION CAN START BEFORE PRICE TURNS.`,
      `THE MOVE IS VISIBLE. THE QUALITY ISN'T.`,
      `PRICE SHOWS WHERE. FLOW EXPLAINS WHY.`
    ]),
    insights: Object.freeze([
      `KRYVANT follows aggressive activity and the market response instead of treating raw movement as confirmation.`,
      `When pressure increases but price stops progressing, the quality of the move changes before the chart necessarily reverses.`,
      `Thin liquidity can create speed without broad participation, so movement alone never completes the signal story.`,
      `Absorption matters when repeated attacks keep arriving but the opposing side continues to hold the same area.`,
      `Cross-market participation helps separate a local burst from pressure that is actually supported across venues.`,
      `Liquidity shifts are useful because the same order flow can behave very differently when depth changes around it.`,
      `KRYVANT looks for agreement between pressure, liquidity and price response before a setup earns confirmation.`,
      `The strongest information often appears when price and participation stop telling the same story.`
    ]),
    payoffs: Object.freeze([
      `FLOW + LIQUIDITY + RESPONSE.`,
      `CONFIRMATION BEFORE SIGNAL.`,
      `READ THE PRESSURE BEHIND THE MOVE.`,
      `LESS NOISE. STRONGER CONTEXT.`,
      `THE RESPONSE DECIDES THE QUALITY.`,
      `DON'T CHASE THE OUTPUT. READ THE CAUSE.`
    ])
  }),

  lumeriq: Object.freeze({
    topics: Object.freeze([
      '75 MICRO-FAMILIES', 'REGIME FIT', 'LONG FILTER', 'SHORT FILTER',
      'SETUP TYPE', 'SELECTION', 'ADAPTATION', 'FINAL SIGNAL'
    ]),
    hooks: Object.freeze([
      `75 MICRO-FAMILIES. ONE SELECTED SIGNAL.`,
      `NOT EVERY STRATEGY DESERVES TO TRADE TODAY.`,
      `THE MARKET CHANGES. THE SELECTION MUST CHANGE.`,
      `LONG OR SHORT IS ONLY THE LAST STEP.`,
      `ONE MOVE CAN FIT ONE STRATEGY AND FAIL ANOTHER.`,
      `COMPLEXITY IN. CLARITY OUT.`,
      `THE RIGHT DIRECTION WITH THE WRONG SETUP CAN STILL FAIL.`,
      `SELECTION HAPPENS BEFORE THE SIGNAL.`
    ]),
    insights: Object.freeze([
      `LUMERIQ lets different LONG and SHORT setup profiles compete for relevance instead of forcing one model into every regime.`,
      `Trend, continuation and reversal logic are treated differently because the market does not reward every setup style at the same time.`,
      `A strong move can still be rejected when the active setup family does not fit the environment that produced it.`,
      `The engine becomes more selective when regime and setup type disagree, even if price direction looks obvious.`,
      `Many independent strategy paths are filtered until only the setups compatible with current conditions remain.`,
      `A quiet system can be a correct system when none of the available strategy families have enough alignment.`,
      `LONG and SHORT logic are evaluated independently, so a weak case on one side does not automatically create a signal on the other.`,
      `The objective is not maximum activity. It is the right setup operating in the right market.`
    ]),
    payoffs: Object.freeze([
      `MANY STRATEGIES. ONE DECISION.`,
      `RIGHT SETUP. RIGHT REGIME.`,
      `SELECTION OVER ACTIVITY.`,
      `NO FORCED SIGNALS.`,
      `ADAPT THE PLAYBOOK TO THE MARKET.`,
      `ONE FINAL OUTPUT AFTER MANY FILTERS.`
    ])
  }),

  rangenest: Object.freeze({
    topics: Object.freeze([
      'RANGE FIT', 'VOLATILITY', 'GRID STRUCTURE', 'CONFIGURATION',
      'HOLD DECISION', 'OUTER ZONES', 'MARKET FIT', 'WEEKLY REVIEW'
    ]),
    hooks: Object.freeze([
      `THE BOT IS ONLY AS GOOD AS ITS RANGE.`,
      `NO CHANGE CAN BE THE SMARTER CHANGE.`,
      `VOLATILITY MOVED. SHOULD THE RANGE MOVE TOO?`,
      `MORE GRIDS DOES NOT MEAN MORE EDGE.`,
      `A GOOD RANGE CAN QUIETLY BECOME A BAD ONE.`,
      `STOP REACTING TO EVERY CANDLE. CONFIGURE THE REGIME.`,
      `AUTOMATION MAGNIFIES BAD SETTINGS TOO.`,
      `OPTIMIZE THE RANGE. NOT THE HYPE.`
    ]),
    insights: Object.freeze([
      `RANGENEST reviews range behaviour, volatility and structure together before a weekly configuration is changed.`,
      `Price touching an outer zone is not enough by itself; the important question is whether the active range still fits the market.`,
      `A configuration can stay unchanged after a large move when the broader operating structure remains compatible with the bot.`,
      `Grid density, range width and exposure work as one system, so changing one number in isolation can weaken the full setup.`,
      `Higher volatility only matters in context: temporary noise and a genuine regime shift should not receive the same configuration response.`,
      `Repeated stress near the edges of the range can warn that the bot is approaching a different operating environment.`,
      `The optimizer treats KEEP CURRENT SETTINGS as a real decision when the evidence does not justify rebuilding the bot.`,
      `Weekly review is about market fit, not manufacturing a fresh configuration just because another week started.`
    ]),
    payoffs: Object.freeze([
      `RANGE FIRST. SETTINGS SECOND.`,
      `CHANGE ONLY WHEN STRUCTURE JUSTIFIES IT.`,
      `STABILITY IS A VALID OUTPUT.`,
      `CONFIGURE FOR THE MARKET YOU HAVE.`,
      `LESS GUESSING. BETTER FIT.`,
      `AUTOMATION STARTS WITH CONFIGURATION.`
    ])
  }),

  ninetyvale: Object.freeze({
    topics: Object.freeze([
      'MODEL VS MARKET', 'VALUE CHECK', 'FAVOURITE PRICE', 'UNDERDOG PRICE',
      'NO BET', 'PROBABILITY', 'MARKET ODDS', 'SELECTION'
    ]),
    hooks: Object.freeze([
      `THE FAVOURITE CAN STILL BE THE WRONG BET.`,
      `A PREDICTION IS NOT YET A VALUE BET.`,
      `GOOD TEAM. BAD PRICE. NO BET.`,
      `THE ODDS CAN CHANGE THE ENTIRE DECISION.`,
      `THE MOST LIKELY WINNER IS NOT ALWAYS THE BEST PRICE.`,
      `NO EDGE. NO SELECTION.`,
      `WE PRICE PROBABILITY. NOT POPULARITY.`,
      `FOOTBALL IS ONLY HALF THE EQUATION.`
    ]),
    insights: Object.freeze([
      `NINETYVALE compares estimated match probability with the probability implied by the market price before a selection is allowed through.`,
      `A strong favourite can be rejected when the bookmaker price already charges too much for the advantage the model sees.`,
      `An underdog does not need to be likely to win; the question is whether the offered price compensates enough for the lower probability.`,
      `A match can be easy to predict and still offer no value when model probability and market price are too close.`,
      `Market movement can remove an edge even when the football view itself has not changed at all.`,
      `No-selection decisions protect price discipline because every fixture does not deserve a bet.`,
      `The betting decision starts after the football probability has been estimated. Price determines whether the idea survives.`,
      `NINETYVALE is interested in the gap between probability and price, not which team name attracts the most attention.`
    ]),
    payoffs: Object.freeze([
      `PROBABILITY FIRST. PRICE DECIDES.`,
      `VALUE EXISTS IN THE DIFFERENCE.`,
      `PRICE OVER POPULARITY.`,
      `NO EDGE MEANS NO BET.`,
      `SELECT THE PRICE. NOT THE NAME.`,
      `MODEL VIEW + MARKET PRICE = DECISION.`
    ])
  }),

  arcynth: Object.freeze({
    topics: Object.freeze([
      '24H ROUTE', '7D STRUCTURE', '30D DIRECTION', 'HORIZON ALIGNMENT',
      'LOCKED FORECAST', 'TURNING ZONE', 'MARKET PHASE', 'FORECAST ROUTE'
    ]),
    hooks: Object.freeze([
      `ONE MARKET STORY. THREE TIME HORIZONS.`,
      `THE NEXT MOVE IS NOT THE WHOLE ROUTE.`,
      `24H CAN TURN WITHOUT REWRITING 30D.`,
      `ONE CANDLE SHOULD NOT REWRITE THIRTY DAYS.`,
      `FORECAST THE PATH. THEN JUDGE THE OUTCOME.`,
      `DIRECTION NEEDS TIMEFRAME CONTEXT.`,
      `A SHORT-TERM PULLBACK CAN LIVE INSIDE A LARGER TREND.`,
      `24H. 7D. 30D. DIFFERENT JOBS. ONE VIEW.`
    ]),
    insights: Object.freeze([
      `ARCYNTH tracks BTC, ETH, SOL, XRP and ADA across separate 24H, 7D and 30D routes instead of forcing one direction everywhere.`,
      `The near-term path can adapt while the broader swing and long-horizon structures remain intact.`,
      `Locked forecasts preserve the original route so the model can be judged against what happened later instead of quietly rewritten.`,
      `A local decline can be a temporary phase while the wider multi-day structure remains constructive.`,
      `Short rallies can also appear inside a weakening higher-timeframe route, which is why horizon context matters.`,
      `Each horizon has a separate job: 24H for the near path, 7D for swing structure and 30D for broader direction.`,
      `Forecast continuity matters because constant direction flips would make medium- and long-term routes almost meaningless.`,
      `ARCYNTH connects near-term turning behaviour with swing structure and broader direction without pretending they are the same forecast.`
    ]),
    payoffs: Object.freeze([
      `ONE MARKET. MULTIPLE HORIZONS.`,
      `FOLLOW THE ROUTE. NOT ONE CANDLE.`,
      `24H + 7D + 30D = CONTEXT.`,
      `LOCK THE FORECAST. JUDGE IT LATER.`,
      `THE HORIZONS CAN DISAGREE WITHOUT BREAKING THE STORY.`,
      `FORECAST FIRST. OUTCOME LATER.`
    ])
  })
});

const PROMOTION_ANCHOR_UTC = Date.UTC(2026, 7, 13);
const PROMOTION_CYCLE_DAYS = 14;

const PROMOTION_PACKS = Object.freeze({
  kryvant: Object.freeze({
    headlines: Object.freeze([
      `PRICE SHOWS WHERE. ORDER FLOW EXPLAINS WHY.`,
      `READ THE PRESSURE BEHIND THE MOVE.`,
      `LIQUIDITY DECIDES WHAT PRICE CAN HOLD.`,
      `A BREAKOUT WITHOUT SUPPORT IS JUST A MOVE.`,
      `REAL PRESSURE NEEDS REAL RESPONSE.`,
      `THE CHART IS THE OUTPUT. FLOW IS THE CONTEXT.`
    ]),
    insights: Object.freeze([
      `KRYVANT connects aggressive activity, liquidity shifts, absorption and cross-market participation before a setup earns confirmation.`,
      `Fast price movement matters more when the underlying flow keeps supporting the direction after the first push.`,
      `The system looks beyond visible candles to judge whether liquidity is accepting pressure or quietly resisting it.`,
      `A move can look strong and still lose quality when participation weakens or absorption starts dominating the response.`,
      `Order flow becomes useful when price, pressure and liquidity stop telling the same story.`,
      `KRYVANT filters for coherent participation instead of treating every breakout as an automatic signal.`
    ]),
    closers: Object.freeze([
      `Confirmed setups go to Discord.`,
      `See the flow behind the move in Discord.`,
      `Signal access is available through Discord.`,
      `Less noise. Better confirmation. Join Discord.`
    ])
  }),

  lumeriq: Object.freeze({
    headlines: Object.freeze([
      `75 MICRO-FAMILIES. ONE SELECTED SIGNAL.`,
      `MANY STRATEGIES. ONE FINAL DECISION.`,
      `THE MARKET CHANGES. SELECTION CHANGES WITH IT.`,
      `RIGHT SETUP. RIGHT REGIME. ONE SIGNAL.`,
      `COMPLEXITY IN. CLARITY OUT.`,
      `SELECTION BEFORE DIRECTION.`
    ]),
    insights: Object.freeze([
      `LUMERIQ evaluates many LONG and SHORT setup profiles independently and lets market regime decide which ones deserve to progress.`,
      `Different strategy families compete for relevance so one market move does not automatically become one universal trade idea.`,
      `Trend, reversal and continuation logic are filtered through current conditions before a signal is allowed through.`,
      `The system can reject an obvious move when the strategy profile does not fit the environment that produced it.`,
      `Adaptive selection reduces forced trades by letting incompatible setup families stay silent.`,
      `Many independent strategy paths are distilled into one selected output only when the current market supports it.`
    ]),
    closers: Object.freeze([
      `Approved LONG and SHORT signals go to Discord.`,
      `One selected signal. Shared through Discord.`,
      `Signal access is available through Discord.`,
      `Selection over activity. Join Discord.`
    ])
  }),

  rangenest: Object.freeze({
    headlines: Object.freeze([
      `OPTIMIZE THE RANGE. NOT THE HYPE.`,
      `THE BOT IS ONLY AS GOOD AS ITS RANGE.`,
      `CONFIGURE FOR THE MARKET YOU ACTUALLY HAVE.`,
      `NO CHANGE CAN BE THE SMARTER CHANGE.`,
      `VOLATILITY MOVES. THE RANGE MUST STILL FIT.`,
      `AUTOMATION STARTS WITH THE RIGHT CONFIGURATION.`
    ]),
    insights: Object.freeze([
      `RANGENEST reviews volatility, range behaviour and market structure before recommending a weekly configuration change.`,
      `The objective is not more adjustments. It is keeping the bot inside a structure its settings were designed to handle.`,
      `Range width, grid behaviour and market regime are evaluated together instead of changing parameters in isolation.`,
      `A configuration can stay unchanged when the market still fits it. Stability is treated as a valid optimization result.`,
      `Repeated pressure near the edges of a range can matter more than one dramatic candle in the middle of it.`,
      `The optimizer focuses on range efficiency and structural fit so weekly settings react to evidence, not noise.`
    ]),
    closers: Object.freeze([
      `Weekly bot configurations go to Discord.`,
      `Current settings are shared through Discord.`,
      `Range research and updates are available in Discord.`,
      `Less guessing. Better fit. Join Discord.`
    ])
  }),

  ninetyvale: Object.freeze({
    headlines: Object.freeze([
      `THE FAVOURITE IS NOT AUTOMATICALLY THE VALUE BET.`,
      `WE PRICE PROBABILITY. NOT POPULARITY.`,
      `GOOD TEAM. BAD PRICE. NO BET.`,
      `A PREDICTION IS NOT YET A VALUE BET.`,
      `ODDS CAN CHANGE THE ENTIRE DECISION.`,
      `NO EDGE. NO SELECTION.`
    ]),
    insights: Object.freeze([
      `NINETYVALE compares estimated match probability with bookmaker price and only selects when the difference creates real value.`,
      `A strong favourite can still be rejected when the market has already priced too much confidence into the odds.`,
      `The model separates football probability from betting value so reputation never becomes an automatic selection.`,
      `An underdog can become interesting when the offered price compensates for its lower win probability.`,
      `The betting decision starts after the probability estimate: price decides whether the opportunity survives.`,
      `No-selection outcomes are part of the system because forcing a bet into every fixture destroys price discipline.`
    ]),
    closers: Object.freeze([
      `Selections go to Discord before kick-off.`,
      `Value selections are published through Discord.`,
      `See approved picks in Discord before kick-off.`,
      `Probability first. Price decides. Join Discord.`
    ])
  }),

  arcynth: Object.freeze({
    headlines: Object.freeze([
      `ONE MARKET STORY. THREE TIME HORIZONS.`,
      `24H. 7D. 30D. DIFFERENT JOBS. ONE VIEW.`,
      `THE NEXT MOVE IS NOT THE WHOLE ROUTE.`,
      `ONE CANDLE SHOULD NOT REWRITE THIRTY DAYS.`,
      `FORECAST THE PATH. THEN JUDGE THE OUTCOME.`,
      `DIRECTION NEEDS TIMEFRAME CONTEXT.`
    ]),
    insights: Object.freeze([
      `ARCYNTH tracks BTC, ETH, SOL, XRP and ADA across separate 24H, 7D and 30D forecast horizons instead of forcing one direction everywhere.`,
      `Short-term movement can change while the broader route remains intact, so every horizon keeps its own role.`,
      `Locked forecasts preserve the original route so later outcomes can be compared with what the model actually projected.`,
      `The system connects near-term turns, swing structure and broader direction into one coherent multi-horizon market story.`,
      `A local pullback does not automatically invalidate a longer-term route, just as a short rally cannot repair every weak higher-timeframe structure.`,
      `Forecast continuity matters because a useful 7D or 30D view cannot be rewritten after every short-term candle.`
    ]),
    closers: Object.freeze([
      `Locked outlooks go to Discord.`,
      `24H, 7D and 30D forecasts are shared through Discord.`,
      `Follow the route through Discord.`,
      `One market. Multiple horizons. Join Discord.`
    ])
  })
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

function buildReelText(slug, index) {
  const pack = REEL_PACKS[slug];
  const brand = BRANDS[slug];
  if (!pack || !brand) return null;

  // 8 hooks × 8 insights × 6 payoffs = 384 combinations.
  // 73 is coprime with 384, so the first 366 daily slots are unique.
  const combinationCount = pack.hooks.length * pack.insights.length * pack.payoffs.length;
  const slot = normalizeIndex(index * 73 + 41, combinationCount);
  const hookIndex = slot % pack.hooks.length;
  const insightIndex = Math.floor(slot / pack.hooks.length) % pack.insights.length;
  const payoffIndex = Math.floor(slot / (pack.hooks.length * pack.insights.length)) % pack.payoffs.length;

  return {
    hook: pack.hooks[hookIndex],
    insight: pack.insights[insightIndex],
    payoff: pack.payoffs[payoffIndex],
    topic: pack.topics[hookIndex % pack.topics.length],
    variant: slot % 8
  };
}

export function getReelVariant(slug, date = new Date()) {
  const brand = BRANDS[slug];
  if (!brand) return null;

  const absoluteDay = dayNumber(date);
  const index = normalizeIndex(absoluteDay + brand.contentSeed * 3 + brand.name.length, REEL_DAILY_VARIANT_COUNT);
  const selected = buildReelText(slug, index);
  if (!selected) return null;

  const seed = (
    Math.imul((absoluteDay + 1) >>> 0, 2654435761) ^
    Math.imul((brand.contentSeed + 17) >>> 0, 2246822519)
  ) >>> 0;

  const dateKey = [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, '0'),
    String(date.getUTCDate()).padStart(2, '0')
  ].join('-');

  return {
    ...selected,
    index,
    total: REEL_DAILY_VARIANT_COUNT,
    seed,
    dateKey,
    durationSeconds: 12,
    caption: `${selected.hook} ${selected.insight} ${selected.payoff}`
  };
}

export function promotionCycleIndex(date = new Date()) {
  const today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const diffDays = Math.floor((today - PROMOTION_ANCHOR_UTC) / 86400000);
  return Math.floor(diffDays / PROMOTION_CYCLE_DAYS);
}

export function promotionDue(date = new Date()) {
  const today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const diffDays = Math.floor((today - PROMOTION_ANCHOR_UTC) / 86400000);
  return normalizeIndex(diffDays, PROMOTION_CYCLE_DAYS) === 0;
}

export function getPromotionVariant(slug, date = new Date()) {
  const pack = PROMOTION_PACKS[slug];
  const brand = BRANDS[slug];

  if (!pack || !brand) {
    const fallback = PROMOTIONS[slug] || '';
    return {
      text: fallback,
      headline: brand?.headlines?.[0] || brand?.positioning || '',
      visualSubtitle: fallback,
      cycleIndex: promotionCycleIndex(date)
    };
  }

  const cycleIndex = promotionCycleIndex(date);
  const headlineIndex = normalizeIndex(
    cycleIndex * 5 + brand.name.length + brand.contentSeed,
    pack.headlines.length
  );
  const insightIndex = normalizeIndex(
    cycleIndex * 7 + brand.contentSeed,
    pack.insights.length
  );
  const closerIndex = normalizeIndex(
    cycleIndex * 11 + brand.name.length,
    pack.closers.length
  );

  const headline = pack.headlines[headlineIndex];
  const visualSubtitle = pack.insights[insightIndex];
  const text = `${headline} ${visualSubtitle} ${pack.closers[closerIndex]}`;

  return {
    text,
    headline,
    visualSubtitle,
    cycleIndex
  };
}

export function getPromotion(slug, date = new Date()) {
  return getPromotionVariant(slug, date).text;
}

export function nextPromotionDate(date = new Date()) {
  const today = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const diffDays = Math.floor((today.getTime() - PROMOTION_ANCHOR_UTC) / 86400000);
  const mod = normalizeIndex(diffDays, PROMOTION_CYCLE_DAYS);
  const add = mod === 0 ? PROMOTION_CYCLE_DAYS : PROMOTION_CYCLE_DAYS - mod;
  const result = new Date(today);
  result.setUTCDate(result.getUTCDate() + add);
  return result;
}
