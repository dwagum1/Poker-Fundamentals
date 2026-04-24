import Link from "next/link";
import { fullBuyInsFromRoll } from "@/lib/poker/bankroll-management/quiz";
import { LearnTracker } from "./learn-tracker";

export default function BankrollManagementLearnPage() {
  const roll = 2000;
  const maxBuyIn = 100;
  const buyIns = fullBuyInsFromRoll(roll, maxBuyIn);

  return (
    <>
      <LearnTracker />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
        <div>
          <Link
            href="/bankroll-management"
            className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
          >
            ← Bankroll management
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Bankroll management
          </h1>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            This is general education, not personalized financial advice.
            Guidelines vary by game type, format, and your own risk tolerance.
          </p>
        </div>

        <section className="rounded-xl border border-stone-200 bg-stone-50/80 p-4 dark:border-stone-700 dark:bg-stone-900/40">
          <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-50">
            Related modules
          </h2>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Bet sizes scale with stakes—see{" "}
            <Link href="/betting-basics/learn" className="text-emerald-800 underline dark:text-emerald-400">
              Betting basics
            </Link>{" "}
            for how money moves in a hand.
          </p>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            For tilt, focus, and session habits (separate from buy-in math), see{" "}
            <Link
              href="/mental-game/learn"
              className="text-emerald-800 underline dark:text-emerald-400"
            >
              Mental game
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            What a bankroll is
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            A{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              bankroll
            </strong>{" "}
            is money you set aside for poker—separate from rent, food, and
            emergencies. When you play with money you truly need, you play with{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              scared money
            </strong>
            : fear of losing can make you pass good spots or chase losses
            poorly. A real roll lets you focus on decisions instead of survival.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Variance
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Poker has luck in the short run. Even strong players hit{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              downswings
            </strong>{" "}
            that are normal, not proof you forgot how to play. A cushion of
            buy-ins helps you ride those swings without going broke from
            ordinary variance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Buy-ins (cash, 100bb framing)
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            A common way to think about cash games is: how many{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              max buy-ins
            </strong>{" "}
            does my roll cover? Example: roll ${roll}, table max ${maxBuyIn} →{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              {buyIns} full buy-ins
            </strong>{" "}
            (whole stacks only; ignore leftover chips for this mental model).
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Books and training often cite{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              wide ranges
            </strong>{" "}
            for NLHE cash—on the order of many buy-ins (for example roughly 20–40
            or more) as a{" "}
            <em>starting heuristic</em> for serious play, depending on how
            aggressively you want to move up and how swingy your game is. Treat
            these as starting points to research, not laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Moving up and shot-taking
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            While learning, smaller stakes make mistakes cheaper.{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              Moving up
            </strong>{" "}
            with your <em>entire</em> roll at the next limit is very different
            from taking a small{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              shot
            </strong>{" "}
            (a few buy-ins) when you are rolled for your main game and the game
            is good.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Session habits
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Some players use a{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              stop-loss
            </strong>{" "}
            (quit after losing a planned amount) or simply step away when{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              tilt
            </strong>{" "}
            clouds judgment. These are{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              discipline tools
            </strong>
            —they do not erase variance or guarantee profit, but they can limit
            damage on bad days.
          </p>
        </section>

        <div className="pb-8">
          <Link
            href="/bankroll-management/quiz"
            className="inline-flex rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Take the quiz
          </Link>
        </div>
      </main>
    </>
  );
}
