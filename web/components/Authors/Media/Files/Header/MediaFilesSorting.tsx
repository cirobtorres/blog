"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../../../../Button";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../Popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../Select";
import React from "react";
import { Calendar } from "../../../../Calendar";
import { convertToSmallDate } from "../../../../../utils/date";

export default function MediaFilesSorting() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [sortBy, setSortBy] = React.useState("createdAt");
  const [condition, setCondition] = React.useState("is");
  const [conditionType, setConditionType] = React.useState("is");
  const [type, setType] = React.useState("file");
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const createQueryString = React.useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    const filterKeys = ["createdAt", "updatedAt", "type"];

    filterKeys.forEach((key) => params.delete(key));

    const activeCondition = sortBy === "type" ? conditionType : condition;

    const finalValue =
      sortBy === "type" ? type : date ? date.toISOString() : "";

    if (finalValue) {
      params.set(sortBy, `${activeCondition}=${finalValue}`);
    }

    return params.toString();
  }, [searchParams, sortBy, condition, conditionType, type, date]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-22 h-8">
          Filtros{" "}
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
            className=""
          >
            <path d="M2 5h20" />
            <path d="M6 12h12" />
            <path d="M9 19h6" />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="gap-1 rounded-lg">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full flex-1">
            <SelectValue placeholder="createdAt" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="createdAt">createdAt</SelectItem>
            <SelectItem value="updatedAt">updatedAt</SelectItem>
            <SelectItem value="type">type</SelectItem>
          </SelectContent>
        </Select>
        {sortBy !== "type" ? (
          <>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger className="w-full flex-1">
                <SelectValue placeholder="is" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="is">is</SelectItem>
                <SelectItem value="isNot">is not</SelectItem>
                {sortBy !== "type" && (
                  <>
                    <SelectItem value="isGreaterThan">
                      is greater than
                    </SelectItem>
                    <SelectItem value="isGreaterThanOrEqualTo">
                      is greater than or equal to
                    </SelectItem>
                    <SelectItem value="isLowerThan">is lower than</SelectItem>
                    <SelectItem value="isLowerThanOrEqualTo">
                      is lower than or equal to
                    </SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild className="group">
                <Button
                  variant="outline"
                  className="cursor-auto justify-between text-xs h-9.5 hover:border-stone-500 hover:bg-stone-250! bg-stone-200 data-open:text-neutral-900 data-open:border-stone-500 data-open:bg-stone-250 focus-visible:bg-stone-250! dark:hover:border-stone-600 dark:hover:bg-stone-750! dark:bg-stone-800 dark:data-open:text-neutral-100 dark:data-open:border-stone-600 dark:data-open:bg-stone-750 dark:focus-visible:bg-stone-750!"
                >
                  {date ? convertToSmallDate(date) : "MM-DD-YYYY"}
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
                    className="group-data-open:rotate-180 transition-all duration-100"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit">
                <Calendar
                  selected={date}
                  onSelect={(newDate: Date) => {
                    if (newDate) setDate(newDate);
                  }}
                  onDayClick={() => setIsCalendarOpen(false)}
                />
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <>
            <Select value={conditionType} onValueChange={setConditionType}>
              <SelectTrigger className="w-full flex-1">
                <SelectValue placeholder="is" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="is">is</SelectItem>
                <SelectItem value="isNot">is not</SelectItem>
              </SelectContent>
            </Select>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-full flex-1">
                <SelectValue placeholder="file" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="file">file</SelectItem>
                <SelectItem value="audio">audio</SelectItem>
                <SelectItem value="image">image</SelectItem>
                <SelectItem value="video">video</SelectItem>
              </SelectContent>
            </Select>
          </>
        )}
        <Button
          type="button"
          variant="link"
          className="h-9.5"
          onClick={() => {
            const query = createQueryString();
            router.push(`${pathname}?${query}`);
            setIsOpen(false);
          }}
        >
          Adicionar filtros
        </Button>
      </PopoverContent>
    </Popover>
  );
}
