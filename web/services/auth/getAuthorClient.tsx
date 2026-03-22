// services/auth/session/server/getAuthorClient.ts
import { ROUTES_PERMISSIONS } from "../../config/protected";

const getAuthorClient = ({ pathname }: { pathname?: string }) => {
  if (!pathname) return ["USER"];

  const sortedRoutes = Object.keys(ROUTES_PERMISSIONS).sort(
    (a, b) => b.length - a.length,
  );

  const matchedRoute = sortedRoutes.find((route) => pathname.includes(route));

  if (matchedRoute) {
    return ROUTES_PERMISSIONS[matchedRoute as keyof typeof ROUTES_PERMISSIONS];
  }

  return ["USER"];
};

export { getAuthorClient };
