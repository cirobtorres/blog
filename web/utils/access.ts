import { ROUTES_PERMISSIONS } from "../routing/protected";

type Route = keyof typeof ROUTES_PERMISSIONS;

function isRoute(route: string): route is Route {
  return route in ROUTES_PERMISSIONS;
}

export { isRoute };
