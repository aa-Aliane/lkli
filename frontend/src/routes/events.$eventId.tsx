import { createFileRoute } from "@tanstack/react-router";
import { Event } from "../components/interface/Event";

export const Route = createFileRoute("/events/$eventId")({
  component: () => <Event />,
  loader: async ({ params }) => {
    const { eventId } = params;
    return {
      eventId,
    };
  },
});
