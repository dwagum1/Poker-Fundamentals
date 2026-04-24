/**
 * Single ordered path through topic hubs (matches home page module order).
 */

export type CurriculumStepId =
  | "handRankings"
  | "position"
  | "potOdds"
  | "impliedOdds"
  | "stackToPotRatio"
  | "expectedValue"
  | "startingHands"
  | "preflopAggression"
  | "rangesAndTexture"
  | "bettingBasics"
  | "liveEtiquette"
  | "bankrollManagement"
  | "mentalGame"
  | "bluffingFundamentals"
  | "thinValueBetSizing";

export type CurriculumStepKind = "single" | "position";

export type CurriculumStep = {
  id: CurriculumStepId;
  title: string;
  hubPath: string;
  /** Prefix for /learn, /quiz, /history under this module */
  basePath: string;
  quizPath: string;
  quizOutOf: number;
  kind: CurriculumStepKind;
  /** Position multiway quiz path (only when kind === "position") */
  multiwayQuizPath?: string;
  multiwayQuizOut?: number;
};

export const CURRICULUM_STEPS: CurriculumStep[] = [
  {
    id: "handRankings",
    title: "Hand rankings",
    hubPath: "/hand-rankings",
    basePath: "/hand-rankings",
    quizPath: "/hand-rankings/quiz",
    quizOutOf: 10,
    kind: "single",
  },
  {
    id: "position",
    title: "Position (9-max)",
    hubPath: "/position",
    basePath: "/position",
    quizPath: "/position/quiz",
    quizOutOf: 10,
    kind: "position",
    multiwayQuizPath: "/position/quiz-multiway",
    multiwayQuizOut: 10,
  },
  {
    id: "potOdds",
    title: "Pot odds and outs",
    hubPath: "/pot-odds",
    basePath: "/pot-odds",
    quizPath: "/pot-odds/quiz",
    quizOutOf: 10,
    kind: "single",
  },
  {
    id: "impliedOdds",
    title: "Implied odds",
    hubPath: "/implied-odds",
    basePath: "/implied-odds",
    quizPath: "/implied-odds/quiz",
    quizOutOf: 10,
    kind: "single",
  },
  {
    id: "stackToPotRatio",
    title: "Stack-to-pot ratio (SPR)",
    hubPath: "/stack-to-pot-ratio",
    basePath: "/stack-to-pot-ratio",
    quizPath: "/stack-to-pot-ratio/quiz",
    quizOutOf: 10,
    kind: "single",
  },
  {
    id: "expectedValue",
    title: "Expected value (EV)",
    hubPath: "/expected-value",
    basePath: "/expected-value",
    quizPath: "/expected-value/quiz",
    quizOutOf: 10,
    kind: "single",
  },
  {
    id: "startingHands",
    title: "Starting hands",
    hubPath: "/starting-hands",
    basePath: "/starting-hands",
    quizPath: "/starting-hands/quiz",
    quizOutOf: 15,
    kind: "single",
  },
  {
    id: "preflopAggression",
    title: "Preflop aggression ladder",
    hubPath: "/preflop-aggression",
    basePath: "/preflop-aggression",
    quizPath: "/preflop-aggression/quiz",
    quizOutOf: 10,
    kind: "single",
  },
  {
    id: "rangesAndTexture",
    title: "Ranges & board texture",
    hubPath: "/ranges-and-texture",
    basePath: "/ranges-and-texture",
    quizPath: "/ranges-and-texture/quiz",
    quizOutOf: 10,
    kind: "single",
  },
  {
    id: "bettingBasics",
    title: "Betting basics",
    hubPath: "/betting-basics",
    basePath: "/betting-basics",
    quizPath: "/betting-basics/quiz",
    quizOutOf: 15,
    kind: "single",
  },
  {
    id: "liveEtiquette",
    title: "Live table etiquette",
    hubPath: "/live-etiquette",
    basePath: "/live-etiquette",
    quizPath: "/live-etiquette/quiz",
    quizOutOf: 10,
    kind: "single",
  },
  {
    id: "bankrollManagement",
    title: "Bankroll management",
    hubPath: "/bankroll-management",
    basePath: "/bankroll-management",
    quizPath: "/bankroll-management/quiz",
    quizOutOf: 10,
    kind: "single",
  },
  {
    id: "mentalGame",
    title: "Mental game",
    hubPath: "/mental-game",
    basePath: "/mental-game",
    quizPath: "/mental-game/quiz",
    quizOutOf: 10,
    kind: "single",
  },
  {
    id: "bluffingFundamentals",
    title: "Bluffing fundamentals",
    hubPath: "/bluffing-fundamentals",
    basePath: "/bluffing-fundamentals",
    quizPath: "/bluffing-fundamentals/quiz",
    quizOutOf: 10,
    kind: "single",
  },
  {
    id: "thinValueBetSizing",
    title: "Thin value & bet sizing (lite)",
    hubPath: "/thin-value-bet-sizing",
    basePath: "/thin-value-bet-sizing",
    quizPath: "/thin-value-bet-sizing/quiz",
    quizOutOf: 10,
    kind: "single",
  },
];

const PRACTICE_PATH = "/practice";

/** Paths we persist for “Resume” (module activity + practice). */
export function shouldRecordLearningPath(pathname: string): boolean {
  if (pathname === PRACTICE_PATH) return true;
  for (const s of CURRICULUM_STEPS) {
    if (pathname === s.hubPath) return true;
    if (pathname.startsWith(`${s.basePath}/`)) return true;
  }
  return false;
}

export const PRACTICE_HREF = PRACTICE_PATH;
