"use client";

import React from "react";
import { AlertDialog, AlertDialogTrigger } from "../../../../AlertDialog";
import { sonnerToastPromise, soonerPromise } from "../../../../../utils/sooner";
import { convertToLargeDate } from "../../../../../utils/date";
import { createFilesOnDb } from "../../../../../services/media/createFilesOnDb";
import { Button } from "../../../../Button";
import DialogEmptyContent from "./DialogEmptyContent";
import DialogCardsContent from "./DialogCardsContent";
import createFile from "../../../../../services/cloudinary/createFile";
import validateFiles from "../../../../../utils/zod-shared-schemas";

const initialState: ActionState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default function AddFilesButton() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [openStep, setOpenStep] = React.useState<"upload" | "preview" | null>(
    null,
  );

  const [state, action, isPending] = React.useActionState(
    async (prevState: ActionState, formData: FormData) => {
      if (formData.get("_action") === "reset") {
        return initialState;
      }

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

      const validation = validateFiles(formData, files.length);

      if (!validation.ok) return validation;

      const uploadLogic = async () => {
        const uploadPromises = files.map((file, index) =>
          createFile(file, validation.data[index]),
        );
        const cloudinaryResults = await Promise.all(uploadPromises);
        return await createFilesOnDb(cloudinaryResults);
      };

      const result = uploadLogic();
      const promise = soonerPromise(result);
      sonnerToastPromise(promise, success, error, "Salvando arquivos...");

      return result;
    },
    initialState,
  );

  const handleReset = () => {
    const formData = new FormData();
    formData.append("_action", "reset");
    React.startTransition(() => {
      action(formData);
    }); // Triggers action only to reset to its initialState
    setOpenStep(null);
    setFiles([]);
  };

  const addFiles = (newFiles: FileList | File[] | null) => {
    if (newFiles) {
      const fileArray = Array.from(newFiles);
      setFiles((prev) => [...prev, ...fileArray]);
      setOpenStep("preview");
    }
  };

  const contentProps = {
    files,
    setFiles,
    state,
    action,
    isPending,
    openStep,
    setOpenStep,
    handleReset,
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
      <DialogCardsContent {...contentProps} />
    </AlertDialog>
  );
}

function Trigger({
  setOpenStep,
}: {
  setOpenStep: (value: "upload" | "preview" | null) => void;
}) {
  return (
    <AlertDialogTrigger asChild>
      <Button
        className="w-full max-w-44 h-8"
        onClick={() => setOpenStep("upload")}
      >
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
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        Adicionar arquivos
      </Button>
    </AlertDialogTrigger>
  );
}
