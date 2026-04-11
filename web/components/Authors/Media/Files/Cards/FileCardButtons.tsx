"use client";

import { useFilesWithCount } from "../../../../../services/hooks/files/hook-files";
import { useArticleStore } from "../../../../../zustand-store/article-state";
import MediaFileSearch from "../Header/MediaFileSearch";
import MediaFilesSorting from "../Header/MediaFilesSorting";
import FilePaginationState from "../Pagination/FilePaginationState";
import FileCardButton from "./FileCardButton";
import {
  FileCardSectionWrapper,
  FileCardsLoadingSimplified,
  FileCardTitle,
} from "./FileCardUtils";

const pageFallback = {
  size: 20,
  number: 0,
  totalElements: 0,
  totalPages: 0,
};

export default function FileCardButtons() {
  const { currentModalFolder, currentModalPage } = useArticleStore();
  const { data, isPending } = useFilesWithCount(
    currentModalFolder,
    currentModalPage,
  );
  const files = data?.content ?? [];
  const page = data?.page ?? pageFallback;
  const count = data?.count ?? 0;

  if (isPending) return <FileCardsLoadingSimplified />;

  return (
    <FileCardSectionWrapper>
      <div className="w-full flex justify-between">
        <FileCardTitle count={count} className="w-full flex-1" />
        <div className="flex justify-end items-center mr-0 ml-auto gap-2">
          <MediaFileSearch />
          <MediaFilesSorting />
        </div>
      </div>
      {files.length > 0 && (
        <div className="w-full grid grid-cols-3 items-center gap-2">
          {files.map(({ ...file }) => (
            <FileCardButton key={file.publicId} file={file} />
          ))}
        </div>
      )}
      <FilePaginationState {...page} />
    </FileCardSectionWrapper>
  );
}
