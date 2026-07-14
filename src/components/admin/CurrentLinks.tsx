"use client";

import { useState } from "react";
import { SECTIONS, linksFor } from "@/lib/links";
import { cn } from "@/lib/cn";

// The "Currently live" list on /admin/links, with per-link delete. Deleting
// commits the removal to GitHub (same pipeline as adding) — two-step confirm
// so a stray tap can't nuke a link. The list itself reflects the data baked
// into the current deploy; a removed link is struck through locally and
// disappears for real on the next deploy (~2 min).

type RowStatus = "live" | "arming" | "deleting" | "deleted" | "error";

export function CurrentLinks() {
  const [status, setStatus] = useState<Record<string, RowStatus>>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const keyOf = (title: string, url: string) => `${title}-${url}`;

  const setRow = (key: string, s: RowStatus) =>
    setStatus((prev) => ({ ...prev, [key]: s }));

  const remove = async (title: string, url: string) => {
    const key = keyOf(title, url);
    setRow(key, "deleting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/admin/links", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, url }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setRow(key, "error");
        setErrorMsg(data.error ?? `Delete failed (${res.status})`);
        return;
      }
      setRow(key, "deleted");
    } catch {
      setRow(key, "error");
      setErrorMsg("Network error — try again");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {errorMsg ? (
        <p className="text-sm text-red-600" role="alert">
          {errorMsg}
        </p>
      ) : null}
      {SECTIONS.map((section) => {
        const items = linksFor(section.category);
        return (
          <div key={section.category}>
            <p className="text-fg-soft font-mono text-xs tracking-wider uppercase">
              {section.heading ?? "Links"}
            </p>
            {items.length > 0 ? (
              <ul className="mt-1 flex flex-col gap-1.5">
                {items.map((l) => {
                  const key = keyOf(l.title, l.url);
                  const s = status[key] ?? "live";
                  return (
                    <li
                      key={key}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <span
                        className={cn(
                          "min-w-0 truncate",
                          s === "deleted" && "text-fg-soft line-through",
                        )}
                      >
                        {l.title}
                        {l.code ? (
                          <span className="text-accent font-mono text-xs">
                            {" "}
                            · {l.code}
                          </span>
                        ) : null}
                      </span>

                      {s === "deleted" ? (
                        <span className="text-fg-soft shrink-0 font-mono text-xs">
                          removed — deploying
                        </span>
                      ) : s === "deleting" ? (
                        <span className="text-fg-soft shrink-0 font-mono text-xs">
                          removing…
                        </span>
                      ) : s === "arming" ? (
                        <span className="flex shrink-0 items-center gap-2">
                          <button
                            type="button"
                            onClick={() => remove(l.title, l.url)}
                            className="rounded-full bg-red-600 px-3 py-1 font-mono text-xs text-white transition hover:opacity-90"
                          >
                            delete?
                          </button>
                          <button
                            type="button"
                            onClick={() => setRow(key, "live")}
                            className="text-fg-soft hover:text-fg font-mono text-xs underline underline-offset-2"
                          >
                            keep
                          </button>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setRow(key, "arming")}
                          aria-label={`Delete ${l.title}`}
                          className="text-fg-soft shrink-0 rounded-full px-2 py-0.5 font-mono text-xs transition hover:bg-red-600/10 hover:text-red-600"
                        >
                          ✕
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-fg-soft/60 mt-1 text-sm italic">empty</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
