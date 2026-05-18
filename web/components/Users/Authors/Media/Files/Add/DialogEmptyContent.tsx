import React from "react";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "../../../../../AlertDialog";
import { Tabs, TabsList, TabsTrigger } from "../../../../../Tabs";
import { cn } from "../../../../../../utils/variants";
import { Button } from "../../../../../Button";
import {
  sonnerToastPromise,
  sonnerPromise,
} from "../../../../../../utils/sonner";
import AnimatedIcon from "./AnimatedIcon";
import Spinner from "../../../../../Spinner";
import { FieldsetError } from "../../../../../Fieldset";
import { fetchFileFromUrl } from "../../../../../../utils/media-file-utils";

interface Errors {
  url: string[] | string;
}

const defaultState: ActionState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default function DialogEmptyContent({
  openStep,
  addFiles,
}: {
  openStep: "upload" | "preview" | null;
  addFiles: (newFiles: FileList | File[] | null) => void;
}) {
  const [tab, setTab] = React.useState("pc");
  const [url, setUrl] = React.useState("");
  const [errors, setErrors] = React.useState<null | Errors>(null);
  const [isPending, setIsPending] = React.useState(false);

  const handleUrlUpload = async (e: React.ChangeEvent) => {
    e.preventDefault();
    if (!url) return setErrors({ url: "URL não pode ser vazia" });

    setIsPending(true);

    const success = (response: ActionState) => {
      const file = response.data;
      addFiles([file]);
      setUrl("");
      return (
        <div className="flex flex-col">
          <p>{response.success}</p>
        </div>
      );
    };

    const error = (response: ActionState) => {
      setErrors({ url: response.error });
      return <p>{response.error}</p>;
    };

    try {
      const filePromise = fetchFileFromUrl(
        `/local/fetch-file?url=${encodeURIComponent(url)}`,
      );
      const result = sonnerPromise(
        filePromise
          .then(async (response: Response) => {
            const blob = await response.blob();

            // Naming-the-file--------------------------------------------------
            // 1. Header
            const contentDisposition = response.headers.get(
              "Content-Disposition",
            );
            let fileName = "file";

            if (contentDisposition) {
              const match = contentDisposition.match(/filename="?(.+?)"?$/);
              if (match) fileName = match[1];
            }

            // 2. URL (fallback)
            if (fileName === "file") {
              const urlObj = new URL(response.url);
              const pathname = urlObj.pathname;
              const extracted = pathname.split("/").pop();
              if (extracted) fileName = extracted;
            }

            // 3. MIME (fallback)
            if (!fileName.includes(".")) {
              const ext = blob.type.split("/")[1] || "bin";
              fileName += `.${ext}`;
            }

            return new File([blob], fileName, { type: blob.type });
          })
          .then((file: File) => ({
            ...defaultState,
            ok: true,
            success: "URL processada!",
            data: file,
          })),
      );
      sonnerToastPromise(result, success, error, "Buscando imagem...");
    } catch (e) {
      setErrors({ url: "Falha ao baixar arquivo" });
      console.error("handleUrlUpload error:", e);
    } finally {
      setIsPending(false);
    }
  };

  const uploadProps = { tab, errors, url, setUrl };

  return (
    openStep === "upload" && (
      <AlertDialogContent className="ring-4 border-4 max-w-200 gap-0 p-0 overflow-hidden">
        <AlertDialogHeader callback={() => setErrors(null)}>
          Adicione arquivos
        </AlertDialogHeader>
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
          <AlertDialogCancel
            variant="outline"
            onClick={() => setErrors(null)}
            className="w-full max-w-30 h-8"
          >
            Cancelar
          </AlertDialogCancel>
          {tab === "url" && (
            <Button
              type="button"
              disabled={isPending}
              onClick={handleUrlUpload}
              className="w-full max-w-30 h-8"
            >
              {isPending && <Spinner />} Confirmar
            </Button>
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
  errors,
  setUrl,
}: {
  tab: string;
  url: string;
  errors: null | Errors;
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
          className={cn(
            "w-full h-full block cursor-text p-2 rounded-lg border duration-300 has-focus-visible:outline-none has-focus-visible:ring-3 dark:has-focus-visible:ring-2 has-focus-visible:ring-stone-900/25 dark:has-focus-visible:ring-stone-100 has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-stone-950 has-focus-visible:border-primary dark:has-focus-visible:border-primary",
            errors
              ? "transition-shadow bg-destructive/10 dark:bg-destructive/10 border-destructive/50 dark:border-destructive/50"
              : "transition-all bg-stone-200 dark:bg-stone-900 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-250 dark:hover:bg-stone-850",
          )}
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
        <FieldsetError error={errors?.url} />
      </div>
    )
  );
};
