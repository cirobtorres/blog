"use client";

import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../../Carousel";
import { cn, focusRing } from "../../../utils/variants";

export default function BlockImages({
  images,
  blockType,
}: ImagesEditor & { blockType: string }) {
  const [mainApi, setMainApi] = React.useState<CarouselApi>();
  const [thumbApi, setThumbApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onThumbClick = React.useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbApi],
  );

  const onSelect = React.useCallback(() => {
    if (!mainApi || !thumbApi) return;
    setSelectedIndex(mainApi.selectedScrollSnap());
    thumbApi.scrollTo(mainApi.selectedScrollSnap());
  }, [mainApi, thumbApi]);

  React.useEffect(() => {
    if (!mainApi) return;

    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);

    return () => {
      mainApi.off("select", onSelect);
      mainApi.off("reInit", onSelect);
    };
  }, [mainApi, onSelect]);

  return (
    <div key={blockType} className="not-first:mt-6 w-full max-w-3xl mx-auto">
      <Carousel setApi={setMainApi} opts={{ loop: true }}>
        <CarouselContent className="-ml-1">
          {images.map((image) => (
            <CarouselItem key={image.id} className="pl-1">
              <ImageComponent {...image} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Carousel
        className="mt-1"
        setApi={setThumbApi}
        opts={{
          containScroll: "keepSnaps",
          dragFree: true,
        }}
      >
        <CarouselContent className="-ml-1 flex flex-row">
          {images.map((image, index) => (
            <CarouselItem
              key={image.id}
              className="pl-1 basis-1/4 sm:basis-1/6 cursor-pointer"
            >
              <div
                tabIndex={0}
                onClick={() => onThumbClick(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onThumbClick(index);
                }}
                className={cn(
                  "relative m-1 aspect-square rounded-md border border-transparent outline-none overflow-hidden transition-all duration-300",
                  focusRing,
                )}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  sizes="15vw"
                  className={cn(
                    "absolute object-cover",
                    index === selectedIndex ? "opacity-100" : "opacity-25",
                  )}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export function ImageComponent({ id, url, alt, caption }: ImageEditor) {
  return (
    <figure className="w-full flex flex-col">
      <div className="relative flex-1 aspect-video rounded-lg overflow-hidden">
        <Image
          id={id}
          src={url}
          alt={alt}
          fill
          className="object-contain"
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 1020px"
        />
      </div>
      {caption && (
        <figcaption className="py-2 text-neutral-900 dark:text-neutral-400 text-start">
          <small>{caption}</small>
        </figcaption>
      )}
    </figure>
  );
}
