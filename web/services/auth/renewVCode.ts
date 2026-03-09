"use server";

import { cookies } from "next/headers";
import { apiServerUrls } from "../../config/routes";

const renewVCode = async () => {
  // const isProd = process.env.NODE_ENV === "production";

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) return { ok: false, success: null, error: null };

  const response = await fetch(apiServerUrls.renewCode, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return {
      ok: true,
      success: null,
      error: null,
    };
  }

  return {
    ok: false,
    success: null,
    error: null,
  };
};

export { renewVCode };
