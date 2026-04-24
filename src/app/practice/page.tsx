import Link from "next/link";

/**
 * Practice embed: `/nlhe/poker.html` is a self-contained 6-max NLHE table (vanilla JS + CSS).
 * No external scripts, fonts, or game servers — runs fully offline once loaded.
 */
export default function PracticePage() {
  return (
    <main className="flex min-h-[100dvh] flex-1 flex-col">
      <div className="shrink-0 border-b border-stone-200 bg-stone-50/90 px-4 py-3 dark:border-stone-800 dark:bg-stone-950/90">
        <Link
          href="/"
          className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
        >
          ← Home
        </Link>
        <h1 className="mt-2 text-xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
          Practice table
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-stone-600 dark:text-stone-400">
          Local play-money 6-max Hold&apos;em in{" "}
          <code className="text-stone-700 dark:text-stone-300">/nlhe/poker.html</code> — no third-party
          hosts or accounts. Deal a hand and use Fold / Check-Call / Raise when it is your turn.
        </p>
      </div>
      <iframe
        title="Practice: 6-max NLHE (local)"
        src="/nlhe/poker.html"
        className="min-h-0 w-full flex-1 border-0 bg-[#0a2a1f]"
      />
    </main>
  );
}
