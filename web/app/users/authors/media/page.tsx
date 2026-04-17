"use server";

import { Suspense } from "react";
import { Hr } from "../../../../components/utils";
import MediaFileCards from "../../../../components/Authors/Media/Files/Cards/FileCardLinks";
import FolderCardsLoading from "../../../../components/Authors/Media/Folders/Cards/FolderCardsLoading";
import FolderCardLinks from "../../../../components/Authors/Media/Folders/Cards/FolderCardLinks";
import { FileCardsLoading } from "../../../../components/Authors/Media/Files/Cards/FileCardUtils";

export default async function AuthorsMediaPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; size?: string; folder?: string }>;
}) {
  const resolvedParams = await searchParams;

  return (
    <>
      <Suspense fallback={<FolderCardsLoading />}>
        <FolderCardLinks />
      </Suspense>
      <Hr className="my-6" />
      <Suspense fallback={<FileCardsLoading />}>
        <MediaFileCards searchParams={resolvedParams} />
      </Suspense>
    </>
  );
}
