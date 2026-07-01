import { NextRequest, NextResponse } from "next/server";
import {
  verifyRegistrationResponse,
  type RegistrationResponseJSON,
} from "@simplewebauthn/server";
import {
  CHALLENGE_COOKIE,
  clearedCookieOptions,
  getRelyingParty,
  readChallengeToken,
} from "@/lib/admin-session";
import { loadStoredCredentials, serializeCredential } from "@/lib/admin-passkeys";

function enrollmentAllowed(req: NextRequest): boolean {
  const bootstrap = process.env.ADMIN_BOOTSTRAP_SECRET;
  return Boolean(bootstrap) && req.headers.get("x-enroll-code") === bootstrap;
}

export async function POST(req: NextRequest) {
  if (!enrollmentAllowed(req)) {
    return NextResponse.json({ error: "Invalid enrollment code." }, { status: 401 });
  }

  const { rpID, origin, secure } = getRelyingParty(req.headers.get("host"));
  const expectedChallenge = await readChallengeToken(
    req.cookies.get(CHALLENGE_COOKIE)?.value,
  );
  if (!expectedChallenge) {
    return NextResponse.json(
      { error: "Enrollment challenge expired. Please try again." },
      { status: 400 },
    );
  }

  const body = (await req.json()) as RegistrationResponseJSON;

  let verification;
  try {
    verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      requireUserVerification: true,
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }

  if (!verification.verified || !verification.registrationInfo) {
    return NextResponse.json(
      { error: "Registration could not be verified." },
      { status: 400 },
    );
  }

  const newCredential = serializeCredential(verification.registrationInfo.credential);
  // Merge with any already-installed credentials (replacing a re-registered
  // one), then hand the full JSON back for the user to paste into ADMIN_PASSKEYS.
  const allCredentials = [
    ...loadStoredCredentials().filter((c) => c.id !== newCredential.id),
    newCredential,
  ];

  const res = NextResponse.json({
    verified: true,
    envValue: JSON.stringify(allCredentials),
  });
  res.cookies.set(CHALLENGE_COOKIE, "", clearedCookieOptions(secure));
  return res;
}
