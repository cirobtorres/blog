"use server";

import { cookies } from "next/headers";
import { Suspense } from "react";
import MediaFolderCards, {
  MediaFolderCardsLoading,
} from "../../../../../components/Authors/Media/AuthorsMediaPage/FolderSection";

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
    <Suspense fallback={<MediaFolderCardsLoading />}>
      <MediaFolderCards
        accessToken={accessToken?.value}
        currentPath={currentPath}
        searchParams={resolvedParams}
      />
    </Suspense>
  );
}
