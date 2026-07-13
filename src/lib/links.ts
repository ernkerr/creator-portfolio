// ───────────────────────────────────────────────────────────────────────────
// YOUR LINK-IN-BIO LINKS
//
// The links themselves live in `links-data.json` (same folder) so the
// /admin/links form can append entries via the GitHub API — each submission
// is a commit to that file, and Vercel auto-deploys it. Adding one by hand
// (or via Claude) still works: edit the JSON, commit, push.
// Order in the array = order within its section.
//
//   { title: "What the button says",
//     url: "https://...",
//     category: "tool" | "link" | "affiliate" | "portfolio",
//     note: "optional one-liner under the title",
//     code: "ERIN10",    // optional — tap-to-copy discount code chip
//     featured: true,    // optional — pins it above all sections
//     active: false }    // optional — hides it without deleting
//
// Sections render in this order: Tools → Links → Discount Codes → Portfolio.
// An empty Links or Discount Codes section shows a "coming soon" placeholder.
//
//   • category: "affiliate" → renders in "Discount Codes", adds the FTC
//        disclosure line to the section, and uses rel="sponsored nofollow".
//        With `code`, the button shows a chip that copies the code on tap;
//        without one it shows a small "affiliate" tag instead.
//   • everything else renders clean.
//
// Example discount-code entry:
//   { title: "Autonomous standing desks",
//     url: "https://autonomous.ai/?ref=...",
//     category: "affiliate",
//     note: "10% off with my code",
//     code: "ERIN10" }
//
// Or just tell Claude: "add my ring light affiliate link https://amzn.to/xyz"
// ───────────────────────────────────────────────────────────────────────────

import linksData from "./links-data.json";

export type LinkCategory = "tool" | "link" | "affiliate" | "portfolio";

export type BioLink = {
  title: string;
  url: string;
  category: LinkCategory;
  note?: string;
  /** Discount code shown as a tap-to-copy chip on the button. */
  code?: string;
  featured?: boolean;
  active?: boolean;
};

export const links: BioLink[] = linksData as BioLink[];

// Sections in page order. `placeholder` = what an empty section shows; leave
// it undefined to hide the section entirely when it has no links.
export const SECTIONS: {
  category: LinkCategory;
  heading: string;
  placeholder?: string;
}[] = [
  { category: "tool", heading: "Tools" },
  { category: "link", heading: "Links", placeholder: "Coming soon" },
  {
    category: "affiliate",
    heading: "Discount Codes",
    placeholder: "Coming soon",
  },
  { category: "portfolio", heading: "Portfolio" },
];

export const activeLinks = links.filter((l) => l.active !== false);

export const featuredLinks = activeLinks.filter((l) => l.featured);

export function linksFor(category: LinkCategory) {
  return activeLinks.filter((l) => !l.featured && l.category === category);
}

export const hasAffiliateLinks = activeLinks.some(
  (l) => l.category === "affiliate",
);
