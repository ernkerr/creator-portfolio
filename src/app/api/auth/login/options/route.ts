import { NextRequest, NextResponse } from "next/server";
import { generateAuthenticationOptions } from "@simplewebauthn/server";
import {
  CHALLENGE_COOKIE,
  challengeCookieOptions,
  createChallengeToken,
  getRelyingParty,
} from "@/lib/admin-session";
import { loadStoredCredentials } from "@/lib/admin-passkeys";

export async function POST(req: NextRequest) {
  const { rpID, secure } = getRelyingParty(req.headers.get("host"));
  const credentials = loadStoredCredentials();

  const options = await generateAuthenticationOptions({
    rpID,
    userVerification: "required",
    allowCredentials: credentials.map((c) => ({
      id: c.id,
      transports: c.transports,
    })),
  });

  const res = NextResponse.json(options);
  res.cookies.set(
    CHALLENGE_COOKIE,
    await createChallengeToken(options.challenge),
    challengeCookieOptions(secure),
  );
  return res;
}
