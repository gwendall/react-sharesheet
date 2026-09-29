import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, renderHook, waitFor } from "@testing-library/react";

import { ShareSheetContent } from "../ShareSheetContent";
import { ShareSheetDrawer } from "../ShareSheetDrawer";
import { useOGData } from "../hooks";
import { clearOGCache, type OGFetcher } from "../og-fetcher";

const card = { title: "A page", image: "https://example.com/card.png", url: "https://example.com/p" };

describe("link preview lookup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearOGCache();
  });

  it("sends the link nowhere by default: no request, a link placeholder", async () => {
    const { container } = render(<ShareSheetContent shareUrl="https://example.com/private?seed=42" shareText="hi" />);

    // Give a stray effect the chance to fire before looking
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(container.querySelector("img")).toBeNull();
  });

  it("looks the link up with the fetcher the caller passes, and shows its image", async () => {
    const fetchPreview = vi.fn<OGFetcher>().mockResolvedValue(card);
    const { container } = render(
      <ShareSheetContent shareUrl="https://example.com/p" shareText="hi" fetchPreview={fetchPreview} />,
    );

    await waitFor(() => expect(container.querySelector("img")).not.toBeNull());
    expect(fetchPreview).toHaveBeenCalledTimes(1);
    expect(fetchPreview).toHaveBeenCalledWith("https://example.com/p");
    expect(container.querySelector("img")).toHaveAttribute("src", card.image);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("never looks up a link that already has a preview image", async () => {
    const fetchPreview = vi.fn<OGFetcher>().mockResolvedValue(card);
    render(
      <ShareSheetContent
        shareUrl="https://example.com/p"
        shareText="hi"
        previewImage="data:image/png;base64,AAAA"
        fetchPreview={fetchPreview}
      />,
    );

    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(fetchPreview).not.toHaveBeenCalled();
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("the drawer hands the fetcher to its sheet", async () => {
    const fetchPreview = vi.fn<OGFetcher>().mockResolvedValue(card);
    render(
      <ShareSheetDrawer shareUrl="https://example.com/p" shareText="hi" fetchPreview={fetchPreview} open onOpenChange={() => {}}>
        <button type="button">Share</button>
      </ShareSheetDrawer>,
    );

    await waitFor(() => expect(fetchPreview).toHaveBeenCalledWith("https://example.com/p"));
  });

  it("useOGData does not refetch when the caller passes a new inline fetcher each render", async () => {
    const calls: string[] = [];
    const { result, rerender } = renderHook(() =>
      useOGData("https://example.com/p", async (url) => {
        calls.push(url);
        return card;
      }),
    );

    await waitFor(() => expect(result.current.ogData).toEqual(card));
    rerender();
    rerender();
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(calls).toEqual(["https://example.com/p"]);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });
});
