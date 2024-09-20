import React, { useState } from "react";
import { bhf } from "../../basic/bhf";
import { list } from "../../basic/list";
import { Heart } from "../../../assets/icons";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  comments: any;
}

const Response = (props: IProps) => {
  const { comments, ...otherProps } = props;

  return (
    <bhf.Body {...otherProps}>
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
              </div>
            </div>
          </list.Item>
        ))}
      </list.List>
    </bhf.Body>
  );
};

export default Response;
