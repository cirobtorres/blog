import { NextRequest, NextResponse } from "next/server";
import { hasAutorities } from "./routing/protected/hasAutorities";
import {
  extractPayload,
  applySpringCookies,
  extractTokenFromHeader,
} from "./services/helpers/serve-actions";
import { apiServerUrls, publicWebUrls } from "./routing/routes";

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

  // REFRESH
  if (isExpired && refreshToken && !pathname.includes(".")) {
    const refreshRes = await fetch(apiServerUrls.refresh, {
      method: "POST",
      headers: { Cookie: `refresh_token=${refreshToken}` },
    });

    // DENTRO DO REFRESH NO MIDDLEWARE
    if (refreshRes.ok) {
      const setCookieHeader = refreshRes.headers.get("set-cookie");
      if (setCookieHeader) {
        const response = NextResponse.next(); // Cria a resposta base

        // 1. Aplica os novos cookies para o Navegador
        applySpringCookies(response, setCookieHeader);

        // 2. Extrai o novo token para lógica interna do middleware
        const newAccessToken = extractTokenFromHeader(
          setCookieHeader,
          "access_token",
        );

        // 3. Importante: Injeta o novo token no header da REQUISIÇÃO
        // para que o código que vem DEPOIS (Server Components) o veja
        if (newAccessToken) {
          response.headers.set("Authorization", `Bearer ${newAccessToken}`);
        }

        // 4. Se a rota exige autoridade, valide com o NOVO token
        if (!hasAccessFromToken(pathname, newAccessToken ?? undefined)) {
          return redirectToLogin(request, pathname);
        }

        return response; // RETORNE AQUI, não deixe passar para o final da função
      }
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
    // authors + any child
    "/authors/:path*",
    // Statics
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
