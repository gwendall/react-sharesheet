import { describe, it, expect } from "vitest";
import {
  PLATFORMS,
  PLATFORM_IDS,
  PLATFORM_COLORS,
  PLATFORM_LABELS,
  PLATFORM_ICONS,
  getPlatform,
  getAllPlatforms,
  getPlatformColor,
  getPlatformIcon,
  getPlatformLabel,
} from "../platforms";

describe("platforms", () => {
  describe("PLATFORM_IDS", () => {
    it("should contain all expected platforms", () => {
      expect(PLATFORM_IDS).toContain("native");
      expect(PLATFORM_IDS).toContain("copy");
      expect(PLATFORM_IDS).toContain("download");
      expect(PLATFORM_IDS).toContain("whatsapp");
      expect(PLATFORM_IDS).toContain("telegram");
      expect(PLATFORM_IDS).toContain("x");
      expect(PLATFORM_IDS).toContain("facebook");
      expect(PLATFORM_IDS).toContain("instagram");
      expect(PLATFORM_IDS).toContain("linkedin");
      expect(PLATFORM_IDS).toContain("reddit");
      expect(PLATFORM_IDS).toContain("sms");
      expect(PLATFORM_IDS).toContain("email");
    });
  });

  describe("PLATFORM_COLORS", () => {
    it("should have colors for all platforms", () => {
      PLATFORM_IDS.forEach((id) => {
        expect(PLATFORM_COLORS[id]).toBeDefined();
        expect(PLATFORM_COLORS[id].bg).toBeDefined();
        expect(PLATFORM_COLORS[id].text).toBeDefined();
      });
    });

    it("should have valid hex colors", () => {
      const hexRegex = /^#[0-9A-Fa-f]{6}$/;
      Object.values(PLATFORM_COLORS).forEach((color) => {
        expect(color.bg).toMatch(hexRegex);
        expect(color.text).toMatch(hexRegex);
      });
    });
  });

  describe("PLATFORM_LABELS", () => {
    it("should have labels for all platforms", () => {
      PLATFORM_IDS.forEach((id) => {
        expect(PLATFORM_LABELS[id]).toBeDefined();
        expect(typeof PLATFORM_LABELS[id]).toBe("string");
        expect(PLATFORM_LABELS[id].length).toBeGreaterThan(0);
      });
    });
  });

  describe("PLATFORM_ICONS", () => {
    it("should have icons for all platforms", () => {
      PLATFORM_IDS.forEach((id) => {
        expect(PLATFORM_ICONS[id]).toBeDefined();
      });
    });
  });

  describe("getPlatform", () => {
    it("should return platform config by ID", () => {
      const whatsapp = getPlatform("whatsapp");
      
      expect(whatsapp).toBeDefined();
      expect(whatsapp?.id).toBe("whatsapp");
      expect(whatsapp?.label).toBe("WhatsApp");
      expect(whatsapp?.colors.bg).toBe("#25D366");
    });

    it("should return undefined for unknown platform", () => {
      const unknown = getPlatform("unknown" as any);
      expect(unknown).toBeUndefined();
    });
  });

  describe("getAllPlatforms", () => {
    it("should return all platforms", () => {
      const platforms = getAllPlatforms();
      
      expect(platforms.length).toBe(PLATFORM_IDS.length);
      platforms.forEach((platform) => {
        expect(platform.id).toBeDefined();
        expect(platform.label).toBeDefined();
        expect(platform.colors).toBeDefined();
        expect(platform.Icon).toBeDefined();
      });
    });
  });

  describe("getPlatformColor", () => {
    it("should return color object for platform", () => {
      const whatsappColor = getPlatformColor("whatsapp");
      expect(whatsappColor.bg).toBe("#25D366");
      expect(whatsappColor.text).toBe("#ffffff");
      
      const xColor = getPlatformColor("x");
      expect(xColor.bg).toBe("#000000");
    });

    it("should return undefined for unknown platform", () => {
      expect(getPlatformColor("unknown" as any)).toBeUndefined();
    });
  });

  describe("getPlatformIcon", () => {
    it("should return icon component for platform", () => {
      const icon = getPlatformIcon("whatsapp");
      expect(icon).toBeDefined();
    });

    it("should return undefined for unknown platform", () => {
      expect(getPlatformIcon("unknown" as any)).toBeUndefined();
    });
  });

  describe("getPlatformLabel", () => {
    it("should return label for platform", () => {
      expect(getPlatformLabel("whatsapp")).toBe("WhatsApp");
      expect(getPlatformLabel("x")).toBe("X");
      expect(getPlatformLabel("copy")).toBe("Copy");
    });

    it("should return undefined for unknown platform", () => {
      expect(getPlatformLabel("unknown" as any)).toBeUndefined();
    });
  });

  describe("PLATFORMS", () => {
    it("should be a record of all platform configs", () => {
      PLATFORM_IDS.forEach((id) => {
        expect(PLATFORMS[id]).toBeDefined();
        expect(PLATFORMS[id].id).toBe(id);
        expect(PLATFORMS[id].colors).toBeDefined();
        expect(PLATFORMS[id].Icon).toBeDefined();
        expect(PLATFORMS[id].label).toBeDefined();
      });
    });
  });
});
