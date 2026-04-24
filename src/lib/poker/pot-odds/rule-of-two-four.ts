const MAX_OUTS = 15;

export type RuleStreet =
  | "flop_one_card"
  | "flop_two_cards"
  | "turn";

/**
 * Rough equity from outs (rule of 2 / 4). Capped outs for teaching sanity.
 * Returns rounded integer percent.
 */
export function equityFromOuts(outs: number, street: RuleStreet): number {
  const o = Math.min(Math.max(0, Math.floor(outs)), MAX_OUTS);
  if (street === "flop_one_card") {
    return Math.round(o * 2);
  }
  if (street === "flop_two_cards") {
    return Math.round(o * 4);
  }
  return Math.round(o * 2);
}
