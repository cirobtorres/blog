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
import MediaFileEditCard from "../MediaFileEditCard";
import { validateFile } from "../../../../../../utils/zod-shared-schemas";
import FolderPopover from "../../../FolderPopover";

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
      <EditMediaTrigger />
      <AlertDialogContent>
        <form action={action}>
          <AlertDialogHeader>Editar Arquivo</AlertDialogHeader>
          <AlertDialogDescription className="sr-only">
            Aqui você pode editar seu arquivo.
          </AlertDialogDescription>
          <div className="p-4">
            <div className="relative group flex items-center gap-3 p-3 rounded-2xl border not-dark:shadow-sm transition-all bg-white dark:bg-stone-900">
              <MediaFileEditCard
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
                  id={`file_0_id`}
                  type="hidden"
                  name={`file_0_id`}
                  value={id}
                />
                <div className="flex flex-col gap-1">
                  <Fieldset>
                    <FieldsetInput
                      id={`file_0_name`}
                      name={`file_0_name`}
                      defaultValue={name}
                      error={state?.error?.customName?.errors}
                    />
                    <FieldsetLabel
                      id="name-label"
                      label="name"
                      htmlFor={`file_0_name`}
                    />
                  </Fieldset>
                  {state?.error?.customName && (
                    <FieldsetError error={state?.error?.customName?.errors} />
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Fieldset>
                    <FieldsetInput
                      id={`file_0_caption`}
                      name={`file_0_caption`}
                      defaultValue={caption}
                      error={state?.error?.customCaption?.errors}
                    />
                    <FieldsetLabel
                      id="caption-label"
                      label="Caption"
                      htmlFor={`file_0_caption`}
                    />
                  </Fieldset>
                  {state?.error?.customCaption && (
                    <FieldsetError
                      error={state?.error?.customCaption?.errors}
                    />
                  )}
                  <p className="pl-1 text-xs text-neutral-400 dark:text-neutral-500">
                    A legenda da imagem.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <Fieldset>
                    <FieldsetInput
                      id={`file_0_alt`}
                      name={`file_0_alt`}
                      defaultValue={alt}
                      error={state?.error?.customAlt?.errors}
                    />
                    <FieldsetLabel
                      id="alt-label"
                      label="Alt"
                      htmlFor={`file_0_alt`}
                    />
                  </Fieldset>
                  {state?.error?.customAlt && (
                    <FieldsetError error={state?.error?.customAlt?.errors} />
                  )}
                  <p className="pl-1 text-xs text-neutral-400 dark:text-neutral-500">
                    O texto que será exibido caso o link da imagem não funcione.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <FolderPopover
                    name={`file_0_folder`}
                    defaultValue={folder.path}
                    currentEditingPath={folder.path}
                  />
                  {state?.error?.customFolder && (
                    <FieldsetError error={state?.error?.customFolder?.errors} />
                  )}
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

const EditMediaTrigger = () => (
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
