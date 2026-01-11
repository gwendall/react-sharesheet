import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
          borderRadius: 40,
        }}
      >
        {/* Share arrow icon */}
        <svg
          width="90"
          height="90"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v10M12 5l-4 4M12 5l4 4" />
          <path d="M5 17h14" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
