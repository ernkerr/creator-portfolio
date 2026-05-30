import { site } from "@/lib/site";
import { Socials } from "./Socials";
import { EmailPill } from "./EmailPill";
import { FadeIn } from "./motion/FadeIn";

export function Hero() {
  return (
    <section id="home" className="mx-auto max-w-6xl px-4 py-12 sm:py-20">
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        {/* Photo placeholder — cut-out style, no rectangular frame */}
        <FadeIn>
          <div
            className="from-accent/15 via-accent/5 to-bg relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden bg-gradient-to-br md:max-w-none"
            aria-hidden="true"
          >
            <div className="text-accent/20 font-display absolute inset-0 flex items-center justify-center text-[12rem]">
              {site.name.slice(0, 1)}
            </div>
          </div>
        </FadeIn>

        {/* Name + tagline + contact */}
        <div className="flex flex-col">
          <FadeIn delay={0.05}>
            <h1 className="text-accent font-display text-[clamp(3.5rem,11vw,9rem)] leading-[0.85] tracking-tight uppercase">
              {site.name}
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-accent font-serif mt-4 text-right text-2xl italic sm:text-4xl">
              {site.tagline}
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-end sm:gap-8">
              <EmailPill />
              <Socials />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
