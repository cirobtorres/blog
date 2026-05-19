"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { buttonVariants, cn, focusRing } from "../../utils/variants";
import { publicWebUrls } from "../../routing/routes";
import NextLink from "next/link";
import { Link } from "../Links";
import { characterLimit } from "./CommentEditor";
import { UserSignedOffIcon } from "../Header/UserSignedOff";

export default function CommentHere() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const fullPath =
    (search ? `${pathname}?${search}` : pathname) + "#create-comment";
  const loginUrl = `${publicWebUrls.signIn}?redirect_url=${encodeURIComponent(fullPath)}&login=comment`;

  return (
    <div className="w-full flex flex-col gap-1">
      <NextLink
        href={loginUrl}
        className={cn(
          "w-fit flex items-center gap-2 rounded border border-transparent transition-[border,box-shadow] duration-300",
          focusRing,
        )}
      >
        <UserSignedOffIcon />
        Anônimo
      </NextLink>
      <div className="w-full h-full text-left text-sm text-neutral-900 dark:text-neutral-100 **:outline-none border-b [scrollbar-width:none] [-ms-overflow-style:none] py-2">
        <Link
          href={loginUrl}
          variant="external"
          className={cn("px-1 border border-transparent", focusRing)}
        >
          Login...
        </Link>
      </div>
      <div className="flex justify-between items-center gap-1">
        <div className="flex items-center gap-1 h-6">
          <span className="text-sm text-neutral-500">
            Tamanho: 0/{characterLimit}
          </span>
          <span className="text-sm text-neutral-500">Palavras: 0</span>
        </div>
        <div className="flex justify-end items-center gap-1">
          <div
            aria-disabled={true}
            className={cn(
              buttonVariants({ variant: "outline", disabled: true }),
              "w-full max-w-30 h-6",
              focusRing,
            )}
          >
            Cancelar
          </div>
          <div
            aria-disabled={true}
            className={cn(
              buttonVariants({ variant: "default", disabled: true }),
              "w-full max-w-30 h-6",
              focusRing,
            )}
          >
            Salvar
          </div>
        </div>
      </div>
    </div>
  );
}
