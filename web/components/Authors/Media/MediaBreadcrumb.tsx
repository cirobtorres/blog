"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../Breadcrumb";
import { usePathname } from "next/navigation";
import { cn, focusRing } from "../../../utils/variants";

export default function MediaBreadcrumb() {
  const pathname = usePathname();
  const root = pathname.split(/(\/)/).splice(2);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {root.map((path, index) => {
          // root.length is ALWAYS odd and index is ALWAYS even
          // Because index ALWAYS ends at root.length - 1, the last element ALWAYS is a BreadcrumbItem
          if (index % 2 === 0) {
            return (
              <BreadcrumbItem key={path}>
                <BreadcrumbLink asChild>
                  <Link
                    href={path}
                    className={cn(
                      "rounded border border-transparent transition-all duration-300",
                      focusRing,
                    )}
                  >
                    {path}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          }
          return <BreadcrumbSeparator key={index} />;
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
