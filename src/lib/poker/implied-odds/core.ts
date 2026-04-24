/**
 * Minimum equity (%) to call using a **single-street teaching snapshot**.
 *
 * Treats `impliedExtraWhenWin` as extra chips you win **when you win at showdown**,
 * on top of the pot after your call (`potFacingCall + call`). This is a classroom
 * shortcut only: it ignores partial realization (stack-off frequency), split pots,
 * fold equity, multi-street geometry, and how reliably villain pays you off.
 *
 * Formula (same rounding style as `breakEvenEquityPercent` in pot-odds):
 * `call / (potFacingCall + call + impliedExtraWhenWin)`, rounded to nearest integer %.
 * Negative `impliedExtraWhenWin` is clamped to 0.
 */
export function breakEvenEquityWithImpliedSnapshot(
  potFacingCall: number,
  call: number,
  impliedExtraWhenWin: number,
): number {
  if (potFacingCall <= 0 || call <= 0) {
    throw new RangeError("potFacingCall and call must be positive");
  }
  const extra = Math.max(0, impliedExtraWhenWin);
  const total = potFacingCall + call + extra;
  return Math.round((call / total) * 100);
}
