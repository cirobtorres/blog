import Link from "next/link";
import { cn, focusRing } from "../../../../../../../utils/variants";

export default function DownloadButton({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  const downloadUrl = url.replace("/upload/", "/upload/fl_attachment/");
  return (
    <Link
      href={downloadUrl}
      download={name}
      title="Baixar arquivo"
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
        <path d="M12 15V3" />
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="m7 10 5 5 5-5" />
      </svg>
    </Link>
  );
}
