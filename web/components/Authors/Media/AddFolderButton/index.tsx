"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../AlertDialog";
import { Button } from "../../../Button";
import {
  Fieldset,
  FieldsetError,
  FieldsetInput,
  FieldsetLabel,
} from "../../../Fieldset";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../Select";
import Spinner from "../../../Spinner";
import createFolder, {
  createFolderValidation,
} from "../../../../services/cloudinary/createFolder";
import { sonnerToastPromise } from "../../../../utils/sooner";

export function AddFolderButton({
  existingFolders,
}: {
  existingFolders: string[];
}) {
  const [folderName, setFolderName] = React.useState("");
  const [folderParent, setFolderParent] = React.useState("Home");
  const [state, action, isPending] = React.useActionState(
    async (prevState: ActionState) => {
      const formData = new FormData();
      formData.set("folderName", folderName);
      formData.set("folderParent", folderParent);

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

  React.useEffect(() => {
    if (state.ok) {
      setFolderName("");
      setFolderParent("Home");
    }
  }, [state]);

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
      <AlertDialogContent className="max-w-lg">
        <form action={action}>
          <AlertDialogHeader>
            <AlertDialogTitle>Criar pasta</AlertDialogTitle>
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
            Área de criação de pastas. Você pode criar pastas na raiz, em Home,
            ou até mesmo criar pastas dentro de outras pastas, para melhor
            organização dos seus arquivos de media.
          </AlertDialogDescription>
          <div className="flex flex-col gap-2 p-4">
            <div className="flex flex-col">
              <Fieldset className="flex-1">
                <FieldsetInput
                  id="folder-name"
                  value={folderName}
                  error={state.error?.folderName?.errors}
                  onChange={(e) => setFolderName(e.currentTarget.value)}
                />
                <FieldsetLabel
                  htmlFor="folder-name"
                  label="Diretório"
                  error={state.error?.folderName?.errors}
                />
              </Fieldset>
              <FieldsetError
                error={state.error?.folderName?.errors}
                className="px-1"
              />
            </div>
            <Select value={folderParent} onValueChange={setFolderParent}>
              <SelectTrigger className="w-full flex-1">
                <SelectValue placeholder="Home" />
              </SelectTrigger>
              <SelectContent position="popper">
                {!existingFolders.includes("Home") && (
                  <SelectItem value="Home">Home</SelectItem>
                )}
                {existingFolders.map((folder) => (
                  <SelectItem key={folder} value={folder}>
                    {folder}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
