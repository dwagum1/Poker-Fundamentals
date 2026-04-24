const QUIZ_LEN = 10;

function shuffleInPlace<T>(arr: T[], rng: () => number) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
}

function pickNumberOptions(answer: number, rng: () => number): number[] {
  const wrong = new Set<number>();
  let guard = 0;
  while (wrong.size < 3 && guard++ < 80) {
    const delta = Math.floor(rng() * 21) - 10;
    const w = Math.max(1, Math.min(99, answer + delta));
    if (w !== answer) wrong.add(w);
  }
  while (wrong.size < 3) {
    const w = (Math.floor(rng() * 98) + 1) as number;
    if (w !== answer) wrong.add(w);
  }
  const opts = [answer, ...Array.from(wrong)];
  shuffleInPlace(opts, rng);
  return opts;
}

/** Minimum fold frequency (%) for a pure bluff: bet / (potBefore + bet). */
export function minFoldPercentForPureBluff(
  potBefore: number,
  bet: number,
): number {
  return Math.round((bet / (potBefore + bet)) * 100);
}

function randomBluffScenario(rng: () => number): {
  potBefore: number;
  bet: number;
} {
  const potBefore = 40 + Math.floor(rng() * 12) * 10;
  const bet = 20 + Math.floor(rng() * 10) * 5;
  return { potBefore, bet };
}

type StaticMc = {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
};

const STATIC_MC_POOL: StaticMc[] = [
  {
    id: "def_fold_equity",
    prompt:
      "Fold equity is best described as:",
    options: [
      "How often you expect to hit your draw by the river",
      "How often your opponent folds to your bet or raise, letting you win the pot without showdown",
      "The size of the pot before you act",
      "Your stack divided by the big blind",
    ],
    answer:
      "How often your opponent folds to your bet or raise, letting you win the pot without showdown",
  },
  {
    id: "def_pure_bluff",
    prompt: "A pure bluff is a bet or raise where:",
    options: [
      "You mainly need folds to profit; you have little or no equity when called",
      "You always have the nuts",
      "You only play this way preflop",
      "You can only do it on the river",
    ],
    answer:
      "You mainly need folds to profit; you have little or no equity when called",
  },
  {
    id: "def_semi_bluff",
    prompt: "A semi-bluff is a bet or raise with:",
    options: [
      "No chance to improve",
      "Some equity when called (e.g. a draw), plus fold equity",
      "A hand that can never lose",
      "Exactly 50% equity",
    ],
    answer:
      "Some equity when called (e.g. a draw), plus fold equity",
  },
  {
    id: "formula_fold_freq",
    prompt:
      "For a pure bluff into a pot of P (before your bet), risking bet B, the break-even fold frequency (as a fraction of the time villain must fold) is:",
    options: ["B / (P + B)", "P / (P + B)", "B / P", "P / B"],
    answer: "B / (P + B)",
  },
  {
    id: "scenario_station",
    prompt:
      "Against an opponent who almost never folds postflop, your bluffs will usually:",
    options: [
      "Print money without adjustment",
      "Need a stronger story, better spots, or be used less often",
      "Always be correct if you bet small",
      "Only work from the small blind",
    ],
    answer:
      "Need a stronger story, better spots, or be used less often",
  },
  {
    id: "scenario_position",
    prompt:
      "Bluffs often succeed more in position (acting last) than out of position mainly because:",
    options: [
      "The pot is automatically bigger in position",
      "You see more information before deciding, and can represent lines more credibly on later streets",
      "You are forced to check every time",
      "Fold equity does not apply in position",
    ],
    answer:
      "You see more information before deciding, and can represent lines more credibly on later streets",
  },
  {
    id: "semi_vs_pure",
    prompt:
      "Compared to a pure bluff, a semi-bluff with real outs when called:",
    options: [
      "Relies only on folds and is worse when called every time",
      "Can still be reasonable even if villain calls more, because you sometimes win at showdown",
      "Must be larger than the pot every time",
      "Should only be done on the river",
    ],
    answer:
      "Can still be reasonable even if villain calls more, because you sometimes win at showdown",
  },
  {
    id: "sizing_bluff",
    prompt:
      "If your bluff bet is very small relative to the pot, villains often:",
    options: [
      "Get a good price to continue with marginal hands",
      "Always fold top pair",
      "Cannot call by rule",
      "See fewer cards on board",
    ],
    answer: "Get a good price to continue with marginal hands",
  },
  {
    id: "blockers_intro",
    prompt:
      "Holding blockers (cards that make some of villain’s strongest hands less likely) matters for bluffing because:",
    options: [
      "They increase the pot size automatically",
      "They can reduce combinations of nut hands villain holds, shaping how credible your line is",
      "They guarantee a fold",
      "They only apply preflop",
    ],
    answer:
      "They can reduce combinations of nut hands villain holds, shaping how credible your line is",
  },
  {
    id: "story_texture",
    prompt:
      "At a fundamentals level, a bluff works better when:",
    options: [
      "Your betting line tells a coherent story that matches the board runout",
      "The board is random to you and you ignore texture",
      "You always use the same bet size with every hand",
      "You only bluff when you have the nuts",
    ],
    answer:
      "Your betting line tells a coherent story that matches the board runout",
  },
];

