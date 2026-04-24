"use client";

import { useEffect } from "react";
import { useApp } from "@/components/providers/app-providers";

export function LearnTracker() {
  const { updateProgress } = useApp();

  useEffect(() => {
    const now = new Date().toISOString();
    updateProgress((p) => ({
      ...p,
      stackToPotRatio: {
        ...p.stackToPotRatio,
        referenceVisitedAt: now,
      },
    }));
  }, [updateProgress]);

  return null;
}
