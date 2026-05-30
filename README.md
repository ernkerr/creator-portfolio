# creator-portfolio

A small, sharp, single-page-scroll creator portfolio. Cream background, electric blue accent, big serif name, brand grid, about, contact. Inspired by [momiugc.com](https://momiugc.com/), built for you in Next.js.

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
| 3 | `src/lib/brands.ts` | (optional) Your real brands + project labels |
| 4 | `public/placeholders/` | (optional) Drop real images named `1.png`, `2.png`, … |
| 5 | `src/lib/ascii.ts` | (optional) Swap the console.log ASCII art for your own |

That's it.

## Stack

- **Next.js 16** App Router + TypeScript
- **Tailwind v4** with `@theme` design tokens
- **Geist Sans / Geist Mono** body + **Fraunces** display, via `next/font/google`
- **Framer Motion** for section fades
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
| `text-accent`, `bg-accent` | Signature color |
| `border-border` | Subtle dividers |
| `font-display` | Fraunces (headings) |
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
│   ├── page.tsx              # Composes Hero / Work / About / Contact
│   ├── globals.css           # Tailwind v4 @theme tokens
│   ├── opengraph-image.tsx   # Dynamic /opengraph-image
│   ├── icon.tsx              # Dynamic favicon
│   ├── sitemap.ts            # /sitemap.xml
│   ├── robots.ts             # /robots.txt
│   └── llms.txt/route.ts     # /llms.txt
├── components/
│   ├── Header.tsx  Hero.tsx  Work.tsx  About.tsx  Contact.tsx  Footer.tsx
│   ├── BrandCard.tsx  Socials.tsx  JsonLd.tsx  Analytics.tsx  AsciiBoot.tsx
│   └── motion/ FadeIn.tsx  SlideUp.tsx
└── lib/
    ├── env.ts                # Typed env access — throws if required vars missing
    ├── site.ts               # Site config (reads env)
    ├── tokens.ts             # Design tokens
    ├── brands.ts             # Dummy work data
    ├── cn.ts                 # Tiny classname helper
    └── ascii.ts              # Console easter egg
```

## License

MIT — fork freely. If you use it, I'd love to see what you build. ◕‿◕
