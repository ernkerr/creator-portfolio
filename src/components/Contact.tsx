import { site } from "@/lib/site";
import { Socials } from "./Socials";
import { FadeIn } from "./motion/FadeIn";

export function Contact() {
  return (
    <section id="contact" className="border-border/60 border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <FadeIn>
          <p className="text-fg-soft font-mono mb-6 text-xs tracking-[0.2em] uppercase">
            ✦ get in touch
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-accent font-display text-4xl tracking-tight uppercase sm:text-6xl">
            Let&apos;s Work
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <a
            href={`mailto:${site.email}`}
            className="text-accent font-display mt-10 block text-[clamp(1.5rem,5vw,3rem)] underline-offset-8 hover:underline"
          >
            {site.email}
          </a>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Socials className="mt-10 justify-center" size={26} />
        </FadeIn>
      </div>
    </section>
  );
}
