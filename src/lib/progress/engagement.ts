import type { AppProgress } from "@/lib/progress/types";

/** Local calendar YYYY-MM-DD in the user's browser (streak day boundary). */
export function toLocalYmd(d: Date): string {
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return `${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function localYmdYesterday(ymd: string): string {
  const [y, mo, da] = ymd.split("-").map(Number);
  const d = new Date(y, mo - 1, da);
  d.setDate(d.getDate() - 1);
  return toLocalYmd(d);
}

/** XP awarded per finished quiz run (before beat-best bonus). */
export const XP_QUIZ_BASE = 15;
export const XP_QUIZ_SCORE_SCALE = 35;
export const XP_QUIZ_BEAT_BEST_BONUS = 10;

/** Min XP at start of level L (1-based). Level 1 starts at 0. */
export function minXpForLevel(level: number): number {
  if (level <= 1) return 0;
  return (50 * (level - 1) * level) / 2;
}

/** Highest level (1-based) achievable at this total XP. */
export function levelFromTotalXp(xp: number): number {
  const x = Math.max(0, xp);
  let level = 1;
  while (minXpForLevel(level + 1) <= x) {
    level += 1;
  }
  return level;
}

/** XP into current level and width of this level band (for progress UI). */
export function xpIntoCurrentLevel(xp: number): {
  level: number;
  xpIntoLevel: number;
  xpForThisLevel: number;
} {
  const x = Math.max(0, xp);
  const level = levelFromTotalXp(x);
  const floor = minXpForLevel(level);
  const ceil = minXpForLevel(level + 1);
  return {
    level,
    xpIntoLevel: x - floor,
    xpForThisLevel: Math.max(1, ceil - floor),
  };
}

function xpForQuizRun(
  score: number,
  total: number,
  prevBestScore: number,
  prevAttempts: number,
): number {
  const t = Math.max(1, total);
  const s = Math.min(Math.max(0, score), t);
  let xp = XP_QUIZ_BASE + Math.round((XP_QUIZ_SCORE_SCALE * s) / t);
  if (prevAttempts >= 1 && s > prevBestScore) {
    xp += XP_QUIZ_BEAT_BEST_BONUS;
  }
  return xp;
}

function nextStreakState(
  prev: {
    streakCurrent: number;
    streakLastQualifiedDate: string | null;
    streakBest: number;
  },
  activityYmd: string,
): { streakCurrent: number; streakLastQualifiedDate: string; streakBest: number } {
  const last = prev.streakLastQualifiedDate;
  if (last === activityYmd) {
    return {
      streakCurrent: prev.streakCurrent,
      streakLastQualifiedDate: activityYmd,
      streakBest: Math.max(prev.streakBest, prev.streakCurrent),
    };
  }
  let nextCount: number;
  if (last === null) {
    nextCount = 1;
  } else if (last === localYmdYesterday(activityYmd)) {
    nextCount = Math.max(1, prev.streakCurrent + 1);
  } else {
    nextCount = 1;
  }
  const streakBest = Math.max(prev.streakBest, nextCount);
  return {
    streakCurrent: nextCount,
    streakLastQualifiedDate: activityYmd,
    streakBest,
  };
}

/**
 * Call after building `next` with module quiz stats already merged.
 * `prevBestScore` / `prevAttempts` are from that module's quiz slice **before** this completion.
 */
export function applyEngagementAfterQuiz(
  next: AppProgress,
  args: {
    score: number;
    total: number;
    completedAt: string;
    prevBestScore: number;
    prevAttempts: number;
  },
): AppProgress {
  const at = new Date(args.completedAt);
  const activityYmd = toLocalYmd(at);
  const eg = next.engagement;
  const xpGain = xpForQuizRun(
    args.score,
    args.total,
    args.prevBestScore,
    args.prevAttempts,
  );
  const streak = nextStreakState(eg, activityYmd);
  return {
    ...next,
    engagement: {
      xp: eg.xp + xpGain,
      streakCurrent: streak.streakCurrent,
      streakLastQualifiedDate: streak.streakLastQualifiedDate,
      streakBest: streak.streakBest,
    },
  };
}
