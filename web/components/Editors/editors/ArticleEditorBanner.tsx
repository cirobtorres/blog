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

export default function ArticleEditorBanner({
  children,
}: {
  children: React.ReactNode;
}) {
  const bannerUrl = useArticleStore((state) => state.bannerUrl);
  const openMedia = useArticleStore((state) => state.openMediaLibrary);
  const activeTarget = useArticleStore((state) => state.activeMediaTarget);
  const setTarget = useArticleStore((state) => state.openMediaLibrary);
  const isOpen = activeTarget === "banner"; // banner = open modal

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => !open && setTarget(null)}
    >
      <AlertDialogTrigger asChild>
        <div
          onClick={() => openMedia("banner")}
          className="cursor-pointer relative w-full flex justify-center items-center aspect-[calc(21/9)] border rounded overflow-hidden not-dark:shadow bg-stone-200 dark:bg-stone-900"
        >
          <div className="size-1/2 flex justify-center items-center rounded-xl border border-dashed text-sm text-neutral-400 dark:text-neutral-500">
            {bannerUrl ? (
              <Image
                src={bannerUrl}
                alt="TODO"
                fill
                className="absolute object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                Selecionar Banner
              </div>
            )}
          </div>
        </div>
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
          <AlertDialogCancel className="w-full max-w-30 h-8">
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
