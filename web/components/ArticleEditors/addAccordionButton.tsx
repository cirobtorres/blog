import { cn, focusRing, hoverRing } from "../../utils/variants";
import { Button } from "../Buttons";
import { Popover, PopoverContentClipPath, PopoverTrigger } from "../Popover";

export function AddAccordionButton({
  addBlock,
}: {
  addBlock: (type: Blocks["type"]) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "w-fit cursor-pointer border rounded p-2 mx-auto text-neutral-500 dark:text-neutral-500 bg-container border-stone-300 dark:border-stone-700 dark:bg-stone-800 transition-all duration-300 hover:text-neutral-900 hover:bg-stone-250 dark:hover:text-neutral-100 dark:hover:bg-stone-750 data-[state=open]:text-neutral-900 data-[state=open]:bg-stone-250 dark:data-[state=open]:text-neutral-100 dark:data-[state=open]:bg-stone-750 focus-visible:text-neutral-900 focus-visible:bg-stone-250 dark:focus-visible:text-neutral-100 dark:focus-visible:bg-stone-750 not-dark:shadow",
          hoverRing,
          focusRing,
        )}
      >
        <OpenButton />
      </PopoverTrigger>
      <PopoverContentClipPath
        side="top"
        className="rounded-lg p-2 not-dark:shadow"
      >
        <div className="w-40 grid grid-cols-3 gap-1">
          <EditorButton onClick={() => addBlock("html")} />
          <CodeButton />
          <AccordionButton />
          <ImageButton />
          <ImagesButton />
          <VideoButton />
        </div>
        <div className="py-2 pb-0">
          <p className="text-center text-sm text-primary pointer-events-none">
            Editores
          </p>
        </div>
      </PopoverContentClipPath>
    </Popover>
  );
}

const OpenButton = () => (
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
    <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l8.58-3.9a1 1 0 0 0 0-1.831z" />
    <path d="M16 17h6" />
    <path d="M19 14v6" />
    <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 .825.178" />
    <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l2.116-.962" />
  </svg>
);

const EditorButton = ({ onClick }: { onClick: () => void }) => (
  <div className={addAccDivStyle}>
    <Button variant="outline" onClick={onClick} className={addAccBtnStyle}>
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
        className="size-fit"
      >
        <path d="M10 9v7" />
        <path d="M14 6v10" />
        <circle cx="17.5" cy="12.5" r="3.5" />
        <circle cx="6.5" cy="12.5" r="3.5" />
      </svg>
    </Button>
    <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500">
      Editor
    </span>
  </div>
);

const ImageButton = () => (
  <div className={addAccDivStyle}>
    <Button variant="outline" className={addAccBtnStyle}>
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
        className="size-fit"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    </Button>
    <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500">
      Imagem
    </span>
  </div>
);

const ImagesButton = () => (
  <div className={addAccDivStyle}>
    <Button variant="outline" className={addAccBtnStyle}>
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
        className="size-fit"
      >
        <path d="M16 5h6" />
        <path d="M19 2v6" />
        <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        <circle cx="9" cy="9" r="2" />
      </svg>
    </Button>
    <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500">
      Imagem
    </span>
  </div>
);

const VideoButton = () => (
  <div className={addAccDivStyle}>
    <Button variant="outline" className={addAccBtnStyle}>
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
        className="size-fit"
      >
        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
        <rect x="2" y="6" width="14" height="12" rx="2" />
      </svg>
    </Button>
    <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500">
      Vídeo
    </span>
  </div>
);

const CodeButton = () => (
  <div className={addAccDivStyle}>
    <Button variant="outline" className={addAccBtnStyle}>
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
        className="size-fit"
      >
        <path d="m16 18 6-6-6-6" />
        <path d="m8 6-6 6 6 6" />
      </svg>
    </Button>
    <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500">
      Code
    </span>
  </div>
);

const AccordionButton = () => (
  <div className={addAccDivStyle}>
    <Button variant="outline" className={addAccBtnStyle}>
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
        className="size-fit"
      >
        <path d="M3 5h8" />
        <path d="M3 12h8" />
        <path d="M3 19h8" />
        <path d="m15 8 3-3 3 3" />
        <path d="m15 16 3 3 3-3" />
      </svg>
    </Button>
    <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500">
      Acordeão
    </span>
  </div>
);

const addAccDivStyle =
  "size-full flex flex-col justify-center items-center gap-1";

const addAccBtnStyle =
  "size-12 rounded aspect-square border-stone-400 dark:border-stone-700 bg-stone-300 dark:bg-stone-800 transition-all duration-300 dark:hover:bg-stone-750 focus-visible:text-neutral-900 focus-visible:bg-stone-300 dark:focus-visible:text-neutral-100 dark:focus-visible:bg-stone-750";
