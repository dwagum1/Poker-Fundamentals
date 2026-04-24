const QUIZ_LEN = 10;

function shuffleInPlace<T>(arr: T[], rng: () => number) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
}

type StaticMc = {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
};

function shuffleMcOptions(q: StaticMc, rng: () => number): StaticMc {
  const opts = [...q.options];
  shuffleInPlace(opts, rng);
  return { ...q, options: opts };
}

const STATIC_MC_POOL: StaticMc[] = [
  {
    id: "open_def",
    prompt:
      "An “open raise” (open) preflop is best described as:",
    options: [
      "The first voluntary raise after players have only called or folded (no raise yet)",
      "A raise only when you are in the big blind",
      "Calling the big blind to see a flop",
      "A re-raise after someone else already raised",
    ],
    answer:
      "The first voluntary raise after players have only called or folded (no raise yet)",
  },
  {
    id: "open_position",
    prompt:
      "At a beginner level, a sound open-raising range from early position (e.g. UTG) is usually ______ than from the button.",
    options: [
      "Tighter (fewer hands)",
      "Wider (more hands)",
      "Exactly the same width",
      "Empty—you cannot open from early position",
    ],
    answer: "Tighter (fewer hands)",
  },
  {
    id: "iso_def",
    prompt:
      "An “isolation” (iso) raise typically means:",
    options: [
      "You raise after one or more limpers, often aiming to play heads-up with the initiative",
      "You fold every hand preflop",
      "You only min-raise from the small blind",
      "You call the big blind with any two cards",
    ],
    answer:
      "You raise after one or more limpers, often aiming to play heads-up with the initiative",
  },
  {
    id: "iso_position",
    prompt:
      "Isolation raises are generally easier to justify from ______ because fewer players act behind you.",
    options: [
      "Late position (e.g. cutoff or button)",
      "Under the gun only",
      "The small blind when everyone folded to you",
      "Any seat—the same from every chair",
    ],
    answer: "Late position (e.g. cutoff or button)",
  },
  {
    id: "threebet_def",
    prompt:
      "A “3-bet” preflop is:",
    options: [
      "The second raise: a re-raise facing exactly one prior raise",
      "The first raise into an unopened pot",
      "Calling twice before the flop",
      "Checking from the big blind",
    ],
    answer: "The second raise: a re-raise facing exactly one prior raise",
  },
  {
    id: "threebet_range",
    prompt:
      "For beginners, a typical 3-betting range mixes strong value hands with:",
    options: [
      "Some lighter hands for balance or as bluffs/semi-bluffs, depending on positions and reads",
      "Only 7-2 offsuit",
      "No hands—3-bets are illegal",
      "Only hands weaker than any open",
    ],
    answer:
      "Some lighter hands for balance or as bluffs/semi-bluffs, depending on positions and reads",
  },
  {
    id: "threebet_continue",
    prompt:
      "Facing a 3-bet, the player who opened usually continues (calls or 4-bets) with:",
    options: [
      "Only a slice of the hands they would have opened with—the weakest opens typically fold",
      "Exactly 100% of their open range every time",
      "No hands; opens always fold to a 3-bet",
      "Only hands worse than any 3-bettor",
    ],
    answer:
      "Only a slice of the hands they would have opened with—the weakest opens typically fold",
  },
  {
    id: "fourbet_def",
    prompt:
      "A “4-bet” preflop is:",
    options: [
      "The third raise: a re-raise facing a 3-bet",
      "The first raise of the hand",
      "Calling the 3-bet only",
      "The same as a squeeze play",
    ],
    answer: "The third raise: a re-raise facing a 3-bet",
  },
  {
    id: "fourbet_beginner",
    prompt:
      "At a beginner framing, most 4-bet ranges are weighted toward:",
    options: [
      "Very strong hands, with occasional bluff 4-bets as an advanced idea",
      "Only suited connectors below 5",
      "Random hands with no regard for strength",
      "Hands that cannot beat high card",
    ],
    answer:
      "Very strong hands, with occasional bluff 4-bets as an advanced idea",
  },
  {
    id: "ladder_order",
    prompt:
      "Put the preflop aggression ladder in order from first to third raise:",
    options: [
      "Open → 3-bet → 4-bet",
      "4-bet → open → 3-bet",
      "3-bet → open → limp",
      "Iso → check → fold",
    ],
    answer: "Open → 3-bet → 4-bet",
  },
  {
    id: "iso_vs_open",
    prompt:
      "Compared to an open into an unraised pot, an isolation raise usually happens when:",
    options: [
      "Someone has already limped (called the big blind) before you",
      "Everyone folded to you in the big blind",
      "You are all-in blind",
      "There was already a raise and a call",
    ],
    answer: "Someone has already limped (called the big blind) before you",
  },
  {
    id: "range_narrow",
    prompt:
      "Each time a player responds with another aggressive raise preflop (e.g. from open to 3-bet), plausible continuing ranges generally:",
    options: [
      "Get narrower unless stacks or extreme tendencies say otherwise",
      "Always become every hand in the deck",
      "Never change",
      "Widen to only weak pairs",
    ],
    answer:
      "Get narrower unless stacks or extreme tendencies say otherwise",
  },
  {
    id: "position_late_open",
    prompt:
      "The button can often open a ______ range than UTG because fewer opponents act behind.",
    options: [
      "Wider",
      "Tighter",
      "Nonexistent",
      "Identical fixed",
    ],
    answer: "Wider",
  },
  {
    id: "initiative",
    prompt:
      "The last preflop aggressor (e.g. the 3-bettor who gets called) usually:",
    options: [
      "Has the betting initiative going to the flop",
      "Must check every street",
      "Shows their cards first",
      "Skips the flop entirely",
    ],
    answer: "Has the betting initiative going to the flop",
  },
];

export type PreflopAggressionQuizQuestion = {
  id: string;
  kind: "mc_text";
  prompt: string;
  options: string[];
  answer: string;
};

export function buildPreflopAggressionQuizQuestions(
  count: number = QUIZ_LEN,
  rng: () => number = Math.random,
): PreflopAggressionQuizQuestion[] {
  const indices = STATIC_MC_POOL.map((_, i) => i);
  shuffleInPlace(indices, rng);
  const n = Math.min(count, STATIC_MC_POOL.length);
  const chosen = indices.slice(0, n).map((i) => STATIC_MC_POOL[i]!);

  const out: PreflopAggressionQuizQuestion[] = chosen.map((s) => {
    const shuffled = shuffleMcOptions(s, rng);
    return {
      id: shuffled.id,
      kind: "mc_text" as const,
      prompt: shuffled.prompt,
      options: shuffled.options,
      answer: shuffled.answer,
    };
  });
  shuffleInPlace(out, rng);
  return out.slice(0, count);
}

export { QUIZ_LEN as PREFLOP_AGGRESSION_QUIZ_LEN };
