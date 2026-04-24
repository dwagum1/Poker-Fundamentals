"use client";

import { useEffect } from "react";
import { useApp } from "@/components/providers/app-providers";

export function HubTracker() {
  const { updateProgress } = useApp();

  useEffect(() => {
    const now = new Date().toISOString();
    updateProgress((p) => ({
      ...p,
      potOdds: {
        ...p.potOdds,
        hubVisitedAt: p.potOdds.hubVisitedAt ?? now,
      },
    }));
  }, [updateProgress]);

  return null;
}
