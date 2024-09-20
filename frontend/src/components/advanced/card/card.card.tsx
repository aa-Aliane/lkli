import React from "react";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {}

const Card = (props: IProps) => {
  const { children, ...otherProps } = props;
  return <div {...otherProps}>{children}</div>;
};

export default Card;
