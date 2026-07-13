"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { LinkCategory } from "@/lib/links";

const SECTION_OPTIONS: { value: LinkCategory; label: string }[] = [
  { value: "affiliate", label: "Discount Codes" },
  { value: "link", label: "Links" },
  { value: "tool", label: "Tools" },
  { value: "portfolio", label: "Portfolio" },
];

type Status =
  | { state: "idle" }
  | { state: "saving" }
  | { state: "saved"; commitUrl: string | null }
  | { state: "error"; message: string };

const inputClasses =
  "border-border bg-bg text-fg w-full rounded-xl border-2 px-4 py-3 text-base outline-none transition focus:border-accent";

export function AddLinkForm() {
  const [category, setCategory] = useState<LinkCategory>("affiliate");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ state: "saving" });
    try {
      const res = await fetch("/api/admin/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, url, note, code, category }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({
          state: "error",
          message: data.error ?? `Request failed (${res.status})`,
        });
        return;
      }
      setStatus({ state: "saved", commitUrl: data.commitUrl ?? null });
    } catch {
      setStatus({ state: "error", message: "Network error — try again" });
    }
  };

  const reset = () => {
    setTitle("");
    setUrl("");
    setNote("");
    setCode("");
    setStatus({ state: "idle" });
  };

  if (status.state === "saved") {
    return (
      <div className="border-accent bg-accent/5 flex flex-col items-center gap-3 rounded-2xl border-2 p-8 text-center">
        <p className="text-accent text-2xl">✓ Saved!</p>
        <p className="text-fg">
          Deploying now — <strong>“{title}”</strong> will be live on{" "}
          <a href="/links" className="text-accent underline underline-offset-4">
            /links
          </a>{" "}
          in about 2 minutes.
        </p>
        {status.commitUrl ? (
          <a
            href={status.commitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-soft font-mono text-xs underline underline-offset-4"
          >
            view the commit
          </a>
        ) : null}
        <button
          type="button"
          onClick={reset}
          className="bg-accent text-on-accent mt-2 rounded-full px-6 py-3 font-medium transition hover:opacity-90"
        >
          Add another link
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-fg font-mono text-xs tracking-wider uppercase">
          Section
        </span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as LinkCategory)}
          className={inputClasses}
        >
          {SECTION_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-fg font-mono text-xs tracking-wider uppercase">
          Title (what the button says)
        </span>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My favorite ring light"
          className={inputClasses}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-fg font-mono text-xs tracking-wider uppercase">
          Link URL
        </span>
        <input
          required
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          className={inputClasses}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-fg font-mono text-xs tracking-wider uppercase">
          Note <span className="opacity-50">(optional one-liner)</span>
        </span>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="10% off with my code"
          className={inputClasses}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-fg font-mono text-xs tracking-wider uppercase">
          Discount code{" "}
          <span className="opacity-50">(optional — tap-to-copy chip)</span>
        </span>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="ERIN10"
          className={cn(inputClasses, "font-mono uppercase")}
        />
      </label>

      {status.state === "error" ? (
        <p className="text-sm text-red-600" role="alert">
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status.state === "saving"}
        className="bg-accent text-on-accent mt-2 flex items-center justify-center rounded-full px-6 py-4 font-medium transition hover:opacity-90 disabled:opacity-50"
      >
        {status.state === "saving" ? "Saving…" : "Save & deploy"}
      </button>
    </form>
  );
}
