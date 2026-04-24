import Link from "next/link";
import { evCallChips } from "@/lib/poker/expected-value/core";
import { LearnTracker } from "./learn-tracker";

export default function ExpectedValueLearnPage() {
  const potFacing = 150;
  const call = 50;
  const equityPct = 40;
  const ev = evCallChips(equityPct, potFacing, call);

  return (
    <>
      <LearnTracker />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
        <div>
          <Link
            href="/expected-value"
            className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
          >
            ← Expected value
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Expected value (EV)
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Assumptions: <strong className="font-medium text-stone-800 dark:text-stone-200">NLHE</strong>,{" "}
            <strong className="font-medium text-stone-800 dark:text-stone-200">single decision</strong>{" "}
            (no future streets in the formulas),{" "}
            <strong className="font-medium text-stone-800 dark:text-stone-200">integer chips</strong>.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            What EV is
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            <strong className="text-stone-800 dark:text-stone-200">Expected value</strong> is the
            average result of a decision if you could repeat the same situation many
            times. A +EV choice is profitable in the long run; −EV loses on average;
            0 EV is break-even. Short-term luck still swings results—EV is about the
            long-run average.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            EV of calling (one street)
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            When you face a bet, the pot facing you already includes the
            villain&apos;s bet. If you call, you risk your{" "}
            <strong className="text-stone-800 dark:text-stone-200">call</strong> to win
            everything that was in the middle before you put in your call (the pot
            facing you). A simple teaching formula:
          </p>
          <p className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 font-mono text-sm text-stone-800 dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-200">
            EV ≈ (equity) × (pot facing) − (1 − equity) × (call)
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Equity is your chance to win the pot at showdown (as a decimal or
            percent). Example: pot facing ${potFacing}, call ${call}, equity{" "}
            {equityPct}% → EV ≈ 0.4×{potFacing} − 0.6×{call} ={" "}
            <strong className="text-stone-800 dark:text-stone-200">${ev}</strong> in chips
            (rounded). This connects directly to{" "}
            <Link href="/pot-odds/learn" className="font-medium text-emerald-800 underline dark:text-emerald-400">
              pot odds
            </Link>{" "}
            (break-even equity) and{" "}
            <Link href="/implied-odds/learn" className="font-medium text-emerald-800 underline dark:text-emerald-400">
              implied odds
            </Link>{" "}
            when future streets matter.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Pure bluff (0% when called)
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            If you bluff and never win when called, a simple model is: EV ≈{" "}
            <strong className="text-stone-800 dark:text-stone-200">{`P(fold) × pot − P(call) × bet`}</strong>{" "}
            where <strong className="text-stone-800 dark:text-stone-200">pot</strong> is
            the pot before your bluff bet. The break-even fold frequency is{" "}
            <strong className="text-stone-800 dark:text-stone-200">bet / (pot + bet)</strong>{" "}
            (same idea as{" "}
            <Link href="/bluffing-fundamentals/learn" className="font-medium text-emerald-800 underline dark:text-emerald-400">
              bluffing fundamentals
            </Link>
            ).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Practice
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Try the{" "}
            <Link href="/expected-value/quiz" className="font-medium text-emerald-800 underline dark:text-emerald-400">
              quiz
            </Link>{" "}
            for numeric EV and conceptual checks.
          </p>
        </section>
      </main>
    </>
  );
}
