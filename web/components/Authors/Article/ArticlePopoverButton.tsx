import { buttonVariants, cn } from "../../../utils/variants";
import { Button } from "../../Button";
import { Popover, PopoverContent, PopoverTrigger } from "../../Popover";

export function ArticlePopoverButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="size-8">
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
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="max-w-fit">
        <Button variant="outline" className="w-full max-w-30 h-8">
          Preview
        </Button>
        <Button variant="outline" disabled className="w-full max-w-30 h-8">
          Despublicar
        </Button>
        <Button variant="destructive" className="w-full max-w-30 h-8">
          Excluir
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export function ButtonPlaceholder() {
  return (
    <div
      className={cn(
        buttonVariants({ variant: "outline" }),
        "cursor-auto size-8 opacity-50 hover:text-neutral-500 hover:bg-stone-200 dark:hover:bg-stone-900 dark:hover:text-neutral-400 hover:border-stone-300 dark:hover:border-stone-700",
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
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>
    </div>
  );
}
