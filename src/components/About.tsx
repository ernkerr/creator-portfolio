import { site } from "@/lib/site";
import { EmailPill } from "./EmailPill";
import { FadeIn } from "./motion/FadeIn";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:pt-16 sm:pb-24">
      <FadeIn>
        <div className="border-accent mb-10 border-y py-3">
          <h2 className="text-accent font-display text-4xl tracking-tight uppercase sm:text-6xl">
            About Me
          </h2>
        </div>
      </FadeIn>

      <div className="grid gap-10 md:grid-cols-[3fr_2fr] md:gap-16">
        <FadeIn>
          <div className="space-y-5 text-base leading-relaxed sm:text-lg">
            <p>
              I&apos;m {site.name.split(" ").slice(0, 1).join(" ").toLowerCase()},
              a <strong className="font-bold">full stack engineer</strong>{" "}
              building on the internet. I specialize in{" "}
              <strong className="font-bold">sharp, working software</strong>{" "}
              that ships — landing pages, internal tools, and quiet little apps
              that do one thing well.
            </p>
            <p>
              With 5+ years across the stack and a soft spot for{" "}
              <strong className="font-bold">typography &amp; ASCII art</strong>,
              I bring a builder&apos;s lens to every project. Open to
              collaborations, small contracts, and{" "}
              <em className="font-serif italic">weird ideas</em>.
            </p>
            <div className="pt-6">
              <EmailPill />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            className="from-accent/15 via-accent/5 to-bg-alt relative aspect-square w-full max-w-md overflow-hidden bg-gradient-to-br md:ml-auto"
            aria-hidden="true"
          >
            <div className="text-accent/20 font-display absolute inset-0 flex items-center justify-center text-[10rem]">
              {site.name.slice(0, 1)}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
