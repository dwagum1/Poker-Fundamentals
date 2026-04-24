"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useApp } from "@/components/providers/app-providers";
import { shouldRecordLearningPath } from "@/lib/curriculum/path";

const DEBOUNCE_MS = 400;

/** Persists last visited module (or practice) path for the home “Resume” link. */
export function LearningPathRecorder() {
  const pathname = usePathname();
  const { updateProgress } = useApp();

  useEffect(() => {
    if (!pathname || !shouldRecordLearningPath(pathname)) return;
    const t = window.setTimeout(() => {
      updateProgress((p) => ({
        ...p,
        learningPath: {
          lastPath: pathname,
          lastAt: new Date().toISOString(),
        },
      }));
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [pathname, updateProgress]);

  return null;
}
