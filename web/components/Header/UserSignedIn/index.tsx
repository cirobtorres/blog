"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "../../Skeleton";
import Spinner from "../../Spinner";
import UserSignedOff from "../UserSignedOff";

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

const UserAuthGate = ({ user }: { user: SessionUser | null }) => {
  if (user === null) {
    return <UserSkeleton />;
  }

  if (user.ok) {
    return <UserSignedInDynamic user={user} />;
  }

  return <UserSignedOff />;
};

export { UserSkeleton };
export default UserAuthGate;
