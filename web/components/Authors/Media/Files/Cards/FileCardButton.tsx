"use client";

import Image from "next/image";
import { DashedBackground } from "../../../../DashedBackground";
import {
  FileCardFloatingButtonsWrapper,
  FileCardInfos,
  FileCardWrapper,
} from "./FileCardUtils";
import { Checkbox } from "../../../../Fieldset/Checkbox";
import React from "react";
import { SelectionContext } from "../../../../Editors/editors/utils";
import { ExpandButton } from "./Buttons/ExpandButton";
import DownloadButton from "./Buttons/DownloadButton";

export default function FileCardButton({
  file,
  isPriority = false,
}: {
  file: Media;
  isPriority?: boolean;
}) {
  const context = React.useContext(SelectionContext);
  if (!context) return null;

  const { tempSelection, setTempSelection, multiSelect } = context;
  const isChecked = tempSelection.some((i) => i.id === file.id);

  const toggle = () => {
    if (isChecked) {
      setTempSelection(tempSelection.filter((i) => i.id !== file.id));
    } else {
      if (multiSelect) {
        setTempSelection([
          ...tempSelection,
          { id: file.id, url: file.url, alt: file.alt },
        ]);
      } else {
        setTempSelection([{ id: file.id, url: file.url, alt: file.alt }]);
      }
    }
  };

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
          onCheckedChange={toggle}
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
      </FileCardFloatingButtonsWrapper>
      <FileCardInfos file={file} />
    </FileCardWrapper>
  );
}
