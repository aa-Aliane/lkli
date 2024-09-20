import React from "react";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {}

const Body = (props: IProps) => {
  const { children, ...otherProps } = props;
  return <div {...otherProps}>{children}</div>;
};

export default Body;
