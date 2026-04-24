const QUIZ_LEN = 10;

function shuffleInPlace<T>(arr: T[], rng: () => number) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const t = arr[i];
    arr[i] = arr[j]!;
    arr[j] = t!;
  }
}

type StaticMc = {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
};

const STATIC_MC_POOL: StaticMc[] = [
  {
    id: "def_thin_value",
    prompt:
      "A thin value bet is best described as:",
    options: [
      "A bet you only make when you have the nuts",
      "A value bet where you still lose to part of villain’s calling range, but worse hands call enough that betting beats checking",
      "Any bet smaller than half pot",
      "A mandatory turn shove with top pair",
    ],
    answer:
      "A value bet where you still lose to part of villain’s calling range, but worse hands call enough that betting beats checking",
  },
  {
    id: "second_barrel_meaning",
    prompt: "A second barrel usually means:",
    options: [
      "You check the flop and bet the turn",
      "You bet the flop and bet again on the turn",
      "You only bet when you have a flush draw",
      "You fold the turn after betting the flop",
    ],
    answer: "You bet the flop and bet again on the turn",
  },
  {
    id: "second_barrel_not_always_bluff",
    prompt:
      "After c-betting the flop, betting the turn again can be:",
    options: [
      "Only a pure bluff — never for value",
      "Thin value, protection, pressure, or a bluff depending on the board and ranges",
      "Illegal in cash games",
      "Always the same size as the flop bet",
    ],
    answer:
      "Thin value, protection, pressure, or a bluff depending on the board and ranges",
  },
  {
    id: "small_bet_vs_large_thin",
    prompt:
      "With a marginal made hand you want called by worse, a small bet often:",
    options: [
      "Is worse than a pot-sized bet because small bets are always bluffs",
      "Keeps worse hands in the pot better than an oversized bet that folds them out",
      "Guarantees you never face a raise",
      "Means you must have the nuts",
    ],
    answer:
      "Keeps worse hands in the pot better than an oversized bet that folds them out",
  },
  {
    id: "check_instead_pot_control",
    prompt:
      "Checking instead of betting a marginal hand is a reasonable default when:",
    options: [
      "You always have the best hand",
      "The runout is terrible for your range or you want pot control with a medium-strength hand",
      "You are out of position preflop only",
      "The pot is exactly 100 chips",
    ],
    answer:
      "The runout is terrible for your range or you want pot control with a medium-strength hand",
  },
  {
    id: "free_card",
    prompt:
      "When you are ahead but vulnerable to draws, checking the turn:",
    options: [
      "Always wins more money than betting",
      "Sometimes gives a free card that improves hands behind you",
      "Forces villain to fold every draw",
      "Ends the hand immediately",
    ],
    answer:
      "Sometimes gives a free card that improves hands behind you",
  },
  {
    id: "thin_vs_polarized_lite",
    prompt:
      "Compared with a polarized betting range (very strong or bluffs), thin value spots often involve:",
    options: [
      "Only hands with 100% equity",
      "Marginal made hands that want action from slightly worse holdings",
      "Never betting the river",
      "Always checking back the nuts",
    ],
    answer:
      "Marginal made hands that want action from slightly worse holdings",
  },
  {
    id: "fold_equity_contrast",
    prompt:
      "Bluffs lean on fold equity; thin value bets mainly lean on:",
    options: [
      "Villain always folding top pair",
      "Getting called by worse hands enough of the time",
      "Seeing all five board cards for free",
      "The dealer awarding you half the pot",
    ],
    answer: "Getting called by worse hands enough of the time",
  },
  {
    id: "scare_card_turn",
    prompt:
      "The turn completes an obvious draw (e.g. third flush card) and you have a one-pair hand. A teaching-lite takeaway:",
    options: [
      "You must always bet pot for thin value",
      "Be cautious — many worse hands that called the flop may now fold or only continue with stronger holdings",
      "Checking is impossible in position",
      "Your hand strength automatically becomes a flush",
    ],
    answer:
      "Be cautious — many worse hands that called the flop may now fold or only continue with stronger holdings",
  },
  {
    id: "ip_second_barrel",
    prompt:
      "In position, a second barrel after flop call can be attractive partly because:",
    options: [
      "You see villain check first and can represent strength credibly",
      "The pot is always smaller in position",
      "You cannot be raised",
      "Turn order is random each hand",
    ],
    answer:
      "You see villain check first and can represent strength credibly",
  },
  {
    id: "river_thin_vs_check",
    prompt:
      "On the river, with second pair after villain checks, a small bet sometimes beats checking because:",
    options: [
      "Villain must call with every hand by rule",
      "It can get called by worse pairs and some busted bluffs while risking less than a large bet",
      "River bets cannot be raised",
      "Pot odds no longer apply on the river",
    ],
    answer:
      "It can get called by worse pairs and some busted bluffs while risking less than a large bet",
  },
  {
    id: "protection_lite",
    prompt:
      "Protection betting (lite definition) refers to:",
    options: [
      "Betting to charge draws and deny free cards when you are often ahead but not invulnerable",
      "Only betting when you have zero outs",
      "Checking every strong hand",
      "Splitting the pot with the dealer",
    ],
    answer:
      "Betting to charge draws and deny free cards when you are often ahead but not invulnerable",
  },
  {
    id: "not_solver",
    prompt:
      "This module’s heuristics are meant to complement live reads and study — not to replace:",
    options: [
      "Basic hand rankings",
      "Solver-derived exact frequencies you would memorize for every spot",
      "The blinds",
      "Position",
    ],
    answer:
      "Solver-derived exact frequencies you would memorize for every spot",
  },
  {
    id: "spr_lite_link",
    prompt:
      "When stacks are shallow (low SPR), thin value bets with marginal hands tend to:",
    options: [
      "Become trickier because fewer chips behind means less room to maneuver after a bet or raise",
      "Always be impossible",
      "Require exactly 2x pot sizing",
      "Only apply preflop",
    ],
    answer:
      "Become trickier because fewer chips behind means less room to maneuver after a bet or raise",
  },
];

function shuffleMcOptions(q: StaticMc, rng: () => number): StaticMc {
  const opts = [...q.options];
  shuffleInPlace(opts, rng);
  return { ...q, options: opts };
}

export type ThinValueBetSizingQuizQuestion = {
  id: string;
  kind: "mc_text";
  prompt: string;
  options: string[];
  answer: string;
};

export function buildThinValueBetSizingQuestions(
  count: number = QUIZ_LEN,
  rng: () => number = Math.random,
): ThinValueBetSizingQuizQuestion[] {
  const indices = STATIC_MC_POOL.map((_, i) => i);
  shuffleInPlace(indices, rng);
  const take = Math.min(count, STATIC_MC_POOL.length);
  const chosen = indices.slice(0, take).map((i) => STATIC_MC_POOL[i]!);

  return chosen.map((s) => {
    const shuffled = shuffleMcOptions(s, rng);
    return {
      id: shuffled.id,
      kind: "mc_text" as const,
      prompt: shuffled.prompt,
      options: shuffled.options,
      answer: shuffled.answer,
    };
  });
}

export { QUIZ_LEN as THIN_VALUE_BET_SIZING_QUIZ_LEN };
