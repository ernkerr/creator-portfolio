// ───────────────────────────────────────────────────────────────────────────
// YOUR LINK-IN-BIO LINKS
//
// This is the one file you grow over time. Add a link by adding an object to
// the `links` array below. Order in the array = order on the page (top first).
//
//   { title: "What the button says",
//     url: "https://...",
//     category: "affiliate" | "project",
//     note: "optional one-liner under the title",
//     featured: true,    // optional — pins it to the very top
//     active: false }    // optional — hides it without deleting
//
//   • category: "affiliate"  → shows an "affiliate" tag, adds the FTC
//        disclosure line to the page, and uses rel="sponsored nofollow".
//   • category: "project"    → renders clean (your own stuff).
//
// Or just tell Claude: "add my ring light affiliate link https://amzn.to/xyz"
// ───────────────────────────────────────────────────────────────────────────

export type LinkCategory = "affiliate" | "project";

export type BioLink = {
  title: string;
  url: string;
  category: LinkCategory;
  note?: string;
  featured?: boolean;
  active?: boolean;
};

// Flip to "grouped" to split the list into labeled "My Picks" (affiliate) and
// "Projects" sections. "flat" shows one combined list with small tags.
export const LINKS_LAYOUT: "flat" | "grouped" = "flat";

export const links: BioLink[] = [
  // EXAMPLE entries so you can see the layout — replace or delete these as you
  // add your real links.
  {
    title: "The ring light I use",
    url: "https://example.com",
    category: "affiliate",
    note: "Soft, even light — folds flat for travel",
  },
  {
    title: "My Emeet camera review",
    url: "/work",
    category: "project",
  },
];

export const activeLinks = links.filter((l) => l.active !== false);

export const featuredLinks = activeLinks.filter((l) => l.featured);
export const standardLinks = activeLinks.filter((l) => !l.featured);

export const hasAffiliateLinks = activeLinks.some(
  (l) => l.category === "affiliate",
);
