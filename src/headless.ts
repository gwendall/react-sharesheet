// Headless exports - just the hook and utilities, no styled components

export { useShareMenu, type UseShareMenuOptions } from "./hooks";

export {
  shareToWhatsApp,
  shareToTelegram,
  shareToX,
  shareToFacebook,
  openInstagram,
  openTikTok,
  openThreads,
  shareToSnapchat,
  shareViaSMS,
  shareViaEmail,
  shareToLinkedIn,
  shareToReddit,
} from "./share-functions";

export { cn, openUrl, getSafeUrl } from "./utils";

// Platform configs (colors, icons, labels) - SINGLE SOURCE OF TRUTH
export {
  PLATFORMS,
  PLATFORM_IDS,
  PLATFORM_COLORS,
  PLATFORM_ICONS,
  PLATFORM_LABELS,
  PLATFORM_CSS_VARS,
  getPlatform,
  getAllPlatforms,
  getPlatformColor,
  getPlatformIcon,
  getPlatformLabel,
  generateCssVarDefaults,
  type PlatformConfig,
  type PlatformColor,
} from "./platforms";

export type {
  UseShareMenuReturn,
  ShareOption,
  ShareButtonConfig,
} from "./types";
