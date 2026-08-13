import Link from "next/link";
import { cn, focusRing } from "../../../../../../../utils/variants";

export const ExpandButton = ({ url }: { url: string }) => (
  <Link
    href={url}
    target="_blank"
    className={cn(
      "cursor-pointer size-8 border rounded text-sm inline-flex items-center justify-center whitespace-nowrap transition-all duration-300 shrink-0 outline-none select-none px-2.5 not-dark:shadow [&_svg]:shrink-0 [&_svg]:pointer-events-none [&_svg]:size-4 text-neutral-900 dark:text-neutral-100 bg-stone-100 dark:bg-stone-900",
      focusRing,
    )}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  </Link>
);
