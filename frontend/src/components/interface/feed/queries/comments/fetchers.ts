import { useApi } from "../../../../../api/api";

export const useCommentsFetcher = () => {
  const { api } = useApi();

  const fetchPostComment = async ({ eventId, comment }: any) => {
    await api.post("/api/comments/", {
      event: eventId,
      content: comment,
    });
  };

  const fetchPostResponse = async ({ parentId, comment }: any) => {
    await api.post("/api/comments/", {
      comment: parentId,
      content: comment,
    });
  };

  const fetchDeleteComment = async ({ commentId }: any) => {
    await api.delete(`/api/comments/${commentId}/`);
  };

  const fetchGetResponses = async ({ parentIds }: any) => {
    const response = await api.post("/api/comments/by_parent_ids/", {
      parentIds,
    });
    return response.data;
  };

  const fetch = async () => {
    const response = await api.get("/api/comments-by-event/");
    console.log("comments with counts", response.data);
    return response.data;
  };

  return {
    fetchPostComment,
    fetchDeleteComment,
    fetchPostResponse,
    fetchGetResponses,
    fetch,
  };
};
