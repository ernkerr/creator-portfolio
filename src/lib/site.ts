import { env } from "./env";

export type SocialKey =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "twitter"
  | "bluesky"
  | "linkedin"
  | "github";

export const site = {
  name: env.BRAND_NAME,
  tagline: env.BRAND_TAGLINE,
  title: `${env.BRAND_NAME} — ${env.BRAND_TAGLINE}`,
  description: `${env.BRAND_NAME}. ${env.BRAND_TAGLINE}. Selected work, about, and contact.`,
  url: env.SITE_URL,
  email: env.CONTACT_EMAIL,
  featured:
    env.FEATURED_LABEL && env.FEATURED_URL
      ? { label: env.FEATURED_LABEL, url: env.FEATURED_URL }
      : null,
  // Root-absolute anchor (`/#home`) so the nav works from any route, not just
  // the home page (e.g. from /tools). Tools and Links are standalone routes.
  // "Portfolio" (external, erinkerr.me) comes from the featured env vars and
  // is appended in Header.
  nav: [
    { label: "Home", href: "/#home" },
    { label: "Tools", href: "/tools" },
    { label: "Links", href: "/links" },
  ],
  socials: {
    instagram: env.INSTAGRAM ? `https://instagram.com/${env.INSTAGRAM}` : "",
    tiktok: env.TIKTOK ? `https://tiktok.com/@${env.TIKTOK}` : "",
    youtube: env.YOUTUBE ? `https://youtube.com/@${env.YOUTUBE}` : "",
    twitter: env.TWITTER ? `https://x.com/${env.TWITTER}` : "",
    bluesky: env.BLUESKY ? `https://bsky.app/profile/${env.BLUESKY}` : "",
    linkedin: env.LINKEDIN ? `https://linkedin.com/in/${env.LINKEDIN}` : "",
    github: env.GITHUB ? `https://github.com/${env.GITHUB}` : "",
  } satisfies Record<SocialKey, string>,
} as const;

export const enabledSocials = (
  Object.entries(site.socials) as [SocialKey, string][]
).filter(([, url]) => url.length > 0);
