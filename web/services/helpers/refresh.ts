import { createHash } from "crypto";
import { apiServerUrls, routeHandlers } from "@/routing/routes";
import { joinSetCookieHeaders } from "@/services/helpers/server";

// CLIENT
// Access route handler /local/auth/refresh, that calls /api/auth/refresh through coordinatedRefresh
// All fetches are accessing the refresh endpoint through "coordinatedRefresh"
// "coordinatedRefresh" unifies the responsibility of concurrency attempts to multiple refresh rotation calls
let refreshPromise: Promise<boolean> | null = null;

/**
 * @deprecated
 */
export function runCoordinatedClientRefresh(): Promise<boolean> {
  refreshPromise ??= (async () => {
    try {
      const res = await fetch(routeHandlers.refresh, {
        method: "POST",
        credentials: "include",
      });
      return res.ok;
    } catch {
      return false;
    } finally {
      refreshPromise = null;
    }
  })();
  return refreshPromise;
}

// ACTION
export type CoordinatedRefreshResult = {
  ok: boolean;
  setCookieHeader: string | null;
  status: number;
};

const inFlight = new Map<string, Promise<CoordinatedRefreshResult>>();

function keyForRefreshToken(refreshToken: string): string {
  return createHash("sha256").update(refreshToken).digest("hex");
}

/**
 * Single authority for calling Spring `/auth/refresh`.
 * Concurrent callers with the same refresh token share one upstream request
 * (per Node runtime instance), avoiding refresh-token rotation races.
 */
export function coordinatedRefresh(
  refreshToken: string,
): Promise<CoordinatedRefreshResult> {
  const key = keyForRefreshToken(refreshToken);
  let pending = inFlight.get(key);
  if (!pending) {
    pending = (async (): Promise<CoordinatedRefreshResult> => {
      try {
        const refreshRes = await fetch(apiServerUrls.refresh, {
          method: "POST",
          headers: { Cookie: `refresh_token=${refreshToken}` },
        });
        const setCookieHeader = joinSetCookieHeaders(refreshRes.headers);
        return {
          ok: refreshRes.ok,
          setCookieHeader,
          status: refreshRes.status,
        };
      } catch (error) {
        console.error("coordinatedRefresh:", error);
        return { ok: false, setCookieHeader: null, status: 500 };
      } finally {
        inFlight.delete(key);
      }
    })();
    inFlight.set(key, pending);
  }
  return pending;
}
