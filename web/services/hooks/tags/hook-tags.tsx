import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getTags from "../../tag/getTags";
import createTag from "../../tag/createTag";
import deleteTag from "../../tag/deleteTag";

export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: async (): Promise<PageableTag> => {
      return await getTags();
    },
  });
}

export function useCreateTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      prevState,
      formData,
    }: {
      prevState: ActionState;
      formData: FormData;
    }) => createTag(prevState, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
}

export function useDeleteTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ tagId }: { tagId: string }) => deleteTag(tagId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
}
