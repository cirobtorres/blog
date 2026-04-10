"use client";

import React from "react";
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
import {
  sonnerToastPromise,
  soonerPromise,
} from "../../../../../../utils/sooner";
import {
  Fieldset,
  FieldsetError,
  FieldsetInput,
  FieldsetLabel,
} from "../../../../../Fieldset";
import { Button } from "../../../../../Button";
import { validateFile } from "../../../../../../utils/zod-file-validations";
import FolderPopover from "../../../FolderPopover";
import { DashedBackground } from "../../../../../DashedBackground";
import Image from "next/image";

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
}: Media) {
  const [open, setOpen] = React.useState(false);

  const [state, action, isPending] = React.useActionState(
    async (prevState: ActionState, formData: FormData) => {
      const success = (serverResponse: ActionState) => {
        if (serverResponse.ok) {
          setOpen(false);
        }
        return (
          <div className="flex flex-col">
            <p>{serverResponse.success}</p>
          </div>
        );
      };

      const error = (serverResponse: ActionState) => {
        return <p>{serverResponse.error}</p>;
      };

      const validation = validateFile(formData);
      if (!validation.ok) return validation;

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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <FileCardEditTrigger />
      <AlertDialogContent>
        <form action={action}>
          <AlertDialogHeader>Editar Arquivo</AlertDialogHeader>
          <AlertDialogDescription className="sr-only">
            Aqui você pode editar seu arquivo.
          </AlertDialogDescription>
          <FieldsetsWrapper>
            <FileCardEdit
              url={url}
              name={name}
              type={type}
              size={size}
              extension={extension}
              width={width}
              height={height}
            />
            <div className="w-full h-full flex flex-col gap-2 mb-auto">
              <FieldsetHiddenInputs {...{ id, size }} />
              <FieldsetWrapper>
                <FieldsetNameInput
                  defaultValue={name}
                  error={state?.error?.customName}
                />
              </FieldsetWrapper>
              <FieldsetWrapper>
                <FieldsetCaptionInput
                  defaultValue={caption}
                  error={state?.error?.customCaption}
                />
              </FieldsetWrapper>
              <FieldsetWrapper>
                <FieldsetAltInput
                  defaultValue={alt}
                  error={state?.error?.customAlt}
                />
              </FieldsetWrapper>
              <FieldsetWrapper>
                <FolderPopover
                  name="file_0_folder_id"
                  defaultValue={folder.id}
                  movingFolderIds={[folder.id]}
                />
                {state?.error?.customFolderId && (
                  <FieldsetError error={state?.error?.customFolderId?.errors} />
                )}
                <p className="pl-1 text-xs text-neutral-400 dark:text-neutral-500">
                  A pasta onde o arquivo será salvo.
                </p>
              </FieldsetWrapper>
            </div>
          </FieldsetsWrapper>
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

const FieldsetHiddenInputs = ({ ...props }: { id: string; size: number }) => {
  return (
    <>
      <input
        hidden
        id="file_0_size"
        type="hidden"
        value={props.size}
        name="file_0_size"
        className="appearance-none invisible"
      />
      <input
        hidden
        id="file_0_id"
        type="hidden"
        name="file_0_id"
        value={props.id}
      />
    </>
  );
};

const FieldsetNameInput = ({
  defaultValue,
  error,
}: {
  defaultValue?: string;
  error?: { errors: string[] };
}) => (
  <>
    <Fieldset>
      <FieldsetInput
        id="file_0_name"
        name="file_0_name"
        defaultValue={defaultValue}
        error={!!error?.errors}
      />
      <FieldsetLabel id="name-label" label="name" htmlFor="file_0_name" />
    </Fieldset>
    {error && <FieldsetError error={error?.errors} />}
  </>
);

const FieldsetCaptionInput = ({
  defaultValue,
  error,
}: {
  defaultValue?: string;
  error?: { errors: string[] };
}) => (
  <>
    <Fieldset>
      <FieldsetInput
        id="file_0_caption"
        name="file_0_caption"
        defaultValue={defaultValue}
        error={!!error?.errors}
      />
      <FieldsetLabel
        id="caption-label"
        label="Caption"
        htmlFor="file_0_caption"
      />
    </Fieldset>
    {error && <FieldsetError error={error?.errors} />}
    <p className="pl-1 text-xs text-neutral-400 dark:text-neutral-500">
      A legenda da imagem.
    </p>
  </>
);

const FieldsetAltInput = ({
  defaultValue,
  error,
}: {
  defaultValue?: string;
  error?: { errors: string[] };
}) => (
  <>
    <Fieldset>
      <FieldsetInput
        id="file_0_alt"
        name="file_0_alt"
        defaultValue={defaultValue}
        error={!!error?.errors}
      />
      <FieldsetLabel id="alt-label" label="Alt" htmlFor="file_0_alt" />
    </Fieldset>
    {error && <FieldsetError error={error?.errors} />}
    <p className="pl-1 text-xs text-neutral-400 dark:text-neutral-500">
      O texto que será exibido caso o link da imagem não funcione.
    </p>
  </>
);

const FieldsetsWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4">
    <div className="relative group flex items-center gap-3 p-3 rounded-2xl border not-dark:shadow-sm transition-all bg-white dark:bg-stone-900">
      {children}
    </div>
  </div>
);

const FieldsetWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-1">{children}</div>
);

const FileCardEditTrigger = () => (
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

function FileCardEdit({
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
}) {
  return (
    <article className="w-full max-w-100 h-65 flex flex-col shrink-0 items-center overflow-hidden transition-border duration-300 mt-0 mb-auto rounded-lg border not-dark:shadow bg-stone-200 dark:bg-stone-900 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-stone-300 dark:has-data-[state=checked]:bg-stone-850 focus-within:border-primary dark:focus-within:border-primary dark:focus-within:bg-stone-850 group">
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
          {/* <div className="absolute top-2 right-2 flex items-center gap-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-has-data-[state=checked]:opacity-100">
            <ExcludeButton />
          </div> */}
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
}
