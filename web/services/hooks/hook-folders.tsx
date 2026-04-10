import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import listFolders from "../media/listFolders";
import createFolder from "../media/createFolder";
import editFolder from "../media/editFolder";
import { apiServerUrls } from "../../routing/routes";
import { clientFetch } from "../auth-fetch-client";

export function useFolders() {
  return useQuery({
    queryKey: ["folders"],
    queryFn: async (): Promise<SelectFolder[]> => {
      return await listFolders();
    },
  });
}

export function useFoldersWithCount(currentModalFolder: string = "") {
  return useQuery({
    queryKey: ["media-folders", currentModalFolder],
    queryFn: async () => {
      const options: RequestInit = {
        credentials: "include",
      };

      const getUrl = `${apiServerUrls.mediaFolders.root}?folder=${currentModalFolder}`;
      const countUrl = `${apiServerUrls.mediaFolders.count}?folder=${currentModalFolder}`;

      const [folders, count] = await Promise.all([
        clientFetch(getUrl, options)
          .then((res) => (res.ok ? (res.json() as Promise<Folder[]>) : []))
          .catch((e) => {
            console.error(e);
            return [];
          }),
        clientFetch(countUrl, options)
          .then((res) => (res.ok ? (res.json() as Promise<number>) : 0))
          .catch((e) => {
            console.error(e);
            return 0;
          }),
      ]);

      return { folders, count };
    },
    staleTime: 1000 * 60 * 5, // 5 min
  });
}

export function useCreateFolder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      prevState,
      formData,
    }: {
      prevState: ActionState;
      formData: FormData;
    }) => createFolder(prevState, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
}

export function useEditFolder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      prevState,
      formData,
    }: {
      prevState: ActionState;
      formData: FormData;
    }) => editFolder(prevState, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
}
