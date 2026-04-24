const QUIZ_LEN = 10;

function shuffleInPlace<T>(arr: T[], rng: () => number) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
}

function pickIntOptions(answer: number, rng: () => number): number[] {
  const wrong = new Set<number>();
  let guard = 0;
  while (wrong.size < 3 && guard++ < 80) {
    const delta = Math.floor(rng() * 9) - 4;
    const w = Math.max(0, answer + delta);
    if (w !== answer) wrong.add(w);
  }
  while (wrong.size < 3) {
    const w = Math.floor(rng() * 41);
    if (w !== answer) wrong.add(w);
  }
  const opts = [answer, ...Array.from(wrong)];
  shuffleInPlace(opts, rng);
  return opts;
}

export function fullBuyInsFromRoll(roll: number, maxBuyIn: number): number {
  return Math.floor(roll / maxBuyIn);
}

type StaticMc = {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
};

const STATIC_MC_POOL: StaticMc[] = [
  {
    id: "def_bankroll",
    prompt: "A poker bankroll is best described as:",
    options: [
      "Money you need for rent and bills this month",
      "Money set aside for poker that you can afford to lose without harming essentials",
      "Only the chips in front of you in one hand",
      "The biggest pot you have ever won",
    ],
    answer:
      "Money set aside for poker that you can afford to lose without harming essentials",
  },
  {
    id: "def_variance",
    prompt: "Variance in poker means:",
    options: [
      "You always win if you play well",
      "Short-term results swing up and down even when decisions are solid",
      "The rake is always zero",
      "Bluffs never work",
    ],
    answer:
      "Short-term results swing up and down even when decisions are solid",
  },
  {
    id: "scared_money",
    prompt: "Playing with “scared money” (money you cannot afford to lose) usually:",
    options: [
      "Improves your focus",
      "Makes it harder to play correctly because fear distorts decisions",
      "Guarantees tighter play is always correct",
      "Only matters in tournaments",
    ],
    answer:
      "Makes it harder to play correctly because fear distorts decisions",
  },
  {
    id: "downswing",
    prompt: "A winning player can still have long losing stretches because:",
    options: [
      "The rules change each session",
      "Luck and variance affect outcomes in the short run",
      "Online poker is always rigged",
      "Position stops mattering",
    ],
    answer: "Luck and variance affect outcomes in the short run",
  },
  {
    id: "buyin_heuristic",
    prompt: "Common cash-game bankroll advice often suggests having roughly:",
    options: [
      "Exactly one max buy-in, always",
      "Many max buy-ins (for example on the order of 20–40+ for NLHE) as a starting heuristic, depending on risk tolerance",
      "Zero buy-ins if you read charts",
      "Half a buy-in if you are good",
    ],
    answer:
      "Many max buy-ins (for example on the order of 20–40+ for NLHE) as a starting heuristic, depending on risk tolerance",
  },
  {
    id: "shot_vs_roll",
    prompt: "Taking a small “shot” at the next stake with part of your roll is different from:",
    options: [
      "Playing your entire bankroll at the higher stake as if it were your normal game",
      "Using a stop-loss",
      "Counting buy-ins",
      "Tracking wins and losses",
    ],
    answer:
      "Playing your entire bankroll at the higher stake as if it were your normal game",
  },
  {
    id: "moving_up",
    prompt: "While you are still learning, it is generally sensible to:",
    options: [
      "Play the highest stakes your ego allows",
      "Play stakes where mistakes are cheaper while you improve",
      "Avoid any bankroll rules",
      "Only play when on tilt",
    ],
    answer: "Play stakes where mistakes are cheaper while you improve",
  },
  {
    id: "stop_loss",
    prompt: "A session stop-loss (quitting after losing a set amount) is:",
    options: [
      "A personal discipline tool, not a guarantee of profit",
      "A rule that makes you immune to variance",
      "Illegal in home games",
      "The same as pot odds",
    ],
    answer: "A personal discipline tool, not a guarantee of profit",
  },
  {
    id: "tilt",
    prompt: "Continuing to play when severely tilted often:",
    options: [
      "Fixes results immediately",
      "Increases the chance of big mistakes; many players step away",
      "Is required by bankroll rules",
      "Only happens to beginners",
    ],
    answer:
      "Increases the chance of big mistakes; many players step away",
  },
  {
    id: "track_results",
    prompt: "Tracking sessions (wins, losses, stakes) helps because:",
    options: [
      "It removes all variance",
      "You see real trends over time instead of guessing from memory",
      "The casino requires it",
      "It replaces studying strategy",
    ],
    answer:
      "You see real trends over time instead of guessing from memory",
  },
];

function shuffleMcOptions(q: StaticMc, rng: () => number): StaticMc {
  const opts = [...q.options];
  shuffleInPlace(opts, rng);
  return { ...q, options: opts };
}

function buildBuyInQuestion(
  index: number,
  rng: () => number,
  usedKeys: Set<string>,
): BankrollManagementQuizQuestion {
  let roll = 2000;
  let buyIn = 100;
  let guard = 0;
  let settled = false;
  while (guard++ < 60 && !settled) {
    buyIn = 50 + Math.floor(rng() * 15) * 10;
    const minMult = 5;
    const maxMult = 35;
    const mult =
      minMult + Math.floor(rng() * (maxMult - minMult + 1));
    roll = buyIn * mult + Math.floor(rng() * buyIn);
    const key = `${roll}_${buyIn}`;
    if (!usedKeys.has(key) && fullBuyInsFromRoll(roll, buyIn) >= 2) {
      usedKeys.add(key);
      settled = true;
    }
  }
  if (!settled) {
    roll = 1000;
    buyIn = 100;
    const key = `${roll}_${buyIn}`;
    if (!usedKeys.has(key)) usedKeys.add(key);
  }
  const answer = fullBuyInsFromRoll(roll, buyIn);
  return {
    id: `buyins_${index}`,
    kind: "buyin_count",
    prompt: `Your poker bankroll is $${roll}. The table max buy-in is $${buyIn} (full 100bb stacks). How many full buy-ins does your roll cover? (Use whole buy-ins only; ignore cents.)`,
    roll,
    maxBuyIn: buyIn,
    options: pickIntOptions(answer, rng),
    answer,
  };
}

export type BankrollManagementQuizQuestion =
  | {
      id: string;
      kind: "buyin_count";
      prompt: string;
      roll: number;
      maxBuyIn: number;
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

export function buildBankrollManagementQuizQuestions(
  count: number = QUIZ_LEN,
  rng: () => number = Math.random,
): BankrollManagementQuizQuestion[] {
  const numericCount = Math.min(4, count);
  const staticCount = Math.max(0, count - numericCount);

  const staticIndices = STATIC_MC_POOL.map((_, i) => i);
  shuffleInPlace(staticIndices, rng);
  const chosenStatic = staticIndices
    .slice(0, Math.min(staticCount, STATIC_MC_POOL.length))
    .map((i) => STATIC_MC_POOL[i]!);

  const usedKeys = new Set<string>();
  const numeric: BankrollManagementQuizQuestion[] = [];
  for (let n = 0; n < numericCount; n++) {
    numeric.push(buildBuyInQuestion(n, rng, usedKeys));
  }

  const mcQs: BankrollManagementQuizQuestion[] = chosenStatic.map((s) => {
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

export { QUIZ_LEN as BANKROLL_MANAGEMENT_QUIZ_LEN };
