import Link from "next/link";
import { breakEvenEquityWithImpliedSnapshot } from "@/lib/poker/implied-odds/core";
import { breakEvenEquityPercent } from "@/lib/poker/pot-odds/core";
import { LearnTracker } from "./learn-tracker";

export default function ImpliedOddsLearnPage() {
  const potBefore = 100;
  const bet = 50;
  const potFacing = potBefore + bet;
  const call = bet;
  const immediateBe = breakEvenEquityPercent(potFacing, call);
  const impliedExtra = 100;
  const impliedBe = breakEvenEquityWithImpliedSnapshot(
    potFacing,
    call,
    impliedExtra,
  );

  return (
    <>
      <LearnTracker />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
        <div>
          <Link
            href="/implied-odds"
            className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
          >
            ← Implied odds
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Implied odds
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Assumptions:{" "}
            <strong className="font-medium text-stone-800 dark:text-stone-200">
              NLHE
            </strong>
            , integer chips. This page adds ideas on top of{" "}
            <Link
              href="/pot-odds/learn"
              className="font-medium text-emerald-800 underline dark:text-emerald-400"
            >
              pot odds and break-even equity
            </Link>
            .
          </p>
        </div>

        <section className="rounded-xl border border-stone-200 bg-stone-50/80 p-4 dark:border-stone-700 dark:bg-stone-900/40">
          <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-50">
            Prerequisites
          </h2>
          <ul className="mt-2 list-inside list-disc text-sm text-stone-600 dark:text-stone-400">
            <li>
              <Link
                href="/pot-odds/learn"
                className="font-medium text-emerald-800 underline dark:text-emerald-400"
              >
                Pot odds &amp; break-even %
              </Link>
            </li>
            <li>
              <Link
                href="/betting-basics/learn"
                className="font-medium text-emerald-800 underline dark:text-emerald-400"
              >
                Betting basics
              </Link>{" "}
              (optional)
            </li>
            <li>
              <Link
                href="/position/learn"
                className="font-medium text-emerald-800 underline dark:text-emerald-400"
              >
                Position
              </Link>{" "}
              (optional)
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Definition
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            <strong className="text-stone-800 dark:text-stone-200">
              Implied odds
            </strong>{" "}
            are about{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              money you can win on later streets
            </strong>{" "}
            when your draw hits—not only the chips already in the pot when you
            face the bet. You still use{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              immediate pot odds
            </strong>{" "}
            from the current pot and call size (see{" "}
            <code className="rounded bg-stone-100 px-1 font-mono text-xs dark:bg-stone-800">
              breakEvenEquityPercent
            </code>
            ) as the baseline; implied odds ask whether future winnings justify
            calling at a worse price today.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            When it matters
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Implied odds show up most with{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              drawing hands
            </strong>
            , especially toward the{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              nuts
            </strong>{" "}
            when stacks are{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              deep
            </strong>{" "}
            (villain has chips left to lose).{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              Position
            </strong>{" "}
            often helps you see more streets and realize value. At a heuristic
            level, villain{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              paying off
            </strong>{" "}
            strong hands matters—no HUD required; just don’t assume everyone
            stacks off lightly.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Teaching snapshot (round numbers)
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Pot was ${potBefore}, villain bets ${bet} → pot facing you ${potFacing},
            call ${call}. Immediate break-even equity (ignoring later streets) is
            about{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              {immediateBe}%
            </strong>{" "}
            from{" "}
            <code className="rounded bg-stone-100 px-1 font-mono text-xs dark:bg-stone-800">
              call / (pot facing + call)
            </code>
            .
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Suppose a simplified model says that{" "}
            <em>when you win at showdown</em> you expect an extra $
            {impliedExtra} on top of the current pot after your call (one lump
            sum—see code comments for limits of this). Then the snapshot formula
            is{" "}
            <code className="rounded bg-stone-100 px-1 font-mono text-xs dark:bg-stone-800">
              call / (pot facing + call + implied extra)
            </code>
            , about{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              {impliedBe}%
            </strong>{" "}
            here. That is only a classroom shortcut, not a full multi-street
            solver.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Caveats
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            It is easy to{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              overestimate
            </strong>{" "}
            implied odds: not every hit gets paid, runouts can kill action, and{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              multiway
            </strong>{" "}
            pots dilute how often you cleanly realize a big win.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Reverse implied odds (short)
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Sometimes when you improve you still lose a big pot or face ugly
            runouts—so the call is{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              less
            </strong>{" "}
            attractive than raw pot odds alone suggest. That rough idea is called{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              reverse implied odds
            </strong>
            .
          </p>
        </section>

        <div className="pb-8">
          <Link
            href="/implied-odds/quiz"
            className="inline-flex rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Take the quiz
          </Link>
        </div>
      </main>
    </>
  );
}
