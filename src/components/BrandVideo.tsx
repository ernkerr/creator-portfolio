"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  label: string;
};

export function BrandVideo({ src, poster, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const el = ref.current;
    if (!el) return;
    el.play().catch(() => {
      /* autoplay blocked — leave poster up */
    });
  };

  const pause = () => {
    const el = ref.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  // Mobile / touch: autoplay when ≥50% of card is in view, pause when it leaves.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Only enable IntersectionObserver autoplay on touch devices.
    // Desktop relies on hover instead.
    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches;
    if (!isTouch) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) play();
          else pause();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className="group/video relative h-full w-full"
      onMouseEnter={play}
      onMouseLeave={pause}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="h-full w-full object-cover"
      />
      {!playing && (
        <div className="bg-bg/95 pointer-events-none absolute top-3 left-3 flex h-10 w-10 items-center justify-center rounded-full shadow-sm">
          <span className="text-accent font-display text-sm tracking-wider">
            ▶
          </span>
        </div>
      )}
    </div>
  );
}
