import { NextRequest, NextResponse } from "next/server";
import {
  applySpringCookies,
  extractTokenFromHeader,
  extractPayload,
} from "./services/helpers/serve-actions";
import { apiServerUrls, publicWebUrls } from "./config/routes";
import { PROTECTED_ROUTES } from "./config/protected";
import { getAuthorServer } from "./services/auth/getAuthorServer";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  let isExpired = true;
  if (accessToken) {
    try {
      const payload = extractPayload(accessToken);
      isExpired = payload.exp < Math.floor(Date.now() / 1000);
    } catch (e) {
      isExpired = true;
    }
  }

  if (isExpired && !!refreshToken && !pathname.includes(".")) {
    const refreshRes = await fetch(apiServerUrls.refresh, {
      method: "POST",
      headers: { Cookie: `refresh_token=${refreshToken}` },
    });

    if (refreshRes.ok) {
      const setCookieHeader = refreshRes.headers.get("set-cookie");

      if (setCookieHeader) {
        const finalResponse = NextResponse.next({
          request: {
            headers: new Headers(request.headers),
          },
        });

        applySpringCookies(finalResponse, setCookieHeader);

        const newAccessToken = extractTokenFromHeader(
          setCookieHeader,
          "access_token",
        );
        if (newAccessToken) {
          finalResponse.headers.set("cookie", `access_token=${newAccessToken}`);
        }

        return finalResponse;
      }
    }
  }

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  // TODO: protege apenas de usuários não logados
  // TODO: Usuários logados, mas sem authorities podem ter acesso a URLs que não deveriam
  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL(
      publicWebUrls.signIn + "?login=required",
      request.url,
    );
    // Opcional: salva a página que ele tentou acessar para redirecionar depois
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Helper: extract cookie value based on URL match
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

// Development
// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico).*)",
//     "/authors",
//     "/authors/:path*",
//     "/auth/:path*",
//   ],
// };

// Production
// export const config = {
//   matcher: [
//     "/authors",
//     "/authors/:path*",
//     "/api/:path*",
//   ],
// };
