"use server";

import { AddFolderButton } from "../../../../components/Authors/Media/Folders/Add";
import { AddFilesButton } from "../../../../components/Authors/Media/Files/Add/AddFilesButton";
import MediaBreadcrumb from "../../../../components/Authors/Media/MediaBreadcrumb";
import MediaFolderProdiver from "../../../../providers/MediaFolderProdiver";

export default async function MediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col gap-2 p-2">
      <MediaFolderProdiver>
        <div className="flex justify-between items-center gap-2">
          <h1 className="text-3xl font-extrabold my-6">Biblioteca de Mídia</h1>
          <div className="flex-1 flex justify-end items-center gap-2">
            <AddFolderButton />
            <AddFilesButton />
          </div>
        </div>
        <MediaBreadcrumb />
        {children}
      </MediaFolderProdiver>
    </div>
  );
}
