"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "../../Skeleton";
import { useSession } from "next-auth/react";
import UserSignedOff from "../UserSignedOff";
import Spinner from "../../Spinner";

const UserSignedInDynamic = dynamic(
  () => import("./UserSignedIn").then((m) => m.default),
  {
    ssr: false,
    loading: () => <UserSkeleton />,
  },
);

const UserSkeleton = () => (
  <div className="flex items-center gap-2 ml-auto mr-0">
    <Skeleton className="flex justify-center items-center shrink-0 size-8 rounded-full">
      <Spinner />
    </Skeleton>
  </div>
);

const UserAuthGate = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <UserSkeleton />;
  }

  if (!session) {
    return <UserSignedOff />;
  }

  // if (session.user.isBanned) {} // TODO

  return <UserSignedInDynamic session={session} />;
};

export { UserSkeleton };
export default UserAuthGate;
