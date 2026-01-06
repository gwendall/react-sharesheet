"use client";

import { useState } from "react";
import { Drawer } from "vaul";

import { cn } from "./utils";
import { ShareMenuContent } from "./ShareMenuContent";
import type { ShareMenuDrawerProps } from "./types";

export function ShareMenuDrawer({
  title = "Share",
  shareUrl,
  shareText,
  downloadUrl,
  downloadFilename,
  disabled,
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  onNativeShare,
  onCopy,
  onDownload,
}: ShareMenuDrawerProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled
    ? (value: boolean) => controlledOnOpenChange?.(value)
    : setInternalOpen;

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} shouldScaleBackground>
      <Drawer.Trigger asChild>
        <div
          className={cn(disabled ? "pointer-events-none opacity-50" : "")}
        >
          {children}
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/70 z-70" />
        <Drawer.Content className="bg-zinc-950 flex flex-col rounded-t-[14px] h-[70%] mt-24 fixed bottom-0 left-0 right-0 z-80 border-t border-zinc-800 outline-none">
          <Drawer.Title className="sr-only">{title}</Drawer.Title>
          <div className="p-4 bg-zinc-950 rounded-t-[14px] flex-1 overflow-auto">
            <div className="mx-auto w-12 h-1.5 shrink-0 rounded-full bg-zinc-800 mb-6" />

            <ShareMenuContent
              title={title}
              shareUrl={shareUrl}
              shareText={shareText}
              downloadUrl={downloadUrl}
              downloadFilename={downloadFilename}
              onNativeShare={() => {
                onNativeShare?.();
                setOpen(false);
              }}
              onCopy={onCopy}
              onDownload={onDownload}
            />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

