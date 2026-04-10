const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000";
const API_SERVER = process.env.API_URL_SERVER || "http://localhost:8080";
const API_CLIENT = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const MY_GIT = "https://github.com/cirobtorres";
const BLOG_GIT = "https://github.com/cirobtorres/blog";

const publicWebUrls = {
  home: "/",
  signIn: "/users/sign-in",
  forget: "/users/sign-in/forgot-password",
  signUp: "/users/sign-up",
  validateEmail: "/users/sign-up/validate-email",
};

const pubWebUrlsAbsPath = {
  home: WEB_URL + "/",
};

const protectedWebUrls = {
  authors: "/users/authors",
  users: "/users/settings",
  write: "/users/authors/articles",
  media: "/users/authors/media",
};

const routeHandlers = {
  refresh: "/local/auth/refresh",
};

const apiServerUrls = {
  // Authentication
  login: API_SERVER + "/auth/login",
  register: API_SERVER + "/auth/register",
  emailCode: API_SERVER + "/auth/validation",
  renewCode: API_SERVER + "/auth/renew-code",
  refresh: API_SERVER + "/auth/refresh",
  passResetEmailRequest: API_SERVER + "/auth/password-reset-email-request",
  passResetCode: API_SERVER + "/auth/password-reset-code",
  passwordReset: API_SERVER + "/auth/password-reset",
  me: API_SERVER + "/auth/me",
  // Articles
  article: {
    create: API_SERVER + "/articles",
  },
  media: {
    root: API_SERVER + "/media",
    count: API_SERVER + "/media/count",
    syncImport: API_SERVER + "/media/sync/import",
    move: API_SERVER + "/media/move/all",
  },
  mediaFolders: {
    root: API_SERVER + "/media/folders",
    count: API_SERVER + "/media/folders/count",
    exists: API_SERVER + "/media/folders/exists",
    move: API_SERVER + "/media/folders/move/all",
  },
};

const apiClientUrls = {
  google: API_CLIENT + "/oauth2/authorization/google",
  github: API_CLIENT + "/oauth2/authorization/github",
  microsoft: "/", // TODO
  linkedin: "/", // TODO
  me: API_CLIENT + "/auth/me",
  logout: API_CLIENT + "/auth/logout",
};

const externalUrls = {
  myGitHub: MY_GIT,
  blogGitHub: BLOG_GIT,
};

export {
  publicWebUrls,
  pubWebUrlsAbsPath,
  protectedWebUrls,
  routeHandlers,
  apiServerUrls,
  apiClientUrls,
  externalUrls,
};
