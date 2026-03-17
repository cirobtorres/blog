import { NextRequest, NextResponse } from "next/server";
import {
  applySpringCookies,
  extractTokenFromHeader,
  extractPayload,
} from "./services/helpers/serve-actions";
import { apiServerUrls, publicWebUrls } from "./config/routes";
import { PROTECTED_ROUTES, ROUTES_PERMISSIONS } from "./config/protected";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  let isExpired = true;
  let payload = null;

  if (accessToken) {
    try {
      payload = extractPayload(accessToken);
      isExpired = payload.exp < Math.floor(Date.now() / 1000);
    } catch (e) {
      isExpired = true;
    }
  }

  // Bloco de Refresh
  if (isExpired && !!refreshToken && !pathname.includes(".")) {
    const refreshRes = await fetch(apiServerUrls.refresh, {
      method: "POST",
      headers: { Cookie: `refresh_token=${refreshToken}` },
    });

    if (refreshRes.ok) {
      const setCookieHeader = refreshRes.headers.get("set-cookie");
      if (setCookieHeader) {
        // ATUALIZA A VARIÁVEL LOCAL para as checagens abaixo
        const newAccessToken = extractTokenFromHeader(
          setCookieHeader,
          "access_token",
        );

        const finalResponse = NextResponse.next();
        applySpringCookies(finalResponse, setCookieHeader);

        if (newAccessToken) {
          accessToken = newAccessToken; // <--- CRUCIAL: Agora as checagens abaixo verão o token novo
          finalResponse.headers.set("cookie", `access_token=${newAccessToken}`);
        }

        // Se a rota for protegida, precisamos validar o novo accessToken aqui
        if (!validateRouteAccess(pathname, accessToken)) {
          return NextResponse.redirect(
            new URL(publicWebUrls.signIn, request.url),
          );
        }

        return finalResponse;
      }
    }
  }

  // Validação de Rota Protegida
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL(
      publicWebUrls.signIn + "?login=required",
      request.url,
    );
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

function validateRouteAccess(pathname: string, token?: string) {
  if (!token) return false;
  const payload = extractPayload(token);
  const requiredRoles =
    ROUTES_PERMISSIONS[pathname as keyof typeof ROUTES_PERMISSIONS];

  if (!requiredRoles) return true; // Rota protegida mas sem roles específicas
  return requiredRoles.every((role) => payload.authorities.includes(role));
}

// Helper: extract cookie value based on URL match
export const config = {
  matcher: [
    // authors + any child
    "/authors/:path*",
    // Statics
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
