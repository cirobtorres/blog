"use server";

import { cookies } from "next/headers";
import { serverFetch } from "../serverFetch";
import { apiServerUrls } from "../../routing/routes";

const getUser = async (): Promise<SessionUser> => {
  console.log("getUser");
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  console.log(
    "getUser accessToken:",
    accessToken?.replace(/.*/, accessToken.slice(0, 20)) + "...",
  );
  console.log(
    "getUser refreshToken:",
    refreshToken?.replace(/.*/, refreshToken.slice(0, 20) + "..."),
  );
  console.log(
    "getUser !accessToken && !refreshToken:",
    !accessToken && !refreshToken,
  );

  if (!accessToken && !refreshToken) return { ok: false, data: null };

  try {
    const response = await serverFetch(apiServerUrls.me, {
      method: "GET",
      cache: "no-store",
    });

    console.log(
      "getUser response:",
      response.ok,
      response.status,
      response.statusText,
    );

    if (!response.ok || response.status === 204) {
      return { ok: false, data: null };
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    console.log("getUser data:", data);

    return { ok: true, data };
  } catch (e) {
    console.error("Erro em getUser:", e);
    return { ok: false, data: null };
  }
};

export default getUser;
