"use client";

import Link from "next/link";
import { useApp } from "@/components/providers/app-providers";
import { getTodaySession } from "@/lib/curriculum/today-session";

export function TodaySessionCard() {
  const { progress } = useApp();
  const session = getTodaySession(progress);

  return (
    <section className="rounded-2xl border border-stone-200 bg-[var(--card)] p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900/60">
      <h2 className="text-sm font-medium uppercase tracking-wide text-emerald-800 dark:text-emerald-400">
        Today&apos;s 10-minute session
      </h2>
      <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
        A quick mix: revisit one weak quiz, then take the next lesson forward.
      </p>
      <div className="mt-4 flex flex-col gap-2">
        {session.brushUp ? (
          <Link
            href={session.brushUp.href}
            className="inline-flex items-center justify-center rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-700 transition hover:border-emerald-400 dark:border-stone-700 dark:text-stone-200 dark:hover:border-emerald-600"
          >
            Brush up: {session.brushUp.title}
          </Link>
        ) : null}
        <Link
          href={session.pushForward.href}
          className="inline-flex items-center justify-center rounded-lg border border-emerald-700 bg-emerald-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-600 dark:border-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500"
        >
          Push forward: {session.pushForward.title}
        </Link>
      </div>
      <p className="mt-3 text-xs text-stone-500 dark:text-stone-400">
        {session.brushUp
          ? "Roughly 10 minutes if you do both."
          : "~10 minutes total."}
      </p>
    </section>
  );
}
