"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../Breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../DropDownMenu";
import { Button } from "../../Button";
import { useArticleStore } from "../../../zustand-store/article-state";
import { cn, focusRing } from "../../../utils/variants";

export default function FolderBreadcrumbState() {
  const { currentModalFolder, setCurrentModalFolder } = useArticleStore();
  const segments = decodeURIComponent(currentModalFolder)
    .split("/")
    .filter(Boolean);
  const menuItems = segments.slice(0, -1);
  const activeFolder = segments[segments.length - 1];

  const handleNavigate = (path: string) => {
    setCurrentModalFolder(path);
  };

  return (
    <Breadcrumb className="mb-2">
      <BreadcrumbList className="h-6">
        {/* Root */}
        <BreadcrumbItem>
          {currentModalFolder === "/" ? (
            <span className="text-sm font-medium capitalize text-neutral-400 dark:text-neutral-600">
              media
            </span>
          ) : (
            <button
              onClick={() => handleNavigate("/")}
              className={cn(
                "cursor-pointer text-sm font-medium capitalize transition-all duration-300 rounded border border-transparent text-neutral-400 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-100",
                focusRing,
              )}
            >
              media
            </button>
          )}
        </BreadcrumbItem>
        {/* Dropdown */}
        {menuItems.length > 0 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="size-6 p-0">
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
                    const targetPath =
                      "/" + segments.slice(0, index + 1).join("/");
                    return (
                      <DropdownMenuItem
                        key={targetPath}
                        onClick={() => handleNavigate(targetPath)}
                        className="cursor-pointer capitalize"
                      >
                        {decodeURIComponent(segment).replace(/-/g, " ")}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}
        {/* Current Folder */}
        {activeFolder && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-neutral-400 dark:text-neutral-600 capitalize text-sm">
              {decodeURIComponent(activeFolder).replace(/-/g, " ")}
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
