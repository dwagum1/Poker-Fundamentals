import { type SeatId, postflopActionOrder, whoHasPositionHu } from "./nine-max";

/**
 * Postflop action order restricted to players still in the pot on this street.
 * Order matches full-table postflop order (earlier in list = acts earlier = more OOP).
 */
export function activePostflopOrder(active: readonly SeatId[]): SeatId[] {
  const set = new Set(active);
  return postflopActionOrder().filter((s) => set.has(s));
}

/** First to act among active players (most OOP). */
export function actsFirstAmongActive(active: readonly SeatId[]): SeatId | null {
  const o = activePostflopOrder(active);
  return o[0] ?? null;
}

/** Last to act among active players — closes the action on this street. */
export function closesActionAmongActive(active: readonly SeatId[]): SeatId | null {
  const o = activePostflopOrder(active);
  return o.length ? o[o.length - 1]! : null;
}

/**
 * True iff Hero acts strictly after Villain on the street (both must appear in `active`).
 * Pairwise IP vs Villain matches heads-up order between those two seats only.
 */
export function isInPositionVs(
  hero: SeatId,
  villain: SeatId,
  active: readonly SeatId[],
): boolean {
  const set = new Set(active);
  if (!set.has(hero) || !set.has(villain)) return false;
  return whoHasPositionHu(hero, villain) === hero;
}
