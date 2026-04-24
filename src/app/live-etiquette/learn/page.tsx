import Link from "next/link";
import { LearnTracker } from "./learn-tracker";

export default function LiveEtiquetteLearnPage() {
  return (
    <>
      <LearnTracker />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
        <div>
          <Link
            href="/live-etiquette"
            className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
          >
            ← Live table etiquette
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Live table etiquette
          </h1>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            General education for live cash games.{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              House rules and floor decisions vary by cardroom
            </strong>
            — when in doubt, ask the dealer before you act.
          </p>
        </div>

        <section className="rounded-xl border border-stone-200 bg-stone-50/80 p-4 dark:border-stone-700 dark:bg-stone-900/40">
          <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-50">
            Related module
          </h2>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Vocabulary for checks, calls, and raises (often online-first) lives
            in{" "}
            <Link
              href="/betting-basics/learn"
              className="text-emerald-800 underline dark:text-emerald-400"
            >
              Betting basics
            </Link>
            — live etiquette is about how you execute those actions at the felt.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Protecting your cards and the “one card” problem
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            In live play your hole cards are physical objects. Keep them low on
            the table where the dealer can see they are live, and use a card cap
            or single chip on top if the room suggests it. Lifting cards far off
            the felt invites accidental exposure and slows the game.
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Deliberately flashing one card to a neighbor—or letting one card
            peek while the hand is still going—can change how others act. Even
            when it is not malicious, it is unfair to players who do not have that
            information. If a card is exposed by accident, pause and let the
            dealer call the floor if needed; do not argue across the table.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Action in turn
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Live poker goes seat by seat. Acting out of turn leaks information:
            players still to act may fold, raise, or change plans based on what
            you did early. Stay off your phone enough to know when action is on
            you, and act within a reasonable time so the table does not stall.
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            If you tap “check” and then realize there was a bet in front of you,
            you have already given a physical signal; many rooms treat that
            seriously or involve the floor. The habit that prevents the drama is
            to look at all bets before you move or speak.
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Clear verbal declarations (“call,” “raise to 40”) are often binding
            before chips move—another reason to speak deliberately and only when
            it is your turn.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            String bets, chip motion, and splashing
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            A string bet is putting chips in the pot in more than one forward
            motion—or pushing calling chips and then adding more without having
            announced a raise first. It looks like you are watching for a
            reaction before committing the full amount, which is not allowed in
            most live rooms.
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Safer habits: announce your total raise clearly, or move the full
            raise in one motion (exact enforcement depends on the house). Avoid
            ambiguous hand motions toward your stack that could be read as a bet
            or a forward motion.
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Splashing the pot—throwing chips in a messy pile—forces the dealer to
            recount and invites mistakes. Slide stacks neatly in front of your
            cards or in the betting area the room uses, and let the dealer pull
            them into the pot.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Small courtesies
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Do not discuss the live hand in a way that steers someone still in
            the pot. At showdown, keep your cards identifiable until the dealer
            awards the pot—mucking a winner is a painful avoidable mistake.
            Rabbit-hunting (seeing runout cards that were not dealt) is often
            disallowed or frowned on because it slows the game and needles
            losers.
          </p>
        </section>

        <div className="pb-8">
          <Link
            href="/live-etiquette/quiz"
            className="inline-flex rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Take the quiz (10 questions)
          </Link>
        </div>
      </main>
    </>
  );
}
