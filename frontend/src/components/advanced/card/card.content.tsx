import React from "react";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {}
const Content = (props: IProps) => {
  const { children, ...otherProps } = props;
  return <div {...otherProps}>{children}</div>;
};

export default Content;
