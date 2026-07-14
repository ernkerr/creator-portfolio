import type { BioLink } from "@/lib/links";
import { cn } from "@/lib/cn";
import { CopyCodeChip } from "./CopyCodeChip";

// One full-width button in the link-in-bio stack. Mirrors the EmailPill look
// (rounded-full, accent border, fills accent on hover) so it feels native.
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
//
// Affiliate links get rel="sponsored nofollow" per Google/FTC guidance and a
// small "affiliate" tag; featured links render filled (inverse) to stand out.
export function LinkButton({ link }: { link: BioLink }) {
  const isAffiliate = link.category === "affiliate";
  const isInternal = link.url.startsWith("/");
  const [glyph, titleText] = splitGlyph(link.title);

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
      <a
        href={link.url}
        target={isInternal ? undefined : "_blank"}
        rel={rel}
        className={cn(
          "group flex w-full items-center justify-between gap-3 rounded-full border-2 px-6 py-4 transition",
          link.featured
            ? "border-accent bg-accent text-on-accent hover:opacity-90"
            : "border-accent text-accent hover:bg-accent hover:text-on-accent",
        )}
      >
        <span className="flex min-w-0 flex-col">
          <span className="truncate font-medium">
            {glyph ? (
              /* Filter recolors even color-emoji glyphs (🐾) to the accent
                 blue; flips to white on hover / featured fill. */
              <span
                className={cn(
                  "mr-2.5 inline-block",
                  link.featured
                    ? "[filter:brightness(0)_invert(1)]"
                    : "[filter:brightness(0)_saturate(100%)_invert(9%)_sepia(96%)_saturate(7481%)_hue-rotate(247deg)_brightness(97%)_contrast(147%)] group-hover:[filter:brightness(0)_invert(1)]",
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
          <CopyCodeChip code={link.code} featured={link.featured} />
        ) : isAffiliate ? (
          <span
            className={cn(
              "shrink-0 rounded-full border px-2 py-0.5 font-mono text-[0.625rem] tracking-wider uppercase",
              link.featured
                ? "border-on-accent/40 text-on-accent"
                : "border-accent/40 text-accent group-hover:border-on-accent/40 group-hover:text-on-accent",
            )}
          >
            affiliate
          </span>
        ) : (
          <span aria-hidden className="shrink-0 transition group-hover:translate-x-0.5">
            →
          </span>
        )}
      </a>
    </li>
  );
}
