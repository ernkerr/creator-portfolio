import Image from "next/image";
import { brandLogo, brands, videoAnchor } from "@/lib/brands";
import { FadeIn } from "./motion/FadeIn";

export function ClientList() {
  const clients = brands.filter((b) => b.client);

  return (
    <section>
      <div className="bg-accent h-12 w-full sm:h-14" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 py-8 text-center sm:py-10">
        <FadeIn>
          <h2 className="text-accent font-display text-6xl tracking-[-0.02em] uppercase sm:text-8xl">
            Client List
          </h2>

          {clients.length > 0 && (
            <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-4 sm:mt-10 sm:gap-6">
              {clients.map((brand) => {
                const first = brand.videos[0];
                const href = first
                  ? `#${videoAnchor(brand.slug, first.id)}`
                  : undefined;
                const logo = (
                  <Image
                    src={brandLogo(brand.slug)}
                    alt={`${brand.name} logo`}
                    fill
                    sizes="(min-width: 768px) 96px, 64px"
                    className="object-contain"
                  />
                );
                return (
                  <li key={brand.id} className="w-16 sm:w-24">
                    {href ? (
                      <a
                        href={href}
                        aria-label={`Jump to ${brand.name}`}
                        className="bg-bg-alt ring-border hover:ring-accent relative block aspect-square overflow-hidden rounded-full ring-1 transition hover:ring-2"
                        title={brand.name}
                      >
                        {logo}
                      </a>
                    ) : (
                      <div
                        className="bg-bg-alt ring-border relative block aspect-square overflow-hidden rounded-full ring-1"
                        title={brand.name}
                      >
                        {logo}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
