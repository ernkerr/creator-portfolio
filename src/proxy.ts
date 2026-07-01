// Gate for erin-codes.com/admin.
//
// Next.js 16 renamed Middleware to Proxy. This runs before the `rewrites` in
// next.config.ts, so an authenticated request falls through to the proxy that
// forwards to brand-manager-web, while an unauthenticated one is redirected to
// the passkey login page.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-session";

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

export async function proxy(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;

  if (await verifySessionToken(token)) {
    // Authenticated → let the next.config rewrite proxy through to the app.
    return NextResponse.next();
  }

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/admin-access";
  loginUrl.search = `returnTo=${encodeURIComponent(
    req.nextUrl.pathname + req.nextUrl.search,
  )}`;
  return NextResponse.redirect(loginUrl);
}
