import { useEventsQuery } from "./events.queries";

export const EventsHook = () => {
  const { data, status } = useEventsQuery();

  return { data, status };
};
