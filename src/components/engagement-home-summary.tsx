"use client";

import { useApp } from "@/components/providers/app-providers";
import {
  XP_QUIZ_BASE,
  XP_QUIZ_BEAT_BEST_BONUS,
  xpIntoCurrentLevel,
} from "@/lib/progress/engagement";

export function EngagementHomeSummary() {
  const { progress } = useApp();
  const eg = progress.engagement;
  const { level, xpIntoLevel, xpForThisLevel } = xpIntoCurrentLevel(eg.xp);
  const pct = Math.min(
    100,
    Math.max(0, Math.round((100 * xpIntoLevel) / xpForThisLevel)),
  );
  const xpToNext = Math.max(0, xpForThisLevel - xpIntoLevel);

  return (
    <section className="rounded-2xl border border-stone-200 bg-[var(--card)] p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900/60">
      <h2 className="text-sm font-medium uppercase tracking-wide text-emerald-800 dark:text-emerald-400">
        Your progress
      </h2>
      <p className="mt-2 text-sm text-stone-700 dark:text-stone-300">
        Level {level} · {eg.xp} total XP · streak {eg.streakCurrent}
        {eg.streakBest > 0 ? ` (best ${eg.streakBest})` : ""}
      </p>
      <div
        className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700"
        role="progressbar"
        aria-valuenow={xpIntoLevel}
        aria-valuemin={0}
        aria-valuemax={xpForThisLevel}
        aria-label="Experience in current level"
      >
        <div
          className="h-full rounded-full bg-emerald-600 transition-[width] duration-300 dark:bg-emerald-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1.5 text-xs text-stone-500 dark:text-stone-400">
        {xpIntoLevel}/{xpForThisLevel} this level · {xpToNext} XP to level{" "}
        {level + 1}
      </p>
      <ul className="mt-3 list-inside list-disc space-y-1 border-t border-stone-200 pt-3 text-xs text-stone-600 dark:border-stone-700 dark:text-stone-400">
        <li>
          <span className="font-medium text-stone-800 dark:text-stone-200">
            Streak:
          </span>{" "}
          First finished quiz each local day +1; more the same day does not
          stack. Play again the next calendar day or it resets to 1.
        </li>
        <li>
          <span className="font-medium text-stone-800 dark:text-stone-200">
            XP:
          </span>{" "}
          {XP_QUIZ_BASE} + score-based amount per quiz; +{XP_QUIZ_BEAT_BEST_BONUS}{" "}
          when you beat that module’s prior best (not your first try).
          Levels need more total XP each step.
        </li>
      </ul>
    </section>
  );
}
