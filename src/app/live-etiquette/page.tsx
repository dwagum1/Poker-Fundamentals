import Link from "next/link";
import { HubTracker } from "./hub-tracker";

export default function LiveEtiquetteHubPage() {
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
            Live table etiquette
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Norms for cash games with real people: protect your cards, act in
            turn, and bet clearly so the game stays fair and friendly.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/live-etiquette/learn"
            className="rounded-2xl border border-stone-200 bg-[var(--card)] p-6 shadow-sm transition hover:border-emerald-400 dark:border-stone-800 dark:bg-stone-900/60 dark:hover:border-emerald-600"
          >
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
              Learn
            </h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
              One-card exposure, action in turn, string bets, and splashing—why
              they matter and what to do instead.
            </p>
          </Link>
          <Link
            href="/live-etiquette/quiz"
            className="rounded-2xl border border-stone-200 bg-[var(--card)] p-6 shadow-sm transition hover:border-emerald-400 dark:border-stone-800 dark:bg-stone-900/60 dark:hover:border-emerald-600"
          >
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
              Quiz
            </h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
              Ten multiple-choice questions on live table norms.
            </p>
          </Link>
        </div>

        <p className="text-sm text-stone-600 dark:text-stone-400">
          <Link
            href="/live-etiquette/history"
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
