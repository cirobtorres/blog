"use client";

import Image from "next/image";
import { DashedBackground } from "../../../../DashedBackground";
import { FileCardInfos, FileCardWrapper } from "./FileCardUtils";
import { useArticleStore } from "../../../../../zustand-store/article-state";

export default function FileCardButton({
  file,
  isPriority = false,
}: {
  file: Media;
  isPriority?: boolean;
}) {
  const { setBanner, openMediaLibrary } = useArticleStore();

  return (
    <button
      type="button"
      className="cursor-pointer"
      onClick={() => {
        setBanner(file.url);
        openMediaLibrary(null);
      }}
    >
      <FileCardWrapper>
        <DashedBackground />
        <Image
          src={file.url} // ?? "https://placehold.co/1920x1080/000/fff/jpeg"
          alt={file.name || "Media file"}
          fill
          priority={isPriority}
          loading={isPriority ? "eager" : "lazy"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="absolute object-contain p-px"
        />
        <FileCardInfos file={file} />
      </FileCardWrapper>
    </button>
  );
}
