"use server";

import { apiServerUrls } from "../../../../../../routing/routes";
import { serverFetch } from "../../../../../../services/serverFetch";
import { cn } from "../../../../../../utils/variants";
import FolderCheckbox from "../Header/FolderCheckbox";
import FolderCardLink from "./FolderCardLink";
import {
  FolderCardGridWrapper,
  FolderCardHeaderButtonsWrapper,
  FolderCardSectionWrapper,
  FolderCardTitle,
} from "./FolderCardsUtils";

// const TAG_REVALIDATE_TIME = 60 * 60 * 24 * 7; // 1 week

async function safeJson<T>(res: Response, fallback: T): Promise<T> {
  if (!res.ok) {
    console.error(`HTTP error ${res.status} de ${res.url}`);
    return fallback;
  }

  const text = await res.text();
  if (!text) return fallback;

  try {
    return JSON.parse(text) as T;
  } catch (err) {
    console.error("(safeJson) JSON.parse error:", err);
    return fallback;
  }
}

export default async function FolderCardLinks({
  currentPath,
}: {
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

  const options: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    // next: { tags: ["folders"], revalidate: TAG_REVALIDATE_TIME },
    next: { tags: ["folders"] },
    // cache: "force-cache",
    cache: "no-store",
  };

  const [folders, count] = await Promise.all([
    serverFetch(getUrl, options)
      .then((res) => safeJson<Folder[]>(res, []))
      .catch((e) => {
        console.error(e);
        return [];
      }),
    serverFetch(countUrl, options)
      .then((res) => safeJson<number>(res, 0))
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
