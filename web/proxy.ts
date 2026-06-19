import { NextRequest, NextResponse } from "next/server";
import { hasAutorities } from "./routing/protected/hasAutorities";
import { extractPayload } from "./services/helpers/server";
import { publicWebUrls, apiServerUrls } from "./routing/routes";

/**
 * Edge Proxy (Next 16+).
 * Runs on the Edge Runtime.
 */
export async function proxy(request: NextRequest) {
  const requestId = globalThis.crypto?.randomUUID?.() ?? "no-uuid";
  const { pathname } = request.nextUrl;

  // 1. Sempre permitir páginas públicas de artigos.
  if (pathname.startsWith("/articles")) {
    const res = NextResponse.next();
    res.headers.set("x-debug-request-id", requestId);
    return res;
  }

  // Ignorar rotas de autenticação do próprio servidor ou do Next.js para não gerar loop
  if (pathname.startsWith("/auth") || pathname.includes("/local/auth")) {
    return NextResponse.next();
  }

  try {
    let accessToken = request.cookies.get("access_token")?.value;
    const refreshToken = request.cookies.get("refresh_token")?.value;

    let responseModifier: NextResponse | null = null;

    // 2. INTERCEPTOR DE REFRESH AUTOMÁTICO
    // Se o access_token não existe ou está expirado, mas temos um refresh_token, tentamos renovar AGORA
    const isAccessExpired = accessToken ? checkIfExpired(accessToken) : true;

    if (isAccessExpired && refreshToken) {
      try {
        // Chama o Spring Boot diretamente
        const refreshRes = await fetch(apiServerUrls.refresh, {
          method: "POST",
          headers: {
            Cookie: `refresh_token=${refreshToken}`,
            "Content-Type": "application/json",
          },
        });

        if (refreshRes.ok) {
          responseModifier = NextResponse.next();
          const setCookieHeaders = refreshRes.headers.getSetCookie();

          for (const cookieStr of setCookieHeaders) {
            // Regra 1: Injeta na resposta para atualizar o browser do cliente de forma definitiva
            responseModifier.headers.append("Set-Cookie", cookieStr);

            // Regra 2: Atualiza o estado local para a checagem de autoridade abaixo
            const parts = cookieStr.split(";").map((s) => s.trim());
            const [nameValue] = parts;
            const [name, value] = nameValue.split("=");

            if (name === "access_token") {
              accessToken = value;
            }

            // Regra 3: Injeta nos cabeçalhos da requisição que vai seguir para os Server Components
            // Isso garante que cookies() e headers() no Next.js leiam o token novo NESTE ciclo
            request.cookies.set(name, value);
          }
        } else {
          console.warn(
            "[proxy] Spring Boot rejeitou o refresh_token. Limpando sessão.",
          );
          // Se o refresh falhar (revogado/expirado), limpa os cookies para evitar loops
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

    // 3. PROTEÇÃO DE ROTAS (Com o token possivelmente atualizado)
    if (!hasAccessFromToken(pathname, accessToken)) {
      return redirectToLogin(request, pathname);
    }

    // Se clonamos ou criamos uma resposta modificada para injetar os cookies, usamos ela
    const res = responseModifier ?? NextResponse.next();
    res.headers.set("x-debug-request-id", requestId);
    return res;
  } catch (e) {
    // Fail-open: nunca derruba a aplicação inteira por erro no Proxy.
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
    // Margem de segurança de 5 segundos para evitar expiração no meio da transmissão
    return payload.exp < Math.floor(Date.now() / 1000) + 5;
  } catch {
    return true;
  }
}

function hasAccessFromToken(pathname: string, token?: string): boolean {
  const required = hasAutorities(pathname);

  // SE FOR ROTA PÚBLICA
  if (!required) return true;

  // SE FOR ROTA PROTEGIDA MAS NÃO TEMOS TOKEN
  if (!token) return false;

  // SE FOR ROTA PROTEGIDA
  try {
    if (checkIfExpired(token)) return false;

    const payload = extractPayload(token);
    // VERIFICA SE POSSUI TODAS AS AUTORIDADES REQUERIDAS
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
