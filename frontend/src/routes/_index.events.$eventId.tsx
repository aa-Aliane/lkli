import { createFileRoute } from "@tanstack/react-router";
import { Event } from "../components/interface/Event/index.ts";

export const Route = createFileRoute("/_index/events/$eventId")({
  component: () => <Event />,
  loader: async ({ params }) => {
    const { eventId } = params;
    return {
      eventId,
    };
  },
});
