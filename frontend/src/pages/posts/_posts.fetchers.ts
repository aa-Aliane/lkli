import { useApi } from "../../api/api";
import { usePostsStore } from "./_posts.context";

export const useGetBooksFetcher = () => {
  const { api } = useApi();
  const { setPostsState } = usePostsStore();
  const fetch = async () => {
    console.log("fetching books");
    const response = await api.get("/posts");

    setPostsState(
      response.data.map((post: any) => ({
        changed: false,
        text: { body: post.body, title: post.title },
        originalText: { body: post.body, title: post.title },
      }))
    );

    return response.data;
  };

  return { fetch };
};
