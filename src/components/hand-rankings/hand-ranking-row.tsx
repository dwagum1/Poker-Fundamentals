import type { HandRankingDef } from "@/lib/poker/hand-rankings";

export function HandRankingRow({
  def,
  rankLabel,
}: {
  def: HandRankingDef;
  rankLabel: string;
}) {
  return (
    <article className="rounded-xl border border-stone-200 bg-stone-50/80 p-4 dark:border-stone-700 dark:bg-stone-900/50">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
          {rankLabel}
        </span>
        <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
          {def.name}
        </h2>
      </div>
      <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
        {def.shortDescription}
      </p>
      <p className="mt-2 font-mono text-sm text-stone-800 dark:text-stone-200">
        {def.example}
      </p>
      {def.tip && (
        <p className="mt-2 text-sm italic text-stone-500 dark:text-stone-500">
          {def.tip}
        </p>
      )}
    </article>
  );
}
