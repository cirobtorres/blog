"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Select";
import Spinner from "../Spinner";
import { listAllFolders } from "../../services/media/listAllFolders";
import { usePathname } from "next/navigation";

export function FolderSelectBuilder({
  currentFolder, // Saved mediaFolder
  selectedFolder, // User selecting a different folder
  setSelectedFolder,
}: {
  currentFolder?: string;
  selectedFolder: string;
  setSelectedFolder: (value: string) => void;
}) {
  const [isLoadingFolders, setIsLoadingFolders] = React.useState(false);
  const [folderTree, setFolderTree] = React.useState<FolderNode[]>([]);
  const pathname = usePathname();
  const pathnameArray = pathname.split("/Home");
  const isHome = pathnameArray.length < 2;
  const browserFolder = isHome
    ? "Home"
    : (pathnameArray[1]?.split("/").pop() as string);
  const currentFolderFallback = currentFolder ?? browserFolder;

  const handleOpenChange = async (open: boolean) => {
    if (open && folderTree.length === 0) {
      setIsLoadingFolders(true);
      try {
        const data = await listAllFolders();
        setFolderTree(buildFolderTree(data));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingFolders(false);
      }
    }
  };

  return (
    <Select
      name="folder"
      value={selectedFolder}
      onValueChange={setSelectedFolder}
      onOpenChange={handleOpenChange}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={currentFolderFallback} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          value={currentFolderFallback}
          className="text-neutral-100 bg-stone-750"
        >
          {currentFolderFallback}{" "}
          <span className="text-[10px] leading-[10px] text-emerald-500 font-bold">
            Atual
          </span>
        </SelectItem>
        {isLoadingFolders ? (
          <div className="mt-2 w-full flex justify-center">
            <Spinner />
          </div>
        ) : (
          renderFolderOptions(folderTree, 0, currentFolderFallback)
        )}
      </SelectContent>
    </Select>
  );
}

export function renderFolderOptions(
  nodes: FolderNode[],
  level = 0,
  excludePath?: string,
) {
  return nodes.map((node) => (
    <React.Fragment key={node.fullPath}>
      {node.fullPath !== excludePath && (
        <SelectItem
          value={node.fullPath}
          style={{ paddingLeft: `${level * 12 + 12}px` }}
        >
          {node.name}
        </SelectItem>
      )}
      {node.children.length > 0 &&
        renderFolderOptions(node.children, level + 1, excludePath)}
    </React.Fragment>
  ));
}

export function buildFolderTree(paths: { path: string }[]): FolderNode[] {
  const root: FolderNode[] = [];

  paths.forEach((pathObj) => {
    const parts = pathObj.path.split("/");
    let currentLevel = root;

    parts.forEach((part, index) => {
      const fullPath = parts.slice(0, index + 1).join("/");
      let existingNode = currentLevel.find((node) => node.name === part);

      if (!existingNode) {
        existingNode = { name: part, fullPath, children: [] };
        currentLevel.push(existingNode);
      }
      currentLevel = existingNode.children;
    });
  });

  return root;
}
