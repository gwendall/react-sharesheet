export interface ShareMenuContentProps {
  /** Title displayed at the top of the menu */
  title?: string;
  /** URL to share */
  shareUrl: string;
  /** Text to share alongside the URL */
  shareText: string;
  /** Optional URL for download functionality */
  downloadUrl?: string | null;
  /** Filename for downloaded file */
  downloadFilename?: string;
  /** Custom class name for the container */
  className?: string;
  /** Called when native share is triggered */
  onNativeShare?: () => void;
  /** Called when link is copied */
  onCopy?: () => void;
  /** Called when download starts */
  onDownload?: () => void;
}

export interface ShareMenuDrawerProps extends ShareMenuContentProps {
  /** Whether the drawer is disabled */
  disabled?: boolean;
  /** Trigger element for the drawer */
  children: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
}

