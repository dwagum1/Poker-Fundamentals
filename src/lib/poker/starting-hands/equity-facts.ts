/** Illustrative preflop facts for MCQ (approximate, teaching only). */

export type EquityFact = {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
};

export const EQUITY_FACTS: readonly EquityFact[] = [
  {
    id: "aa_vs_kk",
    prompt:
      "All-in preflop, roughly what equity does AA have against KK (ignoring ties split)?",
    options: ["About 50%", "About 65%", "About 81%", "About 92%"],
    answer: "About 81%",
  },
  {
    id: "coinflip",
    prompt:
      "Classic “coin flip” preflop: a pair vs two overcards (e.g. 55 vs AK) is roughly:",
    options: ["50/50", "60/40 to the pair", "70/30 to AK", "80/20 to the pair"],
    answer: "50/50",
  },
  {
    id: "domination",
    prompt:
      "All-in preflop (approximate), AK offsuit versus AQ offsuit — equity for AK is roughly:",
    options: ["About 50%", "About 60%", "About 72%", "About 90%"],
    answer: "About 72%",
  },
  {
    id: "domination_aj_at",
    prompt:
      "All-in preflop (approximate), AJ offsuit versus AT offsuit — equity for AJ (the dominating hand) is roughly:",
    options: ["About 50%", "About 62%", "About 74%", "About 88%"],
    answer: "About 74%",
  },
  {
    id: "suited_bonus",
    prompt:
      "Comparing AKs to AKo (same ranks), suited is typically:",
    options: ["Much weaker", "Slightly weaker", "Slightly stronger", "Identical"],
    answer: "Slightly stronger",
  },
  {
    id: "qq_vs_ak",
    prompt:
      "All-in preflop (approximate), QQ versus AK offsuit is usually:",
    options: [
      "Roughly a coin flip",
      "A small favorite to QQ",
      "A big favorite to AK",
      "A chop",
    ],
    answer: "A small favorite to QQ",
  },
  {
    id: "pair_vs_lower_pair",
    prompt:
      "All-in preflop (approximate), TT versus 99 is usually:",
    options: [
      "About 80/20 to the higher pair",
      "About 50/50",
      "About 65/35 to the lower pair",
      "Always a chop",
    ],
    answer: "About 80/20 to the higher pair",
  },
];
