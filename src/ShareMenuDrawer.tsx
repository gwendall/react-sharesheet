"use client";

import { useState, useMemo } from "react";
import { Drawer } from "vaul";

import { cn } from "./utils";
import { ShareMenuContent } from "./ShareMenuContent";
import { CSS_VARS_UI, CSS_VAR_UI_DEFAULTS, type ShareMenuDrawerProps } from "./types";
import { PLATFORM_IDS, PLATFORM_COLORS, PLATFORM_CSS_VARS } from "./platforms";

// Default class names for drawer
const defaultDrawerClasses = {
  overlay: "fixed inset-0 z-[70]",
  drawer: "flex flex-col rounded-t-[14px] h-[70%] mt-24 fixed bottom-0 left-0 right-0 z-[80] border-t outline-none",
  drawerInner: "p-4 rounded-t-[14px] flex-1 overflow-auto",
  handle: "mx-auto w-12 h-1.5 shrink-0 rounded-full mb-6",
  trigger: "",
};

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
  className,
  classNames = {},
  buttonSize,
  iconSize,
  onNativeShare,
  onCopy,
  onDownload,
  hide,
  show,
  labels,
  icons,
}: ShareMenuDrawerProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled
    ? (value: boolean) => controlledOnOpenChange?.(value)
    : setInternalOpen;

  // CSS variable style (UI vars + platform vars from single source of truth)
  const cssVarStyle = useMemo(() => {
    const style: Record<string, string> = { ...CSS_VAR_UI_DEFAULTS };
    // Add platform color CSS vars
    PLATFORM_IDS.forEach((id) => {
      style[PLATFORM_CSS_VARS[id]] = PLATFORM_COLORS[id].bg;
    });
    return style;
  }, []);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} shouldScaleBackground>
      <Drawer.Trigger asChild>
        <div
          className={cn(
            defaultDrawerClasses.trigger,
            classNames.trigger,
            disabled ? "pointer-events-none opacity-50" : ""
          )}
        >
          {children}
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay
          className={cn(defaultDrawerClasses.overlay, classNames.overlay)}
          style={{
            backgroundColor: `var(${CSS_VARS_UI.overlayBg})`,
            ...cssVarStyle,
          }}
        />
        <Drawer.Content
          className={cn(defaultDrawerClasses.drawer, classNames.drawer)}
          style={{
            backgroundColor: `var(${CSS_VARS_UI.drawerBg})`,
            borderColor: `var(${CSS_VARS_UI.drawerBorder})`,
            ...cssVarStyle,
          }}
        >
          <Drawer.Title className="sr-only">{title}</Drawer.Title>
          <div
            className={cn(defaultDrawerClasses.drawerInner, classNames.drawerInner)}
            style={{ backgroundColor: `var(${CSS_VARS_UI.drawerBg})` }}
          >
            <div
              className={cn(defaultDrawerClasses.handle, classNames.handle)}
              style={{ backgroundColor: `var(${CSS_VARS_UI.handleBg})` }}
            />

            <ShareMenuContent
              title={title}
              shareUrl={shareUrl}
              shareText={shareText}
              downloadUrl={downloadUrl}
              downloadFilename={downloadFilename}
              className={className}
              classNames={classNames}
              buttonSize={buttonSize}
              iconSize={iconSize}
              onNativeShare={() => {
                onNativeShare?.();
                setOpen(false);
              }}
              onCopy={onCopy}
              onDownload={onDownload}
              hide={hide}
              show={show}
              labels={labels}
              icons={icons}
            />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
