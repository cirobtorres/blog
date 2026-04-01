"use client";

import Image from "next/image";
import { DashedBackground } from "../../../../DashedBackground";
import { Checkbox } from "../../../../Fieldset/Checkbox";
import DownloadButton from "./Buttons/DownloadButton";
import { ExpandButton } from "./Buttons/ExpandButton";
import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";
import { useFile } from "../../../../../providers/FileProvider";

export default function MediaFileCard({
  file,
  isPriority = false,
}: {
  file: Media;
  isPriority?: boolean;
}) {
  const { selectedItems, toggleItem } = useFile();
  const isChecked = selectedItems.some((i) => i.id === file.id);
  return (
    <article className="w-full max-w-100 h-65 flex flex-col shrink-0 items-center overflow-hidden transition-border duration-300 rounded-lg border hover:border-primary not-dark:shadow bg-stone-200 dark:bg-stone-900 hover:bg-stone-150 dark:hover:bg-stone-850 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-stone-300 dark:has-data-[state=checked]:bg-stone-850 focus-within:border-primary dark:focus-within:border-primary dark:focus-within:bg-stone-850 group">
      <div className="w-full h-full grid grid-rows-[1fr_calc(28px+24px+4px+16px+1px)]">
        <div className="relative">
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
          <div className="absolute top-2 right-2 flex items-center gap-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-has-data-[state=checked]:opacity-100">
            {file.url && <ExpandButton url={file.url} />}
            <DownloadButton {...file} />
            <EditButton {...file} />
            <DeleteButton {...file} />
          </div>
        </div>
        <div className="w-full flex justify-between items-center gap-2 p-2 border-t">
          <div className="w-full h-full flex flex-col justify-start gap-1">
            <span className="h-7 flex-1 text-xs leading-3.5 line-clamp-2 mb-auto mt-0 text-neutral-900 dark:text-neutral-100">
              {file.name}
            </span>
            <div className="flex justify-between items-center gap-1">
              <span className="text-xs font-bold text-neutral-500">
                {file.type}
                {file.type === "IMAGE" &&
                  " - " + file.width + "x" + file.height}
              </span>
              <span className="text-xs px-2 py-1 rounded font-bold transition-all duration-300 dark:text-neutral-500 dark:bg-stone-800 dark:group-hover:bg-stone-750 dark:group-has-data-[state=checked]:bg-stone-750">
                {file.type}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
