/**
 * Simplified EV helpers for teaching (single street, full call, no rake).
 * EV of calling: equity × (pot facing before your call) − (1 − equity) × call.
 */

export function evCallChips(
  equityPct: number,
  potFacing: number,
  call: number,
): number {
  const w = Math.max(0, Math.min(1, equityPct / 100));
  return Math.round(w * potFacing - (1 - w) * call);
}

/**
 * Pure bluff (0% equity when called): EV = foldFreq × pot − (1 − foldFreq) × bet.
 * Pot = chips in the middle before your bet; bet = your bet size.
 */
export function evPureBluffChips(
  foldFreqPct: number,
  potBeforeBet: number,
  bet: number,
): number {
  const f = Math.max(0, Math.min(1, foldFreqPct / 100));
  return Math.round(f * potBeforeBet - (1 - f) * bet);
}

/** Break-even fold frequency (%) for a pure bluff: bet / (pot + bet). */
export function breakEvenFoldPctPureBluff(potBeforeBet: number, bet: number): number {
  const d = potBeforeBet + bet;
  if (d <= 0) return 100;
  return Math.round((100 * bet) / d);
}
