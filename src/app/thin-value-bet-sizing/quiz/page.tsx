import Link from "next/link";
import { ThinValueBetSizingQuiz } from "@/components/thin-value-bet-sizing/thin-value-bet-sizing-quiz";

export default function ThinValueBetSizingQuizPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
      <div>
        <Link
          href="/thin-value-bet-sizing"
          className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
        >
          ← Thin value &amp; bet sizing (lite)
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
          Quiz
        </h1>
      </div>

      <ThinValueBetSizingQuiz />
    </main>
  );
}
