import { runCoordinatedClientRefresh } from "./helpers/refresh";

/**
 * @deprecated Use `serverFetch()` instead.
 */
export async function clientFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  options.credentials = "include";

  const response = await fetch(url, options);

  if (response.status === 401) {
    const isRefreshed = await runCoordinatedClientRefresh();

    if (isRefreshed) {
      return fetch(url, options);
    } else {
      console.log("clientFetch failed");
      // window.location.href = publicWebUrls.signIn + "?login=required";
    }
  }

  return response;
}
