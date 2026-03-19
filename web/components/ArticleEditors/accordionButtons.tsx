"use client";

import React from "react";
import { cn, focusRing } from "../../utils/variants";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../AlertDialog";
import { Button } from "../Buttons";

const buttonSizes = "w-7 h-9";

const buttonStyles =
  "cursor-pointer outline-none shrink-0 transition-none rounded hover:bg-stone-300 dark:hover:bg-stone-800 text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 focus-visible:bg-stone-300 dark:focus-visible:bg-stone-700 focus-visible:text-neutral-900 dark:focus-visible:text-neutral-100";

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
        locked
          ? "transition-all duration-300 dark:text-neutral-100 dark:bg-stone-750 dark:hover:bg-stone-700 dark:hover:border-stone-500 dark:active:bg-stone-600 dark:active:border-stone-400 dark:focus-within:bg-stone-700 dark:focus-within:border-primary dark:focus-within:text-neutral-100 pointer-events-auto disabled:pointer-events-auto"
          : "transition-all duration-300 dark:text-neutral-500 dark:bg-stone-850 dark:hover:border-stone-600 dark:hover:bg-stone-800 dark:hover:text-neutral-100 dark:active:bg-stone-750 dark:active:border-stone-500 dark:focus-within:bg-stone-800 dark:focus-within:border-primary dark:focus-within:text-neutral-100",
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
            locked
              ? "transition-all duration-300 dark:text-neutral-100 dark:bg-stone-750 dark:hover:bg-stone-700 dark:hover:border-stone-500 dark:active:bg-stone-600 dark:active:border-stone-400 dark:focus-within:bg-stone-700 dark:focus-within:border-primary dark:focus-within:text-neutral-100 pointer-events-auto disabled:pointer-events-auto"
              : "transition-all duration-300 dark:text-neutral-500 dark:bg-stone-850 dark:hover:border-stone-600 dark:hover:bg-stone-800 dark:hover:text-neutral-100 dark:active:bg-stone-750 dark:active:border-stone-500 dark:focus-within:bg-stone-800 dark:focus-within:border-primary dark:focus-within:text-neutral-100",
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
      <AlertDialogContent className="gap-2 p-0">
        <AlertDialogTitle className="text-lg flex justify-between items-center p-4 pb-0">
          Excluir
          <AlertDialogCancel
            onClick={handleCloseDialog}
            className="size-8! border-transparent" // bg-stone-800
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
        <AlertDialogDescription className="py-2 px-4 border-y dark:bg-stone-900">
          Tem certeza que deseja excluir este bloco? Essa ação não poderá ser
          desfeita!
        </AlertDialogDescription>
        <div className="flex justify-end items-center gap-2 p-4 pt-0">
          <AlertDialogCancel
            onClick={handleCloseDialog}
            className=" w-full max-w-22 h-8! bg-stone-800"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            variant="destructive"
            className=" w-full max-w-22 h-8!"
          >
            Confirmar
          </AlertDialogAction>
        </div>
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
        locked
          ? "transition-all duration-300 dark:text-neutral-100 dark:bg-stone-750 dark:hover:bg-stone-700 dark:hover:border-stone-500 dark:active:bg-stone-600 dark:active:border-stone-400 dark:focus-within:bg-stone-700 dark:focus-within:border-primary dark:focus-within:text-neutral-100 pointer-events-auto disabled:pointer-events-auto"
          : "transition-all duration-300 dark:text-neutral-500 dark:bg-stone-850 dark:hover:border-stone-600 dark:hover:bg-stone-800 dark:hover:text-neutral-100 dark:active:bg-stone-750 dark:active:border-stone-500 dark:focus-within:bg-stone-800 dark:focus-within:border-primary dark:focus-within:text-neutral-100",
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
        locked
          ? "transition-all duration-300 dark:text-neutral-100 dark:bg-stone-750 dark:hover:bg-stone-700 dark:hover:border-stone-500 dark:active:bg-stone-600 dark:active:border-stone-400 pointer-events-auto disabled:pointer-events-auto dark:focus-within:bg-stone-800 dark:focus-within:border-primary dark:focus-within:text-neutral-100"
          : "transition-all duration-300 dark:text-neutral-500 dark:bg-stone-850 dark:hover:border-stone-600 dark:hover:bg-stone-800 dark:hover:text-neutral-100 dark:active:bg-stone-750 dark:active:border-stone-500 dark:focus-within:bg-stone-800 dark:focus-within:border-primary dark:focus-within:text-neutral-100",
      )}
      onClick={(e) => {
        e.stopPropagation();
        console.log("Move");
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
