import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { env } from "@/lib/env";
import {
  LINKS_LAYOUT,
  activeLinks,
  featuredLinks,
  standardLinks,
  hasAffiliateLinks,
  type BioLink,
} from "@/lib/links";
import { Socials } from "@/components/Socials";
import { LinkButton } from "@/components/links/LinkButton";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Links",
  description: `Links from ${site.name} — picks, projects, and where to find me.`,
  alternates: { canonical: "/links" },
  openGraph: {
    type: "website",
    url: `${site.url}/links`,
    title: `Links — ${site.name}`,
    description: `Links from ${site.name} — picks, projects, and where to find me.`,
    siteName: site.name,
  },
};

const initial = site.name.slice(0, 1);
const handle = env.INSTAGRAM ? `@${env.INSTAGRAM}` : null;

function LinkList({ items }: { items: BioLink[] }) {
  return (
    <ul className="flex w-full flex-col gap-3">
      {items.map((link) => (
        <LinkButton key={`${link.title}-${link.url}`} link={link} />
      ))}
    </ul>
  );
}

export default function LinksPage() {
  const affiliatePicks = standardLinks.filter((l) => l.category === "affiliate");
  const projects = standardLinks.filter((l) => l.category === "project");

  return (
    <main className="bg-bg text-fg flex min-h-dvh w-full justify-center px-5 py-12 sm:py-16">
      <div className="flex w-full max-w-md flex-col items-center">
        {/* ── Profile ─────────────────────────────────────────────────────
            To use a real photo: drop it at /public/headshot.jpg and swap this
            block for <Image src="/headshot.jpg" .../> (next/image). */}
        <FadeIn>
          <div
            className="from-accent/15 via-accent/5 to-bg ring-border flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ring-1"
            aria-hidden
          >
            <span className="text-accent/30 font-display text-6xl leading-none">
              {initial}
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h1 className="text-accent font-display mt-5 text-center text-4xl tracking-[-0.01em] uppercase sm:text-5xl">
            {site.name}
          </h1>
        </FadeIn>

        {handle ? (
          <FadeIn delay={0.1}>
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-soft hover:text-accent mt-1 font-mono text-sm tracking-wider transition"
            >
              {handle}
            </a>
          </FadeIn>
        ) : null}

        <FadeIn delay={0.15}>
          <p className="text-fg-soft font-serif mt-3 text-center text-lg italic">
            {site.tagline}
          </p>
        </FadeIn>

        {/* ── Work with me (primary CTA) ──────────────────────────────── */}
        <FadeIn delay={0.2} className="mt-8 w-full">
          <a
            href={`mailto:${site.email}`}
            className="bg-accent text-on-accent flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-medium transition hover:opacity-90"
          >
            Work with me
          </a>
        </FadeIn>

        {/* ── Pinned / featured links ─────────────────────────────────── */}
        {featuredLinks.length > 0 ? (
          <FadeIn delay={0.25} className="mt-3 w-full">
            <LinkList items={featuredLinks} />
          </FadeIn>
        ) : null}

        {/* ── Links ───────────────────────────────────────────────────── */}
        {standardLinks.length > 0 ? (
          <FadeIn delay={0.3} className="mt-10 w-full">
            <div className="flex w-full flex-col items-center">
              {hasAffiliateLinks ? (
                <p className="text-fg-soft mb-4 text-center text-xs">
                  Some links are affiliate links — I may earn a commission at no
                  cost to you.
                </p>
              ) : null}

              {LINKS_LAYOUT === "grouped" ? (
                <div className="flex w-full flex-col gap-8">
                  {affiliatePicks.length > 0 ? (
                    <section className="w-full">
                      <h2 className="text-fg font-display mb-3 text-center text-sm tracking-[0.2em] uppercase">
                        My Picks
                      </h2>
                      <LinkList items={affiliatePicks} />
                    </section>
                  ) : null}
                  {projects.length > 0 ? (
                    <section className="w-full">
                      <h2 className="text-fg font-display mb-3 text-center text-sm tracking-[0.2em] uppercase">
                        Projects
                      </h2>
                      <LinkList items={projects} />
                    </section>
                  ) : null}
                </div>
              ) : (
                <section className="w-full">
                  <h2 className="text-fg font-display mb-3 text-center text-sm tracking-[0.2em] uppercase">
                    Links
                  </h2>
                  <LinkList items={standardLinks} />
                </section>
              )}
            </div>
          </FadeIn>
        ) : null}

        {/* ── Socials ─────────────────────────────────────────────────── */}
        <FadeIn delay={0.35} className="mt-12 flex w-full flex-col items-center">
          <h2 className="text-fg font-display mb-4 text-center text-sm tracking-[0.2em] uppercase">
            Socials
          </h2>
          <Socials size={26} />
        </FadeIn>

        {/* ── Back to portfolio ───────────────────────────────────────── */}
        <FadeIn delay={0.4} className="mt-12">
          <Link
            href="/"
            className="text-fg-soft hover:text-accent font-mono text-xs tracking-wider uppercase transition"
          >
            View full portfolio →
          </Link>
        </FadeIn>
      </div>
    </main>
  );
}
