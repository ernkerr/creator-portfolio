import type { Brand } from "@/lib/brands";

type Props = { brand: Brand };

export function BrandCard({ brand }: Props) {
  return (
    <article className="border-border bg-bg-paper group relative overflow-hidden rounded-lg border">
      <div
        className="from-accent/15 via-accent/5 to-bg aspect-[4/5] w-full bg-gradient-to-br"
        aria-hidden="true"
      >
        <div className="text-accent/40 font-display flex h-full items-center justify-center text-7xl">
          {brand.id}
        </div>
      </div>
      <div className="border-border/60 flex items-center justify-between border-t px-4 py-3">
        <h3 className="text-fg font-display text-lg">{brand.name}</h3>
        <span className="text-fg-soft font-mono text-[0.7rem] tracking-wider uppercase">
          {brand.label}
        </span>
      </div>
    </article>
  );
}
