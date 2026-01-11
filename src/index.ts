// Styled components
export { ShareSheetContent, ShareMenuContent } from "./ShareSheetContent";
export { ShareSheetDrawer, ShareMenuDrawer } from "./ShareSheetDrawer";

// Headless hook
export { useShareSheet, useShareMenu, useOGData, type UseShareSheetOptions, type UseShareMenuOptions } from "./hooks";

// OG Data fetcher
export { fetchOGData, clearOGCache, type OGData } from "./og-fetcher";

// Types
export type {
  ShareSheetContentProps,
  ShareSheetDrawerProps,
  ShareSheetContentClassNames,
  ShareSheetDrawerClassNames,
  // Legacy types (deprecated)
  ShareMenuContentProps,
  ShareMenuDrawerProps,
  ShareMenuContentClassNames,
  ShareMenuDrawerClassNames,
  // Common types
  ShareOption,
  ShareButtonConfig,
  UseShareSheetReturn,
  UseShareMenuReturn,
} from "./types";

// CSS Variables for UI (drawer, title, etc.)
export { CSS_VARS_UI, CSS_VAR_UI_DEFAULTS } from "./types";
// Legacy exports (deprecated but kept for backwards compatibility)
export { CSS_VARS, CSS_VAR_DEFAULTS } from "./types";

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

// Utility functions for custom implementations
export { cn, openUrl, getSafeUrl } from "./utils";

// Individual share functions
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
