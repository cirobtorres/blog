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
  AlertDialogExitConfirmation,
  AlertDialogHeaderPrimitive,
} from "../../../AlertDialog";
import { cn, focusRing } from "../../../../utils/variants";
import { Tabs, TabsList, TabsTrigger } from "../../../Tabs";
import { MediaPullRequestIcon } from "./MediaPullRequestIcon";
import { sonnerToastPromise } from "../../../../utils/sooner";
import { getCloudinarySignature } from "../../../../services/cloudinary/signature";
import { convertToLargeDate } from "../../../../utils/date";
import { syncWithSpringBoot } from "../../../../services/cloudinary/sync";
import { Button } from "../../../Button";
import FilePreviewCard from "./FilePreviewCard";
import Spinner from "../../../Spinner";

export function AddFilesButton() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [openStep, setOpenStep] = React.useState<"upload" | "preview" | null>(
    null,
  );
  const [state, action, isPending] = React.useActionState(
    async (prevState: ActionState, formData: FormData) => {
      const fullUploadFlow = async (): Promise<ActionState> => {
        try {
          const cloudinaryResults: CloudinarySave[] = [];

          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const customName = formData.get(`file_${i}_name`) as string;
            const customAlt = formData.get(`file_${i}_alt`) as string;
            const customCaption = formData.get(`file_${i}_caption`) as string;
            const customFolder = formData.get(`file_${i}_folder`) as string;

            // Cloudinary file name = public_id
            const sanitizedPublicId = customName.replace(/\.[^/.]+$/, "");

            const { signature, timestamp, apiKey } =
              await getCloudinarySignature({
                public_id: sanitizedPublicId,
                folder: customFolder,
              });

            const cloudinaryBody = new FormData();
            cloudinaryBody.append("file", file);
            cloudinaryBody.append("signature", signature);
            cloudinaryBody.append("timestamp", timestamp.toString());
            cloudinaryBody.append("api_key", apiKey!);
            cloudinaryBody.append("public_id", sanitizedPublicId);
            cloudinaryBody.append("folder", customFolder);

            const endpoint = file.type.startsWith("video") ? "video" : "image";

            const response = await fetch(
              `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${endpoint}/upload`,
              { method: "POST", body: cloudinaryBody },
            );

            if (!response.ok) {
              return {
                ok: false,
                success: null,
                error: "Falha ao tentar salvar os arquivos no CLoudinary",
                data: null,
              };
            }

            const data: Cloudinary = await response.json();

            cloudinaryResults.push({
              ...data,
              custom_name: customName,
              custom_alt: customAlt,
              custom_caption: customCaption,
              custom_folder: customFolder,
            });
          }

          return await syncWithSpringBoot(cloudinaryResults);
        } catch (err) {
          console.error("fullUploadFlow:", err);
          return {
            ok: false,
            success: null,
            error: "Erro ao enviar arquivos ao Cloudinary.",
            data: null,
          };
        }
      };

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

      const result = fullUploadFlow();

      const promise: Promise<ActionState> = new Promise((resolve, reject) => {
        result.then((data) => {
          if (data.ok) resolve(result);
          else reject(result);
        });
      });

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
      <ButtonTrigger setOpenStep={setOpenStep} />
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

const ButtonTrigger = ({
  setOpenStep,
}: {
  setOpenStep: (value: "upload" | "preview" | null) => void;
}) => (
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

const UploadContent = ({
  openStep,
  addFiles,
}: {
  openStep: "upload" | "preview" | null;
  addFiles: (newFiles: FileList | null) => void;
}) => {
  const [tab, setTab] = React.useState("pc");
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const handleFiles = e.dataTransfer.files;
    if (handleFiles && handleFiles.length > 0) {
      addFiles(handleFiles);
      e.dataTransfer.clearData();
    }
  };

  const handleOnFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    addFiles(e.target.files);
  };

  return (
    openStep === "upload" && (
      <AlertDialogContent className="ring-4 border-4 max-w-200 gap-0 p-0 overflow-hidden">
        <AlertDialogHeader>Adicione arquivos</AlertDialogHeader>
        <AlertDialogDescription className="sr-only">
          Área de transferência de arquivos. Você pode arrastar arquivos do seu
          computador para esta zona ou alternar entre upload local e via URL
          usando as abas abaixo.
        </AlertDialogDescription>
        <div className="flex flex-col gap-4 p-8 pt-2">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList variant="line">
              <TabsTrigger value="pc" className="cursor-pointer">
                Local
              </TabsTrigger>
              <TabsTrigger value="url" className="cursor-pointer">
                URL
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {tab === "pc" && (
            <label
              htmlFor="files"
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={cn(
                "cursor-pointer relative w-full h-60 flex flex-col justify-center items-center gap-2 rounded-lg outline-none border border-dashed transition-all duration-300 overflow-hidden",
                isDragging
                  ? "ring-4 ring-emerald-500 dark:ring-emerald-500 border-transparent bg-emerald-300 dark:bg-emerald-900/25"
                  : "bg-stone-200 hover:bg-stone-250 hover:border-stone-400 dark:bg-stone-900 dark:hover:bg-stone-850 dark:hover:border-stone-600",
              )}
            >
              <input
                id="files"
                type="file"
                name="files"
                multiple
                tabIndex={-1}
                aria-label="Arraste e solte arquivos de media aqui"
                className="sr-only"
                onChange={handleOnFileChange}
              />
              <MediaPullRequestIcon className="text-primary" />
              <span className="max-w-50 text-center text-sm font-bold text-neutral-500">
                Clique na zona ou arraste e solte os arquivos aqui!
              </span>
            </label>
          )}
          {tab === "url" && (
            <div className="">
              <label htmlFor="url" className="sr-only">
                URL
              </label>
              <textarea
                id="url"
                rows={4}
                className={cn(
                  "w-full p-2 text-xs rounded-lg border transition-all duration-300 bg-stone-200 hover:bg-stone-250 hover:border-stone-400 dark:bg-stone-900 dark:hover:bg-stone-850 dark:hover:border-stone-600",
                  focusRing,
                )}
              />
            </div>
          )}
        </div>
        <AlertDialogFooter className="flex justify-between items-center sm:justify-between flex-row sm:flex-row">
          <AlertDialogCancel variant="outline" className="w-full max-w-30 h-8">
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    )
  );
};

