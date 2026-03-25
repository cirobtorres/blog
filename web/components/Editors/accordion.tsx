"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { cn, focusRing } from "../../utils/variants";
import {
  Chevron,
  Delete,
  Disable,
  Drag,
  MoveDownward,
} from "./accordionButtons";

const focusWithinRing =
  "has-[[data-slot=accordion-trigger]:focus-visible]:outline-none has-[[data-slot=accordion-trigger]:focus-visible]:ring-3 dark:has-[[data-slot=accordion-trigger]:focus-visible]:ring-2 has-[[data-slot=accordion-trigger]:focus-visible]:ring-stone-900/25 dark:has-[[data-slot=accordion-trigger]:focus-visible]:ring-stone-100 has-[[data-slot=accordion-trigger]:focus-visible]:ring-offset-2 has-[[data-slot=accordion-trigger]:focus-visible]:ring-offset-neutral-950";

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
        "w-full h-full rounded overflow-hidden border not-dark:shadow",
        !locked && focusRing,
        !locked && focusWithinRing,
        locked
          ? "bg-stone-900 border-stone-800"
          : hasError
            ? "border-destructive/50 bg-linear-to-r from-destructive/25 to-destructive/5"
            : "transition-all duration-300 dark:text-neutral-500 dark:bg-stone-850 dark:hover:border-primary dark:hover:bg-stone-800 dark:hover:text-neutral-100 dark:focus-within:bg-stone-800 dark:focus-within:border-primary dark:focus-within:text-neutral-100 group",
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
  onDelete,
  onDisable,
  moveDownward,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  label: string;
  locked: boolean;
  onDelete: (e: React.MouseEvent) => void;
  onDisable: (e: React.MouseEvent) => void;
  moveDownward: (e: React.MouseEvent) => void;
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        type="button"
        data-slot="accordion-trigger"
        aria-disabled={locked}
        className={cn(
          "relative cursor-pointer outline-none p-2 text-left flex flex-1 items-center justify-between group/accordion-trigger",
          locked &&
            "pointer-events-none opacity-50 disabled:pointer-events-none aria-disabled:pointer-events-none disabled:opacity-50 aria-disabled:opacity-50",

          className,
        )}
        {...props}
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
      </AccordionPrimitive.Trigger>
      <div className="flex items-center gap-1 px-1.5">
        <Disable onDisable={onDisable} locked={locked} />
        <Delete onDelete={onDelete} locked={locked} />
        <MoveDownward moveDownward={moveDownward} locked={locked} />
        <Drag locked={locked} />
      </div>
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
        "border-t p-1 data-open:animate-accordion-down data-closed:animate-accordion-up overflow-hidden bg-stone-100 dark:bg-stone-925",
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
          onDelete={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
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
