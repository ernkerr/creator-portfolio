import { env } from "./env";

/**
 * Brand work items shown in the "My Work" grid.
 *
 * Storage convention: upload MP4 + JPG to your Cloudflare R2 bucket and
 * reference them by filename via `r2("brand-1.mp4")`. The base URL comes
 * from `NEXT_PUBLIC_R2_BASE_URL`. Leave video/poster blank to show the
 * gradient placeholder fallback — handy while a project is in flight.
 *
 * See README → "Adding real videos" for the R2 setup.
 */
export type Brand = {
  id: number;
  name: string;
  label: string;
  /** Public URL to MP4. Leave blank for gradient placeholder. */
  video?: string;
  /** Public URL to poster JPG/WebP. Shown before video plays. */
  poster?: string;
  /** Optional click-through (case study link, live URL, etc.) */
  href?: string;
};

/** Prepend the configured R2 base URL to a filename. */
export function r2(filename: string): string {
  if (!env.R2_BASE_URL) return "";
  return `${env.R2_BASE_URL}/${filename.replace(/^\//, "")}`;
}

export const brands: readonly Brand[] = [
  // Example shape — uncomment + edit once you've uploaded videos to R2:
  // { id: 1, name: "Acme", label: "Web build",
  //   video: r2("brand-1.mp4"), poster: r2("brand-1.jpg"),
  //   href: "https://acme.com" },

  { id: 1, name: "Brand #1", label: "Web build" },
  { id: 2, name: "Brand #2", label: "Landing page" },
  { id: 3, name: "Brand #3", label: "Brand site" },
  { id: 4, name: "Brand #4", label: "Portfolio" },
  { id: 5, name: "Brand #5", label: "App UI" },
  { id: 6, name: "Brand #6", label: "Marketing" },
] as const;
