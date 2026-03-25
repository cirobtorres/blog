"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../Breadcrumb";
import { Link } from "../../../Links";

export const ArtBreadcrumb = () => {
  const pathname = usePathname();
  const slug = pathname.split("/").at(-1) ?? "";
  const sugarPath =
    slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href="/"
              className="text-primary/75 hover:text-primary dark:hover:text-primary font-normal underline underline-offset-2"
            >
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="italic">Articles</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="italic">{sugarPath}</BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
