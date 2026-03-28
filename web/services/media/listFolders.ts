"use server";

import { cookies } from "next/headers";
import { apiServerUrls } from "@/routing/routes";
import {
  extractPayload,
  extractTokenFromHeader,
} from "@/services/helpers/serve-actions";

export default async function listFolders() {
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

    if (refreshRes.ok) {
      const setCookieHeader = refreshRes.headers.get("set-cookie");
      if (setCookieHeader) {
        const newAccessToken = extractTokenFromHeader(
          setCookieHeader,
          "access_token",
        );
        if (newAccessToken) accessToken = newAccessToken;
        const cookiesToSet = setCookieHeader.split(/,(?=[^;]+=[^;]+)/);
        cookiesToSet.forEach((cookieStr) => {
          const [nameValue] = cookieStr.split(";");
          const [name, value] = nameValue.split("=");
          cookieStore.set(name.trim(), value.trim(), {});
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
