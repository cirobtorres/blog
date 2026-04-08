"use client";

import { usePathname } from "next/navigation";
import { useFolders } from "../../../hooks/hook-folders";
import { Skeleton } from "../../Skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "../../Popover";
import { Button } from "../../Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../Command";
import React from "react";
import { protectedWebUrls } from "../../../routing/routes";
import { cn } from "../../../utils/variants";

const Current = () => (
  <span className="text-[10px] font-bold leading-[10px] text-emerald-500">
    Atual
  </span>
);

export default function FolderPopover({
  name,
  defaultValue,
  movingFolderIds = [],
}: {
  name?: string;
  defaultValue?: string | null;
  movingFolderIds?: string[];
}) {
  const [open, setOpen] = React.useState(false);
  const { data: folders, isPending } = useFolders();
  const pathname = usePathname();
  const currentFolder = decodeURIComponent(
    "/" + pathname.slice(protectedWebUrls.media.length).replace(/^\/*/, ""),
  );
  const currentFolderId =
    folders?.find((folder) => folder.path === currentFolder)?.id ?? null;
  const [value, setValue] = React.useState<string | null>(defaultValue ?? null);
  React.useEffect(() => {
    if (value === null && currentFolderId) setValue(currentFolderId);
  }, [currentFolderId, value]);
  const selectedFolderName = folders?.find(
    (folder) => folder.id === value,
  )?.name;
  const sortFolders = folders?.sort((a, b) => a.path.localeCompare(b.path));

  return (
    <div className="flex flex-col gap-1">
      <input
        type="hidden"
        name={name ?? "folderDestinationId"}
        value={value ?? ""}
      />
      <Popover open={open} onOpenChange={setOpen}>
        {isPending || !value ? (
          <Skeleton className="h-9.5" />
        ) : (
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full h-9.5 flex items-center justify-between text-neutral-900 dark:text-neutral-100 bg-stone-100 dark:bg-stone-800 hover:not-disabled:border-stone-400 dark:hover:not-disabled:border-stone-600 hover:not-disabled:bg-stone-150 dark:hover:not-disabled:bg-stone-750 data-[state=open]:border-stone-400 dark:data-[state=open]:border-stone-600 data-[state=open]:bg-stone-150 dark:data-[state=open]:bg-stone-750 group"
            >
              <div className="flex items-center gap-2">
                {selectedFolderName}
                {value === currentFolderId && <Current />}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 size-4 dark:text-stone-500 transition-transform duration-100 group-data-[state=open]:rotate-180"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Button>
          </PopoverTrigger>
        )}
        <PopoverContent className="p-0 w-(--radix-popover-trigger-width)">
          <Command>
            <CommandInput placeholder="Procurar pasta..." />
            <CommandEmpty>Nenhuma pasta encontrada.</CommandEmpty>
            <CommandList className="max-h-64 overflow-y-auto overflow-x-hidden scrollbar">
              <CommandGroup>
                {sortFolders?.map((folder) => {
                  const depth = folder.path.split("/").filter(Boolean).length;

                  const isSelf = movingFolderIds.includes(folder.id);

                  const isDescendant = movingFolderIds.some((movingId) =>
                    folder.path.startsWith(
                      (folders?.find((f) => f.id === movingId)?.path ?? "") +
                        "/",
                    ),
                  );

                  const isDisabled = isSelf || isDescendant;
                  const isCurrent =
                    value === folder.id || currentFolder === folder.path;
                  return (
                    !isDisabled && (
                      <CommandItem
                        key={folder.id}
                        disabled={!!isDisabled}
                        onSelect={() => {
                          if (isDisabled) return;
                          setValue(folder.id);
                          setOpen(false);
                        }}
                        className={cn(
                          "cursor-pointer",
                          isCurrent
                            ? "text-neutral-900 dark:text-neutral-100 bg-stone-200 dark:bg-stone-800 aria-selected:bg-stone-200 dark:aria-selected:bg-stone-800 aria-selected:text-neutral-900 dark:aria-selected:text-neutral-100"
                            : "text-neutral-600 dark:text-neutral-500 aria-selected:bg-stone-200 dark:aria-selected:bg-stone-800 aria-selected:text-neutral-900 dark:aria-selected:text-neutral-100",
                        )}
                        style={{ paddingLeft: `${depth * 12 + 8}px` }}
                      >
                        <div className="flex items-center gap-2">
                          {depth > 2 && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="size-4! stroke-neutral-400 dark:stroke-stone-750"
                            >
                              <path d="m15 10 5 5-5 5" />
                              <path d="M4 4v7a4 4 0 0 0 4 4h12" />
                            </svg>
                          )}
                          {folder.name}
                          {currentFolderId === folder.id && <Current />}
                        </div>
                      </CommandItem>
                    )
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
