import { NextRequest, NextResponse } from "next/server";
import { hasAutorities } from "./routing/protected/hasAutorities";
import {
  applySpringCookies,
  extractPayload,
  extractTokenFromHeader,
} from "./services/helpers/server";
import { publicWebUrls } from "./routing/routes";
import { coordinatedRefresh } from "./services/helpers/refresh";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("access_token")?.value;

  const refreshToken = request.cookies.get("refresh_token")?.value;

  // EXPIRATION
  let isExpired = true;
  try {
    if (accessToken) {
      const payload = extractPayload(accessToken);
      isExpired = payload.exp < Math.floor(Date.now() / 1000);
    }
  } catch {
    isExpired = true;
  }

  // REFRESH — same Node authority as POST /local/auth/refresh and server actions
  if (isExpired && refreshToken && !pathname.includes(".")) {
    const { ok, setCookieHeader } = await coordinatedRefresh(refreshToken);

    if (ok && setCookieHeader) {
      const response = NextResponse.next();

      applySpringCookies(response, setCookieHeader);

      const newAccessToken = extractTokenFromHeader(
        setCookieHeader,
        "access_token",
      );

      if (newAccessToken) {
        response.headers.set("Authorization", `Bearer ${newAccessToken}`);
      }

      if (!hasAccessFromToken(pathname, newAccessToken ?? undefined)) {
        return redirectToLogin(request, pathname);
      }

      return response;
    }
  }

  // ROUTING PROTECTION
  if (!hasAccessFromToken(pathname, accessToken)) {
    return redirectToLogin(request, pathname);
  }

  return NextResponse.next();
}

function hasAccessFromToken(pathname: string, token?: string): boolean {
  const required = hasAutorities(pathname);

  // PUBLIC
  if (!required) return true;

  // PROTECTED + NO TOKEN
  if (!token) return false;

  // PROTECTED
  try {
    const payload = extractPayload(token);
    // HAS ALL AUTHORITIES?
    return required.every((role) => payload.authorities?.includes(role));
  } catch {
    return false;
  }
}

function redirectToLogin(request: NextRequest, callbackUrl: string) {
  const loginUrl = new URL(publicWebUrls.signIn, request.url);
  loginUrl.searchParams.set("login", "required");
  loginUrl.searchParams.set("callbackUrl", callbackUrl);
  return NextResponse.redirect(loginUrl);
}

// Helper: extract cookie value based on URL match
export const config = {
  matcher: [
    // authors & childs
    "/authors/:path*",
    // Statics
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
