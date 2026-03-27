"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
} from "../../../../AlertDialog";
import { sonnerToastPromise, soonerPromise } from "../../../../../utils/sooner";
import { convertToLargeDate } from "../../../../../utils/date";
import FilePreviewCard from "./FilePreviewCard";
import { fullUploadFlow } from "../../../../../services/cloudinary/fileUpload";
import UploadContent from "./UploadContent";
import { Trigger, Footer, Header } from "./Dialog";

export function AddFilesButton() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [openStep, setOpenStep] = React.useState<"upload" | "preview" | null>(
    null,
  );
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

      const result = fullUploadFlow({ files, formData });
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
      <UploadContent openStep={openStep} addFiles={addFiles} />
      {openStep === "preview" && (
        <AlertDialogContent>
          <Header setOpenStep={setOpenStep} setFiles={setFiles} />
          <form action={action}>
            <AlertDialogDescription className="sr-only">
              Lista de cards de arquivos selecionados para upload. Você pode
              revisar os nomes, tamanhos e tipos de {files.length} arquivo(s)
              antes de confirmar o salvamento.
            </AlertDialogDescription>
            <div className="p-5 max-h-[60vh] overflow-y-auto grid grid-cols-1 gap-4 m-1 scrollbar">
              {files.map((file, index) => (
                <FilePreviewCard
                  key={index}
                  index={index}
                  file={file}
                  onRemove={() => {
                    const newFiles = files.filter((_, i) => i !== index);
                    setFiles(newFiles);
                    if (newFiles.length === 0) setOpenStep("upload");
                  }}
                />
              ))}
            </div>
            <Footer
              isPending={isPending}
              setOpenStep={setOpenStep}
              setFiles={setFiles}
            />
          </form>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
}
