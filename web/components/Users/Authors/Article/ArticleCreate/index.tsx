"use client";

import dynamic from "next/dynamic";
import { LoadingSkeleton } from "../ArticlesLoader";

const ArticleCreate = dynamic(
  () => import("./ArticleCreate").then((mod) => mod.ArticleCreate),
  {
    ssr: false,
    loading: () => <LoadingSkeleton />,
  },
);

export default ArticleCreate;
