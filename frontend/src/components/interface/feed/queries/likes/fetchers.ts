import { useApi } from "../../../../../api/api";

export const useLikesFetcher = () => {
  const { api } = useApi();

  const fetchLike = async ({ accountId, eventId }: any) => {
    await api.post("/api/likes/", {
      author: accountId,
      event: eventId,
      comment: null,
    });
  };

  const fetchLikeComment = async ({ accountId, commentId }: any) => {
    await api.post("/api/likes/", {
      comment: commentId,
      event: null,
    });
  };

  const fetchDislike = async ({ likeId }: any) => {
    await api.delete(`/api/likes/${likeId}/`);
  };

  const fetch = async () => {
    const response = await api.get("/api/likes-by-event/");
    console.log("likes with counts", response.data);
    return response.data;
  };

  return { fetchLike, fetchLikeComment, fetchDislike, fetch };
};
