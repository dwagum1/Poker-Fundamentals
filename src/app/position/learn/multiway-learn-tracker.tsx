"use client";

import { useEffect } from "react";
import { useApp } from "@/components/providers/app-providers";

export function MultiwayLearnTracker() {
  const { updateProgress } = useApp();

  useEffect(() => {
    const now = new Date().toISOString();
    updateProgress((p) => ({
      ...p,
      position: {
        ...p.position,
        multiwayReferenceVisitedAt: now,
      },
    }));
  }, [updateProgress]);

  return null;
}
