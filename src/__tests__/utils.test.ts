import { describe, it, expect, vi, beforeEach } from "vitest";
import { cn, getSafeUrl, openUrl } from "../utils";

describe("utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("cn", () => {
    it("should merge class names", () => {
      expect(cn("foo", "bar")).toBe("foo bar");
    });

    it("should handle conditional classes", () => {
      expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
    });

    it("should handle undefined values", () => {
      expect(cn("foo", undefined, "bar")).toBe("foo bar");
    });

    it("should merge Tailwind classes correctly", () => {
      expect(cn("p-4", "p-2")).toBe("p-2");
      expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    });

    it("should handle empty inputs", () => {
      expect(cn()).toBe("");
      expect(cn("")).toBe("");
    });
  });

  describe("getSafeUrl", () => {
    it("should return URL if provided", () => {
      expect(getSafeUrl("https://example.com")).toBe("https://example.com");
    });

    it("should return URL as-is (no trimming)", () => {
      // Current implementation doesn't trim
      expect(getSafeUrl("  https://example.com  ")).toBe("  https://example.com  ");
    });

    it("should return current location for empty URL", () => {
      const originalHref = window.location.href;
      expect(getSafeUrl("")).toBe(originalHref);
    });

    it("should return current location for falsy URL", () => {
      const originalHref = window.location.href;
      expect(getSafeUrl("")).toBe(originalHref);
    });
  });

  describe("openUrl", () => {
    it("should open URL in new tab with security options", () => {
      openUrl("https://example.com");
      expect(window.open).toHaveBeenCalledWith(
        "https://example.com",
        "_blank",
        "noopener,noreferrer"
      );
    });
  });
});
