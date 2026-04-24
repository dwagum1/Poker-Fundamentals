import { ORDER_169, handOrderIndex } from "./order-169";

/** Four bands = quartiles of preflop equity vs random (see ORDER_169). */
const CATEGORY_LABELS = [
  "Premium",
  "Strong",
  "Medium",
  "Trash / fold",
] as const;

export type TeachingCategoryTier = 1 | 2 | 3 | 4;

const N = ORDER_169.length;

/** 1–4 from position in ORDER_169 (1 = highest-equity quartile). */
export function teachingTier(code: string): number {
  const idx = handOrderIndex(code);
  if (idx >= N) return 4;
  const t = Math.floor((idx * 4) / N) + 1;
  return Math.min(4, t);
}

export function tierLabel(tier: number): string {
  if (tier < 1 || tier > 4) return CATEGORY_LABELS[3]!;
  return CATEGORY_LABELS[tier - 1]!;
}

/** All 169 hands grouped by equity quartile (same bands as {@link teachingTier}). */
export function handsByTeachingCategory(): {
  tier: TeachingCategoryTier;
  label: string;
  hands: readonly string[];
}[] {
  const buckets: [string[], string[], string[], string[]] = [[], [], [], []];
  for (let i = 0; i < ORDER_169.length; i++) {
    const code = ORDER_169[i]!;
    const t = Math.floor((i * 4) / N) + 1;
    const tier = Math.min(4, t) as TeachingCategoryTier;
    buckets[tier - 1]!.push(code);
  }
  return ([1, 2, 3, 4] as const).map((tier) => ({
    tier,
    label: tierLabel(tier),
    hands: buckets[tier - 1]!,
  }));
}
