import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@tanstack/react-query";

// Components and UI elements
import { card } from "../../advanced/card";
import { Button } from "../../basic/buttons";
import { Textarea } from "../../basic/inputs";
import SubheaderMB from "../../mobile/home/subheader";
import { Heart, Comment, Location } from "../../../assets/icons";

// Queries and mutations
import { useEventsQuery } from "./queries/events/events.queries";
import { useLikesMutation } from "./queries/likes/queries";
import { useCommentsMutation } from "./queries/comments/queries";

// Contexts and Dialogs
import { useEventsStore } from "../../../context/events/events.context";

const Feed = () => {
  // URL parameters for fetching events
  const { urlParams: params } = useEventsStore();

  // Query to fetch events with pagination
  const {
    data: events,
    status,
    fetchNextPage,
    isFetchingNextPage,
  } = useEventsQuery({ params });

  // Query to fetch current account details
  const { data: currentAccount } = useQuery({ queryKey: ["account"] });

  // Mutations for handling likes
  const { likeMutate, dislikeMutate, likes_with_count } = useLikesMutation();

  // Mutations for handling comments
  const { postCommentMutate, comments_with_count } = useCommentsMutation();

  // Hook for handling infinite scroll
  const { ref, inView } = useInView();

  // Local state for new comment
  const [newComment, setNewComment] = useState<string>("");

  // Effect to fetch next page of events when in view
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  // Navigation hook
  const navigate = useNavigate({ from: "/events" });

  // Function to handle navigation to event details page
  const handleOpenEvent = (url: string) => {
    navigate({ to: `/events/${url}` });
  };

  // Function to handle liking an event
  const handleLikeEvent = (event: any) => {
    if (currentAccount) {
      const like = likes_with_count?.likes
        ? likes_with_count?.likes[event.id]?.find(
            (l) => l.author === currentAccount?.id
          )
        : null;

      console.log("check like ", like, likes_with_count.likes, event.id);

      if (like) {
        dislikeMutate({ likeId: like.id });
      } else {
        likeMutate({ accountId: currentAccount?.id, eventId: event?.id });
      }
    } else {
      navigate({ to: "/signin" });
    }
  };

  // Function to handle posting a comment
  const handlePostComment = (e: any, event: any) => {
    e.preventDefault();

    const comment = newComment;
    // Clear the comment
    setNewComment("");
    // Post the comment
    console.log("comment to post author's", currentAccount?.id);
    postCommentMutate({
      accountId: currentAccount?.id,
      eventId: event.id,
      comment,
    });
  };

  return (
    <div>
      <div className="cards-container">
        {events?.pages.map((page) => (
          <React.Fragment key={page.id}>
            {/* Iterate over each event in the page */}
            {page.data.map((event: any) => (
              <card.Wrapper className="event--card-wrapper" key={event.id}>
                {/* ============================
                Event Card - Profile Section
                ============================ */}
                <card.Card className="event--subcard">
                  <div className="event--subcard__profile">
                    {/* Profile Picture */}
                    <img
                      className="profile--picture"
                      src={event.creator.profile_picture}
                      alt="author-profile-picture"
                    />
                    {/* Creator Username */}
                    <p>{event.creator.username}</p>
                  </div>
                  {/* Event Date */}
                  <p className="event--subcard__date">{event.date}</p>
                </card.Card>

                {/* ============================
                Main Event Card - Content
                ============================ */}
                <card.Card className="event--card">
                  <card.Content
                    className="event--card__content"
                    onClick={() => handleOpenEvent(event.id)}
                  >
                    {/* Event Description */}
                    <p className="description">{event.description}</p>
                    <div>
                      {/* Event Name */}
                      <p className="name">{event.name}</p>
                    </div>
                    {/* Event Image */}
                    <img src={event.image} alt="img" />
                  </card.Content>
                </card.Card>

                {/* ============================
                Event Card - Likes and Comments
                ============================ */}
                <card.Card className="event--subcard">
                  <div className="event--subcard__likes">
                    {/* Like Button */}
                    <Button
                      data-liked={
                        !!currentAccount &&
                        likes_with_count?.likes?.[event.id]?.some(
                          (like: any) => like.author === currentAccount?.id
                        )
                      }
                      className="btn--headless"
                      icon={
                        <Heart
                          className="heart"
                          height={20}
                          onClick={() => handleLikeEvent(event)}
                        />
                      }
                    />
                    {/* Likes Count */}
                    <p>
                      {likes_with_count?.count[event.id]
                        ? likes_with_count?.count[event.id]
                        : 0}
                    </p>
                  </div>
                  <div
                    className="event--subcard__comments"
                    onClick={(e: any) =>
                      navigate({ to: `/comments/${event.id}` })
                    }
                  >
                    {/* Comments Button */}
                    <Button
                      className="btn--headless"
                      icon={<Comment height={20} />}
                    />
                    {/* Comments Count */}
                    <p>
                      {comments_with_count?.count[event.id]
                        ? comments_with_count?.count[event.id]
                        : 0}
                    </p>
                  </div>
                  <div className="flex flex--center">
                    {/* Event Location */}
                    <Location height={20} />
                    {event && <p>{event?.region.name}</p>}
                  </div>
                </card.Card>

                {/* ============================
                Event Card - New Comment
                ============================ */}
                <card.Card className="event--subcard">
                  <div className="event--subcard__new-comment">
                    {/* Current Account Profile Picture */}
                    <img
                      src={currentAccount?.profile_picture}
                      alt="account picture"
                      className="profile--picture"
                    />
                    {/* New Comment Textarea */}
                    <Textarea
                      placeholder="entrez un commentaire"
                      cols={0}
                      rows={1}
                      value={newComment}
                      handleChangeValue={(event: any) =>
                        setNewComment(event.target.value)
                      }
                    />
                    {/* Post Comment Button */}
                    <Button
                      className="btn btn--variant-1"
                      icon={
                        <span className="material-symbols-outlined">
                          arrow_upward_alt
                        </span>
                      }
                      onClick={(e: any) => handlePostComment(e, event)}
                    />
                  </div>
                </card.Card>
              </card.Wrapper>
            ))}

            {/* ============================
            Loader for Fetching Next Page
            ============================ */}
            <div ref={ref}>
              {isFetchingNextPage && <div className="loader"></div>}
            </div>
          </React.Fragment>
        ))}
        {/* ============================
        No Events Display
        ============================ */}
        {!events && <div>{status}</div>}
      </div>

      {/* ============================
      Subheader Component
      ============================ */}
      <SubheaderMB />
    </div>
  );
};

export default Feed;
