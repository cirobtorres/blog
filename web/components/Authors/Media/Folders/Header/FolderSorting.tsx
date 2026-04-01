import { Button } from "../../../../Button";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../Popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../Select";

export default function FolderSorting() {
  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-40 h-8">
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
          <Button variant="outline" className="w-22 h-8">
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
          <Select>
            <SelectTrigger className="w-full flex-1">
              <SelectValue placeholder="createdAt" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="createdAt">createdAt</SelectItem>
              <SelectItem value="updatedAt">updatedAt</SelectItem>
              <SelectItem value="type">type</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full flex-1">
              <SelectValue placeholder="is" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="is">is</SelectItem>
              <SelectItem value="isNot">is not</SelectItem>
              <SelectItem value="isGreaterThan">is greater than</SelectItem>
              <SelectItem value="isGreaterThanOrEqualTo">
                is greater than or equal to
              </SelectItem>
              <SelectItem value="isLowerThan">is lower than</SelectItem>
              <SelectItem value="isLowerThanOrEqualTo">
                is lower than or equal to
              </SelectItem>
            </SelectContent>
          </Select>
          <Button variant="link" className="h-9.5">
            Adicionar filtros
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
