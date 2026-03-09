import { ROUTES_PERMISSIONS } from "../config/protected";

type Route = keyof typeof ROUTES_PERMISSIONS;

function isRoute(route: string): route is Route {
  return route in ROUTES_PERMISSIONS;
}

export { isRoute };
