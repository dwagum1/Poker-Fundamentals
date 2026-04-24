export type HandRankingId =
  | "royal_flush"
  | "straight_flush"
  | "four_of_a_kind"
  | "full_house"
  | "flush"
  | "straight"
  | "three_of_a_kind"
  | "two_pair"
  | "one_pair"
  | "high_card";

export type HandRankingDef = {
  id: HandRankingId;
  name: string;
  shortDescription: string;
  example: string;
  tip?: string;
};

/** Strongest first (index 0 = best). */
export const HAND_RANKINGS_ORDERED: readonly HandRankingDef[] = [
  {
    id: "royal_flush",
    name: "Royal flush",
    shortDescription: "A–K–Q–J–10, all the same suit.",
    example: "A♠ K♠ Q♠ J♠ 10♠",
    tip: "The rarest made hand in the chart.",
  },
  {
    id: "straight_flush",
    name: "Straight flush",
    shortDescription: "Five consecutive cards, same suit.",
    example: "9♥ 8♥ 7♥ 6♥ 5♥",
  },
  {
    id: "four_of_a_kind",
    name: "Four of a kind",
    shortDescription: "Four cards of the same rank.",
    example: "8♠ 8♥ 8♦ 8♣ K♠",
    tip: "Often called “quads.”",
  },
  {
    id: "full_house",
    name: "Full house",
    shortDescription: "Three of a kind plus a pair.",
    example: "J♣ J♦ J♥ 4♠ 4♥",
  },
  {
    id: "flush",
    name: "Flush",
    shortDescription: "Five cards same suit, not in sequence.",
    example: "A♦ J♦ 9♦ 6♦ 2♦",
  },
  {
    id: "straight",
    name: "Straight",
    shortDescription: "Five consecutive ranks, mixed suits.",
    example: "10♣ 9♦ 8♥ 7♠ 6♣",
    tip: "Ace can be high (A–K–Q–J–10) or low (5–4–3–2–A).",
  },
  {
    id: "three_of_a_kind",
    name: "Three of a kind",
    shortDescription: "Three cards of the same rank.",
    example: "7♠ 7♥ 7♦ Q♣ 2♥",
    tip: "Often called a “set” or “trips” depending how it was made.",
  },
  {
    id: "two_pair",
    name: "Two pair",
    shortDescription: "Two different pairs.",
    example: "A♣ A♦ 9♠ 9♥ K♣",
  },
  {
    id: "one_pair",
    name: "One pair",
    shortDescription: "Two cards of the same rank.",
    example: "K♠ K♥ 10♣ 7♦ 3♠",
  },
  {
    id: "high_card",
    name: "High card",
    shortDescription: "No pair or better; best card plays.",
    example: "A♠ J♦ 9♣ 6♥ 3♠",
  },
] as const;

export function strengthIndex(id: HandRankingId): number {
  const i = HAND_RANKINGS_ORDERED.findIndex((h) => h.id === id);
  return i === -1 ? HAND_RANKINGS_ORDERED.length : i;
}

/** Lower index = stronger hand. Returns which side wins, or tie. */
export function compareHandTypes(
  a: HandRankingId,
  b: HandRankingId,
): "a" | "b" | "tie" {
  const ia = strengthIndex(a);
  const ib = strengthIndex(b);
  if (ia < ib) return "a";
  if (ia > ib) return "b";
  return "tie";
}

export type QuizQuestion = {
  id: string;
  left: HandRankingDef;
  right: HandRankingDef;
  /** Which side holds the stronger hand type. */
  correct: "left" | "right";
};

function pickDistinctPair(
  rng: () => number,
): [HandRankingDef, HandRankingDef] {
  const n = HAND_RANKINGS_ORDERED.length;
  const i = Math.floor(rng() * n);
  let j = Math.floor(rng() * n);
  let guard = 0;
  while (i === j && guard++ < 50) {
    j = Math.floor(rng() * n);
  }
  if (i === j) {
    j = (i + 1) % n;
  }
  const a = HAND_RANKINGS_ORDERED[i]!;
  const b = HAND_RANKINGS_ORDERED[j]!;
  return strengthIndex(a.id) < strengthIndex(b.id) ? [a, b] : [b, a];
}

/** `rng` should return [0,1). */
export function buildQuizQuestions(
  count: number,
  rng: () => number = Math.random,
): QuizQuestion[] {
  const out: QuizQuestion[] = [];
  const used = new Set<string>();
  let safety = 0;
  while (out.length < count && safety++ < count * 20) {
    const [stronger, weaker] = pickDistinctPair(rng);
    const swapSides = rng() < 0.5;
    const left = swapSides ? weaker : stronger;
    const right = swapSides ? stronger : weaker;
    const key = `${left.id}|${right.id}`;
    if (used.has(key)) continue;
    used.add(key);
    const correct: "left" | "right" =
      strengthIndex(left.id) < strengthIndex(right.id) ? "left" : "right";
    out.push({
      id: `q_${out.length}_${left.id}_${right.id}`,
      left,
      right,
      correct,
    });
  }
  return out;
}
