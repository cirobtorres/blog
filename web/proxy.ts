import { NextRequest, NextResponse } from "next/server";
import {
  applySpringCookies,
  extractTokenFromHeader,
  extractPayload,
} from "./services/helpers/serve-actions";
import { apiServerUrls } from "./urls";

export async function proxy(request: NextRequest) {
  // const isProd = process.env.NODE_ENV === "production";
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  // const publicRoutes = ["/", "/articles", "/sign-in", "/sign-up", "/public"];

  // const isPublicRoute = publicRoutes.some((route) =>
  //   pathname.startsWith(route),
  // );

  // if (!isProd) {
  //   console.error("proxy.accessToken", !!accessToken);
  //   console.error("proxy.refreshToken", !!refreshToken);
  //   console.error("proxy.isPublicRoute", !!isPublicRoute);
  // }

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

    // if (!isProd) {
    //   console.error("proxy.refreshRes", refreshRes);
    // }

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
//     "/author",
//     "/author/:path*",
//     "/auth/:path*",
//   ],
// };

// Production
// export const config = {
//   matcher: [
//     "/author",
//     "/author/:path*",
//     "/api/:path*",
//   ],
// };
