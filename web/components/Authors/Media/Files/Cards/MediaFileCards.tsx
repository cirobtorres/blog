import { FileProvider } from "../../../../../providers/FileProvider";
import { apiServerUrls } from "../../../../../routing/routes";
import MediaFileCardsClient from "./MediaFileCardsClient";

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

  return (
    <FileProvider>
      <section className="flex flex-col items-start justify-center gap-2">
        <h2 className="text-xl flex items-center">
          Arquivo{count > 1 && "s"}: {count}
        </h2>
        <MediaFileCardsClient {...mediaPromise} />
      </section>
    </FileProvider>
  );
}
