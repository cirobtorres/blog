import { DashedBackground } from "../../../../DashedBackground";

export default function MediaFileCardGhost() {
  return (
    <DashedBackground className="opacity-25 relative w-full max-w-100 h-65 flex flex-col shrink-0 items-center transition-border duration-300 rounded-lg border not-dark:shadow bg-stone-200 dark:bg-stone-900 overflow-hidden">
      <div className="absolute z-10 size-6 rounded left-2 top-2 shrink-0 border bg-stone-200 dark:bg-stone-800" />
      <div className="w-full h-full grid grid-rows-[1fr_calc(28px+24px+4px+16px+1px)]">
        <div className="relative">
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-neutral-500/50 font-extrabold -rotate-20">
            Placeholder
          </p>
        </div>
        <div className="w-full flex justify-between items-center gap-2 p-2 border-t dark:bg-stone-900" />
      </div>
    </DashedBackground>
  );
}
