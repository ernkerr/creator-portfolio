"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

// Tap-to-copy discount code chip, rendered inside a LinkButton's <a>. Clicking
// it copies the code instead of following the link (hence the stopPropagation
// + preventDefault), flashing "copied!" as confirmation.
export function CopyCodeChip({
  code,
  featured,
}: {
  code: string;
  featured?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard
      ?.writeText(code)
      .then(() => {
        setCopied(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {
        /* clipboard blocked — chip still shows the code to copy by hand */
      });
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy discount code ${code}`}
      className={cn(
        "shrink-0 cursor-pointer rounded-full border border-dashed px-2.5 py-1 font-mono text-[0.625rem] tracking-wider uppercase transition",
        featured
          ? "border-on-accent/40 text-on-accent hover:border-on-accent"
          : "border-accent/40 text-accent group-hover:border-on-accent/40 group-hover:text-on-accent",
      )}
    >
      {copied ? "copied!" : `${code} ⧉`}
    </button>
  );
}
