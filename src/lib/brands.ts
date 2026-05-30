/**
 * Brand work items shown in the "My Work" grid.
 *
 * Storage convention: paste public R2 URLs into `video` and `poster`. See
 * README → "Adding real videos" for the R2 bucket setup. Leaving both blank
 * falls back to a gradient placeholder — handy while a project is in flight.
 */
export type Brand = {
  id: number;
  name: string;
  label: string;
  /** Public URL to MP4 (Cloudflare R2 recommended). Leave blank for placeholder. */
  video?: string;
  /** Public URL to poster JPG/WebP. Shown before video plays. */
  poster?: string;
  /** Optional click-through (case study link, live URL, etc.) */
  href?: string;
};

export const brands: readonly Brand[] = [
  { id: 1, name: "Brand #1", label: "Web build" },
  { id: 2, name: "Brand #2", label: "Landing page" },
  { id: 3, name: "Brand #3", label: "Brand site" },
  { id: 4, name: "Brand #4", label: "Portfolio" },
  { id: 5, name: "Brand #5", label: "App UI" },
  { id: 6, name: "Brand #6", label: "Marketing" },
] as const;
