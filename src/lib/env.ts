function required(key: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing required env var ${key}. Copy .env.example to .env.local and fill it in.`,
    );
  }
  return value;
}

function optional(value: string | undefined): string {
  return value ?? "";
}

export const env = {
  SITE_URL: required("NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL),
  BRAND_NAME: required("NEXT_PUBLIC_BRAND_NAME", process.env.NEXT_PUBLIC_BRAND_NAME),
  BRAND_TAGLINE: required(
    "NEXT_PUBLIC_BRAND_TAGLINE",
    process.env.NEXT_PUBLIC_BRAND_TAGLINE,
  ),
  CONTACT_EMAIL: required(
    "NEXT_PUBLIC_CONTACT_EMAIL",
    process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  ),

  FEATURED_LABEL: optional(process.env.NEXT_PUBLIC_FEATURED_LABEL),
  FEATURED_URL: optional(process.env.NEXT_PUBLIC_FEATURED_URL),

  GITHUB: optional(process.env.NEXT_PUBLIC_GITHUB),
  TWITTER: optional(process.env.NEXT_PUBLIC_TWITTER),
  LINKEDIN: optional(process.env.NEXT_PUBLIC_LINKEDIN),
  INSTAGRAM: optional(process.env.NEXT_PUBLIC_INSTAGRAM),
  TIKTOK: optional(process.env.NEXT_PUBLIC_TIKTOK),
  YOUTUBE: optional(process.env.NEXT_PUBLIC_YOUTUBE),

  R2_BASE_URL: optional(process.env.NEXT_PUBLIC_R2_BASE_URL).replace(/\/$/, ""),
  GA_ID: optional(process.env.NEXT_PUBLIC_GA_ID),
} as const;
