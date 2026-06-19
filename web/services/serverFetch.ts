"use server";

import { cookies, headers } from "next/headers";

function buildHeaders(options: RequestInit, token?: string) {
  const headersObj = new Headers(options.headers);
  if (token) {
    headersObj.set("Authorization", `Bearer ${token}`);
  }
  return headersObj;
}

export async function serverFetch(url: string, options: RequestInit = {}) {
  const headersList = await headers();
  const authorization = headersList.get("Authorization");
  let token = authorization?.startsWith("Bearer ")
    ? authorization.substring(7)
    : undefined;
  if (!token) {
    const cookieStore = await cookies();
    token = cookieStore.get("access_token")?.value;
  }
  const response = await fetch(url, {
    ...options,
    headers: buildHeaders(options, token || undefined),
    cache: "no-store",
  });
  return response;
}
