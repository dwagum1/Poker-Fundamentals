import Link from "next/link";
import {
  breakEvenEquityPercent,
  formatRatio,
  potOddsRatio,
} from "@/lib/poker/pot-odds/core";
import { equityFromOuts } from "@/lib/poker/pot-odds/rule-of-two-four";
import { LearnTracker } from "./learn-tracker";

export default function PotOddsLearnPage() {
  const potBefore = 100;
  const bet = 50;
  const potFacing = potBefore + bet;
  const call = bet;
  const ratio = formatRatio(potOddsRatio(potFacing, call));
  const be = breakEvenEquityPercent(potFacing, call);
  const outs = 8;
  const flopTwo = equityFromOuts(outs, "flop_two_cards");
  const flopOne = equityFromOuts(outs, "flop_one_card");

  return (
    <>
      <LearnTracker />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
        <div>
          <Link
            href="/pot-odds"
            className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
          >
            ← Pot odds
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Pot odds and outs
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Assumptions: <strong className="font-medium text-stone-800 dark:text-stone-200">NLHE</strong>,{" "}
            <strong className="font-medium text-stone-800 dark:text-stone-200">full call</strong> (you can
            always match the bet; no all-in for less here),{" "}
            <strong className="font-medium text-stone-800 dark:text-stone-200">integer chips</strong>.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Facing a bet
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            When it is your turn, the <strong className="text-stone-800 dark:text-stone-200">pot facing you</strong> is everything in the middle before you put in your call—including your opponent’s bet. Your{" "}
            <strong className="text-stone-800 dark:text-stone-200">call</strong> is the amount you must add to continue (here, equal to the bet you are facing).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Pot odds (ratio)
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Pot odds are often written as{" "}
            <strong className="text-stone-800 dark:text-stone-200">(pot facing you) : (your call)</strong>, then simplified like a fraction. Example: pot was ${potBefore}, villain bets ${bet} → pot facing you is ${potFacing}, call is ${call} →{" "}
            <strong className="text-stone-800 dark:text-stone-200">{ratio}</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Break-even equity
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            The minimum chance you need to win the pot when you call (ignoring
            future streets and implied odds) is:
          </p>
          <p className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 font-mono text-sm text-stone-800 dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-200">
            call / (pot facing you + call)
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Same example: ${call} / (${potFacing} + ${call}) ≈{" "}
            <strong className="text-stone-800 dark:text-stone-200">{be}%</strong>{" "}
            (rounded).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Outs and rule of 2 / 4
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            An <strong className="text-stone-800 dark:text-stone-200">out</strong> is a card that likely gives you the best hand. Counting outs can be tricky; this module states outs in the question so you can practice the math.
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            <strong className="text-stone-800 dark:text-stone-200">Rule of 4</strong> (on the flop, two cards to come): rough equity ≈ outs × 4 (percent).{" "}
            <strong className="text-stone-800 dark:text-stone-200">Rule of 2</strong> (one card to come—flop if you only care about the turn, or on the turn for the river): rough equity ≈ outs × 2.
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Example with {outs} outs: ~{flopTwo}% with two cards to come, ~{flopOne}% with one card to come. These are <em>estimates</em>, not exact equities.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Call or fold (single street)
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Compare your <strong className="text-stone-800 dark:text-stone-200">estimated</strong> equity (from outs) to the{" "}
            <strong className="text-stone-800 dark:text-stone-200">break-even</strong> percentage. If your estimate is clearly above what you need, calling is reasonable on a chip-EV snapshot; if clearly below, folding is often right. Real play also uses implied odds, reads, and multi-street planning—this lesson isolates the arithmetic.
          </p>
        </section>

        <div className="pb-8">
          <Link
            href="/pot-odds/quiz"
            className="inline-flex rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Take the quiz
          </Link>
        </div>
      </main>
    </>
  );
}
