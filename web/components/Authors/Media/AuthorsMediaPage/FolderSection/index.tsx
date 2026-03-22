import { apiServerUrls } from "../../../../../routing/routes";
import { cn, focusRing } from "../../../../../utils/variants";
import { Button } from "../../../../Button";
import { Checkbox } from "../../../../Fieldset/Checkbox";
import { FolderUpIcon } from "../../../../Icons";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../Popover";
import MediaFolderExcludeButton from "./MediaFolderExcludeButton";

export default async function MediaFolderCards({
  accessToken,
  searchParams,
}: {
  accessToken?: string;
  searchParams?: { folder?: string };
}) {
  const currentFolder = searchParams?.folder || "Home";

  const mediaFolders = await fetch(
    apiServerUrls.mediaFolders.root + "?folder=" + currentFolder,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    },
  );

  const countFolders = await fetch(apiServerUrls.mediaFolders.count, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const folders: string[] = await mediaFolders.json();
  const count: number = await countFolders.json();

  return (
    <section className="w-full flex flex-col items-start justify-center gap-2">
      <h2 className="text-xl">Pastas &#40;{count}&#41;</h2>
      <div className="w-full flex justify-between items-center gap-2">
        <MediaFolderMutation />
        <MediaFolderSorting />
      </div>
      <div className="w-full grid items-center grid-cols-4 gap-2">
        {folders.map((folderPath) => (
          <MediaFolderCard key={folderPath} folderPath={folderPath} />
        ))}
      </div>
    </section>
  );
}

const MediaFolderCard = ({
  folderPath,
  folders = 0,
  files = 0,
}: {
  folderPath: string;
  folders?: number;
  files?: number;
}) => {
  const folderName = folderPath.split("/").pop();
  const id = folderPath.replace("/", "-").toLowerCase();
  return (
    <label
      htmlFor={"folder-" + id}
      className="relative w-full max-w-70 flex-1 flex shrink-0 items-center gap-2 py-2 px-3 transition-border duration-300 rounded border hover:border-primary not-dark:shadow bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-stone-300 dark:has-data-[state=checked]:bg-stone-800 focus-within:border-primary dark:focus-within:border-primary focus-within:bg-stone-300 dark:focus-within:bg-stone-800 group"
    >
      <Checkbox id={"folder-" + id} />
      <FolderUpIcon
        folderId={id}
        className={cn(
          "rounded-lg p-3 transition-all duration-300 border border-stone-300 dark:border-stone-800 bg-stone-200 dark:bg-stone-925 group-hover:border-stone-400 dark:group-hover:border-stone-700 group-hover:bg-stone-300 dark:group-hover:bg-stone-900 group-focus-within:border-stone-400 dark:group-focus-within:border-stone-700 group-focus-within:bg-stone-300 dark:group-focus-within:bg-stone-900",
          focusRing,
        )}
      />
      <div className="flex flex-col gap-1 overflow-hidden">
        <p className="text-neutral-100 truncate">{folderName}</p>
        <p className="text-xs text-nowrap text-neutral-400">
          {folders != 1 ? folders + " pastas" : folders + " pasta"},{" "}
          {files != 1 ? files + " arquivos" : files + " arquivo"}
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
        <MediaFolderExcludeButton folderPath={folderPath} />
      </div>
    </label>
  );
};

const MediaFolderMutation = ({
  selectedFolders = 0,
}: {
  selectedFolders?: number;
}) => (
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

const MediaFolderSorting = () => (
  <div className="w-full flex justify-end items-center gap-2">
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full max-w-40 h-8">
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
      </PopoverTrigger>
      <PopoverContent align="end" className="rounded">
        <p>TODO</p>
      </PopoverContent>
    </Popover>
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full max-w-22 h-8">
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
      </PopoverTrigger>
      <PopoverContent align="end" className="rounded">
        <p>TODO</p>
      </PopoverContent>
    </Popover>
  </div>
);
