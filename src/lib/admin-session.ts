// Session + WebAuthn-challenge helpers for the /admin gate.
//
// This module is deliberately dependency-light (only `jose`) so it can be
// imported from `proxy.ts` without pulling the heavier `@simplewebauthn/server`
// bundle into the proxy. The shared session cookie minted here is the single
// thing that both this app AND brand-manager-web trust — they verify it with
// the same `ADMIN_SESSION_SECRET`.

import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "admin_session";
export const CHALLENGE_COOKIE = "admin_webauthn_challenge";

// One year — the "don't make me sign in every time" window.
const SESSION_MAX_AGE = 60 * 60 * 24 * 365;
// WebAuthn ceremonies are short-lived; the challenge only needs to survive the
// round-trip between "options" and "verify".
const CHALLENGE_MAX_AGE = 60 * 5;

// Whoever holds a valid session is Erin — there is exactly one admin.
const SESSION_SUBJECT = "erin";

function sessionSecret(): Uint8Array {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value) {
    throw new Error("ADMIN_SESSION_SECRET is not set");
  }
  return new TextEncoder().encode(value);
}

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(SESSION_SUBJECT)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(sessionSecret());
}

// Returns true only for a well-signed, unexpired session. A missing secret or
// any verification error resolves to `false`, so the gate fails closed.
export async function verifySessionToken(
  token: string | undefined | null,
): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, sessionSecret(), { subject: SESSION_SUBJECT });
    return true;
  } catch {
    return false;
  }
}

export async function createChallengeToken(challenge: string): Promise<string> {
  return new SignJWT({ challenge })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${CHALLENGE_MAX_AGE}s`)
    .sign(sessionSecret());
}

export async function readChallengeToken(
  token: string | undefined | null,
): Promise<string | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, sessionSecret());
    return typeof payload.challenge === "string" ? payload.challenge : null;
  } catch {
    return null;
  }
}

type CookieOptions = {
  httpOnly: true;
  secure: boolean;
  sameSite: "lax";
  path: "/";
  maxAge: number;
};

export function sessionCookieOptions(secure: boolean): CookieOptions {
  return { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: SESSION_MAX_AGE };
}

export function challengeCookieOptions(secure: boolean): CookieOptions {
  return { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: CHALLENGE_MAX_AGE };
}

export function clearedCookieOptions(secure: boolean): CookieOptions {
  return { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 0 };
}

// Derive the WebAuthn Relying Party ID + origin from the request host so the
// same code works on localhost during development and on erin-codes.com in
// production. Credentials are scoped to the rpID, so these must be exact.
export function getRelyingParty(host: string | null): {
  rpID: string;
  origin: string;
  secure: boolean;
} {
  const h = host ?? "erin-codes.com";
  const hostname = h.split(":")[0];
  const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
  const proto = isLocal ? "http" : "https";
  return { rpID: hostname, origin: `${proto}://${h}`, secure: !isLocal };
}
