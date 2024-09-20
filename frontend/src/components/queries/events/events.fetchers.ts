import { useApi } from "../../../api/api";
import { useEventsStore } from "../../../context/events/events.context";

export const EventsFetcher = () => {
  const { api } = useApi();

  const fetch = async ({
    pageParam,
    params,
  }: {
    pageParam: any;
    params: URLSearchParams;
  }) => {
    const response = await api.get(
      `api/events/?page=${pageParam}${params ? "&" + params.toString() : ""}`
    );

    const jsonResponse = await JSON.parse(
      JSON.stringify(response.data.results)
    );
    console.log("response", jsonResponse);
    const next = new URL(response.data.next);

    return { data: jsonResponse, nextPage: next.searchParams.get("page") };
  };

  return { fetch };
};

export const EventFetcher = () => {
  const { api } = useApi();

  const fetch = async ({ eventId }: { eventId: string }) => {
    const response = await api.get(`api/events/${eventId}/`);
    const jsonResponse = await JSON.parse(JSON.stringify(response.data));
    return jsonResponse;
  };

  return { fetch };
};

export const EventMutationFetcher = () => {
  const { api } = useApi();
  const fetch = async (data: any) => {
    const response = await api.put(`api/events/${data.eventId}/`, data.event);

    const jsonResponse = await JSON.parse(JSON.stringify(response.data));
    console.log("response", jsonResponse);

    return jsonResponse;
  };

  return { fetch };
};

export const EventFilterFetcher = () => {
  const { api } = useApi();

  const { datemin, datemax, cats, tags } = useEventsStore(
    (state) => state.filter
  );

  const params = new URLSearchParams();

  if (datemin) {
    // convert date to string in yyyy-mm-dd format
    params.append("datemin", datemin.toISOString().split("T")[0]);
  }
  if (datemax) {
    // convert date to string in yyyy-mm-dd format
    params.append("datemax", datemax.toISOString().split("T")[0]);
  }
  if (cats.length > 0) params.append("cats", cats.join(","));
  if (tags.length > 0) params.append("tags", tags.join(","));

  const fetch = async () => {
    const response = await api.get(`api/events/?${params.toString()}`);
    console.log("pohohohoh", response.data.results);
    const jsonResponse = await JSON.parse(
      JSON.stringify(response.data.results)
    );
    console.log("response", jsonResponse);
    return jsonResponse;
  };

  return { fetch };
};
