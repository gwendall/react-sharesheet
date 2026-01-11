// OG Data fetcher using Microlink API (free, no API key required)

export interface OGData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  siteName?: string;
}

export interface OGFetchResult {
  data: OGData | null;
  loading: boolean;
  error: string | null;
}

// Cache to avoid re-fetching the same URL
const ogCache = new Map<string, OGData>();

export async function fetchOGData(url: string): Promise<OGData | null> {
  // Check cache first
  if (ogCache.has(url)) {
    return ogCache.get(url)!;
  }

  try {
    // Use Microlink API to fetch OG data (free tier, no API key needed)
    const apiUrl = `https://api.microlink.io?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch OG data: ${response.status}`);
    }

    const json = await response.json();
    
    if (json.status !== "success" || !json.data) {
      return null;
    }

    const { title, description, image, url: canonicalUrl, publisher } = json.data;

    const ogData: OGData = {
      title: title || undefined,
      description: description || undefined,
      image: image?.url || undefined,
      url: canonicalUrl || url,
      siteName: publisher || undefined,
    };

    // Cache the result
    ogCache.set(url, ogData);

    return ogData;
  } catch (error) {
    console.warn("[react-sharesheet] Failed to fetch OG data:", error);
    return null;
  }
}

// Clear cache (useful for testing or forcing refresh)
export function clearOGCache(): void {
  ogCache.clear();
}
