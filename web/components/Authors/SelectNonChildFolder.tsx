"use client";

import { usePathname } from "next/navigation";
import { useFolders } from "../../hooks/useFolders";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Select";
import { protectedWebUrls } from "../../routing/routes";
import { Skeleton } from "../Skeleton";

export function SelectNonChildFolder({
  defaultValue,
  name,
  excludePath,
}: {
  defaultValue?: string;
  name?: string;
  excludePath?: string;
}) {
  const { data: folders, isLoading } = useFolders();

  const formatFolders = (
    allFolders: SelectFolder[],
    parentId: string | null | undefined = null,
    level = 0,
    isInsideExcludedBranch = false,
  ) => {
    let result: SelectFolder[] = [];

    const children = allFolders.filter((f) => f.parentId === parentId);

    children.forEach((folder) => {
      const shouldExclude =
        isInsideExcludedBranch || folder.path === excludePath;

      if (!shouldExclude) {
        result.push({
          ...folder,
          padding: level + 1,
        });
      }

      result = result.concat(
        formatFolders(allFolders, folder.id, level + 1, shouldExclude),
      );
    });
    return result;
  };

  const pathname = usePathname();
  const path = pathname.split(protectedWebUrls.media).pop();
  const currentPath = !!path ? path : "/";
  const options = folders ? formatFolders(folders) : [];

  return (
    <Select
      name={name ?? "folderDestination"}
      defaultValue={defaultValue ?? currentPath}
    >
      {isLoading ? (
        <Skeleton className="h-9.5" />
      ) : (
        <SelectTrigger className="w-full h-9.5">
          <SelectValue placeholder={currentPath} />
        </SelectTrigger>
      )}
      <SelectContent>
        {options.map((folder) => (
          <SelectItem
            key={folder.id}
            value={folder.path}
            style={{ paddingLeft: 12 * folder.padding + "px" }}
          >
            {folder.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
