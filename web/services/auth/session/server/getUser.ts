"use server";

import { cookies } from "next/headers";
import { apiServerUrls } from "../../../../routing/routes";
import { serverFetch } from "../../../serverFetch";

const getUser = async (): Promise<SessionUser> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

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

    return { ok: true, data };
  } catch (e) {
    console.error("Erro em getUser:", e);
    return { ok: false, data: null };
  }
};

export default getUser;
