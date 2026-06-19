"use server";

import { cookies } from "next/headers";
import { apiServerUrls } from "../../../../routing/routes";
import { serverFetch } from "../../../auth-fetch-actions";

const getUser = async (): Promise<SessionUser> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  console.log("=== DEBUG GETUSER ===");
  console.log("Tem Access?", !!accessToken);
  console.log("Tem Refresh?", !!refreshToken);

  if (!accessToken && !refreshToken) return { ok: false, data: null };

  try {
    const response = await serverFetch(apiServerUrls.me, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok || response.status === 204) {
      return { ok: false, data: null };
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    console.log(data);

    return { ok: true, data };
  } catch (e) {
    console.error("Erro em getUser:", e);
    return { ok: false, data: null };
  }
};

export default getUser;
