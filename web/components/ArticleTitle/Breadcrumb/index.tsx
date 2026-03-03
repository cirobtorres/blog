"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../Breadcrumb";
import { Link } from "../../Links";

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
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="italic text-neutral-500">
          Articles
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="italic text-neutral-500">
          {sugarPath}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
