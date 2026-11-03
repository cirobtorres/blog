"use client";

import React from "react";
import { AlertDialog, AlertDialogTrigger } from "../../../../../AlertDialog";
import {
  sonnerToastPromise,
  sonnerPromise,
} from "../../../../../../utils/sonner";
import { convertToLargeDate } from "../../../../../../utils/date";
import { createFilesOnDb } from "../../../../../../services/media/createFilesOnDb";
import { Button } from "../../../../../Button";
import DialogEmptyContent from "./DialogEmptyContent";
import DialogCardsContent from "./DialogCardsContent";
import {
  mediaUploader,
  createMediaKey,
  MediaAlreadyExistsError,
} from "../../../../../../services/storage";
import findNameConflicts from "../../../../../../services/media/findNameConflicts";
import validateFiles from "../../../../../../utils/zod-file-validations";

const defaultState: ActionState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default function AddFilesButton() {
  const [files, setFiles] = React.useState<{ id: string; file: File }[]>([]);
  const [openStep, setOpenStep] = React.useState<"upload" | "preview" | null>(
    null,
  );

  const [state, action, isPending] = React.useActionState(
    async (prevState: ActionState, formData: FormData) => {
      if (formData.get("_action") === "reset") {
        return defaultState;
      }

      const success = (serverResponse: ActionState) => {
        const now = convertToLargeDate(new Date());

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

      const uploadLogic = async (): Promise<ActionState> => {
        try {
          // Names are unique (ignoring case) and the storage key no longer depends on them,
          // so check them BEFORE uploading anything
          const conflicts = (
            await findNameConflicts(
              validation.data.map((d: { customName: string }) => d.customName),
            )
          ).map((name) => name.toLowerCase());

          if (conflicts.length > 0) {
            const nameErrors: Record<string, unknown[]> = {};
            validation.data.forEach(
              (d: { customName: string; fileId: string }) => {
                if (conflicts.includes(d.customName.toLowerCase())) {
                  nameErrors[d.fileId] = [
                    {
                      code: "custom",
                      message: "Já existe um arquivo com esse nome",
                      path: ["customName"],
                    },
                  ];
                }
              },
            );
            return { ...defaultState, error: nameErrors };
          }

          const uploads: UploadedMedia[] = await Promise.all(
            files.map(async (file, index) => {
              const metadata = validation.data[index];
              const object = await mediaUploader.upload(file.file, {
                key: createMediaKey(),
              });
              return {
                object,
                name: metadata.customName,
                alt: metadata.customAlt,
                caption: metadata.customCaption,
                folderId: metadata.customFolderId ?? null,
              };
            }),
          );
          return await createFilesOnDb(uploads);
        } catch (e) {
          if (e instanceof MediaAlreadyExistsError) {
            return { ...defaultState, error: e.message };
          }
          throw e;
        }
      };

      const result = uploadLogic();
      const promise = sonnerPromise(result);
      sonnerToastPromise(promise, success, error, "Salvando arquivos...");

      return result;
    },
    defaultState,
  );

  const handleReset = () => {
    const formData = new FormData();
    formData.append("_action", "reset");
    React.startTransition(() => {
      action(formData);
    }); // Triggers action only to reset to its defaultState
    setOpenStep(null);
    setFiles([]);
  };

  const addFiles = (newFiles: FileList | File[] | null) => {
    if (newFiles) {
      const fileArray = Array.from(newFiles).map((file) => ({
        id: crypto.randomUUID(),
        file,
      }));
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
