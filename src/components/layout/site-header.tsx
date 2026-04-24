"use client";

import Link from "next/link";
import { useApp } from "@/components/providers/app-providers";
import { levelFromTotalXp } from "@/lib/progress/engagement";

export function SiteHeader() {
  const { profile, progress } = useApp();
  const eg = progress.engagement;
  const level = levelFromTotalXp(eg.xp);

  return (
    <header className="border-b border-stone-200 bg-white/80 backdrop-blur dark:border-stone-800 dark:bg-stone-950/80">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-100"
        >
          Poker fundamentals
        </Link>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-3">
          <span
            className="max-w-[9rem] shrink-0 truncate text-xs text-stone-500 dark:text-stone-400"
            title="Complete a quiz run each day to grow your streak. XP levels up over time."
          >
            Streak {eg.streakCurrent} · Lv {level}
          </span>
          {profile && (
            <span className="truncate text-sm text-stone-500 dark:text-stone-400">
              {profile.displayName}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
