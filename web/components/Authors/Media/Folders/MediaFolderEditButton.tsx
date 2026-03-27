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
} from "../../../AlertDialog";
import { Button } from "../../../Button";
import { Fieldset, FieldsetInput, FieldsetLabel } from "../../../Fieldset";
import { SelectFolder } from "../../SelectFolder";
import Spinner from "../../../Spinner";
import { sonnerToastPromise, soonerPromise } from "../../../../utils/sooner";
import editFolder from "../../../../services/cloudinary/editFolder";

export default function MediaFolderEditButton({ folder }: { folder: string }) {
  const [folderName, setFolderName] = React.useState(folder.slice(1));

  const [state, action, isPending] = React.useActionState(
    async (prevState: ActionState, formData: FormData) => {
      console.log(...formData.entries());

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

      const result = editFolder(prevState, formData);
      const promise = soonerPromise(result);
      sonnerToastPromise(promise, success, error, "Alterando arquivo...");

      return result;
    },
    {
      ok: false,
      success: null,
      error: null,
      data: null,
    } as ActionState,
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
      <AlertDialogContent className="max-w-md">
        <form action={action}>
          <AlertDialogHeader>Editar Arquivo</AlertDialogHeader>
          <AlertDialogDescription className="sr-only">
            Aqui você pode editar seu arquivo.
          </AlertDialogDescription>
          <div className="flex flex-1 flex-col gap-2 p-4">
            <div className="flex flex-1 justify-between items-center gap-2 p-4 rounded border dark:border-stone-800 dark:bg-stone-900">
              <div className="flex flex-1 flex-col justify-start items-start gap-1">
                <span className="text-xs text-neutral-400 dark:text-neutral-500">
                  {folder}
                </span>
                <span className="text-xs">0 pastas, 0 arquivos</span>
              </div>
              <div className="flex flex-1 flex-col justify-start items-start gap-1">
                <span className="text-xs text-neutral-400 dark:text-neutral-500">
                  Criado em:
                </span>
                <span className="text-xs">26-03-2026</span>
              </div>
            </div>
            <div className="grid grid-cols-1 justify-center items-center gap-2">
              <Fieldset>
                <FieldsetInput
                  id="folderName"
                  name="folderName"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                />
                <FieldsetLabel label="Nome" htmlFor="folderName" />
              </Fieldset>
              <SelectFolder />
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
