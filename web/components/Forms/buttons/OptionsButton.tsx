import { Button } from "../../Buttons";
import { Popover, PopoverContent, PopoverTrigger } from "../../Popover";

export function OptionsButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" className="size-8">
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
      <PopoverContent className="max-w-fit">
        <button>Despublicar</button>
        <button>Excluir</button>
      </PopoverContent>
    </Popover>
  );
}
