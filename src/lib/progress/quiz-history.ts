import type { QuizAttemptRecord } from "./types";

export const MAX_QUIZ_HISTORY = 10;

export function appendQuizHistory(
  existing: QuizAttemptRecord[] | undefined,
  attempt: QuizAttemptRecord,
): QuizAttemptRecord[] {
  return [attempt, ...(existing ?? [])].slice(0, MAX_QUIZ_HISTORY);
}
