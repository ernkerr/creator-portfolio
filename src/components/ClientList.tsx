import { brands } from "@/lib/brands";
import { FadeIn } from "./motion/FadeIn";

export function ClientList() {
  return (
    <section className="border-accent mx-auto max-w-6xl border-y px-4 py-8 sm:py-10">
      <FadeIn>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-baseline">
          <h2 className="text-accent font-display text-4xl tracking-tight uppercase sm:text-6xl">
            Client List
          </h2>
          <p className="text-fg font-serif max-w-md text-base italic sm:text-xl">
            {brands.length}+ brands trust <span className="font-bold">me</span>{" "}
            to build sharp, working things.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
