"use client";

import React from "react";
import { cn } from "../../utils/variants";
import { Button } from "../Button";

export function AddAccordionButton({
  addBlock,
}: {
  addBlock: (type: Blocks["type"]) => void;
}) {
  return (
    <div className="flex items-center">
      <div className="mx-auto flex gap-1">
        {buttons.map((prop, index) => (
          <div
            key={index}
            className="size-full flex flex-col justify-center items-center gap-1"
          >
            <Button
              type="button"
              onClick={() => addBlock(prop.blockType)}
              variant="outline"
              className={cn(
                "size-14 shrink-0 [&_svg]:size-6 rounded-lg text-neutral-500 bg-stone-850 hover:not-disabled:border-stone-600 hover:not-disabled:bg-stone-800 hover:not-disabled:text-neutral-100 active:not-disabled:border-stone-500 active:not-disabled:text-neutral-100 active:not-disabled:bg-stone-700 focus-within:not-disabled:bg-stone-800 focus-within:not-disabled:border-primary focus-within:not-disabled:text-neutral-100 dark:text-neutral-500 dark:bg-stone-850 dark:hover:not-disabled:border-stone-600 dark:hover:not-disabled:bg-stone-800 dark:hover:not-disabled:text-neutral-100 dark:active:not-disabled:border-stone-500 dark:active:not-disabled:text-neutral-100 dark:active:not-disabled:bg-stone-700 dark:focus-within:not-disabled:bg-stone-800 dark:focus-within:not-disabled:border-primary dark:focus-within:not-disabled:text-neutral-100 peer",
              )}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {prop.children}
            </Button>
            <p
              className={cn(
                "w-fit text-xs text-center text-neutral-600 dark:text-neutral-500 transition-all duration-300 peer-disabled:opacity-50 dark:peer-disabled:opacity-50 peer-hover:peer-not-disabled:text-neutral-100 peer-active:peer-not-disabled:text-neutral-100 peer-focus-within:peer-not-disabled:text-neutral-100 dark:peer-hover:peer-not-disabled:text-neutral-100 dark:peer-active:peer-not-disabled:text-neutral-100 dark:peer-focus-within:peer-not-disabled:text-neutral-100",
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
    </div>
  );
}

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
