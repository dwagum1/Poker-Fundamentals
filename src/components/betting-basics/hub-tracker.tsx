"use client";

import { useEffect } from "react";
import { useApp } from "@/components/providers/app-providers";

export function HubTracker() {
  const { updateProgress } = useApp();

  useEffect(() => {
    const now = new Date().toISOString();
    updateProgress((p) => ({
      ...p,
      bettingBasics: {
        ...p.bettingBasics,
        hubVisitedAt: p.bettingBasics.hubVisitedAt ?? now,
      },
    }));
  }, [updateProgress]);

  return null;
}
