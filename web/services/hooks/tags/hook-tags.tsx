import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getTags from "../../tag/getTags";
import createTag from "../../tag/createTag";
import deleteTag from "../../tag/deleteTag";

const TAGS_REVALIDATE_TIME = 60 * 60 * 24 * 7; // 1 week

export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: async (): Promise<PageableTag> => {
      return await getTags();
    },
    staleTime: TAGS_REVALIDATE_TIME,
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
