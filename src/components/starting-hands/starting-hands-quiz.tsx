"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useApp } from "@/components/providers/app-providers";
import {
  buildStartingHandsQuestions,
  STARTING_HANDS_QUIZ_LEN,
  type StartingHandsQuestion,
} from "@/lib/poker/starting-hands/quiz";
import { applyEngagementAfterQuiz } from "@/lib/progress/engagement";
import { appendQuizHistory } from "@/lib/progress/quiz-history";
import type { QuizWrongItem } from "@/lib/progress/types";

const QUIZ_LEN = STARTING_HANDS_QUIZ_LEN;

type LogRow = {
  questionId: string;
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
  correct: boolean;
};

export function StartingHandsQuiz() {
  const { updateProgress } = useApp();
  const [phase, setPhase] = useState<"intro" | "active" | "done">("intro");
  const [questions, setQuestions] = useState<StartingHandsQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [lastWrong, setLastWrong] = useState<QuizWrongItem[]>([]);
  const logRef = useRef<LogRow[]>([]);

  const current = questions[index];
  const progressLabel = `${index + 1}/${QUIZ_LEN}`;

  const start = useCallback(() => {
    logRef.current = [];
    setQuestions(buildStartingHandsQuestions(QUIZ_LEN));
    setIndex(0);
    setScore(0);
    setPicked(null);
    setShowResult(false);
    setLastWrong([]);
    setPhase("active");
  }, []);

  const finish = useCallback(
    (finalScore: number) => {
      const wrong: QuizWrongItem[] = logRef.current
        .filter((r) => !r.correct)
        .map(({ questionId, prompt, userAnswer, correctAnswer }) => ({
          questionId,
          prompt,
          userAnswer,
          correctAnswer,
        }));
      setLastWrong(wrong);
      updateProgress((p) => {
        const prev = p.startingHands.quiz;
        const best = Math.max(prev.bestScore, finalScore);
        const attempt = {
          completedAt: new Date().toISOString(),
          score: finalScore,
          total: QUIZ_LEN,
          wrong,
        };
        const next = {
          ...p,
          startingHands: {
            ...p.startingHands,
            quiz: {
              attempts: prev.attempts + 1,
              bestScore: best,
              lastScore: finalScore,
              lastCompletedAt: attempt.completedAt,
            },
            quizHistory: appendQuizHistory(p.startingHands.quizHistory, attempt),
          },
        };
        return applyEngagementAfterQuiz(next, {
          score: finalScore,
          total: QUIZ_LEN,
          completedAt: attempt.completedAt,
          prevBestScore: prev.bestScore,
          prevAttempts: prev.attempts,
        });
      });
      setPhase("done");
    },
    [updateProgress],
  );

  const onPick = (value: string) => {
    if (!current || showResult) return;
    const q = current;
    setPicked(value);
    setShowResult(true);
    const correct = value === q.answer;
    logRef.current.push({
      questionId: q.id,
      prompt: q.prompt,
      userAnswer: value,
      correctAnswer: q.answer,
      correct,
    });
    const nextScore = score + (correct ? 1 : 0);

    window.setTimeout(() => {
      const atEnd = index + 1 >= QUIZ_LEN;
      if (atEnd) {
        setScore(nextScore);
        finish(nextScore);
        return;
      }
      setScore(nextScore);
      setIndex((i) => i + 1);
      setShowResult(false);
      setPicked(null);
    }, 650);
  };

  if (phase === "intro") {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-900">
        <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
          Starting hands quiz
        </h2>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
          {QUIZ_LEN} questions: notation, scenarios, equity facts, preflop equity
          order (pairwise), strength categories, and matchup ideas.
        </p>
        <button
          type="button"
          onClick={start}
          className="mt-6 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
        >
          Start quiz
        </button>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-900">
        <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
          Round complete
        </h2>
        <p className="mt-2 text-2xl font-semibold text-emerald-800 dark:text-emerald-300">
          Score: {score}/{QUIZ_LEN}
        </p>
        {lastWrong.length > 0 && (
          <div className="mt-4 border-t border-stone-200 pt-4 dark:border-stone-600">
            <h3 className="text-sm font-medium text-stone-800 dark:text-stone-200">
              Review mistakes
            </h3>
            <ul className="mt-2 space-y-2">
              {lastWrong.map((w, i) => (
                <li key={`${w.questionId}_${i}`} className="text-sm">
                  <p className="text-stone-700 dark:text-stone-300">
                    {w.prompt}
                  </p>
                  <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                    You: {w.userAnswer} · Correct: {w.correctAnswer}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={start}
            className="rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Try again
          </button>
          <Link
            href="/starting-hands/history"
            className="inline-flex items-center rounded-lg border border-stone-300 px-4 py-2.5 text-sm font-medium text-stone-800 transition hover:border-emerald-500 dark:border-stone-600 dark:text-stone-200 dark:hover:border-emerald-500"
          >
            Full history
          </Link>
        </div>
      </div>
    );
  }

  if (!current) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-stone-500 dark:text-stone-400">
        <span>Question {progressLabel}</span>
        <span>Score: {score}</span>
      </div>
      <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
        {current.prompt}
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {current.options.map((opt) => {
          const showC = showResult && opt === current.answer;
          const showW =
            showResult && picked === opt && opt !== current.answer;
          return (
            <button
              key={opt}
              type="button"
              disabled={showResult}
              onClick={() => onPick(opt)}
              className={[
                "rounded-xl border px-3 py-3 text-left text-sm font-medium transition",
                showC
                  ? "border-emerald-600 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950/40"
                  : showW
                    ? "border-amber-600 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/30"
                    : "border-stone-200 bg-stone-50 hover:border-emerald-400 dark:border-stone-700 dark:bg-stone-900/60 dark:hover:border-emerald-600",
              ].join(" ")}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
