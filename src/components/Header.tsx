import Link from "next/link";
import { site } from "@/lib/site";

export function Header() {
  const items = [
    site.nav[0],
    site.nav[1],
    site.nav[3],
    site.nav[2],
    ...(site.featured
      ? [{ label: site.featured.label, href: site.featured.url, external: true }]
      : []),
  ];

  return (
    <header className="bg-accent text-on-accent sticky top-0 z-50 w-full">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-12 max-w-6xl items-center justify-center px-4 sm:h-14"
      >
        <ul className="flex items-center gap-6 text-sm sm:gap-12 sm:text-base">
          {items.map((item) =>
            "external" in item ? (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 transition hover:no-underline"
                >
                  {item.label}
                </a>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="underline underline-offset-4 transition hover:no-underline"
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>
    </header>
  );
}
