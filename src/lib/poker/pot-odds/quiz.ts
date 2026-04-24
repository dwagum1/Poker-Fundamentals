import {
  breakEvenEquityPercent,
  formatRatio,
  potOddsRatio,
} from "./core";
import { equityFromOuts, type RuleStreet } from "./rule-of-two-four";

const QUIZ_LEN = 10;
const GAP = 5;

const STREETS: RuleStreet[] = ["flop_one_card", "flop_two_cards", "turn"];

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

function pickRatioOptions(answer: string, rng: () => number): string[] {
  const wrong = new Set<string>();
  const parts = answer.split(":");
  const num = Number(parts[0]);
  const den = Number(parts[1]);
  const candidates = [
    `${num + 1}:${den}`,
    `${Math.max(1, num - 1)}:${den}`,
    `${num}:${den + 1}`,
    `${num}:${Math.max(1, den - 1)}`,
    `${num * 2}:${den * 2}`,
  ];
  for (const s of candidates) {
    if (s !== answer) wrong.add(s);
    if (wrong.size >= 3) break;
  }
  let g = 0;
  while (wrong.size < 3 && g++ < 40) {
    const a = Math.floor(rng() * 7) + 2;
    const b = Math.floor(rng() * 5) + 1;
    const s = `${a}:${b}`;
    if (s !== answer) wrong.add(s);
  }
  const wArr = Array.from(wrong)
    .filter((s) => s !== answer)
    .slice(0, 3);
  const opts = [answer, ...wArr];
  shuffleInPlace(opts, rng);
  return opts;
}

function streetLabel(s: RuleStreet): string {
  if (s === "flop_one_card") return "next card only (rule of 2)";
  if (s === "flop_two_cards") return "two cards to come (rule of 4)";
  return "next card (rule of 2)";
}

function randomScenario(rng: () => number): {
  potBefore: number;
  bet: number;
  potFacingCall: number;
  call: number;
} {
  const potBefore = 40 + Math.floor(rng() * 17) * 10;
  const bet = 20 + Math.floor(rng() * 17) * 5;
  return {
    potBefore,
    bet,
    potFacingCall: potBefore + bet,
    call: bet,
  };
}

function makeDecisionScenario(rng: () => number): {
  potFacingCall: number;
  call: number;
  outs: number;
  street: RuleStreet;
  answer: "call" | "fold";
} | null {
  for (let t = 0; t < 50; t++) {
    const { potFacingCall, call } = randomScenario(rng);
    const need = breakEvenEquityPercent(potFacingCall, call);
    for (let outs = 4; outs <= 12; outs++) {
      for (const street of STREETS) {
        const est = equityFromOuts(outs, street);
        if (est >= need + GAP) {
          return { potFacingCall, call, outs, street, answer: "call" };
        }
        if (need >= est + GAP) {
          return { potFacingCall, call, outs, street, answer: "fold" };
        }
      }
    }
  }
  return {
    potFacingCall: 300,
    call: 50,
    outs: 12,
    street: "flop_two_cards",
    answer: "call",
  };
}

/**
 * Discriminated union. MCQ v1; `answerKey` reserved for future numeric input grading.
 */
export type PotOddsQuizQuestion =
  | {
      id: string;
      kind: "ratio";
      prompt: string;
      potFacingCall: number;
      call: number;
      options: string[];
      answer: string;
      answerKey?: { potFacingCall: number; call: number };
    }
  | {
      id: string;
      kind: "break_even_pct";
      prompt: string;
      potFacingCall: number;
      call: number;
      options: number[];
      answer: number;
      answerKey?: { potFacingCall: number; call: number };
    }
  | {
      id: string;
      kind: "rule24";
      prompt: string;
      outs: number;
      street: RuleStreet;
      options: number[];
      answer: number;
      answerKey?: { outs: number; street: RuleStreet };
    }
  | {
      id: string;
      kind: "decision";
      prompt: string;
      potFacingCall: number;
      call: number;
      estimatedEquity: number;
      breakEven: number;
      options: ("call" | "fold")[];
      answer: "call" | "fold";
    };

export function buildPotOddsQuizQuestions(
  count: number = QUIZ_LEN,
  rng: () => number = Math.random,
): PotOddsQuizQuestion[] {
  const out: PotOddsQuizQuestion[] = [];
  const usedRatio = new Set<string>();

  for (let i = 0; i < count; i++) {
    const mode = i % 4;
    if (mode === 0) {
      let potFacingCall = 150;
      let call = 50;
      let guard = 0;
      while (guard++ < 40) {
        const s = randomScenario(rng);
        potFacingCall = s.potFacingCall;
        call = s.call;
        const key = `${potFacingCall}_${call}`;
        if (!usedRatio.has(key)) {
          usedRatio.add(key);
          break;
        }
      }
      const ratio = formatRatio(potOddsRatio(potFacingCall, call));
      const potBefore = potFacingCall - call;
      out.push({
        id: `ratio_${i}`,
        kind: "ratio",
        prompt: `The pot was $${potBefore} before the bet. Villain bets $${call}. The pot facing you is $${potFacingCall}, and it costs $${call} to call. What pot odds are you getting (simplified ratio, pot facing you : your call)?`,
        potFacingCall,
        call,
        options: pickRatioOptions(ratio, rng),
        answer: ratio,
        answerKey: { potFacingCall, call },
      });
    } else if (mode === 1) {
      const { potFacingCall, call } = randomScenario(rng);
      const pct = breakEvenEquityPercent(potFacingCall, call);
      out.push({
        id: `be_${i}`,
        kind: "break_even_pct",
        prompt: `Pot facing you is $${potFacingCall}. It costs $${call} to call. What minimum equity (%) do you need to break even on the call? Round to the nearest whole percent.`,
        potFacingCall,
        call,
        options: pickNumberOptions(pct, rng),
        answer: pct,
        answerKey: { potFacingCall, call },
      });
    } else if (mode === 2) {
      const outs = 4 + Math.floor(rng() * 9);
      const street = STREETS[Math.floor(rng() * STREETS.length)]!;
      const ans = equityFromOuts(outs, street);
      out.push({
        id: `r24_${i}_${outs}`,
        kind: "rule24",
        prompt: `You have a draw with ${outs} outs. Street: ${streetLabel(street)}. Rough equity (nearest whole %)?`,
        outs,
        street,
        options: pickNumberOptions(ans, rng),
        answer: ans,
        answerKey: { outs, street },
      });
    } else {
      const d = makeDecisionScenario(rng)!;
      const est = equityFromOuts(d.outs, d.street);
      const need = breakEvenEquityPercent(d.potFacingCall, d.call);
      const estLine =
        d.street === "flop_two_cards"
          ? `${d.outs} outs × 4 ≈ ${est}%`
          : `${d.outs} outs × 2 ≈ ${est}%`;
      out.push({
        id: `dec_${i}`,
        kind: "decision",
        prompt: `Pot facing you is $${d.potFacingCall}, call is $${d.call}. Your draw: about ${est}% (${estLine}). You need about ${need}% equity to break even. Call or fold?`,
        potFacingCall: d.potFacingCall,
        call: d.call,
        estimatedEquity: est,
        breakEven: need,
        options: ["call", "fold"],
        answer: d.answer,
      });
    }
  }

  shuffleInPlace(out, rng);
  return out.slice(0, count);
}
