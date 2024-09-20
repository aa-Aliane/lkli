import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useCommentsFetcher } from "./fetchers";

export const useCommentsMutation = () => {
  const {
    fetchPostComment,
    fetchPostResponse,
    fetchDeleteComment,
    fetchGetResponses,
    fetch,
  } = useCommentsFetcher();

  const queryClient = useQueryClient();

  const { mutate: postCommentMutate } = useMutation({
    mutationKey: ["comments"],
    mutationFn: ({ eventId, comment }: any) =>
      fetchPostComment({ eventId, comment }),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      }),
  });

  const { mutate: postResponseMutate } = useMutation({
    mutationKey: ["comments"],
    mutationFn: ({ parentId, comment }: any) => {
      return fetchPostResponse({ parentId, comment });
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      }),
  });

  const { mutate: deleteCommentMutate } = useMutation({
    mutationKey: ["comments"],
    mutationFn: ({ commentId }: any) => fetchDeleteComment({ commentId }),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      }),
  });

  const { data: responses, mutate: getResponsesMutate } = useMutation({
    mutationKey: ["responses"],
    mutationFn: ({ parentIds }: any) => fetchGetResponses({ parentIds }),
    onSuccess: (data) => {
      console.log("dataaaaa ", data);
      queryClient.setQueryData(["responses"], data);
    },
  });

  const { data: comments_with_count } = useQuery({
    queryKey: ["comments"],
    queryFn: fetch,
  });

  return {
    postCommentMutate,
    postResponseMutate,
    deleteCommentMutate,
    comments_with_count,
    responses,
    getResponsesMutate,
  };
};
