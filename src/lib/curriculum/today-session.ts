import type { AppProgress } from "@/lib/progress/types";
import {
  PRACTICE_HREF,
  type CurriculumStepId,
} from "@/lib/curriculum/path";
import {
  getNextStep,
  listCurriculumQuizAttempts,
  passesQuiz,
  type CurriculumQuizAttempt,
} from "@/lib/curriculum/selectors";

export type BelowPassQuizTarget = CurriculumQuizAttempt;

export function listBelowPassQuizTargets(p: AppProgress): BelowPassQuizTarget[] {
  return listCurriculumQuizAttempts(p).filter(
    (row) => row.attempts > 0 && !passesQuiz(row.out, row.bestScore),
  );
}

export type RandomWeakPick = {
  href: string;
  title: string;
  stepId: CurriculumStepId;
};

export function pickRandomWeakQuiz(
  p: AppProgress,
  rng: () => number,
  excludeStepIds?: Set<CurriculumStepId>,
): RandomWeakPick | null {
  let pool = listBelowPassQuizTargets(p);
  if (excludeStepIds?.size) {
    pool = pool.filter((row) => !excludeStepIds.has(row.step.id));
  }
  if (pool.length === 0) return null;
  const i = Math.floor(rng() * pool.length);
  const row = pool[i]!;
  return {
    href: row.href,
    title: row.step.title,
    stepId: row.step.id,
  };
}

export function getPushForwardLearn(p: AppProgress): {
  href: string;
  title: string;
} {
  const next = getNextStep(p);
  if (next) {
    return { href: `${next.basePath}/learn`, title: next.title };
  }
  return { href: PRACTICE_HREF, title: "Keep sharp at the table" };
}

export type TodaySession = {
  brushUp: RandomWeakPick | null;
  pushForward: { href: string; title: string };
};

export function getTodaySession(
  p: AppProgress,
  rng: () => number = Math.random,
): TodaySession {
  const pushForward = getPushForwardLearn(p);
  const next = getNextStep(p);
  const exclude = next ? new Set<CurriculumStepId>([next.id]) : undefined;
  let brushUp = pickRandomWeakQuiz(p, rng, exclude);
  if (!brushUp && next) {
    brushUp = pickRandomWeakQuiz(p, rng);
  }
  return { brushUp, pushForward };
}
