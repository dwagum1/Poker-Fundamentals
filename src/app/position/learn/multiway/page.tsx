import Link from "next/link";
import { MultiwayHubTracker } from "../../multiway-hub-tracker";
import { MultiwayLearnTracker } from "../multiway-learn-tracker";
import {
  activePostflopOrder,
  actsFirstAmongActive,
  closesActionAmongActive,
} from "@/lib/poker/position/multiway";
import { seatLabel } from "@/lib/poker/position/nine-max";

const exampleFlop = ["bb", "hj", "btn"] as const;

export default function PositionMultiwayLearnPage() {
  const ordered = activePostflopOrder(exampleFlop);
  const first = actsFirstAmongActive(exampleFlop);
  const last = closesActionAmongActive(exampleFlop);

  return (
    <>
      <MultiwayHubTracker />
      <MultiwayLearnTracker />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
        <div>
          <Link
            href="/position"
            className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
          >
            ← Position
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Multiway flops
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Same 9-max rules as the basics module: everyone who is still in the
            hand uses the same postflop order—you just ignore folded seats.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Why this is different from heads-up
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            With two players, one acts first (out of position) and one acts
            last (in position). With three or more, someone acts first, someone
            acts last, and players in the middle are between those extremes.
            There is not a single “IP player” for the whole table—think{" "}
            <strong className="font-medium text-stone-800 dark:text-stone-200">
              first, middle, last
            </strong>{" "}
            among the players who actually see the flop.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            How to read order with several players
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Take the full postflop order (SB first … BTN last) and keep only the
            seats that are still in the pot. Their relative order does not
            change.
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            <strong className="font-medium text-stone-800 dark:text-stone-200">
              First to act
            </strong>{" "}
            among them is the most out of position.{" "}
            <strong className="font-medium text-stone-800 dark:text-stone-200">
              Last to act
            </strong>{" "}
            closes the action on that street (often what people mean by “has
            position” in a multiway pot).
          </p>
        </section>

        <section className="space-y-3 rounded-xl border border-stone-200 bg-stone-50/80 p-4 dark:border-stone-700 dark:bg-stone-900/40">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Worked example
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Only BB, HJ, and BTN see the flop. Postflop order among just those
            three:
          </p>
          <ol className="list-decimal space-y-1 pl-5 text-sm text-stone-700 dark:text-stone-300">
            {ordered.map((id) => (
              <li key={id}>{seatLabel(id)}</li>
            ))}
          </ol>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            First on the flop:{" "}
            <strong className="text-stone-900 dark:text-stone-100">
              {first ? seatLabel(first) : "—"}
            </strong>
            . Last (closes):{" "}
            <strong className="text-stone-900 dark:text-stone-100">
              {last ? seatLabel(last) : "—"}
            </strong>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            IP vs one opponent in a multiway pot
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Between any two players who are both in the hand, whoever would act
            <em> later </em>
            on that street if only those two were playing is “in position”
            versus the other. That comparison uses the same seat order as
            heads-up—it does not depend on how many other players are in.
          </p>
        </section>

        <div className="pb-8">
          <Link
            href="/position/quiz-multiway"
            className="inline-flex rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Take the multiway quiz
          </Link>
        </div>
      </main>
    </>
  );
}
