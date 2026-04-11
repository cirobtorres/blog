import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import listFolders from "../../media/listFolders";
import createFolder from "../../media/createFolder";
import editFolder from "../../media/editFolder";
import { getFoldersAction } from "./actions";

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
    queryFn: () => getFoldersAction(currentModalFolder),
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
