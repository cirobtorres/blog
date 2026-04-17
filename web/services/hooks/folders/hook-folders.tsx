import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import listFolders from "../../media/listFolders";
import createFolder from "../../media/createFolder";
import editFolder from "../../media/editFolder";
import { getFoldersAction } from "./actions";

const FOLDERS_REVALIDATE_TIME = 60 * 60 * 24 * 7; // 1 week

export function useFolders() {
  return useQuery({
    queryKey: ["folders"],
    queryFn: async (): Promise<SelectFolder[]> => {
      return await listFolders();
    },
    staleTime: FOLDERS_REVALIDATE_TIME,
  });
}

export function useFoldersWithCount(currentModalFolder: string = "") {
  return useQuery({
    queryKey: ["media-folders", currentModalFolder],
    queryFn: () => getFoldersAction(currentModalFolder),
    staleTime: FOLDERS_REVALIDATE_TIME,
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
