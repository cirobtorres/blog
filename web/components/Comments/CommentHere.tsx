"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Link } from "../Links";

export default function CommentHere() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const fullPath =
    (search ? `${pathname}?${search}` : pathname) + "#create-comment";
  const loginUrl = `/users/sign-in?redirect_url=${encodeURIComponent(fullPath)}`;

  return (
    <div className="w-full border rounded-lg px-4 py-3 bg-stone-900">
      <Link href={loginUrl} variant="external">
        Login...
      </Link>
    </div>
  );
}
