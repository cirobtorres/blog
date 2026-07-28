"use client";

import { cn, linkVariants } from "../utils/variants";
import { signIn } from "next-auth/react";

export default function SignInButton({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const handleSignIn = async () => {
    await signIn("keycloak", {
      callbackUrl: "/",
    });
  };

  return (
    <button
      onClick={handleSignIn}
      className={cn(
        linkVariants({ variant: "internal" }),
        "cursor-pointer text-xs text-primary/75 hover:text-primary dark:hover:text-primary underline underline-offset-2",
        className,
      )}
    >
      {children}
    </button>
  );
}
