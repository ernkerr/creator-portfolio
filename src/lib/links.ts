// ───────────────────────────────────────────────────────────────────────────
// YOUR LINK-IN-BIO LINKS
//
// This is the one file you grow over time. Add a link by adding an object to
// the `links` array below. Order in the array = order within its section.
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

export const links: BioLink[] = [
  // ── Tools ──────────────────────────────────────────────────────────────
  {
    title: "Ascii-cam.com",
    url: "https://ascii-cam.com",
    category: "tool",
  },
  {
    title: "View my apps on the App Store",
    url: "https://apps.apple.com/us/developer/erin-kerr/id1817020747",
    category: "tool",
    note: "Erin Kerr on the App Store",
  },

  // ── Links ──────────────────────────────────────────────────────────────
  // (none yet — page shows a placeholder until you add one)

  // ── Discount codes (affiliate) ─────────────────────────────────────────
  // (none yet — page shows a placeholder until you add one)

  // ── Portfolio ──────────────────────────────────────────────────────────
  {
    title: "erinkerr.me",
    url: "https://erinkerr.me",
    category: "portfolio",
    note: "Portfolio",
  },
  {
    title: "cybergoose.org",
    url: "https://cybergoose.org",
    category: "portfolio",
    note: "Studio",
  },
];

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
