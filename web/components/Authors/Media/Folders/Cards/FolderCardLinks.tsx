"use server";

import { apiServerUrls } from "../../../../../routing/routes";
import { serverFetch } from "../../../../../services/auth-fetch-actions";
import { cn } from "../../../../../utils/variants";
import FolderCheckbox from "../Header/FolderCheckbox";
import FolderCardLink from "./FolderCardLink";
import {
  FolderCardGridWrapper,
  FolderCardHeaderButtonsWrapper,
  FolderCardSectionWrapper,
  FolderCardTitle,
} from "./FolderCardsUtils";

export default async function FolderCardLinks({
  accessToken,
  currentPath,
}: {
  accessToken?: string;
  currentPath?: string[];
}) {
  const decodedPath = currentPath
    ? currentPath.map((segment) => decodeURIComponent(segment)).join("/")
    : "";

  const folderPath = decodedPath.startsWith("/")
    ? decodedPath
    : "/" + decodedPath;

  const query = new URLSearchParams({
    folder: folderPath,
  });

  const getUrl = `${apiServerUrls.mediaFolders.root}?${query.toString()}`;
  const countUrl = `${apiServerUrls.mediaFolders.count}?${query.toString()}`;

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    next: { tags: ["folders"] },
  };

  const [folders, count] = await Promise.all([
    serverFetch(getUrl, options)
      .then((res) => res.json() as Promise<Folder[]>)
      .catch((e) => {
        console.error(e);
        return [];
      }),
    serverFetch(countUrl, options)
      .then((res) => res.json() as Promise<number>)
      .catch((e) => {
        console.error(e);
        return 0;
      }),
  ]);

  return (
    <FolderCardSectionWrapper>
      <FolderCardTitle count={count} />
      <FolderCardHeaderButtonsWrapper>
        <FolderCheckbox allFolders={folders} />
      </FolderCardHeaderButtonsWrapper>
      <FolderCardGridWrapper className={cn(folders.length === 0 && "mb-18")}>
        {folders.length > 0 &&
          folders.map((folder) => (
            <FolderCardLink key={folder.id} folder={folder} />
          ))}
      </FolderCardGridWrapper>
    </FolderCardSectionWrapper>
  );
}
