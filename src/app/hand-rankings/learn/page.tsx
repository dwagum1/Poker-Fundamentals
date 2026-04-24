import Link from "next/link";
import { HandRankingRow } from "@/components/hand-rankings/hand-ranking-row";
import { HAND_RANKINGS_ORDERED } from "@/lib/poker/hand-rankings";
import { LearnTracker } from "./learn-tracker";

export default function HandRankingsLearnPage() {
  return (
    <>
      <LearnTracker />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
        <div>
          <Link
            href="/hand-rankings"
            className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
          >
            ← Hand rankings
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Reference
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Listed strongest to weakest. In real play, kickers break ties within
            the same category—this chart is about categories only.
          </p>
        </div>

        <div className="space-y-3">
          {HAND_RANKINGS_ORDERED.map((def, i) => (
            <HandRankingRow key={def.id} def={def} rankLabel={`#${i + 1}`} />
          ))}
        </div>

        <div className="pb-8">
          <Link
            href="/hand-rankings/quiz"
            className="inline-flex rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Take the quiz
          </Link>
        </div>
      </main>
    </>
  );
}
