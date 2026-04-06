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
import moveFiles from "../../../../../../services/media/moveFiles";
import FolderPopover from "../../../FolderPopover";

export default function MoveButton({
  files,
  disabled,
}: {
  files: Media[];
  disabled?: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <FilesMoveTrigger disabled={disabled} />
      <AlertDialogContent asChild>
        <form className="max-w-sm">
          <AlertDialogHeader>Mover pasta</AlertDialogHeader>
          <AlertDialogDescription asChild className="p-4">
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col gap-2 p-2 rounded border dark:border-stone-800 dark:bg-stone-900">
                <p className="text-sm text-neutral-600 dark:text-neutral-500">
                  {files.length === 1 ? (
                    "Mover o arquivo?"
                  ) : (
                    <>
                      Mover estes{" "}
                      <strong className="text-neutral-900 dark:text-neutral-100">
                        {files.length}
                      </strong>{" "}
                      arquivos?
                    </>
                  )}
                </p>
                <ul className="max-h-20 flex flex-wrap gap-x-3 overflow-y-scroll scrollbar">
                  {files.map((folder) => (
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
                movingFolderPaths={files.map((file) => file.folder.path)}
              />
            </div>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-full max-w-30 h-8">
              Cancelar
            </AlertDialogCancel>
            <MoveFilesAction files={files} onSuccess={() => setIsOpen(false)} />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const MoveFilesAction = ({
  files,
  onSuccess,
}: {
  files: Media[];
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

      files.map((file, index) => formData.set("file-id-" + index, file.id));

      const result = moveFiles(prevState, formData);
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

const FilesMoveTrigger = ({ disabled }: { disabled?: boolean }) => {
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
