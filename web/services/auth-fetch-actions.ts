"use server";

import { cookies } from "next/headers";

const defaultState: ActionState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

function buildHeaders(options: RequestInit, token?: string) {
  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
}

export async function serverFetch(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const response = await fetch(url, {
    ...options,
    headers: buildHeaders(options, accessToken),
    cache: "no-store",
  });

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
