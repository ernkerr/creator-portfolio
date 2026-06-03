/**
 * One audible video at a time, shared across all BrandVideo instances on the page.
 *
 * BrandVideo derives its `muted` state from this store via useSyncExternalStore, so a
 * card is unmuted iff its `videoKey` matches `audibleKey`. Claiming audio for one card
 * therefore re-mutes every other card automatically — no overlapping sound on mobile,
 * where the IntersectionObserver can autoplay several cards at once.
 */
let audibleKey: string | null = null;
const listeners = new Set<() => void>();

export function getAudibleKey(): string | null {
  return audibleKey;
}

/** SSR snapshot — everything renders muted, matching first-paint autoplay. */
export function getServerAudibleKey(): string | null {
  return null;
}

export function setAudibleKey(key: string | null): void {
  audibleKey = key;
  for (const l of listeners) l();
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
