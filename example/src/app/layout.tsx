import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://sharesheet.gwendall.com";
const SITE_NAME = "react-sharesheet";
const SITE_DESCRIPTION =
  "A beautiful share sheet component for React with 15+ social platforms, CSS theming, and headless mode.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "react",
    "share",
    "sharesheet",
    "social media",
    "component",
    "drawer",
    "whatsapp",
    "telegram",
    "twitter",
    "facebook",
  ],
  authors: [{ name: "Gwendall", url: "https://gwendall.com" }],
  creator: "Gwendall",
  publisher: "Gwendall",

  // Canonical URL
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph - Facebook, LinkedIn, Discord, Slack, etc.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: SITE_DESCRIPTION,
        type: "image/png",
      },
    ],
  },

  // Twitter Card - X (Twitter)
  twitter: {
    card: "summary_large_image",
    site: "@gaborcselle", // Change to your Twitter handle
    creator: "@gaborcselle", // Change to your Twitter handle
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/twitter-image"],
  },

  // Icons - using generated icons from icon.tsx and apple-icon.tsx

  // App-specific
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_NAME,
  },

  // Verification (add your own if needed)
  // verification: {
  //   google: "your-google-verification-code",
  // },

  // Other
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
