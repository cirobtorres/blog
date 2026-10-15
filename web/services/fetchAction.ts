"use server";

import { auth } from "../keycloak/auth";
import { serverFetch } from "./serverFetch";

const defaultState: ActionState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export async function fetchAction(url: string, options: RequestInit = {}) {
  const session = await auth();
  const token = session?.accessToken;
  const headers = new Headers(options?.headers);

  if (token && !session?.error) {
    headers.set("Authorization", `Bearer ${token}`);
  } else {
    // Does nothing
  }

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
