import React from "react";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "../../../../AlertDialog";
import { Tabs, TabsList, TabsTrigger } from "../../../../Tabs";
import { cn } from "../../../../../utils/variants";
import { Button } from "../../../../Button";
import { sonnerToastPromise, soonerPromise } from "../../../../../utils/sooner";
import { fetchFileFromUrl } from "../../../../../utils/media-file-utils";
import AnimatedIcon from "./AnimatedIcon";
import Spinner from "../../../../Spinner";

export default function DialogEmptyContent({
  openStep,
  addFiles,
}: {
  openStep: "upload" | "preview" | null;
  addFiles: (newFiles: FileList | File[] | null) => void;
}) {
  const [tab, setTab] = React.useState("pc");
  const [url, setUrl] = React.useState("");
  const [, urlAction, urlIsPending] = React.useActionState(
    async () => {
      const success = (serverResponse: ActionState) => {
        const file = serverResponse.data as File;
        addFiles([file]);
        setUrl("");
        return (
          <div className="flex flex-col">
            <p>{serverResponse.success}</p>
          </div>
        );
      };

      const error = (serverResponse: ActionState) => {
        return <p>{serverResponse.error}</p>;
      };

      try {
        const downloadPromise = fetchFileFromUrl(url);

        const result = soonerPromise(
          downloadPromise.then((file: File) => ({
            ok: true,
            success: "URL processada!",
            error: null,
            data: file,
          })),
        );

        sonnerToastPromise(result, success, error, "Buscando imagem...");

        return result;
      } catch (e) {
        console.error(e);
        return {
          ok: false,
          success: null,
          error: "Não foi possível carregar a imagem",
          data: null,
        };
      }
    },
    { ok: false, success: null, error: null, data: null },
  );

  const uploadProps = { tab, url, setUrl };

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
          <LocalUpload tab={tab} addFiles={addFiles} />
          <UrlUpload {...uploadProps} />
        </div>
        <AlertDialogFooter className="flex justify-between items-center sm:justify-between flex-row sm:flex-row">
          <AlertDialogCancel variant="outline" className="w-full max-w-30 h-8">
            Cancelar
          </AlertDialogCancel>
          {tab === "url" && (
            <form action={urlAction} className="w-full max-w-30 h-8">
              <Button disabled={urlIsPending} className="w-full max-w-30 h-8">
                {urlIsPending && <Spinner />} Confirmar
              </Button>
            </form>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    )
  );
}

const LocalUpload = ({
  tab,
  addFiles,
}: {
  tab: string;
  addFiles: (newFiles: FileList | null) => void;
}) => {
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
    tab === "pc" && (
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
        <AnimatedIcon className="text-primary" />
        <span className="max-w-50 text-center text-sm font-bold text-neutral-500">
          Clique na zona ou arraste e solte os arquivos aqui!
        </span>
      </label>
    )
  );
};

const UrlUpload = ({
  tab,
  url,
  setUrl,
}: {
  tab: string;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    tab === "url" && (
      <div className="h-60">
        <label htmlFor="url" className="sr-only">
          URL
        </label>
        <label
          htmlFor="url"
          className="w-full h-full block cursor-text p-2 rounded-lg border transition-all duration-300 bg-stone-200 dark:bg-stone-900 hover:bg-stone-250 hover:border-stone-400 dark:hover:bg-stone-850 dark:hover:border-stone-600 has-focus-visible:outline-none has-focus-visible:ring-3 dark:has-focus-visible:ring-2 has-focus-visible:ring-stone-900/25 dark:has-focus-visible:ring-stone-100 has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-stone-950 has-focus-visible:border-primary dark:has-focus-visible:border-primary"
        >
          <textarea
            id="url"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={cn(
              "w-full h-full text-xs pr-2 outline-none outline-transparent border-none border-transparent resize-none scrollbar",
            )}
          />
        </label>
      </div>
    )
  );
};
