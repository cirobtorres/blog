export const ROUTES_PERMISSIONS = {
  "/users/authors": ["AUTHOR"],
  "/users/settings": ["USER"],
} as const;

export type RoutePath = keyof typeof ROUTES_PERMISSIONS;

export function hasAutorities(pathname: string): readonly string[] | null {
  const routes = Object.keys(ROUTES_PERMISSIONS) as RoutePath[];

  const matched = routes
    .sort((a, b) => b.length - a.length)
    .find((route) => pathname.startsWith(route));

  return matched ? ROUTES_PERMISSIONS[matched] : null;
}
