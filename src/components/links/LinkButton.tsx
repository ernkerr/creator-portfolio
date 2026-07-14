"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { BioLink } from "@/lib/links";
import { cn } from "@/lib/cn";
import { CopyCodeChip } from "./CopyCodeChip";

// One full-width button in the link-in-bio stack. Mirrors the EmailPill look
// (rounded-full, accent border, fills accent on hover) so it feels native.
//
// Touch niceties: spring scale on press (framer-motion whileTap), and
// `active:` color fills so a finger tap gives the same feedback hover gives a
// mouse. Native tap highlight is disabled in favor of these.
//
// Affiliate links get rel="sponsored nofollow" per Google/FTC guidance;
// featured links render filled (inverse) to stand out.
//
// A leading glyph in the title ("🐾 Claude Pets") is split into its own span:
// spaced from the name, and suffixed with U+FE0E (text variation selector) so
// emoji-class characters render as monochrome text that takes the accent
// color instead of full-color emoji (which ignores CSS and reads black).
function splitGlyph(title: string): [string | null, string] {
  const m = title.match(/^([^\p{L}\p{N}]+)\s+(.+)$/u);
  if (!m) return [null, title];
  return [m[1].replace(/️/g, "") + "︎", m[2]];
}

// Tailwind needs complete class literals (no template interpolation).
const GLYPH_ACCENT =
  "[filter:brightness(0)_saturate(100%)_invert(9%)_sepia(96%)_saturate(7481%)_hue-rotate(247deg)_brightness(97%)_contrast(147%)] group-hover:[filter:brightness(0)_invert(1)] group-active:[filter:brightness(0)_invert(1)]";
const GLYPH_INVERSE = "[filter:brightness(0)_invert(1)]";

export function LinkButton({ link }: { link: BioLink }) {
  const isAffiliate = link.category === "affiliate";
  const isInternal = link.url.startsWith("/");
  const [glyph, titleText] = splitGlyph(link.title);

  // Mobile "slot machine": no hover on touch screens, so instead a button
  // lights up (same fill as hover) while it passes through a band around the
  // viewport center — scrolling runs the highlight down the stack. Same
  // touch-detection pattern as BrandVideo's autoplay.
  const ref = useRef<HTMLAnchorElement>(null);
  const [lit, setLit] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (!isTouch) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setLit(entry.isIntersecting);
      },
      // Narrow band around the viewport center + a chunk of the button must
      // be inside it — keeps the highlight to ~one button at a time.
      { rootMargin: "-44% 0px -44% 0px", threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const filled = link.featured || lit;

  const rel = isInternal
    ? undefined
    : cn(
        "noopener",
        "noreferrer",
        isAffiliate && "sponsored",
        isAffiliate && "nofollow",
      );

  return (
    <li>
      <motion.a
        ref={ref}
        href={link.url}
        target={isInternal ? undefined : "_blank"}
        rel={rel}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={cn(
          "group flex w-full items-center justify-between gap-3 rounded-full border-2 px-6 py-4 transition-colors duration-300 [-webkit-tap-highlight-color:transparent]",
          link.featured
            ? "border-accent bg-accent text-on-accent hover:opacity-90"
            : lit
              ? "border-accent bg-accent text-on-accent"
              : "border-accent text-accent hover:bg-accent hover:text-on-accent active:bg-accent active:text-on-accent",
        )}
      >
        <span className="flex min-w-0 flex-col">
          <span className="truncate font-medium">
            {glyph ? (
              /* Filter recolors even color-emoji glyphs (🐾) to the accent
                 blue; flips to white on hover / tap / featured fill. */
              <span
                className={cn(
                  "mr-4 inline-block",
                  filled ? GLYPH_INVERSE : GLYPH_ACCENT,
                )}
              >
                {glyph}
              </span>
            ) : null}
            {titleText}
          </span>
          {link.note ? (
            <span className="text-sm opacity-70">{link.note}</span>
          ) : null}
        </span>

        {link.code ? (
          <CopyCodeChip code={link.code} featured={filled} />
        ) : isAffiliate ? (
          <span
            className={cn(
              "shrink-0 rounded-full border px-2 py-0.5 font-mono text-[0.625rem] tracking-wider uppercase",
              filled
                ? "border-on-accent/40 text-on-accent"
                : "border-accent/40 text-accent group-hover:border-on-accent/40 group-hover:text-on-accent group-active:border-on-accent/40 group-active:text-on-accent",
            )}
          >
            affiliate
          </span>
        ) : (
          <span
            aria-hidden
            className="shrink-0 transition group-hover:translate-x-0.5 group-active:translate-x-0.5"
          >
            →
          </span>
        )}
      </motion.a>
    </li>
  );
}
