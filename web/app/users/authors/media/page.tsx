"use server";

import { Button } from "../../../../components/Buttons";
import { Checkbox } from "../../../../components/Fieldset/Checkbox";
import { cn, focusRing } from "../../../../utils/variants";
import { HomePagination } from "../../../../components/Pagination";
import { FolderUpIcon } from "../../../../components/Icons";
import { MediaFileCard } from "../../../../components/Authors/Media/MediaFileCard";

export default async function AuthorsMediaPage() {
  return (
    <>
      <div className="flex items-center gap-2">
        <label htmlFor="select-all">
          <Checkbox id="select-all" className="size-6" />
        </label>
        <div className="flex items-center gap-2 [&_span]:text-sm [&_span]:text-nowrap [&_span]:text-neutral-600 dark:[&_span]:text-neutral-500">
          <span>1 pasta</span>
          <span>-</span>
          <span>1 asset</span>
        </div>
        <Button variant="destructive" className="h-8 w-full max-w-30">
          Excluir
        </Button>
        <Button variant="link" className="h-8 w-full max-w-30">
          Mover
        </Button>
      </div>
      <section className="flex flex-col items-start justify-center gap-2">
        <h2 className="text-xl">Pastas &#40;7&#41;</h2>
        <div className="flex items-center gap-2">
          <MediaFoldersHeader />
        </div>
        <div className="w-full grid grid-cols-4 items-center gap-2">
          <MediaFolders />
        </div>
        <HomePagination />
      </section>
      <hr className="dark:border-stone-800" />
      <section className="flex flex-col items-start justify-center gap-2">
        <h2 className="text-xl">Arquivos &#40;6&#41;</h2>
        <MediaFilesHeader />
        <div className="w-full grid grid-cols-3 items-center gap-2">
          {Array.from({ length: 7 }).map((_, index) => (
            // TODO
            // Files might be image, video, audio etc
            // There must be a standard "src" for files with no supported image
            <MediaFileCard
              key={index}
              id={index.toString()}
              src={"https://placehold.co/1600x1080/000/fff/jpeg"}
            />
          ))}
        </div>
        <HomePagination />
      </section>
    </>
  );
}

const MediaFolders = () =>
  Array.from({ length: 7 }).map((_, index) => (
    <label
      key={index}
      htmlFor={"folder-" + index}
      className="relative w-full flex-1 flex shrink-0 items-center gap-2 py-2 px-3 transition-border duration-300 rounded border hover:border-primary not-dark:shadow bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-stone-300 dark:has-data-[state=checked]:bg-stone-800 focus-within:border-primary dark:focus-within:border-primary focus-within:bg-stone-300 dark:focus-within:bg-stone-800 group"
    >
      <Checkbox id={"folder-" + index} />
      <FolderUpIcon
        folderId={index.toString()}
        className={cn(
          "rounded-lg p-3 transition-all duration-300 border border-stone-300 dark:border-stone-800 bg-stone-200 dark:bg-stone-925 group-hover:border-stone-400 dark:group-hover:border-stone-700 group-hover:bg-stone-300 dark:group-hover:bg-stone-900 group-focus-within:border-stone-400 dark:group-focus-within:border-stone-700 group-focus-within:bg-stone-300 dark:group-focus-within:bg-stone-900",
          focusRing,
        )}
      />
      <div className="flex flex-col gap-1">
        <p className="text-neutral-100">Nome</p>
        <p className="text-xs text-nowrap text-neutral-400">
          0 folder, 1 asset
        </p>
      </div>
      <div className="absolute top-2 right-2 flex items-center gap-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-has-data-[state=checked]:opacity-100">
        <Button variant="outline" className="size-8 not-dark:shadow-none">
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
            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
          </svg>
        </Button>
      </div>
    </label>
  ));

const MediaFoldersHeader = () => (
  <>
    <Button variant="outline" className="h-8">
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
    <Button variant="outline" className="h-8">
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
  </>
);

const MediaFilesHeader = () => (
  <div className="flex items-center gap-2">
    <Button variant="outline" className="h-8">
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
    <Button variant="outline" className="h-8">
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
  </div>
);
