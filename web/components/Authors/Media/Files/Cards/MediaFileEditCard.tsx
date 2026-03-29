import Image from "next/image";
import { DashedBackground } from "../../../../DashedBackground";

export default function MediaFileEditCard({
  url,
  name,
  type,
  size,
  extension,
  width,
  height,
}: {
  url: string;
  name: string;
  type: string;
  size: number;
  extension: string;
  width: number;
  height: number;
}) {
  return (
    <article className="w-full max-w-100 h-65 flex flex-col shrink-0 items-center overflow-hidden transition-border duration-300 mt-0 mb-auto rounded-lg border not-dark:shadow bg-stone-200 dark:bg-stone-900 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-stone-300 dark:has-data-[state=checked]:bg-stone-850 focus-within:border-primary dark:focus-within:border-primary dark:focus-within:bg-stone-850 group">
      <div className="w-full h-full grid grid-rows-[1fr_calc(28px+24px+4px+16px+1px)]">
        <div className="relative">
          <div className="relative w-full h-full overflow-hidden">
            <DashedBackground />
            <Image
              src={url}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              className="absolute object-contain p-px"
            />
          </div>
          <div className="absolute top-2 right-2 flex items-center gap-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-has-data-[state=checked]:opacity-100">
            {/* <ExcludeButton /> */}
          </div>
        </div>
        <div className="w-full flex justify-between items-center gap-2 p-2 border-t">
          <div className="w-full h-full flex flex-col justify-start gap-1">
            <span className="h-7 flex-1 text-xs leading-3.5 line-clamp-2 mb-auto mt-0 text-neutral-900 dark:text-neutral-100">
              {name}
            </span>
            <div className="flex justify-between items-center gap-1">
              <span className="text-xs font-bold text-neutral-500">
                {extension.toUpperCase()}
                {type === "IMAGE" && " - " + width + "x" + height}
                {" - "}
                {(size / 1024 / 1024).toFixed(2) + " MB"}
              </span>
              <span className="text-xs px-2 py-1 rounded font-bold transition-[colors,background-color] duration-300 dark:text-neutral-500 dark:bg-stone-800 dark:group-has-data-[state=checked]:bg-stone-750">
                {type}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
