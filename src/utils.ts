import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function openUrl(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export function getSafeUrl(shareUrl: string): string {
  return shareUrl || (typeof window !== "undefined" ? window.location.href : "");
}

