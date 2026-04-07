"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../Breadcrumb";
import { usePathname } from "next/navigation";
import { cn, focusRing } from "../../../utils/variants";
import { Link } from "../../Links";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../DropDownMenu";
import { Button } from "../../Button";

export default function MediaBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const mediaIndex = segments.indexOf("media");
  const mediaPath = "/" + segments.slice(0, mediaIndex + 1).join("/");
  const dynamicSegments = segments.slice(mediaIndex + 1);
  const menuItems = dynamicSegments.slice(0, -1);
  const currentFolder = dynamicSegments[dynamicSegments.length - 1];

  return (
    <Breadcrumb>
      <BreadcrumbList className="h-6">
        {segments.slice(0, mediaIndex).map((segment) => (
          <div key={segment} className="flex items-center gap-1.5">
            <BreadcrumbItem className="text-neutral-400 dark:text-neutral-600 capitalize">
              {segment}
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-neutral-400 dark:text-neutral-600" />
          </div>
        ))}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href={mediaPath}
              className={cn(
                "text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-400 border border-transparent capitalize",
                focusRing,
              )}
            >
              media
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {menuItems.length > 0 && (
          <>
            <BreadcrumbSeparator className="text-neutral-400 dark:text-neutral-600" />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="size-6 p-0">
                    <span className="sr-only">
                      Abrir caminhos intermediários
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[160px]">
                  {menuItems.map((segment, index) => {
                    const fullPath =
                      "/" + segments.slice(0, mediaIndex + 2 + index).join("/");
                    return (
                      <DropdownMenuItem key={segment} asChild>
                        <Link
                          href={fullPath}
                          className="w-full cursor-pointer capitalize"
                        >
                          {decodeURI(segment).replace(/-/g, " ")}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}
        {currentFolder && (
          <>
            <BreadcrumbSeparator className="text-neutral-400 dark:text-neutral-600" />
            <BreadcrumbItem className="text-neutral-400 dark:text-neutral-600 capitalize">
              {decodeURI(currentFolder).replace(/-/g, " ")}
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
