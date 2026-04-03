"use client";

import React from "react";
import { cn, focusRing } from "../../../../../utils/variants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function MediaFileSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [search, setSearch] = React.useState(searchParams.get("q") || "");
  const [isOpen, setIsOpen] = React.useState(!!searchParams.get("q"));

  const searchRef = React.useRef<HTMLButtonElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const canYouTabWithin = isOpen ? 0 : -1;

  React.useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearch(query);
      setIsOpen(true);
    }
  }, [searchParams]);

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const searchTerm = value.trim();

    if (searchTerm) {
      params.set("q", searchTerm);
    } else {
      params.delete("q");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 100);
      return;
    }
    handleSearch(search);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearch("");
    handleSearch("");
    searchRef.current?.focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-8 flex justify-center items-center relative border rounded transition-all duration-300 bg-stone-900 hover:bg-stone-800 hover:border-stone-600 has-[input:focus-visible]:outline-none has-[input:focus-visible]:ring-3 dark:has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-stone-900/25 dark:has-[input:focus-visible]:ring-stone-100 has-[input:focus-visible]:ring-offset-2 has-[input:focus-visible]:ring-offset-stone-950 has-[input:focus-visible]:border-primary dark:has-[input:focus-visible]:border-primary has-[input:focus-visible]:bg-stone-800 group"
    >
      <button
        type="submit"
        ref={searchRef}
        aria-label="Pesquisar"
        className={cn(
          "cursor-pointer z-10 absolute size-8 top-1/2 -translate-y-1/2 left-0 border border-transparent rounded flex justify-center items-center transition-shadow duration-300",
          focusRing,
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300 stroke-neutral-400 dark:stroke-neutral-400 hover:stroke-neutral-900 dark:hover:stroke-neutral-100"
        >
          <path d="m21 21-4.34-4.34" />
          <circle cx="11" cy="11" r="8" />
        </svg>
      </button>
      <label>
        <input
          type="search"
          ref={inputRef}
          tabIndex={canYouTabWithin}
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={cn(
            "size-8 h-7.5 text-sm leading-8 opacity-0 text-neutral-500 outline-none border-none transition-all duration-200",
            isOpen && "w-60 px-8 opacity-100",
          )}
        />
      </label>
      <button
        type="button"
        tabIndex={canYouTabWithin}
        className={cn(
          "cursor-pointer absolute size-8 top-1/2 -translate-y-1/2 right-0 border border-transparent rounded flex justify-center items-center transition-[opacity_100ms,box-shadow_300ms,border_300ms]",
          isOpen ? "opacity-100 delay-75" : "opacity-0",
          focusRing,
        )}
        onClick={handleClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="transition-all duration-300 stroke-neutral-400 dark:stroke-neutral-400 hover:stroke-neutral-900 dark:hover:stroke-neutral-100"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </form>
  );
}
