import React from "react";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  containerClass?: string;
  extraChildren: React.ReactNode;
}

const Card = (props: IProps) => {
  const { containerClass, children, extraChildren, ...otherProps } = props;
  return (
    <div className={containerClass}>
      <div className="card__tags">{extraChildren}</div>
      <div {...otherProps}>{children}</div>
    </div>
  );
};

export default Card;
