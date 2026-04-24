"use client";

import { useEffect } from "react";
import { useApp } from "@/components/providers/app-providers";

export function HubTracker() {
  const { updateProgress } = useApp();

  useEffect(() => {
    const now = new Date().toISOString();
    updateProgress((p) => ({
      ...p,
      startingHands: {
        ...p.startingHands,
        hubVisitedAt: p.startingHands.hubVisitedAt ?? now,
      },
    }));
  }, [updateProgress]);

  return null;
}
