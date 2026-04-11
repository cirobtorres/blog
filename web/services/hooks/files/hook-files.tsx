import { useQuery } from "@tanstack/react-query";
import { getFilesAction } from "./actions";

export function useFilesWithCount(
  currentModalFolder: string = "",
  page: number = 0,
) {
  return useQuery({
    queryKey: ["media-files", currentModalFolder, page],
    queryFn: () => getFilesAction(currentModalFolder, page),
    staleTime: 1000 * 60 * 5, // 5 min
  });
}
