import { getLocalItem, setLocalItem } from "@/lib/storage/safe-local";
import {
  type AppProgress,
  type QuizAttemptRecord,
  defaultProgress,
} from "@/lib/progress/types";
import { MAX_QUIZ_HISTORY } from "@/lib/progress/quiz-history";

const KEY = "poker-learn:v1:progress";

function laterIso(a: string | undefined, b: string | undefined): string | undefined {
  if (!a) return b;
  if (!b) return a;
  return a > b ? a : b;
}

function mergeQuizHistories(
  a: QuizAttemptRecord[] | undefined,
  b: QuizAttemptRecord[] | undefined,
): QuizAttemptRecord[] {
  return [...(a ?? []), ...(b ?? [])]
    .sort((x, y) => (x.completedAt < y.completedAt ? 1 : -1))
    .slice(0, MAX_QUIZ_HISTORY);
}

/** Legacy keys from the two-track starting-hands module (pre-unification). */
type LegacyStartingHandsSlice = Partial<AppProgress["startingHands"]> & {
  basicsReferenceVisitedAt?: string;
  advancedReferenceVisitedAt?: string;
  advancedQuiz?: AppProgress["startingHands"]["quiz"];
  advancedQuizHistory?: QuizAttemptRecord[];
};

/** Merges legacy dual basics/advanced starting-hands progress into a single slice. */
function mergeStartingHandsFromStorage(
  sh: LegacyStartingHandsSlice | undefined,
  base: AppProgress["startingHands"],
): AppProgress["startingHands"] {
  if (!sh) return base;

  const legacyBasicsRef = sh?.basicsReferenceVisitedAt;
  const legacyAdvRef = sh?.advancedReferenceVisitedAt;
  const referenceVisitedAt =
    sh?.referenceVisitedAt ??
    laterIso(legacyBasicsRef, legacyAdvRef) ??
    legacyBasicsRef ??
    legacyAdvRef;

  const legacyQuiz = sh?.quiz;
  const legacyAdv = sh?.advancedQuiz;
  const attempts =
    (legacyQuiz?.attempts ?? 0) + (legacyAdv?.attempts ?? 0);
  const bestScore = Math.max(
    legacyQuiz?.bestScore ?? 0,
    legacyAdv?.bestScore ?? 0,
  );

  const lastCompletedAt = laterIso(
    legacyQuiz?.lastCompletedAt,
    legacyAdv?.lastCompletedAt,
  );
  let lastScore: number | undefined;
  if (legacyQuiz?.lastCompletedAt && legacyAdv?.lastCompletedAt) {
    lastScore =
      legacyQuiz.lastCompletedAt > legacyAdv.lastCompletedAt!
        ? legacyQuiz.lastScore
        : legacyAdv.lastScore;
  } else {
    lastScore = legacyAdv?.lastScore ?? legacyQuiz?.lastScore;
  }

  const quizHistory = mergeQuizHistories(
    sh?.quizHistory,
    sh?.advancedQuizHistory,
  );

  return {
    hubVisitedAt: sh.hubVisitedAt,
    referenceVisitedAt,
    quiz: {
      attempts,
      bestScore,
      lastScore,
      lastCompletedAt,
    },
    quizHistory,
  };
}

