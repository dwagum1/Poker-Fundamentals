"use client";

import { useEffect } from "react";
import { useApp } from "@/components/providers/app-providers";

export function MultiwayHubTracker() {
  const { updateProgress } = useApp();

  useEffect(() => {
    const now = new Date().toISOString();
    updateProgress((p) => ({
      ...p,
      position: {
        ...p.position,
        multiwayHubVisitedAt: p.position.multiwayHubVisitedAt ?? now,
      },
    }));
  }, [updateProgress]);

  return null;
}
