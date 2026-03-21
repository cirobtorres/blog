"use server";

import { cookies } from "next/headers";
import { apiServerUrls } from "../../../../config/routes";

export const getUser = async (): Promise<SessionUser> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) return { ok: false, data: null };

  try {
    const response = await fetch(apiServerUrls.me, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      if (process.env.NODE_ENV !== "production") {
        console.error(response);
      }

      if (response.status === 204 || response.status === 401) {
        // No content || Unauthorized
        return { ok: false, data: null };
      }

      if (response.status === 404) {
        // Not found
        if (process.env.NODE_ENV !== "production") {
          console.error(response);
        }
        return { ok: false, data: null };
      }

      if (!response.ok) {
        throw new Error(response.statusText);
      }
    }

    return { ok: true, data: await response.json() };
  } catch (error) {
    console.error("getUser (server):", error);
    return { ok: false, data: null };
  }
};
