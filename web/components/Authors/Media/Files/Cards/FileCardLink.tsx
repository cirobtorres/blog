"use client";

import Image from "next/image";
import { DashedBackground } from "../../../../DashedBackground";
import { Checkbox } from "../../../../Fieldset/Checkbox";
import DownloadButton from "./Buttons/DownloadButton";
import { ExpandButton } from "./Buttons/ExpandButton";
import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";
import { useFile } from "../../../../../providers/FileProvider";
import {
  FileCardFloatingButtonsWrapper,
  FileCardInfos,
  FileCardWrapper,
} from "./FileCardUtils";

export default function FileCardLink({
  file,
  isPriority = false,
}: {
  file: Media;
  isPriority?: boolean;
}) {
  const { selectedItems, toggleItem } = useFile();
  const isChecked = selectedItems.some((i) => i.id === file.id);
  return (
    <FileCardWrapper>
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
          src={file.url ?? "https://placehold.co/1920x1080/000/fff/jpeg"}
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
        <EditButton {...file} />
        <DeleteButton {...file} />
      </FileCardFloatingButtonsWrapper>
      <FileCardInfos file={file} />
    </FileCardWrapper>
  );
}
