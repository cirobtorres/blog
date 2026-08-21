import { Skeleton } from "../../../../../Skeleton";

export default function FolderCardsLoading() {
  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="text-xl flex items-center">
        Pastas: <Skeleton className="size-7" />
      </h2>
      <div className="flex sm:flex-row flex-col sm:items-center gap-2">
        <Skeleton className="w-32 h-8.5 flex items-center rounded-lg" />
        <div className="flex gap-2">
          <Skeleton className="w-30 h-8.5" />
          <Skeleton className="w-30 h-8.5" />
        </div>
      </div>
      <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            className="w-full max-w-full h-18 shrink-0 rounded"
          />
        ))}
      </div>
    </div>
  );
}

export function FolderCardsLoadingSimplified() {
  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="text-xl flex items-center">
        Pastas: <Skeleton className="size-7" />
      </h2>
      <div className="w-full grid grid-cols-3 items-center gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            className="w-full max-w-80 h-18 shrink-0 rounded"
          />
        ))}
      </div>
    </div>
  );
}
