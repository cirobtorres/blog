import { apiClientUrls } from "../../urls";

const logout = async () => {
  await fetch(apiClientUrls.logout, {
    method: "POST",
    credentials: "include",
  });
};

export { logout };
