import { getLocalItem, setLocalItem } from "@/lib/storage/safe-local";
import type { Profile } from "./types";

const KEY = "poker-learn:v1:profile";

function randomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

export function loadProfile(): Profile | null {
  const raw = getLocalItem(KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Profile;
    if (
      typeof parsed.profileId === "string" &&
      typeof parsed.displayName === "string" &&
      typeof parsed.createdAt === "string"
    ) {
      return parsed;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function saveProfile(profile: Profile): void {
  setLocalItem(KEY, JSON.stringify(profile));
}

export function createProfile(displayName: string): Profile {
  const trimmed = displayName.trim() || "Learner";
  return {
    profileId: randomId(),
    displayName: trimmed.slice(0, 48),
    createdAt: new Date().toISOString(),
  };
}
