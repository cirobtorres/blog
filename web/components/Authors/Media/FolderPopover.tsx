"use client";

import { usePathname } from "next/navigation";
import { useFolders } from "../../../hooks/useFolders";
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
import { ChevronDown, Lock } from "lucide-react";
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
  currentEditingPath,
}: {
  name?: string;
  defaultValue?: string;
  currentEditingPath?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const { data: folders, isPending } = useFolders();
  const pathname = usePathname();
  const onlyFolder =
    "/" + pathname.slice(protectedWebUrls.media.length).replace(/^\/*/, "");
  const [value, setValue] = React.useState(defaultValue || onlyFolder);
  const selectedFolderName = folders?.find((f) => f.path === value)?.name;

  React.useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="flex flex-col gap-1">
      <input type="hidden" name={name ?? "folderDestination"} value={value} />
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
                {value === onlyFolder && <Current />}
              </div>
              <ChevronDown className="shrink-0 size-4 dark:text-stone-500 transition-transform duration-100 group-data-[state=open]:rotate-180" />
            </Button>
          </PopoverTrigger>
        )}
        <PopoverContent className="p-0 w-(--radix-popover-trigger-width)">
          <Command>
            <CommandInput placeholder="Procurar pasta..." />
            <CommandEmpty>Nenhuma pasta encontrada.</CommandEmpty>
            <CommandList className="max-h-64 overflow-y-auto overflow-x-hidden scrollbar">
              <CommandGroup>
                {folders?.map((folder) => {
                  if (typeof currentEditingPath === "undefined") {
                    currentEditingPath = onlyFolder;
                  }
                  const isSelf = folder.path === currentEditingPath;
                  const isDescendant =
                    currentEditingPath &&
                    folder.path.startsWith(currentEditingPath + "/");
                  const isDisabled = isSelf || isDescendant;
                  return (
                    !isDisabled && (
                      <CommandItem
                        key={folder.id}
                        disabled={!!isDisabled}
                        onSelect={() => {
                          if (isDisabled) return;
                          setValue(folder.path);
                          setOpen(false);
                        }}
                        className={cn(
                          "cursor-pointer text-neutral-600 dark:text-neutral-500 hover:bg-stone-200 dark:hover:bg-stone-800",
                          value === folder.path &&
                            "text-neutral-900 dark:text-neutral-100 bg-stone-200 dark:bg-stone-800",
                          isDisabled &&
                            "opacity-40 cursor-not-allowed select-none",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          {isDisabled && <Lock className="size-3" />}
                          {folder.name}
                          {onlyFolder === folder.path && <Current />}
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
