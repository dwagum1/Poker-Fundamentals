import {
  type SeatId,
  SEAT_IDS,
  seatLabel,
  whoHasPositionHu,
} from "./nine-max";
import { actsFirstAmongActive, closesActionAmongActive } from "./multiway";

export type MultiwayQuizQuestion = {
  id: string;
  prompt: string;
  options: SeatId[];
  answer: SeatId;
};

function shuffleInPlace<T>(arr: T[], rng: () => number) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
}

function pickOptions(answer: SeatId, rng: () => number): SeatId[] {
  const wrong = SEAT_IDS.filter((s) => s !== answer);
  shuffleInPlace(wrong, rng);
  const opts = [answer, ...wrong.slice(0, 3)];
  shuffleInPlace(opts, rng);
  return opts;
}

function randomSubset(size: 3 | 4, rng: () => number): SeatId[] {
  const copy = [...SEAT_IDS];
  shuffleInPlace(copy, rng);
  return copy.slice(0, size);
}

function distinctPairFromSeats(
  seats: SeatId[],
  rng: () => number,
): [SeatId, SeatId] {
  const s = [...seats];
  shuffleInPlace(s, rng);
  return [s[0]!, s[1]!];
}

const QUIZ_LEN = 10;

/**
 * Mix: who acts first among 3–4 players, who closes, pairwise IP (with story copy).
 */
export function buildMultiwayQuizQuestions(
  count: number = QUIZ_LEN,
  rng: () => number = Math.random,
): MultiwayQuizQuestion[] {
  const out: MultiwayQuizQuestion[] = [];

  for (let i = 0; i < count; i++) {
    const mode = i % 3;
    if (mode === 0 || mode === 1) {
      const size = rng() < 0.5 ? 3 : 4;
      const active = randomSubset(size, rng);
      const label = active.map((s) => seatLabel(s)).join(", ");
      const first = actsFirstAmongActive(active)!;
      const last = closesActionAmongActive(active)!;
      if (mode === 0) {
        out.push({
          id: `mw_first_${i}`,
          prompt: `Three or more players see the flop: ${label}. Who acts first on the flop?`,
          options: pickOptions(first, rng),
          answer: first,
        });
      } else {
        out.push({
          id: `mw_close_${i}`,
          prompt: `Three or more players see the flop: ${label}. Who acts last on the flop (closes the action)?`,
          options: pickOptions(last, rng),
          answer: last,
        });
      }
    } else {
      const size = rng() < 0.5 ? 3 : 4;
      const active = randomSubset(size, rng);
      const [hero, villain] = distinctPairFromSeats(active, rng);
      const ipSeat = whoHasPositionHu(hero, villain);
      out.push({
        id: `mw_ip_${i}_${hero}_${villain}`,
        prompt: `Flop: active players include ${active.map((s) => seatLabel(s)).join(", ")}. Between Hero (${seatLabel(hero)}) and Villain (${seatLabel(villain)}), who is in position (acts last between the two)?`,
        options: pickOptions(ipSeat, rng),
        answer: ipSeat,
      });
    }
  }

  shuffleInPlace(out, rng);
  return out.slice(0, count);
}
