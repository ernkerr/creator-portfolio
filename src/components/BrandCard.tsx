import Image from "next/image";
import {
  brandLogoLarge,
  brandVideoUrl,
  videoAnchor,
  type Brand,
  type BrandVideo as BrandVideoEntry,
} from "@/lib/brands";
import { BrandVideo } from "./BrandVideo";

type Props = { brand: Brand; video: BrandVideoEntry };

export function BrandCard({ brand, video }: Props) {
  const src = brandVideoUrl(brand.slug, video.id);
  const label = `${brand.name} — ${video.label}`;

  const inner = <BrandVideo src={src} label={label} />;

  return (
    <article
      id={videoAnchor(brand.slug, video.id)}
      className="group mx-auto flex w-full max-w-[260px] scroll-mt-20 flex-col"
    >
      <div className="bg-bg-alt relative aspect-[9/16] w-full overflow-hidden">
        {video.href ? (
          <a
            href={video.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full w-full"
            aria-label={label}
          >
            {inner}
          </a>
        ) : (
          inner
        )}
        <span className="bg-bg/85 text-accent absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-medium tracking-wide uppercase">
          {video.label}
        </span>
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
