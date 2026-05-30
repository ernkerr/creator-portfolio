import Image from "next/image";
import { brandAnchor, brandLogo, brands } from "@/lib/brands";
import { FadeIn } from "./motion/FadeIn";

export function ClientList() {
  return (
    <section>
      <div className="bg-accent h-12 w-full sm:h-14" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 py-8 text-center sm:py-10">
        <FadeIn>
          <h2 className="text-accent font-display text-6xl tracking-[-0.02em] uppercase sm:text-8xl">
            Client List
          </h2>

          {brands.length > 0 && (
            <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-4 sm:mt-10 sm:gap-6">
              {brands.map((brand) => (
                <li key={brand.id} className="w-16 sm:w-24">
                  <a
                    href={`#${brandAnchor(brand.slug)}`}
                    aria-label={`Jump to ${brand.name}`}
                    className="bg-bg-alt ring-border relative block aspect-square overflow-hidden rounded-full ring-1 transition hover:ring-2 hover:ring-accent"
                    title={brand.name}
                  >
                    <Image
                      src={brandLogo(brand.slug)}
                      alt={`${brand.name} logo`}
                      fill
                      sizes="(min-width: 768px) 96px, 64px"
                      className="object-contain"
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
