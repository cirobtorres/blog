"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArrowDropRightLine } from "react-icons/ri";

export default function Breadcrumbs() {
  const fullPathname = usePathname();
  const pathname = fullPathname.split("/");

  pathname[0] = "home";

  return (
    <ul className="flex gap-1 items-center py-1 border-b-2 border-base-200 dark:border-dark-base-100 w-fit mb-6">
      {pathname.map((path: string, index: number) => (
        <li
          key={index}
          className="flex items-center text-base-neutral dark:text-dark-base-neutral"
        >
          {index !== 0 && <RiArrowDropRightLine className="text-3xl" />}
          <Link
            href={
              index === 0 ? "/" : `/${pathname.slice(1, index + 1).join("/")}`
            }
            className="hover:underline"
          >
            {path}
          </Link>
        </li>
      ))}
    </ul>
  );
}
