"use client";

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import Link from "next/link";
import { cn, linkVariants } from "../../../utils/className";

export default function ScrollSummary() {
  return (
    <div className="w-full h-fit md:sticky md:top-[calc(100svh/4)] ml-auto mr-0">
      <div className="mb-3">
        <p className="font-sans text-xs font-medium text-neutral-500 dark:text-neutral-100">
          Sumário
        </p>
      </div>
      <ScrollArea className="hidden md:block md:h-[calc(100svh/2)] relative ms-3.5 before:absolute before:-left-3.5 before:inset-y-0 before:w-px before:bg-neutral-200 dark:before:bg-neutral-800">
        {Array.from({ length: 20 }).map((_, i) => (
          <Link
            key={i}
            href="/"
            data-active={i === 0}
            className={cn(
              linkVariants({ variant: "internal" }),
              "block text-xs text-neutral-500 ml-1 p-px my-1",
              i === 0 &&
                "relative text-sidebar-foreground dark:text-neutral-100 hover:bg-transparent hover:text-foreground data-[active=true]:bg-transparent data-[depth=3]:ps-4.5 data-[depth=4]:ps-5.5 data-[active=true]:text-foreground before:absolute data-[active=true]:before:w-0.75 data-[active=true]:before:bg-primary before:inset-y-px before:-left-4.75 before:w-px before:rounded-full",
            )}
          >
            Lorem ipsum dolor
          </Link>
        ))}
      </ScrollArea>
      {/* <div className="md:block hidden absolute inset-y-0 mix-blend-hard-light -right-[calc(var(--padding-article-content)/2)] w-px opacity-50 bg-gradient-lin-b" /> */}
    </div>
  );
}

function ScrollArea({
  className,
  children,
  scrollFade = false,
  scrollbarGutter = false,
  ...props
}: ScrollAreaPrimitive.Root.Props & {
  className?: string;
  scrollFade?: boolean;
  scrollbarGutter?: boolean;
}) {
  return (
    <ScrollAreaPrimitive.Root
      className={cn("size-full min-h-0", className)}
      tabIndex={-1}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        tabIndex={-1}
        className={cn(
          "h-full overscroll-contain rounded-[inherit] outline-none transition-shadows focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-has-overflow-x:overscroll-x-contain",
          scrollFade &&
            "mask-t-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-y-start)))] mask-b-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-y-end)))] mask-l-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-x-start)))] mask-r-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-x-end)))] [--fade-size:1.5rem]",
          scrollbarGutter &&
            "data-has-overflow-y:pe-2.5 data-has-overflow-x:pb-2.5",
        )}
        data-slot="scroll-area-viewport"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
      <ScrollAreaPrimitive.Corner data-slot="scroll-area-corner" />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props & {
  className?: string;
}) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      className={cn(
        "m-1 flex opacity-0 transition-opacity delay-300 data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5 data-[orientation=horizontal]:flex-col data-hovering:opacity-100 data-scrolling:opacity-100 data-hovering:delay-0 data-scrolling:delay-0 data-hovering:duration-100 data-scrolling:duration-100",
        className,
      )}
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        className="relative flex-1 rounded-full bg-foreground/20"
        data-slot="scroll-area-thumb"
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}
