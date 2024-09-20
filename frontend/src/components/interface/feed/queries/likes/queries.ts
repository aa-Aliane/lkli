import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLikesFetcher } from "./fetchers";

export const useLikesMutation = () => {
  const { fetchLike, fetchLikeComment, fetchDislike, fetch } =
    useLikesFetcher();

  const queryClient = useQueryClient();

  const { mutate: likeMutate } = useMutation({
    mutationKey: ["likes"],
    mutationFn: ({ accountId, eventId }: any) =>
      fetchLike({ accountId, eventId }),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["likes"],
      }),
  });

  const { mutate: likeCommentMutate } = useMutation({
    mutationKey: ["likes"],
    mutationFn: ({ accountId, commentId }: any) =>
      fetchLikeComment({ accountId, commentId }),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      }),
  });

  const { mutate: dislikeMutate } = useMutation({
    mutationKey: ["likes"],
    mutationFn: ({ likeId }: any) => fetchDislike({ likeId }),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["likes"],
      }),
  });

  const { mutate: dislikeCommentMutate } = useMutation({
    mutationKey: ["likes"],
    mutationFn: ({ likeId }: any) => fetchDislike({ likeId }),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      }),
  });

  const { data: likes_with_count } = useQuery({
    queryKey: ["likes"],
    queryFn: fetch,
  });

  return {
    likeMutate,
    likeCommentMutate,
    dislikeMutate,
    dislikeCommentMutate,
    likes_with_count,
  };
};
