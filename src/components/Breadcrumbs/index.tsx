"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArrowDropRightLine } from "react-icons/ri";

export default function Breadcrumbs() {
  const fullPathname = usePathname();
  let pathname = fullPathname.split("/");

  pathname[0] = "home";

  const artigosIndex = pathname.indexOf("artigos");
  if (artigosIndex !== -1) {
    pathname = pathname.slice(0, artigosIndex + 1);
    // pathname = pathname.slice(0, artigosIndex + 2);
    // pathname[2] = decodeURIComponent(pathname[2]);
  }

  return (
    <ul className="flex gap-1 items-center py-1 mb-6">
      {pathname.map((path: string, index: number) => (
        <li
          key={index}
          className="flex items-center text-base-neutral dark:text-dark-base-neutral"
        >
          {index !== 0 && <RiArrowDropRightLine className="text-3xl" />}
          <Link
            href={index === 0 ? "/" : `/${pathname.slice(1).join("/")}`}
            className="text-sm smartphone:text-base hover:text-base-green-hover dark:hover:text-dark-base-green-hover"
          >
            {path}
          </Link>
        </li>
      ))}
    </ul>
  );
}
