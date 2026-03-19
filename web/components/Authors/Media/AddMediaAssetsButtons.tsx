import { Button } from "../../Buttons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../Dialog";
import {
  Fieldset,
  FieldsetError,
  FieldsetInput,
  FieldsetLabel,
} from "../../Fieldset";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Select";

export function AddFolderButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="w-full max-w-40 h-8">
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
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar nova pasta</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="w-full flex flex-col items-center gap-2">
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
        </DialogDescription>
        <FieldsetError />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="w-full max-w-24 h-7">
              Cancelar
            </Button>
          </DialogClose>
          <Button className="w-full max-w-24 h-7">Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AddFilesButton() {
  return (
    <Button className="w-full max-w-40 h-8">
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
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
      Adicionar arquivos
    </Button>
  );
}
