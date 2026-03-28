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
  AlertDialogTrigger,
} from "../../../../../AlertDialog";
import Spinner from "../../../../../Spinner";
import editFile from "../../../../../../services/media/editFile";
import { DashedBackground } from "../../../../../DashedBackground";
import {
  sonnerToastPromise,
  soonerPromise,
} from "../../../../../../utils/sooner";
import {
  Fieldset,
  FieldsetInput,
  FieldsetLabel,
} from "../../../../../Fieldset";
import { Button } from "../../../../../Button";
import { SelectFolder } from "../../../../SelectFolder";

export default function EditButton({
  id,
  url,
  name,
  type,
  size,
  extension,
  folder,
  alt,
  caption,
  width,
  height,
  // publicId,
}: Media) {
  const [, action, isPending] = React.useActionState(
    async (prevState: ActionState, formData: FormData) => {
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

      const result = editFile(prevState, formData);
      const promise = soonerPromise(result);
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
          <AlertDialogHeader>Editar Arquivo</AlertDialogHeader>
          <AlertDialogDescription className="sr-only">
            Aqui você pode editar seu arquivo.
          </AlertDialogDescription>
          <div className="p-4">
            <div className="relative group flex items-center gap-3 p-3 rounded-2xl border not-dark:shadow-sm transition-all bg-white dark:bg-stone-900">
              <Card
                url={url}
                name={name}
                type={type}
                size={size}
                extension={extension}
                width={width}
                height={height}
              />
              <div className="w-full h-full flex flex-col gap-2 mb-auto">
                <input
                  hidden
                  id="file-id"
                  type="hidden"
                  name="fileId"
                  value={id}
                />
                <div className="flex flex-col gap-1">
                  <Fieldset>
                    <FieldsetInput
                      id="name-input"
                      name="fileName"
                      defaultValue={name}
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
                      name="fileCaption"
                      defaultValue={caption}
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
                      name="fileAlt"
                      defaultValue={alt}
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
                  <SelectFolder defaultValue={folder.path} />
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
  width,
  height,
}: {
  url: string;
  name: string;
  type: string;
  size: number;
  extension: string;
  width: number;
  height: number;
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
              {type === "IMAGE" && " - " + width + "x" + height}
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
