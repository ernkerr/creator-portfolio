# creator-portfolio

A single-page-scroll creator portfolio. White background, electric blue accent (`#001AFF`), big Bebas Neue display, brand grid, about, contact. Inspired by [momiugc.com](https://momiugc.com/), built in Next.js 16.

Built so you can:

1. Fork it
2. Edit one file (`.env.local`)
3. Ship

## Use this template

```bash
# Clone via GitHub template button OR:
gh repo create my-site --template ernkerr/creator-portfolio --public --clone
cd my-site
pnpm install
cp .env.example .env.local
# edit .env.local — name, tagline, email, socials
pnpm dev
```

Open <http://localhost:3000>.

## 60-second rebrand

| Step | File | What to change |
| --- | --- | --- |
| 1 | `.env.local` | `BRAND_NAME`, `BRAND_TAGLINE`, `CONTACT_EMAIL`, socials, optional featured link |
| 2 | `src/lib/tokens.ts` | (optional) `color.accent` — your signature color in one place |
| 3 | `src/lib/brands.ts` | Your real brands + project labels + video/poster URLs |
| 4 | `src/lib/ascii.ts` | (optional) Swap the console.log ASCII art for your own |

## Adding real videos (Cloudflare R2)

Brand cards autoplay muted on hover (desktop) and on viewport entry (mobile). MP4s are too heavy for the repo, so the template uses **Cloudflare R2** for storage — public bucket, zero egress fees.

### One-time R2 setup (CLI)

```bash
# Log in once (opens Cloudflare in your browser)
pnpm dlx wrangler@latest login

# Create the bucket
pnpm dlx wrangler@latest r2 bucket create creator-portfolio

# Enable the public r2.dev URL
pnpm dlx wrangler@latest r2 bucket dev-url enable creator-portfolio
# → prints: Public access enabled at 'https://pub-<hash>.r2.dev'
```

Copy that `https://pub-<hash>.r2.dev` into your `.env.local`:

```bash
NEXT_PUBLIC_R2_BASE_URL=https://pub-<hash>.r2.dev
```

(For production with your own domain, attach a custom domain in the Cloudflare dashboard and use that URL instead — the `r2.dev` URL is rate-limited and not recommended for production traffic.)

### Upload videos

```bash
pnpm dlx wrangler@latest r2 object put creator-portfolio/brand-1.mp4 --file ./brand-1.mp4
pnpm dlx wrangler@latest r2 object put creator-portfolio/brand-1.jpg --file ./brand-1.jpg
```

### Wire them into `brands.ts`

Use the `r2()` helper (already exported from `brands.ts`) — it reads `NEXT_PUBLIC_R2_BASE_URL` and prepends the filename:

```ts
export const brands: readonly Brand[] = [
  {
    id: 1,
    name: "Acme",
    label: "Web build",
    video: r2("brand-1.mp4"),
    poster: r2("brand-1.jpg"),
    href: "https://acme.com",      // optional click-through
  },
  // Brands without video/poster show the gradient placeholder
  { id: 2, name: "Brand #2", label: "Landing page" },
];
```

### Video specs (recommended)

- **Format**: MP4 (H.264 + AAC), or WebM with VP9 fallback for smaller files
- **Resolution**: 720×960 (3:4 portrait, matches the card) or 1080×1440 for retina
- **Length**: 3–6 seconds, looping
- **Size**: aim for <2MB per clip. Use `ffmpeg` to compress:
  ```bash
  ffmpeg -i in.mov -vf scale=720:960 -c:v libx264 -crf 26 -preset slow -an brand-1.mp4
  ```
- **Poster**: matching JPG at the same dimensions, <100kb

## Stack

- **Next.js 16** App Router + TypeScript
- **Tailwind v4** with `@theme` design tokens
- **Bebas Neue** display + **Fraunces** italic accents + **Geist Sans / Mono** body — all via `next/font/google`
- **Framer Motion** for section fade-ins
- **next-themes** wired (light-only by default)
- **GA4** analytics — opt-in via `NEXT_PUBLIC_GA_ID`

No icon library, no shadcn, no DB, no auth. Lean on purpose.

## Design system

Single source of truth: `src/lib/tokens.ts` and `src/app/globals.css`.

Utilities map to tokens — use these instead of arbitrary values:

| Class | Token |
| --- | --- |
| `bg-bg`, `bg-bg-alt`, `bg-bg-paper` | Backgrounds |
| `text-fg`, `text-fg-soft` | Body text |
| `text-accent`, `bg-accent`, `text-on-accent` | Signature color + reverse |
| `border-border`, `border-accent` | Subtle dividers |
| `font-display` | Bebas Neue (big headings) |
| `font-serif` | Fraunces italic (taglines) |
| `font-sans` | Geist Sans (body) |
| `font-mono` | Geist Mono (small caps, code) |

Change `--color-accent` in `globals.css` (or `tokens.color.accent` in `tokens.ts`) to re-skin the whole site.

## SEO + AEO

Out of the box:

- Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`)
- Dynamic `<title>`, OG, Twitter metadata from `site.ts`
- Dynamic OG image at `/opengraph-image` (Next.js convention)
- JSON-LD `Person` + `WebSite` schema
- `/sitemap.xml`, `/robots.txt`, `/llms.txt` (AI crawler discoverability)
- Canonical URL

## Deploy

```bash
vercel link
# In Vercel dashboard → Settings → Environment Variables, paste your .env.local values
vercel --prod
```

Or push to GitHub and import in the Vercel dashboard.

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # Fonts, metadata, JsonLd, Analytics, ASCII boot
│   ├── page.tsx              # Composes Hero / ClientList / Work / About / Contact
│   ├── globals.css           # Tailwind v4 @theme tokens
│   ├── opengraph-image.tsx   # Dynamic /opengraph-image
│   ├── icon.tsx              # Dynamic favicon
│   ├── sitemap.ts            # /sitemap.xml
│   ├── robots.ts             # /robots.txt
│   └── llms.txt/route.ts     # /llms.txt
├── components/
│   ├── Header.tsx  Hero.tsx  ClientList.tsx  Work.tsx  About.tsx  Contact.tsx  Footer.tsx
│   ├── BrandCard.tsx  BrandVideo.tsx  EmailPill.tsx  Socials.tsx
│   ├── JsonLd.tsx  Analytics.tsx  AsciiBoot.tsx
│   └── motion/ FadeIn.tsx  SlideUp.tsx
└── lib/
    ├── env.ts                # Typed env access — throws if required vars missing
    ├── site.ts               # Site config (reads env)
    ├── tokens.ts             # Design tokens
    ├── brands.ts             # Work data (with R2 video URLs)
    ├── cn.ts                 # Tiny classname helper
    └── ascii.ts              # Console easter egg
```

## License

MIT — fork freely. If you use it, I'd love to see what you build. ◕‿◕
