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
          {/* Logo/Icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 120,
              height: 120,
              borderRadius: 24,
              background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accentLight} 100%)`,
              marginBottom: 40,
            }}
          >
            {/* Share arrow icon */}
            <svg
              width="56"
              height="56"
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

          {/* Platform icons row */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 48,
            }}
          >
            {["#25D366", "#229ED9", "#000000", "#1877F2", "#E1306C"].map(
              (color, i) => (
                <div
                  key={i}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: color,
                    opacity: 0.8,
                  }}
                />
              )
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: theme.muted,
            fontSize: 20,
          }}
        >
          <span>github.com/gwendall/react-sharesheet</span>
        </div>
      </div>
    ),
    {
      width,
      height,
    }
  );
}
