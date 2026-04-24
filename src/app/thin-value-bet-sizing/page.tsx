import Link from "next/link";
import { HubTracker } from "./hub-tracker";

export default function ThinValueBetSizingHubPage() {
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
            Thin value &amp; bet sizing (lite)
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Second barrels, small value bets vs checks — heuristic ideas for NLHE,
            not solver output.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/thin-value-bet-sizing/learn"
            className="rounded-2xl border border-stone-200 bg-[var(--card)] p-6 shadow-sm transition hover:border-emerald-400 dark:border-stone-800 dark:bg-stone-900/60 dark:hover:border-emerald-600"
          >
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
              Learn
            </h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
              Thin value, double barrels, and when a small bet beats checking.
            </p>
          </Link>
          <Link
            href="/thin-value-bet-sizing/quiz"
            className="rounded-2xl border border-stone-200 bg-[var(--card)] p-6 shadow-sm transition hover:border-emerald-400 dark:border-stone-800 dark:bg-stone-900/60 dark:hover:border-emerald-600"
          >
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
              Quiz
            </h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
              Ten mixed questions on thin value, barrels, and sizing.
            </p>
          </Link>
        </div>

        <p className="text-sm text-stone-600 dark:text-stone-400">
          <Link
            href="/thin-value-bet-sizing/history"
            className="font-medium text-emerald-800 underline dark:text-emerald-400"
          >
            Quiz history
          </Link>{" "}
          — review past rounds (saved locally).
        </p>
      </main>
    </>
  );
}
