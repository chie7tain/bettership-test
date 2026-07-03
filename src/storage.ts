import type {User} from "./types";

const FAVORITES_KEY = "betternship:favorites";

export function loadFavorites(): User[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites: User[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch {
    /* storage unavailable (private mode / quota) — ignore */
  }
}
