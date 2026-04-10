"use server";

import { cookies, headers } from "next/headers";
import { apiServerUrls } from "../../../../routing/routes";
import { cache } from "react";
import { serverFetch } from "../../../auth-fetch-actions";

const getUser = cache(async (): Promise<SessionUser> => {
  const cookieStore = await cookies();
  const headerList = await headers();
  const authHeader = headerList.get("authorization");
  const accessToken = authHeader
    ? authHeader.split(" ")[1]
    : cookieStore.get("access_token")?.value;

  if (!accessToken) return { ok: false, data: null };

  try {
    const response = await serverFetch(apiServerUrls.me, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (response.status === 204 || response.status === 401) {
      // No content || Unauthorized
      return { ok: false, data: null };
    }

    if (!response.ok) {
      throw new Error(
        `getUser error: status -> ${response.status}, message -> ${response.statusText}`,
      );
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    return { ok: true, data };
  } catch (e) {
    console.error("getUser:", e);
    return { ok: false, data: null };
  }
});

export default getUser;
