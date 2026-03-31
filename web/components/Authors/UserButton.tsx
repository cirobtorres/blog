"use client";

import Image from "next/image";
import { cn, focusRing } from "../../utils/variants";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Link } from "../Links";
import { LogoutButton } from "./LogoutButton";
import { protectedWebUrls } from "../../routing/routes";
import { Skeleton } from "../Skeleton";
import Spinner from "../Spinner";
import { useAuth } from "../../providers/AuthProvider";
import React from "react";

export function UserButton() {
  const [isMounted, setIsMounted] = React.useState(false);
  const { user: userData, setUser } = useAuth();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Skeleton
        className={cn(
          "size-9 my-1 mx-auto shrink-0 flex justify-center items-center rounded-full",
        )}
      >
        <Spinner />
      </Skeleton>
    );
  }

  if (!userData?.ok) {
    return (
      <Skeleton
        className={cn(
          "size-9 my-1 mx-auto shrink-0 flex justify-center items-center rounded-full",
        )}
      >
        <Spinner />
      </Skeleton>
    );
  }

  const { data: user } = userData;

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "size-11 p-1 mx-2 flex items-center justify-start gap-2 border border-transparent rounded-lg cursor-pointer transition-[background-color,box-shadow] duration-300 hover:bg-stone-200 dark:hover:bg-stone-800 group",
          focusRing,
        )}
      >
        {user.pictureUrl ? (
          <Image
            src={user.pictureUrl as string}
            alt={"Avatar de " + user.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <span
            className={cn(
              "size-full p-1 shrink-0 flex justify-center items-center rounded-full bg-primary",
            )}
          >
            {user.name
              .toUpperCase()
              .split(" ")
              .map((i) => i[0])
              .splice(0, 2)
              .join("")}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-0 p-0">
        <div className="flex flex-col gap-2 p-3">
          <div className="flex flex-col">
            <span className="font-bold">{user.name}</span>
            <span className="text-xs text-neutral-600 dark:text-neutral-500">
              {user.providerEmail}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {user.authorities.map((authority) => (
              <span
                key={authority}
                className="text-xs text-neutral-500 font-bold rounded-lg px-2 py-1 bg-stone-800"
              >
                {authority}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full h-px bg-stone-300 dark:bg-stone-700" />
        <div className="flex flex-col p-2">
          <Link
            href={protectedWebUrls.users}
            className="w-full h-auto text-start text-neutral-900 dark:text-neutral-100 font-normal p-1 border border-transparent not-dark:shadow-none justify-start bg-inherit dark:bg-inherit hover:bg-stone-300 dark:hover:bg-stone-800 hover:border-transparent dark:hover:border-transparent focus-within:bg-stone-300 dark:focus-within:bg-stone-800"
          >
            Profile settings
          </Link>
          <LogoutButton setUser={setUser} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
