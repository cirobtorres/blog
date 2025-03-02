import { getAuthToken } from "./get-auth-token";

export async function getUserMeLoader() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:1337";
  const path = "/api/users/me";

  const url = new URL(path, baseUrl);

  const authToken = await getAuthToken();
  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });
    const data = await response.json();
    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null, error: error };
  }
}
