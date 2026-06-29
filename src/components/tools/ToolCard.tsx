import { statusLabel, type Tool, type ToolStatus } from "@/data/tools";

// Badge styling per status. Adding a new status (e.g. "free") only needs an
// entry here — see src/data/tools.ts.
const badgeStyles: Record<ToolStatus, string> = {
  paid: "bg-accent text-on-accent",
  free: "bg-fg text-bg",
  "coming-soon": "bg-bg-alt text-fg-soft ring-1 ring-border",
};

type Props = {
  tool: Tool;
  /** Opens the waitlist modal for tools without an external href. */
  onJoin: (tool: Tool) => void;
};

export function ToolCard({ tool, onJoin }: Props) {
  return (
    <article className="group border-border bg-bg hover:border-accent flex h-full flex-col border p-6 transition sm:p-8">
      <div className="mb-5">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium tracking-wide uppercase ${badgeStyles[tool.status]}`}
        >
          {statusLabel[tool.status]}
        </span>
      </div>

      <h3 className="text-fg group-hover:text-accent font-display text-3xl tracking-[-0.01em] uppercase transition sm:text-4xl">
        {tool.name}
      </h3>
      <p className="text-accent mt-1 font-serif text-lg italic">{tool.tagline}</p>
      <p className="text-fg-soft mt-4 text-base leading-relaxed">
        {tool.description}
      </p>

      <div className="mt-auto pt-8">
        {tool.href ? (
          <a
            href={tool.href}
            target="_blank"
            rel="noopener noreferrer"
            className="border-accent text-accent hover:bg-accent hover:text-on-accent inline-flex items-center rounded-full border-2 px-6 py-2.5 font-mono text-xs tracking-wider uppercase transition"
          >
            {tool.cta}
          </a>
        ) : (
          <button
            type="button"
            onClick={() => onJoin(tool)}
            className="border-accent text-accent hover:bg-accent hover:text-on-accent inline-flex items-center rounded-full border-2 px-6 py-2.5 font-mono text-xs tracking-wider uppercase transition"
          >
            {tool.cta}
          </button>
        )}
      </div>
    </article>
  );
}
