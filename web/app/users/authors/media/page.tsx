import { Suspense } from "react";
import MediaFileCards from "../../../../components/Users/Authors/Media/Files/Cards/FileCardLinks";
import FolderCardsLoading from "../../../../components/Users/Authors/Media/Folders/Cards/FolderCardsLoading";
import FolderCardLinks from "../../../../components/Users/Authors/Media/Folders/Cards/FolderCardLinks";
import { FileCardsLoading } from "../../../../components/Users/Authors/Media/Files/Cards/FileCardUtils";

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
      <Hr />
      <Suspense fallback={<FileCardsLoading />}>
        <MediaFileCards searchParams={resolvedParams} />
      </Suspense>
      {/* <FileCardsLoading /> */}
    </>
  );
}

const Hr = () => (
  <div className="w-full h-px my-6 bg-linear-to-r dark:from-transparent via-stone-400 dark:via-stone-700 dark:to-transparent" />
);
