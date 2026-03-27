import {
  AlertDialogExitConfirmation,
  AlertDialogFooter,
  AlertDialogHeaderPrimitive,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../AlertDialog";
import { Button } from "../../../../Button";
import Spinner from "../../../../Spinner";

export function Trigger({
  setOpenStep,
}: {
  setOpenStep: (value: "upload" | "preview" | null) => void;
}) {
  return (
    <AlertDialogTrigger asChild>
      <Button
        className="w-full max-w-44 h-8"
        onClick={() => setOpenStep("upload")}
      >
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
    </AlertDialogTrigger>
  );
}

export function Header({
  setOpenStep,
  setFiles,
}: {
  setOpenStep: (
    value: React.SetStateAction<"upload" | "preview" | null>,
  ) => void;
  setFiles: (value: React.SetStateAction<File[]>) => void;
}) {
  return (
    <AlertDialogHeaderPrimitive>
      <AlertDialogTitle>Adicione arquivos</AlertDialogTitle>
      <AlertDialogExitConfirmation
        onConfirm={() => {
          setOpenStep(null);
          setFiles([]);
        }}
      >
        Os arquivos serão descartados. Deseja realmente sair?
      </AlertDialogExitConfirmation>
    </AlertDialogHeaderPrimitive>
  );
}

export function Footer({
  isPending,
  setOpenStep,
  setFiles,
}: {
  isPending: boolean;
  setOpenStep: (
    value: React.SetStateAction<"upload" | "preview" | null>,
  ) => void;
  setFiles: (value: React.SetStateAction<File[]>) => void;
}) {
  return (
    <AlertDialogFooter>
      <AlertDialogExitConfirmation
        location="footer"
        onConfirm={() => {
          setOpenStep(null);
          setFiles([]);
        }}
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
  );
}
