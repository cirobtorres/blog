"use client";

import React from "react";
import { useArticleStore } from "../../../zustand-store/article-state";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "../../AlertDialog";
import { Button } from "../../Button";
import Spinner from "../../Spinner";
import { cn, focusRing } from "../../../utils/variants";
import Image from "next/image";
import FolderBreadcrumbState from "../../Authors/Media/FolderBreadcrumbState";
import FolderCardButtons from "../../Authors/Media/Folders/Cards/FolderCardButtons";
import { Hr } from "../../utils";
import FileCardButtons from "../../Authors/Media/Files/Cards/FileCardButtons";
import { DashedBackground } from "../../DashedBackground";

interface SelectedImage {
  id: string;
  url: string;
  alt: string;
}

export const DropZonePlaceholder = ({
  text,
  loading,
}: {
  text: string;
  loading?: boolean;
}) => (
  <div className="size-1/2 flex justify-center items-center rounded-xl border border-dashed text-sm text-neutral-400 dark:text-neutral-500">
    <div className="flex items-center justify-center h-full">
      {loading && <Spinner />} {text}
    </div>
  </div>
);

export function ArticleMediaManager() {
  const { activeMediaTarget, openMediaLibrary, selectImages, blocks } =
    useArticleStore();
  const [tempSelection, setTempSelection] = React.useState<SelectedImage[]>([]);

  // Multiple
  const isMulti = React.useMemo(() => {
    if (activeMediaTarget === "banner") return false;
    const block = blocks.find((b) => b.id === activeMediaTarget);
    return block?.type === "images";
  }, [activeMediaTarget, blocks]);

  const isOpen = activeMediaTarget !== null;

  const handleConfirm = () => {
    selectImages(tempSelection);
    setTempSelection([]);
  };

  const handleClose = () => {
    openMediaLibrary(null);
    setTempSelection([]);
  };

  return (
    <SelectionContext.Provider
      value={{ tempSelection, setTempSelection, multiSelect: isMulti }}
    >
      <AlertDialog
        open={isOpen}
        onOpenChange={(open) => !open && handleClose()}
      >
        <AlertDialogContent className="max-w-5xl h-[80vh] flex flex-col">
          <AlertDialogHeader>Selecionar Mídia</AlertDialogHeader>
          <div className="flex-1 overflow-y-auto p-4">
            <FolderBreadcrumbState />
            <FolderCardButtons />
            <Hr className="my-6" />
            <FileCardButtons />
          </div>
          <AlertDialogFooter className="p-4 border-t">
            <Button
              variant="ghost"
              onClick={handleClose}
              className="w-full max-w-30 h-8"
            >
              Cancelar
            </Button>
            <Button onClick={handleConfirm} className="w-full max-w-30 h-8">
              Confirmar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SelectionContext.Provider>
  );
}

// Prop drilling
export const SelectionContext = React.createContext<{
  tempSelection: SelectedImage[];
  setTempSelection: React.Dispatch<React.SetStateAction<SelectedImage[]>>;
  multiSelect: boolean;
} | null>(null);

export function ArticleBannerButton({
  defaultBanner,
}: {
  defaultBanner?: ImageEditor;
}) {
  const {
    loading,
    bannerMediaId,
    bannerUrl,
    bannerAlt,
    setLoading,
    openMediaLibrary,
    hydrateBanner,
  } = useArticleStore();

  React.useEffect(() => {
    if (defaultBanner && !bannerMediaId) {
      hydrateBanner(defaultBanner);
    }
  }, [defaultBanner, bannerMediaId, hydrateBanner]);

  return (
    <button
      type="button"
      onClick={() => openMediaLibrary("banner")}
      className={cn(
        "cursor-pointer relative w-full flex justify-center items-center aspect-[2.3333333333333335] border rounded overflow-hidden not-dark:shadow transition-shadow duration-300 bg-stone-200 dark:bg-stone-900",
        focusRing,
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
        <DropZonePlaceholder text="Selecionar Banner" loading={loading} />
      )}
    </button>
  );
}

export function ArticleImageButton({
  blockId,
  text,
  data,
  onClick,
}: {
  blockId: string;
  text: string;
  data: ImageEditor;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const { loading, setLoading } = useArticleStore();

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "cursor-pointer relative w-full flex justify-center items-center aspect-[2.3333333333333335] border rounded overflow-hidden not-dark:shadow transition-shadow duration-300 bg-stone-200 dark:bg-stone-900",
        focusRing,
      )}
    >
      {data.id && data.url && data.alt ? (
        <>
          <input
            hidden
            type="hidden"
            className="appearance-none"
            name={`image-${blockId}-${data.id}`}
            value={data.id}
          />
          <Image
            src={data.url}
            alt={data.alt}
            fill
            className="absolute object-cover"
            onLoadingComplete={() => setLoading(false)}
          />
        </>
      ) : (
        <DropZonePlaceholder text={text} loading={loading} />
      )}
    </button>
  );
}

export function ArticleImagesButton({
  blockId,
  text,
  data,
  onClick,
}: {
  blockId: string;
  text: string;
  data: ImagesEditor;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const { loading, setLoading } = useArticleStore();
  console.log(data.images.length);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "cursor-pointer w-full flex justify-center items-center border border-transparent rounded overflow-hidden not-dark:shadow transition-shadow duration-300",
        focusRing,
      )}
    >
      {data.images.length > 0 ? (
        <div className="p-4 grid grid-cols-8 gap-2 justify-center items-center">
          {data.images.map((image) => {
            return (
              <div
                key={image.id}
                className="relative w-40 h-full aspect-[2.3333333333333335] rounded overflow-hidden"
              >
                <DashedBackground />
                <input
                  hidden
                  type="hidden"
                  className="appearance-none"
                  name={`image-${blockId}-${image.id}`}
                  value={image.id}
                />
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="absolute object-cover"
                  onLoadingComplete={() => setLoading(false)}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <DropZonePlaceholder text={text} loading={loading} />
      )}
    </button>
  );
}
