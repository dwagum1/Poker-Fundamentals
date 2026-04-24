/**
 * Preflop strength order: approximate equity vs one random opponent (all-in runout).
 * Data: Monte Carlo — see order-169-equity-data.ts and scripts/generate-preflop-equity-order.cjs
 */

import { EQUITY_VS_RANDOM, ORDER_169 } from "./order-169-equity-data";

export { EQUITY_VS_RANDOM, ORDER_169 };

export function equityVsRandom(code: string): number | undefined {
  return EQUITY_VS_RANDOM[code];
}

export function handOrderIndex(code: string): number {
  const list = ORDER_169 as readonly string[];
  const i = list.indexOf(code);
  return i === -1 ? list.length : i;
}

/** True if a is strictly stronger than b in this equity-based order. */
export function isStrongerThan(a: string, b: string): boolean {
  return handOrderIndex(a) < handOrderIndex(b);
}

export function strongerOf(a: string, b: string): string {
  return isStrongerThan(a, b) ? a : b;
}
