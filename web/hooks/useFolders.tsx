import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import listFolders from "../services/media/listFolders";
import createFolder from "../services/media/createFolder";
import editFolder from "../services/media/editFolder";

export function useFolders() {
  return useQuery({
    queryKey: ["folders"],
    queryFn: async () => {
      const data = await listFolders();
      return data;
    },
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
