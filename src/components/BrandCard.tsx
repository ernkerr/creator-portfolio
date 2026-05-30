import Image from "next/image";
import {
  brandAnchor,
  brandLogoLarge,
  brandPoster,
  brandVideo,
  type Brand,
} from "@/lib/brands";
import { BrandVideo } from "./BrandVideo";

type Props = { brand: Brand };

export function BrandCard({ brand }: Props) {
  const inner = brand.hasVideo ? (
    <BrandVideo
      src={brandVideo(brand.slug)}
      poster={brandPoster(brand.slug)}
      label={brand.name}
    />
  ) : (
    <PlaceholderTile id={brand.id} />
  );

  return (
    <article id={brandAnchor(brand.slug)} className="group mx-auto flex w-full max-w-[260px] scroll-mt-20 flex-col">
      <div className="relative aspect-[9/16] w-full overflow-hidden">
        {brand.href ? (
          <a
            href={brand.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full w-full"
            aria-label={brand.name}
          >
            {inner}
          </a>
        ) : (
          inner
        )}
      </div>
      <div className="relative aspect-[1200/630] w-full">
        <Image
          src={brandLogoLarge(brand.slug)}
          alt={`${brand.name} logo`}
          fill
          sizes="(min-width: 768px) 400px, 80vw"
          className="object-contain"
        />
      </div>
    </article>
  );
}

function PlaceholderTile({ id }: { id: number }) {
  return (
    <div
      className="from-accent/15 via-accent/5 to-bg-alt relative h-full w-full overflow-hidden bg-gradient-to-br"
      aria-hidden="true"
    >
      <div className="text-accent/30 font-display absolute inset-0 flex items-center justify-center text-7xl tracking-tight">
        #{id}
      </div>
      <div className="bg-bg/95 absolute top-3 left-3 flex h-10 w-10 items-center justify-center rounded-full shadow-sm">
        <span className="text-accent font-display text-sm tracking-wider">
          ▶
        </span>
      </div>
    </div>
  );
}
