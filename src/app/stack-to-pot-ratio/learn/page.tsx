import Link from "next/link";
import {
  sprOneDecimal,
  sprAfterHeroCallsBet,
} from "@/lib/poker/stack-to-pot-ratio/core";
import { LearnTracker } from "./learn-tracker";

export default function StackToPotRatioLearnPage() {
  const flopPot = 100;
  const effFlop = 900;
  const sprFlop = sprOneDecimal(effFlop, flopPot);

  const potBeforeBet = flopPot;
  const bet = 75;
  const heroStack = 900;
  const villainStack = 850;
  const after = sprAfterHeroCallsBet({
    potBeforeBet,
    bet,
    heroStack,
    villainStack,
  });

  return (
    <>
      <LearnTracker />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
        <div>
          <Link
            href="/stack-to-pot-ratio"
            className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
          >
            ← Stack-to-pot ratio
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Stack-to-pot ratio (SPR)
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Assumptions:{" "}
            <strong className="font-medium text-stone-800 dark:text-stone-200">
              NLHE
            </strong>
            ,{" "}
            <strong className="font-medium text-stone-800 dark:text-stone-200">
              integer chips
            </strong>
            , heads-up examples unless noted.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            What SPR is
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            <strong className="text-stone-800 dark:text-stone-200">
              Stack-to-pot ratio
            </strong>{" "}
            (SPR) is{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              effective stack ÷ current pot
            </strong>
            . The{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              effective stack
            </strong>{" "}
            is the smaller of the two relevant stacks in a heads-up pot—the most
            either player can lose to the other. In multiway pots, think about
            the stack you are actually playing against for the side of the pot
            you care about; the same fraction idea applies.
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Example at the start of flop betting: pot{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              ${flopPot}
            </strong>
            , effective stack{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              ${effFlop}
            </strong>{" "}
            → SPR ≈{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              {sprFlop}
            </strong>{" "}
            (one decimal). High SPR means many pot-sized bets still fit before
            stacks are gone; low SPR means the pot is already large compared
            with what is left.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Why it matters
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            SPR is a compact picture of how much{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              room
            </strong>{" "}
            is left relative to the pot. With{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              deep stacks
            </strong>{" "}
            (high SPR), later streets still matter: you can take lines that
            preserve flexibility (pot control, implied-odds draws, some folds).
            With{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              shallow stacks
            </strong>{" "}
            (low SPR), decisions slide toward{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              commitment
            </strong>
            : once chips go in, good-but-not-nut hands are harder to release
            because{" "}
            <Link
              href="/pot-odds"
              className="font-medium text-emerald-800 underline dark:text-emerald-400"
            >
              pot odds
            </Link>{" "}
            and the lack of future streets push you toward stacking off more
            often. This module stays conceptual—no solver frequencies.
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Draws and second-best hands connect to{" "}
            <Link
              href="/implied-odds"
              className="font-medium text-emerald-800 underline dark:text-emerald-400"
            >
              implied odds
            </Link>
            : high SPR makes “win a big stack when you hit” more plausible; low
            SPR caps how much you can win even when you make your hand.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Street by street: SPR usually falls
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Each time chips go in, the{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              pot grows
            </strong>{" "}
            and{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              remaining stacks shrink
            </strong>
            , so{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              SPR tends to drop
            </strong>{" "}
            as you move flop → turn → river. You are not “forced” to get in
            lighter only because SPR fell—but the same hand type often faces a
            more commitment-heavy decision later than it did when SPR was deep.
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Worked example (you call a flop bet): pot before villain’s bet{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              ${potBeforeBet}
            </strong>
            ; villain bets{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              ${bet}
            </strong>
            ; your stack before the call{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              ${heroStack}
            </strong>
            ; villain’s{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              ${villainStack}
            </strong>
            . Effective stack before the call is the minimum (
            {Math.min(heroStack, villainStack)}). After you call, the pot is{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              ${after.potAfter}
            </strong>{" "}
            and effective stack behind is{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              ${after.effectiveStackAfter}
            </strong>
            → SPR ≈{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              {after.sprAfterOneDecimal}
            </strong>
            . Compare that to the flop SPR ({sprFlop}) in the previous
            paragraph: one bet/call round moved you toward a lower SPR and a
            more “committed” geometry for the rest of the hand.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Rough buckets (memory aids only)
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Coaches sometimes use loose labels: very{" "}
            <strong className="text-stone-800 dark:text-stone-200">high</strong>{" "}
            SPR (for example ~10+ on the flop) → lots of play left;{" "}
            <strong className="text-stone-800 dark:text-stone-200">medium</strong>{" "}
            → standard postflop;{" "}
            <strong className="text-stone-800 dark:text-stone-200">low</strong>{" "}
            (only a few pot fractions left) → many strong one-pair hands and draws
            approach stack-off decisions faster. Game type, reads, and exact
            textures still dominate—use SPR as structure, not a rigid rule.
          </p>
        </section>

        <div className="pb-8">
          <Link
            href="/stack-to-pot-ratio/quiz"
            className="inline-flex rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Take the quiz
          </Link>
        </div>
      </main>
    </>
  );
}
