import { EQUITY_FACTS, type EquityFact } from "./equity-facts";
import { ORDER_169, strongerOf } from "./order-169";
import { teachingTier, tierLabel } from "./tiers-basics";

export const STARTING_HANDS_QUIZ_LEN = 15;

const NOTATION_POOL: { prompt: string; options: string[]; answer: string }[] =
  [
    {
      prompt: "In standard notation, what does “AKs” mean?",
      options: [
        "Ace–king offsuit",
        "Ace–king suited",
        "Ace–ace pair",
        "King–king pair",
      ],
      answer: "Ace–king suited",
    },
    {
      prompt: "What does “TT” mean?",
      options: [
        "Ten–jack suited",
        "Pocket tens (a pair)",
        "Ten high two offsuit cards",
        "Ten–nine suited",
      ],
      answer: "Pocket tens (a pair)",
    },
    {
      prompt: "What does “72o” mean?",
      options: [
        "Seven–deuce suited",
        "Seven–deuce offsuit",
        "Pocket sevens",
        "Seven–king offsuit",
      ],
      answer: "Seven–deuce offsuit",
    },
  ];

const SCENARIO_POOL: { prompt: string; options: string[]; answer: string }[] =
  [
    {
      prompt:
        "In a full-ring game, which statement is a reasonable default (before reads)?",
      options: [
        "Play the same range from every seat",
        "Open tighter from early position, wider from late position",
        "Only play pairs from any position",
        "Always limp with suited connectors",
      ],
      answer: "Open tighter from early position, wider from late position",
    },
    {
      prompt:
        "Why are suited connectors (e.g. 87s) sometimes playable in position?",
      options: [
        "They always beat aces",
        "They can flop strong draws and play well when you act last",
        "They block all flushes",
        "They are always better than AK",
      ],
      answer:
        "They can flop strong draws and play well when you act last",
    },
  ];

/** Head-to-head / “who’s ahead” teaching questions (approximate or order-based). */
const MATCHUP_POOL: { prompt: string; options: string[]; answer: string }[] =
  [
    {
      prompt:
        "All-in preflop (approximate), which matchup is usually the most one-sided for the favorite?",
      options: ["AA vs KK", "88 vs 87s", "AK vs AQ", "KQ vs QJ"],
      answer: "AA vs KK",
    },
    {
      prompt:
        "In this app’s preflop equity order (vs random), which hand ranks higher?",
      options: ["QQ", "JJ", "They tie", "Depends only on suits"],
      answer: "QQ",
    },
    {
      prompt:
        "Roughly, preflop all-in, 77 versus 22 — the higher pair is usually:",
      options: ["About 80/20", "About 50/50", "About 65/35 to the lower pair", "A chop"],
      answer: "About 80/20",
    },
    {
      prompt:
        "In this app’s equity order, which ranks higher: AKs or AQo?",
      options: ["AKs", "AQo", "They tie", "AQo unless suited"],
      answer: "AKs",
    },
  ];

function shuffleInPlace<T>(arr: T[], rng: () => number) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
}

function pickOptions(answer: string, pool: string[], rng: () => number): string[] {
  const wrong = pool.filter((s) => s !== answer);
  shuffleInPlace(wrong, rng);
  const opts = [answer, ...wrong.slice(0, 3)];
  shuffleInPlace(opts, rng);
  return opts;
}

function pickTierOptions(answer: string, rng: () => number): string[] {
  const labels = [1, 2, 3, 4].map((t) => tierLabel(t));
  const wrong = labels.filter((l) => l !== answer);
  shuffleInPlace(wrong, rng);
  const opts = [answer, ...wrong.slice(0, 3)];
  shuffleInPlace(opts, rng);
  return opts;
}

export type StartingHandsQuestionKind =
  | "notation"
  | "scenario"
  | "equity_fact"
  | "pairwise"
  | "tier"
  | "matchup";

export type StartingHandsQuestion = {
  id: string;
  kind: StartingHandsQuestionKind;
  prompt: string;
  options: string[];
  answer: string;
};

