import { Skeleton } from "../../../../Skeleton";

export default function FileCardsLoading() {
  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <h2 className="text-xl flex items-center">
        Arquivos: {<Skeleton className="size-7" />}
      </h2>
      <div className="w-full flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="w-32 h-8.5 flex items-center rounded-lg" />
          <Skeleton className="w-30 h-8.5" />
          <Skeleton className="w-30 h-8.5" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="size-8.5" />
          <Skeleton className="w-22 h-8.5" />
        </div>
      </div>
      <div className="w-full grid grid-cols-3 items-center gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            className="w-full max-w-100 h-65 shrink-0 overflow-hidden rounded-lg not-dark:shadow"
          />
        ))}
      </div>
    </div>
  );
}

export function FileCardsLoadingSimplified() {
  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <h2 className="text-xl flex items-center">
        Arquivos: {<Skeleton className="size-7" />}
      </h2>
      {/* <div className="flex ml-auto mr-0 items-center gap-2">
        <Skeleton className="size-8.5" />
        <Skeleton className="w-22 h-8.5" />
      </div> */}
      <div className="w-full grid grid-cols-3 items-center gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            className="w-full max-w-100 h-65 shrink-0 overflow-hidden rounded-lg not-dark:shadow"
          />
        ))}
      </div>
    </div>
  );
}
