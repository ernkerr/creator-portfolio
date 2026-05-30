import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-6 sm:pt-8">
      <Link
        href="#home"
        aria-label={`${site.name} — home`}
        className="block transition-opacity hover:opacity-80"
      >
        <Image
          src="/logo.webp"
          alt={site.name}
          width={420}
          height={210}
          priority
          className="h-auto w-44 sm:w-56 md:w-64"
        />
      </Link>

      {site.featured && (
        <a
          href={site.featured.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent decoration-accent/40 font-mono text-xs tracking-widest uppercase underline-offset-4 hover:underline sm:text-sm"
        >
          {site.featured.label}{" "}
          <span aria-hidden="true" className="text-xs">
            ↗
          </span>
        </a>
      )}
    </header>
  );
}
