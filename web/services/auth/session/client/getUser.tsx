"use client";

import { apiClientUrls } from "../../../../urls";

const getUser = async (): Promise<AuthSession> => {
  const isProd = process.env.NODE_ENV === "production";
  try {
    const response = await fetch(apiClientUrls.me, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      if (!isProd) {
        console.error(response);
      }

      if (response.status === 204 || response.status === 401) {
        // No content || Unauthorized
        return { ok: false, data: null };
      }

      if (response.status === 404) {
        // Not found
        if (!isProd) {
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
    if (!isProd) {
      console.error("getUser (client):", error);
    }
    return { ok: false, data: null };
  }
};

export default getUser;