function shuffleMcOptions(q: StaticMc, rng: () => number): StaticMc {
  const opts = [...q.options];
  shuffleInPlace(opts, rng);
  return { ...q, options: opts };
}

function buildNumericQuestion(
  index: number,
  rng: () => number,
  usedKeys: Set<string>,
): BluffingFundamentalsQuizQuestion {
  let potBefore = 100;
  let bet = 50;
  let guard = 0;
  while (guard++ < 50) {
    const s = randomBluffScenario(rng);
    potBefore = s.potBefore;
    bet = s.bet;
    const key = `${potBefore}_${bet}`;
    if (!usedKeys.has(key)) {
      usedKeys.add(key);
      break;
    }
  }
  const answer = minFoldPercentForPureBluff(potBefore, bet);
  return {
    id: `foldpct_${index}`,
    kind: "min_fold_pct",
    prompt: `You bluff-bet $${bet} into a pot of $${potBefore} (before your bet). Villain only has call or fold. What minimum fold frequency (%) makes this pure bluff break even? Round to the nearest whole percent.`,
    potBefore,
    bet,
    options: pickNumberOptions(answer, rng),
    answer,
  };
}

export type BluffingFundamentalsQuizQuestion =
  | {
      id: string;
      kind: "min_fold_pct";
      prompt: string;
      potBefore: number;
      bet: number;
      options: number[];
      answer: number;
    }
  | {
      id: string;
      kind: "mc_text";
      prompt: string;
      options: string[];
      answer: string;
    };

export function buildBluffingFundamentalsQuizQuestions(
  count: number = QUIZ_LEN,
  rng: () => number = Math.random,
): BluffingFundamentalsQuizQuestion[] {
  const numericCount = Math.min(4, count);
  const staticCount = Math.max(0, count - numericCount);

  const staticIndices = STATIC_MC_POOL.map((_, i) => i);
  shuffleInPlace(staticIndices, rng);
  const chosenStatic = staticIndices
    .slice(0, Math.min(staticCount, STATIC_MC_POOL.length))
    .map((i) => STATIC_MC_POOL[i]!);

  const usedKeys = new Set<string>();
  const numeric: BluffingFundamentalsQuizQuestion[] = [];
  for (let n = 0; n < numericCount; n++) {
    numeric.push(buildNumericQuestion(n, rng, usedKeys));
  }

  const mcQs: BluffingFundamentalsQuizQuestion[] = chosenStatic.map((s) => {
    const shuffled = shuffleMcOptions(s, rng);
    return {
      id: shuffled.id,
      kind: "mc_text" as const,
      prompt: shuffled.prompt,
      options: shuffled.options,
      answer: shuffled.answer,
    };
  });

  const combined = [...numeric, ...mcQs];
  shuffleInPlace(combined, rng);
  return combined.slice(0, count);
}

export { QUIZ_LEN as BLUFFING_FUNDAMENTALS_QUIZ_LEN };
