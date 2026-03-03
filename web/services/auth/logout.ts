import { apiServerUrls } from "../../urls";

const logout = async () => {
  await fetch(apiServerUrls.logout, {
    method: "POST",
    credentials: "include",
  });
};

export { logout };
