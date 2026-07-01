import { NextRequest, NextResponse } from "next/server";
import {
  verifyAuthenticationResponse,
  type AuthenticationResponseJSON,
} from "@simplewebauthn/server";
import {
  CHALLENGE_COOKIE,
  SESSION_COOKIE,
  clearedCookieOptions,
  createSessionToken,
  getRelyingParty,
  readChallengeToken,
  sessionCookieOptions,
} from "@/lib/admin-session";
import { loadStoredCredentials, toWebAuthnCredential } from "@/lib/admin-passkeys";

export async function POST(req: NextRequest) {
  const { rpID, origin, secure } = getRelyingParty(req.headers.get("host"));
  const expectedChallenge = await readChallengeToken(
    req.cookies.get(CHALLENGE_COOKIE)?.value,
  );
  if (!expectedChallenge) {
    return NextResponse.json(
      { error: "Sign-in challenge expired. Please try again." },
      { status: 400 },
    );
  }

  const body = (await req.json()) as AuthenticationResponseJSON;
  const stored = loadStoredCredentials().find((c) => c.id === body.id);
  if (!stored) {
    return NextResponse.json(
      { error: "This device isn't enrolled." },
      { status: 401 },
    );
  }

  let verification;
  try {
    verification = await verifyAuthenticationResponse({
      response: body,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      credential: toWebAuthnCredential(stored),
      requireUserVerification: true,
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }

  if (!verification.verified) {
    return NextResponse.json({ error: "Sign-in failed." }, { status: 401 });
  }

  const res = NextResponse.json({ verified: true });
  res.cookies.set(SESSION_COOKIE, await createSessionToken(), sessionCookieOptions(secure));
  res.cookies.set(CHALLENGE_COOKIE, "", clearedCookieOptions(secure));
  return res;
}
