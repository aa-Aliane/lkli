import React from "react";
import { dialog } from "../../basic/dialog";
import { IDialogProps } from "../../basic/dialog/dialog";
import { Button } from "../../basic/buttons";
import { useCommentsMutation } from "../feed/queries/comments/queries";

interface IProps extends IDialogProps {
  toDelete: number | null;
  handleCloseDialog: () => void;
}
const DeleteDialog = (props: IProps) => {
  const { toDelete, handleCloseDialog, ...otherProps } = props;

  const { deleteCommentMutate } = useCommentsMutation();

  const handleDeleteComment = () => {
    deleteCommentMutate({ commentId: toDelete });
    handleCloseDialog();
  };

  return (
    <dialog.Dialog {...otherProps}>
      <dialog.Body className="dialog--quick__delete">
        <Button onClick={handleDeleteComment} className="btn">
          Supprimer
        </Button>
        <Button onClick={handleCloseDialog} className="btn">
          Annuler
        </Button>
      </dialog.Body>
    </dialog.Dialog>
  );
};

export default DeleteDialog;
