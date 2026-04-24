import Link from "next/link";
import { LearnTracker } from "./learn-tracker";

export default function RangesTextureLearnPage() {
  return (
    <>
      <LearnTracker />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
        <div>
          <Link
            href="/ranges-and-texture"
            className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
          >
            ← Ranges &amp; board texture
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Ranges &amp; board texture
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            NLHE fundamentals: vocabulary and heuristics only—no exact combo
            math or GTO frequencies in this lesson.
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
              — who acts when shapes how wide ranges can be.
            </li>
            <li>
              <Link href="/starting-hands/learn" className="underline">
                Starting hands
              </Link>{" "}
              — notation and strength bands for your own preflop range.
            </li>
            <li>
              <Link href="/preflop-aggression/learn" className="underline">
                Preflop aggression ladder
              </Link>{" "}
              — open, iso, 3-bet, and 4-bet vocabulary tied to position.
            </li>
            <li>
              <Link href="/pot-odds/learn" className="underline">
                Pot odds and outs
              </Link>{" "}
              — when draws are live on wet boards, price matters.
            </li>
            <li>
              <Link href="/bluffing-fundamentals/learn" className="underline">
                Bluffing fundamentals
              </Link>{" "}
              — pressure must fit a believable story on the runout.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Why ranges matter
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            You rarely know villain’s exact two cards. Instead you hold a{" "}
            <strong className="text-stone-800 dark:text-stone-200">range</strong>
            : the set of hands that still make sense given their{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              position
            </strong>
            , the action so far, and their tendencies. As streets advance, you
            narrow that set—hands that would have taken different lines drop
            out.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Position shapes ranges
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Early seats open{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              tighter
            </strong>{" "}
            ranges (fewer weak hands). The button and late position can open{" "}
            <strong className="text-stone-800 dark:text-stone-200">wider</strong>
            —more suited connectors, weak aces, and steals—because fewer players
            act behind. That changes which flops “hit” the aggressor.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Board texture (coarse tags)
          </h2>
          <ul className="list-inside list-disc space-y-2 text-sm text-stone-600 dark:text-stone-400">
            <li>
              <strong className="text-stone-800 dark:text-stone-200">Dry</strong>{" "}
              — few straight/flush combinations; many hands miss (e.g.{" "}
              <span className="font-mono text-stone-800 dark:text-stone-200">
                K-7-2
              </span>{" "}
              rainbow).
            </li>
            <li>
              <strong className="text-stone-800 dark:text-stone-200">Wet</strong>{" "}
              / coordinated — lots of draws and strong made hands plausible (e.g.{" "}
              <span className="font-mono text-stone-800 dark:text-stone-200">
                9-T-J
              </span>{" "}
              two-tone).
            </li>
            <li>
              <strong className="text-stone-800 dark:text-stone-200">
                Monotone
              </strong>{" "}
              — three cards of one suit; flush draws and made flushes enter
              everyone’s mind.
            </li>
            <li>
              <strong className="text-stone-800 dark:text-stone-200">Paired</strong>{" "}
              — full houses and trips become more believable for someone who
              continued.
            </li>
            <li>
              <strong className="text-stone-800 dark:text-stone-200">
                High vs low
              </strong>{" "}
              — a{" "}
              <span className="font-mono text-stone-800 dark:text-stone-200">
                K-Q-4
              </span>{" "}
              flop hits different holdings than{" "}
              <span className="font-mono text-stone-800 dark:text-stone-200">
                5-4-2
              </span>
              .
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Range vs board (heuristic)
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Ask:{" "}
            <em>
              Does this runout connect harder with the preflop raiser’s typical
              range or the caller’s?
            </em>{" "}
            Example: on{" "}
            <span className="font-mono text-stone-800 dark:text-stone-200">
              K-7-2
            </span>{" "}
            rainbow, the raiser often has more top-pair-type hands; the caller
            may have more middling pairs and suited stuff that missed. This is
            a{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              story
            </strong>
            , not proof—specific reads and sizing still matter.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Combos (intuition only)
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            A given{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              offsuit
            </strong>{" "}
            combo like{" "}
            <span className="font-mono text-stone-800 dark:text-stone-200">
              AKo
            </span>{" "}
            can be dealt in more ways than one exact{" "}
            <span className="font-mono text-stone-800 dark:text-stone-200">
              AA
            </span>{" "}
            pairing—so “how often they have it” is not just hand names, it’s
            multiplicity. You do not need exact counts at this level; just know
            ranges are built from{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              combinations
            </strong>
            , not one card.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Link to bluffing
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Bluffs land more often when the board and betting line represent
            strong hands that are still in{" "}
            <strong className="text-stone-800 dark:text-stone-200">your</strong>{" "}
            plausible range. If the texture smashes their range and misses
            yours, pure bluffs get punished more often—tighten up or choose
            semi-bluffs with equity when you can.
          </p>
        </section>

        <div className="pb-8">
          <Link
            href="/ranges-and-texture/quiz"
            className="inline-flex rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Take the quiz
          </Link>
        </div>
      </main>
    </>
  );
}
