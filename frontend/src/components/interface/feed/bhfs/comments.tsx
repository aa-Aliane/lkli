import React from "react";
import { Button } from "../../../basic/buttons";
import { bhf } from "../../../basic/bhf";
import { list } from "../../../basic/list";
import { useCommentsMutation } from "../queries/comments/queries";
import { useLoaderData, useRouter } from "@tanstack/react-router";
import { Heart } from "../../../../assets/icons";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {}

const commentsBHF = (props: IProps) => {
  // Destructure and spread the remaining props
  const { ...otherProps } = props;

  // Extract eventId from the loader data
  const { eventId } = useLoaderData({ from: "/comments/$eventId" });

  // Router instance
  const router = useRouter();

  // Fetch comments with count using mutation hook
  const { comments_with_count } = useCommentsMutation();

  // Retrieve comments for the given eventId
  const comments: any = comments_with_count?.comments[eventId]
    ? comments_with_count?.comments[eventId]
    : [];

  return (
    <bhf.BHF {...otherProps}>
      {/* ============================
          Header with Back Button
          ============================ */}
      <bhf.Header>
        <Button
          className="btn btn--naked"
          icon={
            <span className="material-symbols-outlined">arrow_left_alt</span>
          }
          onClick={() => router.history.back()}
        />
      </bhf.Header>

      {/* ============================
          Body with Comments List
          ============================ */}
      <bhf.Body>
        <list.List className="comments">
          {/* Iterate over each comment */}
          {comments.map((comment: any) => (
            <list.Item className="comment" key={comment.id}>
              {/* Comment Author Section */}
              <div className="comment__author">
                <img
                  className="profile--picture"
                  src={comment.author.profile_picture}
                  alt=""
                />
              </div>
              <div className="comment__block">
                <div className="comment__content">
                  {/* Comment Content */}

                  <p>
                    <span>{comment.author.username} </span>
                    {comment.content}
                  </p>
                </div>
                {/* Comment Date */}
                <div className="comment__actions">
                  <p className="ff-secondary">{comment.time_ago}</p>
                  <div className="comment__actions__likes">
                    <p className="ff-secondary">2,650</p>
                    <Heart height={12} />
                  </div>
                  <div className="comment__actions__response">
                    <p>Répondre</p>
                  </div>
                </div>
                <div className="comment__responses">
                  <div>
                    <span className="mr-0">___</span> Afficher les réponses (
                    <span className="ff-secondary">5</span>)
                  </div>
                </div>
              </div>
            </list.Item>
          ))}
        </list.List>
      </bhf.Body>
    </bhf.BHF>
  );
};

export default commentsBHF;
