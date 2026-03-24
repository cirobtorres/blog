"use server";

import { cookies } from "next/headers";
import { Suspense } from "react";
import MediaFileCards, {
  MediaFileCardsLoading,
} from "../../../../components/Authors/Media/AuthorsMediaPage/FileSection";
import MediaFolderCards, {
  MediaFolderCardsLoading,
} from "../../../../components/Authors/Media/AuthorsMediaPage/FolderSection";

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
