import type { Brand } from "@/lib/brands";

type Props = { brand: Brand };

export function BrandCard({ brand }: Props) {
  return (
    <article className="group flex flex-col">
      <div
        className="from-accent/15 via-accent/5 to-bg-alt relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br"
        aria-hidden="true"
      >
        <div className="text-accent/30 font-display absolute inset-0 flex items-center justify-center text-7xl tracking-tight">
          #{brand.id}
        </div>
        <div className="bg-bg/95 absolute top-3 left-3 flex h-10 w-10 items-center justify-center rounded-full shadow-sm">
          <span className="text-accent font-display text-sm tracking-wider">
            ▶
          </span>
        </div>
      </div>
      <div className="border-border bg-bg-alt flex items-center justify-between border-t px-3 py-2">
        <span className="text-fg font-display text-base tracking-wider uppercase">
          {brand.name}
        </span>
        <span className="text-fg-soft font-mono text-[0.65rem] tracking-widest uppercase">
          {brand.label}
        </span>
      </div>
    </article>
  );
}
