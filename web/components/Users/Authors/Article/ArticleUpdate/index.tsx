"use client";

import dynamic from "next/dynamic";
import { LoadingSkeleton } from "../ArticlesLoader";

const ArticleUpdate = dynamic(
  () => import("./ArticleUpdate").then((mod) => mod.ArticleUpdate),
  {
    ssr: false,
    loading: () => <LoadingSkeleton />,
  },
);

export default ArticleUpdate;
