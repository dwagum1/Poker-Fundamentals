"use client";

import type { QuizAttemptRecord } from "@/lib/progress/types";

type Props = {
  history: QuizAttemptRecord[] | undefined;
  emptyMessage?: string;
};

export function QuizHistoryView({
  history,
  emptyMessage = "No completed quizzes yet.",
}: Props) {
  const attempts = history ?? [];

  if (attempts.length === 0) {
    return (
      <p className="text-sm text-stone-500 dark:text-stone-400">{emptyMessage}</p>
    );
  }

  return (
    <ul className="space-y-6">
      {attempts.map((a, attemptIdx) => (
        <li
          key={`${a.completedAt}_${attemptIdx}`}
          className="rounded-xl border border-stone-200 bg-stone-50/80 p-4 dark:border-stone-700 dark:bg-stone-900/50"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-sm font-medium text-stone-900 dark:text-stone-50">
              Score {a.score}/{a.total}
            </span>
            <time
              className="text-xs text-stone-500 dark:text-stone-400"
              dateTime={a.completedAt}
            >
              {new Date(a.completedAt).toLocaleString()}
            </time>
          </div>
          {a.wrong.length === 0 ? (
            <p className="mt-2 text-sm text-emerald-800 dark:text-emerald-300">
              No mistakes — perfect round.
            </p>
          ) : (
            <ul className="mt-3 space-y-3 border-t border-stone-200 pt-3 dark:border-stone-600">
              {a.wrong.map((w, wi) => (
                <li key={`${a.completedAt}_${w.questionId}_${wi}`}>
                  <p className="text-sm text-stone-700 dark:text-stone-300">
                    {w.prompt}
                  </p>
                  <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
                    Your answer:{" "}
                    <span className="font-medium text-amber-800 dark:text-amber-200">
                      {w.userAnswer}
                    </span>
                    {" · "}
                    Correct:{" "}
                    <span className="font-medium text-emerald-800 dark:text-emerald-300">
                      {w.correctAnswer}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
