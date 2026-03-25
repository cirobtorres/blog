"use client";

import React from "react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../AlertDialog";
import Spinner from "../../../../Spinner";
import editMedia from "../../../../../services/cloudinary/edit";
import { DashedBackground } from "../../../../DashedBackground";
import { sonnerToastPromise } from "../../../../../utils/sooner";
import { Fieldset, FieldsetInput, FieldsetLabel } from "../../../../Fieldset";
import { Button } from "../../../../Button";
import { FolderSelectBuilder } from "../../../FolderSelectBuilder";

export default function EditMediaButton({
  id,
  url,
  name: currentName,
  type,
  size,
  extension,
  folder: currentFolder,
  alt: currentAlt,
  caption: currentCaption,
}: {
  id: string;
  url: string;
  name: string;
  type: string;
  size: number;
  extension: string;
  folder: string;
  alt: string;
  caption: string;
}) {
  const [name, setName] = React.useState(currentName);
  const [alt, setAlt] = React.useState(currentAlt);
  const [caption, setCaption] = React.useState(currentCaption);
  const [folder, setFolder] = React.useState(currentFolder);

  const [, action, isPending] = React.useActionState(
    async (prevState: ActionState) => {
      const success = (serverResponse: ActionState) => {
        return (
          <div className="flex flex-col">
            <p>{serverResponse.success}</p>
          </div>
        );
      };

      const error = (serverResponse: ActionState) => {
        return <p>{serverResponse.error}</p>;
      };

      const formData = new FormData();
      formData.set("id", id);
      formData.set("name", name);
      formData.set("alt", alt);
      formData.set("caption", caption);
      formData.set("folder", folder);

      const result = editMedia(prevState, formData);

      const promise: Promise<ActionState> = new Promise((resolve, reject) => {
        result.then((data) => {
          if (data.ok) resolve(result);
          else reject(result);
        });
      });

      sonnerToastPromise(promise, success, error, "Alterando arquivo...");

      return result;
    },
    {
      ok: false,
      success: null,
      error: null,
      data: null,
    },
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="size-8 not-dark:shadow-none">
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
            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
          </svg>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form action={action}>
          <AlertDialogHeader>
            <AlertDialogTitle>Editar arquivo</AlertDialogTitle>
            <AlertDialogCancel className="absolute top-1/2 -translate-y-1/2 right-3 size-8">
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
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </AlertDialogCancel>
          </AlertDialogHeader>
          <AlertDialogDescription className="sr-only">
            Aqui você pode editar seu arquivo.
          </AlertDialogDescription>
          <div className="p-4">
            <div className="relative group flex items-center gap-3 p-3 rounded-2xl border bg-white dark:bg-stone-900 shadow-sm transition-all hover:shadow-md">
              <Card
                url={url}
                name={name}
                type={type}
                size={size}
                extension={extension}
              />
              <div className="w-full h-full flex flex-col gap-2 mb-auto">
                <div className="flex flex-col gap-1">
                  <Fieldset>
                    <FieldsetInput
                      id="name-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <FieldsetLabel
                      id="name-label"
                      label="name"
                      htmlFor="name-input"
                    />
                  </Fieldset>
                </div>
                <div className="flex flex-col gap-1">
                  <Fieldset>
                    <FieldsetInput
                      id="caption-input"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                    <FieldsetLabel
                      id="caption-label"
                      label="Caption"
                      htmlFor="caption-input"
                    />
                  </Fieldset>
                  <p className="pl-1 text-xs text-neutral-400 dark:text-neutral-500">
                    A legenda da imagem.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <Fieldset>
                    <FieldsetInput
                      id="alt-input"
                      value={alt}
                      onChange={(e) => setAlt(e.target.value)}
                    />
                    <FieldsetLabel
                      id="alt-label"
                      label="Alt"
                      htmlFor="alt-input"
                    />
                  </Fieldset>
                  <p className="pl-1 text-xs text-neutral-400 dark:text-neutral-500">
                    O texto que será exibido caso o link da imagem não funcione.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <FolderSelectBuilder
                    currentFolder={currentFolder}
                    selectedFolder={folder}
                    setSelectedFolder={setFolder}
                  />
                  <p className="pl-1 text-xs text-neutral-400 dark:text-neutral-500">
                    A pasta onde o arquivo será salvo.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-full max-w-30 h-8">
              Cancelar
            </AlertDialogCancel>
            <EditMediaAction isPending={isPending} />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const Card = ({
  url,
  name,
  type,
  size,
  extension,
}: {
  url: string;
  name: string;
  type: string;
  size: number;
  extension: string;
}) => (
  <article className="w-full max-w-100 h-65 flex flex-col shrink-0 items-center overflow-hidden transition-border duration-300 rounded-lg border not-dark:shadow bg-stone-200 dark:bg-stone-900 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-stone-300 dark:has-data-[state=checked]:bg-stone-850 focus-within:border-primary dark:focus-within:border-primary dark:focus-within:bg-stone-850 group">
    <div className="w-full h-full grid grid-rows-[1fr_calc(28px+24px+4px+16px+1px)]">
      <div className="relative">
        <div className="relative w-full h-full overflow-hidden">
          <DashedBackground />
          <Image
            src={url}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="absolute object-contain p-px"
          />
        </div>
        <div className="absolute top-2 right-2 flex items-center gap-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-has-data-[state=checked]:opacity-100">
          {/* <ExcludeButton /> */}
        </div>
      </div>
      <div className="w-full flex justify-between items-center gap-2 p-2 border-t">
        <div className="w-full h-full flex flex-col justify-start gap-1">
          <span className="h-7 flex-1 text-xs leading-3.5 line-clamp-2 mb-auto mt-0 text-neutral-900 dark:text-neutral-100">
            {name}
          </span>
          <div className="flex justify-between items-center gap-1">
            <span className="text-xs font-bold text-neutral-500">
              {extension.toUpperCase()}
              {" - "}
              {(size / 1024 / 1024).toFixed(2) + " MB"}
            </span>
            <span className="text-xs px-2 py-1 rounded font-bold transition-[colors,background-color] duration-300 dark:text-neutral-500 dark:bg-stone-800 dark:group-has-data-[state=checked]:bg-stone-750">
              {type}
            </span>
          </div>
        </div>
      </div>
    </div>
  </article>
);

const EditMediaAction = ({ isPending }: { isPending: boolean }) => {
  return (
    <Button
      type="submit"
      variant="default"
      disabled={isPending}
      className="w-full max-w-30 h-8"
    >
      {isPending && <Spinner />} Salvar
    </Button>
  );
};
