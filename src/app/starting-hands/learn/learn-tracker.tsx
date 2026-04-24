"use client";

import { useEffect } from "react";
import { useApp } from "@/components/providers/app-providers";

export function LearnTracker() {
  const { updateProgress } = useApp();

  useEffect(() => {
    const now = new Date().toISOString();
    updateProgress((p) => ({
      ...p,
      startingHands: {
        ...p.startingHands,
        referenceVisitedAt: now,
      },
    }));
  }, [updateProgress]);

  return null;
}
