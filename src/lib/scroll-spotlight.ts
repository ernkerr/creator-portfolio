// Shared "slot machine" spotlight for the /links buttons on touch screens.
//
// A single rAF-throttled scroll listener measures every registered element
// and elects AT MOST ONE — the element whose center is nearest the viewport
// center, within a band — as "lit". Components subscribe via
// useSyncExternalStore. A per-button IntersectionObserver can't provide the
// one-at-a-time guarantee (adjacent buttons overlap the band while fading),
// which is why this is centralized. Modeled on audio-bus.ts.
//
// The listener only starts on hover-less (touch) devices; on desktop nothing
// ever lights and hover does the work.

type Listener = () => void;

const elements = new Map<string, HTMLElement>();
const listeners = new Set<Listener>();
let litKey: string | null = null;
let ticking = false;
let started = false;

// Element center must be within ±18% of the viewport height from its center.
const BAND_FRACTION = 0.18;

function measure() {
  ticking = false;
  const centerY = window.innerHeight / 2;
  let best: string | null = null;
  let bestDist = Infinity;
  for (const [key, el] of elements) {
    const rect = el.getBoundingClientRect();
    const dist = Math.abs(rect.top + rect.height / 2 - centerY);
    if (dist < bestDist) {
      bestDist = dist;
      best = key;
    }
  }
  const next =
    bestDist <= window.innerHeight * BAND_FRACTION ? best : null;
  if (next !== litKey) {
    litKey = next;
    for (const l of listeners) l();
  }
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(measure);
}

export function registerSpotlight(key: string, el: HTMLElement): () => void {
  elements.set(key, el);
  if (!started && window.matchMedia("(hover: none)").matches) {
    started = true;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
  } else if (started) {
    onScroll();
  }
  return () => {
    elements.delete(key);
  };
}

export function subscribeSpotlight(l: Listener): () => void {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

export function getLitKey(): string | null {
  return litKey;
}

export function getServerLitKey(): null {
  return null;
}
