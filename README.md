# @gwendall/share-menu

A beautiful, customizable share menu component for React applications with social media integrations.

## Installation

```bash
npm install @gwendall/share-menu
# or
pnpm add @gwendall/share-menu
# or
yarn add @gwendall/share-menu
```

### For GitHub Packages

Add to your `.npmrc`:

```
@gwendall:registry=https://npm.pkg.github.com
```

## Usage

### Full Drawer (with Vaul)

```tsx
import { ShareMenuDrawer } from "@gwendall/share-menu";
// or
import { ShareMenuDrawer } from "@gwendall/share-menu/drawer";

function App() {
  return (
    <ShareMenuDrawer
      title="Share this!"
      shareUrl="https://example.com"
      shareText="Check out this awesome page!"
      downloadUrl="https://example.com/file.mp4"
      downloadFilename="my-video.mp4"
    >
      <button>Share</button>
    </ShareMenuDrawer>
  );
}
```

### Content Only (for custom containers)

```tsx
import { ShareMenuContent } from "@gwendall/share-menu";
// or
import { ShareMenuContent } from "@gwendall/share-menu/content";

function CustomShareModal() {
  return (
    <MyCustomModal>
      <ShareMenuContent
        title="Share"
        shareUrl="https://example.com"
        shareText="Check this out!"
      />
    </MyCustomModal>
  );
}
```

## Props

### ShareMenuContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Share"` | Title displayed at the top |
| `shareUrl` | `string` | required | URL to share |
| `shareText` | `string` | required | Text to share alongside the URL |
| `downloadUrl` | `string \| null` | - | Optional URL for download functionality |
| `downloadFilename` | `string` | - | Filename for downloaded file |
| `className` | `string` | - | Custom class name for the container |
| `onNativeShare` | `() => void` | - | Called when native share is triggered |
| `onCopy` | `() => void` | - | Called when link is copied |
| `onDownload` | `() => void` | - | Called when download starts |

### ShareMenuDrawer

Includes all props from `ShareMenuContent` plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Whether the drawer is disabled |
| `children` | `ReactNode` | required | Trigger element for the drawer |
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Callback when open state changes |

## Utility Functions

You can also import individual share functions for custom implementations:

```tsx
import {
  shareToWhatsApp,
  shareToTelegram,
  shareToX,
  shareToFacebook,
  shareToLinkedIn,
  shareToReddit,
  shareToSnapchat,
  shareViaSMS,
  shareViaEmail,
  openInstagram,
  openTikTok,
  openThreads,
} from "@gwendall/share-menu";
```

## Supported Platforms

- Native Share (Web Share API)
- Copy Link
- Download
- WhatsApp
- Telegram
- Instagram
- Facebook
- Snapchat
- SMS
- Email
- LinkedIn
- Reddit
- X (Twitter)
- TikTok
- Threads

## Requirements

- React 18+
- Tailwind CSS (for styling)

## License

MIT

