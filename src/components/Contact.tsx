import { Socials } from "./Socials";
import { EmailPill } from "./EmailPill";
import { FadeIn } from "./motion/FadeIn";

export function Contact() {
  return (
    <section id="contact" className="bg-bg-alt text-accent">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center sm:py-28">
        <FadeIn>
          <h2 className="font-display text-7xl tracking-[-0.02em] uppercase sm:text-[10rem] sm:leading-[0.85]">
            Let&apos;s Work
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-fg font-serif mt-4 text-xl italic sm:text-3xl">
            got an idea?{" "}
            <span className="font-bold not-italic">send it.</span>
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <EmailPill size="lg" className="mt-10" />
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-10 [&_a]:text-accent [&_a:hover]:opacity-80">
            <Socials className="justify-center" size={28} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
