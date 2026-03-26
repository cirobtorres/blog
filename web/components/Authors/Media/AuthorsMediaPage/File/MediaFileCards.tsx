import { DashedBackground } from "../../../../DashedBackground";
import MediaPagination from "./MediaPagination";
import { apiServerUrls } from "../../../../../routing/routes";
import { Skeleton } from "../../../../Skeleton";
import MediaFileCard from "./MediaFileCard";
import MediaFileCheckbox from "./MediaFileCheckbox";
import { MediaFilesSorting } from "./MediaFilesSorting";

export default async function MediaFileCards({
  accessToken,
  searchParams,
}: {
  accessToken?: string;
  searchParams?: { page?: string; size?: string; folder?: string };
}) {
  const currentPage = searchParams?.page || "0";
  const currentFolder = searchParams?.folder || "Home";

  const mediaResponse = await fetch(
    `${apiServerUrls.media.root}?page=${currentPage}&folder=${currentFolder}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    },
  );

  const countResponse = await fetch(
    apiServerUrls.media.count + "?folder=Home",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    },
  );

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
            Array.from({ length: 3 }).map((_, i) => <MediaFileGhost key={i} />)}
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
      <h2 className="text-xl flex items-center">Arquivos &#40;{count}&#41;</h2>
    );
  }

  return (
    <section className="flex flex-col items-start justify-center gap-2">
      {countComp}
      {mediaComp}
    </section>
  );
}

const MediaFileGhost = () => (
  <DashedBackground className="opacity-50 w-full max-w-100 h-65 flex flex-col shrink-0 items-center overflow-hidden transition-border duration-300 rounded-lg border not-dark:shadow bg-stone-200 dark:bg-stone-900"></DashedBackground>
);

const NoCardsFoundPlaceholder = ({
  mediaResponse,
}: {
  mediaResponse: Response;
}) => (
  <div className="w-full max-w-xl mx-auto opacity-50 mt-4 min-h-80 rounded-xl border grid grid-rows-[40px_1fr] overflow-hidden">
    <div className="w-full h-full border-b flex items-center justify-start px-3 gap-2 dark:bg-stone-800">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="size-2 rounded-full dark:bg-white" />
      ))}
    </div>
    <div className="w-full h-full flex flex-col justify-center items-center gap-2 px-10 dark:bg-stone-900">
      <strong className="text-7xl">{mediaResponse.status}</strong>
      {mediaResponse.statusText && (
        <div className="px-10">
          <p className="text-xl text-center line-clamp-3">
            {mediaResponse.statusText}
          </p>
        </div>
      )}
    </div>
  </div>
);

export const MediaFileCardsLoading = async () => (
  <section className="flex flex-col items-start justify-center gap-2">
    <h2 className="text-xl flex items-center">
      Arquivos &#40;{<Skeleton className="size-6" />}&#41;
    </h2>
    <div className="w-full flex justify-between items-center gap-2">
      <div className="flex items-center gap-2">
        <Skeleton className="size-7" />
        <Skeleton className="w-14 h-6" />
        <Skeleton className="w-30 h-8" />
        <Skeleton className="w-30 h-8" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="w-40 h-8" />
        <Skeleton className="w-22 h-8" />
      </div>
    </div>
    <div className="w-full flex justify-center items-center gap-1">
      <Skeleton className="w-20 h-8" />
      <Skeleton className="size-8" />
      <Skeleton className="size-8" />
      <Skeleton className="size-8" />
      <Skeleton className="w-20 h-8" />
    </div>
    <div className="w-full grid grid-cols-3 items-center gap-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton
          key={index}
          className="w-full max-w-100 h-65 shrink-0 overflow-hidden rounded-lg not-dark:shadow"
        />
      ))}
    </div>
  </section>
);
