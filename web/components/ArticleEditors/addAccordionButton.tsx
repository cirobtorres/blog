"use client";

import React from "react";
import { cn, focusRing } from "../../utils/variants";
import { Button } from "../Buttons";
import { Popover, PopoverContentClipPath, PopoverTrigger } from "../Popover";

const addAccDivStyle =
  "size-full flex flex-col justify-center items-center gap-1";

const addAccBtnStyle =
  "size-12 rounded aspect-square border-stone-400 dark:border-stone-700 bg-stone-300 dark:bg-stone-800 transition-all duration-300 dark:hover:bg-stone-750 focus-visible:text-neutral-900 focus-visible:bg-stone-300 dark:focus-visible:text-neutral-100 dark:focus-visible:bg-stone-750";

const buttons: {
  children: React.ReactNode;
  blockType: BlockType;
  label: string;
}[] = [
  {
    children: (
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
        className="size-fit"
      >
        <path d="M10 9v7" />
        <path d="M14 6v10" />
        <circle cx="17.5" cy="12.5" r="3.5" />
        <circle cx="6.5" cy="12.5" r="3.5" />
      </svg>
    ),
    blockType: "html",
    label: "Editor",
  },
  {
    children: (
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
        className="size-fit"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    ),
    blockType: "image",
    label: "Imagem",
  },
  {
    children: (
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
        className="size-fit"
      >
        <path d="M16 5h6" />
        <path d="M19 2v6" />
        <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        <circle cx="9" cy="9" r="2" />
      </svg>
    ),
    blockType: "images",
    label: "Imagens",
  },
  {
    children: (
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
        className="size-fit"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </svg>
    ),
    blockType: "alert",
    label: "Alerta",
  },
  {
    children: (
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
        className="size-fit"
      >
        <path d="m16 18 6-6-6-6" />
        <path d="m8 6-6 6 6 6" />
      </svg>
    ),
    blockType: "code",
    label: "Code",
  },
  {
    children: (
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
        className="size-fit"
      >
        <path d="M3 5h8" />
        <path d="M3 12h8" />
        <path d="M3 19h8" />
        <path d="m15 8 3-3 3 3" />
        <path d="m15 16 3 3 3-3" />
      </svg>
    ),
    blockType: "accordion",
    label: "Acordeão",
  },
  {
    children: (
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
        className="size-fit"
      >
        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
        <rect x="2" y="6" width="14" height="12" rx="2" />
      </svg>
    ),
    blockType: "video",
    label: "Vídeos",
  },
];

export function AddAccordionButton({
  addBlock,
}: {
  addBlock: (type: Blocks["type"]) => void;
}) {
  // Hydration--------------------------------------------------------
  // Garantees to match Client Render + SSR
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-fit border rounded p-2 mx-auto opacity-50">
        <OpenButton />
      </div>
    );
  }
  // -----------------------------------------------------------------

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "w-fit cursor-pointer border rounded p-2 mx-auto text-neutral-500 dark:text-neutral-500 bg-stone-200 border-stone-300 dark:border-stone-700 dark:bg-stone-800 transition-all duration-300 hover:text-neutral-900 hover:bg-stone-250 dark:hover:text-neutral-100 dark:hover:bg-stone-750 data-[state=open]:text-neutral-900 data-[state=open]:bg-stone-250 dark:data-[state=open]:text-neutral-100 dark:data-[state=open]:bg-stone-750 focus-visible:text-neutral-900 focus-visible:bg-stone-250 dark:focus-visible:text-neutral-100 dark:focus-visible:bg-stone-750 not-dark:shadow",
          focusRing,
        )}
      >
        <OpenButton />
      </PopoverTrigger>
      <PopoverContentClipPath
        side="top"
        className="rounded-lg p-2 not-dark:shadow"
      >
        <div className="w-40 grid grid-cols-3 gap-1">
          {buttons.map((prop, index) => (
            <div key={index} className={addAccDivStyle}>
              <Button
                type="button"
                onClick={() => addBlock(prop.blockType)}
                className={cn(
                  addAccBtnStyle,
                  mounted ? "animate-balloon" : "opacity-0",
                  "flex justify-center items-center size-11 cursor-pointer outline-none border transition-all duration-300 dark:text-neutral-500 dark:bg-stone-900 dark:hover:border-stone-600 dark:hover:bg-stone-800 dark:hover:text-neutral-100 dark:active:border-stone-550 dark:active:text-neutral-100 dark:active:bg-stone-750 dark:focus-within:bg-stone-800 dark:focus-within:border-primary dark:focus-within:text-neutral-100 peer",
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {prop.children}
              </Button>
              <p
                className={cn(
                  mounted ? "animate-fade-in-up" : "opacity-0",
                  "w-fit text-xs text-center text-neutral-600 transition-all duration-300 dark:peer-hover:text-neutral-100 dark:peer-active:text-neutral-100 dark:peer-focus-within:text-neutral-100",
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {prop.label}
              </p>
            </div>
          ))}
        </div>
        <div className="py-2 pb-0">
          <p className="text-center text-sm text-primary pointer-events-none">
            Editores
          </p>
        </div>
      </PopoverContentClipPath>
    </Popover>
  );
}

const OpenButton = () => (
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
    <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l8.58-3.9a1 1 0 0 0 0-1.831z" />
    <path d="M16 17h6" />
    <path d="M19 14v6" />
    <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 .825.178" />
    <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l2.116-.962" />
  </svg>
);
