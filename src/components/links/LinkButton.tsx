"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import type { BioLink } from "@/lib/links";
import { cn } from "@/lib/cn";
import { CopyCodeChip } from "./CopyCodeChip";
import {
  getLitKey,
  getServerLitKey,
  registerSpotlight,
  subscribeSpotlight,
} from "@/lib/scroll-spotlight";

// One full-width button in the link-in-bio stack. Mirrors the EmailPill look
// (rounded-full, accent border, fills accent on hover) so it feels native.
//
// Touch niceties: spring scale on press (framer-motion whileTap), and the
// scroll-spotlight "slot machine" — on touch screens exactly one button (the
// one crossing the viewport center) renders filled while you scroll. Taps
// deliberately do NOT fill the button (Erin's call) — the spring is the
// feedback. Native tap highlight is disabled.
//
// Affiliate links get rel="sponsored nofollow" per Google/FTC guidance;
// featured links render filled (inverse) to stand out.
//
// A leading glyph in the title ("🐾 Claude Pets") is split into its own span,
// spaced from the name. Emoji-presentation glyphs (🐾) ignore CSS color, so
// only those get a recolor filter; text glyphs (𓁿 ⚑ ♥ …) take the accent
// color directly — running them through the filter shifted hues on Safari
// (hue-rotate renders differently there, 𓁿 came out pink).
function splitGlyph(title: string): [string | null, string] {
  const m = title.match(/^([^\p{L}\p{N}]+)\s+(.+)$/u);
  if (!m) return [null, title];
  return [m[1].replace(/️/g, "") + "︎", m[2]];
}

// Tailwind needs complete class literals (no template interpolation).
const EMOJI_ACCENT =
  "[filter:brightness(0)_saturate(100%)_invert(9%)_sepia(96%)_saturate(7481%)_hue-rotate(247deg)_brightness(97%)_contrast(147%)] group-hover:[filter:brightness(0)_invert(1)]";
const EMOJI_INVERSE = "[filter:brightness(0)_invert(1)]";

export function LinkButton({ link }: { link: BioLink }) {
  const isAffiliate = link.category === "affiliate";
  const isInternal = link.url.startsWith("/");
  const [glyph, titleText] = splitGlyph(link.title);
  const isEmojiGlyph = glyph ? /\p{Emoji_Presentation}/u.test(glyph) : false;

  const key = `${link.title}-${link.url}`;
  const ref = useRef<HTMLAnchorElement>(null);

  const litKey = useSyncExternalStore(
    subscribeSpotlight,
    getLitKey,
    getServerLitKey,
  );
  const lit = litKey === key;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return registerSpotlight(key, el);
  }, [key]);

  const filled = Boolean(link.featured) || lit;

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
          "group flex w-full items-center justify-between gap-3 rounded-full border-2 px-6 py-4 transition-colors duration-150 [-webkit-tap-highlight-color:transparent]",
          link.featured
            ? "border-accent bg-accent text-on-accent hover:opacity-90"
            : lit
              ? "border-accent bg-accent text-on-accent"
              : "border-accent text-accent hover:bg-accent hover:text-on-accent",
        )}
      >
        <span className="flex min-w-0 flex-col">
          <span className="truncate font-medium">
            {glyph ? (
              <span
                className={cn(
                  "mr-4 inline-block",
                  isEmojiGlyph &&
                    (filled ? EMOJI_INVERSE : EMOJI_ACCENT),
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
                : "border-accent/40 text-accent group-hover:border-on-accent/40 group-hover:text-on-accent",
            )}
          >
            affiliate
          </span>
        ) : (
          <span
            aria-hidden
            className="shrink-0 transition group-hover:translate-x-0.5"
          >
            →
          </span>
        )}
      </motion.a>
    </li>
  );
}
