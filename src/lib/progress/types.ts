export type QuizWrongItem = {
  questionId: string;
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
};

export type QuizAttemptRecord = {
  completedAt: string;
  score: number;
  total: number;
  wrong: QuizWrongItem[];
};

export type HandRankingsProgress = {
  hubVisitedAt?: string;
  referenceVisitedAt?: string;
  quiz: {
    attempts: number;
    bestScore: number;
    lastScore?: number;
    lastCompletedAt?: string;
  };
  quizHistory?: QuizAttemptRecord[];
};

export type PositionProgress = {
  hubVisitedAt?: string;
  referenceVisitedAt?: string;
  quiz: {
    attempts: number;
    bestScore: number;
    lastScore?: number;
    lastCompletedAt?: string;
  };
  multiwayHubVisitedAt?: string;
  multiwayReferenceVisitedAt?: string;
  multiwayQuiz: {
    attempts: number;
    bestScore: number;
    lastScore?: number;
    lastCompletedAt?: string;
  };
  quizHistory?: QuizAttemptRecord[];
  multiwayQuizHistory?: QuizAttemptRecord[];
};

export type PotOddsProgress = {
  hubVisitedAt?: string;
  referenceVisitedAt?: string;
  quiz: {
    attempts: number;
    bestScore: number;
    lastScore?: number;
    lastCompletedAt?: string;
  };
  quizHistory?: QuizAttemptRecord[];
};

export type ImpliedOddsProgress = {
  hubVisitedAt?: string;
  referenceVisitedAt?: string;
  quiz: {
    attempts: number;
    bestScore: number;
    lastScore?: number;
    lastCompletedAt?: string;
  };
  quizHistory?: QuizAttemptRecord[];
};

export type StackToPotRatioProgress = {
  hubVisitedAt?: string;
  referenceVisitedAt?: string;
  quiz: {
    attempts: number;
    bestScore: number;
    lastScore?: number;
    lastCompletedAt?: string;
  };
  quizHistory?: QuizAttemptRecord[];
};

export type ExpectedValueProgress = {
  hubVisitedAt?: string;
  referenceVisitedAt?: string;
  quiz: {
    attempts: number;
    bestScore: number;
    lastScore?: number;
    lastCompletedAt?: string;
  };
  quizHistory?: QuizAttemptRecord[];
};

export type StartingHandsProgress = {
  hubVisitedAt?: string;
  referenceVisitedAt?: string;
  quiz: {
    attempts: number;
    bestScore: number;
    lastScore?: number;
    lastCompletedAt?: string;
  };
  quizHistory?: QuizAttemptRecord[];
};

export type PreflopAggressionProgress = {
  hubVisitedAt?: string;
  referenceVisitedAt?: string;
  quiz: {
    attempts: number;
    bestScore: number;
    lastScore?: number;
    lastCompletedAt?: string;
  };
  quizHistory?: QuizAttemptRecord[];
};

export type BettingBasicsProgress = {
  hubVisitedAt?: string;
  referenceVisitedAt?: string;
  quiz: {
    attempts: number;
    bestScore: number;
    lastScore?: number;
    lastCompletedAt?: string;
  };
  quizHistory?: QuizAttemptRecord[];
};

export type BluffingFundamentalsProgress = {
  hubVisitedAt?: string;
  referenceVisitedAt?: string;
  quiz: {
    attempts: number;
    bestScore: number;
    lastScore?: number;
    lastCompletedAt?: string;
  };
  quizHistory?: QuizAttemptRecord[];
};

export type BankrollManagementProgress = {
  hubVisitedAt?: string;
  referenceVisitedAt?: string;
  quiz: {
    attempts: number;
    bestScore: number;
    lastScore?: number;
    lastCompletedAt?: string;
  };
  quizHistory?: QuizAttemptRecord[];
};

export type MentalGameProgress = {
  hubVisitedAt?: string;
  referenceVisitedAt?: string;
  quiz: {
    attempts: number;
    bestScore: number;
    lastScore?: number;
    lastCompletedAt?: string;
  };
  quizHistory?: QuizAttemptRecord[];
};

