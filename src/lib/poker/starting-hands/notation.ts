/** Single-char ranks high to low for hole-card notation. */
export const RANK_CHARS = "AKQJT98765432" as const;

const RANK_TO_VALUE: Record<string, number> = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
};

export function rankValue(c: string): number {
  return RANK_TO_VALUE[c] ?? 0;
}

/** Pocket pair e.g. AA, TT */
export function isPairCode(s: string): boolean {
  return s.length === 2 && s[0] === s[1];
}

/** Suited e.g. AKs */
export function isSuitedCode(s: string): boolean {
  return s.length === 3 && s[2] === "s";
}

/** Offsuit e.g. AKo */
export function isOffsuitCode(s: string): boolean {
  return s.length === 3 && s[2] === "o";
}

export function isValidHandCode(s: string): boolean {
  if (isPairCode(s)) {
    return RANK_CHARS.includes(s[0] as never);
  }
  if (isSuitedCode(s) || isOffsuitCode(s)) {
    const a = s[0]!;
    const b = s[1]!;
    if (!RANK_CHARS.includes(a as never) || !RANK_CHARS.includes(b as never))
      return false;
    return rankValue(a) > rankValue(b);
  }
  return false;
}

export function formatHandLabel(code: string): string {
  if (isPairCode(code)) return `${code[0]}${code[1]} (pair)`;
  if (isSuitedCode(code)) return `${code[0]}${code[1]} suited`;
  if (isOffsuitCode(code)) return `${code[0]}${code[1]} offsuit`;
  return code;
}
