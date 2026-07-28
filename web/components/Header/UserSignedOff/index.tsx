"use client";

import { cn, focusRing, linkVariants } from "../../../utils/variants";
import { usePathname, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function UserSignedOff() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const fullPath = `${pathname}?${params.toString()}`;
  // const redirectSignIn = `${publicWebUrls.signIn}?redirect_url=${encodeURIComponent(fullPath)}`; // TODO
  // const redirectSignUp = `${publicWebUrls.signUp}?redirect_url=${encodeURIComponent(fullPath)}`; // TODO

  const handleSignIn = async () => {
    await signIn("keycloak", {
      callbackUrl: "/",
    });
  };

  return (
    <div className="relative flex gap-3">
      <button
        onClick={handleSignIn}
        className={cn(
          linkVariants({ variant: "internal" }),
          "cursor-pointer border border-transparent transition-all duration-300 focus-visible:bg-stone-200 dark:focus-visible:bg-stone-800 dark:focus-visible:text-neutral-100",
          // relative after:absolute after:-right-2 after:top-1/2 after:-translate-y-1/2 after:h-4 after:w-px after:shrink-0 after:bg-stone-200 dark:after:bg-stone-700
          focusRing,
        )}
      >
        Entrar
      </button>
      {/* <a
        href={redirectSignUp}
        className={cn(
          linkVariants({ variant: "internal" }),
          "cursor-pointer border border-transparent transition-all duration-300 focus-visible:bg-stone-200 dark:focus-visible:bg-stone-800",
          focusRing,
        )}
      >
        Cadastrar
      </a> */}
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
