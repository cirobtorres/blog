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
    pathname = pathname.slice(0, artigosIndex + 2);
  }

  return (
    <ul className="flex gap-1 items-center py-1 mb-2 smartphone:mb-4 tablet:mb-6">
      {pathname.map((path: string, index: number) => (
        <li
          key={index}
          className="flex items-center text-base-neutral dark:text-dark-base-neutral"
        >
          {index !== 0 && <RiArrowDropRightLine className="text-3xl" />}
          <p className="text-sm smartphone:text-base">{path}</p>
        </li>
      ))}
    </ul>
  );
}
