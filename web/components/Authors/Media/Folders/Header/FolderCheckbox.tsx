import { Button } from "../../../../Button";
import { Checkbox } from "../../../../Fieldset/Checkbox";

export default function FolderCheckbox({
  selectedFolders = 0,
}: {
  selectedFolders?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="folders-select-all">
        <Checkbox id="folders-select-all" className="size-6" />
      </label>
      <div className="flex items-center gap-2 [&_span]:text-sm [&_span]:text-nowrap [&_span]:text-neutral-600 dark:[&_span]:text-neutral-500">
        <span>
          {selectedFolders != 1
            ? selectedFolders + " pastas"
            : selectedFolders + " pasta"}
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
