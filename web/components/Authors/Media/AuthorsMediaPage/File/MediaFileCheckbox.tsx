import { Button } from "../../../../Button";
import { Checkbox } from "../../../../Fieldset/Checkbox";

export default function MediaFileCheckbox({
  selectedFiles = 0,
}: {
  selectedFiles?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="files-select-all">
        <Checkbox id="files-select-all" className="size-6" />
      </label>
      <div className="flex items-center gap-2 [&_span]:text-sm [&_span]:text-nowrap [&_span]:text-neutral-600 dark:[&_span]:text-neutral-500">
        <span>
          {selectedFiles != 1
            ? selectedFiles + " arquivos"
            : selectedFiles + " arquivo"}
        </span>
      </div>
      <Button variant="destructive" disabled className="h-8 w-full max-w-30">
        Excluir
      </Button>
      <Button variant="link" disabled className="h-8 w-full max-w-30">
        Mover
      </Button>
    </div>
  );
}
