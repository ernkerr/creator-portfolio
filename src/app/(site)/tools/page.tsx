import type { Metadata } from "next";
import { tools } from "@/data/tools";
import { FadeIn } from "@/components/motion/FadeIn";
import { ToolsShowcase } from "@/components/tools/ToolsShowcase";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Tools I built for my own creator workflow — now opening them up. Join the waitlist.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <FadeIn>
        <div className="border-accent mb-4 border-y py-3">
          <h1 className="text-accent font-display text-6xl tracking-[-0.02em] uppercase sm:text-8xl">
            Tools
          </h1>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-fg-soft mb-12 max-w-2xl font-serif text-xl italic sm:text-2xl">
          Tools I built for my own creator workflow — now opening them up.
        </p>
      </FadeIn>

      <ToolsShowcase tools={tools} />
    </section>
  );
}
