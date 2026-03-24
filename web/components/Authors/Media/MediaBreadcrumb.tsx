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
  const [rootPath, foldersPath] = pathname.split("/Home");
  const root = rootPath.split(/(\/)/).splice(2);
  // TODO
  // const folders = foldersPath.split("/").splice(1);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {root.map((path, index) => {
          if (index % 2 === 0 && index <= 5) {
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
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href="/users/authors/media/Home"
              className={cn(
                "rounded border border-transparent transition-all duration-300",
                focusRing,
              )}
            >
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {/* {folders.length > 0 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-1 h-6"
                  >
                    Pastas
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuGroup>
                    {folders.map((path) => (
                      <DropdownMenuItem key={path}>{path}</DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )} */}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
