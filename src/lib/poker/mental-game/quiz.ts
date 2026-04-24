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
    id: "def_tilt",
    prompt: "Tilt in poker is best described as:",
    options: [
      "Playing your A-game after a good night’s sleep",
      "Emotional decision-making that distorts your usual standards (e.g. chasing, spewing, revenge)",
      "Always folding preflop",
      "Using a HUD correctly",
    ],
    answer:
      "Emotional decision-making that distorts your usual standards (e.g. chasing, spewing, revenge)",
  },
  {
    id: "tilt_recover",
    prompt: "A practical first step when you notice you are tilting:",
    options: [
      "Play more tables to win it back faster",
      "Take a break or end the session before damage compounds",
      "Raise every hand until luck turns",
      "Blame the dealer",
    ],
    answer: "Take a break or end the session before damage compounds",
  },
  {
    id: "chasing_losses",
    prompt: "Chasing losses (playing bigger or looser to “get even”) usually:",
    options: [
      "Is a disciplined bankroll strategy",
      "Increases the chance of bigger mistakes and larger losses",
      "Guarantees breakeven by the end of the night",
      "Only happens in tournaments",
    ],
    answer:
      "Increases the chance of bigger mistakes and larger losses",
  },
  {
    id: "focus_one_hand",
    prompt: "For focus at the table, a simple teaching habit is:",
    options: [
      "Ignore the action until it is your turn every time",
      "One hand at a time — notice the pot, positions, and relevant details before you act",
      "Always play as many tables as possible",
      "Never take notes",
    ],
    answer:
      "One hand at a time — notice the pot, positions, and relevant details before you act",
  },
  {
    id: "distractions",
    prompt: "Heavy distractions (phone alerts, TV, split attention) tend to:",
    options: [
      "Improve your win rate automatically",
      "Make it easier to miss information and autopilot bad decisions",
      "Only matter in live poker",
      "Force better focus by magic",
    ],
    answer:
      "Make it easier to miss information and autopilot bad decisions",
  },
  {
    id: "session_before",
    prompt: "A useful pre-session routine can include:",
    options: [
      "No plan — always sit randomly",
      "Rough intent (why you are playing), environment check, and how long or when you will stop if things go badly",
      "Only playing when angry",
      "Skipping sleep to grind longer",
    ],
    answer:
      "Rough intent (why you are playing), environment check, and how long or when you will stop if things go badly",
  },
  {
    id: "session_after",
    prompt: "A light post-session habit that helps long-term growth:",
    options: [
      "Never think about poker again",
      "A short note on one takeaway or leak to review later, then mentally detach",
      "Replay every bad beat for hours",
      "Move up stakes immediately after a loss",
    ],
    answer:
      "A short note on one takeaway or leak to review later, then mentally detach",
  },
  {
    id: "tired_play",
    prompt: "Playing seriously when exhausted often:",
    options: [
      "Improves reads because you are relaxed",
      "Raises error rate — many players quit or shorten sessions when focus drops",
      "Has no effect on decisions",
      "Only matters for cash games under $1/$2",
    ],
    answer:
      "Raises error rate — many players quit or shorten sessions when focus drops",
  },
  {
    id: "stop_loss_lite",
    prompt: "A session stop rule (time or loss limit) is mainly meant to:",
    options: [
      "Guarantee you never lose",
      "Cap damage on bad days and reduce tilt-driven spirals",
      "Replace all study",
      "Force you to play every day",
    ],
    answer: "Cap damage on bad days and reduce tilt-driven spirals",
  },
  {
    id: "bankroll_vs_mental",
    prompt: "Bankroll management (buy-ins, variance) and mental game (tilt, focus) are:",
    options: [
      "The same topic with different names",
      "Related but different — bankroll is money structure; mental game is mindset and habits at the table",
      "Only relevant for professionals",
      "Unrelated to poker results",
    ],
    answer:
      "Related but different — bankroll is money structure; mental game is mindset and habits at the table",
  },
  {
    id: "revenge_hand",
    prompt: "Opening wider because a specific opponent “deserves” your action is usually:",
    options: [
      "A sign of rational range construction",
      "A tilt warning — decisions should follow strategy, not payback stories",
      "Required by the rules",
      "Always correct in the small blind",
    ],
    answer:
      "A tilt warning — decisions should follow strategy, not payback stories",
  },
  {
    id: "volume_vs_quality",
    prompt: "For many learners, grinding very long sessions without breaks tends to:",
    options: [
      "Always increase hourly because of volume",
      "Trade away edge when fatigue causes missed spots and sloppy calls",
      "Eliminate variance",
      "Remove the need for sleep",
    ],
    answer:
      "Trade away edge when fatigue causes missed spots and sloppy calls",
  },
  {
    id: "not_therapy",
    prompt: "This app’s mental game material is meant as:",
    options: [
      "Licensed therapy replacing professional care",
      "General educational habits — not medical or personalized mental-health advice",
      "A diagnosis tool",
      "Legal advice about gambling law in every country",
    ],
    answer:
      "General educational habits — not medical or personalized mental-health advice",
  },
  {
    id: "bad_beat_response",
    prompt: "After a bad beat, a disciplined default is often to:",
    options: [
      "Immediately double your bet size",
      "Reset to your normal process for the next hand instead of punishing the deck or opponents",
      "Always go all-in next hand",
      "Quit poker forever",
    ],
    answer:
      "Reset to your normal process for the next hand instead of punishing the deck or opponents",
  },
];

function shuffleMcOptions(q: StaticMc, rng: () => number): StaticMc {
  const opts = [...q.options];
  shuffleInPlace(opts, rng);
  return { ...q, options: opts };
}

export type MentalGameQuizQuestion = {
  id: string;
  kind: "mc_text";
  prompt: string;
  options: string[];
  answer: string;
};

export function buildMentalGameQuestions(
  count: number = QUIZ_LEN,
  rng: () => number = Math.random,
): MentalGameQuizQuestion[] {
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

export { QUIZ_LEN as MENTAL_GAME_QUIZ_LEN };
