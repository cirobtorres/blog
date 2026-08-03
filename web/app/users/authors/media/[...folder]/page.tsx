import { Suspense } from "react";
import MediaFileCards from "../../../../../components/Users/Authors/Media/Files/Cards/FileCardLinks";
import FolderCardsLoading from "../../../../../components/Users/Authors/Media/Folders/Cards/FolderCardsLoading";
import FolderCardLinks from "../../../../../components/Users/Authors/Media/Folders/Cards/FolderCardLinks";
import { FileCardsLoading } from "../../../../../components/Users/Authors/Media/Files/Cards/FileCardUtils";

export default async function AuthorsMediaFolderPage({
  params,
  searchParams,
}: {
  params: Promise<{ folder?: string[] }>;
  searchParams: Promise<{ page?: string; size?: string }>;
}) {
  const currentPath = (await params).folder;
  const resolvedParams = await searchParams;

  return (
    <>
      <Suspense fallback={<FolderCardsLoading />}>
        <FolderCardLinks currentPath={currentPath} />
      </Suspense>
      <Hr />
      <Suspense fallback={<FileCardsLoading />}>
        <MediaFileCards
          currentPath={currentPath}
          searchParams={resolvedParams}
        />
      </Suspense>
    </>
  );
}

const Hr = () => (
  <div className="w-full h-px my-6 bg-linear-to-r dark:from-transparent via-stone-400 dark:via-stone-700 dark:to-transparent" />
);
