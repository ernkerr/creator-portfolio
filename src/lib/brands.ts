import { env } from "./env";

/**
 * Brand work shown in the "My Work" video grid + "Client List" logo wall.
 *
 * The `slug` is the source of truth for asset filenames:
 *
 *   public/brands/{slug}.png         — small circle logo (ClientList)
 *   public/brands/{slug}-large.png   — wordmark/full logo (under each video card)
 *   R2: {slug}-{video.id}.mp4        — case study video (one per BrandVideo entry)
 *
 * `client: true` puts the small logo on the ClientList; without it the brand
 * still shows in the work grid but doesn't appear as a paid-client badge.
 */
export type BrandVideo = {
  /** Kebab-case category — drives the R2 filename: `{slug}-{id}.mp4`. */
  id: string;
  /** Display label rendered over the video (e.g. "Unboxing", "Review"). */
  label: string;
  /** Optional click-through (case study link, social post, live URL, etc.). */
  href?: string;
};

export type Brand = {
  id: number;
  /** Kebab-case identifier. Drives every asset filename — see file header. */
  slug: string;
  name: string;
  /** True if this was a paid client — controls ClientList membership. */
  client?: boolean;
  /** One entry per video. Empty array = gradient placeholder card. */
  videos: BrandVideo[];
};

/** R2 video URL for a brand+video pair. Empty string if R2 unconfigured. */
export function brandVideoUrl(slug: string, videoId: string): string {
  if (!env.R2_BASE_URL) return "";
  return `${env.R2_BASE_URL}/${slug}-${videoId}.mp4`;
}

/** Small circle-cropped logo path inside `public/brands/`. */
export function brandLogo(slug: string): string {
  return `/brands/${slug}.png`;
}

/** Larger wordmark/full logo path inside `public/brands/`. */
export function brandLogoLarge(slug: string): string {
  return `/brands/${slug}-large.png`;
}

/** Anchor id used to scroll from a ClientList circle to a brand's first card. */
export function brandAnchor(slug: string): string {
  return `brand-${slug}`;
}

/** Anchor id used to scroll directly to a specific video card. */
export function videoAnchor(slug: string, videoId: string): string {
  return `brand-${slug}-${videoId}`;
}

export const brands: readonly Brand[] = [
  {
    id: 1,
    slug: "emeet",
    name: "Emeet",
    client: true,
    videos: [{ id: "unboxing", label: "Unboxing" }],
  },
  {
    id: 2,
    slug: "autonomous-ai",
    name: "Autonomous AI",
    client: true,
    videos: [
      { id: "unboxing", label: "Unboxing" },
      { id: "trend", label: "Trend" },
    ],
  },
] as const;
