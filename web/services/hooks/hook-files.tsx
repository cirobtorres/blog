import { useQuery } from "@tanstack/react-query";
import { apiServerUrls } from "../../routing/routes";
import { clientFetch } from "../auth-fetch-client";

export function useFilesWithCount(
  currentModalFolder: string = "",
  page: number = 0,
) {
  return useQuery({
    queryKey: ["media-files", currentModalFolder, page],
    queryFn: async () => {
      const options: RequestInit = {
        credentials: "include",
      };

      const defaultData = {
        content: [],
        page: {
          size: 20,
          number: 0,
          totalElements: 0,
          totalPages: 0,
        },
      };

      const getUrl = `${apiServerUrls.media.root}?folder=${currentModalFolder}&page=${page}&size=20`; // TODO: size
      const countUrl = `${apiServerUrls.media.count}?folder=${currentModalFolder}`;

      const [data, count] = await Promise.all([
        clientFetch(getUrl, options)
          .then((res) =>
            res.ok
              ? (res.json() as Promise<MediaResponsePageable>)
              : defaultData,
          )
          .catch((e) => {
            console.error(e);
            return defaultData;
          }),
        clientFetch(countUrl, options)
          .then((res) => (res.ok ? (res.json() as Promise<number>) : 0))
          .catch((e) => {
            console.error(e);
            return 0;
          }),
      ]);

      return { files: data, count };
    },
    staleTime: 1000 * 60 * 5, // 5 min
  });
}
