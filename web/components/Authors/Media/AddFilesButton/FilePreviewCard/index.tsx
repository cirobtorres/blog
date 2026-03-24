import Image from "next/image";
import React from "react";
import { DashedBackground } from "../../../../DashedBackground";
import { Fieldset, FieldsetInput, FieldsetLabel } from "../../../../Fieldset";
import { Button } from "../../../../Button";
import { generateVideoThumbnail } from "./GenerateVideoThumbnail";
import { FolderSelectBuilder } from "../../../FolderSelectBuidler";

export default function FilePreviewCard({
  file,
  onRemove,
}: {
  file: File;
  onRemove: () => void;
}) {
  const [preview, setPreview] = React.useState<string | null>(null);
  const [name, setName] = React.useState<string>(file.name);
  const [alt, setAlt] = React.useState<string>("");
  const [caption, setCaption] = React.useState<string>("");
  const [folder, setFolder] = React.useState("Home");
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");
  const isAudio = file.type.startsWith("audio/");

  React.useEffect(() => {
    let url = "";
    if (isImage) {
      url = URL.createObjectURL(file);
      setPreview(url);
    } else if (isVideo) {
      generateVideoThumbnail(file).then(setPreview);
    }
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [file, isImage, isVideo]);

  return (
    <div className="relative group flex items-center gap-3 p-3 rounded-2xl border bg-white dark:bg-stone-900 shadow-sm transition-all hover:shadow-md">
      {(isImage || isVideo) && preview ? (
        <PreviewCard preview={preview} file={file} onRemove={onRemove} />
      ) : isVideo ? (
        <div className="animate-pulse bg-stone-300 w-full h-full" />
      ) : isAudio ? (
        <svg
          className="text-emerald-500"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      ) : (
        <svg
          className="text-stone-400"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      )}
      <div className="w-full h-full flex flex-col gap-2 mb-auto">
        <Fieldset>
          <FieldsetInput
            id="name-input"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FieldsetLabel id="name-label" label="Name" htmlFor="name-input" />
        </Fieldset>
        <Fieldset>
          <FieldsetInput
            id="caption-input"
            name="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <FieldsetLabel
            id="caption-label"
            label="Legenda"
            htmlFor="caption-input"
          />
        </Fieldset>
        <div className="flex flex-col gap-1">
          <Fieldset>
            <FieldsetInput
              id="alt-input"
              name="alt"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
            />
            <FieldsetLabel
              id="alt-label"
              label="Texto Alternativo"
              htmlFor="alt-input"
            />
          </Fieldset>
          <p className="pl-1 text-xs text-neutral-400 dark:text-neutral-500">
            O texto que será exibido caso o link da imagem não funcione.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <FolderSelectBuilder
            selectedFolder={folder}
            setSelectedFolder={setFolder}
          />
          <p className="pl-1 text-xs text-neutral-400 dark:text-neutral-500">
            A pasta onde o arquivo será salvo.
          </p>
        </div>
      </div>
    </div>
  );
}

const PreviewCard = ({
  file,
  preview,
  onRemove,
}: {
  file: File;
  preview: string;
  onRemove: () => void;
}) => (
  <article className="w-full max-w-100 h-65 flex flex-col shrink-0 items-center overflow-hidden transition-border duration-300 rounded-lg border not-dark:shadow bg-stone-200 dark:bg-stone-900 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-stone-300 dark:has-data-[state=checked]:bg-stone-850 focus-within:border-primary dark:focus-within:border-primary dark:focus-within:bg-stone-850 group">
    <div className="w-full h-full grid grid-rows-[1fr_calc(28px+24px+4px+16px+1px)]">
      <div className="relative">
        <div className="relative w-full h-full overflow-hidden">
          <DashedBackground />
          <Image
            src={preview}
            alt={file.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="absolute object-contain p-px"
          />
          <Button
            type="button"
            variant="outline"
            onClick={onRemove}
            className="absolute top-2 right-2 size-8 not-dark:shadow-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className=""
            >
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </Button>
        </div>
        <div className="absolute top-2 right-2 flex items-center gap-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-has-data-[state=checked]:opacity-100">
          {/* <ExcludeButton /> */}
        </div>
      </div>
      <div className="w-full flex justify-between items-center gap-2 p-2 border-t">
        <div className="w-full h-full flex flex-col justify-start gap-1">
          <span className="h-7 flex-1 text-xs leading-3.5 line-clamp-2 mb-auto mt-0 text-neutral-900 dark:text-neutral-100">
            {file.name}
          </span>
          <div className="flex justify-between items-center gap-1">
            <span className="text-xs font-bold text-neutral-500">
              {file.type.split("/")[1].toUpperCase()}
              {" - "}
              {(file.size / 1024 / 1024).toFixed(2) + " MB"}
            </span>
            <span className="text-xs px-2 py-1 rounded font-bold transition-[colors,background-color] duration-300 dark:text-neutral-500 dark:bg-stone-800 dark:group-has-data-[state=checked]:bg-stone-750">
              {file.type.includes("image") && "IMAGEM"}
            </span>
          </div>
        </div>
      </div>
    </div>
  </article>
);
