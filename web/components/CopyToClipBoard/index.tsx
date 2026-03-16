"use client";

import { useState } from "react";
import { cn, focusRing } from "../../utils/variants";

const CopyToClipBoard = ({
  toCopy,
  className,
  ...props
}: Omit<React.ComponentProps<"button">, "type" | "disabled"> & {
  toCopy: string;
  className?: string;
}) => {
  const [copied, setCopied] = useState(false);
  // const [disable, setDisable] = useState(false);

  const handleCopy = () => {
    if (!toCopy) return;

    navigator.clipboard.writeText(toCopy);

    setCopied(true);
    // setDisable(true);

    setTimeout(() => setCopied(false), 4000);
    // setTimeout(() => setDisable(false), 4000);
  };

  return (
    <button
      {...props}
      // disabled={disable}
      type="button"
      onClick={handleCopy}
      className={cn(
        "cursor-pointer inline-flex items-center text-center text-nowrap text-xs font-medium h-7 space-x-2 px-2 py-1.25 max-w-24 border dark:border-stone-600 rounded not-dark:shadow transition-[color,border,box-shadow] duration-300 text-neutral-900 dark:text-neutral-100 bg-stone-100 dark:bg-stone-750 focus-visible:border-stone-300 dark:focus-visible:border-stone-700",
        focusRing,
        className,
      )}
    >
      {copied ? (
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
          className="transition-colors duration-300 size-4 stroke-neutral-900 dark:stroke-neutral-100"
        >
          <path d="M20 6 9 17l-5-5" />
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
          className="transition-colors duration-300 size-4 stroke-neutral-900 dark:stroke-neutral-100"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      )}
      <span className="truncate">{copied ? "Copiado" : "Copiar"}</span>
    </button>
  );
};

export default CopyToClipBoard;
