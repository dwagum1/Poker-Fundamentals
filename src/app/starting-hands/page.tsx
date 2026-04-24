import Link from "next/link";
import { HubTracker } from "./hub-tracker";

export default function StartingHandsHubPage() {
  return (
    <>
      <HubTracker />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
        <div>
          <Link
            href="/"
            className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
          >
            ← Home
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Starting hands
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Notation, strength categories (Premium, Strong, Medium, Trash /
            fold), illustrative matchups, and the full 169-hand list ranked by
            preflop equity vs a random hand — for study, not a GTO chart.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/starting-hands/learn"
            className="rounded-2xl border border-stone-200 bg-[var(--card)] p-6 shadow-sm transition hover:border-emerald-400 dark:border-stone-800 dark:bg-stone-900/60 dark:hover:border-emerald-600"
          >
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
              Learn
            </h3>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
              Notation, categories, equity examples, and the full 169 list.
            </p>
          </Link>
          <Link
            href="/starting-hands/quiz"
            className="rounded-2xl border border-stone-200 bg-[var(--card)] p-6 shadow-sm transition hover:border-emerald-400 dark:border-stone-800 dark:bg-stone-900/60 dark:hover:border-emerald-600"
          >
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
              Quiz
            </h3>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
              15 questions: notation, scenarios, equities, order, categories.
            </p>
          </Link>
        </div>

        <p className="text-sm text-stone-600 dark:text-stone-400">
          <Link
            href="/starting-hands/history"
            className="font-medium text-emerald-800 underline dark:text-emerald-400"
          >
            Quiz history
          </Link>{" "}
          — saved locally.
        </p>
      </main>
    </>
  );
}
