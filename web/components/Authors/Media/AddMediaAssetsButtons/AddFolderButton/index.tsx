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
      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
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
        <AlertDialogDescription className="sr-only">
          Área de criação de pastas. Você pode criar pastas na raiz, em Home, ou
          até mesmo criar pastas dentro de outras pastas, para melhor
          organização dos seus arquivos de media.
        </AlertDialogDescription>
        <div className="flex flex-col gap-2 p-4">
          <Fieldset className="flex-1">
            <FieldsetInput id="folder-name" />
            <FieldsetLabel htmlFor="folder-name" label="Nome" />
          </Fieldset>
          <Select>
            <SelectTrigger className="w-full flex-1">
              <SelectValue placeholder="Home" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectItem value="Home">Home</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <FieldsetError />
        <AlertDialogFooter>
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
