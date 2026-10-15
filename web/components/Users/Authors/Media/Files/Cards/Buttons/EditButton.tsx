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
} from "../../../../../../AlertDialog";
import Spinner from "../../../../../../Spinner";
import editFile from "../../../../../../../services/media/editFile";
import {
  sonnerToastPromise,
  sonnerPromise,
} from "../../../../../../../utils/sonner";
import {
  Fieldset,
  FieldsetError,
  FieldsetInput,
  FieldsetLabel,
} from "../../../../../../Fieldset";
import { Button } from "../../../../../../Button";
import { validateFile } from "../../../../../../../utils/zod-file-validations";
import FolderPopover from "../../../FolderPopover";
import { DashedBackground } from "../../../../../../DashedBackground";
import Image from "next/image";
import {
  cn,
  focusRing,
  linkVariants,
} from "../../../../../../../utils/variants";
import { EditIcon } from "../../../../../../Icons";

const defaultState: ActionState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

function isStringOrErrorMap(
  error: unknown,
): error is string | ActionStateError {
  // 1. Checks if it is a string
  if (typeof error === "string") {
    return true;
  }

  // 2. Checks if it is not an object or it is null
  if (typeof error !== "object" || error === null) {
    return false;
  }

  // 3. Checks if it respects the following format { errors: string[] }
  const record = error as Record<string, unknown>;

  for (const key of Object.keys(record)) {
    const value = record[key];

    // 3.1. Checks if it is not a valid object
    if (typeof value !== "object" || value === null || !("errors" in value)) {
      return false;
    }

    const innerValue = value as Record<string, unknown>;

    // 3.2. Checks if it is an array of strings
    if (
      !Array.isArray(innerValue.errors) ||
      !innerValue.errors.every((item) => typeof item === "string")
    ) {
      return false;
    }
  }

  return true;
}

export default function EditButton(media: Media) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(media.name);
  const [alt, setAlt] = React.useState(media.alt);
  const [caption, setCaption] = React.useState(media.caption);
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
        const error = serverResponse.error;
        if (isStringOrErrorMap(error)) {
          if (typeof error === "string") {
            return <p>{serverResponse.error}</p>;
          } else {
            return (
              <ul>
                {Object.values(serverResponse.error as ActionStateError).map(
                  (x) => x.errors.map((y, i) => <li key={`${y}-${i}`}>{y}</li>),
                )}
              </ul>
            );
          }
        }
        return <p>Ocorreu um erro ao tentar salvar o artigo</p>;
      };

      const validation = validateFile(formData);
      if (!validation.ok) return validation;

      const result = editFile(prevState, formData);
      const promise = sonnerPromise(result);
      sonnerToastPromise(promise, success, error, "Alterando arquivo...");
      return result;
    },
    defaultState,
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
              url={media.url}
              name={media.name}
              type={media.type}
              size={media.size}
              extension={media.extension}
              width={media.width}
              height={media.height}
            />
            <div className="w-full h-full flex flex-col gap-2 mb-auto">
              <FieldsetHiddenInputs {...{ id: media.id, size: media.size }} />
              <FieldsetWrapper>
                <FieldsetNameInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={state?.error?.customName}
                />
              </FieldsetWrapper>
              <FieldsetWrapper>
                <FieldsetCaptionInput
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  error={state?.error?.customCaption}
                />
              </FieldsetWrapper>
              <FieldsetWrapper>
                <FieldsetAltInput
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  error={state?.error?.customAlt}
                />
              </FieldsetWrapper>
              <FieldsetWrapper>
                <FolderPopover
                  name="file_0_folder_id"
                  defaultValue={media.folder.id}
                  movingFolderIds={[media.folder.id]}
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
            <AlertDialogCancel
              variant="outline"
              className="w-full max-w-30 h-8"
            >
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
  error,
  ...props
}: FieldsetInputProps & {
  error?: { errors: string[] };
}) => (
  <>
    <Fieldset>
      <FieldsetInput
        id="file_0_name"
        name="file_0_name"
        error={!!error?.errors}
        {...props}
      />
      <FieldsetLabel id="name-label" label="name" htmlFor="file_0_name" />
    </Fieldset>
    {error && <FieldsetError error={error?.errors} />}
  </>
);

const FieldsetCaptionInput = ({
  error,
  ...props
}: FieldsetInputProps & {
  error?: { errors: string[] };
}) => (
  <>
    <Fieldset>
      <FieldsetInput
        id="file_0_caption"
        name="file_0_caption"
        error={!!error?.errors}
        {...props}
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
  error,
  ...props
}: FieldsetInputProps & {
  error?: { errors: string[] };
}) => (
  <>
    <Fieldset>
      <FieldsetInput
        id="file_0_alt"
        name="file_0_alt"
        error={!!error?.errors}
        {...props}
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
    <button
      className={cn(
        linkVariants(),
        "cursor-pointer size-8 border rounded text-sm inline-flex items-center justify-center whitespace-nowrap transition-all duration-300 shrink-0 outline-none select-none px-2.5 not-dark:shadow [&_svg]:shrink-0 [&_svg]:pointer-events-none [&_svg]:size-4 text-neutral-900 dark:text-neutral-100 bg-stone-100 dark:bg-stone-900",
        focusRing,
      )}
    >
      <EditIcon />
    </button>
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
