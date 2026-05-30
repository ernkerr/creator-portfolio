import Link from "next/link";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="bg-bg/85 border-border/60 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <Link
          href="#home"
          className="text-accent font-display text-xl tracking-tight uppercase"
        >
          {site.name.split(" ")[0]}
          <span aria-hidden="true" className="ml-1">
            ◦
          </span>
        </Link>

        <ul className="hidden items-center gap-7 text-sm sm:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-accent decoration-accent/40 underline-offset-4 transition hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
          {site.featured && (
            <li>
              <a
                href={site.featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent decoration-accent/40 underline-offset-4 transition hover:underline"
              >
                {site.featured.label}{" "}
                <span aria-hidden="true" className="text-xs">
                  ↗
                </span>
              </a>
            </li>
          )}
        </ul>

        {/* Mobile: condensed inline links */}
        <ul className="flex items-center gap-4 text-xs sm:hidden">
          {site.nav.slice(1).map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-accent underline-offset-4">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