function mergeProgress(parsed: Partial<AppProgress>): AppProgress {
  const base = defaultProgress();
  const hr = parsed.handRankings;
  const pos = parsed.position;
  const po = parsed.potOdds;
  const io = parsed.impliedOdds;
  const spr = parsed.stackToPotRatio;
  const ev = parsed.expectedValue;
  const sh = parsed.startingHands;
  const pa = parsed.preflopAggression;
  const bb = parsed.bettingBasics;
  const bf = parsed.bluffingFundamentals;
  const bm = parsed.bankrollManagement;
  const mg = parsed.mentalGame;
  const rt = parsed.rangesAndTexture;
  const tvb = parsed.thinValueBetSizing;
  const le = parsed.liveEtiquette;
  const eg = parsed.engagement;
  const lp = parsed.learningPath;
  return {
    handRankings: {
      hubVisitedAt: hr?.hubVisitedAt,
      referenceVisitedAt: hr?.referenceVisitedAt,
      quiz: {
        attempts: hr?.quiz?.attempts ?? base.handRankings.quiz.attempts,
        bestScore: hr?.quiz?.bestScore ?? base.handRankings.quiz.bestScore,
        lastScore: hr?.quiz?.lastScore,
        lastCompletedAt: hr?.quiz?.lastCompletedAt,
      },
      quizHistory: hr?.quizHistory ?? [],
    },
    position: {
      hubVisitedAt: pos?.hubVisitedAt,
      referenceVisitedAt: pos?.referenceVisitedAt,
      quiz: {
        attempts: pos?.quiz?.attempts ?? base.position.quiz.attempts,
        bestScore: pos?.quiz?.bestScore ?? base.position.quiz.bestScore,
        lastScore: pos?.quiz?.lastScore,
        lastCompletedAt: pos?.quiz?.lastCompletedAt,
      },
      multiwayHubVisitedAt: pos?.multiwayHubVisitedAt,
      multiwayReferenceVisitedAt: pos?.multiwayReferenceVisitedAt,
      multiwayQuiz: {
        attempts:
          pos?.multiwayQuiz?.attempts ?? base.position.multiwayQuiz.attempts,
        bestScore:
          pos?.multiwayQuiz?.bestScore ?? base.position.multiwayQuiz.bestScore,
        lastScore: pos?.multiwayQuiz?.lastScore,
        lastCompletedAt: pos?.multiwayQuiz?.lastCompletedAt,
      },
      quizHistory: pos?.quizHistory ?? [],
      multiwayQuizHistory: pos?.multiwayQuizHistory ?? [],
    },
    potOdds: {
      hubVisitedAt: po?.hubVisitedAt,
      referenceVisitedAt: po?.referenceVisitedAt,
      quiz: {
        attempts: po?.quiz?.attempts ?? base.potOdds.quiz.attempts,
        bestScore: po?.quiz?.bestScore ?? base.potOdds.quiz.bestScore,
        lastScore: po?.quiz?.lastScore,
        lastCompletedAt: po?.quiz?.lastCompletedAt,
      },
      quizHistory: po?.quizHistory ?? [],
    },
    impliedOdds: {
      hubVisitedAt: io?.hubVisitedAt,
      referenceVisitedAt: io?.referenceVisitedAt,
      quiz: {
        attempts: io?.quiz?.attempts ?? base.impliedOdds.quiz.attempts,
        bestScore: io?.quiz?.bestScore ?? base.impliedOdds.quiz.bestScore,
        lastScore: io?.quiz?.lastScore,
        lastCompletedAt: io?.quiz?.lastCompletedAt,
      },
      quizHistory: io?.quizHistory ?? [],
    },
    stackToPotRatio: {
      hubVisitedAt: spr?.hubVisitedAt,
      referenceVisitedAt: spr?.referenceVisitedAt,
      quiz: {
        attempts:
          spr?.quiz?.attempts ?? base.stackToPotRatio.quiz.attempts,
        bestScore:
          spr?.quiz?.bestScore ?? base.stackToPotRatio.quiz.bestScore,
        lastScore: spr?.quiz?.lastScore,
        lastCompletedAt: spr?.quiz?.lastCompletedAt,
      },
      quizHistory: spr?.quizHistory ?? [],
    },
    expectedValue: {
      hubVisitedAt: ev?.hubVisitedAt,
      referenceVisitedAt: ev?.referenceVisitedAt,
      quiz: {
        attempts:
          ev?.quiz?.attempts ?? base.expectedValue.quiz.attempts,
        bestScore:
          ev?.quiz?.bestScore ?? base.expectedValue.quiz.bestScore,
        lastScore: ev?.quiz?.lastScore,
        lastCompletedAt: ev?.quiz?.lastCompletedAt,
      },
      quizHistory: ev?.quizHistory ?? [],
    },
    startingHands: mergeStartingHandsFromStorage(
      sh as LegacyStartingHandsSlice | undefined,
      base.startingHands,
    ),
    preflopAggression: {
      hubVisitedAt: pa?.hubVisitedAt,
      referenceVisitedAt: pa?.referenceVisitedAt,
      quiz: {
        attempts:
          pa?.quiz?.attempts ?? base.preflopAggression.quiz.attempts,
        bestScore:
          pa?.quiz?.bestScore ?? base.preflopAggression.quiz.bestScore,
        lastScore: pa?.quiz?.lastScore,
        lastCompletedAt: pa?.quiz?.lastCompletedAt,
      },
      quizHistory: pa?.quizHistory ?? [],
    },
    bettingBasics: {
      hubVisitedAt: bb?.hubVisitedAt,
      referenceVisitedAt: bb?.referenceVisitedAt,
      quiz: {
        attempts: bb?.quiz?.attempts ?? base.bettingBasics.quiz.attempts,
        bestScore: bb?.quiz?.bestScore ?? base.bettingBasics.quiz.bestScore,
        lastScore: bb?.quiz?.lastScore,
        lastCompletedAt: bb?.quiz?.lastCompletedAt,
      },
      quizHistory: bb?.quizHistory ?? [],
    },
    bluffingFundamentals: {
      hubVisitedAt: bf?.hubVisitedAt,
      referenceVisitedAt: bf?.referenceVisitedAt,
      quiz: {
        attempts:
          bf?.quiz?.attempts ?? base.bluffingFundamentals.quiz.attempts,
        bestScore:
          bf?.quiz?.bestScore ?? base.bluffingFundamentals.quiz.bestScore,
        lastScore: bf?.quiz?.lastScore,
        lastCompletedAt: bf?.quiz?.lastCompletedAt,
      },
      quizHistory: bf?.quizHistory ?? [],
    },
    bankrollManagement: {
      hubVisitedAt: bm?.hubVisitedAt,
      referenceVisitedAt: bm?.referenceVisitedAt,
      quiz: {
        attempts:
          bm?.quiz?.attempts ?? base.bankrollManagement.quiz.attempts,
        bestScore:
          bm?.quiz?.bestScore ?? base.bankrollManagement.quiz.bestScore,
        lastScore: bm?.quiz?.lastScore,
        lastCompletedAt: bm?.quiz?.lastCompletedAt,
      },
      quizHistory: bm?.quizHistory ?? [],
    },
    mentalGame: {
      hubVisitedAt: mg?.hubVisitedAt,
      referenceVisitedAt: mg?.referenceVisitedAt,
      quiz: {
        attempts: mg?.quiz?.attempts ?? base.mentalGame.quiz.attempts,
        bestScore: mg?.quiz?.bestScore ?? base.mentalGame.quiz.bestScore,
        lastScore: mg?.quiz?.lastScore,
        lastCompletedAt: mg?.quiz?.lastCompletedAt,
      },
      quizHistory: mg?.quizHistory ?? [],
    },
    rangesAndTexture: {
      hubVisitedAt: rt?.hubVisitedAt,
      referenceVisitedAt: rt?.referenceVisitedAt,
      quiz: {
        attempts:
          rt?.quiz?.attempts ?? base.rangesAndTexture.quiz.attempts,
        bestScore:
          rt?.quiz?.bestScore ?? base.rangesAndTexture.quiz.bestScore,
        lastScore: rt?.quiz?.lastScore,
        lastCompletedAt: rt?.quiz?.lastCompletedAt,
      },
      quizHistory: rt?.quizHistory ?? [],
    },
    thinValueBetSizing: {
      hubVisitedAt: tvb?.hubVisitedAt,
      referenceVisitedAt: tvb?.referenceVisitedAt,
      quiz: {
        attempts:
          tvb?.quiz?.attempts ?? base.thinValueBetSizing.quiz.attempts,
        bestScore:
          tvb?.quiz?.bestScore ?? base.thinValueBetSizing.quiz.bestScore,
        lastScore: tvb?.quiz?.lastScore,
        lastCompletedAt: tvb?.quiz?.lastCompletedAt,
      },
      quizHistory: tvb?.quizHistory ?? [],
    },
    liveEtiquette: {
      hubVisitedAt: le?.hubVisitedAt,
      referenceVisitedAt: le?.referenceVisitedAt,
      quiz: {
        attempts:
          le?.quiz?.attempts ?? base.liveEtiquette.quiz.attempts,
        bestScore:
          le?.quiz?.bestScore ?? base.liveEtiquette.quiz.bestScore,
        lastScore: le?.quiz?.lastScore,
        lastCompletedAt: le?.quiz?.lastCompletedAt,
      },
      quizHistory: le?.quizHistory ?? [],
    },
    engagement: {
      xp: Math.max(0, eg?.xp ?? base.engagement.xp),
      streakCurrent: Math.max(
        0,
        eg?.streakCurrent ?? base.engagement.streakCurrent,
      ),
      streakLastQualifiedDate:
        eg?.streakLastQualifiedDate ?? base.engagement.streakLastQualifiedDate,
      streakBest: Math.max(
        0,
        eg?.streakBest ?? base.engagement.streakBest,
      ),
    },
    learningPath: {
      lastPath: lp?.lastPath ?? base.learningPath.lastPath,
      lastAt: lp?.lastAt ?? base.learningPath.lastAt,
    },
  };
}

export function loadProgress(): AppProgress {
  const raw = getLocalItem(KEY);
  if (!raw) return defaultProgress();
  try {
    const parsed = JSON.parse(raw) as Partial<AppProgress>;
    return mergeProgress(parsed);
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(next: AppProgress): void {
  setLocalItem(KEY, JSON.stringify(next));
}

export function patchProgress(
  patch: (prev: AppProgress) => AppProgress,
): AppProgress {
  const prev = loadProgress();
  const next = patch(prev);
  saveProgress(next);
  return next;
}
