"use client";

import React from "react";
import { AlertDialog } from "../../../../AlertDialog";
import { sonnerToastPromise, soonerPromise } from "../../../../../utils/sooner";
import { convertToLargeDate } from "../../../../../utils/date";
import { Trigger } from "./Dialog";
import createFiles from "../../../../../services/cloudinary/createFiles";
import DialogEmptyContent from "./DialogEmptyContent";
import DialogCardsContent from "./DialogCardsContent";

export function AddFilesButton() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [openStep, setOpenStep] = React.useState<"upload" | "preview" | null>(
    null,
  );
  // TODO: Fazer uso do state
  const [state, action, isPending] = React.useActionState(
    async (prevState: ActionState, formData: FormData) => {
      const success = (serverResponse: ActionState) => {
        const dateSource = Array.isArray(serverResponse.data)
          ? serverResponse.data[0]?.created_at
          : new Date();

        const now = convertToLargeDate(new Date(dateSource));

        setOpenStep(null);
        setFiles([]);

        return (
          <div className="flex flex-col">
            <p>{serverResponse.success}</p>
            <p className="text-xs text-neutral-500">{now}</p>
          </div>
        );
      };

      const error = (serverResponse: ActionState) => {
        return <p>{serverResponse.error}</p>;
      };

      const result = createFiles({ files, formData });
      const promise = soonerPromise(result);
      sonnerToastPromise(promise, success, error, "Salvando arquivos...");

      return result;
    },
    {
      ok: false,
      success: null,
      error: null,
      data: null,
    } as ActionState,
  );

  const addFiles = (newFiles: FileList | null) => {
    if (newFiles) {
      const fileArray = Array.from(newFiles);
      setFiles((prev) => [...prev, ...fileArray]);
      setOpenStep("preview");
    }
  };

  return (
    <AlertDialog
      open={!!openStep}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setOpenStep(null);
          setFiles([]);
        }
      }}
    >
      <Trigger setOpenStep={setOpenStep} />
      <DialogEmptyContent openStep={openStep} addFiles={addFiles} />
      <DialogCardsContent
        openStep={openStep}
        setOpenStep={setOpenStep}
        files={files}
        setFiles={setFiles}
        action={action}
        isPending={isPending}
      />
    </AlertDialog>
  );
}
