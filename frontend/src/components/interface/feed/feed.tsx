import React, { useEffect, useState } from "react";
import { card } from "../../advanced/card";
import { list } from "../../basic/list";
import {
  useEventsQuery,
  useEventMutation,
} from "../../queries/events/events.queries";
import { useEventsStore } from "../../../context/events/events.context";
import { useWindowSize } from "@uidotdev/usehooks";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "@tanstack/react-router";
import SubheaderMB from "../../mobile/home/subheader";

const Tags = ({ tags }: any) => {
  return (
    <list.List className="list--hz">
      {tags?.map((tag: any, index: number) => (
        <list.Item
          key={tag.id}
          className={`list--hz__item clr-tags-${(index + 1) * 100}`}
        >
          {tag.name}
        </list.Item>
      ))}
    </list.List>
  );
};

const Feed = () => {
  const [distance, setDistance] = useState(45);

  const { mutate: mutateEvent } = useEventMutation();

  const { urlParams: params } = useEventsStore();

  const {
    data: events,
    status,
    fetchNextPage,
    isFetchingNextPage,
  } = useEventsQuery({
    params,
  });

  const ws = useWindowSize();

  const handleEventUpVotes = (index: number) => {
    const event = events[index];
    const data = {
      eventId: event.id,
      event: {
        name: event.name,
        description: event.description,
        date: event.date,
        time: event.time,
        lat: event.lat,
        lng: event.lng,
        votes: event.votes + 1,
      },
    };
    mutateEvent(data);
  };
  const handleEventDownVotes = (index: number) => {
    const event = events[index];
    const data = {
      eventId: event.id,
      event: {
        name: event.name,
        description: event.description,
        date: event.date,
        time: event.time,
        lat: event.lat,
        lng: event.lng,
        votes: event.votes - 1,
      },
    };
    mutateEvent(data);
  };

  const navigate = useNavigate({ from: "/events" });

  const handleOpenEvent = (url: string) => {
    navigate({ to: `/events/${url}` });
  };

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div>
      {/* <Distance {...distanceProps} /> */}
      <div className="cards-container">
        {events?.pages.map((page: any) => (
          <>
            {page.data.map((event: any) => (
              <card.Card
                key={event.id}
                className="card"
                containerClass="card-container"
                extraChildren={Tags({ tags: event.tags })}
              >
                <card.Header
                  username={event.creator.username}
                  avatar={event.creator.profile_picture}
                  location={event.region.name}
                  className="card__header"
                />
                <card.Content
                  description={event.description}
                  name={event.name}
                  img={event.image}
                  className="card__content"
                  onClick={() => handleOpenEvent(event.id)}
                />
                <card.Footer
                  votes={event.votes}
                  handleUpVotes={() => handleEventUpVotes(index)}
                  handleDownVotes={() => handleEventDownVotes(index)}
                  className="card__footer"
                  comments={event.comments}
                  date={event.date}
                />
                {ws.width < 400 && (
                  <card.Header
                    date={event.date}
                    username={event.creator.username}
                    avatar={event.creator.profile_picture}
                    location={event.region.name}
                    className="card__header"
                  />
                )}
              </card.Card>
            ))}
            <div ref={ref} className="sdsd">
              {isFetchingNextPage && <div className="loader"></div>}
            </div>
          </>
        ))}

        {!events && <div>{status}</div>}
      </div>
      {ws.width < 400 && <SubheaderMB />}
    </div>
  );
};

export default Feed;
