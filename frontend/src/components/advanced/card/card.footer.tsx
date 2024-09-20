import React from "react";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  handleUpVotes: any;
  handleDownVotes: any;
  comments: number;
  votes: number;
  date: string;
}
const Footer = (props: IProps) => {
  const {
    comments,
    votes,
    handleUpVotes,
    handleDownVotes,
    date,
    ...otherProps
  } = props;
  return (
    <div {...otherProps}>
      <div className="votes">
        <p className="votes__up">
          <span className="material-symbols-outlined" onClick={handleUpVotes}>
            straight
          </span>
        </p>
        <p>{votes}</p>
        <p className="votes__down">
          <span className="material-symbols-outlined" onClick={handleDownVotes}>
            straight
          </span>
        </p>
      </div>
      <p className="comments">
        <span className="material-symbols-outlined">comment</span>
        {comments}
      </p>
      <p>{date}</p>
    </div>
  );
};

export default Footer;
