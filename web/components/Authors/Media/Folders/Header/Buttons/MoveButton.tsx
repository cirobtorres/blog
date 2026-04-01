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
import {
  sonnerToastPromise,
  soonerPromise,
} from "../../../../../../utils/sooner";
import { Button } from "../../../../../Button";
import moveFolders from "../../../../../../services/media/moveFolders";
import FolderPopover from "../../../FolderPopover";

export default function MoveButton({
  folders,
  disabled,
}: {
  folders: Folder[];
  disabled?: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <FoldersMoveTrigger disabled={disabled} />
      <AlertDialogContent asChild>
        <form className="max-w-sm">
          <AlertDialogHeader>Mover pasta</AlertDialogHeader>
          <AlertDialogDescription asChild className="p-4">
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col gap-2 p-2 rounded border dark:border-stone-800 dark:bg-stone-900">
                <p className="text-sm text-neutral-600 dark:text-neutral-500">
                  {folders.length === 1 ? (
                    "Mover a pasta?"
                  ) : (
                    <>
                      Mover estas{" "}
                      <strong className="text-neutral-900 dark:text-neutral-100">
                        {folders.length}
                      </strong>{" "}
                      pastas?
                    </>
                  )}
                </p>
                <ul className="max-h-20 flex flex-wrap gap-x-3 overflow-y-scroll scrollbar">
                  {folders.map((folder) => (
                    <li
                      key={folder.id}
                      className="text-xs text-neutral-900 dark:text-neutral-100"
                    >
                      {folder.name}
                    </li>
                  ))}
                </ul>
              </div>
              <FolderPopover
                movingFolderPaths={folders.map((folder) => folder.path)}
              />
            </div>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-full max-w-30 h-8">
              Cancelar
            </AlertDialogCancel>
            <MoveFoldersAction
              folders={folders}
              onSuccess={() => setIsOpen(false)}
            />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const MoveFoldersAction = ({
  folders,
  onSuccess,
}: {
  folders: Folder[];
  onSuccess: () => void;
}) => {
  const [, action, isPending] = React.useActionState(
    async (prevState: ActionState, formData: FormData) => {
      const success = (serverResponse: ActionState) => {
        onSuccess();
        return (
          <div className="flex flex-col">
            <p>{serverResponse.success}</p>
          </div>
        );
      };

      const error = (serverResponse: ActionState) => {
        return <p>{serverResponse.error}</p>;
      };

      folders.map((folder, index) =>
        formData.set("folder-id-" + index, folder.id),
      );

      const result = moveFolders(prevState, formData);
      const promise = soonerPromise(result);
      sonnerToastPromise(promise, success, error, "Editando arquivos...");

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
    <Button
      type="submit"
      variant="default"
      disabled={isPending}
      formAction={action}
      className="h-8 w-full max-w-30"
    >
      Mover
    </Button>
  );
};

const FoldersMoveTrigger = ({ disabled }: { disabled?: boolean }) => {
  return (
    <AlertDialogTrigger asChild>
      <Button
        type="submit"
        variant="link"
        disabled={disabled ?? true}
        className="h-8 w-full max-w-30"
      >
        Mover
      </Button>
    </AlertDialogTrigger>
  );
};
