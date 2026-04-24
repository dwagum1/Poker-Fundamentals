import Link from "next/link";
import { LearnTracker } from "@/components/betting-basics/learn-tracker";

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

export default function BettingBasicsLearnPage() {
  return (
    <>
      <LearnTracker />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
        <div>
          <Link
            href="/betting-basics"
            className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
          >
            ← Betting basics
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Betting basics
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            NLHE fundamentals: what each action means and when it is usually
            reasonable. This is <strong className="text-stone-800 dark:text-stone-200">not</strong> a GTO solver — combine these habits with volume,
            reads, and the other modules below.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            The four actions
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-stone-600 dark:text-stone-400">
            <li>
              <strong className="text-stone-800 dark:text-stone-200">Check</strong>{" "}
              — pass when <em>no bet</em> is facing you. Illegal if there is a bet
              to call.
            </li>
            <li>
              <strong className="text-stone-800 dark:text-stone-200">Call</strong>{" "}
              — match the current bet to continue.
            </li>
            <li>
              <strong className="text-stone-800 dark:text-stone-200">Fold</strong>{" "}
              — surrender the pot; you pay nothing more.
            </li>
            <li>
              <strong className="text-stone-800 dark:text-stone-200">Raise</strong>{" "}
              — increase the price (after a bet, a raise is a larger increment;
              preflop open is often called a “bet”). Value raises build the pot
              with strong hands; raises as semi-bluffs add fold equity.
            </li>
          </ul>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Sizing is a whole topic — here, think “bigger for value or protection,
            smaller for cheap showdowns or bluffs,” not always min-raising.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            A simple checklist
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-stone-600 dark:text-stone-400">
            <li>
              <strong className="text-stone-800 dark:text-stone-200">
                Hand vs board
              </strong>{" "}
              — What do you have (pair, draw, air)? See{" "}
              <Link
                href="/hand-rankings/learn"
                className="font-medium text-emerald-800 underline dark:text-emerald-400"
              >
                Hand rankings
              </Link>
              .
            </li>
            <li>
              <strong className="text-stone-800 dark:text-stone-200">
                Relative strength
              </strong>{" "}
              — On this texture, is your hand ahead of a typical continuing range
              or chasing?
            </li>
            <li>
              <strong className="text-stone-800 dark:text-stone-200">Price</strong>{" "}
              — If facing a bet, compare rough equity to break-even from{" "}
              <Link
                href="/pot-odds/learn"
                className="font-medium text-emerald-800 underline dark:text-emerald-400"
              >
                Pot odds
              </Link>
              .
            </li>
            <li>
              <strong className="text-stone-800 dark:text-stone-200">
                Position
              </strong>{" "}
              — In position you can check behind, control size, and bluff cheaper;
              out of position you decide first. See{" "}
              <Link
                href="/position/learn"
                className="font-medium text-emerald-800 underline dark:text-emerald-400"
              >
                Position
              </Link>
              .
            </li>
            <li>
              <strong className="text-stone-800 dark:text-stone-200">Preflop</strong>{" "}
              — Stronger preflop hands (
              <Link
                href="/starting-hands/learn"
                className="font-medium text-emerald-800 underline dark:text-emerald-400"
              >
                Starting hands
              </Link>
              ) usually support more postflop barrels; weak starters often want
              smaller pots.
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Flop scenarios
          </h2>
          <ScenarioCard
            title="Flush draw, good pot odds"
            street="Flop"
            board="A♠ K♠ 7♥"
            hero="Q♠ J♠"
            pot="80 in the middle, villain bets 20"
            betFacing="Call 20 (pot facing you: 100)"
            position="In position (button vs BB)"
            note="You have a strong flush draw (many outs). Rule of 4 gives a rough equity ballpark with two cards to come."
            answer="Call — equity often exceeds the price; raising is possible too as a semi-bluff."
          />
          <ScenarioCard
            title="Dry board, weak equity"
            street="Flop"
            board="K♦ 7♠ 2♣"
            hero="6♥ 5♥"
            pot="40, villain checks"
            position="In position"
            note="No pair, no real draw. Opponent showed weakness but your hand rarely wins at showdown."
            answer="Check — take a free card; betting as a bluff is possible but checking is a clean default to learn."
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Turn — barrier cards
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            A <strong className="text-stone-800 dark:text-stone-200">barrier</strong>{" "}
            turn is one that shifts who is favored — e.g. a flush completes or an
            overcard hits. A flop call with a draw can become a turn fold if the
            price is bad and your outs are dirty.
          </p>
          <ScenarioCard
            title="Draw gets expensive"
            street="Turn"
            board="J♥ T♦ 3♠ — 2♥"
            hero="9♥ 8♥"
            pot="120, villain bets 80"
            betFacing="Call 80 (pot facing you: 200)"
            position="Out of position"
            note="Open-ender still has outs, but one-card equity uses rule of 2; villain’s large bet demands much higher equity."
            answer="Often fold without reads — the turn raised the price and may have improved villain’s range."
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            River — bluff catchers
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            With a <strong className="text-stone-800 dark:text-stone-200">bluff catcher</strong>, you beat bluffs but lose to value. Pot odds tell you the
            minimum bluff frequency needed; hand reading tells you if villain
            actually has enough bluffs.
          </p>
          <ScenarioCard
            title="Thin call vs polarized line"
            street="River"
            board="8♠ 7♥ 3♦ K♣ 2♠"
            hero="K♥ T♥"
            pot="200, villain bets 50"
            betFacing="Call 50 (pot facing you: 250)"
            position="In position"
            note="You have top pair (King on this board) with a middling kicker. Villain triple-barreled — strong value is possible, but you get a good price."
            answer="Player-dependent — with no reads, many tables fold; with reads that villain over-bluffs, call. Teaching default here: lean fold versus unknowns when the line is very strong."
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Multi-street thread
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Same hand across streets — earlier decisions limit later ones.
          </p>
          <div className="space-y-3 rounded-xl border border-stone-200 bg-stone-50/80 p-4 dark:border-stone-700 dark:bg-stone-900/40">
            <div className="flex items-center gap-2">
              <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-950 dark:bg-amber-900/40 dark:text-amber-100">
                Flop
              </span>
              <p className="text-sm text-stone-700 dark:text-stone-300">
                Board <span className="font-mono">5♠ 6♥ 2♦</span>, you hold{" "}
                <span className="font-mono">7♠ 8♠</span> (open-ended straight draw).
                Villain bets half pot. You call — reasonable with outs and implied
                odds.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-950 dark:bg-orange-900/40 dark:text-orange-100">
                Turn
              </span>
              <p className="text-sm text-stone-700 dark:text-stone-300">
                <span className="font-mono">K♣</span> — a brick for your draw.
                Villain bets ¾ pot. Price is steeper with only one card left.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-stone-200 px-2 py-0.5 text-xs font-semibold text-stone-800 dark:bg-stone-600 dark:text-stone-100">
                River
              </span>
              <p className="text-sm text-stone-700 dark:text-stone-300">
                You miss; villain bets again. Without a read that they bluff turns
                and rivers, folding is standard — you planned the flop call knowing
                the turn might get ugly.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Use other modules when…
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-stone-600 dark:text-stone-400">
            <li>
              <Link
                href="/hand-rankings"
                className="font-medium text-emerald-800 underline dark:text-emerald-400"
              >
                Hand rankings
              </Link>{" "}
              — comparing made hands at showdown or counting outs to a winning
              hand.
            </li>
            <li>
              <Link
                href="/position"
                className="font-medium text-emerald-800 underline dark:text-emerald-400"
              >
                Position
              </Link>{" "}
              — deciding whether to stab, check back, or pressure when acting
              last.
            </li>
            <li>
              <Link
                href="/pot-odds"
                className="font-medium text-emerald-800 underline dark:text-emerald-400"
              >
                Pot odds
              </Link>{" "}
              — any time you face a bet and must call or fold on a single-street
              snapshot.
            </li>
            <li>
              <Link
                href="/starting-hands"
                className="font-medium text-emerald-800 underline dark:text-emerald-400"
              >
                Starting hands
              </Link>{" "}
              — how wide to enter the pot preflop, which shapes your postflop
              strength.
            </li>
          </ul>
        </section>

        <div className="pb-8">
          <Link
            href="/betting-basics/quiz"
            className="inline-flex rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Take the quiz (15 questions)
          </Link>
        </div>
      </main>
    </>
  );
}
