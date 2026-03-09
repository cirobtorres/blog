import { ROUTES_PERMISSIONS } from "../../config/protected";
import { isRoute } from "../../utils/access";

const getAuthorClient = ({ pathname }: { pathname?: string }) => {
  if (pathname) {
    return isRoute(pathname) ? ROUTES_PERMISSIONS[pathname] : ["USER"];
  }
  return ["USER"];
};

export { getAuthorClient };
