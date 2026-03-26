import { useQuery } from "@tanstack/react-query";
import { listAllFolders } from "../services/media/listAllFolders";

export function useFolders() {
  return useQuery({
    queryKey: ["folders"],
    queryFn: async () => {
      return await listAllFolders();
    },
  });
}
