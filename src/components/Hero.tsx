import { site } from "@/lib/site";
import { Socials } from "./Socials";
import { FadeIn } from "./motion/FadeIn";

export function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-6 pt-16 pb-24"
    >
      <FadeIn>
        <p className="text-accent font-mono mb-4 text-xs tracking-[0.2em] uppercase">
          ✿ portfolio
        </p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <h1 className="text-accent font-display text-[clamp(3.5rem,12vw,9rem)] leading-[0.95] font-light tracking-tight uppercase">
          {site.name}
        </h1>
      </FadeIn>

      <FadeIn delay={0.15}>
        <p className="text-accent mt-6 max-w-2xl text-2xl sm:text-3xl">
          {site.tagline}{" "}
          <span aria-hidden="true" className="font-display italic">
            ✿
          </span>
        </p>
      </FadeIn>

      <FadeIn delay={0.25}>
        <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10">
          <a
            href={`mailto:${site.email}`}
            className="text-accent font-mono text-sm tracking-wide uppercase underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
          <Socials />
        </div>
      </FadeIn>
    </section>
  );
}
