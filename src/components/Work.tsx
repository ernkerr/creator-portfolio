import { brands } from "@/lib/brands";
import { BrandCard } from "./BrandCard";
import { FadeIn } from "./motion/FadeIn";
import { SlideUp } from "./motion/SlideUp";

export function Work() {
  const cards = brands.flatMap((brand) =>
    brand.videos.map((video) => ({ brand, video })),
  );

  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <FadeIn>
        <h2 className="text-accent font-display mb-8 text-center text-6xl tracking-[-0.02em] uppercase sm:text-8xl">
          My Work
        </h2>
      </FadeIn>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3">
        {cards.map(({ brand, video }, i) => (
          <SlideUp key={`${brand.slug}-${video.id}`} delay={i * 0.05}>
            <BrandCard brand={brand} video={video} />
          </SlideUp>
        ))}
      </div>
    </section>
  );
}
