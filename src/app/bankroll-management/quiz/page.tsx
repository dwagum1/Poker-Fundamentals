import Link from "next/link";
import { BankrollManagementQuiz } from "@/components/bankroll-management/bankroll-management-quiz";

export default function BankrollManagementQuizPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
      <div>
        <Link
          href="/bankroll-management"
          className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
        >
          ← Bankroll management
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
          Quiz
        </h1>
      </div>

      <BankrollManagementQuiz />
    </main>
  );
}
