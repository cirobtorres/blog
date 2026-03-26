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
    //   const setCookie = refreshRes.headers.get("set-cookie");
    //   // Updates browser accessToken here...
    // }

    if (refreshRes.ok) {
      const setCookieHeader = refreshRes.headers.get("set-cookie");
      if (setCookieHeader) {
        const newAccessToken = extractTokenFromHeader(
          setCookieHeader,
          "access_token",
        );
        if (newAccessToken) accessToken = newAccessToken;

        // Set cookies to the browser
        // TODO: implement "cookieStore.set" to the helper func "applySpringCookies"
        const cookiesToSet = setCookieHeader.split(/,(?=[^;]+=[^;]+)/);
        cookiesToSet.forEach((cookieStr) => {
          // When "cookieStore" is called from a server actions, Next.js handles "Set-Cookies" propagation to browser automatically
          const [nameValue] = cookieStr.split(";");
          const [name, value] = nameValue.split("=");
          cookieStore.set(name.trim(), value.trim(), {
            // Comes from Spring
            // httpOnly: true,
            // secure: true,
            // path: "/",
            // sameSite: "lax",
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
