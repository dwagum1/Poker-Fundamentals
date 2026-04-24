/**
 * 9-max full ring. Seats are ordered clockwise from the button for layout math.
 * Teaching assumption: all nine players are dealt in (no empty seats).
 */

export const SEAT_IDS = [
  "btn",
  "sb",
  "bb",
  "utg",
  "utg1",
  "utg2",
  "mp",
  "hj",
  "co",
] as const;

export type SeatId = (typeof SEAT_IDS)[number];

const LABEL: Record<SeatId, string> = {
  btn: "BTN",
  sb: "SB",
  bb: "BB",
  utg: "UTG",
  utg1: "UTG+1",
  utg2: "UTG+2",
  mp: "MP",
  hj: "HJ",
  co: "CO",
};

export function seatLabel(id: SeatId): string {
  return LABEL[id];
}

/** Preflop: first to act is UTG; button acts last before the blinds. */
export function preflopActionOrder(): readonly SeatId[] {
  return ["utg", "utg1", "utg2", "mp", "hj", "co", "btn", "sb", "bb"] as const;
}

/** Postflop: first to act is SB; button acts last. */
export function postflopActionOrder(): readonly SeatId[] {
  return ["sb", "bb", "utg", "utg1", "utg2", "mp", "hj", "co", "btn"] as const;
}

export function preflopFirstToAct(): SeatId {
  return preflopActionOrder()[0]!;
}

export function postflopFirstToAct(): SeatId {
  return postflopActionOrder()[0]!;
}

export function postflopOrderIndex(id: SeatId): number {
  const order = postflopActionOrder();
  const i = order.indexOf(id);
  return i === -1 ? order.length : i;
}

/** Heads-up postflop: in position = acts last on the street. */
export function whoHasPositionHu(a: SeatId, b: SeatId): SeatId {
  const ia = postflopOrderIndex(a);
  const ib = postflopOrderIndex(b);
  return ia > ib ? a : b;
}

export function isValidSeatId(s: string): s is SeatId {
  return (SEAT_IDS as readonly string[]).includes(s);
}
