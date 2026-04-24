"use client";

import Link from "next/link";
import { LearningPathSummary } from "@/components/curriculum/learning-path-summary";
import { TodaySessionCard } from "@/components/curriculum/today-session-card";
import { EngagementHomeSummary } from "@/components/engagement-home-summary";
import { useApp } from "@/components/providers/app-providers";
import type { PositionProgress } from "@/lib/progress/types";

function moduleSummary(
  progress: {
    referenceVisitedAt?: string;
    hubVisitedAt?: string;
    quiz: { attempts: number; bestScore: number };
  },
  quizOutOf: number = 10,
) {
  if (progress.quiz.attempts > 0) {
    return `Quiz best: ${progress.quiz.bestScore}/${quizOutOf} · ${progress.quiz.attempts} attempt${progress.quiz.attempts === 1 ? "" : "s"}`;
  }
  if (progress.referenceVisitedAt) {
    return "Reference viewed · quiz not completed yet";
  }
  if (progress.hubVisitedAt) {
    return "Module opened · keep going";
  }
  return "Not started";
}

function multiwaySummary(p: PositionProgress) {
  const q = p.multiwayQuiz;
  if (q.attempts > 0) {
    return `Quiz best: ${q.bestScore}/10 · ${q.attempts} attempt${q.attempts === 1 ? "" : "s"}`;
  }
  if (p.multiwayReferenceVisitedAt) {
    return "Reference viewed · quiz not completed yet";
  }
  if (p.multiwayHubVisitedAt) {
    return "Opened · keep going";
  }
  return "Not started";
}

function positionSummary(p: PositionProgress) {
  const basics = moduleSummary({
    hubVisitedAt: p.hubVisitedAt,
    referenceVisitedAt: p.referenceVisitedAt,
    quiz: p.quiz,
  });
  const mw = multiwaySummary(p);
  return `Basics: ${basics} · Multiway: ${mw}`;
}

