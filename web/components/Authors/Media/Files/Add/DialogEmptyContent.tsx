import React from "react";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "../../../../AlertDialog";
import { Tabs, TabsList, TabsTrigger } from "../../../../Tabs";
import { cn, focusRing } from "../../../../../utils/variants";
import AnimatedIcon from "./AnimatedIcon";

export default function DialogEmptyContent({
  openStep,
  addFiles,
}: {
  openStep: "upload" | "preview" | null;
  addFiles: (newFiles: FileList | null) => void;
}) {
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
              <AnimatedIcon className="text-primary" />
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
}
