import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryFilters,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import {
  EventsFetcher,
  EventFetcher,
  EventMutationFetcher,
} from "./events.fetchers";

// Define the data types
interface Data {
  data: any;
  nextPage: string | null;
}

interface FetchResponse {
  data: Data;
}

export const useEventsQuery = ({ params }: { params: URLSearchParams }) => {
  const { fetch } = EventsFetcher();

  return useInfiniteQuery({
    queryKey: ["events"],
    queryFn: async ({ pageParam = 0 }: any) => {
      const data = await fetch({ pageParam, params });
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

export const useEventQuery = ({ eventId }: { eventId: string }) => {
  const { fetch } = EventFetcher();
  return useQuery({
    queryKey: ["event", eventId],
    queryFn: async () => {
      const data = await fetch({ eventId });
      return data;
    },
  });
};

export const useFilterMutation = () => {
  const { fetch } = EventsFetcher();

  const queryClient = useQueryClient();

  const { status, data, mutate } = useMutation({
    mutationKey: ["events"],
    mutationFn: () => fetch(),
    onSuccess: () => {
      const filters: QueryFilters = {
        queryKey: ["events"],
      };
      queryClient.invalidateQueries(filters);
    },
  });

  return {
    data,
    status,
    mutate,
  };
};

export const useEventMutation = () => {
  const { fetch } = EventMutationFetcher();

  const queryClient = useQueryClient();

  const { status, data, mutate } = useMutation({
    mutationKey: ["events"],
    mutationFn: (data: any) => fetch(data),
    onSuccess: () => {
      const filters: QueryFilters = {
        queryKey: ["events"],
      };
      queryClient.invalidateQueries(filters);
    },
  });

  return {
    data,
    status,
    mutate,
  };
};
