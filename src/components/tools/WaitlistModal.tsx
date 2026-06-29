"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { env } from "@/lib/env";
import type { Tool } from "@/data/tools";

type Props = {
  /** The tool the visitor is joining the waitlist for. `null` = closed. */
  tool: Tool | null;
  onClose: () => void;
};

type Status = "idle" | "submitting" | "success" | "error";

export function WaitlistModal({ tool, onClose }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const nameRef = useRef<HTMLInputElement>(null);

  // Reset to a clean form each time a new tool opens, and focus the first field.
  useEffect(() => {
    if (tool) {
      setStatus("idle");
      const id = setTimeout(() => nameRef.current?.focus(), 50);
      return () => clearTimeout(id);
    }
  }, [tool]);

  // Close on Escape.
  useEffect(() => {
    if (!tool) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tool, onClose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!tool) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("tool", tool.slug);
    data.set("toolName", tool.name);

    setStatus("submitting");

    // No endpoint configured yet → optimistic success so the page is usable
    // before the Google Sheet is wired up. Submissions are logged in dev.
    if (!env.WAITLIST_ENDPOINT) {
      console.warn(
        "[waitlist] NEXT_PUBLIC_WAITLIST_ENDPOINT not set — submission not sent:",
        Object.fromEntries(data),
      );
      setStatus("success");
      return;
    }

    try {
      // Apps Script Web Apps don't send CORS headers; `no-cors` lets the POST
      // through (the response is opaque, so we treat a resolved fetch as sent).
      await fetch(env.WAITLIST_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: data,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {tool && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="bg-fg/40 absolute inset-0 cursor-default"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-title"
            className="bg-bg border-accent relative w-full max-w-md border-2 shadow-xl"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-accent text-on-accent flex items-center justify-between px-6 py-3">
              <span className="font-mono text-xs tracking-wider uppercase">
                {tool.name}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="font-mono text-lg leading-none transition hover:opacity-70"
              >
                ×
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {status === "success" ? (
                <div className="py-6 text-center">
                  <h2
                    id="waitlist-title"
                    className="text-accent font-display text-4xl tracking-[-0.02em] uppercase sm:text-5xl"
                  >
                    You&apos;re on the list
                  </h2>
                  <p className="text-fg-soft mt-3 text-base">
                    We&apos;ll email you when{" "}
                    <span className="text-fg font-semibold">{tool.name}</span> opens
                    up.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="border-accent text-accent hover:bg-accent hover:text-on-accent mt-8 inline-flex items-center rounded-full border-2 px-6 py-2.5 font-mono text-xs tracking-wider uppercase transition"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <h2
                    id="waitlist-title"
                    className="text-accent font-display text-3xl tracking-[-0.02em] uppercase sm:text-4xl"
                  >
                    Join the waitlist
                  </h2>
                  <p className="text-fg-soft mt-2 mb-6 font-serif text-lg italic">
                    {tool.tagline}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="hidden" name="tool" value={tool.slug} />

                    <label className="block">
                      <span className="text-fg-soft font-mono text-xs tracking-wider uppercase">
                        Name
                      </span>
                      <input
                        ref={nameRef}
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        className="border-border focus:border-accent mt-1.5 w-full border-2 bg-transparent px-4 py-2.5 text-base outline-none transition"
                      />
                    </label>

                    <label className="block">
                      <span className="text-fg-soft font-mono text-xs tracking-wider uppercase">
                        Email
                      </span>
                      <input
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="border-border focus:border-accent mt-1.5 w-full border-2 bg-transparent px-4 py-2.5 text-base outline-none transition"
                      />
                    </label>

                    {status === "error" && (
                      <p className="text-accent text-sm" role="alert">
                        Something went wrong. Please try again.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="bg-accent text-on-accent border-accent hover:bg-bg hover:text-accent inline-flex w-full items-center justify-center rounded-full border-2 px-6 py-3 font-mono text-xs tracking-wider uppercase transition disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "submitting" ? "Joining…" : tool.cta}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
