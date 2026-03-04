const WEP_URL = process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000";
const API_SERVER = process.env.API_URL_SERVER || "http://localhost:8080";
const API_CLIENT = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const MY_GITHUB = "https://github.com/cirobtorres";

const webUrls = {
  home: WEP_URL,
  myGithub: MY_GITHUB,
};

const apiServerUrls = {
  login: API_SERVER + "/auth/login",
  register: API_SERVER + "/auth/register",
  emailCode: API_SERVER + "/auth/validation",
  renewCode: API_SERVER + "/auth/renew-code",
  refresh: API_SERVER + "/auth/refresh",
  me: API_SERVER + "/users/me",
};

const apiClientUrls = {
  google: API_CLIENT + "/oauth2/authorization/google",
  github: API_CLIENT + "/oauth2/authorization/github",
  microsoft: "/", // TODO
  linkedin: "/", // TODO
  me: API_CLIENT + "/users/me",
  logout: API_CLIENT + "/auth/logout",
};

export { webUrls, apiServerUrls, apiClientUrls };
