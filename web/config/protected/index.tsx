const ROUTES_PERMISSIONS = {
  "/authors": ["AUTHOR"],
} as const;

const PROTECTED_ROUTES = ["/authors"];

export { ROUTES_PERMISSIONS, PROTECTED_ROUTES };
