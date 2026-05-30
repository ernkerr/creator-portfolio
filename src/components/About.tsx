import { site } from "@/lib/site";
import { FadeIn } from "./motion/FadeIn";

const stats = [
  { value: "5+", label: "years building" },
  { value: "∞", label: "ideas shipped" },
  { value: "◕‿◕", label: "kept curious" },
];

export function About() {
  return (
    <section id="about" className="bg-bg-alt">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <FadeIn>
          <h2 className="text-accent font-display mb-12 text-4xl tracking-tight uppercase sm:text-6xl">
            About Me
          </h2>
        </FadeIn>

        <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16">
          <FadeIn>
            <div
              className="from-accent/20 via-accent/5 to-bg-alt border-border aspect-square w-full max-w-sm rounded-lg border bg-gradient-to-br"
              aria-hidden="true"
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-6">
              <p className="text-fg text-xl leading-relaxed sm:text-2xl">
                Hi, I&apos;m{" "}
                <span className="font-display text-accent">{site.name}</span>. I
                build small, sharp things on the web — landing pages, tools, and
                quiet little apps that do one thing well.
              </p>
              <p className="text-fg-soft text-lg leading-relaxed">
                Currently based on the internet ✿. I care about typography, the
                feel of a good click, and ASCII art. Open to collaborations and
                weird ideas.
              </p>

              <ul className="border-border/60 mt-10 grid grid-cols-3 gap-6 border-t pt-8">
                {stats.map((stat) => (
                  <li key={stat.label}>
                    <div className="text-accent font-display text-3xl sm:text-5xl">
                      {stat.value}
                    </div>
                    <div className="text-fg-soft font-mono mt-1 text-[0.7rem] tracking-wider uppercase">
                      {stat.label}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
