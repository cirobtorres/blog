"use client";

import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import CheckBox from "../CheckBox";

export default function FilterButton() {
  const [check1, setCheck1] = useState<"private" | "public">("public");
  const [check2, setCheck2] = useState<"blocked" | "unblocked">("unblocked");
  const [isOpen, setIsOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return; // Add a event listener only when the SignedInAvatarBox/SignedOutAvatarBox is opened
    function handleClick(event: MouseEvent) {
      if (
        dropdown.current &&
        !dropdown.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick); // Clean up
  }, [isOpen]);

  return (
    <div ref={dropdown} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          check1 === "private" || check2 === "blocked"
            ? "bg-base-neutral dark:bg-dark-base-neutral"
            : "dark:bg-dark-base-150"
        } rounded-lg p-2.5 transition-all duration-200 outline outline-2 outline-transparent focus-visible:outline-blue-500 border border-base-200 dark:border-dark-base-border`}
      >
        <FaFilter
          className={`${
            check1 === "private" || check2 === "blocked"
              ? "text-base-100 dark:text-dark-base-100"
              : "text-base-neutral dark:text-dark-base-neutral"
          } text-xs`}
        />
      </button>
      <div
        className={`absolute top-[calc(100%_+_2px)] left-1/2 -translate-x-1/2 p-4 z-10 rounded-xl flex flex-col gap-2 transition-all duration-200 border border-base-200 dark:border-dark-base-border bg-base-200 dark:bg-dark-base-150 ${
          isOpen
            ? "translate-y-0 pointer-events-auto visible opacity-100"
            : "-translate-y-2 pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="flex flex-col items-start gap-2">
          <p className="text-xs text-base-neutral dark:text-dark-base-neutral">
            Filtre os artigos por:
          </p>
          <div className="flex items-center justify-between w-60 group">
            <CheckBox
              id="private-article-checkbox"
              text="Artigos privados"
              size="small"
              checked={true}
              setValue={() =>
                setCheck1(check1 === "private" ? "public" : "private")
              }
            />
            <span className="text-[10px] text-base-neutral dark:text-dark-base-neutral px-1 py-0.5 rounded-lg pointer-events-none border border-base-200 dark:border-dark-base-border opacity-0 group-hover:opacity-100">
              Selecionar
            </span>
          </div>
          <div className="flex items-center justify-between w-60 group">
            <CheckBox
              id="block-article-comments-checkbox"
              text="Comentários bloqueados"
              size="small"
              checked={true}
              setValue={() =>
                setCheck2(check2 === "blocked" ? "unblocked" : "blocked")
              }
            />
            <span className="text-[10px] text-base-neutral dark:text-dark-base-neutral px-1 py-0.5 rounded-lg pointer-events-none border border-base-200 dark:border-dark-base-border opacity-0 group-hover:opacity-100">
              Selecionar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
