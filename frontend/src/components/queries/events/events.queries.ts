import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryFilters,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  EventsFetcher,
  EventFetcher,
  EventMutationFetcher,
} from "./events.fetchers";
import { useEventsStore } from "../../../context/events/events.context";
import { set } from "zod";

export const useEventsQuery = ({ params }: { params: URLSearchParams }) => {
  const { fetch } = EventsFetcher();
  const { setEvents } = useEventsStore();

  return useInfiniteQuery({
    queryKey: ["events"],
    queryFn: async ({ pageParam }) => {
      const data = await fetch({ pageParam, params });
      console.log("helooooo", data);
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
