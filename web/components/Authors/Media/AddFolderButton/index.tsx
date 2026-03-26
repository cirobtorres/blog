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
import {
  Fieldset,
  FieldsetError,
  FieldsetInput,
  FieldsetLabel,
} from "../../../Fieldset";
import Spinner from "../../../Spinner";
import createFolder, {
  createFolderValidation,
} from "../../../../services/cloudinary/createFolder";
import { sonnerToastPromise } from "../../../../utils/sooner";
import { FolderSelectBuilder } from "../../FolderSelectBuilder";

export function AddFolderButton() {
  const [folderName, setFolderName] = React.useState("");
  const [state, action, isPending] = React.useActionState(
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

      const validation = await createFolderValidation(prevState, formData);

      if (!validation.ok || !validation.data) return validation;

      const newFormData = new FormData();
      newFormData.set("path", validation?.data);

      const result = createFolder(prevState, newFormData);

      const promise: Promise<ActionState> = new Promise((resolve, reject) => {
        result.then((data) => {
          if (data.ok) resolve(result);
          else reject(result);
        });
      });

      sonnerToastPromise(promise, success, error, "Salvando pasta...");

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
        <Button variant="link" className="w-full max-w-44 h-8">
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
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Criar pasta
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent asChild className="max-w-lg">
        <form action={action}>
          <AlertDialogHeader>Criar pasta</AlertDialogHeader>
          <AlertDialogDescription className="sr-only">
            Área de criação de pastas. Você pode criar pastas na raiz, em Home,
            ou até mesmo criar pastas dentro de outras pastas, para melhor
            organização dos seus arquivos de media.
          </AlertDialogDescription>
          <div className="flex flex-col gap-2 p-4">
            <div className="flex flex-col">
              <Fieldset className="flex-1">
                <FieldsetInput
                  id="folderName"
                  name="folderName"
                  value={folderName}
                  error={state.error?.folderName?.errors}
                  onChange={(e) => setFolderName(e.currentTarget.value)}
                />
                <FieldsetLabel
                  htmlFor="folderName"
                  label="Diretório"
                  error={state.error?.folderName?.errors}
                />
              </Fieldset>
              <FieldsetError
                error={state.error?.folderName?.errors}
                className="px-1"
              />
            </div>
            <FolderSelectBuilder />
          </div>
          <FieldsetError />
          <AlertDialogFooter>
            <AlertDialogCancel className="w-full max-w-30 h-8">
              Cancelar
            </AlertDialogCancel>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full max-w-30 h-8"
            >
              {isPending && <Spinner />} Salvar
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
