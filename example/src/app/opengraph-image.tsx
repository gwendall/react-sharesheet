import { generateOGImage } from "@/lib/og-image";

export const runtime = "nodejs";

// OpenGraph image - standard 1.91:1 ratio
// Works on: Facebook, LinkedIn, Discord, Slack, iMessage
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "react-sharesheet - Mobile-first React share sheet with native sharing";

export default async function Image() {
  return generateOGImage(
    {
      title: "react-sharesheet",
      subtitle: "Mobile-first React share sheet with native sharing and Open Graph previews",
    },
    size
  );
}
