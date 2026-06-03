"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  getAudibleKey,
  getServerAudibleKey,
  setAudibleKey,
  subscribe,
} from "@/lib/audio-bus";

type Props = {
  src: string;
  label: string;
  /** Stable, page-unique id used to enforce single-audio-card playback. */
  videoKey: string;
};

export function BrandVideo({ src, label, videoKey }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  // Single source of truth: a card is unmuted iff it owns the page's audio.
  const audibleKey = useSyncExternalStore(
    subscribe,
    getAudibleKey,
    getServerAudibleKey,
  );
  const muted = audibleKey !== videoKey;

  // Re-sync the element whenever the audible card changes — this is what mutes
  // the *other* cards (their `muted` flips to true) when this one claims audio.
  useEffect(() => {
    const el = ref.current;
    if (el) el.muted = muted;
  }, [muted]);

  const toggleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Guard against a wrapping click-through <a> (BrandCard renders one when a
    // video has an href): keep the tap on the button, not the link.
    e.stopPropagation();
    e.preventDefault();
    setAudibleKey(muted ? videoKey : null);
  };

  const play = () => {
    const el = ref.current;
    if (!el) return;
    el.play().catch(() => {
      /* autoplay blocked — leave first frame up */
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
      className="relative h-full w-full bg-black"
      onMouseEnter={play}
      onMouseLeave={pause}
    >
      <video
        ref={ref}
        src={src}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        className="h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={toggleMute}
        aria-label="Mute video"
        aria-pressed={!muted}
        className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        {muted ? (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3z" />
            <path
              d="M16 8l5 8M21 8l-5 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3z" />
            <path
              d="M16 8a5 5 0 0 1 0 8M18.5 5.5a9 9 0 0 1 0 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
