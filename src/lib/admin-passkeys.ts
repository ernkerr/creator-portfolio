// Passkey (WebAuthn credential) storage helpers.
//
// Registered credentials live in the ADMIN_PASSKEYS env var as a JSON array.
// There is no database: a credential does nothing until its public key is
// present here, which is why the enrollment flow is safe to expose — the
// browser can mint a credential, but only Erin can install it (paste + deploy).

import type {
  AuthenticatorTransportFuture,
  WebAuthnCredential,
} from "@simplewebauthn/server";

export const RP_NAME = "erin-codes admin";
export const ADMIN_USER_NAME = "erin";

// Shape stored in the ADMIN_PASSKEYS env var (public key base64url-encoded so
// it survives as JSON in an environment variable).
export type StoredCredential = {
  id: string; // base64url credential ID
  publicKey: string; // base64url COSE public key
  counter: number;
  transports?: AuthenticatorTransportFuture[];
};

export function loadStoredCredentials(): StoredCredential[] {
  const raw = process.env.ADMIN_PASSKEYS;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredCredential[]) : [];
  } catch {
    return [];
  }
}

// Inflate a stored credential into the shape SimpleWebAuthn expects for
// verification (public key back to bytes).
export function toWebAuthnCredential(cred: StoredCredential): WebAuthnCredential {
  return {
    id: cred.id,
    publicKey: new Uint8Array(Buffer.from(cred.publicKey, "base64url")),
    counter: cred.counter,
    transports: cred.transports,
  };
}

export function serializeCredential(cred: WebAuthnCredential): StoredCredential {
  return {
    id: cred.id,
    publicKey: Buffer.from(cred.publicKey).toString("base64url"),
    counter: cred.counter,
    transports: cred.transports,
  };
}
