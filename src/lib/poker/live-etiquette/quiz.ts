const QUIZ_LEN = 10;

function shuffleInPlace<T>(arr: T[], rng: () => number) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const t = arr[i];
    arr[i] = arr[j]!;
    arr[j] = t!;
  }
}

type StaticMc = {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
};

const STATIC_MC_POOL: StaticMc[] = [
  {
    id: "one_card_live",
    prompt:
      "During a live hand, intentionally flashing one hole card to a neighbor is generally:",
    options: [
      "Encouraged — it speeds up reads",
      "Poor etiquette and can influence action; keep cards protected until showdown rules apply",
      "Required if you have a pair",
      "Only a problem in tournaments",
    ],
    answer:
      "Poor etiquette and can influence action; keep cards protected until showdown rules apply",
  },
  {
    id: "protect_hand",
    prompt: "A simple habit that protects your live hole cards is:",
    options: [
      "Hold them high off the felt where everyone can see",
      "Keep them on the table with a chip on top (if the room allows) and do not lift them out of view",
      "Slide them under your stack",
      "Show one card whenever you are unsure",
    ],
    answer:
      "Keep them on the table with a chip on top (if the room allows) and do not lift them out of view",
  },
  {
    id: "accidental_expose",
    prompt: "If your hole cards accidentally flash during the hand, the usual expectation is:",
    options: [
      "You automatically lose the pot",
      "Call the floor if needed; house rules decide whether the hand continues or is ruled dead",
      "Everyone must fold",
      "You must go all-in",
    ],
    answer:
      "Call the floor if needed; house rules decide whether the hand continues or is ruled dead",
  },
  {
    id: "action_in_turn",
    prompt: "Acting when it is not your turn (out of turn) is problematic because:",
    options: [
      "It gives information that can change decisions for players still to act",
      "It is always ignored with no consequence",
      "It only matters on the river",
      "Dealers encourage it to speed play",
    ],
    answer:
      "It gives information that can change decisions for players still to act",
  },
  {
    id: "oot_check_facing_bet",
    prompt:
      "You face a bet and you tap the felt for “check” before realizing there is a bet. A teaching default is:",
    options: [
      "Your check always stands — you never pay",
      "Pay attention before acting; many rooms treat a mistaken check as binding or involve the floor",
      "You may raise after checking",
      "The bet is automatically canceled",
    ],
    answer:
      "Pay attention before acting; many rooms treat a mistaken check as binding or involve the floor",
  },
  {
    id: "verbal_binding",
    prompt: "A clear verbal declaration of your action in turn (e.g. “call,” “raise to 40”):",
    options: [
      "Can be binding even before you move chips — follow the house’s verbal-action rules",
      "Never counts until chips cross the line",
      "Only counts if whispered",
      "Is ignored in cash games",
    ],
    answer:
      "Can be binding even before you move chips — follow the house’s verbal-action rules",
  },
  {
    id: "string_bet_def",
    prompt: "A “string bet” in live poker usually means:",
    options: [
      "Betting with string instead of chips",
      "Putting chips into the pot in multiple motions (or call-then-raise theatrics) without a clear total raise declared first",
      "Announcing your bet in a foreign language",
      "Checking three streets in a row",
    ],
    answer:
      "Putting chips into the pot in multiple motions (or call-then-raise theatrics) without a clear total raise declared first",
  },
  {
    id: "one_motion",
    prompt: "To avoid a string-raise dispute, a common live habit is:",
    options: [
      "Slide chips in several small trips without speaking",
      "Announce the total raise clearly, or move all chips forward in one motion (per house rules)",
      "Always splash the pot",
      "Place chips behind the line then add more later without saying anything",
    ],
    answer:
      "Announce the total raise clearly, or move all chips forward in one motion (per house rules)",
  },
  {
    id: "splash_pot",
    prompt: "Splashing the pot (tossing chips into a messy pile in the middle) is discouraged because:",
    options: [
      "It makes the amount unclear and slows the game while the dealer sorts it",
      "It increases your fold equity",
      "It is required for straddles",
      "Dealers prefer it for speed",
    ],
    answer:
      "It makes the amount unclear and slows the game while the dealer sorts it",
  },
  {
    id: "rabbit_hunt",
    prompt: "Asking to see unused board cards after a hand ends (“rabbit hunting”) is:",
    options: [
      "Always mandatory",
      "Often frowned on — it can slow the game and tilt players; many rooms disallow it",
      "Only allowed for the winner",
      "The same as running it twice",
    ],
    answer:
      "Often frowned on — it can slow the game and tilt players; many rooms disallow it",
  },
  {
    id: "muck_winner",
    prompt: "Mucking at showdown when you believe you have won but the dealer has not awarded the pot:",
    options: [
      "Is safe — folded cards always win",
      "Risks losing the pot; protect your cards until the dealer pushes you the chips",
      "Is required",
      "Forces a chop",
    ],
    answer:
      "Risks losing the pot; protect your cards until the dealer pushes you the chips",
  },
  {
    id: "talk_live_hand",
    prompt: "Discussing the live hand in a way that could influence play (in multi-way pots especially) is:",
    options: [
      "Good table talk — say whatever helps your friend",
      "Often against rules or etiquette — keep table talk neutral and let players decide in turn",
      "Only banned online",
      "Encouraged in every casino",
    ],
    answer:
      "Often against rules or etiquette — keep table talk neutral and let players decide in turn",
  },
  {
    id: "fold_show",
    prompt: "Deliberately showing your cards to someone after folding, to affect later streets, is:",
    options: [
      "Standard strategy",
      "Unfair to players still in the hand — avoid it; follow house rules on exposed cards",
      "Required if you had aces",
      "Only rude in home games",
    ],
    answer:
      "Unfair to players still in the hand — avoid it; follow house rules on exposed cards",
  },
  {
    id: "forward_motion",
    prompt: "Reaching toward your chips in a way that looks like a bet, then pulling back, can:",
    options: [
      "Never be interpreted as action",
      "Create a string-bet or forward-motion dispute — be deliberate and clear",
      "Only happen preflop",
      "Automatically count as an all-in",
    ],
    answer:
      "Create a string-bet or forward-motion dispute — be deliberate and clear",
  },
  {
    id: "phone_at_table",
    prompt: "Using a phone in the hand at many live rooms:",
    options: [
      "Is always allowed during big decisions",
      "May be banned or restricted — it slows play and raises integrity concerns",
      "Doubles the pot",
      "Is required for HUDs",
    ],
    answer:
      "May be banned or restricted — it slows play and raises integrity concerns",
  },
  {
    id: "line_rule_lite",
    prompt: "About betting lines and chip placement on the felt:",
    options: [
      "Every room uses identical lines — there is one global rule",
      "Rules differ by venue; when unsure, ask the dealer before your first bet in that room",
      "Chips behind the line never count",
      "Verbal bets never count",
    ],
    answer:
      "Rules differ by venue; when unsure, ask the dealer before your first bet in that room",
  },
  {
    id: "pay_attention",
    prompt: "A basic courtesy that keeps live games moving is:",
    options: [
      "Act only when nudged every time",
      "Know when the action is on you and act promptly in turn",
      "Always tank three minutes preflop",
      "Hide your cards until the river",
    ],
    answer: "Know when the action is on you and act promptly in turn",
  },
  {
    id: "floor_final",
    prompt: "When etiquette and rules collide:",
    options: [
      "The loudest player decides",
      "The floor (supervisor) applies that room’s house rules",
      "Online chat votes",
      "The button always wins disputes",
    ],
    answer: "The floor (supervisor) applies that room’s house rules",
  },
];

function shuffleMcOptions(q: StaticMc, rng: () => number): StaticMc {
  const opts = [...q.options];
  shuffleInPlace(opts, rng);
  return { ...q, options: opts };
}

export type LiveEtiquetteQuizQuestion = {
  id: string;
  kind: "mc_text";
  prompt: string;
  options: string[];
  answer: string;
};

export function buildLiveEtiquetteQuestions(
  count: number = QUIZ_LEN,
  rng: () => number = Math.random,
): LiveEtiquetteQuizQuestion[] {
  const indices = STATIC_MC_POOL.map((_, i) => i);
  shuffleInPlace(indices, rng);
  const take = Math.min(count, STATIC_MC_POOL.length);
  const chosen = indices.slice(0, take).map((i) => STATIC_MC_POOL[i]!);

  return chosen.map((s) => {
    const shuffled = shuffleMcOptions(s, rng);
    return {
      id: shuffled.id,
      kind: "mc_text" as const,
      prompt: shuffled.prompt,
      options: shuffled.options,
      answer: shuffled.answer,
    };
  });
}

export { QUIZ_LEN as LIVE_ETIQUETTE_QUIZ_LEN };
