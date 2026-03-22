import Image from "next/image";
import { cn, focusRing } from "../../../utils/variants";
import { Checkbox } from "../../Fieldset/Checkbox";
import { Button } from "../../Buttons";
import Link from "next/link";
import { DashedBackground } from "../../DashedBackground";
import { MediaPagination } from "./MediaPagination";
import { Popover, PopoverContent, PopoverTrigger } from "../../Popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Select";
import { apiServerUrls } from "../../../config/routes";
import DeleteMediaButton from "./DeleteMediaButton";
import EditMediaButton from "./EditMediaButton";

export async function MediaFileCards({
  accessToken,
}: {
  accessToken?: string;
}) {
  const mediaResponse = await fetch(apiServerUrls.media.root, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!mediaResponse.ok) {
    return <NoCardsFoundPlaceholder mediaResponse={mediaResponse} />;
  }

  const {
    content: media,
    totalElements,
    totalPages,
    first,
    last,
    number: currentPage,
    sort,
  }: MediaResponsePageable = await mediaResponse.json();

  const pageControl = {
    first,
    last,
    currentPage,
    totalPages,
  };

  return (
    <section className="flex flex-col items-start justify-center gap-2">
      <h2 className="text-xl flex items-center">
        Arquivos &#40;{totalElements}&#41;
      </h2>
      <MediaFilesHeader sort={sort} />
      <MediaPagination {...pageControl} />
      <div className="w-full grid grid-cols-3 items-center gap-2">
        {media.map(({ ...props }) => (
          <MediaFileCard key={props.publicId} props={props} />
        ))}
      </div>
      <MediaPagination {...pageControl} />
    </section>
  );
}

const MediaFilesHeader = ({ sort }: { sort: MediaSort }) => (
  <div className="flex items-center gap-2">
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-40 h-8">
          Mais recentes{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className=""
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="rounded"></PopoverContent>
    </Popover>
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-22 h-8">
          Filtros{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className=""
          >
            <path d="M2 5h20" />
            <path d="M6 12h12" />
            <path d="M9 19h6" />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Select>
          <SelectTrigger className="w-full flex-1">
            <SelectValue placeholder="createdAt" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="createdAt">createdAt</SelectItem>
            <SelectItem value="updatedAt">updatedAt</SelectItem>
            <SelectItem value="type">type</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full flex-1">
            <SelectValue placeholder="is" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="is">is</SelectItem>
            <SelectItem value="isNot">is not</SelectItem>
            <SelectItem value="isGreaterThan">is greater than</SelectItem>
            <SelectItem value="isGreaterThanOrEqualTo">
              is greater than or equal to
            </SelectItem>
            <SelectItem value="isLowerThan">is lower than</SelectItem>
            <SelectItem value="isLowerThanOrEqualTo">
              is lower than or equal to
            </SelectItem>
          </SelectContent>
        </Select>
        <Button variant="link" className="h-9.5">
          Adicionar filtros
        </Button>
      </PopoverContent>
    </Popover>
  </div>
);

const MediaFileCard = ({
  props,
  isPriority = false,
}: {
  props: CloudinaryServer;
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
          <DeleteMediaButton id={props.id} />
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

const ExpandButton = ({ url }: { url: string }) => (
  <Link
    href={url}
    target="_blank"
    className={cn(
      "outline-none select-none size-8 p-2 border cursor-pointer rounded bg-clip-padding inline-flex items-center justify-center transition-all duration-300 shrink-0 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800 hover:border-stone-400 dark:hover:border-stone-600 focus-visible:border-primary dark:focus-visible:border-primary",
      focusRing,
    )}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  </Link>
);

const DownloadButton = () => (
  <Button variant="outline" className="size-8 not-dark:shadow-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className=""
    >
      <path d="M12 15V3" />
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
    </svg>
  </Button>
);
