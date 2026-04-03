"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
} from "react-day-picker";
import { buttonVariants, cn } from "../utils/variants";
import { Button } from "./Button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "w-full aspect-square mx-auto group/calendar",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn(defaultClassNames.root),
        months: cn("relative flex", defaultClassNames.months),
        month: cn("flex flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex items-center justify-between gap-1",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-8 p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-8 p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex h-8 w-full items-center justify-center px-2",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "flex h-8 w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "relative rounded-md border not-dark:shadow-xs",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          "absolute inset-0 bg-popover opacity-0",
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          "font-medium select-none",
          captionLayout === "label"
            ? "text-sm"
            : "flex h-8 items-center gap-1 rounded-md pr-1 pl-2 text-sm [&>svg]:size-3.5 [&>svg]:text-neutral-400 dark:[&>svg]:text-neutral-500",
          defaultClassNames.caption_label,
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 rounded-md text-[0.8rem] font-normal text-neutral-900 dark:text-neutral-100 select-none",
          defaultClassNames.weekday,
        ),
        week: cn("mt-1 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-8 select-none",
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          "text-[0.8rem] text-neutral-400 dark:text-neutral-500 select-none",
          defaultClassNames.week_number,
        ),
        day: cn(
          "group/day relative aspect-square size-8 p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-md",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md"
            : "[&:first-child[data-selected=true]_button]:rounded-l-md",
          defaultClassNames.day,
        ),
        today: cn(
          "rounded-md bg-stone-750 text-primary data-[selected=true]:rounded-none",
          defaultClassNames.today,
        ),
        outside: cn(
          "text-neutral-400 aria-selected:text-neutral-400 dark:text-neutral-500 dark:aria-selected:text-neutral-500 opacity-50 aria-selected:opacity-100 hover:opacity-100",
          defaultClassNames.outside,
        ),
        disabled: cn(
          "text-neutral-400 dark:text-neutral-500 opacity-50",
          defaultClassNames.disabled,
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return <ChevronLeftIcon className={className} {...props} />;
          }

          if (orientation === "right") {
            return <ChevronRightIcon className={className} {...props} />;
          }

          return <ChevronDownIcon className={className} {...props} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={modifiers.selected}
      className={cn(
        "flex aspect-square size-auto w-full border-transparent hover:border-transparent! rounded-md flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 data-[selected-single=true]:opacity-100 data-[selected-single=true]:bg-primary/75 opacity-100! data-[selected-single=true]:text-neutral-100 data-[selected-single=true]:hover:bg-primary/75! data-[selected-single=true]:hover:text-neutral-100! data-[selected-single=true]:focus-visible:bg-primary/75! data-[selected-single=true]:focus-visible:text-neutral-100! data-[selected-single=true]:focus-visible:border-primary!",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
