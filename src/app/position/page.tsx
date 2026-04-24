import Link from "next/link";
import { HubTracker } from "./hub-tracker";

export default function PositionHubPage() {
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
            Position (9-max)
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Learn seat names, acting order, and why acting last is an advantage.
            Multiway builds on the same postflop order with several players in
            the pot.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
            Basics
          </h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Link
              href="/position/learn"
              className="rounded-2xl border border-stone-200 bg-[var(--card)] p-6 shadow-sm transition hover:border-emerald-400 dark:border-stone-800 dark:bg-stone-900/60 dark:hover:border-emerald-600"
            >
              <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
                Learn
              </h3>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                Glossary, table diagram, and preflop vs postflop order.
              </p>
            </Link>
            <Link
              href="/position/quiz"
              className="rounded-2xl border border-stone-200 bg-[var(--card)] p-6 shadow-sm transition hover:border-emerald-400 dark:border-stone-800 dark:bg-stone-900/60 dark:hover:border-emerald-600"
            >
              <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
                Quiz
              </h3>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                Ten questions on order and heads-up position.
              </p>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
            Multiway
          </h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Link
              href="/position/learn/multiway"
              className="rounded-2xl border border-stone-200 bg-[var(--card)] p-6 shadow-sm transition hover:border-emerald-400 dark:border-stone-800 dark:bg-stone-900/60 dark:hover:border-emerald-600"
            >
              <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
                Learn
              </h3>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                First to act, last to act, and IP vs one opponent with several
                players in.
              </p>
            </Link>
            <Link
              href="/position/quiz-multiway"
              className="rounded-2xl border border-stone-200 bg-[var(--card)] p-6 shadow-sm transition hover:border-emerald-400 dark:border-stone-800 dark:bg-stone-900/60 dark:hover:border-emerald-600"
            >
              <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
                Quiz
              </h3>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                Ten questions on multiway order and pairwise position.
              </p>
            </Link>
          </div>
        </div>

        <p className="text-sm text-stone-600 dark:text-stone-400">
          <Link
            href="/position/history"
            className="font-medium text-emerald-800 underline dark:text-emerald-400"
          >
            Quiz history
          </Link>{" "}
          — basics and multiway (saved locally).
        </p>
      </main>
    </>
  );
}
