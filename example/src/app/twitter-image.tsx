import { generateOGImage } from "@/lib/og-image";

export const runtime = "nodejs";

// Twitter card image - summary_large_image format
// Uses same 1.91:1 ratio as OG for consistency
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "react-sharesheet - A beautiful share sheet component for React";

export default async function Image() {
  return generateOGImage(
    {
      title: "react-sharesheet",
      subtitle: "A beautiful share sheet component for React with 15+ social platforms",
    },
    size
  );
}
