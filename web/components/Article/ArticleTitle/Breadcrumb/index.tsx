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
  const regex = /\/(?<year>\d{4})\/(?<month>\d{1,2})\/(?<day>\d{1,2})/;
  const match = regex.exec(pathname);
  const { year, month, day } = match?.groups || {};

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
        {year && month && day && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="italic">{year}</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="italic">{month}</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="italic">{day}</BreadcrumbItem>
          </>
        )}
        <BreadcrumbSeparator />
        <BreadcrumbItem className="italic">Articles</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="italic">{sugarPath}</BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
