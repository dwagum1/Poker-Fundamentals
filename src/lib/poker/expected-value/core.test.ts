import { describe, expect, it } from "vitest";
import {
  breakEvenFoldPctPureBluff,
  evCallChips,
  evPureBluffChips,
} from "./core";

describe("evCallChips", () => {
  it("matches teaching example 40% / 150 / 50 → +30", () => {
    expect(evCallChips(40, 150, 50)).toBe(30);
  });

  it("rounds to nearest chip", () => {
    expect(evCallChips(25, 100, 50)).toBe(-12);
  });
});

describe("evPureBluffChips", () => {
  it("is negative when never folded", () => {
    expect(evPureBluffChips(0, 100, 50)).toBe(-50);
  });
});

describe("breakEvenFoldPctPureBluff", () => {
  it("matches bet / (pot + bet)", () => {
    expect(breakEvenFoldPctPureBluff(100, 50)).toBe(33);
  });
});
