import { NextRequest, NextResponse } from "next/server";
import { generateRegistrationOptions } from "@simplewebauthn/server";
import {
  CHALLENGE_COOKIE,
  challengeCookieOptions,
  createChallengeToken,
  getRelyingParty,
} from "@/lib/admin-session";
import {
  ADMIN_USER_NAME,
  RP_NAME,
  loadStoredCredentials,
} from "@/lib/admin-passkeys";

// Enrollment is gated by ADMIN_BOOTSTRAP_SECRET (sent as the x-enroll-code
// header). Even without it a minted credential is inert until installed into
// ADMIN_PASSKEYS, but the gate keeps the ceremony from being triggered by
// strangers.
function enrollmentAllowed(req: NextRequest): boolean {
  const bootstrap = process.env.ADMIN_BOOTSTRAP_SECRET;
  return Boolean(bootstrap) && req.headers.get("x-enroll-code") === bootstrap;
}

export async function POST(req: NextRequest) {
  if (!enrollmentAllowed(req)) {
    return NextResponse.json({ error: "Invalid enrollment code." }, { status: 401 });
  }

  const { rpID, origin, secure } = getRelyingParty(req.headers.get("host"));
  const existing = loadStoredCredentials();

  const options = await generateRegistrationOptions({
    rpName: RP_NAME,
    rpID,
    userName: ADMIN_USER_NAME,
    attestationType: "none",
    // Prevent enrolling the same authenticator twice.
    excludeCredentials: existing.map((c) => ({
      id: c.id,
      transports: c.transports,
    })),
    authenticatorSelection: {
      residentKey: "preferred",
      userVerification: "required",
    },
  });

  const res = NextResponse.json(options);
  res.cookies.set(
    CHALLENGE_COOKIE,
    await createChallengeToken(options.challenge),
    challengeCookieOptions(secure),
  );
  return res;
}
