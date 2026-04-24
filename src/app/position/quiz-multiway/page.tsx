import Link from "next/link";
import { MultiwayHubTracker } from "../multiway-hub-tracker";
import { MultiwayPositionQuiz } from "@/components/position/multiway-quiz";

export default function PositionMultiwayQuizPage() {
  return (
    <>
      <MultiwayHubTracker />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
        <div>
          <Link
            href="/position"
            className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
          >
            ← Position
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Multiway quiz
          </h1>
        </div>

        <MultiwayPositionQuiz />
      </main>
    </>
  );
}
