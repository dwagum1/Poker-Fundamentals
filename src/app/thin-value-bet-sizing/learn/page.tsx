import Link from "next/link";
import { LearnTracker } from "./learn-tracker";

function ScenarioCard({
  title,
  street,
  board,
  hero,
  pot,
  betFacing,
  position,
  note,
  answer,
}: {
  title: string;
  street: string;
  board: string;
  hero: string;
  pot: string;
  betFacing?: string;
  position: string;
  note: string;
  answer: string;
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-gradient-to-br from-stone-50 to-stone-100/80 p-4 shadow-sm dark:border-stone-700 dark:from-stone-900/60 dark:to-stone-950/40">
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200/80 pb-3 dark:border-stone-600">
        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-200">
          {street}
        </span>
        <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-50">
          {title}
        </h3>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-stone-200 bg-white/80 p-3 dark:border-stone-600 dark:bg-stone-900/50">
          <p className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
            Board
          </p>
          <p className="mt-1 font-mono text-lg text-stone-900 dark:text-stone-100">
            {board}
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white/80 p-3 dark:border-stone-600 dark:bg-stone-900/50">
          <p className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
            Your hand
          </p>
          <p className="mt-1 font-mono text-lg text-stone-900 dark:text-stone-100">
            {hero}
          </p>
        </div>
      </div>
      <dl className="mt-3 space-y-1 text-sm text-stone-700 dark:text-stone-300">
        <div className="flex justify-between gap-4">
          <dt className="text-stone-500 dark:text-stone-400">Pot</dt>
          <dd className="font-mono">{pot}</dd>
        </div>
        {betFacing ? (
          <div className="flex justify-between gap-4">
            <dt className="text-stone-500 dark:text-stone-400">Facing</dt>
            <dd className="font-mono">{betFacing}</dd>
          </div>
        ) : null}
        <div className="flex justify-between gap-4">
          <dt className="text-stone-500 dark:text-stone-400">Position</dt>
          <dd>{position}</dd>
        </div>
      </dl>
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">{note}</p>
      <p className="mt-2 rounded-md border border-emerald-200/80 bg-emerald-50/80 px-3 py-2 text-sm font-medium text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-100">
        Default teaching answer: {answer}
      </p>
    </div>
  );
}

export default function ThinValueBetSizingLearnPage() {
  return (
    <>
      <LearnTracker />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
        <div>
          <Link
            href="/thin-value-bet-sizing"
            className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
          >
            ← Thin value &amp; bet sizing (lite)
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Thin value &amp; bet sizing (lite)
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            NLHE heuristics for betting marginal made hands and following up on
            the turn. This is{" "}
            <strong className="text-stone-800 dark:text-stone-200">not</strong> a
            GTO solver — use these ideas with reads, table dynamics, and the
            other modules.
          </p>
        </div>

        <section className="rounded-xl border border-stone-200 bg-stone-50/80 p-4 dark:border-stone-700 dark:bg-stone-900/40">
          <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-50">
            Build on these first
          </h2>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Thin value and barrels sit on top of pricing and ranges. Skim
            anything that feels fuzzy:
          </p>
          <ul className="mt-2 list-inside list-disc text-sm text-emerald-800 dark:text-emerald-400">
            <li>
              <Link href="/pot-odds/learn" className="underline">
                Pot odds and outs
              </Link>{" "}
              — what villains pay to continue.
            </li>
            <li>
              <Link href="/stack-to-pot-ratio/learn" className="underline">
                Stack-to-pot ratio (SPR)
              </Link>{" "}
              — how much room is left to play for.
            </li>
            <li>
              <Link href="/betting-basics/learn" className="underline">
                Betting basics
              </Link>{" "}
              — how bets change the pot across streets.
            </li>
            <li>
              <Link href="/bluffing-fundamentals/learn" className="underline">
                Bluffing fundamentals
              </Link>{" "}
              — fold equity; the flip side of value betting.
            </li>
            <li>
              <Link href="/ranges-and-texture/learn" className="underline">
                Ranges &amp; board texture
              </Link>{" "}
              — who the board tends to favor.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Thin value
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            A{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              thin value bet
            </strong>{" "}
            is still a value bet: you expect worse hands to call often enough
            that betting earns more than checking — even though you lose to some
            of the hands villain continues with. At a lite level: you need enough
            calls from worse relative to folds from worse and value raises from
            better; you are not solving exact frequencies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Second barrel (double barrel)
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            A{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              second barrel
            </strong>{" "}
            means you bet the flop and bet again on the turn. It is{" "}
            <em>not</em> automatically a bluff. With a marginal made hand, the
            turn bet can be thin value, can protect against free cards for draws,
            or can apply pressure — depending on texture and how your range
            interacts with villain&apos;s. When you are ahead but vulnerable,
            checking the turn gives a free card; a small follow-up sometimes
            charges draws and gets called by worse pairs or floats.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Small bet vs check
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            A{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              small bet
            </strong>{" "}
            can beat checking when a large bet would fold out the marginal hands
            you want to get value from. You risk less when you are behind, and
            you still deny equity or extract from worse. Checking is often
            reasonable when the runout is awful for your range, you want pot
            control, or you are deliberately trapping against an aggressive
            opponent who stabs when checked to — all table-dependent.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Scenario snapshots
          </h2>
          <ScenarioCard
            title="Second barrel for protection / thin value"
            street="Turn"
            board="9♥ 7♦ 2♣ — K♠"
            hero="K♦ T♦"
            pot="You bet flop; villain called. Pot 80, villain checks."
            position="In position"
            note="Top pair on a board that still has straight draws. A small turn bet often gets called by worse kings, nines, and floats; checking gives a free card to hands that need it."
            answer="Often a small bet — mix of thin value and protection; size down if the table is sticky or the king scared worse off."
          />
          <ScenarioCard
            title="River thin value"
            street="River"
            board="J♠ 8♥ 3♦ 2♣ Q♠"
            hero="J♣ T♣"
            pot="120, villain checks"
            position="In position"
            note="Second pair after a blank river. Villain can have missed draws and weaker jacks; they also sometimes have a better jack or queen. A small bet targets worse pairs and busted draws without committing your stack."
            answer="Small value bet or check behind vs unknowns — many players default to a small stab when villain’s check looks weak; fold to large check-raises without reads."
          />
        </section>

        <section className="rounded-xl border border-stone-200 bg-stone-50/80 p-4 text-sm text-stone-600 dark:border-stone-700 dark:bg-stone-900/40 dark:text-stone-400">
          <p>
            These lessons are teaching defaults and vocabulary. Real spots depend
            on stakes, stack depth, and opponent — not on memorizing solver
            outputs.
          </p>
        </section>

        <div className="pb-8">
          <Link
            href="/thin-value-bet-sizing/quiz"
            className="inline-flex rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Take the quiz (10 questions)
          </Link>
        </div>
      </main>
    </>
  );
}
