import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogExitConfirmation,
  AlertDialogFooter,
  AlertDialogHeaderPrimitive,
  AlertDialogTitle,
} from "../../../../AlertDialog";
import { Button } from "../../../../Button";
import Spinner from "../../../../Spinner";
import CardPreview from "./CardPreview";

export default function DialogCardsContent({
  files,
  setFiles,
  openStep,
  setOpenStep,
  state,
  action,
  isPending,
  handleReset,
}: {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  openStep: "upload" | "preview" | null;
  setOpenStep: React.Dispatch<
    React.SetStateAction<"upload" | "preview" | null>
  >;
  state: ActionState;
  action: (payload: FormData) => void;
  isPending: boolean;
  handleReset: () => void;
}) {
  return (
    openStep === "preview" && (
      <AlertDialogContent>
        <AlertDialogHeaderPrimitive>
          <AlertDialogTitle>Adicione arquivos</AlertDialogTitle>
          <AlertDialogExitConfirmation onConfirm={handleReset}>
            Os arquivos serão descartados. Deseja realmente sair?
          </AlertDialogExitConfirmation>
        </AlertDialogHeaderPrimitive>
        <form action={action}>
          <AlertDialogDescription className="sr-only">
            Lista de cards de arquivos selecionados para upload. Você pode
            revisar os nomes, tamanhos e tipos de arquivo &#40;s&#41; antes de
            confirmar o salvamento.
          </AlertDialogDescription>
          <div className="p-5 max-h-[60vh] overflow-y-auto grid grid-cols-1 gap-4 m-1 scrollbar">
            {files.map((file, index) => (
              <CardPreview
                key={index}
                index={index}
                file={file}
                state={state}
                onRemove={() => {
                  const newFiles = files.filter((_, i) => i !== index);
                  setFiles(newFiles);
                  if (newFiles.length === 0) setOpenStep("upload");
                }}
              />
            ))}
          </div>
          <AlertDialogFooter>
            <AlertDialogExitConfirmation
              location="footer"
              onConfirm={handleReset}
            >
              Os arquivos serão descartados. Deseja realmente sair?
            </AlertDialogExitConfirmation>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full max-w-30 h-8"
            >
              {isPending && <Spinner />} Salvar
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    )
  );
}
