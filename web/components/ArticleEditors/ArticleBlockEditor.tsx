"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { cn, focusRing } from "../../utils/variants";

const iconSizes = "size-8 w-6 px-0 py-2";

const buttonStyles =
  "cursor-pointer outline-none shrink-0 transition-all duration-300 rounded hover:bg-stone-300 dark:hover:bg-stone-700 text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 focus-visible:bg-stone-300 dark:focus-visible:bg-stone-700 focus-visible:text-neutral-900 dark:focus-visible:text-neutral-100";

const focusWithinRing =
  "has-[[data-slot=accordion-trigger]:focus-visible]:outline-none has-[[data-slot=accordion-trigger]:focus-visible]:ring-3 dark:has-[[data-slot=accordion-trigger]:focus-visible]:ring-2 has-[[data-slot=accordion-trigger]:focus-visible]:ring-stone-900/25 dark:has-[[data-slot=accordion-trigger]:focus-visible]:ring-stone-100 has-[[data-slot=accordion-trigger]:focus-visible]:ring-offset-2 has-[[data-slot=accordion-trigger]:focus-visible]:ring-offset-neutral-950";

const hoverRing =
  "hover:outline-none hover:ring-3 dark:hover:ring-2 hover:ring-stone-900/25 dark:hover:ring-stone-100 hover:ring-offset-2 hover:ring-offset-neutral-950";

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
  onDisable,
}: {
  onDisable: (e: React.MouseEvent) => void;
}) => {
  return (
    <span
      role="button"
      tabIndex={0}
      className={cn(buttonStyles, focusRing)}
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

const Delete = ({ onDelete }: { onDelete: (e: React.MouseEvent) => void }) => {
  return (
    <span
      role="button"
      tabIndex={0}
      className={cn(buttonStyles, focusRing)}
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
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </span>
  );
};

const MoveDownward = ({
  moveDownward,
}: {
  moveDownward: (e: React.MouseEvent) => void;
}) => {
  return (
    <span
      role="button"
      tabIndex={0}
      className={cn(buttonStyles, focusRing)}
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

function ArticleAccordion({
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

function ArticleAccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "w-full h-full transition-all duration-300 rounded-sm overflow-hidden border",
        focusRing,
        focusWithinRing,
        hoverRing,
        className,
      )}
      {...props}
    />
  );
}

function ArticleAccordionTrigger({
  className,
  label,
  onDelete,
  onDisable,
  moveDownward,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  label: string;
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
          className={cn(
            "relative cursor-pointer outline-none p-2 text-left flex flex-1 items-center justify-between transition-all duration-300 bg-container disabled:pointer-events-none disabled:opacity-50 group/accordion-trigger",
            className,
          )}
        >
          <div className="flex items-center gap-2">
            <Chevron />
            <span className="text-sm text-primary">{label}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Disable onDisable={onDisable} />
            <Delete onDelete={onDelete} />
            <MoveDownward moveDownward={moveDownward} />
            <Drag />
          </div>
        </button>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function ArticleAccordionContent({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="border-t p-2 h-100 data-open:animate-accordion-down data-closed:animate-accordion-up overflow-hidden"
      {...props} // Children here!
    />
  );
}

function ArticleBlockEditor({
  id,
  label,
  onDelete,
  onDisable,
  moveDownward,
  ...props
}: {
  children: string;
  id: string;
  label: string;
  onDelete: (e: React.MouseEvent) => void;
  onDisable: (e: React.MouseEvent) => void;
  moveDownward: (e: React.MouseEvent) => void;
}) {
  return (
    <ArticleAccordion type="single" collapsible>
      <ArticleAccordionItem value="item-1">
        <ArticleAccordionTrigger
          id={id}
          label={label}
          onDelete={onDelete}
          onDisable={onDisable}
          moveDownward={moveDownward}
          {...props}
        />
        <ArticleAccordionContent {...props} />
      </ArticleAccordionItem>
    </ArticleAccordion>
  );
}

export { ArticleBlockEditor };
