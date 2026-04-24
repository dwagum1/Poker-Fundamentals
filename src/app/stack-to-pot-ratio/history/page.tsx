"use client";

import Link from "next/link";
import { QuizHistoryView } from "@/components/quiz/quiz-history-view";
import { useApp } from "@/components/providers/app-providers";

export default function StackToPotRatioHistoryPage() {
  const { progress } = useApp();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
      <div>
        <Link
          href="/stack-to-pot-ratio"
          className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
        >
          ← Stack-to-pot ratio
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
          Quiz history
        </h1>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
          Past rounds (newest first). Up to 10 saved locally.
        </p>
      </div>

      <QuizHistoryView history={progress.stackToPotRatio.quizHistory} />
    </main>
  );
}
