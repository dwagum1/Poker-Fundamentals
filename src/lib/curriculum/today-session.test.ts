import { describe, expect, it } from "vitest";
import { defaultProgress } from "@/lib/progress/types";
import { PRACTICE_HREF } from "@/lib/curriculum/path";
import {
  getPushForwardLearn,
  getTodaySession,
  listBelowPassQuizTargets,
  pickRandomWeakQuiz,
} from "@/lib/curriculum/today-session";

function seqRng(...values: number[]) {
  let i = 0;
  return () => values[i++] ?? 0;
}

function hrPassed(p: ReturnType<typeof defaultProgress>) {
  return {
    ...p,
    handRankings: {
      ...p.handRankings,
      quiz: { attempts: 1, bestScore: 10, lastCompletedAt: "2026-01-01" },
    },
  };
}

function positionPassed(p: ReturnType<typeof defaultProgress>) {
  return {
    ...p,
    position: {
      ...p.position,
      quiz: { attempts: 1, bestScore: 10, lastCompletedAt: "a" },
      multiwayQuiz: { attempts: 1, bestScore: 10, lastCompletedAt: "b" },
    },
  };
}

describe("listBelowPassQuizTargets", () => {
  it("includes position basics and multiway as separate rows when both attempted below pass", () => {
    const p = hrPassed(defaultProgress());
    const withPos = {
      ...p,
      position: {
        ...p.position,
        quiz: { attempts: 1, bestScore: 3, lastCompletedAt: "a" },
        multiwayQuiz: { attempts: 1, bestScore: 2, lastCompletedAt: "b" },
      },
    };
    const rows = listBelowPassQuizTargets(withPos);
    const posRows = rows.filter((r) => r.step.id === "position");
    expect(posRows).toHaveLength(2);
    expect(new Set(posRows.map((r) => r.href))).toEqual(
      new Set(["/position/quiz", "/position/quiz-multiway"]),
    );
  });
});

describe("pickRandomWeakQuiz", () => {
  it("picks a deterministic index from a seeded rng", () => {
    const p = {
      ...positionPassed(hrPassed(defaultProgress())),
      potOdds: {
        ...defaultProgress().potOdds,
        quiz: { attempts: 1, bestScore: 5, lastCompletedAt: "x" },
      },
      impliedOdds: {
        ...defaultProgress().impliedOdds,
        quiz: { attempts: 1, bestScore: 5, lastCompletedAt: "y" },
      },
    };
    const a = pickRandomWeakQuiz(p, seqRng(0.1));
    const b = pickRandomWeakQuiz(p, seqRng(0.95));
    expect(a?.href).toBe("/pot-odds/quiz");
    expect(b?.href).toBe("/implied-odds/quiz");
  });
});

describe("getPushForwardLearn", () => {
  it("links to next module learn when path not complete", () => {
    const p = hrPassed(defaultProgress());
    const out = getPushForwardLearn(p);
    expect(out.href).toBe("/position/learn");
    expect(out.title).toBe("Position (9-max)");
  });

  it("links to practice when curriculum complete", () => {
    let p = defaultProgress();
    for (const key of [
      "handRankings",
      "position",
      "potOdds",
      "impliedOdds",
      "stackToPotRatio",
      "expectedValue",
      "startingHands",
      "preflopAggression",
      "rangesAndTexture",
      "bettingBasics",
      "liveEtiquette",
      "bankrollManagement",
      "mentalGame",
      "bluffingFundamentals",
      "thinValueBetSizing",
    ] as const) {
      if (key === "position") {
        p = {
          ...p,
          position: {
            quiz: { attempts: 1, bestScore: 10, lastCompletedAt: "a" },
            multiwayQuiz: { attempts: 1, bestScore: 10, lastCompletedAt: "b" },
          },
        };
        continue;
      }
      const out =
        key === "startingHands" || key === "bettingBasics" ? 15 : 10;
      p = {
        ...p,
        [key]: {
          ...p[key],
          quiz: { attempts: 1, bestScore: out, lastCompletedAt: "z" },
        },
      } as typeof p;
    }
    const out = getPushForwardLearn(p);
    expect(out.href).toBe(PRACTICE_HREF);
    expect(out.title).toBe("Keep sharp at the table");
  });
});

describe("getTodaySession", () => {
  it("prefers a weak quiz outside the next step when one exists", () => {
    const p = {
      ...positionPassed(hrPassed(defaultProgress())),
      potOdds: {
        ...defaultProgress().potOdds,
        quiz: { attempts: 1, bestScore: 5, lastCompletedAt: "x" },
      },
      impliedOdds: {
        ...defaultProgress().impliedOdds,
        quiz: { attempts: 1, bestScore: 5, lastCompletedAt: "y" },
      },
    };
    const session = getTodaySession(p, seqRng(0.1));
    expect(session.pushForward.href).toBe("/pot-odds/learn");
    expect(session.brushUp?.href).toBe("/implied-odds/quiz");
    expect(session.brushUp?.stepId).toBe("impliedOdds");
  });

  it("falls back without exclude when every below-pass row is the next step", () => {
    const p = {
      ...positionPassed(hrPassed(defaultProgress())),
      potOdds: {
        ...defaultProgress().potOdds,
        quiz: { attempts: 1, bestScore: 5, lastCompletedAt: "p" },
      },
    };
    const session = getTodaySession(p, seqRng(0.2));
    expect(session.pushForward.href).toBe("/pot-odds/learn");
    expect(session.brushUp?.stepId).toBe("potOdds");
    expect(session.brushUp?.href).toBe("/pot-odds/quiz");
  });
});
