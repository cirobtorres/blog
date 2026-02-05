"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../Breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

export default function ArticleBreadcrumb() {
  const pathname = usePathname();
  const pathnameSplit = pathname.split("/").splice(1);

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        {pathnameSplit.map((path, i, arr) => {
          const href = "/" + pathnameSplit.slice(0, i + 1).join("/");
          const sugarPath =
            path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
          return (
            <React.Fragment key={i}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  render={
                    <Link
                      href={href}
                      className={i + 1 == arr.length ? "text-theme" : ""}
                    />
                  }
                >
                  {sugarPath}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
