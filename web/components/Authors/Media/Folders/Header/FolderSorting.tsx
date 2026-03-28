import { Button } from "../../../../Button";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../Popover";

export default function FolderSorting() {
  return (
    <div className="w-full flex justify-end items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full max-w-40 h-8">
            Mais recentes{" "}
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
              <path d="m6 9 6 6 6-6" />
            </svg>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="rounded">
          <p>TODO</p>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full max-w-22 h-8">
            Filtros{" "}
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
              <path d="M2 5h20" />
              <path d="M6 12h12" />
              <path d="M9 19h6" />
            </svg>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="rounded">
          <p>TODO</p>
        </PopoverContent>
      </Popover>
    </div>
  );
}
