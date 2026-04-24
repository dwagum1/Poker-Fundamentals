import { describe, expect, it } from "vitest";
import {
  applyEngagementAfterQuiz,
  levelFromTotalXp,
  minXpForLevel,
  toLocalYmd,
  XP_QUIZ_BASE,
  XP_QUIZ_BEAT_BEST_BONUS,
  XP_QUIZ_SCORE_SCALE,
  xpIntoCurrentLevel,
} from "@/lib/progress/engagement";
import { defaultProgress } from "@/lib/progress/types";

function atYmd(ymd: string, h = 12) {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, m - 1, d, h, 0, 0).toISOString();
}

describe("toLocalYmd", () => {
  it("formats local calendar date", () => {
    const d = new Date(2026, 3, 16, 9, 0, 0);
    expect(toLocalYmd(d)).toBe("2026-04-16");
  });
});

describe("levelFromTotalXp", () => {
  it("starts at level 1 for low XP", () => {
    expect(levelFromTotalXp(0)).toBe(1);
    expect(levelFromTotalXp(49)).toBe(1);
  });
  it("crosses thresholds per triangular curve", () => {
    expect(levelFromTotalXp(50)).toBe(2);
    expect(levelFromTotalXp(149)).toBe(2);
    expect(levelFromTotalXp(150)).toBe(3);
  });
});

describe("minXpForLevel", () => {
  it("matches triangular band starts", () => {
    expect(minXpForLevel(1)).toBe(0);
    expect(minXpForLevel(2)).toBe(50);
    expect(minXpForLevel(3)).toBe(150);
  });
});

describe("xpIntoCurrentLevel", () => {
  it("reports span for current band", () => {
    const r = xpIntoCurrentLevel(75);
    expect(r.level).toBe(2);
    expect(r.xpIntoLevel).toBe(25);
    expect(r.xpForThisLevel).toBe(100);
  });
});

describe("applyEngagementAfterQuiz", () => {
  it("sets streak to 1 on first qualifying day", () => {
    const base = defaultProgress();
    const next = { ...base, potOdds: { ...base.potOdds } };
    const out = applyEngagementAfterQuiz(next, {
      score: 8,
      total: 10,
      completedAt: atYmd("2026-01-10"),
      prevBestScore: 0,
      prevAttempts: 0,
    });
    expect(out.engagement.streakCurrent).toBe(1);
    expect(out.engagement.streakLastQualifiedDate).toBe("2026-01-10");
    expect(out.engagement.xp).toBe(
      XP_QUIZ_BASE + Math.round((XP_QUIZ_SCORE_SCALE * 8) / 10),
    );
  });

  it("does not increase streak twice the same local day", () => {
    const base = defaultProgress();
    const once = applyEngagementAfterQuiz(
      { ...base, potOdds: { ...base.potOdds } },
      {
        score: 10,
        total: 10,
        completedAt: atYmd("2026-01-10"),
        prevBestScore: 0,
        prevAttempts: 0,
      },
    );
    const twice = applyEngagementAfterQuiz(
      { ...once, impliedOdds: { ...once.impliedOdds } },
      {
        score: 5,
        total: 10,
        completedAt: atYmd("2026-01-10", 18),
        prevBestScore: 0,
        prevAttempts: 0,
      },
    );
    expect(twice.engagement.streakCurrent).toBe(1);
  });

  it("increments streak the next calendar day", () => {
    let p = defaultProgress();
    p = applyEngagementAfterQuiz(
      { ...p, potOdds: { ...p.potOdds } },
      {
        score: 10,
        total: 10,
        completedAt: atYmd("2026-01-10"),
        prevBestScore: 0,
        prevAttempts: 0,
      },
    );
    p = applyEngagementAfterQuiz(
      { ...p, potOdds: { ...p.potOdds } },
      {
        score: 10,
        total: 10,
        completedAt: atYmd("2026-01-11"),
        prevBestScore: 10,
        prevAttempts: 1,
      },
    );
    expect(p.engagement.streakCurrent).toBe(2);
  });

  it("resets streak after a gap of more than one day", () => {
    let p = defaultProgress();
    p = applyEngagementAfterQuiz(
      { ...p, potOdds: { ...p.potOdds } },
      {
        score: 10,
        total: 10,
        completedAt: atYmd("2026-01-10"),
        prevBestScore: 0,
        prevAttempts: 0,
      },
    );
    p = applyEngagementAfterQuiz(
      { ...p, potOdds: { ...p.potOdds } },
      {
        score: 10,
        total: 10,
        completedAt: atYmd("2026-01-12"),
        prevBestScore: 10,
        prevAttempts: 1,
      },
    );
    expect(p.engagement.streakCurrent).toBe(1);
  });

  it("adds beat-best bonus only when improving after first attempt", () => {
    const base = defaultProgress();
    const first = applyEngagementAfterQuiz(
      { ...base, potOdds: { ...base.potOdds } },
      {
        score: 6,
        total: 10,
        completedAt: atYmd("2026-02-01"),
        prevBestScore: 0,
        prevAttempts: 0,
      },
    );
    const xpFirst = first.engagement.xp;
    const second = applyEngagementAfterQuiz(
      { ...first, potOdds: { ...first.potOdds } },
      {
        score: 8,
        total: 10,
        completedAt: atYmd("2026-02-02"),
        prevBestScore: 6,
        prevAttempts: 1,
      },
    );
    const expectedSecond =
      xpFirst +
      XP_QUIZ_BASE +
      Math.round((XP_QUIZ_SCORE_SCALE * 8) / 10) +
      XP_QUIZ_BEAT_BEST_BONUS;
    expect(second.engagement.xp).toBe(expectedSecond);
  });
});
