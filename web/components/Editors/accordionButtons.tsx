"use client";

import React from "react";
import { cn, focusRing } from "../../utils/variants";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeaderPrimitive,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../AlertDialog";
import { Button } from "../Button";

const buttonSizes = "w-7 h-9";

const buttonStyles =
  "cursor-pointer outline-none shrink-0 transition-none rounded border border-transparent! text-neutral-400 dark:text-neutral-500";

const Chevron = () => {
  return (
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
      className="w-4 h-8 pointer-events-none shrink-0 transition-transform text-neutral-400 dark:text-neutral-500 group-aria-expanded/accordion-trigger:rotate-180"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
};

const Disable = ({
  locked,
  onDisable,
}: {
  locked: boolean;
  onDisable: (e: React.MouseEvent) => void;
}) => {
  return (
    <Button
      type="button"
      variant="outline"
      tabIndex={0}
      className={cn(
        buttonStyles,
        focusRing,
        buttonSizes,
        "transition-all duration-300 dark:text-neutral-500 dark:bg-stone-850 hover:bg-stone-125 dark:hover:bg-stone-800 dark:hover:text-neutral-100",
      )}
      onClick={onDisable}
    >
      {locked ? (
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
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ) : (
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
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 9.9-1" />
        </svg>
      )}
    </Button>
  );
};

const Delete = ({
  locked,
  onDelete,
}: {
  locked: boolean;
  onDelete: (e: React.MouseEvent) => void;
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleOpenDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleCloseDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDialogOpen(false);
  };

  return (
    <AlertDialog open={isDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          tabIndex={0}
          className={cn(
            buttonStyles,
            focusRing,
            buttonSizes,
            "transition-all duration-300 dark:text-neutral-500 dark:bg-stone-850 hover:bg-stone-125 dark:hover:bg-stone-800 dark:hover:text-neutral-100",
          )}
          onClick={handleOpenDialog}
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
            className={cn(buttonSizes)}
          >
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xs">
        <AlertDialogHeaderPrimitive>
          <AlertDialogTitle>
            Excluir
            <AlertDialogCancel
              variant="outline"
              onClick={handleCloseDialog}
              className="absolute top-1/2 -translate-y-1/2 right-3 size-8"
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </AlertDialogCancel>
          </AlertDialogTitle>
        </AlertDialogHeaderPrimitive>
        <AlertDialogDescription asChild>
          <div className="p-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-500">
              <strong className="text-destructive uppercase">excluir</strong>{" "}
              este bloco?
            </p>
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel
            variant="outline"
            onClick={handleCloseDialog}
            className=" w-full max-w-22 h-8!"
          >
            Cancelar
          </AlertDialogCancel>
          <Button
            onClick={onDelete}
            variant="destructive"
            className="w-full max-w-22 h-8!"
          >
            Excluir
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const MoveDownward = ({
  locked,
  moveDownward,
}: {
  locked: boolean;
  moveDownward: (e: React.MouseEvent) => void;
}) => {
  return (
    <Button
      type="button"
      variant="outline"
      tabIndex={0}
      className={cn(
        buttonStyles,
        focusRing,
        buttonSizes,
        "transition-all duration-300 dark:text-neutral-500 dark:bg-stone-850 hover:bg-stone-125 dark:hover:bg-stone-800 dark:hover:text-neutral-100",
      )}
      onClick={moveDownward}
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
        className={cn(buttonSizes)}
      >
        <path d="M8 18L12 22L16 18" />
        <path d="M12 2V22" />
      </svg>
    </Button>
  );
};

const Drag = ({ locked }: { locked: boolean }) => {
  return (
    <Button
      type="button"
      variant="outline"
      tabIndex={-1}
      className={cn(
        buttonStyles,
        buttonSizes,
        "cursor-move",
        "transition-all duration-300 dark:text-neutral-500 dark:bg-stone-850 hover:bg-stone-125 dark:hover:bg-stone-800 dark:hover:text-neutral-100",
      )}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
      }}
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
        <circle cx="9" cy="12" r="1" />
        <circle cx="9" cy="5" r="1" />
        <circle cx="9" cy="19" r="1" />
        <circle cx="15" cy="12" r="1" />
        <circle cx="15" cy="5" r="1" />
        <circle cx="15" cy="19" r="1" />
      </svg>
    </Button>
  );
};

export { Chevron, Delete, Disable, Drag, MoveDownward };
