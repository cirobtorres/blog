import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../AlertDialog";
import { Button } from "../../../../Buttons";
import {
  Fieldset,
  FieldsetError,
  FieldsetInput,
  FieldsetLabel,
} from "../../../../Fieldset";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../Select";

export function AddFolderButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link" className="w-full max-w-44 h-8">
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
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Criar pasta
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="ring-4 border-4 max-w-200 p-0 overflow-hidden">
        <AlertDialogHeader className="relative h-14.25 flex justify-between items-center border-b p-4 dark:bg-stone-900">
          <AlertDialogTitle>Criar pasta</AlertDialogTitle>
          <AlertDialogCancel className="absolute top-1/2 -translate-y-1/2 right-3 size-8">
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </AlertDialogCancel>
        </AlertDialogHeader>
        <AlertDialogDescription className="sr-only"></AlertDialogDescription>
        <div className="w-full flex flex-row items-center gap-2 px-4">
          <Fieldset className="flex-1">
            <FieldsetInput id="folder-name" />
            <FieldsetLabel htmlFor="folder-name" label="Nome" />
          </Fieldset>
          <Select>
            <SelectTrigger className="w-full flex-1">
              <SelectValue placeholder="Teste" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Array.from({ length: 50 }).map((_, index) => (
                  <SelectItem key={index} value={"teste-" + index}>
                    Teste-{index}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <FieldsetError />
        <AlertDialogFooter className="flex justify-between items-center sm:justify-between flex-row sm:flex-row">
          <AlertDialogCancel className="w-full max-w-30 h-8">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction className="w-full max-w-30 h-8">
            Salvar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
