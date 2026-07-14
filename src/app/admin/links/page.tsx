// erin-codes.com/admin/links — private "add a link" form for the /links page.
//
// This page lives in creator-portfolio even though /admin is proxied to
// brand-manager-web: Next.js checks filesystem routes before `rewrites`, so
// this path is served locally while every other /admin path still proxies
// through. The passkey gate in src/proxy.ts covers it like the rest of /admin.

import type { Metadata } from "next";
import Link from "next/link";
import { AddLinkForm } from "@/components/admin/AddLinkForm";
import { CurrentLinks } from "@/components/admin/CurrentLinks";

export const metadata: Metadata = {
  title: "Add a link",
  robots: { index: false, follow: false },
};

export default function AdminLinksPage() {
  return (
    <main className="bg-bg text-fg flex min-h-dvh w-full justify-center px-5 py-12">
      <div className="flex w-full max-w-md flex-col">
        <p className="text-fg-soft font-mono text-xs tracking-wider uppercase">
          <Link href="/admin" className="hover:text-accent transition">
            ← Your Tools
          </Link>
        </p>
        <h1 className="text-accent font-display mt-4 text-4xl tracking-[-0.01em] uppercase">
          Add a link
        </h1>
        <p className="text-fg-soft mt-2 text-sm">
          Saves straight to the site — the new link is live on{" "}
          <Link href="/links" className="text-accent underline underline-offset-4">
            /links
          </Link>{" "}
          about 2 minutes after you hit save.
        </p>

        <div className="mt-8">
          <AddLinkForm />
        </div>

        {/* What's live right now (as of this deploy), with per-link delete */}
        <div className="mt-12">
          <h2 className="text-fg font-display text-sm tracking-[0.2em] uppercase">
            Currently live
          </h2>
          <div className="mt-3">
            <CurrentLinks />
          </div>
        </div>
      </div>
    </main>
  );
}
