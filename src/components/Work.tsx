import { brands } from "@/lib/brands";
import { BrandCard } from "./BrandCard";
import { FadeIn } from "./motion/FadeIn";
import { SlideUp } from "./motion/SlideUp";

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <FadeIn>
        <div className="border-accent mb-8 border-b pb-3">
          <h2 className="text-accent font-display text-4xl tracking-tight uppercase sm:text-6xl">
            My Work
          </h2>
        </div>
      </FadeIn>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3">
        {brands.map((brand, i) => (
          <SlideUp key={brand.id} delay={i * 0.05}>
            <BrandCard brand={brand} />
          </SlideUp>
        ))}
      </div>
    </section>
  );
}
