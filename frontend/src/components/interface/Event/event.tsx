import { useRef } from "react";
import { useLoaderData } from "@tanstack/react-router";
import { useEventQuery } from "../feed/queries/events/events.queries";
import { list } from "../../basic/list";
import Header from "./event.header";
import Description from "./event.description";

const Event = () => {
  // Extract eventId from the loader data
  const { eventId } = useLoaderData({ from: "/events/$eventId" });

  // Fetch event data using custom hook
  const { data  } = useEventQuery({ eventId });

  // Refs for event list container and artist bio section
  const eventRef = useRef<HTMLUListElement | null>(null);

  return (
    // Main event list container
    <list.List className="event flex flex--column gap-2" ref={eventRef}>
      {/* Event header section */}
      <list.Item className="event__header">
        <Header {...{ data }} />
      </list.Item>

      {/* Event description section */}
      <list.Item className="event__description">
        <Description {...{ data }} />
      </list.Item>
    </list.List>
  );
};

export default Event;
