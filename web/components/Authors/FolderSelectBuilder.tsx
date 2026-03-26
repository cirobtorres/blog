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
import Spinner from "../Spinner";
import { Skeleton } from "../Skeleton";

export function FolderSelectBuilder() {
  const { data: folders, isLoading } = useFolders();
  const formatFolders = (
    allFolders: {
      id: string;
      name: string;
      parentId: string | null | undefined;
      path: string;
    }[],
    parentId: string | null | undefined = null,
    level = 0,
  ) => {
    let result: {
      id: string;
      padding: number;
      name: string;
      parentId: string | null | undefined;
      path: string;
    }[] = [];
    const children = allFolders.filter((f) => f.parentId === parentId);
    children.forEach((folder) => {
      result.push({
        ...folder,
        padding: level + 1,
      });
      result = result.concat(formatFolders(allFolders, folder.id, level + 1));
    });
    return result;
  };

  const pathname = usePathname();
  const subfolder = pathname.split(protectedWebUrls.media).pop();
  const currentPath = "Home" + subfolder;
  const options = folders ? formatFolders(folders) : [];

  return (
    <Select name="folderPath" defaultValue={currentPath}>
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
