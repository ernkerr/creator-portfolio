import Image from "next/image";
import { site } from "@/lib/site";
import { Socials } from "./Socials";
import { EmailPill } from "./EmailPill";
import { FadeIn } from "./motion/FadeIn";

export function Hero() {
  return (
    <section id="home" className="mx-auto max-w-6xl px-4 pt-4 pb-10 sm:pt-6 sm:pb-14">
      <div className="grid items-end gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10">
        {/* Cut-out photo — fills its column, bottom-anchored next to the name */}
        <FadeIn className="relative">
          <Image
            src="/erin.png"
            alt={site.name}
            width={900}
            height={1200}
            priority
            className="mx-auto block h-auto w-full max-w-xs md:mx-0 md:max-w-none"
          />
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
            <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-end sm:gap-8">
              <EmailPill />
              <Socials />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
