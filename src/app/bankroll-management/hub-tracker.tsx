"use client";

import { useEffect } from "react";
import { useApp } from "@/components/providers/app-providers";

export function HubTracker() {
  const { updateProgress } = useApp();

  useEffect(() => {
    const now = new Date().toISOString();
    updateProgress((p) => ({
      ...p,
      bankrollManagement: {
        ...p.bankrollManagement,
        hubVisitedAt: p.bankrollManagement.hubVisitedAt ?? now,
      },
    }));
  }, [updateProgress]);

  return null;
}
