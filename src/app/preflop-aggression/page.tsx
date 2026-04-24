import Link from "next/link";
import { HubTracker } from "./hub-tracker";

export default function PreflopAggressionHubPage() {
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
            Preflop aggression ladder
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Open, isolation, 3-bet, and 4-bet—beginner vocabulary tied to
            position and ranges. No charts or exact frequencies.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/preflop-aggression/learn"
            className="rounded-2xl border border-stone-200 bg-[var(--card)] p-6 shadow-sm transition hover:border-emerald-400 dark:border-stone-800 dark:bg-stone-900/60 dark:hover:border-emerald-600"
          >
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
              Learn
            </h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
              How each raise step works and how ranges widen or tighten with
              seat and action.
            </p>
          </Link>
          <Link
            href="/preflop-aggression/quiz"
            className="rounded-2xl border border-stone-200 bg-[var(--card)] p-6 shadow-sm transition hover:border-emerald-400 dark:border-stone-800 dark:bg-stone-900/60 dark:hover:border-emerald-600"
          >
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
              Quiz
            </h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
              Ten multiple-choice questions.
            </p>
          </Link>
        </div>

        <p className="text-sm text-stone-600 dark:text-stone-400">
          <Link
            href="/preflop-aggression/history"
            className="font-medium text-emerald-800 underline dark:text-emerald-400"
          >
            Quiz history
          </Link>{" "}
          — review past rounds and mistakes (saved locally).
        </p>
      </main>
    </>
  );
}
