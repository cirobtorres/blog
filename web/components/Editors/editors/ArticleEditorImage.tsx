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
import FolderBreadcrumbState from "../../Users/Authors/Media/FolderBreadcrumbState";
import FolderCardButtons from "../../Users/Authors/Media/Folders/Cards/FolderCardButtons";
import { Hr } from "../../utils";
import FileCardButtons from "../../Users/Authors/Media/Files/Cards/FileCardButtons";
import { DashedBackground } from "../../DashedBackground";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../Carousel";
import { ExpandButton } from "../../Users/Authors/Media/Files/Cards/Buttons/ExpandButton";
import DownloadButton from "../../Users/Authors/Media/Files/Cards/Buttons/DownloadButton";

interface SelectedImage {
  id: string;
  url: string;
  alt: string;
  caption: string;
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
  error,
}: {
  defaultBanner?: ImageEditor;
  error?: boolean;
}) {
  const {
    loading,
    bannerMediaId,
    bannerUrl,
    bannerAlt,
    setLoading,
    openMediaLibrary,
    selectBanner,
  } = useArticleStore();

  React.useEffect(() => {
    if (defaultBanner && !bannerMediaId) {
      selectBanner(defaultBanner);
    }
  }, [defaultBanner, bannerMediaId, selectBanner]);

  return (
    <button
      type="button"
      onClick={() => openMediaLibrary("banner")}
      className={cn(
        "cursor-pointer relative w-full flex justify-center items-center aspect-[2.3333333333333335] border rounded overflow-hidden not-dark:shadow transition-shadow duration-300",
        error
          ? "bg-destructive/10 border-destructive/50"
          : "bg-stone-200 dark:bg-stone-900",
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
            name={`image-${blockId}-${data.id}`}
            value={data.id}
            className="absolute appearance-none -z-50"
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
  images,
  onClick,
  setImages,
}: {
  blockId: string;
  text: string;
  images: ImageEditor[];
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  setImages: (images: ImageEditor[]) => void;
}) {
  const { setLoading } = useArticleStore();

  return (
    <div className="w-full h-100 flex justify-center items-center">
      {images.length > 0 ? (
        <Carousel opts={{ align: "center", loop: true }}>
          <CarouselContent className="-ml-2 max-w-180">
            {images.map((image) => (
              <CarouselItem
                key={image.id}
                className="pl-2 basis-full flex justify-center"
              >
                <div className="relative w-160 aspect-video border rounded-lg overflow-hidden shrink-0">
                  <DashedBackground />
                  <input
                    hidden
                    type="hidden"
                    name={`image-${blockId}-${image.id}`}
                    value={image.id}
                    className="absolute appearance-none invisible -z-50"
                  />
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="absolute object-cover"
                    onLoadingComplete={() => setLoading(false)}
                  />
                  <div className="w-full h-20 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-1 backdrop-blur-sm">
                    <ExpandButton url={image.url} />
                    <DownloadButton {...{ name: image.id, url: image.url }} />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setImages(images.filter((i) => i.id !== image.id));
                      }} // TODO
                      className="size-8 not-dark:shadow-none"
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
                      >
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        <path d="M3 6h18" />
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="flex flex-col justify-center items-center gap-2">
          {text}
          <Button
            type="button"
            onClick={onClick}
            className={cn("size-8 rounded-lg not-dark:shadow", focusRing)}
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
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
}
