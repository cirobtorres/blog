import { FileProvider } from "../../../../../providers/FileProvider";
import { apiServerUrls } from "../../../../../routing/routes";
import { DashedBackground } from "../../../../DashedBackground";
import MediaFileCheckbox from "../Header/MediaFileCheckbox";
import MediaFileSearch from "../Header/MediaFileSearch";
import MediaFilesSorting from "../Header/MediaFilesSorting";
import MediaPagination from "../Pagination/MediaPagination";
import MediaFileCard from "./MediaFileCard";

export default async function MediaFileCards({
  accessToken,
  currentPath,
  searchParams,
}: {
  accessToken?: string;
  currentPath?: string[];
  searchParams?: { [key: string]: string | undefined };
}) {
  const decodedPath = currentPath
    ? currentPath.map((segment) => decodeURIComponent(segment)).join("/")
    : "";

  const folderPath = decodedPath.startsWith("/")
    ? decodedPath
    : "/" + decodedPath;

  const query = new URLSearchParams({
    folder: folderPath,
    q: searchParams?.q || "",
    page: searchParams?.page || "0",
    size: searchParams?.size || "20",
  });

  const filterKeys = ["createdAt", "updatedAt", "type"];

  filterKeys.forEach((key) => {
    const paramValue = searchParams?.[key];

    if (paramValue) {
      query.append(key, paramValue);
    }
  });

  const getUrl = `${apiServerUrls.media.root}?${query.toString()}`;
  const countUrl = `${apiServerUrls.media.count}?${query.toString()}`;

  const options = {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { tags: ["files"] },
  };

  const [mediaPromise, count] = await Promise.all([
    fetch(getUrl, options).then(
      (res) => res.json() as Promise<MediaResponsePageable>,
    ),
    fetch(countUrl, options).then((res) => res.json() as Promise<number>),
  ]);

  const { content: media, page } = mediaPromise;

  return (
    <FileProvider>
      <section className="flex flex-col items-start justify-center gap-2">
        <h2 className="text-xl flex items-center">
          Arquivo{count > 1 && "s"}: {count}
        </h2>
        <div className="w-full flex justify-between items-center gap-2">
          <MediaFileCheckbox allFiles={media ?? []} />
          <div className="w-full flex justify-end items-center mr-0 ml-auto gap-2">
            <MediaFileSearch />
            <MediaFilesSorting />
          </div>
        </div>
        <MediaPagination {...page} />
        <div className="w-full grid grid-cols-3 items-center gap-2">
          {media?.map(({ ...file }) => (
            <MediaFileCard key={file.publicId} file={file} />
          ))}
        </div>
        <MediaPagination {...page} />
      </section>
    </FileProvider>
  );
}

// export function MediaFileCardGhost({
//   isFolderEmpty,
// }: {
//   isFolderEmpty: boolean;
// }) {
//   return (
//     isFolderEmpty &&
//     Array.from({ length: 3 }).map((_, i) => (
//       <DashedBackground
//         key={i}
//         className="opacity-25 relative w-full max-w-100 h-65 flex flex-col shrink-0 items-center transition-border duration-300 rounded-lg border not-dark:shadow bg-stone-200 dark:bg-stone-900 overflow-hidden"
//       >
//         <div className="absolute z-10 size-6 rounded left-2 top-2 shrink-0 border bg-stone-200 dark:bg-stone-800" />
//         <div className="w-full h-full grid grid-rows-[1fr_calc(28px+24px+4px+16px+1px)]">
//           <div className="relative">
//             <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-neutral-500/50 font-extrabold -rotate-20">
//               Placeholder
//             </p>
//           </div>
//           <div className="w-full flex justify-between items-center gap-2 p-2 border-t dark:bg-stone-900" />
//         </div>
//       </DashedBackground>
//     ))
//   );
// }
