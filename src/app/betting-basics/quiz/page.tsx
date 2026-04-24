import Link from "next/link";
import { BettingBasicsQuiz } from "@/components/betting-basics/betting-basics-quiz";

export default function BettingBasicsQuizPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
      <div>
        <Link
          href="/betting-basics"
          className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
        >
          ← Betting basics
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
          Quiz
        </h1>
      </div>

      <BettingBasicsQuiz />
    </main>
  );
}
