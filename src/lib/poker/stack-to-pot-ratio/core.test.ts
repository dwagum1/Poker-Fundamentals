import { describe, expect, it } from "vitest";
import { spr, sprAfterHeroCallsBet, sprOneDecimal } from "./core";

describe("stack-to-pot-ratio core", () => {
  it("spr divides stack by pot", () => {
    expect(spr(900, 100)).toBe(9);
  });

  it("sprOneDecimal rounds to one decimal", () => {
    expect(sprOneDecimal(100, 30)).toBe(3.3);
  });

  it("sprAfterHeroCallsBet matches pot and effective after call", () => {
    const r = sprAfterHeroCallsBet({
      potBeforeBet: 100,
      bet: 50,
      heroStack: 400,
      villainStack: 600,
    });
    expect(r.potAfter).toBe(200);
    expect(r.effectiveStackAfter).toBe(350);
    expect(r.sprAfter).toBeCloseTo(1.75, 5);
    expect(r.sprAfterOneDecimal).toBe(1.8);
  });
});
