import { FileProvider } from "../../../../../providers/FileProvider";
import { apiServerUrls } from "../../../../../routing/routes";
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
