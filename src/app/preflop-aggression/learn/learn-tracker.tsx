"use client";

import { useEffect } from "react";
import { useApp } from "@/components/providers/app-providers";

export function LearnTracker() {
  const { updateProgress } = useApp();

  useEffect(() => {
    const now = new Date().toISOString();
    updateProgress((p) => ({
      ...p,
      preflopAggression: {
        ...p.preflopAggression,
        referenceVisitedAt: now,
      },
    }));
  }, [updateProgress]);

  return null;
}
