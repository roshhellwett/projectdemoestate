import { useEffect, useState } from "react";
import type { Property } from "./types";

const COMPARE_STORAGE_KEY = "realty_compare_items_v1";
const MAX_COMPARE_ITEMS = 4;

export interface CompareItem {
  id: string;
  slug: string;
  title: string;
  locality: string;
  price_inr: number | null;
  price_display: string | null;
  bhk_type: string;
  area_sqft: number | null;
  bathrooms: number | null;
  facing: string | null;
  possession_status: string;
  furnishing_status: string;
  main_image: string;
  main_image_thumb: string;
}

function propertyToCompareItem(p: Property): CompareItem {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    locality: p.locality,
    price_inr: p.price_inr,
    price_display: p.price_display,
    bhk_type: p.bhk_type,
    area_sqft: p.area_sqft,
    bathrooms: p.bathrooms,
    facing: p.facing,
    possession_status: p.possession_status,
    furnishing_status: p.furnishing_status,
    main_image: p.main_image,
    main_image_thumb: p.main_image_thumb,
  };
}

function readCompareStorage(): CompareItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(COMPARE_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CompareItem[]) : [];
  } catch {
    return [];
  }
}

function writeCompareStorage(items: CompareItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("realty_compare_change", { detail: items }));
  } catch (err) {
    console.error("Failed to save comparison items", err);
  }
}

function toggleCompareItem(item: CompareItem): { added: boolean; list: CompareItem[]; limitReached: boolean } {
  const current = readCompareStorage();
  const exists = current.some((c) => c.id === item.id);
  if (exists) {
    const next = current.filter((c) => c.id !== item.id);
    writeCompareStorage(next);
    return { added: false, list: next, limitReached: false };
  }
  if (current.length >= MAX_COMPARE_ITEMS) {
    return { added: false, list: current, limitReached: true };
  }
  const next = [...current, item];
  writeCompareStorage(next);
  return { added: true, list: next, limitReached: false };
}

function clearCompareItems(): void {
  writeCompareStorage([]);
}

export function useCompare() {
  const [items, setItems] = useState<CompareItem[]>(readCompareStorage);

  useEffect(() => {
    const handleUpdate = () => {
      setItems(readCompareStorage());
    };
    window.addEventListener("realty_compare_change", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("realty_compare_change", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return {
    items,
    count: items.length,
    isCompared: (id: string) => items.some((item) => item.id === id),
    toggle: (property: Property) => toggleCompareItem(propertyToCompareItem(property)),
    removeItem: (id: string) => {
      const next = items.filter((item) => item.id !== id);
      writeCompareStorage(next);
    },
    clear: clearCompareItems,
    maxLimit: MAX_COMPARE_ITEMS,
  };
}
