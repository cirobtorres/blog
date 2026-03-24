"use server";

import { cookies } from "next/headers";
import { AddFolderButton } from "../../../../components/Authors/Media/AddFolderButton";
import { apiServerUrls } from "../../../../routing/routes";
import { AddFilesButton } from "../../../../components/Authors/Media/AddFilesButton";
import MediaBreadcrumb from "../../../../components/Authors/Media/MediaBreadcrumb";

export default async function MediaLayout({
  params,
  children,
}: {
  params: Promise<{ folder?: string[] }>;
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const currentPath = (await params).folder;
  const currentFolder = currentPath ? currentPath.join("/") : "Home";
  const queryFolder = "?folder=" + encodeURIComponent(currentFolder);

  const folderResponse = await fetch(
    apiServerUrls.mediaFolders.root + queryFolder,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    },
  );

  const folders: MediaFolder[] = folderResponse.ok
    ? await folderResponse.json()
    : [
        {
          path: "Home",
          name: "Home",
          subfolderCount: 0,
          fileCount: 0,
        },
      ];

  return (
    <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col gap-2 p-2">
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-3xl font-extrabold my-6">Biblioteca de Media</h1>
        <div className="flex-1 flex justify-end items-center gap-2">
          <AddFolderButton
            existingFolders={folders.map((folder) => folder.path)}
          />
          <AddFilesButton />
        </div>
      </div>
      <MediaBreadcrumb />
      {children}
    </div>
  );
}
