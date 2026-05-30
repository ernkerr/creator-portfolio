import { env } from "./env";

/**
 * Brand work items shown in the "My Work" grid + "Client List" logo wall.
 *
 * The `slug` is the source of truth for every asset filename. When you sign
 * a deal, save the assets using the slug and they wire up automatically:
 *
 *   public/brands/{slug}.png         — small circle logo (ClientList)
 *   public/brands/{slug}-large.png   — wordmark/full logo (under each video)
 *   R2: {slug}.mp4                   — case study video
 *   R2: {slug}-poster.webp           — video poster frame
 *
 * Set `hasVideo: true` once the video is uploaded to R2; otherwise the
 * BrandCard shows the gradient placeholder.
 */
export type Brand = {
  id: number;
  /** Kebab-case identifier. Drives every asset filename — see file header. */
  slug: string;
  name: string;
  /** Set true once {slug}.mp4 + {slug}-poster.webp are live in R2. */
  hasVideo?: boolean;
  /** Optional click-through (case study link, live URL, etc.) */
  href?: string;
};

/** R2 video URL: `/brands/{slug}.mp4` style — empty string if R2 unconfigured. */
export function brandVideo(slug: string): string {
  if (!env.R2_BASE_URL) return "";
  return `${env.R2_BASE_URL}/${slug}.mp4`;
}

/** R2 poster URL. Empty string if R2 unconfigured. */
export function brandPoster(slug: string): string {
  if (!env.R2_BASE_URL) return "";
  return `${env.R2_BASE_URL}/${slug}-poster.webp`;
}

/** Small circle-cropped logo path inside `public/brands/`. */
export function brandLogo(slug: string): string {
  return `/brands/${slug}.png`;
}

/** Larger wordmark/full logo path inside `public/brands/`. */
export function brandLogoLarge(slug: string): string {
  return `/brands/${slug}-large.png`;
}

/** Anchor id used to scroll from a ClientList circle to a BrandCard. */
export function brandAnchor(slug: string): string {
  return `brand-${slug}`;
}

export const brands: readonly Brand[] = [
  { id: 1, slug: "autonomous-ai", name: "Autonomous AI", hasVideo: true },
] as const;
