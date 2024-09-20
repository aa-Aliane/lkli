import React from "react";

interface IProps extends React.ComponentPropsWithRef<"li"> {}

const Item = (props: IProps) => {
  const { children, ...otherProps } = props;
  return <li {...otherProps}>{children}</li>;
};

export default Item;
