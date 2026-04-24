import {
  breakEvenEquityPercent,
  formatRatio,
  potOddsRatio,
} from "@/lib/poker/pot-odds/core";

export const BETTING_BASICS_QUIZ_LEN = 15;

export type BettingBasicsQuestion =
  | {
      id: string;
      kind: "action" | "street";
      prompt: string;
      options: string[];
      answer: string;
      explain: string;
    }
  | {
      id: string;
      kind: "break_even_pct";
      prompt: string;
      options: number[];
      answer: number;
      explain: string;
    }
  | {
      id: string;
      kind: "ratio";
      prompt: string;
      options: string[];
      answer: string;
      explain: string;
    };

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleInPlace<T>(arr: T[], rng: () => number) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const t = arr[i];
    arr[i] = arr[j]!;
    arr[j] = t!;
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

function pickActionOptions(answer: string, rng: () => number): string[] {
  const all = ["Check", "Call", "Fold", "Raise"];
  const wrong = all.filter((a) => a !== answer);
  shuffleInPlace(wrong, rng);
  const opts = [answer, ...wrong.slice(0, 3)];
  shuffleInPlace(opts, rng);
  return opts;
}

function pickStreetOptions(answer: string, rng: () => number): string[] {
  const all = ["Flop", "Turn", "River"];
  const wrong = all.filter((a) => a !== answer);
  shuffleInPlace(wrong, rng);
  const opts = [answer, ...wrong.slice(0, 2)];
  shuffleInPlace(opts, rng);
  return opts;
}

type Template =
  | {
      id: string;
      kind: "action";
      prompt: string;
      answer: string;
      explain: string;
    }
  | {
      id: string;
      kind: "street";
      prompt: string;
      answer: string;
      explain: string;
    }
  | {
      id: string;
      kind: "break_even_pct";
      prompt: string;
      answer: number;
      explain: string;
    }
  | {
      id: string;
      kind: "ratio";
      prompt: string;
      answer: string;
      explain: string;
    };

function materialize(t: Template, rng: () => number): BettingBasicsQuestion {
  if (t.kind === "action") {
    return {
      id: t.id,
      kind: "action",
      prompt: t.prompt,
      answer: t.answer,
      explain: t.explain,
      options: pickActionOptions(t.answer, rng),
    };
  }
  if (t.kind === "street") {
    return {
      id: t.id,
      kind: "street",
      prompt: t.prompt,
      answer: t.answer,
      explain: t.explain,
      options: pickStreetOptions(t.answer, rng),
    };
  }
  if (t.kind === "break_even_pct") {
    return {
      id: t.id,
      kind: "break_even_pct",
      prompt: t.prompt,
      answer: t.answer,
      explain: t.explain,
      options: pickNumberOptions(t.answer, rng),
    };
  }
  return {
    id: t.id,
    kind: "ratio",
    prompt: t.prompt,
    answer: t.answer,
    explain: t.explain,
    options: pickRatioOptions(t.answer, rng),
  };
}

