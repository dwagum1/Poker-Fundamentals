import { breakEvenEquityWithImpliedSnapshot } from "./core";

export const IMPLIED_ODDS_QUIZ_LEN = 10;

/** Plan wording alias */
export const IMPLICIT_ODDS_QUIZ_LEN = IMPLIED_ODDS_QUIZ_LEN;

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

function randomScenario(rng: () => number): {
  potFacingCall: number;
  call: number;
} {
  const potBefore = 40 + Math.floor(rng() * 17) * 10;
  const bet = 20 + Math.floor(rng() * 17) * 5;
  return {
    potFacingCall: potBefore + bet,
    call: bet,
  };
}

type StaticMc = {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
};

const STATIC_MC_POOL: StaticMc[] = [
  {
    id: "def_implied",
    prompt:
      "Implied odds mainly refer to accounting for:",
    options: [
      "Only the chips already in the pot before you act",
      "Extra money you might win on later streets when you hit, beyond what is in the pot right now",
      "The big blind size divided by your stack",
      "How many decks the room uses",
    ],
    answer:
      "Extra money you might win on later streets when you hit, beyond what is in the pot right now",
  },
  {
    id: "vs_immediate",
    prompt:
      "Compared with immediate pot odds from the current pot and call size, implied odds usually:",
    options: [
      "Make a draw call need more equity to be reasonable",
      "Can make a draw call need less equity, if you expect to win more when you hit",
      "Remove the need to think about stack sizes",
      "Only apply preflop",
    ],
    answer:
      "Can make a draw call need less equity, if you expect to win more when you hit",
  },
  {
    id: "when_matters",
    prompt:
      "Implied odds tend to matter more when:",
    options: [
      "Villain is already all-in for a tiny amount and no more betting is possible",
      "There is meaningful stack behind and you can win more when your draw completes",
      "You are drawing dead",
      "The pot is always split",
    ],
    answer:
      "There is meaningful stack behind and you can win more when your draw completes",
  },
  {
    id: "position_io",
    prompt:
      "Position often helps implied odds because:",
    options: [
      "You automatically win every showdown from the button",
      "Seeing later streets cheaply or controlling the pot size can help you realize value when you hit",
      "Implied odds do not exist in position",
      "The pot is capped on the flop",
    ],
    answer:
      "Seeing later streets cheaply or controlling the pot size can help you realize value when you hit",
  },
  {
    id: "multiway_dilute",
    prompt:
      "In multiway pots, implied odds are often worse than heads-up because:",
    options: [
      "The pot is always smaller multiway",
      "Your clean outs can be fewer and it is harder to get stacked when you hit",
      "You always have infinite implied odds multiway",
      "Position does not exist multiway",
    ],
    answer:
      "Your clean outs can be fewer and it is harder to get stacked when you hit",
  },
  {
    id: "overestimate",
    prompt:
      "A common mistake with implied odds is:",
    options: [
      "Assuming you will always get paid the maximum when you hit, even when the runout or villain’s range makes that unlikely",
      "Ignoring the pot size entirely",
      "Calling only with the nuts",
      "Never semi-bluffing",
    ],
    answer:
      "Assuming you will always get paid the maximum when you hit, even when the runout or villain’s range makes that unlikely",
  },
  {
    id: "reverse_implied",
    prompt:
      "Reverse implied odds roughly means:",
    options: [
      "You will always stack villain when you hit middle pair",
      "Sometimes when you improve, you still lose a big pot or face bad runouts—so the call is less attractive than raw pot odds suggest",
      "You should always raise the river for value",
      "Pot odds and equity are unrelated",
    ],
    answer:
      "Sometimes when you improve, you still lose a big pot or face bad runouts—so the call is less attractive than raw pot odds suggest",
  },
  {
    id: "nut_draw",
    prompt:
      "All else equal, which draw usually leans on implied odds more credibly?",
    options: [
      "A weak draw that makes the second nuts when it hits",
      "A draw to the nuts (or near-nuts) when stacks are deep",
      "Any gutshot with no overcards",
      "A hand that cannot improve",
    ],
    answer:
      "A draw to the nuts (or near-nuts) when stacks are deep",
  },
  {
    id: "which_call_io",
    prompt:
      "Which call is more likely to lean on implied odds (same immediate pot odds)?",
    options: [
      "A naked gutshot with no backup equity and villain never pays off",
      "A strong combo draw deep-stacked against an opponent who can stack off with strong hands",
      "Calling any bet with 0% equity",
      "Folding every draw",
    ],
    answer:
      "A strong combo draw deep-stacked against an opponent who can stack off with strong hands",
  },
];

