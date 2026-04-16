"use client";

import Image from "next/image";
import { useArticleStore } from "../../../zustand-store/article-state";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../../AlertDialog";
import { cn, focusRing } from "../../../utils/variants";
import Spinner from "../../Spinner";
import React from "react";

export default function ArticleEditorBanner({
  children,
  error,
}: {
  children: React.ReactNode;
  error: boolean;
}) {
  const {
    loading,
    bannerMediaId,
    bannerUrl,
    bannerAlt,
    activeMediaTarget,
    setLoading,
    openMediaLibrary,
  } = useArticleStore();
  const isOpen = activeMediaTarget === "banner";

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => !open && openMediaLibrary(null)}
    >
      <AlertDialogTrigger asChild>
        <button
          onClick={() => openMediaLibrary("banner")}
          className={cn(
            "cursor-pointer relative w-full flex justify-center items-center aspect-[calc(21/9)] border rounded overflow-hidden not-dark:shadow transition-shadow duration-300",
            focusRing,
            error
              ? "border-destructive/50 bg-destructive/5 dark:bg-destructive/5 focus-visible:border-destructive dark:focus-visible:border-destructive"
              : "bg-stone-200 dark:bg-stone-900",
          )}
        >
          {bannerMediaId && bannerUrl && bannerAlt ? (
            <>
              <input
                hidden
                type="hidden"
                className="appearance-none"
                name="banner"
                value={bannerMediaId}
              />
              <Image
                src={bannerUrl}
                alt={bannerAlt}
                fill
                className="absolute object-cover"
                onLoadingComplete={() => setLoading(false)}
              />
            </>
          ) : (
            <DropZonePlaceholder loading={loading} />
          )}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-250">
        <AlertDialogHeader>Adicionar imagem</AlertDialogHeader>
        <AlertDialogDescription className="sr-only">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          omnis autem debitis dolorem exercitationem.
        </AlertDialogDescription>
        <div className="p-1">
          <div className="max-h-120 p-4 overflow-y-auto scrollbar">
            {children}
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" className="w-full max-w-30 h-8">
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const DropZonePlaceholder = ({ loading }: { loading?: boolean }) => (
  <div className="size-1/2 flex justify-center items-center rounded-xl border border-dashed text-sm text-neutral-400 dark:text-neutral-500">
    <div className="flex items-center justify-center h-full">
      {loading && <Spinner />} Selecionar Banner
    </div>
  </div>
);
