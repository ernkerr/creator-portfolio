import { env } from "./env";

export type SocialKey =
  | "github"
  | "twitter"
  | "linkedin"
  | "instagram"
  | "tiktok"
  | "youtube";

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
  nav: [
    { label: "Home", href: "#home" },
    { label: "My Work", href: "#work" },
    { label: "About Me", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  socials: {
    github: env.GITHUB ? `https://github.com/${env.GITHUB}` : "",
    twitter: env.TWITTER ? `https://twitter.com/${env.TWITTER}` : "",
    linkedin: env.LINKEDIN ? `https://linkedin.com/in/${env.LINKEDIN}` : "",
    instagram: env.INSTAGRAM ? `https://instagram.com/${env.INSTAGRAM}` : "",
    tiktok: env.TIKTOK ? `https://tiktok.com/@${env.TIKTOK}` : "",
    youtube: env.YOUTUBE ? `https://youtube.com/@${env.YOUTUBE}` : "",
  } satisfies Record<SocialKey, string>,
} as const;

export const enabledSocials = (
  Object.entries(site.socials) as [SocialKey, string][]
).filter(([, url]) => url.length > 0);
