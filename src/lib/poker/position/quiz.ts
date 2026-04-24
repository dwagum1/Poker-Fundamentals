import {
  type SeatId,
  SEAT_IDS,
  postflopActionOrder,
  preflopActionOrder,
  seatLabel,
  whoHasPositionHu,
} from "./nine-max";

export type PositionQuizQuestion = {
  id: string;
  prompt: string;
  options: SeatId[];
  answer: SeatId;
};

function shuffleInPlace<T>(arr: T[], rng: () => number) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
}

function pickOptions(answer: SeatId, rng: () => number): SeatId[] {
  const wrong = SEAT_IDS.filter((s) => s !== answer);
  shuffleInPlace(wrong, rng);
  const opts = [answer, ...wrong.slice(0, 3)];
  shuffleInPlace(opts, rng);
  return opts;
}

function distinctPair(rng: () => number): [SeatId, SeatId] {
  const a = SEAT_IDS[Math.floor(rng() * SEAT_IDS.length)]!;
  let b = SEAT_IDS[Math.floor(rng() * SEAT_IDS.length)]!;
  let guard = 0;
  while (b === a && guard++ < 30) {
    b = SEAT_IDS[Math.floor(rng() * SEAT_IDS.length)]!;
  }
  if (b === a) {
    const ai = SEAT_IDS.indexOf(a);
    b = SEAT_IDS[(ai + 1) % SEAT_IDS.length]!;
  }
  return [a, b];
}

function factualPool(): { prompt: string; answer: SeatId }[] {
  const pf = preflopActionOrder();
  const po = postflopActionOrder();
  return [
    {
      prompt:
        "Nine-handed, everyone dealt in. Who acts first preflop (before the flop)?",
      answer: pf[0]!,
    },
    {
      prompt:
        "Nine-handed, everyone dealt in. Who acts last preflop (final action before the flop is dealt)?",
      answer: pf[8]!,
    },
    {
      prompt:
        "Nine-handed, everyone dealt in. Who is second to act preflop?",
      answer: pf[1]!,
    },
    {
      prompt:
        "Nine-handed, everyone sees the flop. Who acts first on the flop?",
      answer: po[0]!,
    },
    {
      prompt:
        "Nine-handed, everyone sees the flop. Who acts last on the flop (has position on that street)?",
      answer: po[8]!,
    },
    {
      prompt:
        "Nine-handed, everyone sees the flop. Who acts second on the flop?",
      answer: po[1]!,
    },
  ];
}

/**
 * Builds `count` questions: mix of factual order questions and heads-up IP spots.
 */
export function buildPositionQuizQuestions(
  count: number,
  rng: () => number = Math.random,
): PositionQuizQuestion[] {
  const factual = factualPool();
  shuffleInPlace(factual, rng);
  const factualTake = Math.min(4, factual.length);

  const out: PositionQuizQuestion[] = [];
  const usedHu = new Set<string>();

  for (let i = 0; i < factualTake && out.length < count; i++) {
    const f = factual[i]!;
    out.push({
      id: `fact_${i}_${f.answer}`,
      prompt: f.prompt,
      options: pickOptions(f.answer, rng),
      answer: f.answer,
    });
  }

  let hi = 0;
  while (out.length < count && hi++ < count * 20) {
    const [s1, s2] = distinctPair(rng);
    const key = [s1, s2].sort().join("|");
    if (usedHu.has(key)) continue;
    usedHu.add(key);
    const answer = whoHasPositionHu(s1, s2);
    out.push({
      id: `hu_${out.length}_${s1}_${s2}`,
      prompt: `Heads-up on the flop: Hero is ${seatLabel(s1)}, Villain is ${seatLabel(s2)}. Who has position (acts last on each postflop street)?`,
      options: pickOptions(answer, rng),
      answer,
    });
  }

  while (out.length < count) {
    const [s1, s2] = distinctPair(rng);
    const answer = whoHasPositionHu(s1, s2);
    out.push({
      id: `hu_fill_${out.length}_${s1}_${s2}`,
      prompt: `Heads-up on the flop: Hero is ${seatLabel(s1)}, Villain is ${seatLabel(s2)}. Who has position (acts last on each postflop street)?`,
      options: pickOptions(answer, rng),
      answer,
    });
  }

  shuffleInPlace(out, rng);
  return out.slice(0, count);
}

export { seatLabel };
