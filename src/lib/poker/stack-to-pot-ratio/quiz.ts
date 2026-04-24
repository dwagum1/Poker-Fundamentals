import {
  sprOneDecimal,
  sprAfterHeroCallsBet,
} from "./core";

const QUIZ_LEN = 10;

function shuffleInPlace<T>(arr: T[], rng: () => number) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
}

/** Distinct wrong options in tenths (e.g. 32 = 3.2). */
function pickTenthOptions(answerTenths: number, rng: () => number): number[] {
  const wrong = new Set<number>();
  let guard = 0;
  while (wrong.size < 3 && guard++ < 100) {
    const delta = Math.floor(rng() * 41) - 20;
    const w = Math.max(1, Math.min(200, answerTenths + delta));
    if (w !== answerTenths) wrong.add(w);
  }
  while (wrong.size < 3) {
    const w = (Math.floor(rng() * 199) + 1) as number;
    if (w !== answerTenths) wrong.add(w);
  }
  const opts = [answerTenths, ...Array.from(wrong)];
  shuffleInPlace(opts, rng);
  return opts;
}

function tenthsToLabel(t: number): number {
  return Math.round(t) / 10;
}

export type SprQuizQuestion =
  | {
      id: string;
      kind: "spr_basic";
      prompt: string;
      effectiveStack: number;
      pot: number;
      options: number[];
      answer: number;
    }
  | {
      id: string;
      kind: "spr_after_call";
      prompt: string;
      potBeforeBet: number;
      bet: number;
      heroStack: number;
      villainStack: number;
      options: number[];
      answer: number;
    }
  | {
      id: string;
      kind: "concept";
      prompt: string;
      options: string[];
      answer: string;
    };

const CONCEPT_BANK: { prompt: string; answer: string; wrong: string[] }[] = [
  {
    prompt:
      "As SPR falls across streets (same hand, more chips in the middle), you are generally…",
    answer: "Closer to committing the effective stack with your strong hands",
    wrong: [
      "Less committed; one pair becomes easier to fold every time",
      "Forced to bluff more because the pot stays small",
      "Playing as if stacks were irrelevant to pot odds",
    ],
  },
  {
    prompt:
      "Very deep SPR on the flop (effective stack is many times the pot) usually means…",
    answer:
      "More play left across multiple streets; lines like pot control matter more",
    wrong: [
      "You should ignore implied odds and treat it like an all-in",
      "Top pair is always a stack-off on the flop",
      "SPR stops changing after the flop",
    ],
  },
  {
    prompt:
      "Compared with a low-SPR spot, a high-SPR spot tends to mean…",
    answer:
      "Strong-but-not-nut hands face more difficult later-street decisions",
    wrong: [
      "You should always get all-in on the flop with any pair",
      "Fold equity stops mattering entirely",
      "The pot odds module no longer applies",
    ],
  },
  {
    prompt:
      "SPR is defined as…",
    answer: "Effective stack ÷ current pot",
    wrong: [
      "Current pot ÷ effective stack",
      "Your stack only ÷ the bet you are facing",
      "Pot ÷ (stack + pot)",
    ],
  },
];

function randomBasicScenario(rng: () => number): {
  effectiveStack: number;
  pot: number;
  answer: number;
} {
  const pot = 40 + Math.floor(rng() * 16) * 10;
  const rawSpr = 1.2 + rng() * 11;
  let effectiveStack = Math.round((pot * rawSpr) / 5) * 5;
  if (effectiveStack <= pot) {
    effectiveStack = pot + 20 + Math.floor(rng() * 8) * 10;
  }
  const answer = sprOneDecimal(effectiveStack, pot);
  return { effectiveStack, pot, answer };
}

function randomAfterCallScenario(rng: () => number): {
  potBeforeBet: number;
  bet: number;
  heroStack: number;
  villainStack: number;
  answer: number;
} {
  const potBeforeBet = 40 + Math.floor(rng() * 12) * 10;
  const bet = 10 + Math.floor(rng() * 8) * 10;
  const shorter = 200 + Math.floor(rng() * 25) * 10;
  const longer = shorter + 100 + Math.floor(rng() * 20) * 10;
  const heroIsShorter = rng() < 0.5;
  const heroStack = heroIsShorter ? shorter : longer;
  const villainStack = heroIsShorter ? longer : shorter;
  const { sprAfterOneDecimal } = sprAfterHeroCallsBet({
    potBeforeBet,
    bet,
    heroStack,
    villainStack,
  });
  return {
    potBeforeBet,
    bet,
    heroStack,
    villainStack,
    answer: sprAfterOneDecimal,
  };
}

export function buildSprQuizQuestions(
  count: number = QUIZ_LEN,
  rng: () => number = Math.random,
): SprQuizQuestion[] {
  const out: SprQuizQuestion[] = [];
  const conceptIdx = Math.floor(rng() * CONCEPT_BANK.length);
  let conceptUsed = 0;

  for (let i = 0; i < count; i++) {
    const mode = i % 5;
    if (mode === 4 && conceptUsed < 2) {
      const c = CONCEPT_BANK[(conceptIdx + conceptUsed) % CONCEPT_BANK.length]!;
      conceptUsed += 1;
      const opts = [c.answer, ...c.wrong];
      shuffleInPlace(opts, rng);
      out.push({
        id: `concept_${i}_${conceptUsed}`,
        kind: "concept",
        prompt: c.prompt,
        options: opts,
        answer: c.answer,
      });
      continue;
    }

    if (mode === 0 || mode === 2) {
      const { effectiveStack, pot, answer } = randomBasicScenario(rng);
      const tenths = Math.round(answer * 10);
      const optTenths = pickTenthOptions(tenths, rng);
      out.push({
        id: `spr_${i}`,
        kind: "spr_basic",
        prompt: `Effective stack is $${effectiveStack} and the current pot is $${pot}. What is SPR (stack ÷ pot), rounded to one decimal?`,
        effectiveStack,
        pot,
        options: optTenths.map(tenthsToLabel),
        answer,
      });
    } else {
      const s = randomAfterCallScenario(rng);
      const tenths = Math.round(s.answer * 10);
      const optTenths = pickTenthOptions(tenths, rng);
      out.push({
        id: `sprcall_${i}`,
        kind: "spr_after_call",
        prompt: `Heads-up NLHE. Pot before villain’s bet: $${s.potBeforeBet}. Villain bets $${s.bet} and you call. Your stack before the call: $${s.heroStack}; villain’s: $${s.villainStack}. What is SPR after your call (effective remaining stack ÷ new pot), rounded to one decimal?`,
        potBeforeBet: s.potBeforeBet,
        bet: s.bet,
        heroStack: s.heroStack,
        villainStack: s.villainStack,
        options: optTenths.map(tenthsToLabel),
        answer: s.answer,
      });
    }
  }

  shuffleInPlace(out, rng);
  return out.slice(0, count);
}
