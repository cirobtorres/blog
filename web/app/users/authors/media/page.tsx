"use server";

import { cookies } from "next/headers";
import { Suspense } from "react";
import { Hr } from "../../../../components/utils";
import MediaFileCards from "../../../../components/Authors/Media/Files/Cards/FileCardLinks";
import FolderCardsLoading from "../../../../components/Authors/Media/Folders/Cards/FolderCardsLoading";
import FolderCardLinks from "../../../../components/Authors/Media/Folders/Cards/FolderCardLinks";
import FileCardsLoading from "../../../../components/Authors/Media/Files/Cards/FileCardsLoading";

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
        <FolderCardLinks accessToken={accessToken?.value} />
      </Suspense>
      <Hr className="my-6" />
      <Suspense fallback={<FileCardsLoading />}>
        <MediaFileCards
          accessToken={accessToken?.value}
          searchParams={resolvedParams}
        />
      </Suspense>
    </>
  );
}
