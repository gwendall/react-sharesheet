import { ImageResponse } from "next/og";

// Theme configuration
const THEME: "light" | "dark" = "dark";

// Font sizes
const TITLE_FONT_SIZE = 72;
const SUBTITLE_FONT_SIZE = 32;

// System font stack
const FONT_FAMILY =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

// Colors
const colors = {
  light: {
    background: "#ffffff",
    foreground: "#09090b",
    muted: "#71717a",
    accent: "#7c3aed",
    accentLight: "#a78bfa",
  },
  dark: {
    background: "#09090b",
    foreground: "#fafafa",
    muted: "#a1a1aa",
    accent: "#7c3aed",
    accentLight: "#a78bfa",
  },
};

interface OGImageOptions {
  width: number;
  height: number;
}

interface OGImageProps {
  title?: string;
  subtitle?: string;
}

export async function generateOGImage(
  props: OGImageProps,
  options: OGImageOptions
): Promise<ImageResponse> {
  const { width, height } = options;
  const { title = "react-sharesheet", subtitle } = props;
  const theme = colors[THEME];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 80,
          background: `linear-gradient(135deg, ${theme.background} 0%, #18181b 100%)`,
          fontFamily: FONT_FAMILY,
        }}
      >
        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          {/* Logo/Icon with subtle glow ring */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 140,
              height: 140,
              borderRadius: 32,
              background: `radial-gradient(circle at center, ${theme.accent}30 0%, transparent 70%)`,
              marginBottom: 40,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 110,
                height: 110,
                borderRadius: 26,
                background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accentLight} 100%)`,
                boxShadow: `0 0 60px ${theme.accent}50`,
              }}
            >
              {/* Share arrow icon */}
              <svg
                width="52"
                height="52"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v10M12 5l-4 4M12 5l4 4" />
                <path d="M5 17h14" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              color: theme.foreground,
              fontSize: TITLE_FONT_SIZE,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: 20,
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div
              style={{
                display: "flex",
                color: theme.muted,
                fontSize: SUBTITLE_FONT_SIZE,
                fontWeight: 400,
                lineHeight: 1.4,
                maxWidth: 800,
                textAlign: "center",
              }}
            >
              {subtitle}
            </div>
          )}

          {/* Platform icons row - tighter spacing with ellipsis hint */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 48,
            }}
          >
            {["#25D366", "#229ED9", "#1877F2", "#E1306C", "#FF4500", "#0A66C2"].map(
              (color, i) => (
                <div
                  key={i}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 11,
                    background: color,
                    opacity: 0.9,
                  }}
                />
              )
            )}
            {/* Ellipsis hint for "more platforms" */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginLeft: 4,
              }}
            >
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: theme.muted,
                    opacity: 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width,
      height,
    }
  );
}
