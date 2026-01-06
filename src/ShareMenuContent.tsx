"use client";

import { useMemo, useState } from "react";
import {
  Download,
  Link as LinkIcon,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaReddit,
  FaTelegramPlane,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter, FaThreads, FaSnapchat } from "react-icons/fa6";

import { cn, getSafeUrl } from "./utils";
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
import type { ShareMenuContentProps } from "./types";

const BUTTON_SIZE = 45;
const ICON_SIZE = BUTTON_SIZE / 2.1;

const itemClass =
  "flex flex-col items-center gap-0 text-xs w-[60px] outline-none cursor-pointer group";
const itemIconClass = cn(
  "p-2 rounded-full transition-all",
  "flex items-center justify-center",
  "group-hover:scale-110 group-active:scale-95",
  "mb-2"
);

export function ShareMenuContent({
  title = "Share",
  shareUrl,
  shareText,
  downloadUrl,
  downloadFilename,
  className,
  onNativeShare,
  onCopy,
  onDownload,
}: ShareMenuContentProps) {
  const [copied, setCopied] = useState(false);
  const [downloadBusy, setDownloadBusy] = useState(false);

  const canNativeShare = useMemo(() => {
    return typeof navigator !== "undefined" && "share" in navigator;
  }, []);

  const safeUrl = getSafeUrl(shareUrl);

  async function copyLink() {
    if (!safeUrl) return;
    try {
      await navigator.clipboard.writeText(safeUrl);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }

  async function downloadFile() {
    const url = (downloadUrl ?? "").trim();
    if (!url) return;
    try {
      setDownloadBusy(true);
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
      setDownloadBusy(false);
    }
  }

  async function nativeShare() {
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
  }

  return (
    <div className={cn("max-w-md mx-auto", className)}>
      <div className="text-center mb-2">
        <div className="text-2xl font-black text-white">{title}</div>
        <div className="mt-1 text-sm text-zinc-400">{shareText}</div>
      </div>

      <div
        className={cn(
          "px-2 py-6 flex flex-row items-center gap-4 gap-y-6 flex-wrap",
          "justify-center"
        )}
      >
        {canNativeShare ? (
          <button
            type="button"
            className={itemClass}
            onClick={() => void nativeShare()}
          >
            <div
              className={cn(itemIconClass, "text-white")}
              style={{
                width: BUTTON_SIZE,
                height: BUTTON_SIZE,
                backgroundColor: "#7c3aed",
              }}
            >
              <Send size={ICON_SIZE} className="translate-x-[-2px]" />
            </div>
            <div>Share…</div>
          </button>
        ) : null}

        <button
          type="button"
          className={itemClass}
          onClick={() => void copyLink()}
        >
          <div
            className={cn(itemIconClass, "text-white")}
            style={{
              width: BUTTON_SIZE,
              height: BUTTON_SIZE,
              backgroundColor: "#3b82f6",
            }}
          >
            <LinkIcon size={22} />
          </div>
          <div>{copied ? "Copied!" : "Copy"}</div>
        </button>

        {downloadUrl ? (
          <button
            type="button"
            className={itemClass}
            onClick={() => void downloadFile()}
          >
            <div
              className={cn(itemIconClass, "text-white")}
              style={{
                width: BUTTON_SIZE,
                height: BUTTON_SIZE,
                backgroundColor: "#ef4444",
              }}
            >
              <Download size={22} />
            </div>
            <div>{downloadBusy ? "..." : "Download"}</div>
          </button>
        ) : null}

        <button
          type="button"
          className={itemClass}
          onClick={() => shareToWhatsApp(safeUrl, shareText)}
        >
          <div
            className={cn(itemIconClass, "text-white")}
            style={{
              width: BUTTON_SIZE,
              height: BUTTON_SIZE,
              backgroundColor: "#25D366",
            }}
          >
            <FaWhatsapp size={22} />
          </div>
          <div>WhatsApp</div>
        </button>

        <button
          type="button"
          className={itemClass}
          onClick={() => shareToTelegram(safeUrl, shareText)}
        >
          <div
            className={cn(itemIconClass, "text-white")}
            style={{
              width: BUTTON_SIZE,
              height: BUTTON_SIZE,
              backgroundColor: "#229ED9",
            }}
          >
            <FaTelegramPlane size={22} />
          </div>
          <div>Telegram</div>
        </button>

        <button type="button" className={itemClass} onClick={openInstagram}>
          <div
            className={cn(itemIconClass, "text-white")}
            style={{
              width: BUTTON_SIZE,
              height: BUTTON_SIZE,
              backgroundColor: "#E1306C",
            }}
          >
            <FaInstagram size={22} />
          </div>
          <div>Instagram</div>
        </button>

        <button
          type="button"
          className={itemClass}
          onClick={() => shareToFacebook(safeUrl)}
        >
          <div
            className={cn(itemIconClass, "text-white")}
            style={{
              width: BUTTON_SIZE,
              height: BUTTON_SIZE,
              backgroundColor: "#1877F2",
            }}
          >
            <FaFacebookF size={22} />
          </div>
          <div>Facebook</div>
        </button>

        <button
          type="button"
          className={itemClass}
          onClick={() => shareToSnapchat(safeUrl)}
        >
          <div
            className={cn(itemIconClass)}
            style={{
              width: BUTTON_SIZE,
              height: BUTTON_SIZE,
              backgroundColor: "#FFFC00",
            }}
          >
            <FaSnapchat size={22} className="text-black font-bold" />
          </div>
          <div>Snapchat</div>
        </button>

        <button
          type="button"
          className={itemClass}
          onClick={() => shareViaSMS(safeUrl, shareText)}
        >
          <div
            className={cn(itemIconClass, "text-white")}
            style={{
              width: BUTTON_SIZE,
              height: BUTTON_SIZE,
              backgroundColor: "#22c55e",
            }}
          >
            <MessageCircle size={22} />
          </div>
          <div>SMS</div>
        </button>

        <button
          type="button"
          className={itemClass}
          onClick={() => shareViaEmail(safeUrl, shareText, title)}
        >
          <div
            className={cn(itemIconClass, "text-white")}
            style={{
              width: BUTTON_SIZE,
              height: BUTTON_SIZE,
              backgroundColor: "#f97316",
            }}
          >
            <Mail size={22} />
          </div>
          <div>Email</div>
        </button>

        <button
          type="button"
          className={itemClass}
          onClick={() => shareToLinkedIn(safeUrl)}
        >
          <div
            className={cn(itemIconClass, "text-white")}
            style={{
              width: BUTTON_SIZE,
              height: BUTTON_SIZE,
              backgroundColor: "#0A66C2",
            }}
          >
            <FaLinkedin size={22} />
          </div>
          <div>LinkedIn</div>
        </button>

        <button
          type="button"
          className={itemClass}
          onClick={() => shareToReddit(safeUrl, shareText)}
        >
          <div
            className={cn(itemIconClass, "text-white")}
            style={{
              width: BUTTON_SIZE,
              height: BUTTON_SIZE,
              backgroundColor: "#FF4500",
            }}
          >
            <FaReddit size={22} />
          </div>
          <div>Reddit</div>
        </button>

        <button
          type="button"
          className={itemClass}
          onClick={() => shareToX(safeUrl, shareText)}
        >
          <div
            className={cn(itemIconClass, "text-white bg-white/10 hover:bg-white/15")}
            style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
          >
            <FaXTwitter size={22} />
          </div>
          <div>X</div>
        </button>

        <button type="button" className={itemClass} onClick={openTikTok}>
          <div
            className={cn(itemIconClass, "text-white bg-white/10 hover:bg-white/15")}
            style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
          >
            <FaTiktok size={22} />
          </div>
          <div>TikTok</div>
        </button>

        <button type="button" className={itemClass} onClick={openThreads}>
          <div
            className={cn(itemIconClass, "text-white bg-white/10 hover:bg-white/15")}
            style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
          >
            <FaThreads size={22} />
          </div>
          <div>Threads</div>
        </button>
      </div>
    </div>
  );
}

