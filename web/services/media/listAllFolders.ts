"use server";

import { cookies } from "next/headers";
import { apiServerUrls } from "@/routing/routes";
import {
  extractPayload,
  extractTokenFromHeader,
} from "@/services/helpers/serve-actions";

export async function listAllFolders() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  let accessToken = cookieStore.get("access_token")?.value;

  let isExpired = true;
  if (accessToken) {
    try {
      const payload = extractPayload(accessToken);
      isExpired = payload.exp < Math.floor(Date.now() / 1000);
    } catch (e) {
      isExpired = true;
    }
  }

  if (isExpired && refreshToken) {
    const refreshRes = await fetch(apiServerUrls.refresh, {
      method: "POST",
      headers: { Cookie: `refresh_token=${refreshToken}` },
    });

    // if (refreshRes.ok) {
    //   // O Spring devolve Set-Cookie, mas em Server Actions você precisaria
    //   // extrair e setar manualmente se quisesse atualizar o browser aqui.
    //   // Para simplificar o fetch atual, apenas pegamos o novo token do header:
    //   const setCookie = refreshRes.headers.get("set-cookie");
    //   // ... lógica para atualizar accessToken localmente para a próxima chamada
    // }

    if (refreshRes.ok) {
      const setCookieHeader = refreshRes.headers.get("set-cookie");
      if (setCookieHeader) {
        // 1. Extrai o novo token para usar na chamada imediata abaixo
        const newAccessToken = extractTokenFromHeader(
          setCookieHeader,
          "access_token",
        );
        if (newAccessToken) accessToken = newAccessToken;

        // 2. Seta os cookies no Navegador (via Next.js Response)
        // Nota: O helper applySpringCookies deve ser adaptado para usar cookieStore.set
        // ou você pode fazer manualmente como abaixo:
        const cookiesToSet = setCookieHeader.split(/,(?=[^;]+=[^;]+)/);
        cookiesToSet.forEach((cookieStr) => {
          // O Next.js gerencia a propagação do Set-Cookie para o cliente automaticamente
          // quando usamos o cookieStore dentro de uma Server Action.
          const [nameValue] = cookieStr.split(";");
          const [name, value] = nameValue.split("=");
          cookieStore.set(name.trim(), value.trim(), {
            httpOnly: true, // Idealmente vindo do header, mas aqui forçamos segurança
            secure: true,
            path: "/",
            sameSite: "lax",
          });
        });
      }
    }
  }

  const response = await fetch(`${apiServerUrls.mediaFolders.root}/all`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: `access_token=${accessToken}`,
    },
  });

  if (!response.ok) return [];

  return await response.json();
}
