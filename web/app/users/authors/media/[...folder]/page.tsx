"use server";

import { cookies } from "next/headers";
import { Suspense } from "react";
import { Hr } from "../../../../../components/utils";
import MediaFileCards from "../../../../../components/Authors/Media/Files/Cards/MediaFileCards";
import FolderCardsLoading from "../../../../../components/Authors/Media/Folders/Cards/FolderCardsLoading";
import FolderCards from "../../../../../components/Authors/Media/Folders/Cards/FolderCards";
import MediaFileCardsLoading from "../../../../../components/Authors/Media/Files/Cards/MediaFileCardsLoading";

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
      <Suspense fallback={<FolderCardsLoading />}>
        <FolderCards
          accessToken={accessToken?.value}
          currentPath={currentPath}
        />
      </Suspense>
      <Hr className="my-6" />
      <Suspense fallback={<MediaFileCardsLoading />}>
        <MediaFileCards
          accessToken={accessToken?.value}
          currentPath={currentPath}
          searchParams={resolvedParams}
        />
      </Suspense>
    </>
  );
}