function shuffleMcOptions(q: StaticMc, rng: () => number): StaticMc {
  const opts = [...q.options];
  shuffleInPlace(opts, rng);
  return { ...q, options: opts };
}

function buildNumericQuestion(
  index: number,
  rng: () => number,
  usedKeys: Set<string>,
): ImpliedOddsQuizQuestion {
  let potFacingCall = 150;
  let call = 50;
  let impliedExtra = 80;
  let guard = 0;
  while (guard++ < 60) {
    const s = randomScenario(rng);
    potFacingCall = s.potFacingCall;
    call = s.call;
    impliedExtra = 20 + Math.floor(rng() * 14) * 10;
    const key = `${potFacingCall}_${call}_${impliedExtra}`;
    if (!usedKeys.has(key)) {
      usedKeys.add(key);
      break;
    }
  }
  const answer = breakEvenEquityWithImpliedSnapshot(
    potFacingCall,
    call,
    impliedExtra,
  );
  return {
    id: `be_impl_${index}`,
    kind: "break_even_pct_implied",
    prompt: `Pot facing you is $${potFacingCall}. It costs $${call} to call. In a simplified one-shot model, if you win this hand you expect to win an additional $${impliedExtra} beyond the current pot (after your call). What minimum equity (%) do you need to break even? Round to the nearest whole percent.`,
    potFacingCall,
    call,
    impliedExtraWhenWin: impliedExtra,
    options: pickNumberOptions(answer, rng),
    answer,
    answerKey: { potFacingCall, call, impliedExtraWhenWin: impliedExtra },
  };
}

export type ImpliedOddsQuizQuestion =
  | {
      id: string;
      kind: "break_even_pct_implied";
      prompt: string;
      potFacingCall: number;
      call: number;
      impliedExtraWhenWin: number;
      options: number[];
      answer: number;
      answerKey?: {
        potFacingCall: number;
        call: number;
        impliedExtraWhenWin: number;
      };
    }
  | {
      id: string;
      kind: "mc_text";
      prompt: string;
      options: string[];
      answer: string;
    };

export function buildImpliedOddsQuizQuestions(
  count: number = IMPLIED_ODDS_QUIZ_LEN,
  rng: () => number = Math.random,
): ImpliedOddsQuizQuestion[] {
  const numericCount = Math.min(4, Math.max(0, count));
  const staticCount = Math.max(0, count - numericCount);

  const staticIndices = STATIC_MC_POOL.map((_, i) => i);
  shuffleInPlace(staticIndices, rng);
  const chosenStatic = staticIndices
    .slice(0, Math.min(staticCount, STATIC_MC_POOL.length))
    .map((i) => STATIC_MC_POOL[i]!);

  const usedKeys = new Set<string>();
  const numeric: ImpliedOddsQuizQuestion[] = [];
  for (let n = 0; n < numericCount; n++) {
    numeric.push(buildNumericQuestion(n, rng, usedKeys));
  }

  const mcQs: ImpliedOddsQuizQuestion[] = chosenStatic.map((s) => {
    const shuffled = shuffleMcOptions(s, rng);
    return {
      id: shuffled.id,
      kind: "mc_text" as const,
      prompt: shuffled.prompt,
      options: shuffled.options,
      answer: shuffled.answer,
    };
  });

  const combined = [...numeric, ...mcQs];
  shuffleInPlace(combined, rng);
  return combined.slice(0, count);
}
