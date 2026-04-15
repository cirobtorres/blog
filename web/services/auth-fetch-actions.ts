"use server";

import { cookies } from "next/headers";
import { applyCookiesInAction } from "./helpers/actions";
import { extractTokenFromHeader } from "./helpers/server";
import { coordinatedRefresh } from "./helpers/refresh";

const defaultState: ActionState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export async function serverFetch(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  const getHeaders = (token?: string) => {
    const h = new Headers(options.headers);
    if (token) h.set("Authorization", `Bearer ${token}`);
    return h;
  };

  const response = await fetch(url, {
    ...options,
    headers: getHeaders(accessToken),
  });

  if (response.status === 401 && refreshToken) {
    const refreshResult = await coordinatedRefresh(refreshToken);

    if (refreshResult.ok && refreshResult.setCookieHeader) {
      await applyCookiesInAction(refreshResult.setCookieHeader);
      const newAccessToken = extractTokenFromHeader(
        refreshResult.setCookieHeader,
        "access_token",
      );

      if (newAccessToken) {
        return fetch(url, {
          ...options,
          headers: getHeaders(newAccessToken),
        });
      }
    }

    console.error(
      "serverFetch: refresh failed or access_token missing in Set-Cookie",
    );
  }

  return response;
}

export async function fetchAction(url: string, options: RequestInit = {}) {
  try {
    const response = await serverFetch(url, options);
    if (!response.ok) {
      const errorDetail = response.statusText || "Erro em 'fetchAction'";
      return {
        ...defaultState,
        error: `${response.status}: ${errorDetail}`,
        data: {
          status: response.status,
          statusText: response.statusText,
        },
      };
    }
    const data = await response.json();
    return { ...defaultState, ok: true, data };
  } catch (e) {
    return {
      ...defaultState,
      ok: false,
      error:
        e instanceof Error ? e.message : "Erro desconhecido em 'fetchAction'",
    };
  }
}
