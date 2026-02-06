"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../_rawComponents/Breadcrumb";
import Link from "next/link";
import React from "react";
import { cn, linkVariants } from "../../../utils/className";

export const ArtBreadcrumb = () => {
  const pathname = usePathname();
  const pathnameSplit = pathname.split("/").splice(1);

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/" />} className={linkVariants()}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathnameSplit.map((path, i, arr) => {
          const href = "/" + pathnameSplit.slice(0, i + 1).join("/");
          const sugarPath =
            path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
          console.log(i + 1 === arr.length);
          return (
            <React.Fragment key={i}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {i + 1 === arr.length ? (
                  <span className="font-medium italic">{sugarPath}</span>
                ) : (
                  <BreadcrumbLink
                    render={<Link href={href} />}
                    className={cn(linkVariants(), "")}
                  >
                    {sugarPath}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
