"use server";

import { cookies } from "next/headers";
import { Suspense } from "react";
import { Skeleton } from "../../../../components/Skeleton";
import MediaFileCards from "../../../../components/Authors/Media/AuthorsMediaPage/FileSection";
import MediaFolderCards from "../../../../components/Authors/Media/AuthorsMediaPage/FolderSection";

export default async function AuthorsMediaPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; size?: string; folder?: string }>;
}) {
  const cookie = cookies();
  const accessToken = (await cookie).get("access_token");
  const resolvedParams = await searchParams;
  return (
    <>
      <Suspense fallback={<MediaFolderCardsLoading />}>
        <MediaFolderCards
          accessToken={accessToken?.value}
          searchParams={resolvedParams}
        />
      </Suspense>
      <div className="w-full h-px my-6 bg-linear-to-r dark:from-transparent dark:via-stone-700 dark:to-transparent" />
      <Suspense fallback={<MediaFileCardsLoading />}>
        <MediaFileCards
          accessToken={accessToken?.value}
          searchParams={resolvedParams}
        />
      </Suspense>
    </>
  );
}

const MediaFolderCardsLoading = () => (
  <div className="w-full flex flex-col gap-2">
    <h2 className="text-xl flex items-center">
      Pastas &#40;
      <Skeleton className="size-6" />
      &#41;
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

const MediaFileCardsLoading = () => (
  <section className="flex flex-col items-start justify-center gap-2">
    <h2 className="text-xl flex items-center">
      Arquivos &#40;{<Skeleton className="size-6" />}&#41;
    </h2>
    <div className="w-full flex justify-between items-center gap-2">
      <div className="flex items-center gap-2">
        <Skeleton className="size-7" />
        <Skeleton className="w-14 h-6" />
        <Skeleton className="w-30 h-8" />
        <Skeleton className="w-30 h-8" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="w-40 h-8" />
        <Skeleton className="w-22 h-8" />
      </div>
    </div>
    <div className="w-full flex justify-center items-center gap-1">
      <Skeleton className="w-20 h-8" />
      <Skeleton className="size-8" />
      <Skeleton className="size-8" />
      <Skeleton className="size-8" />
      <Skeleton className="w-20 h-8" />
    </div>
    <div className="w-full grid grid-cols-3 items-center gap-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton
          key={index}
          className="w-full max-w-100 h-65 shrink-0 overflow-hidden rounded-lg not-dark:shadow"
        />
      ))}
    </div>
  </section>
);
