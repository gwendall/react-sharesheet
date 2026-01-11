import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ShareOption, PlatformAvailability } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function openUrl(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export function getSafeUrl(shareUrl: string): string {
  return shareUrl || (typeof window !== "undefined" ? window.location.href : "");
}

/**
 * Detect if the current device is a mobile device.
 * Uses user agent detection as the primary method.
 */
export function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  
  const userAgent = navigator.userAgent || navigator.vendor || "";
  
  // Check for mobile user agents
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  
  // Also check for touch capability as a secondary signal
  const hasTouch = typeof window !== "undefined" && (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
  
  // User agent is more reliable than touch detection alone
  // (many desktop browsers support touch)
  return mobileRegex.test(userAgent);
}

/**
 * Detect if the current device is iOS
 */
export function isIOSDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  
  const userAgent = navigator.userAgent || "";
  return /iPhone|iPad|iPod/i.test(userAgent);
}

/**
 * Detect if the current device is Android
 */
export function isAndroidDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  
  const userAgent = navigator.userAgent || "";
  return /Android/i.test(userAgent);
}

/** Platforms that require mobile devices (deep links / URL schemes) */
export const MOBILE_ONLY_PLATFORMS: readonly ShareOption[] = [
  "instagram",
  "tiktok", 
  "threads",
  "sms",
] as const;

/** Platforms that work better on mobile but may partially work on desktop */
export const MOBILE_PREFERRED_PLATFORMS: readonly ShareOption[] = [
  "snapchat",
  "whatsapp",
] as const;

/**
 * Check if a share platform is available on the current device.
 * Returns availability status and reason if unavailable.
 */
export function checkPlatformAvailability(platform: ShareOption): PlatformAvailability {
  const isMobile = isMobileDevice();
  
  // Deep link platforms - require mobile device
  if (MOBILE_ONLY_PLATFORMS.includes(platform)) {
    if (!isMobile) {
      return {
        available: false,
        reason: `${platform} requires a mobile device with the app installed`,
      };
    }
  }
  
  // SMS - requires mobile or device with SMS capability
  if (platform === "sms" && !isMobile) {
    return {
      available: false,
      reason: "SMS sharing requires a mobile device",
    };
  }
  
  // Native share - check browser support
  if (platform === "native") {
    const canShare = typeof navigator !== "undefined" && "share" in navigator;
    if (!canShare) {
      return {
        available: false,
        reason: "Native share is not supported by this browser",
      };
    }
  }
  
  return { available: true };
}

/**
 * Get availability status for all platforms.
 */
export function getAllPlatformAvailability(): Record<ShareOption, PlatformAvailability> {
  const platforms: ShareOption[] = [
    "native", "copy", "download", "whatsapp", "telegram",
    "instagram", "facebook", "snapchat", "sms", "email",
    "linkedin", "reddit", "x", "tiktok", "threads",
  ];
  
  const result: Partial<Record<ShareOption, PlatformAvailability>> = {};
  for (const platform of platforms) {
    result[platform] = checkPlatformAvailability(platform);
  }
  
  return result as Record<ShareOption, PlatformAvailability>;
}

/**
 * Log a warning to console when a platform is not available.
 */
export function warnUnavailablePlatform(platform: ShareOption, reason: string): void {
  console.warn(
    `[react-sharesheet] ${platform} sharing is not available: ${reason}. ` +
    `This share option may not work correctly on this device.`
  );
}