function buildTemplates(): Template[] {
  const pot100Bet50 = breakEvenEquityPercent(150, 50);
  const pot80Bet40 = breakEvenEquityPercent(120, 40);
  const r15050 = formatRatio(potOddsRatio(150, 50));
  const r12040 = formatRatio(potOddsRatio(120, 40));

  const items: Template[] = [
    {
      id: "act_check_ip",
      kind: "action",
      prompt:
        "NLHE. You are on the button. Preflop action is done. The flop is dealt and your opponent checks to you. No bet is facing you. What action passes the turn without putting chips in?",
      answer: "Check",
      explain:
        "With no bet to call, you may check or bet. Checking keeps the pot the same. Position: acting last lets you control the pot.",
    },
    {
      id: "act_fold_face",
      kind: "action",
      prompt:
        "You hold 9♠ 8♦ on a board of A♥ K♣ Q♠. Villain bets full pot. You have no draw and no pair. Default best action?",
      answer: "Fold",
      explain:
        "Almost no equity versus strong holdings. Hand rankings: you need a made hand or real draws to continue without a read.",
    },
    {
      id: "act_call_odds",
      kind: "action",
      prompt:
        "Flop: flush draw (9 outs). Pot was 80, villain bets 20. Pot facing you is 100, call 20. Roughly ~36% with rule of 4; break-even about 17%. Default?",
      answer: "Call",
      explain:
        "Estimated equity beats break-even on this snapshot. Pot odds module: compare equity to call / (pot facing + call).",
    },
    {
      id: "act_raise_value",
      kind: "action",
      prompt:
        "River. Board 2♠ 7♥ J♦ T♣ 3♠. You have A♠ A♥ (best hand). Villain bets half pot. You want maximum chips in the middle. Best action?",
      answer: "Raise",
      explain:
        "Facing a bet, raising builds the pot with the nuts. Hand rankings: charge worse hands and protect against draws that already missed.",
    },
    {
      id: "act_ip_weak",
      kind: "action",
      prompt:
        "Heads-up, you are in position. Dry flop K♦ 7♠ 2♣. You have 6♥ 5♥ with no pair, no draw. Villain checks. Default?",
      answer: "Check",
      explain:
        "Weak equity; checking back realizes equity cheaply. Position: IP you can check behind to see another card.",
    },
    {
      id: "street_flop",
      kind: "street",
      prompt:
        "Three community cards are on the board; the next card has not been dealt yet. Which street is this?",
      answer: "Flop",
      explain: "Flop = first three board cards, then turn, then river.",
    },
    {
      id: "street_turn",
      kind: "street",
      prompt:
        "Four community cards are visible. One more card will come. Which street is this?",
      answer: "Turn",
      explain: "The fourth board card is the turn.",
    },
    {
      id: "street_river",
      kind: "street",
      prompt:
        "All five community cards are out; no more cards will come. Which street is this?",
      answer: "River",
      explain: "River is the last street — then showdown or fold.",
    },
    {
      id: "street_three_cards",
      kind: "street",
      prompt: "Exactly three board cards are showing. Which street is this?",
      answer: "Flop",
      explain: "Three-card board is always the flop (in standard NLHE).",
    },
    {
      id: "be_100_50",
      kind: "break_even_pct",
      prompt:
        "Pot was 100, villain bets 50. Pot facing your call is 150, call is 50. Break-even equity to call (rounded %)?",
      answer: pot100Bet50,
      explain:
        "call / (pot facing + call) = 50/200 = 25%. See Pot odds module.",
    },
    {
      id: "be_80_40",
      kind: "break_even_pct",
      prompt:
        "Pot facing you is 120 (includes villain’s 40 bet). Your call is 40. Rounded break-even equity %?",
      answer: pot80Bet40,
      explain: "40 / (120 + 40) = 25%.",
    },
    {
      id: "ratio_150_50",
      kind: "ratio",
      prompt:
        "Pot facing your call is 150, your call is 50. Simplified pot odds ratio (pot : call)?",
      answer: r15050,
      explain: "150:50 simplifies to 3:1.",
    },
    {
      id: "ratio_120_40",
      kind: "ratio",
      prompt:
        "Pot facing you is 120, call is 40. Simplified ratio pot : call?",
      answer: r12040,
      explain: "120:40 → 3:1 after dividing by GCD.",
    },
    {
      id: "act_turn_fold",
      kind: "action",
      prompt:
        "You called flop with a gutshot only. Turn completes obvious flush draws and villain fires large. You still have only the gutshot. Default?",
      answer: "Fold",
      explain:
        "One card left — rule of 2. Big pressure without equity improvement → fold often.",
    },
    {
      id: "act_river_bluffcatch",
      kind: "action",
      prompt:
        "River: top pair with a weak kicker on a scary board. Villain triple-barreled. Pot offers 3:1 but you only beat bluffs. Tight default with no reads?",
      answer: "Fold",
      explain:
        "Pot odds help, but bluff-catching needs enough bluffs in range; versus strong lines, folding is standard.",
    },
    {
      id: "act_oop_check",
      kind: "action",
      prompt:
        "Out of position with medium pair on a wet board. First to act on the turn, no bet yet. Common pot-control default?",
      answer: "Check",
      explain:
        "OOP, checking controls pot size with medium strength. Position module: OOP lines are trickier.",
    },
    {
      id: "act_raise_draw",
      kind: "action",
      prompt:
        "Combo draw (many outs) in position on the flop. Villain bets. Which action adds fold equity and still has strong equity when called?",
      answer: "Raise",
      explain:
        "Semi-bluff raise: fold equity + equity when called. Simplified teaching — sizing varies in real play.",
    },
    {
      id: "act_cbet_ip",
      kind: "action",
      prompt:
        "You opened preflop; heads-up flop 9♠ 4♥ 2♣. You have A♦ J♦, no pair. Villain checks to you in position. A line that keeps the pot small and sees the turn cheaply:",
      answer: "Check",
      explain:
        "Checking back is a standard IP option with weak high card. C-betting is also common; this highlights check as a valid choice.",
    },
  ];
  return items;
}

/**
 * Seeded shuffle of question order (deterministic for tests / repeat runs).
 */
export function buildBettingBasicsQuizQuestions(
  count: number = BETTING_BASICS_QUIZ_LEN,
  rng: () => number = mulberry32(0xbeedbabe),
): BettingBasicsQuestion[] {
  const templates = buildTemplates();
  shuffleInPlace(templates, rng);
  const pick = templates.slice(0, Math.min(count, templates.length));
  const optRng = mulberry32(0xdecafbad);
  return pick.map((t) => materialize(t, optRng));
}
