"use client";

import { useEffect, useState } from "react";
import {
  browserSupportsWebAuthn,
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";

type Mode = "signin" | "enroll";

function returnTarget(): string {
  if (typeof window === "undefined") return "/admin";
  const to = new URLSearchParams(window.location.search).get("returnTo");
  // Only allow same-site relative paths, never an open redirect.
  return to && to.startsWith("/") ? to : "/admin";
}

export default function AdminAccessPage() {
  const [mode, setMode] = useState<Mode>("signin");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);

  // Enrollment state
  const [enrollCode, setEnrollCode] = useState("");
  const [envValue, setEnvValue] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSupported(browserSupportsWebAuthn());
  }, []);

  async function signIn() {
    setBusy(true);
    setError(null);
    try {
      const optRes = await fetch("/api/auth/login/options", { method: "POST" });
      if (!optRes.ok) {
        const data = await optRes.json().catch(() => ({}));
        throw new Error(data.error || "Could not start sign-in.");
      }
      const optionsJSON = await optRes.json();
      const assertion = await startAuthentication({ optionsJSON });
      const verRes = await fetch("/api/auth/login/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(assertion),
      });
      const result = await verRes.json();
      if (result.verified) {
        window.location.href = returnTarget();
        return;
      }
      throw new Error(result.error || "Sign-in failed.");
    } catch (err) {
      setError(friendly(err));
    } finally {
      setBusy(false);
    }
  }

  async function enroll() {
    setBusy(true);
    setError(null);
    setEnvValue(null);
    try {
      const headers = { "x-enroll-code": enrollCode };
      const optRes = await fetch("/api/auth/register/options", {
        method: "POST",
        headers,
      });
      if (optRes.status === 401) throw new Error("Wrong enrollment code.");
      if (!optRes.ok) {
        const data = await optRes.json().catch(() => ({}));
        throw new Error(data.error || "Could not start enrollment.");
      }
      const optionsJSON = await optRes.json();
      const attestation = await startRegistration({ optionsJSON });
      const verRes = await fetch("/api/auth/register/verify", {
        method: "POST",
        headers: { ...headers, "content-type": "application/json" },
        body: JSON.stringify(attestation),
      });
      const result = await verRes.json();
      if (result.verified && result.envValue) {
        setEnvValue(result.envValue);
        return;
      }
      throw new Error(result.error || "Enrollment failed.");
    } catch (err) {
      setError(friendly(err));
    } finally {
      setBusy(false);
    }
  }

  async function copyEnv() {
    if (!envValue) return;
    await navigator.clipboard.writeText(envValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="bg-bg text-fg flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="border-accent mb-8 border-y py-3">
          <h1 className="text-accent font-display text-5xl tracking-[-0.02em] uppercase sm:text-6xl">
            Admin
          </h1>
        </div>

        <p className="text-fg-soft mb-8 font-serif text-lg italic">
          {mode === "signin"
            ? "Unlock with the device you enrolled."
            : "Enroll this device so it can sign you in from now on."}
        </p>

        {!supported && (
          <p className="border-border text-fg-soft mb-6 rounded border bg-[var(--color-bg-alt)] p-4 text-sm">
            This browser doesn&apos;t support passkeys. Try Safari or Chrome on a
            device with Touch ID / Face ID.
          </p>
        )}

        {error && (
          <p className="mb-6 rounded border border-red-300 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </p>
        )}

        {mode === "signin" ? (
          <button
            onClick={signIn}
            disabled={busy || !supported}
            className="bg-accent text-on-accent w-full rounded-full px-6 py-4 text-base font-semibold tracking-wide uppercase transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? "Waiting for your device…" : "Unlock with this device"}
          </button>
        ) : (
          <div className="space-y-4">
            <input
              type="password"
              value={enrollCode}
              onChange={(e) => setEnrollCode(e.target.value)}
              placeholder="Enrollment code"
              autoComplete="off"
              className="border-border focus:border-accent w-full rounded-lg border bg-[var(--color-bg-paper)] px-4 py-3 text-base outline-none"
            />
            <button
              onClick={enroll}
              disabled={busy || !supported || !enrollCode}
              className="bg-accent text-on-accent w-full rounded-full px-6 py-4 text-base font-semibold tracking-wide uppercase transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? "Waiting for your device…" : "Enroll this device"}
            </button>

            {envValue && (
              <div className="border-border rounded-lg border bg-[var(--color-bg-alt)] p-4 text-sm">
                <p className="text-fg mb-2 font-semibold">Device enrolled ✓</p>
                <p className="text-fg-soft mb-3">
                  Set this as{" "}
                  <code className="font-mono">ADMIN_PASSKEYS</code> in Vercel
                  (both the value below) and redeploy, then come back and sign
                  in.
                </p>
                <textarea
                  readOnly
                  value={envValue}
                  className="border-border font-mono h-28 w-full resize-none rounded border bg-[var(--color-bg-paper)] p-2 text-xs"
                />
                <button
                  onClick={copyEnv}
                  className="border-accent text-accent mt-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-wide uppercase transition hover:opacity-80"
                >
                  {copied ? "Copied!" : "Copy value"}
                </button>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => {
            setMode(mode === "signin" ? "enroll" : "signin");
            setError(null);
            setEnvValue(null);
          }}
          className="text-fg-soft hover:text-accent mt-8 text-sm underline underline-offset-4 transition"
        >
          {mode === "signin"
            ? "Enroll a new device"
            : "Back to sign in"}
        </button>
      </div>
    </main>
  );
}

function friendly(err: unknown): string {
  const message = err instanceof Error ? err.message : String(err);
  // Common WebAuthn cancellation / timeout paths.
  if (/NotAllowed|aborted|timed out|ceremony/i.test(message)) {
    return "Cancelled or timed out. Give it another try.";
  }
  return message;
}