function buildPairwise(rng: () => number): StartingHandsQuestion {
  const i = Math.floor(rng() * 80);
  const j = i + 15 + Math.floor(rng() * 70);
  const ii = Math.min(i, ORDER_169.length - 1);
  const jj = Math.min(j, ORDER_169.length - 1);
  const a = ORDER_169[ii]!;
  const b = ORDER_169[jj]!;
  const win = strongerOf(a, b);
  const set = new Set<string>([win, a, b]);
  let guard = 0;
  while (set.size < 4 && guard++ < 40) {
    set.add(ORDER_169[Math.floor(rng() * ORDER_169.length)]!);
  }
  const options = [...set];
  shuffleInPlace(options, rng);
  return {
    id: `pw_${a}_${b}`,
    kind: "pairwise",
    prompt: `Which hand ranks higher in this app’s equity order? ${a} vs ${b}`,
    options: options.slice(0, 4),
    answer: win,
  };
}

function buildTier(rng: () => number): StartingHandsQuestion {
  const code =
    ORDER_169[Math.floor(rng() * ORDER_169.length)] ?? ORDER_169[0]!;
  const t = teachingTier(code);
  const ans = tierLabel(t);
  return {
    id: `tier_${code}`,
    kind: "tier",
    prompt: `In this app’s four categories (by preflop equity vs random), which category is ${code}?`,
    options: pickTierOptions(ans, rng),
    answer: ans,
  };
}

function fromEquityFact(f: EquityFact, idx: number): StartingHandsQuestion {
  return {
    id: `eq_${f.id}_${idx}`,
    kind: "equity_fact",
    prompt: f.prompt,
    options: [...f.options],
    answer: f.answer,
  };
}

/** 15 slots: notation×3, scenario×2, equity×3, pairwise×4, tier×2, matchup×1 */
const SLOT_KINDS: StartingHandsQuestionKind[] = [
  "notation",
  "scenario",
  "equity_fact",
  "pairwise",
  "tier",
  "notation",
  "equity_fact",
  "pairwise",
  "matchup",
  "scenario",
  "notation",
  "equity_fact",
  "pairwise",
  "tier",
  "pairwise",
];

export function buildStartingHandsQuestions(
  count: number = STARTING_HANDS_QUIZ_LEN,
  rng: () => number = Math.random,
): StartingHandsQuestion[] {
  const kinds = SLOT_KINDS.slice(0, count);
  const out: StartingHandsQuestion[] = [];
  const usedEq = new Set<string>();

  for (let i = 0; i < kinds.length; i++) {
    const kind = kinds[i]!;
    if (kind === "notation") {
      const n = NOTATION_POOL[Math.floor(rng() * NOTATION_POOL.length)]!;
      out.push({
        id: `not_${i}`,
        kind: "notation",
        prompt: n.prompt,
        options: pickOptions(n.answer, n.options, rng),
        answer: n.answer,
      });
    } else if (kind === "scenario") {
      const s = SCENARIO_POOL[Math.floor(rng() * SCENARIO_POOL.length)]!;
      out.push({
        id: `sc_${i}`,
        kind: "scenario",
        prompt: s.prompt,
        options: pickOptions(s.answer, s.options, rng),
        answer: s.answer,
      });
    } else if (kind === "equity_fact") {
      let f: EquityFact | undefined;
      let g = 0;
      while (g++ < 40) {
        f = EQUITY_FACTS[Math.floor(rng() * EQUITY_FACTS.length)];
        if (f && !usedEq.has(f.id)) {
          usedEq.add(f.id);
          break;
        }
      }
      if (!f) f = EQUITY_FACTS[0]!;
      const q = fromEquityFact(f, i);
      shuffleInPlace(q.options, rng);
      out.push(q);
    } else if (kind === "pairwise") {
      out.push(buildPairwise(rng));
    } else if (kind === "tier") {
      out.push(buildTier(rng));
    } else {
      const m = MATCHUP_POOL[Math.floor(rng() * MATCHUP_POOL.length)]!;
      out.push({
        id: `mu_${i}`,
        kind: "matchup",
        prompt: m.prompt,
        options: pickOptions(m.answer, m.options, rng),
        answer: m.answer,
      });
    }
  }

  shuffleInPlace(out, rng);
  return out.slice(0, count);
}