export type RangesTextureProgress = {
  hubVisitedAt?: string;
  referenceVisitedAt?: string;
  quiz: {
    attempts: number;
    bestScore: number;
    lastScore?: number;
    lastCompletedAt?: string;
  };
  quizHistory?: QuizAttemptRecord[];
};

export type ThinValueBetSizingProgress = {
  hubVisitedAt?: string;
  referenceVisitedAt?: string;
  quiz: {
    attempts: number;
    bestScore: number;
    lastScore?: number;
    lastCompletedAt?: string;
  };
  quizHistory?: QuizAttemptRecord[];
};

export type LiveEtiquetteProgress = {
  hubVisitedAt?: string;
  referenceVisitedAt?: string;
  quiz: {
    attempts: number;
    bestScore: number;
    lastScore?: number;
    lastCompletedAt?: string;
  };
  quizHistory?: QuizAttemptRecord[];
};

/** Local calendar day streak + XP (browser local timezone). */
export type EngagementProgress = {
  xp: number;
  streakCurrent: number;
  /** Last local calendar day (YYYY-MM-DD) that counted toward streak. */
  streakLastQualifiedDate: string | null;
  streakBest: number;
};

/** Last meaningful route for “Resume” on the home path card. */
export type LearningPathProgress = {
  lastPath: string | null;
  lastAt: string | null;
};

export type AppProgress = {
  handRankings: HandRankingsProgress;
  position: PositionProgress;
  potOdds: PotOddsProgress;
  impliedOdds: ImpliedOddsProgress;
  stackToPotRatio: StackToPotRatioProgress;
  expectedValue: ExpectedValueProgress;
  startingHands: StartingHandsProgress;
  preflopAggression: PreflopAggressionProgress;
  bettingBasics: BettingBasicsProgress;
  bluffingFundamentals: BluffingFundamentalsProgress;
  bankrollManagement: BankrollManagementProgress;
  mentalGame: MentalGameProgress;
  rangesAndTexture: RangesTextureProgress;
  thinValueBetSizing: ThinValueBetSizingProgress;
  liveEtiquette: LiveEtiquetteProgress;
  engagement: EngagementProgress;
  learningPath: LearningPathProgress;
};

export const defaultProgress = (): AppProgress => ({
  handRankings: {
    quiz: { attempts: 0, bestScore: 0 },
  },
  position: {
    quiz: { attempts: 0, bestScore: 0 },
    multiwayQuiz: { attempts: 0, bestScore: 0 },
  },
  potOdds: {
    quiz: { attempts: 0, bestScore: 0 },
  },
  impliedOdds: {
    quiz: { attempts: 0, bestScore: 0 },
  },
  stackToPotRatio: {
    quiz: { attempts: 0, bestScore: 0 },
  },
  expectedValue: {
    quiz: { attempts: 0, bestScore: 0 },
  },
  startingHands: {
    quiz: { attempts: 0, bestScore: 0 },
  },
  preflopAggression: {
    quiz: { attempts: 0, bestScore: 0 },
  },
  bettingBasics: {
    quiz: { attempts: 0, bestScore: 0 },
  },
  bluffingFundamentals: {
    quiz: { attempts: 0, bestScore: 0 },
  },
  bankrollManagement: {
    quiz: { attempts: 0, bestScore: 0 },
  },
  mentalGame: {
    quiz: { attempts: 0, bestScore: 0 },
  },
  rangesAndTexture: {
    quiz: { attempts: 0, bestScore: 0 },
  },
  thinValueBetSizing: {
    quiz: { attempts: 0, bestScore: 0 },
  },
  liveEtiquette: {
    quiz: { attempts: 0, bestScore: 0 },
  },
  engagement: {
    xp: 0,
    streakCurrent: 0,
    streakLastQualifiedDate: null,
    streakBest: 0,
  },
  learningPath: {
    lastPath: null,
    lastAt: null,
  },
});
