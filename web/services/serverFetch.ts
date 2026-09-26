"use server";

import { auth } from "../keycloak/auth";

export async function serverFetch(url: string, options: RequestInit = {}) {
  const session = await auth();
  const token = session?.accessToken;
  const headers = new Headers(options?.headers);

  if (token && !session?.error) {
    headers.set("Authorization", `Bearer ${token}`);
  } else {
  }

  const response = await fetch(url, {
    ...options,
    headers,
    cache: "no-store",
  });
  return response;
}
