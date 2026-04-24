import Link from "next/link";
import { minFoldPercentForPureBluff } from "@/lib/poker/bluffing-fundamentals/quiz";
import { LearnTracker } from "./learn-tracker";

export default function BluffingFundamentalsLearnPage() {
  const potBefore = 100;
  const bet = 50;
  const minFold = minFoldPercentForPureBluff(potBefore, bet);

  return (
    <>
      <LearnTracker />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
        <div>
          <Link
            href="/bluffing-fundamentals"
            className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
          >
            ← Bluffing fundamentals
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Bluffing fundamentals
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Assumptions:{" "}
            <strong className="font-medium text-stone-800 dark:text-stone-200">
              NLHE
            </strong>
            , single street when we talk about pure bluff math,{" "}
            <strong className="font-medium text-stone-800 dark:text-stone-200">
              integer chips
            </strong>
            .
          </p>
        </div>

        <section className="rounded-xl border border-stone-200 bg-stone-50/80 p-4 dark:border-stone-700 dark:bg-stone-900/40">
          <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-50">
            Build on these first
          </h2>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Bluffing sits on top of aggression and pricing. If any of this feels
            fuzzy, skim these modules first:
          </p>
          <ul className="mt-2 list-inside list-disc text-sm text-emerald-800 dark:text-emerald-400">
            <li>
              <Link href="/pot-odds/learn" className="underline">
                Pot odds and outs
              </Link>{" "}
              — break-even percentages and the price of continuing.
            </li>
            <li>
              <Link href="/betting-basics/learn" className="underline">
                Betting basics
              </Link>{" "}
              — check, call, fold, raise and how bets change the pot.
            </li>
            <li>
              <Link href="/position/learn" className="underline">
                Position
              </Link>{" "}
              — who acts last and why it changes pressure.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Bluff vs semi-bluff
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            A{" "}
            <strong className="text-stone-800 dark:text-stone-200">bluff</strong>{" "}
            is a bet or raise where you often{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              win the pot when your opponent folds
            </strong>
            . A{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              pure bluff
            </strong>{" "}
            has little or no equity when called—you are relying mainly on{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              fold equity
            </strong>
            . A{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              semi-bluff
            </strong>{" "}
            still wants folds, but you also have{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              real equity when called
            </strong>{" "}
            (for example a strong draw). Semi-bluffs can be reasonable even
            against players who call more, because you sometimes win at
            showdown.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Fold equity
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Fold equity is{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              how often you expect your opponent to fold
            </strong>{" "}
            to your bet or raise. It is not a guarantee—it is an estimate based
            on tendencies, board texture, your line, and sizing. The more
            often they fold, the more bluffing prints; the more they stubbornly
            continue, the harder pure bluffs become.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Break-even fold frequency (pure bluff)
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Suppose the pot is{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              P
            </strong>{" "}
            before you bet, and you risk{" "}
            <strong className="text-stone-800 dark:text-stone-200">B</strong>{" "}
            as a{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              pure bluff
            </strong>{" "}
            (no equity when called). If villain folds, you win P. If villain
            calls, you lose B. The break-even{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              fold frequency
            </strong>{" "}
            (as a fraction) is:
          </p>
          <p className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 font-mono text-sm text-stone-800 dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-200">
            B / (P + B)
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            As a percent, multiply by 100 and round for quick practice. Example:
            P = ${potBefore}, B = ${bet} → about{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              {minFold}%
            </strong>{" "}
            of the time villain must fold for the bluff to break even on that
            street. This mirrors pot-odds thinking: you are pricing their
            continue.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Table context
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            <strong className="text-stone-800 dark:text-stone-200">
              Position
            </strong>{" "}
            matters because acting last gives information and cleaner ways to
            tell a story across streets.{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              Opponent type
            </strong>{" "}
            matters: calling stations fold rarely, so pure bluffs need stronger
            spots.{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              Board texture
            </strong>{" "}
            matters at a basic level: does your betting line look like a hand
            that wants to get stacks in, or does it look random?
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Blockers (short note)
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Cards in your hand can{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              block
            </strong>{" "}
            some combinations of very strong hands your opponent could hold.
            That can make a bluff slightly more or less credible. At
            fundamentals level, just know blockers exist; detailed combo counting
            comes later.
          </p>
        </section>

        <div className="pb-8">
          <Link
            href="/bluffing-fundamentals/quiz"
            className="inline-flex rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Take the quiz
          </Link>
        </div>
      </main>
    </>
  );
}
