import { DashedBackground } from "../../../../DashedBackground";

export default function FolderCardGhost() {
  return (
    <DashedBackground className="relative opacity-25 w-full max-w-70 h-18 flex-1 flex shrink-0 items-center gap-2 rounded border not-dark:shadow py-2 px-8 bg-stone-200 dark:bg-stone-900 overflow-hidden">
      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-neutral-500/50 font-extrabold -rotate-20">
        Placeholder
      </p>
    </DashedBackground>
  );
}
