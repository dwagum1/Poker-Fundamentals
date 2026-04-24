import Link from "next/link";
import { PositionQuiz } from "@/components/position/position-quiz";

export default function PositionQuizPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
      <div>
        <Link
          href="/position"
          className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
        >
          ← Position
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
          Quiz
        </h1>
      </div>

      <PositionQuiz />
    </main>
  );
}
