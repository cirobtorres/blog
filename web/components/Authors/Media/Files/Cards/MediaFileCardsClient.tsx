"use client";

import MediaFileCheckbox from "../Header/MediaFileCheckbox";
import MediaPagination from "../Pagination/MediaPagination";
import MediaFileCard from "./MediaFileCard";
import MediaFileCardGhost from "./MediaFileCardGhost";
import { MediaFilesSorting } from "../Header/MediaFilesSorting";

export default function MediaFileCardsClient({
  content: media,
  page,
}: {
  content: Media[];
  page: Pagination;
}) {
  return (
    <>
      <div className="w-full flex justify-between items-center gap-2">
        <MediaFileCheckbox allFiles={media} />
        <MediaFilesSorting />
      </div>
      <MediaPagination {...page} />
      <div className="w-full grid grid-cols-3 items-center gap-2">
        {media.length === 0 &&
          Array.from({ length: 3 }).map((_, i) => (
            <MediaFileCardGhost key={i} />
          ))}
        {media.map(({ ...file }) => (
          <MediaFileCard key={file.publicId} file={file} />
        ))}
      </div>
      <MediaPagination {...page} />
    </>
  );
}
