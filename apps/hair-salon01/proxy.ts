import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  createSessionToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  verifySessionToken,
} from "./app/admin/lib/session-token";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-admin-pathname", pathname);
  const verifiedSession = session ? await verifySessionToken(session) : null;

  if (pathname === "/admin/login" && verifiedSession) {
    const destination = request.nextUrl.searchParams.get("redirect");
    const nextPath =
      destination && destination.startsWith("/admin") && destination !== "/admin/login"
        ? destination
        : "/admin";
    return NextResponse.redirect(new URL(nextPath, request.url));
  }

  // ログインページ以外の /admin/* はセッション必須
  if (pathname !== "/admin/login" && !verifiedSession) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(SESSION_COOKIE);
    return response;
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (verifiedSession) {
    const refreshedToken = await createSessionToken(verifiedSession.uid);
    response.cookies.set(SESSION_COOKIE, refreshedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
