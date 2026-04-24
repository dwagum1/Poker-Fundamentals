import Link from "next/link";
import { LearnTracker } from "./learn-tracker";
import { EQUITY_VS_RANDOM, ORDER_169 } from "@/lib/poker/starting-hands/order-169";
import {
  handsByTeachingCategory,
  teachingTier,
  tierLabel,
} from "@/lib/poker/starting-hands/tiers-basics";

const CATEGORY_CHART_STYLES: { left: string; bg: string; title: string }[] = [
  {
    left: "border-l-emerald-600 dark:border-l-emerald-500",
    bg: "bg-emerald-50/90 dark:bg-emerald-950/35",
    title: "text-emerald-900 dark:text-emerald-100",
  },
  {
    left: "border-l-amber-600 dark:border-l-amber-500",
    bg: "bg-amber-50/90 dark:bg-amber-950/35",
    title: "text-amber-950 dark:text-amber-100",
  },
  {
    left: "border-l-orange-600 dark:border-l-orange-500",
    bg: "bg-orange-50/80 dark:bg-orange-950/35",
    title: "text-orange-950 dark:text-orange-100",
  },
  {
    left: "border-l-stone-500 dark:border-l-stone-500",
    bg: "bg-stone-100/90 dark:bg-stone-900/50",
    title: "text-stone-700 dark:text-stone-300",
  },
];

