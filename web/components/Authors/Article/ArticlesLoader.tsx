import { Skeleton } from "../../Skeleton";
import Spinner from "../../Spinner";

export const LoadingSkeleton = () => (
  <section className="w-full max-w-6xl mx-auto px-2 flex-1 flex flex-col">
    <div className="flex justify-between items-center my-6">
      <h1 className="w-full text-3xl font-extrabold">Escrever novo artigo</h1>
      <div className="w-full flex justify-end items-center gap-2">
        <Skeleton className="w-full max-w-30 h-8" />
        <Skeleton className="w-full max-w-30 h-8" />
        <Skeleton className="size-8" />
      </div>
    </div>
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex gap-2">
        <div className="w-full">
          <Skeleton className="w-full max-w-24 h-6 mb-2" />
          <Skeleton className="w-full max-w-138.5 h-14.5" />
        </div>
        <div className="w-full">
          <Skeleton className="w-full max-w-28 h-6 mb-2" />
          <Skeleton className="w-full max-w-138.5 h-14.5" />
        </div>
      </div>
      <div className="w-full flex gap-2">
        <div className="w-full">
          <Skeleton className="w-full max-w-16 h-6 mb-2" />
          <Skeleton className="w-full max-w-138.5 h-9.5" />
        </div>
        <div className="w-full">
          <Skeleton className="w-full max-w-34 h-6 mb-2" />
          <Skeleton className="w-full max-w-138.5 h-9.5" />
        </div>
      </div>
      <Skeleton className="w-full aspect-[calc(21/9)]" />
    </div>
    <div className="flex items-center gap-1 mt-2 mx-auto">
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="w-full max-w-14 flex flex-col flex-1 gap-1 shrink-0"
        >
          <Skeleton className="size-14" />
          <Skeleton className="w-full max-w-10 mx-auto h-4" />
        </div>
      ))}
    </div>
  </section>
);

export const LoadingSpin = () => (
  <section className="w-full max-w-6xl h-full mx-auto flex flex-col">
    <div className="w-full h-full flex flex-col items-center my-6">
      <h1 className="w-full text-3xl font-extrabold">Escrever novo artigo</h1>
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    </div>
  </section>
);
