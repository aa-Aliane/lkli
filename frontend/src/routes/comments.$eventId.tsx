import { createFileRoute } from "@tanstack/react-router";
import { comments } from "../components/interface/comments";
import { useState } from "react";
import { useCommentsMutation } from "../components/interface/feed/queries/comments/queries";
import { useAccountQuery } from "../api/queries/accountQueries";

const Index = () => {
  const { data: currentAccount } = useAccountQuery();
  const { postCommentMutate, postResponseMutate } = useCommentsMutation();
  const [newComment, setNewComment] = useState<string>("");
  // response subject
  const [responseSubject, setResponseSubject] = useState<any>(null);
  // delete dialogs props
  const [toDelete, setToDelete] = useState<number | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const handleChangeComment = (e: any) => {
    e.preventDefault();
    setNewComment(e.target.value);
  };

  // Function to handle posting a comment
  const handlePostComment = (e: any, eventId: string) => {
    e.preventDefault();

    const comment = newComment;
    // Clear the comment
    setNewComment("");
    // Post the comment

    if (responseSubject?.id) {
      postResponseMutate({
        parentId: responseSubject.id,
        comment,
      });
    } else
      postCommentMutate({
        eventId,
        comment,
      });
  };

  const handleOpenDeleteDialog = (commentId: number) => {
    console.log("what the heck");
    setToDelete(commentId);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setToDelete(null);
    setOpenDeleteDialog(false);
  };

  const handleSetResponseSubject = (comment: any) =>
    setResponseSubject(comment);

  const footerProps = {
    newComment,
    responseSubject,
    handleChangeComment,
    handlePostComment,
    cancelResponse: () => setResponseSubject(null),
  };

  const bodyProps = {
    toDelete,
    open: openDeleteDialog,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleSetResponseSubject,
  };

  return (
    <comments.Block>
      <comments.Header />
      <comments.Body {...bodyProps} />
      {!!currentAccount?.id ? (
        <comments.Footer className="comments__footer" {...footerProps} />
      ) : (
        <p>{currentAccount?.id}</p>
      )}
    </comments.Block>
  );
};

export const Route = createFileRoute("/comments/$eventId")({
  component: () => <Index />,
  loader: async ({ params }) => {
    const { eventId } = params;
    return {
      eventId,
    };
  },
});
