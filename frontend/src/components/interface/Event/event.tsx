import { useState, useRef } from "react";
import { useLoaderData } from "@tanstack/react-router";
import { useEventQuery } from "../../queries/events/events.queries";
import { list } from "../../basic/list";
import Artist from "./event.artist";
import Header from "./event.header";
import Description from "./event.description";
import Reservation from "./event.reservation";

const Event = () => {
  // Extract eventId from the loader data
  const { eventId } = useLoaderData({ from: "/_index/events/$eventId" });

  // Fetch event data using custom hook
  const { data, status, error } = useEventQuery({ eventId });

  // State to manage the toggle state of artist bio
  const [toggleBio, setToggleBio] = useState<Boolean>(false);

  // Refs for event list container and artist bio section
  const eventRef = useRef<HTMLUListElement | null>(null);
  const bioRef = useRef<HTMLLIElement | null>(null);

  // Handler to toggle artist bio and scroll to it smoothly
  const handleToggleBio = (e: any) => {
    e.preventDefault();
    setToggleBio(!toggleBio);

    // Scroll to bio section if it's being toggled open
    if (!toggleBio) {
      eventRef.current?.scrollTo({
        top: 500,
        behavior: "smooth",
      });
    }
  };

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
