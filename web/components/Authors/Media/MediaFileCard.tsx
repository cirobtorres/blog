import Image from "next/image";
import { cn, focusRing } from "../../../utils/variants";
import { Checkbox } from "../../Fieldset/Checkbox";
import { Button } from "../../Buttons";
import Link from "next/link";

const MediaFileCard = ({ id, src }: { id: string; src: string }) => (
  <article className="w-full max-w-100 h-60 flex flex-col shrink-0 items-center overflow-hidden transition-border duration-300 rounded-lg border hover:border-primary not-dark:shadow bg-stone-200 dark:bg-stone-900 hover:bg-stone-150 dark:hover:bg-stone-850 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-stone-300 dark:has-data-[state=checked]:bg-stone-850 focus-within:border-primary dark:focus-within:border-primary group">
    <div className="w-full h-full grid grid-rows-[1fr_80px]">
      <div className="relative">
        <label
          htmlFor={"card-" + id}
          className="relative w-full h-full overflow-hidden"
        >
          <HazardBorder />
          <Checkbox
            id={"card-" + id}
            className="absolute z-10 size-6 rounded left-2 top-2"
          />
          <Image
            src={src ?? "https://placehold.co/1920x1080/000/fff/jpeg"}
            alt={"Imagem placeholder de exp" + id}
            fill
            className="absolute object-contain"
          />
        </label>
        <div className="absolute top-2 right-2 flex items-center gap-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-has-data-[state=checked]:opacity-100">
          <Link
            href={src}
            target="_blank"
            className={cn(
              "outline-none select-none size-8 p-2 border cursor-pointer rounded bg-clip-padding inline-flex items-center justify-center transition-all duration-300 shrink-0 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800 hover:border-stone-400 dark:hover:border-stone-600 focus-visible:border-primary dark:focus-visible:border-primary",
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </Link>
          <Button variant="outline" className="size-8 not-dark:shadow-none">
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
              <path d="M12 15V3" />
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <path d="m7 10 5 5 5-5" />
            </svg>
          </Button>
          <Button variant="outline" className="size-8 not-dark:shadow-none">
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
              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
            </svg>
          </Button>
          <Button variant="outline" className="size-8 not-dark:shadow-none">
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
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </Button>
        </div>
      </div>
      <div className="w-full flex justify-between items-center gap-2 p-2 border-t">
        <div className="flex flex-col gap-1">
          <span className="text-xs leading-4 line-clamp-2 text-neutral-900 dark:text-neutral-100">
            lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit-Minima-sequi-dolor-illum-incidunt-aliquid-enim
          </span>
          <div className="flex justify-between items-center gap-1">
            <span className="text-xs font-bold text-neutral-500">
              JPEG - 1920x1080
            </span>
            <span className="text-xs px-2 py-1 rounded font-bold transition-[colors,background-color] duration-300 dark:text-neutral-500 dark:bg-stone-800 dark:group-hover:bg-stone-750 dark:group-has-data-[state=checked]:bg-stone-750">
              IMG
            </span>
          </div>
        </div>
      </div>
    </div>
  </article>
);

const HazardBorder = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-full h-full shrink-0 bg-fixed bg-[repeating-linear-gradient(315deg,#d6d3d1_0,#d6d3d1_1px,transparent_0,transparent_50%)] dark:bg-[repeating-linear-gradient(315deg,#292524_0,#292524_1px,transparent_0,transparent_50%)] bg-size-[10px_10px]",
        className,
      )}
    />
  );
};

export { MediaFileCard };
