import React, { useEffect, useState } from "react";
import { bhf } from "../../basic/bhf";
import { list } from "../../basic/list";
import { Heart } from "../../../assets/icons";
import { useLoaderData } from "@tanstack/react-router";
import { useCommentsMutation } from "../feed/queries/comments/queries";
import Response from "./comments.response";
import { useLikesMutation } from "../feed/queries/likes/queries";
import { Button } from "../../basic/buttons";
import DeleteDialog from "./comment.delete";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  toDelete: number | null;
  open: boolean;
  handleOpenDeleteDialog: (commentId: number) => void;
  handleCloseDeleteDialog: () => void;
  handleSetResponseSubject: (comment: any) => any;
}

const Body = (props: IProps) => {
  const {
    toDelete,
    open,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleSetResponseSubject,
    ...otherProps
  } = props;
  // Extract eventId from the loader data
  const { eventId } = useLoaderData({ from: "/comments/$eventId" });

  // Fetch comments with count using mutation hook
  const { comments_with_count, responses, getResponsesMutate } =
    useCommentsMutation();

  const { likeCommentMutate, dislikeCommentMutate } = useLikesMutation();

  // Retrieve comments for the given eventId
  const comments: any = comments_with_count?.comments[eventId]
    ? comments_with_count?.comments[eventId]
    : [];

  const [parentIds, setParentIds] = useState<number[]>([]);

  useEffect(() => {
    if (parentIds) {
      getResponsesMutate({ parentIds });
    }
  }, [parentIds]);

  const handleSetParentIds = (commentId: number) => {
    if (parentIds.includes(commentId)) {
      setParentIds(parentIds.filter((id) => id !== commentId));
    } else {
      setParentIds([...parentIds, commentId]);
    }
  };

  const handleLikeComment = (comment: any) => {
    if (!!comment.is_liked) {
      dislikeCommentMutate({ likeId: comment.is_liked.id });
    } else {
      likeCommentMutate({ commentId: comment.id });
    }
  };

  return (
    <bhf.Body {...otherProps}>
      <list.List className="comments comments--original">
        {/* Iterate over each comment */}
        {comments.map((comment: any, index: number) => (
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
                <p className="ff-secondary" title={comment.date}>
                  {comment.time_ago}
                </p>
                <div className="comment__actions__likes">
                  <p className="ff-secondary">{comment.count_likes}</p>
                  <div className="heart" data-liked={!!comment.is_liked}>
                    <Heart
                      height={12}
                      onClick={() => handleLikeComment(comment)}
                    />
                  </div>
                </div>
                <div
                  className="comment__actions__response"
                  onClick={() => handleSetResponseSubject(comment)}
                >
                  <p>Répondre</p>
                </div>
                <Button
                  className="btn btn--naked"
                  icon={
                    <span className="material-symbols-outlined">delete</span>
                  }
                  onClick={() => handleOpenDeleteDialog(comment.id)}
                />
              </div>
              <div className="comment__responses">
                {comment.count_responses && !responses?.[comment.id] ? (
                  <div onClick={() => handleSetParentIds(comment.id)}>
                    <span className="mr-0">___</span> Afficher les réponses (
                    <span className="ff-secondary">
                      {comment.count_responses}
                    </span>
                    )
                  </div>
                ) : null}
                {comment.count_responses && responses?.[comment.id] ? (
                  <div onClick={() => handleSetParentIds(comment.id)}>
                    <span className="mr-0">___</span> Masquer les réponses
                  </div>
                ) : null}

                <div className="responses-container">
                  {comment.count_responses && responses?.[comment.id] ? (
                    <Response comments={responses[comment.id]} />
                  ) : null}
                </div>
              </div>
            </div>
          </list.Item>
        ))}
      </list.List>
      <DeleteDialog
        className="dialog--quick"
        handleCloseDialog={handleCloseDeleteDialog}
        open={open}
        toDelete={toDelete}
      />
    </bhf.Body>
  );
};

export default Body;
