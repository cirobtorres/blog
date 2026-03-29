import {
  AlertDialogContent,
  AlertDialogDescription,
} from "../../../../AlertDialog";
import CardPreview from "./CardPreview";
import { Footer, Header } from "./Dialog";

export default function DialogCardsContent({
  files,
  setFiles,
  openStep,
  setOpenStep,
  state,
  action,
  isPending,
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
}) {
  return (
    openStep === "preview" && (
      <AlertDialogContent>
        <Header setOpenStep={setOpenStep} setFiles={setFiles} />
        <form action={action}>
          <AlertDialogDescription className="sr-only">
            Lista de cards de arquivos selecionados para upload. Você pode
            revisar os nomes, tamanhos e tipos de {files.length} arquivo(s)
            antes de confirmar o salvamento.
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
          <Footer
            isPending={isPending}
            setOpenStep={setOpenStep}
            setFiles={setFiles}
          />
        </form>
      </AlertDialogContent>
    )
  );
}
