import { routeHandlers } from "../routing/routes";

let refreshPromise: Promise<boolean> | null = null; // Singleton Pattern

export async function clientFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  options.credentials = "include";

  const response = await fetch(url, options);

  if (response.status === 401) {
    // If a refreshPromise exists, await
    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          const res = await fetch(routeHandlers.refresh, { method: "POST" });
          return res.ok;
        } catch {
          return false;
        } finally {
          refreshPromise = null;
        }
      })();
    }

    const isRefreshed = await refreshPromise;

    if (isRefreshed) {
      return fetch(url, options);
    } else {
      console.log("clientFetch failed");
      // window.location.href = publicWebUrls.signIn + "?login=required";
    }
  }

  return response;
}
