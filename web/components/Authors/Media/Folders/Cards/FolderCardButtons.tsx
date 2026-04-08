"use client";

import { useArticleStore } from "../../../../../zustand-store/article-state";
import FolderCardButton from "./FolderCardButton";
import {
  FolderCardGridWrapper,
  FolderCardSectionWrapper,
  FolderCardTitle,
} from "./FolderCardsUtils";
import { FolderCardsLoadingSimplified } from "./FolderCardsLoading";
import { useFoldersWithCount } from "../../../../../hooks/hook-folders";

export default function FolderCardButtons() {
  const { currentModalFolder, setCurrentModalFolder } = useArticleStore();
  const { data, isLoading } = useFoldersWithCount(currentModalFolder);
  const folders = data?.folders ?? [];
  const count = data?.count ?? 0;

  if (isLoading) return <FolderCardsLoadingSimplified />;

  return (
    <FolderCardSectionWrapper>
      <FolderCardTitle count={count} />
      {folders.length > 0 && (
        <FolderCardGridWrapper className="grid-cols-3">
          {folders.map((folder) => (
            <FolderCardButton
              key={folder.id}
              folder={folder}
              className="max-w-80"
              onClick={() =>
                setCurrentModalFolder(encodeURIComponent(folder.path))
              }
            />
          ))}
        </FolderCardGridWrapper>
      )}
    </FolderCardSectionWrapper>
  );
}
