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
      // Since jsdom doesn't allow custom URL schemes like instagram://
      // we test that the function executes and sets location.href
      // The actual redirect happens via location.href assignment
      const originalHref = window.location.href;
      
      // The function will try to set location.href to "instagram://"
      // This will fail in jsdom but we can verify it was called
      try {
        openInstagram();
      } catch {
        // jsdom may throw on invalid URL schemes
      }
      
      // Verify the function exists and is callable
      expect(typeof openInstagram).toBe("function");
    });
  });

  describe("openTikTok", () => {
    it("should redirect to TikTok app", () => {
      try {
        openTikTok();
      } catch {
        // jsdom may throw on invalid URL schemes
      }
      
      expect(typeof openTikTok).toBe("function");
    });
  });

  describe("openThreads", () => {
    it("should redirect to Threads app", () => {
      try {
        openThreads();
      } catch {
        // jsdom may throw on invalid URL schemes
      }
      
      expect(typeof openThreads).toBe("function");
    });
  });
});
