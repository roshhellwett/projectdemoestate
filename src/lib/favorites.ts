import { useEffect, useState } from "react";

const STORAGE_KEY = "realty_favorites_v1";

function readStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeStorage(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent("realty_favorites_change", { detail: ids }));
  } catch (err) {
    console.error("Failed to save favorites", err);
  }
}

function toggleFavorite(id: string): boolean {
  const list = readStorage();
  const index = list.indexOf(id);
  let next: string[];
  let favorited: boolean;
  if (index >= 0) {
    next = list.filter((item) => item !== id);
    favorited = false;
  } else {
    next = [...list, id];
    favorited = true;
  }
  writeStorage(next);
  return favorited;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(readStorage);

  useEffect(() => {
    const handleUpdate = () => {
      setFavorites(readStorage());
    };
    window.addEventListener("realty_favorites_change", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("realty_favorites_change", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return {
    favorites,
    count: favorites.length,
    isFavorite: (id: string) => favorites.includes(id),
    toggle: (id: string) => toggleFavorite(id),
  };
}