export default function StartingHandsLearnPage() {
  const grouped = handsByTeachingCategory();
  const chunks: string[][] = [];
  for (let i = 0; i < ORDER_169.length; i += 13) {
    chunks.push(ORDER_169.slice(i, i + 13) as string[]);
  }

  return (
    <>
      <LearnTracker />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
        <div>
          <Link
            href="/starting-hands"
            className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
          >
            ← Starting hands
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Starting hands
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Notation, strength categories, illustrative matchups, and the full
            169 order ranked by approximate preflop equity vs a random hand — not
            a GTO solver chart.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Notation
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Two cards use high rank first:{" "}
            <strong className="text-stone-800 dark:text-stone-200">AKs</strong>{" "}
            is ace–king suited,{" "}
            <strong className="text-stone-800 dark:text-stone-200">AKo</strong> is
            ace–king offsuit,{" "}
            <strong className="text-stone-800 dark:text-stone-200">TT</strong> is
            pocket tens (a pair). Non-pair hands are written as{" "}
            <strong className="text-stone-800 dark:text-stone-200">Axs</strong>{" "}
            (ace–x suited) or{" "}
            <strong className="text-stone-800 dark:text-stone-200">AKo</strong>{" "}
            (ace–king offsuit), not vague “suited aces” as if that were one
            hand.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Categories
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-stone-600 dark:text-stone-400">
            <li>
              <strong className="text-stone-800 dark:text-stone-200">Pairs</strong>{" "}
              — AA down to 22
            </li>
            <li>
              <strong className="text-stone-800 dark:text-stone-200">
                Suited non-pairs
              </strong>{" "}
              — both cards share a suit (flush potential), e.g. A5s, JTs
            </li>
            <li>
              <strong className="text-stone-800 dark:text-stone-200">
                Offsuit
              </strong>{" "}
              — two different suits
            </li>
            <li>
              Connectors / suited connectors can flop straight and flush draws;
              they play better{" "}
              <strong className="text-stone-800 dark:text-stone-200">
                in position
              </strong>
              .
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Equity order and categories
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Order is by Monte Carlo{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              preflop equity vs one random opponent
            </strong>{" "}
            (all-in runout). The four bands are quartiles of that list:{" "}
            {tierLabel(1)}, {tierLabel(2)}, {tierLabel(3)}, and {tierLabel(4)}.
            Position and action still matter at the table — this is a static
            all-in baseline.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Chart: hands by group
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Same quartiles as above — each cell lists every combo in that equity
            band (169 total). Hover the matrix below for exact approximate equity
            percentages.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {grouped.map((g, i) => {
              const style = CATEGORY_CHART_STYLES[i]!;
              return (
                <div
                  key={g.tier}
                  className={`rounded-xl border border-stone-200 border-l-4 p-4 shadow-sm dark:border-stone-700 ${style.left} ${style.bg}`}
                >
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                    <h3
                      className={`text-base font-semibold ${style.title}`}
                    >
                      {g.label} hands
                    </h3>
                    <span className="text-xs tabular-nums text-stone-500 dark:text-stone-400">
                      {g.hands.length} combos
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 font-mono text-xs leading-relaxed text-stone-800 dark:text-stone-200">
                    {g.hands.map((code) => (
                      <span key={code} className="whitespace-nowrap">
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Scenarios (conceptual)
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Early position usually needs stronger hands than the button, because
            more players act after you. Suited hands and suited connectors gain
            value when you can see flops cheaply and act last on later streets.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Illustrative preflop equities (approximate)
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-stone-600 dark:text-stone-400">
            <li>
              <strong className="text-stone-800 dark:text-stone-200">AA vs KK</strong>{" "}
              all-in — the aces are a huge favorite (~80% equity).
            </li>
            <li>
              <strong className="text-stone-800 dark:text-stone-200">
                Pair vs lower pair
              </strong>{" "}
              (e.g. TT vs 99) — higher pair is usually ~80/20.
            </li>
            <li>
              <strong className="text-stone-800 dark:text-stone-200">
                Pair vs two overcards
              </strong>{" "}
              (e.g. 55 vs AK) — classic “race,” often close to 50/50.
            </li>
            <li>
              <strong className="text-stone-800 dark:text-stone-200">QQ vs AK</strong>{" "}
              — pair is a modest favorite (not a massive edge).
            </li>
            <li>
              <strong className="text-stone-800 dark:text-stone-200">
                Dominated ace
              </strong>{" "}
              — same top card, lower kicker (e.g. you hold AQ vs AK). All-in
              preflop, the dominating hand is a large favorite, not a race:{" "}
              <strong className="text-stone-800 dark:text-stone-200">
                AK vs AQ
              </strong>{" "}
              offsuit is often about{" "}
              <strong className="text-stone-800 dark:text-stone-200">
                ~72% / ~28%
              </strong>{" "}
              to the better kicker;{" "}
              <strong className="text-stone-800 dark:text-stone-200">
                AJ vs AT
              </strong>{" "}
              offsuit is in the same ballpark (often{" "}
              <strong className="text-stone-800 dark:text-stone-200">
                ~74% / ~26%
              </strong>
              ). Wider gaps (e.g. AT vs A5) skew even more toward the stronger
              ace.
            </li>
            <li>
              <strong className="text-stone-800 dark:text-stone-200">AKs vs AKo</strong>{" "}
              — same ranks; suited is slightly stronger.
            </li>
          </ul>
        </section>

        <section className="overflow-x-auto">
          <h2 className="mb-3 text-lg font-semibold text-stone-900 dark:text-stone-50">
            All 169 hands (matrix-style list)
          </h2>
          <p className="mb-2 text-xs text-stone-500 dark:text-stone-500">
            Hover a hand for rank, category, and equity vs random (approximate).
          </p>
          <div className="space-y-2 text-xs font-mono text-stone-800 dark:text-stone-200">
            {chunks.map((row, ri) => (
              <div
                key={ri}
                className="flex flex-wrap gap-1 rounded-lg border border-stone-200 bg-stone-50/80 p-2 dark:border-stone-700 dark:bg-stone-900/40"
              >
                {row.map((code, ci) => {
                  const idx = ri * 13 + ci;
                  const t = teachingTier(code);
                  const eq = EQUITY_VS_RANDOM[code];
                  const pct =
                    eq !== undefined
                      ? `${(eq * 100).toFixed(2)}% vs random`
                      : "";
                  return (
                    <span
                      key={code}
                      title={`#${idx + 1} · ${tierLabel(t)} · ${pct}`}
                      className="rounded px-1 py-0.5 text-stone-800 dark:text-stone-200"
                    >
                      {code}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </section>

        <div className="pb-8">
          <Link
            href="/starting-hands/quiz"
            className="inline-flex rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Take the quiz (15 questions)
          </Link>
        </div>
      </main>
    </>
  );
}
