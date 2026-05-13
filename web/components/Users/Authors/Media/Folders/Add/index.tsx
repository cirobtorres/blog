"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "../../../../../Skeleton";

const AddFolderButton = dynamic(
  () => import("./AddFolderButton").then((m) => m.default),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full max-w-44 h-8" />,
  },
);

export default AddFolderButton;
