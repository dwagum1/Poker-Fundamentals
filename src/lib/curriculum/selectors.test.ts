import { describe, expect, it } from "vitest";
import { defaultProgress } from "@/lib/progress/types";
import {
  getNextStep,
  getResumeHref,
  getWeakestReviewTarget,
  isStepCompleteForPath,
  passesQuiz,
  RESUME_MAX_AGE_MS,
} from "@/lib/curriculum/selectors";
import { CURRICULUM_STEPS } from "@/lib/curriculum/path";

function hrPassed(p: ReturnType<typeof defaultProgress>) {
  return {
    ...p,
    handRankings: {
      ...p.handRankings,
      quiz: { attempts: 1, bestScore: 10, lastCompletedAt: "2026-01-01" },
    },
  };
}

describe("passesQuiz", () => {
  it("requires ceil(0.8 * out)", () => {
    expect(passesQuiz(10, 7)).toBe(false);
    expect(passesQuiz(10, 8)).toBe(true);
    expect(passesQuiz(15, 12)).toBe(true);
  });
});

describe("getNextStep", () => {
  it("returns first module when nothing done", () => {
    const p = defaultProgress();
    expect(getNextStep(p)?.id).toBe("handRankings");
  });

  it("advances after first module passes threshold", () => {
    const p = hrPassed(defaultProgress());
    expect(getNextStep(p)?.id).toBe("position");
  });
});

describe("isStepCompleteForPath position", () => {
  const posStep = CURRICULUM_STEPS.find((s) => s.id === "position")!;

  it("needs both quizzes passed", () => {
    const p = defaultProgress();
    expect(isStepCompleteForPath(p, posStep)).toBe(false);
    const onlyMain = {
      ...p,
      position: {
        ...p.position,
        quiz: { attempts: 1, bestScore: 10, lastCompletedAt: "a" },
        multiwayQuiz: { attempts: 0, bestScore: 0 },
      },
    };
    expect(isStepCompleteForPath(onlyMain, posStep)).toBe(false);
    const both = {
      ...onlyMain,
      position: {
        ...onlyMain.position,
        multiwayQuiz: { attempts: 1, bestScore: 10, lastCompletedAt: "b" },
      },
    };
    expect(isStepCompleteForPath(both, posStep)).toBe(true);
  });
});

describe("getWeakestReviewTarget", () => {
  it("returns null when no attempts", () => {
    expect(getWeakestReviewTarget(defaultProgress())).toBeNull();
  });

  it("picks lower ratio", () => {
    const p = {
      ...defaultProgress(),
      handRankings: {
        ...defaultProgress().handRankings,
        quiz: { attempts: 1, bestScore: 10, lastCompletedAt: "a" },
      },
      potOdds: {
        ...defaultProgress().potOdds,
        quiz: { attempts: 1, bestScore: 3, lastCompletedAt: "b" },
      },
    };
    const w = getWeakestReviewTarget(p);
    expect(w?.href).toBe("/pot-odds/quiz");
  });
});

describe("getResumeHref", () => {
  it("returns null for unknown path", () => {
    const p = {
      ...defaultProgress(),
      learningPath: {
        lastPath: "/not-a-real-module",
        lastAt: new Date().toISOString(),
      },
    };
    expect(getResumeHref(p, Date.now())).toBeNull();
  });

  it("returns null when older than max age", () => {
    const old = new Date(Date.now() - RESUME_MAX_AGE_MS - 1000).toISOString();
    const p = {
      ...defaultProgress(),
      learningPath: { lastPath: "/pot-odds/learn", lastAt: old },
    };
    expect(getResumeHref(p, Date.now())).toBeNull();
  });

  it("returns stored path when valid and fresh", () => {
    const p = {
      ...defaultProgress(),
      learningPath: {
        lastPath: "/implied-odds/quiz",
        lastAt: new Date().toISOString(),
      },
    };
    expect(getResumeHref(p, Date.now())).toBe("/implied-odds/quiz");
  });
});
