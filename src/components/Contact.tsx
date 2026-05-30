import { Socials } from "./Socials";
import { EmailPill } from "./EmailPill";
import { FadeIn } from "./motion/FadeIn";

export function Contact() {
  return (
    <section id="contact" className="bg-accent text-on-accent">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center sm:py-28">
        <FadeIn>
          <h2 className="font-display text-5xl tracking-tight uppercase sm:text-8xl">
            Let&apos;s Work
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="font-serif mt-4 text-xl italic sm:text-3xl">
            got an idea?{" "}
            <span className="font-bold not-italic">send it.</span>
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <EmailPill size="lg" variant="inverse" className="mt-10" />
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-10 [&_a]:text-on-accent [&_a:hover]:opacity-80">
            <Socials className="justify-center" size={28} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
