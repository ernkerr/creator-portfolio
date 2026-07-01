import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  clearedCookieOptions,
  getRelyingParty,
} from "@/lib/admin-session";

export async function POST(req: NextRequest) {
  const { secure } = getRelyingParty(req.headers.get("host"));
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", clearedCookieOptions(secure));
  return res;
}
