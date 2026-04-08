import { FolderProvider } from "../../../../../providers/FolderProvider";
import { cn } from "../../../../../utils/variants";

export function FolderCardTitle({
  count,
  title,
  className,
}: {
  count: number;
  title?: string;
  className?: string;
}) {
  return (
    <h2 className={cn("text-xl", className)}>
      {title ?? "Pasta"}
      {count > 1 && "s"}: {count}
    </h2>
  );
}

export function FolderCardHeaderButtonsWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full flex justify-between items-center gap-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function FolderCardGridWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("w-full grid grid-cols-4 gap-2", className)}>
      {children}
    </div>
  );
}

export function FolderCardInfos({ folder }: { folder: Folder }) {
  return (
    <div className="flex flex-col gap-1 items-start overflow-hidden">
      <p className="text-neutral-100 truncate">{folder.name}</p>
      <p className="text-xs text-nowrap text-neutral-400">
        {folder.subfolderCount != 1
          ? folder.subfolderCount + " pastas"
          : folder.subfolderCount + " pasta"}
        ,{" "}
        {folder.fileCount != 1
          ? folder.fileCount + " arquivos"
          : folder.fileCount + " arquivo"}
      </p>
    </div>
  );
}

export function FolderCardFloatingButtonsWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute top-2 right-2 flex items-center gap-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-has-data-[state=checked]:opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function FolderCardLinkWrapper({
  children,
  folder,
}: {
  children: React.ReactNode;
  folder: Folder;
}) {
  return (
    <label
      htmlFor={"folder-" + folder.id}
      className="relative w-full max-w-70 flex-1 flex shrink-0 items-center gap-2 py-2 px-3 transition-border duration-300 rounded border hover:border-primary not-dark:shadow bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-stone-300 dark:has-data-[state=checked]:bg-stone-800 focus-within:border-primary dark:focus-within:border-primary focus-within:bg-stone-300 dark:focus-within:bg-stone-800 group"
    >
      {children}
      <FolderCardInfos folder={folder} />
    </label>
  );
}

export function FolderCardSectionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FolderProvider>
      <section className="w-full flex flex-col items-start justify-center gap-2">
        {children}
      </section>
    </FolderProvider>
  );
}
