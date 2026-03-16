"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { cn, focusRing, hoverRing } from "../../utils/variants";

const iconSizes = "size-8 w-6 px-0 py-2";

const buttonStyles =
  "cursor-pointer outline-none shrink-0 transition-all duration-300 rounded hover:bg-stone-300 dark:hover:bg-stone-700 text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 focus-visible:bg-stone-300 dark:focus-visible:bg-stone-700 focus-visible:text-neutral-900 dark:focus-visible:text-neutral-100";

const focusWithinRing =
  "has-[[data-slot=accordion-trigger]:focus-visible]:outline-none has-[[data-slot=accordion-trigger]:focus-visible]:ring-3 dark:has-[[data-slot=accordion-trigger]:focus-visible]:ring-2 has-[[data-slot=accordion-trigger]:focus-visible]:ring-stone-900/25 dark:has-[[data-slot=accordion-trigger]:focus-visible]:ring-stone-100 has-[[data-slot=accordion-trigger]:focus-visible]:ring-offset-2 has-[[data-slot=accordion-trigger]:focus-visible]:ring-offset-neutral-950";

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
      className={cn(
        "pointer-events-none shrink-0 transition-transform text-neutral-400 dark:text-neutral-500 group-aria-expanded/accordion-trigger:rotate-180",
        iconSizes,
      )}
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
    <span
      role="button"
      tabIndex={0}
      className={cn(
        buttonStyles,
        focusRing,
        locked &&
          "dark:text-neutral-100 dark:bg-stone-700 pointer-events-auto disabled:pointer-events-auto",
      )}
      onClick={onDisable}
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
        className={cn(iconSizes)}
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    </span>
  );
};

const Delete = ({
  locked,
  onDelete,
}: {
  locked: boolean;
  onDelete: (e: React.MouseEvent) => void;
}) => {
  return (
    <span
      role="button"
      tabIndex={0}
      className={cn(
        buttonStyles,
        focusRing,
        locked &&
          "pointer-events-none opacity-50 disabled:pointer-events-none aria-disabled:pointer-events-none disabled:opacity-50 aria-disabled:opacity-50",
      )}
      onClick={onDelete}
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
        className={cn(iconSizes)}
      >
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <path d="M3 6h18" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    </span>
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
    <span
      role="button"
      tabIndex={0}
      className={cn(
        buttonStyles,
        focusRing,
        locked &&
          "pointer-events-none opacity-50 disabled:pointer-events-none aria-disabled:pointer-events-none disabled:opacity-50 aria-disabled:opacity-50",
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
        className={cn(iconSizes)}
      >
        <path d="M8 18L12 22L16 18" />
        <path d="M12 2V22" />
      </svg>
    </span>
  );
};

const Drag = () => {
  return (
    <span
      role="button"
      tabIndex={0}
      className={cn(buttonStyles, focusRing)}
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
        className={cn(iconSizes, "cursor-move")}
      >
        <circle cx="9" cy="12" r="1" />
        <circle cx="9" cy="5" r="1" />
        <circle cx="9" cy="19" r="1" />
        <circle cx="15" cy="12" r="1" />
        <circle cx="15" cy="5" r="1" />
        <circle cx="15" cy="19" r="1" />
      </svg>
    </span>
  );
};

function EditorsAccordionWrapper({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={className}
      {...props}
    />
  );
}

function EditorsAccordionItem({
  className,
  locked,
  hasError,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item> & {
  locked: boolean;
  hasError?: boolean;
}) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "w-full h-full transition-all duration-300 rounded-sm overflow-hidden border not-dark:shadow",
        !locked && focusRing,
        !locked && focusWithinRing,
        !locked && hoverRing,
        locked && "border-stone-800",
        hasError && "border-destructive/50",
        className,
      )}
      {...props}
    />
  );
}

function EditorsAccordionTrigger({
  className,
  label,
  locked,
  hasError,
  onDelete,
  onDisable,
  moveDownward,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  label: string;
  locked: boolean;
  hasError?: boolean;
  onDelete: (e: React.MouseEvent) => void;
  onDisable: (e: React.MouseEvent) => void;
  moveDownward: (e: React.MouseEvent) => void;
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        asChild
        data-slot="accordion-trigger"
        {...props}
      >
        <button
          type="button"
          aria-disabled={locked}
          className={cn(
            "relative cursor-pointer outline-none p-2 text-left flex flex-1 items-center justify-between transition-all duration-300 group/accordion-trigger",
            locked &&
              "pointer-events-none opacity-50 disabled:pointer-events-none aria-disabled:pointer-events-none disabled:opacity-50 aria-disabled:opacity-50",
            hasError
              ? "bg-linear-to-r from-destructive/25 to-destructive/5"
              : "bg-stone-200 dark:bg-stone-900",
            className,
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2",
              locked &&
                "pointer-events-none opacity-50 disabled:pointer-events-none aria-disabled:pointer-events-none disabled:opacity-50 aria-disabled:opacity-50",
            )}
          >
            <Chevron />
            <span className="text-sm">{label}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Disable onDisable={onDisable} locked={locked} />
            <Delete onDelete={onDelete} locked={locked} />
            <MoveDownward moveDownward={moveDownward} locked={locked} />
            <Drag />
          </div>
        </button>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function EditorsAccordionContent({
  hasError,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content> & {
  children: React.ReactNode;
  hasError?: boolean;
}) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "border-t p-1 data-open:animate-accordion-down data-closed:animate-accordion-up overflow-hidden",
        hasError && "border-destructive/50",
      )}
      {...props}
    />
  );
}

function EditorsAccordion({
  id,
  label,
  locked,
  hasError,
  onDelete,
  onDisable,
  moveDownward,
  ...props
}: {
  children: React.ReactNode;
  id: string;
  label: string;
  locked: boolean;
  hasError?: boolean;
  onDelete: (id: string) => void;
  onDisable: (id: string) => void;
  moveDownward: (id: string) => void;
}) {
  return (
    <EditorsAccordionWrapper type="single" collapsible>
      <EditorsAccordionItem value="item-1" locked={locked} hasError={hasError}>
        <EditorsAccordionTrigger
          id={id}
          label={label}
          hasError={hasError}
          onDelete={() => onDelete(id)}
          moveDownward={(e) => {
            e.stopPropagation();
            moveDownward(id);
          }}
          onDisable={(e) => {
            e.stopPropagation();
            onDisable(id);
          }}
          locked={locked}
          {...props}
        />
        <EditorsAccordionContent {...props} hasError={hasError} />
      </EditorsAccordionItem>
    </EditorsAccordionWrapper>
  );
}

export { EditorsAccordion };
