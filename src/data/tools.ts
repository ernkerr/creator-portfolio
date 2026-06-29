/**
 * Tools showcase — single source of truth for the /tools page.
 *
 * Add a new tool by appending an entry below. The page renders every tool in
 * this array; grouping/filtering by `status` is done with the helpers at the
 * bottom, so a "Free" section later is just a matter of adding `status: 'free'`
 * entries — no page changes required.
 */
export type ToolStatus = "paid" | "free" | "coming-soon";

export type Tool = {
  /** Kebab-case identifier. Also sent as the hidden waitlist field. */
  slug: string;
  name: string;
  /** One-line hook, shown under the name (serif italic). */
  tagline: string;
  /** 1–2 sentence description. */
  description: string;
  status: ToolStatus;
  /** Call-to-action label for the card button. */
  cta: string;
  /** Optional external link. When set, the CTA links out instead of opening
   *  the waitlist modal. */
  href?: string;
};

export const tools: Tool[] = [
  {
    slug: "brand-manager",
    name: "Brand Manager",
    tagline: "Your AI brand-deal manager.",
    description:
      "Watches your inbox, drafts replies in your voice, reads the contracts, tracks every deal by stage. Never sends without you.",
    status: "paid",
    cta: "Join the waitlist",
  },
  {
    slug: "crossposter",
    name: "Crossposter",
    tagline: "Post a Reel once, everywhere.",
    description:
      "You post a Reel on Instagram; it auto-reposts to TikTok and YouTube Shorts from your laptop.",
    status: "paid",
    cta: "Join the waitlist",
  },
  {
    slug: "ig-auto-comment",
    name: "IG Auto-Comment",
    tagline: "Turn comments into conversations.",
    description:
      "Keyword-triggered auto-replies and DMs to everyone who comments on your posts.",
    status: "paid",
    cta: "Join the waitlist",
  },
  {
    slug: "build-in-public",
    name: "Build in Public",
    tagline: "Your commits become content.",
    description:
      "Turns your git history into build-in-public posts, drafted in your voice, published from your terminal.",
    status: "paid",
    cta: "Join the waitlist",
  },
];

/** Human-readable label for each status (badge text). */
export const statusLabel: Record<ToolStatus, string> = {
  paid: "Paid",
  free: "Free",
  "coming-soon": "Coming soon",
};

/** Order in which status sections render on the page. */
export const statusOrder: ToolStatus[] = ["paid", "free", "coming-soon"];

/** Tools filtered to a single status (preserves array order). */
export function toolsByStatus(status: ToolStatus): Tool[] {
  return tools.filter((t) => t.status === status);
}
