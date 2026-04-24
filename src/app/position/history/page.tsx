"use client";

import Link from "next/link";
import { QuizHistoryView } from "@/components/quiz/quiz-history-view";
import { useApp } from "@/components/providers/app-providers";

export default function PositionHistoryPage() {
  const { progress } = useApp();
  const pos = progress.position;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-10">
      <div>
        <Link
          href="/position"
          className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
        >
          ← Position
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
          Quiz history
        </h1>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
          Past rounds (newest first). Up to 10 per quiz type, stored locally.
        </p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
          Basics quiz
        </h2>
        <div className="mt-3">
          <QuizHistoryView history={pos.quizHistory} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
          Multiway quiz
        </h2>
        <div className="mt-3">
          <QuizHistoryView history={pos.multiwayQuizHistory} />
        </div>
      </section>
    </main>
  );
}
