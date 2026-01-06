"use client";

import { useMemo, useState, useCallback } from "react";
import { getSafeUrl } from "./utils";
import {
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
import type { UseShareSheetReturn } from "./types";

export interface UseShareSheetOptions {
  /** URL to share */
  shareUrl: string;
  /** Text to share */
  shareText: string;
  /** Download URL (optional) */
  downloadUrl?: string | null;
  /** Download filename (optional) */
  downloadFilename?: string;
  /** Email subject (optional) */
  emailSubject?: string;
  /** Callback after native share */
  onNativeShare?: () => void;
  /** Callback after copy */
  onCopy?: () => void;
  /** Callback after download starts */
  onDownload?: () => void;
}

/**
 * Headless hook for share sheet functionality.
 * Use this to build your own custom share UI.
 */
export function useShareSheet({
  shareUrl,
  shareText,
  downloadUrl,
  downloadFilename,
  emailSubject = "Share",
  onNativeShare,
  onCopy,
  onDownload,
}: UseShareSheetOptions): UseShareSheetReturn {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const canNativeShare = useMemo(() => {
    return typeof navigator !== "undefined" && "share" in navigator;
  }, []);

  const safeUrl = getSafeUrl(shareUrl);

  const copyLink = useCallback(async () => {
    if (!safeUrl) return;
    try {
      await navigator.clipboard.writeText(safeUrl);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }, [safeUrl, onCopy]);

  const nativeShare = useCallback(async () => {
    if (!safeUrl) return;
    const nav = navigator as Navigator & {
      share?: (data: ShareData) => Promise<void>;
    };
    if (!("share" in nav) || typeof nav.share !== "function") return;
    try {
      await nav.share({
        title: shareText,
        text: shareText,
        url: safeUrl,
      });
      onNativeShare?.();
    } catch {
      // user canceled or share failed -> ignore
    }
  }, [safeUrl, shareText, onNativeShare]);

  const downloadFile = useCallback(async () => {
    const url = (downloadUrl ?? "").trim();
    if (!url) return;
    try {
      setDownloading(true);
      onDownload?.();
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch file (${res.status})`);
      const blob = await res.blob();
      const href = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = href;
      a.download = downloadFilename || "download";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(href);
    } catch {
      // ignore
    } finally {
      setDownloading(false);
    }
  }, [downloadUrl, downloadFilename, onDownload]);

  const shareWhatsApp = useCallback(() => {
    shareToWhatsApp(safeUrl, shareText);
  }, [safeUrl, shareText]);

  const shareTelegram = useCallback(() => {
    shareToTelegram(safeUrl, shareText);
  }, [safeUrl, shareText]);

  const shareX = useCallback(() => {
    shareToX(safeUrl, shareText);
  }, [safeUrl, shareText]);

  const shareFacebook = useCallback(() => {
    shareToFacebook(safeUrl);
  }, [safeUrl]);

  const shareInstagram = useCallback(() => {
    openInstagram();
  }, []);

  const shareTikTok = useCallback(() => {
    openTikTok();
  }, []);

  const shareThreads = useCallback(() => {
    openThreads();
  }, []);

  const shareSnapchat = useCallback(() => {
    shareToSnapchat(safeUrl);
  }, [safeUrl]);

  const shareSMS = useCallback(() => {
    shareViaSMS(safeUrl, shareText);
  }, [safeUrl, shareText]);

  const shareEmail = useCallback(() => {
    shareViaEmail(safeUrl, shareText, emailSubject);
  }, [safeUrl, shareText, emailSubject]);

  const shareLinkedIn = useCallback(() => {
    shareToLinkedIn(safeUrl);
  }, [safeUrl]);

  const shareReddit = useCallback(() => {
    shareToReddit(safeUrl, shareText);
  }, [safeUrl, shareText]);

  return {
    canNativeShare,
    copied,
    downloading,
    safeUrl,
    copyLink,
    nativeShare,
    downloadFile,
    shareWhatsApp,
    shareTelegram,
    shareX,
    shareFacebook,
    shareInstagram,
    shareTikTok,
    shareThreads,
    shareSnapchat,
    shareSMS,
    shareEmail,
    shareLinkedIn,
    shareReddit,
  };
}

// Legacy export for backwards compatibility
/** @deprecated Use useShareSheet instead */
export const useShareMenu = useShareSheet;
/** @deprecated Use UseShareSheetOptions instead */
export type UseShareMenuOptions = UseShareSheetOptions;
