import { brands } from "@/lib/brands";
import { BrandCard } from "./BrandCard";
import { FadeIn } from "./motion/FadeIn";
import { SlideUp } from "./motion/SlideUp";

export function Work() {
  return (
    <section
      id="work"
      className="border-border/60 mx-auto max-w-6xl border-t px-6 py-24 sm:py-32"
    >
      <FadeIn>
        <div className="mb-12 flex items-end justify-between">
          <h2 className="text-accent font-display text-4xl tracking-tight uppercase sm:text-6xl">
            My Work
          </h2>
          <p className="text-fg-soft font-mono hidden text-xs tracking-wider uppercase sm:block">
            ({brands.length} selected)
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand, i) => (
          <SlideUp key={brand.id} delay={i * 0.06}>
            <BrandCard brand={brand} />
          </SlideUp>
        ))}
      </div>
    </section>
  );
}
