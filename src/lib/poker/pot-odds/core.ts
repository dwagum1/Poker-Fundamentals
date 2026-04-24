/** Integer chips; pot facing your call includes villain’s bet. */

function gcdTwo(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export type SimplifiedRatio = { a: number; b: number };

/** Simplified pot odds (pot facing call) : (call). */
export function potOddsRatio(
  potFacingCall: number,
  call: number,
): SimplifiedRatio {
  if (potFacingCall <= 0 || call <= 0) {
    throw new RangeError("potFacingCall and call must be positive");
  }
  const g = gcdTwo(potFacingCall, call);
  return { a: potFacingCall / g, b: call / g };
}

export function formatRatio(r: SimplifiedRatio): string {
  return `${r.a}:${r.b}`;
}

/** Minimum equity to call (rounded to nearest integer percent). */
export function breakEvenEquityPercent(
  potFacingCall: number,
  call: number,
): number {
  if (potFacingCall <= 0 || call <= 0) {
    throw new RangeError("potFacingCall and call must be positive");
  }
  const total = potFacingCall + call;
  return Math.round((call / total) * 100);
}
