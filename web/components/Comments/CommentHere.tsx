"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Link } from "../Links";
import { cn, focusRing } from "../../utils/variants";
import { publicWebUrls } from "../../routing/routes";

export default function CommentHere() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const fullPath =
    (search ? `${pathname}?${search}` : pathname) + "#create-comment";
  const loginUrl = `${publicWebUrls.signIn}?redirect_url=${encodeURIComponent(fullPath)}`;

  return (
    <div className="w-full border rounded-lg px-3 py-3 bg-stone-300 dark:bg-stone-900">
      <Link
        href={loginUrl}
        variant="external"
        className={cn("px-1 border border-transparent", focusRing)}
      >
        Login...
      </Link>
    </div>
  );
}
