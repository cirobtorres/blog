import Image from "next/image";
import { Checkbox } from "../../../../Fieldset/Checkbox";
import { DashedBackground } from "../../../../DashedBackground";
import MediaPagination from "./MediaPagination";
import { apiServerUrls } from "../../../../../routing/routes";
import { Button } from "../../../../Button";
import DeleteMediaButton from "./DeleteMediaButton";
import EditMediaButton from "./EditMediaButton";
import { Skeleton } from "../../../../Skeleton";
import { ExpandButton } from "./ExpandButton";
import { DownloadButton } from "./Download";
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
          <MediaFilesMutation />
          <MediaFilesSorting />
        </div>
        <MediaPagination {...page} />
        <div className="w-full grid grid-cols-3 items-center gap-2">
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

// TODO (incomplete): selectedFiles = files selected with the checkbox
const MediaFilesMutation = ({
  selectedFiles = 0,
}: {
  selectedFiles?: number;
}) => (
  <div className="flex items-center gap-2">
    <label htmlFor="files-select-all">
      <Checkbox id="files-select-all" className="size-6" />
    </label>
    <div className="flex items-center gap-2 [&_span]:text-sm [&_span]:text-nowrap [&_span]:text-neutral-600 dark:[&_span]:text-neutral-500">
      <span>
        {selectedFiles != 1
          ? selectedFiles + " arquivos"
          : selectedFiles + " arquivo"}
      </span>
    </div>
    <Button variant="destructive" disabled className="h-8 w-full max-w-30">
      Excluir
    </Button>
    <Button variant="link" disabled className="h-8 w-full max-w-30">
      Mover
    </Button>
  </div>
);

const MediaFileCard = ({
  props,
  isPriority = false,
}: {
  props: Media;
  isPriority?: boolean;
}) => (
  <article className="w-full max-w-100 h-65 flex flex-col shrink-0 items-center overflow-hidden transition-border duration-300 rounded-lg border hover:border-primary not-dark:shadow bg-stone-200 dark:bg-stone-900 hover:bg-stone-150 dark:hover:bg-stone-850 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-stone-300 dark:has-data-[state=checked]:bg-stone-850 focus-within:border-primary dark:focus-within:border-primary dark:focus-within:bg-stone-850 group">
    <div className="w-full h-full grid grid-rows-[1fr_calc(28px+24px+4px+16px+1px)]">
      <div className="relative">
        <label
          htmlFor={"card-" + props.publicId}
          className="relative w-full h-full overflow-hidden"
        >
          <DashedBackground />
          <Checkbox
            id={"card-" + props.publicId}
            className="absolute z-10 size-6 rounded left-2 top-2"
          />
          <Image
            src={props.url ?? "https://placehold.co/1920x1080/000/fff/jpeg"}
            alt={props.name || "Media file"}
            fill
            priority={isPriority}
            loading={isPriority ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="absolute object-contain p-px"
          />
        </label>
        <div className="absolute top-2 right-2 flex items-center gap-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-has-data-[state=checked]:opacity-100">
          {props.url && <ExpandButton url={props.url} />}
          <DownloadButton />
          <EditMediaButton {...props} />
          <DeleteMediaButton {...props} />
        </div>
      </div>
      <div className="w-full flex justify-between items-center gap-2 p-2 border-t">
        <div className="w-full h-full flex flex-col justify-start gap-1">
          <span className="h-7 flex-1 text-xs leading-3.5 line-clamp-2 mb-auto mt-0 text-neutral-900 dark:text-neutral-100">
            {props.name}
          </span>
          <div className="flex justify-between items-center gap-1">
            <span className="text-xs font-bold text-neutral-500">
              {props.type}
              {props.type === "IMAGE" &&
                " - " + props.width + "x" + props.height}
            </span>
            <span className="text-xs px-2 py-1 rounded font-bold transition-[colors,background-color] duration-300 dark:text-neutral-500 dark:bg-stone-800 dark:group-hover:bg-stone-750 dark:group-has-data-[state=checked]:bg-stone-750">
              {props.type}
            </span>
          </div>
        </div>
      </div>
    </div>
  </article>
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
