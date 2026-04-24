"use client";

import { useEffect } from "react";
import { useApp } from "@/components/providers/app-providers";

export function HubTracker() {
  const { updateProgress } = useApp();

  useEffect(() => {
    const now = new Date().toISOString();
    updateProgress((p) => ({
      ...p,
      preflopAggression: {
        ...p.preflopAggression,
        hubVisitedAt: p.preflopAggression.hubVisitedAt ?? now,
      },
    }));
  }, [updateProgress]);

  return null;
}
