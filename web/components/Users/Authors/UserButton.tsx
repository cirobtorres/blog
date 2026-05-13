"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "../../Skeleton";
import Spinner from "../../Spinner";

export const UserButton = dynamic(
  () => import("./UserButtonComponent").then((m) => m.UserButton),
  {
    ssr: false,
    loading: () => (
      <Skeleton className="size-9 my-1 mx-auto shrink-0 flex justify-center items-center rounded-full">
        <Spinner />
      </Skeleton>
    ),
  },
);
