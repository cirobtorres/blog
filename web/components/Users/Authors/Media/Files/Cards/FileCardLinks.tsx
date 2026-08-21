import { apiServerUrls } from "../../../../../../routing/routes";
import MediaFileCheckbox from "../Header/MediaFileCheckbox";
import MediaFileSearch from "../Header/MediaFileSearch";
import MediaFilesSorting from "../Header/MediaFileSorting";
import FilePaginationURL from "../Pagination/FilePaginationURL";
import { FileCardSectionWrapper, FileCardTitle } from "./FileCardUtils";
import FileCardLink from "./FileCardLink";
import { serverFetch } from "../../../../../../services/serverFetch";
import { cn } from "../../../../../../utils/variants";

const TAG_REVALIDATE_TIME = 60 * 60 * 24 * 7; // 1 week

export default async function FileCardLinks({
  currentPath,
  searchParams,
}: {
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

  const options: RequestInit = {
    next: {
      tags: ["files"],
      revalidate: TAG_REVALIDATE_TIME,
    },
    cache: "force-cache",
  };

  const [mediaPromise, count] = await Promise.all([
    serverFetch(getUrl, options).then(
      (res) => res.json() as Promise<PageableMedia>,
    ),
    serverFetch(countUrl, options).then((res) => res.json() as Promise<number>),
  ]);

  const { content: media, page } = mediaPromise;

  return (
    <FileCardSectionWrapper>
      <FileCardTitle count={count} />
      <div className="w-full flex flex-row max-[850px]:flex-col justify-between items-center gap-2">
        <MediaFileCheckbox allFiles={media ?? []} />
        <div className="w-full mr-0 ml-auto gap-2 flex flex-row max-[500px]:flex-col max-[500px]:items-start items-center max-[850px]:justify-start justify-end">
          <MediaFileSearch />
          <MediaFilesSorting />
        </div>
      </div>
      <FilePaginationURL {...page} />
      <div className="w-full grid grid-cols-3 items-center gap-2">
        {media?.map(({ ...file }) => (
          <FileCardLink key={file.publicId} file={file} />
        ))}
      </div>
      <FilePaginationURL {...page} />
    </FileCardSectionWrapper>
  );
}
