import { useQuery } from "@tanstack/react-query";
import { getFilesAction } from "./actions";

const FILES_REVALIDATE_TIME = 60 * 60 * 24 * 7; // 1 week

export function useFilesWithCount(
  currentModalFolder: string = "",
  page: number = 0,
) {
  return useQuery({
    queryKey: ["media-files", currentModalFolder, page],
    queryFn: () => getFilesAction(currentModalFolder, page),
    staleTime: FILES_REVALIDATE_TIME,
  });
}
