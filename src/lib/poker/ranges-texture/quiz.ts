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
    id: "def_range",
    prompt:
      "In poker, thinking in terms of a “range” means you assume your opponent:",
    options: [
      "Has exactly one specific hand you picked at random",
      "Could hold several different hands that fit their actions and position",
      "Always has the nuts or nothing",
      "Shares their cards with the table",
    ],
    answer:
      "Could hold several different hands that fit their actions and position",
  },
  {
    id: "narrow_wide",
    prompt:
      "Compared to early position, a player opening from the button typically has a range that is:",
    options: [
      "Much narrower (only premiums)",
      "Wider (more weak and speculative hands are plausible)",
      "Exactly the same every time",
      "Empty because the button never opens",
    ],
    answer: "Wider (more weak and speculative hands are plausible)",
  },
  {
    id: "dry_board",
    prompt: "A “dry” flop texture usually means:",
    options: [
      "Many straight and flush draws are already possible or likely",
      "Few coordinated cards—harder for random hands to smash the board",
      "The dealer added too much water to the deck",
      "Only pocket pairs can continue",
    ],
    answer:
      "Few coordinated cards—harder for random hands to smash the board",
  },
  {
    id: "wet_board",
    prompt: "A “wet” or coordinated board tends to:",
    options: [
      "Make strong made hands and draws more common",
      "Guarantee nobody has a pair",
      "End the hand immediately",
      "Remove flush possibilities",
    ],
    answer: "Make strong made hands and draws more common",
  },
  {
    id: "monotone",
    prompt: "A monotone flop is one where:",
    options: [
      "All three flop cards share the same suit",
      "No two cards share a suit",
      "The board is paired",
      "Only broadway cards appear",
    ],
    answer: "All three flop cards share the same suit",
  },
  {
    id: "paired_board",
    prompt: "On a paired board (e.g. 8-8-3), full houses and trips:",
    options: [
      "Become impossible",
      "Become more plausible than on three distinct ranks (same street)",
      "Only the small blind can make",
      "Are weaker than high card",
    ],
    answer:
      "Become more plausible than on three distinct ranks (same street)",
  },
  {
    id: "connected",
    prompt: "A highly connected flop (e.g. 9-T-J) usually:",
    options: [
      "Favors only underpairs with no draws",
      "Creates many straight possibilities and pressure spots",
      "Cannot produce a straight by the river",
      "Is always safe to bluff into with no equity",
    ],
    answer: "Creates many straight possibilities and pressure spots",
  },
  {
    id: "raiser_range",
    prompt:
      "At a fundamentals level, the preflop raiser’s range often connects with a high, unpaired flop (e.g. K-7-2 rainbow) more than a typical cold-caller’s range because:",
    options: [
      "Raisers never have kings",
      "Raisers include more strong kings and high cards that fit that texture",
      "Cold callers always have only low cards",
      "The flop only helps the big blind",
    ],
    answer:
      "Raisers include more strong kings and high cards that fit that texture",
  },
  {
    id: "caller_range",
    prompt:
      "A loose cold-caller’s range on the same K-7-2 rainbow flop might still have:",
    options: [
      "Only pocket aces",
      "Some medium pairs and suited connectors that mostly missed this texture",
      "No hands at all",
      "Only hands that beat a royal flush",
    ],
    answer:
      "Some medium pairs and suited connectors that mostly missed this texture",
  },
  {
    id: "combos_lite",
    prompt:
      "At an intuitive level (no exact counting), there are generally ______ ways to be dealt a specific offsuit hand like AKo than to be dealt a specific pocket pair like AA.",
    options: [
      "More",
      "Fewer",
      "Exactly zero",
      "The same number always",
    ],
    answer: "More",
  },
  {
    id: "bluff_story",
    prompt:
      "Your bluff is usually more credible when the runout:",
    options: [
      "Contradicts every strong hand you could represent",
      "Fits a coherent story with hands your line could hold",
      "Is random to you and you ignore texture",
      "Always makes the nuts for your opponent",
    ],
    answer: "Fits a coherent story with hands your line could hold",
  },
  {
    id: "pot_odds_link",
    prompt:
      "On wet boards, draws are common, so pot odds matter because:",
    options: [
      "There is never a price to call",
      "Villains may charge you more to chase; you compare price to your chance to improve or win",
      "Rake is always zero",
      "You cannot fold on any street",
    ],
    answer:
      "Villains may charge you more to chase; you compare price to your chance to improve or win",
  },
  {
    id: "wrong_line",
    prompt: "Which habit is least helpful when learning ranges?",
    options: [
      "Updating what hands make sense after each betting decision",
      "Putting the opponent on exactly one hand and never changing",
      "Asking what strong hands and what bluffs fit the line",
      "Considering position when estimating width of a range",
    ],
    answer: "Putting the opponent on exactly one hand and never changing",
  },
  {
    id: "high_low",
    prompt: "A “high” flop (e.g. K-Q-4) versus a “low” flop (e.g. 5-4-2) changes:",
    options: [
      "Nothing—texture is irrelevant",
      "Which high-card holdings and draws are plausible for each player’s range",
      "Only the suit of the deck",
      "Whether blinds are posted",
    ],
    answer:
      "Which high-card holdings and draws are plausible for each player’s range",
  },
];

export type RangesTextureQuizQuestion = {
  id: string;
  kind: "mc_text";
  prompt: string;
  options: string[];
  answer: string;
};

export function buildRangesTextureQuizQuestions(
  count: number = QUIZ_LEN,
  rng: () => number = Math.random,
): RangesTextureQuizQuestion[] {
  const indices = STATIC_MC_POOL.map((_, i) => i);
  shuffleInPlace(indices, rng);
  const n = Math.min(count, STATIC_MC_POOL.length);
  const chosen = indices.slice(0, n).map((i) => STATIC_MC_POOL[i]!);

  const out: RangesTextureQuizQuestion[] = chosen.map((s) => {
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

export { QUIZ_LEN as RANGES_TEXTURE_QUIZ_LEN };
