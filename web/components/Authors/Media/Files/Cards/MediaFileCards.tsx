import MediaFileCheckbox from "../Header/MediaFileCheckbox";
import { apiServerUrls } from "../../../../../routing/routes";
import { MediaFilesSorting } from "../Header/MediaFilesSorting";
import MediaPagination from "../Pagination/MediaPagination";
import MediaFileCard from "./MediaFileCard";
import MediaFileCardGhost from "./MediaFileCardGhost";
import NoCardsFoundPlaceholder from "./MediaFileNoCardsFound";

export default async function MediaFileCards({
  accessToken,
  currentPath,
  searchParams,
}: {
  accessToken?: string;
  currentPath?: string[];
  searchParams?: { page?: string; size?: string; folder?: string };
}) {
  const currentPage = searchParams?.page || "0";
  const decodedPath = currentPath
    ? currentPath.map((segment) => decodeURIComponent(segment)).join("/")
    : "";

  const folderPath = decodedPath.startsWith("/")
    ? decodedPath
    : "/" + decodedPath;

  const query = new URLSearchParams({
    folder: folderPath,
    page: currentPage,
    size: searchParams?.size || "20",
  });

  const getUrl = `${apiServerUrls.media.root}?${query.toString()}`;
  const countUrl = `${apiServerUrls.media.count}?${query.toString()}`;

  const mediaResponse = await fetch(getUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    next: { tags: ["files"] },
  });

  const countResponse = await fetch(countUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    next: { tags: ["files"] },
  });

  let mediaComp;
  let countComp;

  if (!mediaResponse.ok) {
    mediaComp = (
      <>
        <div className="opacity-50 flex items-center gap-2">
          <div className="w-40 h-8 rounded border dark:bg-stone-800" />
          <div className="w-22 h-8 rounded border dark:bg-stone-800" />
        </div>
        <NoCardsFoundPlaceholder mediaResponse={mediaResponse} />
      </>
    );
  } else {
    const { content: media, page }: MediaResponsePageable =
      await mediaResponse.json();

    mediaComp = (
      <>
        <div className="w-full flex justify-between items-center gap-2">
          <MediaFileCheckbox />
          <MediaFilesSorting />
        </div>
        <MediaPagination {...page} />
        <div className="w-full grid grid-cols-3 items-center gap-2">
          {media.length === 0 &&
            Array.from({ length: 3 }).map((_, i) => (
              <MediaFileCardGhost key={i} />
            ))}
          {media.map(({ ...props }) => (
            <MediaFileCard key={props.publicId} props={props} />
          ))}
        </div>
        <MediaPagination {...page} />
      </>
    );
  }

  if (!countResponse.ok) {
    countComp = <h2 className="text-xl flex items-center">Arquivos</h2>;
  } else {
    const count = await countResponse.json();
    countComp = (
      <h2 className="text-xl flex items-center">
        Arquivo{count > 1 && "s"}: {count}
      </h2>
    );
  }

  return (
    <section className="flex flex-col items-start justify-center gap-2">
      {countComp}
      {mediaComp}
    </section>
  );
}
