"use server";

import { ROUTES_PERMISSIONS } from "../../routing/protected";
import { headers } from "next/headers";
import { isRoute } from "../../utils/access";

const getAuthorServer = async () => {
  const headersList = await headers();
  const fullUrl = headersList.get("x-invoke-path") ?? "/authors"; // http://localhost/authors -> /authors**
  const pathname = fullUrl.split("?")[0]; // /authors**/articles?some=thing -> /authors**/articles
  const route = isRoute(pathname) ? ROUTES_PERMISSIONS[pathname] : ["USER"];
  return route;
};

export { getAuthorServer };
