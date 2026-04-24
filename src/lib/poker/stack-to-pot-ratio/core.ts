/**
 * Stack-to-pot ratio (SPR): effective stack ÷ current pot.
 * NLHE, integer chips; pot must be positive.
 */

export function spr(effectiveStackChips: number, potChips: number): number {
  if (potChips <= 0) {
    throw new Error("potChips must be positive");
  }
  if (effectiveStackChips < 0) {
    throw new Error("effectiveStackChips must be non-negative");
  }
  return effectiveStackChips / potChips;
}

/** One decimal place, for quizzes and display. */
export function sprOneDecimal(
  effectiveStackChips: number,
  potChips: number,
): number {
  const raw = spr(effectiveStackChips, potChips);
  return Math.round(raw * 10) / 10;
}

export type AfterHeroCallsParams = {
  /** Pot in the middle before villain’s bet. */
  potBeforeBet: number;
  /** Size of villain’s bet; hero calls the same amount. */
  bet: number;
  heroStack: number;
  villainStack: number;
};

/**
 * Heads-up: both cover the bet. Effective stack before = min(stacks).
 * After hero calls: new pot = potBeforeBet + 2×bet; new effective = min(stacks) − bet.
 */
export function sprAfterHeroCallsBet(p: AfterHeroCallsParams): {
  potAfter: number;
  effectiveStackAfter: number;
  sprAfter: number;
  sprAfterOneDecimal: number;
} {
  const effBefore = Math.min(p.heroStack, p.villainStack);
  if (p.bet <= 0) throw new Error("bet must be positive");
  if (p.potBeforeBet < 0) throw new Error("potBeforeBet must be non-negative");
  if (effBefore < p.bet) {
    throw new Error("effective stack must cover the call");
  }
  const potAfter = p.potBeforeBet + 2 * p.bet;
  const effectiveStackAfter = effBefore - p.bet;
  const sprAfter = spr(effectiveStackAfter, potAfter);
  return {
    potAfter,
    effectiveStackAfter,
    sprAfter,
    sprAfterOneDecimal: Math.round(sprAfter * 10) / 10,
  };
}
