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
