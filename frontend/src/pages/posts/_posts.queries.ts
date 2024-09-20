import { useGetBooksFetcher } from "./_posts.fetchers";
import { useQuery } from "@tanstack/react-query";
import { usePostsStore } from "./_posts.context";

export const useGetBooksQuery = () => {
  const { fetch } = useGetBooksFetcher();

  return useQuery({
    queryKey: ["authors"],
    queryFn: fetch,
  });
};
