"use client";

import Link from "next/link";
import { useApp } from "@/components/providers/app-providers";
import {
  getNextHrefOrPractice,
  getNextStep,
  getResumeHref,
  getWeakestReviewTarget,
} from "@/lib/curriculum/selectors";

export function LearningPathSummary() {
  const { progress } = useApp();
  const now = Date.now();
  const nextStep = getNextStep(progress);
  const nextHref = getNextHrefOrPractice(progress);
  const resumeHref = getResumeHref(progress, now);
  const review = getWeakestReviewTarget(progress);

  const nextLabel = nextStep
    ? `Next: ${nextStep.title}`
    : "All topics passed — practice";

  return (
    <section className="rounded-2xl border border-stone-200 bg-[var(--card)] p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900/60">
      <h2 className="text-sm font-medium uppercase tracking-wide text-emerald-800 dark:text-emerald-400">
        Your path
      </h2>
      <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
        Suggested order matches the modules below. Links pick up where you
        left off.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
        {resumeHref ? (
          <Link
            href={resumeHref}
            className="inline-flex items-center justify-center rounded-lg border border-stone-300 bg-stone-50 px-3 py-2 text-sm font-medium text-stone-800 transition hover:border-emerald-500 dark:border-stone-600 dark:bg-stone-950 dark:text-stone-100 dark:hover:border-emerald-600"
          >
            Resume
          </Link>
        ) : null}
        <Link
          href={nextHref}
          className="inline-flex items-center justify-center rounded-lg border border-emerald-700 bg-emerald-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-600 dark:border-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500"
        >
          {nextLabel}
        </Link>
        {review ? (
          <Link
            href={review.href}
            className="inline-flex items-center justify-center rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-600 transition hover:border-emerald-400 dark:border-stone-700 dark:text-stone-400 dark:hover:border-emerald-600"
          >
            Review: {review.step.title}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
