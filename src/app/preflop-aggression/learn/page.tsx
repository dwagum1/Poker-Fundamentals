import Link from "next/link";
import { LearnTracker } from "./learn-tracker";

export default function PreflopAggressionLearnPage() {
  return (
    <>
      <LearnTracker />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
        <div>
          <Link
            href="/preflop-aggression"
            className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
          >
            ← Preflop aggression
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Preflop aggression ladder
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            NLHE fundamentals: names for raises, how position shapes how wide
            you can be, and how ranges tell a story—no solver charts here.
          </p>
        </div>

        <section className="rounded-xl border border-stone-200 bg-stone-50/80 p-4 dark:border-stone-700 dark:bg-stone-900/40">
          <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-50">
            Build on these first
          </h2>
          <ul className="mt-2 list-inside list-disc text-sm text-emerald-800 dark:text-emerald-400">
            <li>
              <Link href="/position/learn" className="underline">
                Position
              </Link>{" "}
              — who acts behind you caps how wide you can open or iso
              profitably.
            </li>
            <li>
              <Link href="/starting-hands/learn" className="underline">
                Starting hands
              </Link>{" "}
              — notation and strength bands for the hands in your ranges.
            </li>
            <li>
              <Link href="/ranges-and-texture/learn" className="underline">
                Ranges &amp; board texture
              </Link>{" "}
              — a range is the set of hands that still fit the action; preflop
              aggression is how that story starts.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Open raise (open)
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            An{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              open
            </strong>{" "}
            is the{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              first voluntary raise
            </strong>{" "}
            preflop: nobody has raised yet (only folds or limps may have
            happened). It puts in chips, often to thin the field and define your
            entering range.
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            <strong className="text-stone-800 dark:text-stone-200">
              Position
            </strong>{" "}
            drives width: from{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              early seats
            </strong>{" "}
            (UTG, MP), many players still act, so sound opens are usually{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              tighter
            </strong>
            . From the{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              button
            </strong>{" "}
            or late position, fewer people are left to react, so you can
            justify a{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              wider
            </strong>{" "}
            open—more suited connectors, weak aces, and steals—without
            pretending every spot is identical.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Isolation raise (iso)
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            When one or more players{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              limp
            </strong>{" "}
            (call the big blind preflop), a raise designed to play{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              heads-up
            </strong>{" "}
            (or nearly) against the limper—often with{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              initiative
            </strong>
            —is called an{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              isolation
            </strong>{" "}
            or{" "}
            <strong className="text-stone-800 dark:text-stone-200">iso</strong>.
            You still need a sensible range: iso is not “any two cards,” and it
            is usually easier from{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              late position
            </strong>{" "}
            when fewer players can wake up behind you.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            3-bet
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Counting raises: open is the first raise; a{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              3-bet
            </strong>{" "}
            is the{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              second raise
            </strong>
            —a re-raise facing exactly one prior raise. It is a major
            inflection: pot grows fast and the 3-bettor’s{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              range
            </strong>{" "}
            is anchored in{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              strong value
            </strong>
            , with room (especially vs late opens) for{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              lighter 3-bets
            </strong>{" "}
            as bluffs or semi-bluffs depending on reads and stack depth—at this
            level, remember the mix exists without memorizing frequencies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            4-bet
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            A{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              4-bet
            </strong>{" "}
            is the{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              third raise
            </strong>
            —a re-raise after someone 3-bet. Beginners should picture a{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              very strong core
            </strong>{" "}
            (premium pairs, AK, etc.). Advanced play adds occasional{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              bluff 4-bets
            </strong>{" "}
            as an idea; you do not need a chart to start—just know 4-bet pots
            are small and ranges are usually heavy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Ladder and ranges
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Each step—open (or iso), 3-bet, 4-bet—
            <strong className="text-stone-800 dark:text-stone-200">
              {" "}
              updates the story
            </strong>{" "}
            of which hands make sense. Later position tends to produce{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              wider first-in ranges
            </strong>
            ; facing another raise usually{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              narrows
            </strong>{" "}
            what people continue with unless stacks or opponents are extreme.
            The last preflop aggressor who gets called usually takes the{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              betting lead
            </strong>{" "}
            on the flop—connecting this lesson to postflop range work.
          </p>
        </section>

        <div className="pb-8">
          <Link
            href="/preflop-aggression/quiz"
            className="inline-flex rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Take the quiz
          </Link>
        </div>
      </main>
    </>
  );
}
