import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../../AlertDialog";
import { Button } from "../../Button";

export function ArticleEditorBanner() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <fieldset className="cursor-pointer relative w-full flex justify-center items-center aspect-[calc(21/9)] border rounded overflow-hidden not-dark:shadow bg-stone-200 dark:bg-stone-900">
          <label
            id="article-banner"
            htmlFor="article-banner"
            className="size-1/2 flex flex-col justify-center items-center rounded-xl border border-dashed text-sm text-neutral-400 dark:text-neutral-500"
          >
            <input
              id="article-banner"
              name="articleBanner"
              type="file"
              accept="image/*"
              hidden
              className="hidden"
            />
            Clique aqui ou arraste e solte a imagem
          </label>
        </fieldset>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form>
          <AlertDialogHeader>Adicionar imagem</AlertDialogHeader>
          <AlertDialogDescription className="p-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            omnis autem debitis dolorem exercitationem.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-full max-w-30 h-8">
              Cancelar
            </AlertDialogCancel>
            <Button
              type="submit"
              variant="default"
              className="w-full max-w-30 h-8"
            >
              Salvar
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
