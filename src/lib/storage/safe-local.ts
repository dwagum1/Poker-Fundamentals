const MEMORY = new Map<string, string>();

export function isStorageAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const k = "__poker_learn_storage_test__";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

export function getLocalItem(key: string): string | null {
  if (typeof window === "undefined") return null;
  if (!isStorageAvailable()) return MEMORY.get(key) ?? null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return MEMORY.get(key) ?? null;
  }
}

export function setLocalItem(key: string, value: string): void {
  if (typeof window === "undefined") return;
  if (!isStorageAvailable()) {
    MEMORY.set(key, value);
    return;
  }
  try {
    window.localStorage.setItem(key, value);
  } catch {
    MEMORY.set(key, value);
  }
}
