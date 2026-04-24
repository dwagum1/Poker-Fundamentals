import type { AppProgress } from "@/lib/progress/types";
import {
  CURRICULUM_STEPS,
  PRACTICE_HREF,
  shouldRecordLearningPath,
  type CurriculumStep,
} from "@/lib/curriculum/path";

export const PASS_RATIO = 0.8;

export const RESUME_MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000;

export function passesQuiz(outOf: number, bestScore: number): boolean {
  const o = Math.max(1, outOf);
  const need = Math.ceil(PASS_RATIO * o);
  return bestScore >= need;
}

type QuizSlice = {
  attempts: number;
  bestScore: number;
  lastCompletedAt?: string;
};

function getSingleQuiz(p: AppProgress, step: CurriculumStep): QuizSlice {
  switch (step.id) {
    case "handRankings":
      return p.handRankings.quiz;
    case "potOdds":
      return p.potOdds.quiz;
    case "impliedOdds":
      return p.impliedOdds.quiz;
    case "stackToPotRatio":
      return p.stackToPotRatio.quiz;
    case "expectedValue":
      return p.expectedValue.quiz;
    case "startingHands":
      return p.startingHands.quiz;
    case "preflopAggression":
      return p.preflopAggression.quiz;
    case "rangesAndTexture":
      return p.rangesAndTexture.quiz;
    case "bettingBasics":
      return p.bettingBasics.quiz;
    case "liveEtiquette":
      return p.liveEtiquette.quiz;
    case "bankrollManagement":
      return p.bankrollManagement.quiz;
    case "mentalGame":
      return p.mentalGame.quiz;
    case "bluffingFundamentals":
      return p.bluffingFundamentals.quiz;
    case "thinValueBetSizing":
      return p.thinValueBetSizing.quiz;
    case "position":
      return p.position.quiz;
    default:
      return { attempts: 0, bestScore: 0 };
  }
}

/** Step is “cleared” for advancing the ordered path (both quizzes pass where applicable). */
export function isStepCompleteForPath(p: AppProgress, step: CurriculumStep): boolean {
  if (step.kind === "position") {
    const q = p.position.quiz;
    const mq = p.position.multiwayQuiz;
    const out = step.quizOutOf;
    const mOut = step.multiwayQuizOut ?? 10;
    return (
      q.attempts > 0 &&
      mq.attempts > 0 &&
      passesQuiz(out, q.bestScore) &&
      passesQuiz(mOut, mq.bestScore)
    );
  }
  const q = getSingleQuiz(p, step);
  return q.attempts > 0 && passesQuiz(step.quizOutOf, q.bestScore);
}

export function getNextStep(p: AppProgress): CurriculumStep | null {
  for (const step of CURRICULUM_STEPS) {
    if (!isStepCompleteForPath(p, step)) return step;
  }
  return null;
}

export type ReviewTarget =
  | { step: CurriculumStep; href: string; ratio: number }
  | null;

/** Every curriculum quiz row (position = basics + multiway). */
export type CurriculumQuizAttempt = {
  step: CurriculumStep;
  href: string;
  out: number;
  attempts: number;
  bestScore: number;
  seq: number;
};

export function listCurriculumQuizAttempts(p: AppProgress): CurriculumQuizAttempt[] {
  const rows: CurriculumQuizAttempt[] = [];
  let seq = 0;
  for (const step of CURRICULUM_STEPS) {
    if (step.kind === "position") {
      const q = p.position.quiz;
      const mq = p.position.multiwayQuiz;
      rows.push({
        step,
        href: step.quizPath,
        out: step.quizOutOf,
        attempts: q.attempts,
        bestScore: q.bestScore,
        seq: seq++,
      });
      if (step.multiwayQuizPath && step.multiwayQuizOut != null) {
        rows.push({
          step,
          href: step.multiwayQuizPath,
          out: step.multiwayQuizOut,
          attempts: mq.attempts,
          bestScore: mq.bestScore,
          seq: seq++,
        });
      }
    } else {
      const q = getSingleQuiz(p, step);
      rows.push({
        step,
        href: step.quizPath,
        out: step.quizOutOf,
        attempts: q.attempts,
        bestScore: q.bestScore,
        seq: seq++,
      });
    }
  }
  return rows;
}

function ratio(out: number, best: number): number {
  return best / Math.max(1, out);
}

/** Weakest attempted quiz (by best/total); for position compares both tracks. */
export function getWeakestReviewTarget(p: AppProgress): ReviewTarget {
  let best: ReviewTarget = null;
  let bestOrder = 9999;
  for (const row of listCurriculumQuizAttempts(p)) {
    if (row.attempts <= 0) continue;
    const r = ratio(row.out, row.bestScore);
    const better =
      !best ||
      r < best.ratio ||
      (Math.abs(r - best.ratio) < 1e-9 && row.seq < bestOrder);
    if (better) {
      best = { step: row.step, href: row.href, ratio: r };
      bestOrder = row.seq;
    }
  }
  return best;
}

export function getResumeHref(p: AppProgress, nowMs: number): string | null {
  const lp = p.learningPath;
  const path = lp.lastPath;
  const at = lp.lastAt;
  if (!path || !at) return null;
  const t = Date.parse(at);
  if (!Number.isFinite(t) || nowMs - t > RESUME_MAX_AGE_MS) return null;
  if (!path.startsWith("/")) return null;
  if (!shouldRecordLearningPath(path)) return null;
  return path;
}

/** When every curriculum step is complete, suggest practice. */
export function getNextHrefOrPractice(p: AppProgress): string {
  const next = getNextStep(p);
  if (next) return next.hubPath;
  return PRACTICE_HREF;
}
