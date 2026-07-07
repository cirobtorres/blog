import { NextRequest, NextResponse } from "next/server";
import { hasAutorities } from "./routing/protected/hasAutorities";
import { extractPayload } from "./services/helpers/server";
import { publicWebUrls, apiServerUrls } from "./routing/routes";

export async function proxy(request: NextRequest) {
  console.log("proxy");
  const requestId = globalThis.crypto?.randomUUID?.() ?? "no-uuid";
  console.log("proxy requestId:", requestId);
  const { pathname } = request.nextUrl;
  console.log("proxy pathname:", pathname);

  if (pathname.startsWith("/articles") || pathname.includes("/local/auth")) {
    console.log("proxy NextResponse.next():", true);
    return NextResponse.next();
  }

  const requiredAuthorities = hasAutorities(pathname);
  console.log("proxy requiredAuthorities:", requiredAuthorities);

  try {
    let accessToken = request.cookies.get("access_token")?.value;
    console.log(
      "proxy accessToken:",
      accessToken ? accessToken.slice(0, 20) + "..." : accessToken,
    );
    const refreshToken = request.cookies.get("refresh_token")?.value;
    console.log(
      "proxy refreshToken:",
      refreshToken ? refreshToken.slice(0, 20) + "..." : refreshToken,
    );
    let responseModifier: NextResponse | null = null;

    const isAccessExpired = accessToken ? checkIfExpired(accessToken) : true;
    console.log("proxy isAccessExpired:", isAccessExpired);

    console.log(
      "Proxy isAccessExpired && refreshToken:",
      isAccessExpired && refreshToken,
    );
    if (isAccessExpired && refreshToken) {
      try {
        const refreshRes = await fetch(apiServerUrls.refresh, {
          method: "POST",
          headers: {
            Cookie: `refresh_token=${refreshToken}`,
            "Content-Type": "application/json",
          },
        });

        console.log(
          "Proxy refreshRes:",
          refreshRes.ok,
          refreshRes.status,
          refreshRes.statusText,
        );

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
            request: { headers: requestHeaders },
          });

          for (const cookieStr of setCookieHeaders) {
            responseModifier.headers.append("Set-Cookie", cookieStr);
          }
        } else {
          if (requiredAuthorities) {
            const res = redirectToLogin(request, pathname);
            res.cookies.delete("access_token");
            res.cookies.delete("refresh_token");
            return res;
          }
        }
      } catch (refreshError) {
        console.error("[proxy] Refresh failed:", refreshError);
      }
    }

    // 3. VALIDAÇÃO DE ACESSO (ROTA PROTEGIDA)
    // Se a rota NÃO exige permissões (requiredAuthorities === null), deixa passar direto!
    if (requiredAuthorities) {
      if (!accessToken || checkIfExpired(accessToken)) {
        return redirectToLogin(request, pathname);
      }

      const payload = extractPayload(accessToken);

      // CORREÇÃO AQUI: Extrai as roles da estrutura oficial do Keycloak (realm_access.roles)
      const userAuthorities: string[] = payload.realm_access?.roles || [];

      // Transforma tudo para maiúsculo para evitar problemas de case-sensitive ("author" vs "AUTHOR")
      const normalizedUserAuthorities = userAuthorities.map((role: string) =>
        role.toUpperCase(),
      );

      const hasPermission = requiredAuthorities.every((role) =>
        normalizedUserAuthorities.includes(role.toUpperCase()),
      );

      if (!hasPermission) {
        console.log(
          `[proxy] Access denied to "${pathname}". Lacking permissions.`,
        );
        // Redireciona para a Home ou página de Não Autorizado se ele já está logado mas sem nível de acesso
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    const res = responseModifier ?? NextResponse.next();
    res.headers.set("x-debug-request-id", requestId);
    return res;
  } catch (e) {
    console.error("[proxy] UNHANDLED ERROR", { requestId, pathname, e });
    return NextResponse.next();
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

function redirectToLogin(request: NextRequest, callbackUrl: string) {
  const loginUrl = new URL(publicWebUrls.signIn, request.url);
  loginUrl.searchParams.set("callbackUrl", callbackUrl);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/users/authors/:path*",
    "/users/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
