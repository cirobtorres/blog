import { Skeleton } from "../../../../Skeleton";

export default function FolderCardsLoading() {
  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="text-xl flex items-center">
        Pastas: <Skeleton className="size-6" />
      </h2>
      <div className="w-full flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="size-6" />
          <Skeleton className="w-14 h-4" />
          <Skeleton className="w-30 h-8" />
          <Skeleton className="w-30 h-8" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-40 h-8" />
          <Skeleton className="w-22 h-8" />
        </div>
      </div>
      <div className="w-full grid grid-cols-4 items-center gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            className="w-full max-w-70 h-18 shrink-0 rounded"
          />
        ))}
      </div>
    </div>
  );
}
