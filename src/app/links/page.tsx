import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { env } from "@/lib/env";
import {
  SECTIONS,
  featuredLinks,
  linksFor,
  hasAffiliateLinks,
  type BioLink,
} from "@/lib/links";
import { Socials } from "@/components/Socials";
import { LinkButton } from "@/components/links/LinkButton";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Links",
  description: `Links from ${site.name} — tools, picks, and where to find me.`,
  alternates: { canonical: "/links" },
  openGraph: {
    type: "website",
    url: `${site.url}/links`,
    title: `Links — ${site.name}`,
    description: `Links from ${site.name} — tools, picks, and where to find me.`,
    siteName: site.name,
  },
};

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

function PlaceholderButton({ label }: { label: string }) {
  return (
    <div className="border-border text-fg-soft flex w-full items-center justify-center rounded-full border-2 border-dashed px-6 py-4 font-medium">
      {label}
    </div>
  );
}

export default function LinksPage() {
  return (
    <main className="bg-bg text-fg flex min-h-dvh w-full justify-center px-5 py-12 sm:py-16">
      <div className="flex w-full max-w-md flex-col items-center">
        {/* ── Profile photo (Instagram profile pic, saved locally) ─────── */}
        <FadeIn>
          <Image
            src="/headshot.jpg"
            alt={site.name}
            width={224}
            height={224}
            priority
            className="ring-border h-28 w-28 rounded-full object-cover ring-1"
          />
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

        {/* ── Socials (right under the profile) ───────────────────────── */}
        <FadeIn delay={0.15} className="mt-5">
          <Socials size={24} />
        </FadeIn>

        {/* ── Collab email ────────────────────────────────────────────── */}
        <FadeIn delay={0.18} className="mt-4">
          <a
            href={`mailto:${site.email}`}
            className="text-fg-soft hover:text-accent font-mono text-sm tracking-wider transition"
          >
            ✉︎ {site.email} · collabs
          </a>
        </FadeIn>

        {/* ── Pinned / featured links ─────────────────────────────────── */}
        {featuredLinks.length > 0 ? (
          <FadeIn delay={0.2} className="mt-8 w-full">
            <LinkList items={featuredLinks} />
          </FadeIn>
        ) : null}

        {/* ── Sections: Tools → Links → Affiliate Links → Portfolio ───── */}
        {SECTIONS.map((section, i) => {
          const items = linksFor(section.category);
          if (items.length === 0 && !section.placeholder) return null;

          return (
            <FadeIn
              key={section.category}
              delay={0.25 + i * 0.05}
              className="mt-10 w-full"
            >
              <section className="w-full">
                {section.heading ? (
                  <h2 className="text-fg font-display mb-3 text-center text-sm tracking-[0.2em] uppercase">
                    {section.heading}
                  </h2>
                ) : null}
                {section.category === "affiliate" && hasAffiliateLinks ? (
                  <p className="text-fg-soft mb-4 text-center text-xs">
                    Some links are affiliate links — I may earn a commission at
                    no cost to you.
                  </p>
                ) : null}
                {items.length > 0 ? (
                  <LinkList items={items} />
                ) : (
                  <PlaceholderButton label={section.placeholder!} />
                )}
              </section>
            </FadeIn>
          );
        })}

        {/* ── Work with me ────────────────────────────────────────────── */}
        <FadeIn delay={0.5} className="mt-12 w-full">
          <a
            href={`mailto:${site.email}`}
            className="bg-accent text-on-accent flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-medium transition hover:opacity-90"
          >
            Work with me
          </a>
        </FadeIn>
      </div>
    </main>
  );
}
