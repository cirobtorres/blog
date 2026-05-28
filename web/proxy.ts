import { NextRequest, NextResponse } from "next/server";
import { hasAutorities } from "./routing/protected/hasAutorities";
import { extractPayload } from "./services/helpers/server";
import { publicWebUrls } from "./routing/routes";

/**
 * Edge Proxy (Next 16+).
 *
 * IMPORTANT: runs on the Edge Runtime.
 * - Do not import Node-only modules (e.g. `crypto`).
 * - Do not do coordinated refresh here; keep refresh in route handlers/server actions.
 *
 * If this function throws, Next returns a plain 500 *before* App Router `error.tsx`.
 */
export async function proxy(request: NextRequest) {
  const requestId = globalThis.crypto?.randomUUID?.() ?? "no-uuid";
  const { pathname } = request.nextUrl;

  // Always allow public article pages.
  if (pathname.startsWith("/articles")) {
    const res = NextResponse.next();
    res.headers.set("x-debug-request-id", requestId);
    return res;
  }

  try {
    const accessToken = request.cookies.get("access_token")?.value;

    // ROUTING PROTECTION
    if (!hasAccessFromToken(pathname, accessToken)) {
      return redirectToLogin(request, pathname);
    }

    const res = NextResponse.next();
    res.headers.set("x-debug-request-id", requestId);
    return res;
  } catch (e) {
    // Fail-open: never take the whole app down from Edge Proxy.
    console.error("[proxy] UNHANDLED ERROR", { requestId, pathname, e });
    const res = NextResponse.next();
    res.headers.set("x-debug-request-id", requestId);
    res.headers.set("x-proxy-error", "1");
    return res;
  }
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
    const isExpired = payload.exp < Math.floor(Date.now() / 1000);
    if (isExpired) return false;

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

export const config = {
  matcher: [
    "/authors/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

