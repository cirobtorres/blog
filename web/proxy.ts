import { NextRequest, NextResponse } from "next/server";
import { hasAutorities } from "./routing/protected/hasAutorities";
import { extractPayload } from "./services/helpers/server";
import { publicWebUrls, apiServerUrls } from "./routing/routes";

export async function proxy(request: NextRequest) {
  const requestId = globalThis.crypto?.randomUUID?.() ?? "no-uuid";
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/articles")) {
    const res = NextResponse.next();
    res.headers.set("x-debug-request-id", requestId);
    return res;
  }

  if (pathname.startsWith("/auth") || pathname.includes("/local/auth")) {
    return NextResponse.next();
  }

  try {
    let accessToken = request.cookies.get("access_token")?.value;
    const refreshToken = request.cookies.get("refresh_token")?.value;

    let responseModifier: NextResponse | null = null;

    const isAccessExpired = accessToken ? checkIfExpired(accessToken) : true;

    if (isAccessExpired && refreshToken) {
      try {
        const refreshRes = await fetch(apiServerUrls.refresh, {
          method: "POST",
          headers: {
            Cookie: `refresh_token=${refreshToken}`,
            "Content-Type": "application/json",
          },
        });

        if (refreshRes.ok) {
          const setCookieHeaders = refreshRes.headers.getSetCookie();
          const requestHeaders = new Headers(request.headers);
          for (const cookieStr of setCookieHeaders) {
            const parts = cookieStr.split(";").map((s) => s.trim());

            const [nameValue] = parts;
            const [name, value] = nameValue.split("=");

            if (name === "access_token") {
              accessToken = value;
              requestHeaders.set("Authorization", `Bearer ${value}`);
            }
          }

          responseModifier = NextResponse.next({
            request: {
              headers: requestHeaders,
            },
          });

          for (const cookieStr of setCookieHeaders) {
            responseModifier.headers.append("Set-Cookie", cookieStr);
          }
        } else {
          console.warn("[proxy] refreshRes.ok = false");
          const res = redirectToLogin(request, pathname);
          res.cookies.delete("access_token");
          res.cookies.delete("refresh_token");
          return res;
        }
      } catch (refreshError) {
        console.error(
          "[proxy] Falha crítica de rede ao tentar refresh no Spring Boot",
          refreshError,
        );
      }
    }

    if (!hasAccessFromToken(pathname, accessToken)) {
      return redirectToLogin(request, pathname);
    }

    const res = responseModifier ?? NextResponse.next();
    res.headers.set("x-debug-request-id", requestId);
    return res;
  } catch (e) {
    console.error("[proxy] UNHANDLED ERROR", { requestId, pathname, e });
    const res = NextResponse.next();
    res.headers.set("x-debug-request-id", requestId);
    res.headers.set("x-proxy-error", "1");
    return res;
  }
}

function checkIfExpired(token: string): boolean {
  try {
    const payload = extractPayload(token);
    return payload.exp < Math.floor(Date.now() / 1000) + 5;
  } catch {
    return true;
  }
}

function hasAccessFromToken(pathname: string, token?: string): boolean {
  const required = hasAutorities(pathname);

  if (!required) return true;

  if (!token) return false;

  try {
    if (checkIfExpired(token)) return false;

    const payload = extractPayload(token);
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
    "/users/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
