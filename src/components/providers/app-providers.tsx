"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createProfile, loadProfile, saveProfile } from "@/lib/profile/local-profile";
import type { Profile } from "@/lib/profile/types";
import { LearningPathRecorder } from "@/components/curriculum/learning-path-recorder";
import { loadProgress, patchProgress } from "@/lib/progress/local-progress";
import type { AppProgress } from "@/lib/progress/types";
import { isStorageAvailable } from "@/lib/storage/safe-local";

type AppState = {
  profile: Profile | null;
  progress: AppProgress;
  storageOk: boolean;
  setDisplayName: (name: string) => void;
  updateProgress: (fn: (p: AppProgress) => AppProgress) => void;
  refreshProgress: () => void;
};

const AppContext = createContext<AppState | null>(null);

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<AppProgress>(() => loadProgress());
  const [storageOk, setStorageOk] = useState(true);

  useEffect(() => {
    queueMicrotask(() => {
      setStorageOk(isStorageAvailable());
      setProfile(loadProfile());
      setProgress(loadProgress());
      setHydrated(true);
    });
  }, []);

  const setDisplayName = useCallback((name: string) => {
    const next = createProfile(name);
    saveProfile(next);
    setProfile(next);
  }, []);

  const updateProgress = useCallback((fn: (p: AppProgress) => AppProgress) => {
    const next = patchProgress(fn);
    setProgress(next);
  }, []);

  const refreshProgress = useCallback(() => {
    setProgress(loadProgress());
  }, []);

  const value = useMemo(
    () => ({
      profile,
      progress,
      storageOk,
      setDisplayName,
      updateProgress,
      refreshProgress,
    }),
    [profile, progress, storageOk, setDisplayName, updateProgress, refreshProgress],
  );

  if (!hydrated) {
    return (
      <div className="flex min-h-full flex-1 items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
        <p className="text-sm text-stone-500 dark:text-stone-400">Loading…</p>
      </div>
    );
  }

  return (
    <AppContext.Provider value={value}>
      <LearningPathRecorder />
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProviders");
  return ctx;
}
