"use server";

import { cookies } from "next/headers";
// import { apiServerUrls } from "../routing/routes";
// import { extractTokenFromHeader } from "./helpers/server";
// import { applyCookiesInAction } from "./helpers/actions";

// let refreshPromise: Promise<string | null> | null = null;

export async function serverFetch(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  // const refreshToken = cookieStore.get("refresh_token")?.value;

  const getHeaders = (token?: string) => {
    const h = new Headers(options.headers);
    if (token) h.set("Authorization", `Bearer ${token}`);
    return h;
  };

  const response = await fetch(url, {
    ...options,
    headers: getHeaders(accessToken),
  });

  // if (response.status === 401 && refreshToken) {
  //   if (!refreshPromise) {
  //     refreshPromise = (async () => {
  //       try {
  //         const refreshRes = await fetch(apiServerUrls.refresh, {
  //           method: "POST",
  //           headers: {
  //             Cookie: `refresh_token=${refreshToken}`,
  //             "Content-Type": "application/json",
  //           },
  //         });

  //         if (refreshRes.ok) {
  //           const setCookieHeader = refreshRes.headers.get("set-cookie");
  //           if (setCookieHeader) {
  //             await applyCookiesInAction(setCookieHeader);
  //             return extractTokenFromHeader(setCookieHeader, "access_token");
  //           }
  //         }
  //         return null;
  //       } catch (error) {
  //         console.error("Server Refresh Error:", error);
  //         return null;
  //       } finally {
  //         refreshPromise = null;
  //       }
  //     })();
  //   }

  //   const newAccessToken = await refreshPromise;

  //   if (newAccessToken) {
  //     return await fetch(url, {
  //       ...options,
  //       headers: getHeaders(newAccessToken),
  //     });
  //   } else {
  //     console.error(
  //       "authenticatedServerFetch: Refresh failed or token not found",
  //     );
  //   }
  // }

  return response;
}
