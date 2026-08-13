"use client";

import { cn, focusRing, linkVariants } from "../../../utils/variants";
import { usePathname, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function UserSignedOff() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const returnParams = new URLSearchParams(searchParams.toString());
  returnParams.delete("redirect_url");
  returnParams.delete("login");
  returnParams.delete("callbackUrl");
  returnParams.delete("callback");
  returnParams.delete("replyTo");
  const search = returnParams.toString();
  const fullPath = search ? `${pathname}?${search}` : pathname;

  const handleSignIn = async () => {
    await signIn("keycloak", {
      callbackUrl: fullPath,
    });
  };

  return (
    <div className="relative flex gap-3">
      <button
        onClick={handleSignIn}
        className={cn(
          linkVariants({ variant: "internal" }),
          "cursor-pointer font-normal text-neutral-600 dark:text-neutral-100 border border-transparent transition-all duration-300 dark:focus-visible:bg-stone-800 dark:focus-visible:text-neutral-100",
          focusRing,
        )}
      >
        Entrar
      </button>
    </div>
  );
}

export function UserSignedOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-8 p-1 border rounded-full not-default:shadow bg-stone-100 border-stone-300 dark:border-stone-700 dark:bg-stone-800"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
