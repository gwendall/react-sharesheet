import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  shareToWhatsApp,
  shareToTelegram,
  shareToX,
  shareToFacebook,
  shareToLinkedIn,
  shareToReddit,
  shareToSnapchat,
  openInstagram,
  openTikTok,
  openThreads,
} from "../share-functions";

describe("share-functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("shareToWhatsApp", () => {
    it("should open WhatsApp with correct URL", () => {
      shareToWhatsApp("https://example.com", "Check this out!");
      
      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining("api.whatsapp.com"),
        "_blank",
        "noopener,noreferrer"
      );
      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining("Check%20this%20out!"),
        "_blank",
        "noopener,noreferrer"
      );
    });
  });

  describe("shareToTelegram", () => {
    it("should open Telegram with correct URL", () => {
      shareToTelegram("https://example.com", "Check this!");
      
      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining("t.me/share/url"),
        "_blank",
        "noopener,noreferrer"
      );
    });
  });

  describe("shareToX", () => {
    it("should open X with correct URL", () => {
      shareToX("https://example.com", "Amazing content!");
      
      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining("x.com/intent/tweet"),
        "_blank",
        "noopener,noreferrer"
      );
    });
  });

  describe("shareToFacebook", () => {
    it("should open Facebook share dialog", () => {
      shareToFacebook("https://example.com");
      
      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining("facebook.com/sharer"),
        "_blank",
        "noopener,noreferrer"
      );
    });
  });

  describe("shareToLinkedIn", () => {
    it("should open LinkedIn share dialog", () => {
      shareToLinkedIn("https://example.com");
      
      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining("linkedin.com"),
        "_blank",
        "noopener,noreferrer"
      );
    });
  });

  describe("shareToReddit", () => {
    it("should open Reddit submit page", () => {
      shareToReddit("https://example.com", "Cool title");
      
      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining("reddit.com/submit"),
        "_blank",
        "noopener,noreferrer"
      );
    });
  });

  describe("shareToSnapchat", () => {
    it("should open Snapchat share", () => {
      shareToSnapchat("https://example.com");
      
      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining("snapchat.com"),
        "_blank",
        "noopener,noreferrer"
      );
    });
  });

  describe("openInstagram", () => {
    it("should redirect to Instagram app", () => {
      // Mock location.href setter
      const hrefSetter = vi.fn();
      Object.defineProperty(window, "location", {
        value: { href: "" },
        writable: true,
      });
      Object.defineProperty(window.location, "href", {
        set: hrefSetter,
        get: () => "",
      });

      openInstagram();
      
      expect(hrefSetter).toHaveBeenCalledWith("instagram://");
    });
  });

  describe("openTikTok", () => {
    it("should redirect to TikTok app", () => {
      const hrefSetter = vi.fn();
      Object.defineProperty(window.location, "href", {
        set: hrefSetter,
        get: () => "",
      });

      openTikTok();
      
      expect(hrefSetter).toHaveBeenCalledWith("tiktok://");
    });
  });

  describe("openThreads", () => {
    it("should redirect to Threads app", () => {
      const hrefSetter = vi.fn();
      Object.defineProperty(window.location, "href", {
        set: hrefSetter,
        get: () => "",
      });

      openThreads();
      
      expect(hrefSetter).toHaveBeenCalledWith("threads://");
    });
  });
});
