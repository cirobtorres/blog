"use client";

import Image from "next/image";
import { DashedBackground } from "../../../../../DashedBackground";
import {
  FileCardFloatingButtonsWrapper,
  FileCardInfos,
  FileCardButtonWrapper,
} from "./FileCardUtils";
import { Checkbox } from "../../../../../Fieldset/Checkbox";
import { ExpandButton } from "./Buttons/ExpandButton";
import DownloadButton from "./Buttons/DownloadButton";
import { useFile } from "../../../../../../providers/FileProvider";

export default function FileCardButton({
  file,
  isPriority = false,
}: {
  file: Media;
  isPriority?: boolean;
}) {
  const { selectedItems, toggleItem } = useFile();
  const isChecked = selectedItems.some((i) => i.id === file.id);

  return (
    <FileCardButtonWrapper>
      <label
        htmlFor={"card-" + file.publicId}
        className="relative w-full h-full overflow-hidden"
      >
        <DashedBackground />
        <Checkbox
          id={"card-" + file.publicId}
          className="absolute z-10 size-6 rounded left-2 top-2"
          checked={isChecked}
          onCheckedChange={() => toggleItem(file)}
        />
        <Image
          src={file.url ?? "https://placehold.co/1920x1080/000/fff/jpeg"} // TODO
          alt={file.name || "Media file"}
          fill
          priority={isPriority}
          loading={isPriority ? "eager" : "lazy"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="absolute object-contain p-px"
        />
      </label>
      <FileCardFloatingButtonsWrapper>
        {file.url && <ExpandButton url={file.url} />}
        <DownloadButton {...file} />
      </FileCardFloatingButtonsWrapper>
      <FileCardInfos file={file} />
    </FileCardButtonWrapper>
  );
}
