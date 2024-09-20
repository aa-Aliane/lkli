import React from "react";
import { bhf } from "../../basic/bhf";
import { Button } from "../../basic/buttons";
import { useLoaderData } from "@tanstack/react-router";
import { useAccountQuery } from "../../../api/queries/accountQueries";
import { Textarea } from "../../basic/inputs";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  newComment: string;
  responseSubject: any;
  handleChangeComment: (e: any) => void;
  handlePostComment: (e: any, eventId: string) => void;
  cancelResponse: () => void;
}

const Footer = (props: IProps) => {
  const { data: currentAccount } = useAccountQuery();
  const { eventId } = useLoaderData({ from: "/comments/$eventId" });
  const {
    newComment,
    responseSubject,
    handleChangeComment,
    handlePostComment,
    cancelResponse,
    ...otherProps
  } = props;

  return (
    <bhf.Footer {...otherProps}>
      {responseSubject ? (
        <div className="comment__new--subject">
          <p>
            Répondre à{" "}
            <span className="author">{responseSubject.author.username}</span>
          </p>
          <Button
            className="btn btn--naked"
            icon={<span className="material-symbols-outlined">close</span>}
            onClick={cancelResponse}
          />
        </div>
      ) : null}
      <div className="comment__new-container">
        <div className="comment__new">
          <div className="comment__author">
            <img
              className="profile--picture"
              src={currentAccount?.profile_picture}
              alt=""
            />
          </div>
          <Textarea
            placeholder="entrez un commentaire"
            cols={0}
            rows={1}
            value={newComment}
            handleChangeValue={handleChangeComment}
          />
          <Button
            className="btn btn--variant-1"
            icon={
              <span className="material-symbols-outlined">
                arrow_upward_alt
              </span>
            }
            onClick={(e: any) => handlePostComment(e, eventId)}
          />
        </div>
      </div>
    </bhf.Footer>
  );
};

export default Footer;
