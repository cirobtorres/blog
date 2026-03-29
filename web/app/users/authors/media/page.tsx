"use server";

import { cookies } from "next/headers";
import { Suspense } from "react";
import { Hr } from "../../../../components/utils";
import MediaFileCards from "../../../../components/Authors/Media/Files/Cards/MediaFileCards";
import FolderCardsLoading from "../../../../components/Authors/Media/Folders/Cards/FolderCardsLoading";
import FolderCards from "../../../../components/Authors/Media/Folders/Cards/FolderCards";
import MediaFileCardsLoading from "../../../../components/Authors/Media/Files/Cards/MediaFileCardsLoading";

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
      <Suspense fallback={<FolderCardsLoading />}>
        <FolderCards accessToken={accessToken?.value} />
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
