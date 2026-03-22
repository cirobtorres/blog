"use server";

import { cookies } from "next/headers";
import { AddFolderButton } from "../../../../components/Authors/Media/AddFolderButton";
import { apiServerUrls } from "../../../../routing/routes";
import { AddFilesButton } from "../../../../components/Authors/Media/AddFilesButton";

export default async function MediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const res = await fetch(apiServerUrls.media.root + "/folders", {
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ["media-folders"] },
  });

  const folders: string[] = res.ok ? await res.json() : ["Home"];

  return (
    <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col gap-2 p-2">
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-3xl font-extrabold my-6">Biblioteca de Media</h1>
        <div className="flex-1 flex justify-end items-center gap-2">
          <AddFolderButton existingFolders={folders} />
          <AddFilesButton existingFolders={folders} />
        </div>
      </div>
      {children}
    </div>
  );
}
