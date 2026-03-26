"use server";

import { cookies } from "next/headers";
import { Suspense } from "react";
import { Hr } from "../../../../../components/utils";
import MediaFolderCards, {
  MediaFolderCardsLoading,
} from "../../../../../components/Authors/Media/AuthorsMediaPage/Folder/MediaFolderCards";
import MediaFileCards, {
  MediaFileCardsLoading,
} from "../../../../../components/Authors/Media/AuthorsMediaPage/File/MediaFileCards";

export default async function AuthorsMediaFolderPage({
  params,
  searchParams,
}: {
  params: Promise<{ folder?: string[] }>;
  searchParams: Promise<{ page?: string; size?: string }>;
}) {
  const cookie = cookies();
  const accessToken = (await cookie).get("access_token");
  const currentPath = (await params).folder;
  const resolvedParams = await searchParams;

  return (
    <>
      <Suspense fallback={<MediaFolderCardsLoading />}>
        <MediaFolderCards
          accessToken={accessToken?.value}
          currentPath={currentPath}
          searchParams={resolvedParams}
        />
      </Suspense>
      <Hr className="my-6" />
      <Suspense fallback={<MediaFileCardsLoading />}>
        <MediaFileCards
          accessToken={accessToken?.value}
          searchParams={resolvedParams}
        />
      </Suspense>
    </>
  );
}