const Header = ({
  setOpenStep,
  setFiles,
}: {
  setOpenStep: (
    value: React.SetStateAction<"upload" | "preview" | null>,
  ) => void;
  setFiles: (value: React.SetStateAction<File[]>) => void;
}) => (
  <AlertDialogHeaderPrimitive>
    <AlertDialogTitle>Adicione arquivos</AlertDialogTitle>
    <AlertDialogExitConfirmation
      onConfirm={() => {
        setOpenStep(null);
        setFiles([]);
      }}
    >
      Os arquivos serão descartados. Deseja realmente sair?
    </AlertDialogExitConfirmation>
  </AlertDialogHeaderPrimitive>
);

const Footer = ({
  isPending,
  setOpenStep,
  setFiles,
}: {
  isPending: boolean;
  setOpenStep: (
    value: React.SetStateAction<"upload" | "preview" | null>,
  ) => void;
  setFiles: (value: React.SetStateAction<File[]>) => void;
}) => (
  <AlertDialogFooter>
    <AlertDialogExitConfirmation
      location="footer"
      onConfirm={() => {
        setOpenStep(null);
        setFiles([]);
      }}
    >
      Os arquivos serão descartados. Deseja realmente sair?
    </AlertDialogExitConfirmation>
    <Button type="submit" disabled={isPending} className="w-full max-w-30 h-8">
      {isPending && <Spinner />} Salvar
    </Button>
  </AlertDialogFooter>
);
