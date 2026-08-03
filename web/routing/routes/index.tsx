const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000";
const API_SERVER = process.env.API_URL_SERVER || "http://localhost:8080";
const API_CLIENT = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/** Base URL for browser `fetch` — must use NEXT_PUBLIC_* (API_URL_SERVER is undefined on the client). */
const API_BROWSER = API_CLIENT;
const MY_GIT = "https://github.com/cirobtorres";
const BLOG_GIT = "https://github.com/cirobtorres/blog";

const publicWebUrls = {
  home: "/",
  forget: "/users/sign-in/forgot-password",
  signUp: "/users/sign-up",
  validateEmail: "/users/sign-in/validate-email",
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
  login: WEB_URL + "/api/auth/login",
  refresh: WEB_URL + "/api/auth/refresh",
  callback: WEB_URL + "/api/auth/callback",
};

const apiServerUrls = {
  auth: {
    me: API_SERVER + "/auth/me",
  },
  article: {
    root: API_SERVER + "/articles",
    id: API_SERVER + "/articles/id",
    slug: API_SERVER + "/articles/slug",
  },
  comment: {
    root: API_SERVER + "/comments",
    count: API_SERVER + "/comments/count",
  },
  commentLike: {
    root: API_SERVER + "/comments/like",
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
  tags: {
    root: API_SERVER + "/tags",
  },
};

const apiClientUrls = {
  google: "/api/auth/google",
  github: "/api/auth/github",
  logout: API_CLIENT + "/auth/logout",
};

/** Media/folder URLs for `fetch` in Client Components (uses NEXT_PUBLIC_API_URL). */
const apiBrowserUrls = {
  media: {
    root: `${API_BROWSER}/media`,
    count: `${API_BROWSER}/media/count`,
    syncImport: `${API_BROWSER}/media/sync/import`,
    move: `${API_BROWSER}/media/move/all`,
  },
  mediaFolders: {
    root: `${API_BROWSER}/media/folders`,
    count: `${API_BROWSER}/media/folders/count`,
    exists: `${API_BROWSER}/media/folders/exists`,
    move: `${API_BROWSER}/media/folders/move/all`,
  },
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
  apiBrowserUrls,
  externalUrls,
};
