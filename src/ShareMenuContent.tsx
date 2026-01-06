"use client";

import { useMemo } from "react";
import { cn } from "./utils";
import { useShareMenu } from "./hooks";
import {
  PLATFORM_IDS,
  PLATFORM_COLORS,
  PLATFORM_LABELS,
  PLATFORM_ICONS,
  PLATFORM_CSS_VARS,
} from "./platforms";
import {
  CSS_VARS_UI,
  CSS_VAR_UI_DEFAULTS,
  type ShareMenuContentProps,
  type ShareOption,
  type ShareButtonConfig,
} from "./types";

const DEFAULT_BUTTON_SIZE = 45;
const DEFAULT_ICON_SIZE = 22;

// Default class names
const defaultClasses = {
  root: "max-w-md mx-auto",
  header: "text-center mb-2",
  title: "text-2xl font-black",
  subtitle: "mt-1 text-sm",
  grid: "px-2 py-6 flex flex-row items-center gap-4 gap-y-6 flex-wrap justify-center",
  button: "flex flex-col items-center gap-0 text-xs w-[60px] outline-none cursor-pointer group",
  buttonIcon: "p-2 rounded-full transition-all flex items-center justify-center group-hover:scale-110 group-active:scale-95 mb-2",
  buttonLabel: "",
};

export function ShareMenuContent({
  title = "Share",
  shareUrl,
  shareText,
  downloadUrl,
  downloadFilename,
  className,
  classNames = {},
  buttonSize = DEFAULT_BUTTON_SIZE,
  iconSize = DEFAULT_ICON_SIZE,
  onNativeShare,
  onCopy,
  onDownload,
  hide = [],
  show,
  labels = {},
  icons = {},
}: ShareMenuContentProps) {
  const shareMenu = useShareMenu({
    shareUrl,
    shareText,
    downloadUrl,
    downloadFilename,
    emailSubject: title,
    onNativeShare,
    onCopy,
    onDownload,
  });

  // Map platform IDs to their share actions
  const shareActions: Record<ShareOption, () => void> = useMemo(() => ({
    native: () => void shareMenu.nativeShare(),
    copy: () => void shareMenu.copyLink(),
    download: () => void shareMenu.downloadFile(),
    whatsapp: shareMenu.shareWhatsApp,
    telegram: shareMenu.shareTelegram,
    instagram: shareMenu.shareInstagram,
    facebook: shareMenu.shareFacebook,
    snapchat: shareMenu.shareSnapchat,
    sms: shareMenu.shareSMS,
    email: shareMenu.shareEmail,
    linkedin: shareMenu.shareLinkedIn,
    reddit: shareMenu.shareReddit,
    x: shareMenu.shareX,
    tiktok: shareMenu.shareTikTok,
    threads: shareMenu.shareThreads,
  }), [shareMenu]);

  // Dynamic labels that depend on state
  const dynamicLabels: Partial<Record<ShareOption, string>> = useMemo(() => ({
    copy: shareMenu.copied ? "Copied!" : PLATFORM_LABELS.copy,
    download: shareMenu.downloading ? "..." : PLATFORM_LABELS.download,
  }), [shareMenu.copied, shareMenu.downloading]);

  // CSS variable style for the root element (UI vars + platform color vars)
  const cssVarStyle = useMemo(() => {
    const style: Record<string, string> = { ...CSS_VAR_UI_DEFAULTS };
    // Add platform color CSS vars from single source of truth
    PLATFORM_IDS.forEach((id) => {
      style[PLATFORM_CSS_VARS[id]] = PLATFORM_COLORS[id].bg;
    });
    return style;
  }, []);

  // Build button configs from platform data
  const buttons: ShareButtonConfig[] = useMemo(() => {
    return PLATFORM_IDS.map((id) => {
      const Icon = PLATFORM_ICONS[id];
      const defaultLabel = dynamicLabels[id] ?? PLATFORM_LABELS[id];
      
      return {
        id,
        label: labels[id] ?? defaultLabel,
        icon: icons[id] ?? <Icon size={iconSize} />,
        bgColor: `var(${PLATFORM_CSS_VARS[id]})`,
        textColor: PLATFORM_COLORS[id].text,
        onClick: shareActions[id],
        // Conditions for showing certain buttons
        condition: id === "native" ? shareMenu.canNativeShare
          : id === "download" ? !!downloadUrl
          : true,
      };
    });
  }, [iconSize, labels, icons, dynamicLabels, shareActions, shareMenu.canNativeShare, downloadUrl]);

  const visibleButtons = useMemo(() => {
    return buttons.filter((btn) => {
      // Check condition (e.g., canNativeShare, downloadUrl exists)
      if (btn.condition === false) return false;
      // Filter by show list if provided
      if (show && show.length > 0) return show.includes(btn.id);
      // Filter by hide list
      if (hide.includes(btn.id)) return false;
      return true;
    });
  }, [buttons, show, hide]);

  return (
    <div
      className={cn(defaultClasses.root, classNames.root, className)}
      style={cssVarStyle}
    >
      <div className={cn(defaultClasses.header, classNames.header)}>
        <div
          className={cn(defaultClasses.title, classNames.title)}
          style={{ color: `var(${CSS_VARS_UI.titleColor})` }}
        >
          {title}
        </div>
        <div
          className={cn(defaultClasses.subtitle, classNames.subtitle)}
          style={{ color: `var(${CSS_VARS_UI.subtitleColor})` }}
        >
          {shareText}
        </div>
      </div>

      <div className={cn(defaultClasses.grid, classNames.grid)}>
        {visibleButtons.map((btn) => (
          <button
            key={btn.id}
            type="button"
            className={cn(defaultClasses.button, classNames.button)}
            onClick={btn.onClick}
          >
            <div
              className={cn(defaultClasses.buttonIcon, classNames.buttonIcon)}
              style={{
                width: buttonSize,
                height: buttonSize,
                backgroundColor: btn.bgColor,
                color: btn.textColor,
              }}
            >
              {btn.icon}
            </div>
            <div
              className={cn(defaultClasses.buttonLabel, classNames.buttonLabel)}
              style={{ color: `var(${CSS_VARS_UI.buttonLabelColor})` }}
            >
              {btn.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
