import {
  breakEvenFoldPctPureBluff,
  evCallChips,
  evPureBluffChips,
} from "./core";

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
    const delta = Math.floor(rng() * 41) - 20;
    const w = answer + delta;
    if (w !== answer) wrong.add(w);
  }
  while (wrong.size < 3) {
    const w = answer + Math.floor(rng() * 21) - 10;
    if (w !== answer) wrong.add(w);
  }
  const opts = [answer, ...Array.from(wrong)];
  shuffleInPlace(opts, rng);
  return opts;
}

function pickTextOptions(answer: string, wrongs: string[], rng: () => number): string[] {
  const pool = [answer, ...wrongs.filter((w) => w !== answer)].slice(0, 4);
  shuffleInPlace(pool, rng);
  return pool;
}

export type EvQuizQuestion =
  | {
      id: string;
      kind: "ev_call";
      prompt: string;
      potFacing: number;
      call: number;
      equityPct: number;
      options: number[];
      answer: number;
    }
  | {
      id: string;
      kind: "ev_call_sign";
      prompt: string;
      potFacing: number;
      call: number;
      equityPct: number;
      options: ("yes" | "no")[];
      answer: "yes" | "no";
    }
  | {
      id: string;
      kind: "bluff_ev";
      prompt: string;
      potBeforeBet: number;
      bet: number;
      foldFreqPct: number;
      options: number[];
      answer: number;
    }
  | {
      id: string;
      kind: "bluff_breakeven";
      prompt: string;
      potBeforeBet: number;
      bet: number;
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

export function buildEvQuizQuestions(
  count: number = QUIZ_LEN,
  rng: () => number = Math.random,
): EvQuizQuestion[] {
  const out: EvQuizQuestion[] = [];

  for (let i = 0; i < count; i++) {
    const mode = i % 5;
    if (mode === 0 || mode === 1) {
      const potFacing = 80 + Math.floor(rng() * 18) * 10;
      const call = 20 + Math.floor(rng() * 9) * 10;
      const equityPct = 15 + Math.floor(rng() * 71);
      const ev = evCallChips(equityPct, potFacing, call);
      if (mode === 0) {
        out.push({
          id: `ev_${i}`,
          kind: "ev_call",
          prompt: `Pot facing you is $${potFacing}. Calling costs $${call}. You estimate your equity at ${equityPct}% (for this decision). What is your EV of calling, in chips (rounded to the nearest whole chip)? Use: EV ≈ equity × pot facing − (1 − equity) × call.`,
          potFacing,
          call,
          equityPct,
          options: pickNumberOptions(ev, rng),
          answer: ev,
        });
      } else {
        const pos = ev > 0;
        const yn: ("yes" | "no")[] = ["yes", "no"];
        shuffleInPlace(yn, rng);
        out.push({
          id: `evsign_${i}`,
          kind: "ev_call_sign",
          prompt: `Pot facing you is $${potFacing}. Calling costs $${call}. Your equity is ${equityPct}%. Is calling +EV (positive expected value) on this call alone?`,
          potFacing,
          call,
          equityPct,
          options: yn,
          answer: pos ? "yes" : "no",
        });
      }
    } else if (mode === 2) {
      const potBefore = 100 + Math.floor(rng() * 15) * 10;
      const bet = 40 + Math.floor(rng() * 8) * 5;
      const foldFreq = 25 + Math.floor(rng() * 51);
      const ev = evPureBluffChips(foldFreq, potBefore, bet);
      out.push({
        id: `bluff_${i}`,
        kind: "bluff_ev",
        prompt: `You bluff $${bet} into a $${potBefore} pot (no more chips go in if villain continues). You never win when called. Villain folds ${foldFreq}% of the time. What is your EV of this bluff, in chips (rounded)?`,
        potBeforeBet: potBefore,
        bet,
        foldFreqPct: foldFreq,
        options: pickNumberOptions(ev, rng),
        answer: ev,
      });
    } else if (mode === 3) {
      const potBefore = 100 + Math.floor(rng() * 12) * 10;
      const bet = 50 + Math.floor(rng() * 7) * 10;
      const be = breakEvenFoldPctPureBluff(potBefore, bet);
      out.push({
        id: `be_${i}`,
        kind: "bluff_breakeven",
        prompt: `Pure bluff: you bet $${bet} into a $${potBefore} pot (you win the pot when villain folds; lose $${bet} when you are called). What minimum fold frequency (%) makes this bluff break even (EV ≈ 0)? Round to the nearest whole percent.`,
        potBeforeBet: potBefore,
        bet,
        options: pickNumberOptions(be, rng),
        answer: be,
      });
    } else {
      const concepts: EvQuizQuestion[] = [
        {
          id: `concept_${i}_a`,
          kind: "concept",
          prompt:
            "You repeat the same +EV decision many times. In the long run, your average result per trial should:",
          options: pickTextOptions(
            "Trend toward the EV (even if short-term results swing)",
            [
              "Always win every time",
              "Match your last session’s result",
              "Equal the biggest pot you won",
            ],
            rng,
          ),
          answer: "Trend toward the EV (even if short-term results swing)",
        },
        {
          id: `concept_${i}_b`,
          kind: "concept",
          prompt:
            "If a call is exactly 0 EV (break-even), then over a huge sample of identical spots:",
          options: pickTextOptions(
            "You neither gain nor lose on average",
            [
              "You always profit",
              "You should always fold",
              "EV is impossible at exactly zero",
            ],
            rng,
          ),
          answer: "You neither gain nor lose on average",
        },
        {
          id: `concept_${i}_c`,
          kind: "concept",
          prompt:
            "Comparing two mutually exclusive actions, you should usually prefer the one with:",
          options: pickTextOptions(
            "The higher EV (given your estimates)",
            [
              "The lower variance only",
              "The smaller bet size only",
              "The outcome of the last hand",
            ],
            rng,
          ),
          answer: "The higher EV (given your estimates)",
        },
      ];
      out.push(concepts[Math.floor(rng() * concepts.length)]!);
    }
  }

  shuffleInPlace(out, rng);
  return out.slice(0, count);
}