export default function Home() {
  const { progress } = useApp();
  const hrSummary = moduleSummary(progress.handRankings);
  const posSummary = positionSummary(progress.position);
  const potOddsSummary = moduleSummary(progress.potOdds);
  const impliedOddsSummary = moduleSummary(progress.impliedOdds);
  const sprSummary = moduleSummary(progress.stackToPotRatio);
  const evSummary = moduleSummary(progress.expectedValue);
  const shSummary = moduleSummary(progress.startingHands, 15);
  const paSummary = moduleSummary(progress.preflopAggression);
  const bbSummary = moduleSummary(progress.bettingBasics, 15);
  const leSummary = moduleSummary(progress.liveEtiquette);
  const bfSummary = moduleSummary(progress.bluffingFundamentals);
  const tvbSummary = moduleSummary(progress.thinValueBetSizing);
  const bmSummary = moduleSummary(progress.bankrollManagement);
  const mgSummary = moduleSummary(progress.mentalGame);
  const rtSummary = moduleSummary(progress.rangesAndTexture);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
          Learn the basics
        </h1>
        <p className="mt-2 max-w-xl text-stone-600 dark:text-stone-400">
          Short lessons and quizzes. Progress is stored locally in your browser.
        </p>
      </div>

      <EngagementHomeSummary />

      <section className="rounded-2xl border border-stone-200 bg-[var(--card)] p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/60">
        <h2 className="text-sm font-medium uppercase tracking-wide text-emerald-800 dark:text-emerald-400">
          Practice
        </h2>
        <Link
          href="/practice"
          className="mt-3 flex flex-col gap-1 rounded-xl border border-stone-200 bg-stone-50/80 p-4 transition hover:border-emerald-400 dark:border-stone-700 dark:bg-stone-950/40 dark:hover:border-emerald-600"
        >
          <span className="font-semibold text-stone-900 dark:text-stone-50">
            6-max vs AI (play money)
          </span>
          <span className="text-sm text-stone-600 dark:text-stone-400">
            Full table with blinds, bots, and no coaching overlays—virtual chips
            only.
          </span>
        </Link>
      </section>

      <LearningPathSummary />

      <TodaySessionCard />

      <section className="rounded-2xl border border-stone-200 bg-[var(--card)] p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/60">
        <h2 className="text-sm font-medium uppercase tracking-wide text-emerald-800 dark:text-emerald-400">
          Modules
        </h2>
        <ul className="mt-4 space-y-3">
          <li>
            <Link
              href="/hand-rankings"
              className="flex flex-col gap-1 rounded-xl border border-stone-200 bg-stone-50/80 p-4 transition hover:border-emerald-400 dark:border-stone-700 dark:bg-stone-950/40 dark:hover:border-emerald-600"
            >
              <span className="font-semibold text-stone-900 dark:text-stone-50">
                Hand rankings
              </span>
              <span className="text-sm text-stone-600 dark:text-stone-400">
                Standard five-card hand strength from royal flush down to high
                card.
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-500">
                {hrSummary}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/position"
              className="flex flex-col gap-1 rounded-xl border border-stone-200 bg-stone-50/80 p-4 transition hover:border-emerald-400 dark:border-stone-700 dark:bg-stone-950/40 dark:hover:border-emerald-600"
            >
              <span className="font-semibold text-stone-900 dark:text-stone-50">
                Position (9-max)
              </span>
              <span className="text-sm text-stone-600 dark:text-stone-400">
                Seat names, order, heads-up position, and multiway flops.
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-500">
                {posSummary}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/pot-odds"
              className="flex flex-col gap-1 rounded-xl border border-stone-200 bg-stone-50/80 p-4 transition hover:border-emerald-400 dark:border-stone-700 dark:bg-stone-950/40 dark:hover:border-emerald-600"
            >
              <span className="font-semibold text-stone-900 dark:text-stone-50">
                Pot odds and outs
              </span>
              <span className="text-sm text-stone-600 dark:text-stone-400">
                Ratios, break-even equity, rule of 2/4, and simple call-or-fold.
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-500">
                {potOddsSummary}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/implied-odds"
              className="flex flex-col gap-1 rounded-xl border border-stone-200 bg-stone-50/80 p-4 transition hover:border-emerald-400 dark:border-stone-700 dark:bg-stone-950/40 dark:hover:border-emerald-600"
            >
              <span className="font-semibold text-stone-900 dark:text-stone-50">
                Implied odds
              </span>
              <span className="text-sm text-stone-600 dark:text-stone-400">
                Future winnings when you hit, stack depth, and a simple
                break-even snapshot beyond immediate pot odds.
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-500">
                {impliedOddsSummary}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/stack-to-pot-ratio"
              className="flex flex-col gap-1 rounded-xl border border-stone-200 bg-stone-50/80 p-4 transition hover:border-emerald-400 dark:border-stone-700 dark:bg-stone-950/40 dark:hover:border-emerald-600"
            >
              <span className="font-semibold text-stone-900 dark:text-stone-50">
                Stack-to-pot ratio (SPR)
              </span>
              <span className="text-sm text-stone-600 dark:text-stone-400">
                Effective stack vs pot, how SPR drops street by street, and what
                deep vs shallow means for getting committed.
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-500">
                {sprSummary}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/expected-value"
              className="flex flex-col gap-1 rounded-xl border border-stone-200 bg-stone-50/80 p-4 transition hover:border-emerald-400 dark:border-stone-700 dark:bg-stone-950/40 dark:hover:border-emerald-600"
            >
              <span className="font-semibold text-stone-900 dark:text-stone-50">
                Expected value (EV)
              </span>
              <span className="text-sm text-stone-600 dark:text-stone-400">
                Long-run profit from calls and bluffs: EV formulas tied to pot
                odds and simple break-even fold math.
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-500">
                {evSummary}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/starting-hands"
              className="flex flex-col gap-1 rounded-xl border border-stone-200 bg-stone-50/80 p-4 transition hover:border-emerald-400 dark:border-stone-700 dark:bg-stone-950/40 dark:hover:border-emerald-600"
            >
              <span className="font-semibold text-stone-900 dark:text-stone-50">
                Starting hands
              </span>
              <span className="text-sm text-stone-600 dark:text-stone-400">
                Notation, strength categories, scenarios, and a 169-hand equity
                reference order.
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-500">
                {shSummary}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/preflop-aggression"
              className="flex flex-col gap-1 rounded-xl border border-stone-200 bg-stone-50/80 p-4 transition hover:border-emerald-400 dark:border-stone-700 dark:bg-stone-950/40 dark:hover:border-emerald-600"
            >
              <span className="font-semibold text-stone-900 dark:text-stone-50">
                Preflop aggression ladder
              </span>
              <span className="text-sm text-stone-600 dark:text-stone-400">
                Open, isolation, 3-bet, and 4-bet—beginner vocabulary tied to
                position and ranges.
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-500">
                {paSummary}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/ranges-and-texture"
              className="flex flex-col gap-1 rounded-xl border border-stone-200 bg-stone-50/80 p-4 transition hover:border-emerald-400 dark:border-stone-700 dark:bg-stone-950/40 dark:hover:border-emerald-600"
            >
              <span className="font-semibold text-stone-900 dark:text-stone-50">
                Ranges &amp; board texture
              </span>
              <span className="text-sm text-stone-600 dark:text-stone-400">
                Hand ranges, coarse flop tags, and who the runout tends to favor.
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-500">
                {rtSummary}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/betting-basics"
              className="flex flex-col gap-1 rounded-xl border border-stone-200 bg-stone-50/80 p-4 transition hover:border-emerald-400 dark:border-stone-700 dark:bg-stone-950/40 dark:hover:border-emerald-600"
            >
              <span className="font-semibold text-stone-900 dark:text-stone-50">
                Betting basics
              </span>
              <span className="text-sm text-stone-600 dark:text-stone-400">
                Check, call, fold, raise; flop–turn–river scenarios; ties to pot
                odds and position.
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-500">
                {bbSummary}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/live-etiquette"
              className="flex flex-col gap-1 rounded-xl border border-stone-200 bg-stone-50/80 p-4 transition hover:border-emerald-400 dark:border-stone-700 dark:bg-stone-950/40 dark:hover:border-emerald-600"
            >
              <span className="font-semibold text-stone-900 dark:text-stone-50">
                Live table etiquette
              </span>
              <span className="text-sm text-stone-600 dark:text-stone-400">
                One-card exposure, action in turn, string bets, and courtesy
                toward other players at the felt.
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-500">
                {leSummary}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/bankroll-management"
              className="flex flex-col gap-1 rounded-xl border border-stone-200 bg-stone-50/80 p-4 transition hover:border-emerald-400 dark:border-stone-700 dark:bg-stone-950/40 dark:hover:border-emerald-600"
            >
              <span className="font-semibold text-stone-900 dark:text-stone-50">
                Bankroll management
              </span>
              <span className="text-sm text-stone-600 dark:text-stone-400">
                Variance, buy-in heuristics, scared money, and session
                discipline—educational overview only.
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-500">
                {bmSummary}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/mental-game"
              className="flex flex-col gap-1 rounded-xl border border-stone-200 bg-stone-50/80 p-4 transition hover:border-emerald-400 dark:border-stone-700 dark:bg-stone-950/40 dark:hover:border-emerald-600"
            >
              <span className="font-semibold text-stone-900 dark:text-stone-50">
                Mental game
              </span>
              <span className="text-sm text-stone-600 dark:text-stone-400">
                Tilt, focus, and session routines — habits and self-awareness, not
                bankroll math.
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-500">
                {mgSummary}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/bluffing-fundamentals"
              className="flex flex-col gap-1 rounded-xl border border-stone-200 bg-stone-50/80 p-4 transition hover:border-emerald-400 dark:border-stone-700 dark:bg-stone-950/40 dark:hover:border-emerald-600"
            >
              <span className="font-semibold text-stone-900 dark:text-stone-50">
                Bluffing fundamentals
              </span>
              <span className="text-sm text-stone-600 dark:text-stone-400">
                Fold equity, pure vs semi-bluff, break-even fold math, and how
                position and opponents change bluffing.
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-500">
                {bfSummary}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/thin-value-bet-sizing"
              className="flex flex-col gap-1 rounded-xl border border-stone-200 bg-stone-50/80 p-4 transition hover:border-emerald-400 dark:border-stone-700 dark:bg-stone-950/40 dark:hover:border-emerald-600"
            >
              <span className="font-semibold text-stone-900 dark:text-stone-50">
                Thin value &amp; bet sizing (lite)
              </span>
              <span className="text-sm text-stone-600 dark:text-stone-400">
                Second barrels, when a small value bet beats checking — heuristic
                ideas, not solver play.
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-500">
                {tvbSummary}
              </span>
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
