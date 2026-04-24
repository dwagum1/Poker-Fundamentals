import Link from "next/link";
import { NineMaxTable } from "@/components/position/nine-max-table";
import {
  postflopActionOrder,
  preflopActionOrder,
  seatLabel,
} from "@/lib/poker/position/nine-max";
import { LearnTracker } from "./learn-tracker";

export default function PositionLearnPage() {
  const pf = preflopActionOrder();
  const po = postflopActionOrder();

  return (
    <>
      <LearnTracker />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
        <div>
          <Link
            href="/position"
            className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
          >
            ← Position
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Table position
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Full-ring (9-handed) basics. This module assumes{" "}
            <strong className="font-semibold text-stone-800 dark:text-stone-200">
              all nine players are dealt in
            </strong>{" "}
            so acting order is straightforward. Real cardrooms add edge cases
            (empty seats, missed blinds, dead button) — not covered here.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Why position matters
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Players who act later see more decisions before committing chips.
            On later streets, “in position” (IP) usually means you act{" "}
            <strong className="font-medium text-stone-800 dark:text-stone-200">
              last
            </strong>{" "}
            on that street — you get more information than opponents who must
            act first.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Seat map (clockwise from the button)
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            The dealer button (BTN) moves each hand. Blinds post to start the
            action. On-screen, BTN is drawn at the bottom; seats continue
            clockwise: SB, BB, then UTG through CO.
          </p>
          <NineMaxTable />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Glossary
          </h2>
          <dl className="grid gap-2 text-sm text-stone-600 dark:text-stone-400">
            <div>
              <dt className="font-medium text-stone-800 dark:text-stone-200">
                BTN
              </dt>
              <dd>Dealer button — usually acts last preflop (before blinds).</dd>
            </div>
            <div>
              <dt className="font-medium text-stone-800 dark:text-stone-200">
                SB / BB
              </dt>
              <dd>Small blind and big blind — forced bets to start the pot.</dd>
            </div>
            <div>
              <dt className="font-medium text-stone-800 dark:text-stone-200">
                UTG … CO
              </dt>
              <dd>
                Under-the-gun through cutoff — named spots around the table;
                CO is one seat before the button.
              </dd>
            </div>
          </dl>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Preflop order (first to last)
          </h2>
          <ol className="list-decimal space-y-1 pl-5 text-sm text-stone-600 dark:text-stone-400">
            {pf.map((id) => (
              <li key={id}>{seatLabel(id)}</li>
            ))}
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Postflop order (first to last)
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            With all players in the hand, the first player to act on the flop
            is the small blind (or first active seat clockwise from the button).
            The button acts last on each postflop street — the button “has
            position” when everyone is in.
          </p>
          <ol className="list-decimal space-y-1 pl-5 text-sm text-stone-600 dark:text-stone-400">
            {po.map((id) => (
              <li key={id}>{seatLabel(id)}</li>
            ))}
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Heads-up on the flop
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            When only two players see the flop, the one who acts{" "}
            <strong className="font-medium text-stone-800 dark:text-stone-200">
              last
            </strong>{" "}
            on each postflop street is “in position.” Compare the two seats using
            the postflop order list above — whoever appears later in that list
            has position.
          </p>
        </section>

        <div className="flex flex-col gap-4 pb-8">
          <Link
            href="/position/quiz"
            className="inline-flex w-fit rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Take the quiz
          </Link>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Next:{" "}
            <Link
              href="/position/learn/multiway"
              className="font-medium text-emerald-800 underline dark:text-emerald-400"
            >
              Multiway flops
            </Link>{" "}
            (three or more players).
          </p>
        </div>
      </main>
    </>
  );
}
