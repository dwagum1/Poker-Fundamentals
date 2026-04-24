import Link from "next/link";
import { LearnTracker } from "./learn-tracker";

export default function MentalGameLearnPage() {
  return (
    <>
      <LearnTracker />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
        <div>
          <Link
            href="/mental-game"
            className="text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-400"
          >
            ← Mental game
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Mental game
          </h1>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            General education about habits at the table. This is{" "}
            <strong className="text-stone-800 dark:text-stone-200">not</strong>{" "}
            medical or professional mental-health advice — seek qualified help if
            you need it.
          </p>
        </div>

        <section className="rounded-xl border border-stone-200 bg-stone-50/80 p-4 dark:border-stone-700 dark:bg-stone-900/40">
          <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-50">
            Related module
          </h2>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Money stress overlaps with mindset — see{" "}
            <Link
              href="/bankroll-management/learn"
              className="text-emerald-800 underline dark:text-emerald-400"
            >
              Bankroll management
            </Link>{" "}
            for roll, variance, and scared money at a financial level.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Tilt
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            <strong className="text-stone-800 dark:text-stone-200">Tilt</strong>{" "}
            is emotional play: chasing losses, playing revenge hands, opening
            wider because you are “due,” or spewing because a bad beat stings.
            Warning signs include rising heart rate, fixed thoughts about one
            pot, and decisions you would not make after a walk. Teaching
            defaults: take a break, use a pre-set stop (time or loss limit), and
            do not use poker to fix your mood — fix your state, then decide if you
            still want to play.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Focus
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            One hand, one decision. Reduce distractions (notifications, TV,
            arguing in chat). Autopilot volume often trades away edge; shorter
            sessions with attention usually beat long grinds where you stop
            noticing details. When you feel fuzzy, that is data — consider
            stepping away before mistakes cost more than boredom would have.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Session routines
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            <strong className="text-stone-800 dark:text-stone-200">Before:</strong>{" "}
            clear intent (study, grind, social), decent environment, and a rough
            plan for how long you will play or when you will quit if things go
            badly.{" "}
            <strong className="text-stone-800 dark:text-stone-200">During:</strong>{" "}
            stick to the plan; if emotions spike, pause or end the session.{" "}
            <strong className="text-stone-800 dark:text-stone-200">After:</strong>{" "}
            a short note on what went well or one leak to review later, then
            detach so poker does not own the rest of your day.
          </p>
        </section>

        <div className="pb-8">
          <Link
            href="/mental-game/quiz"
            className="inline-flex rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Take the quiz (10 questions)
          </Link>
        </div>
      </main>
    </>
  );
}
