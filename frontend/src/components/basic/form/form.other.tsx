import React from "react";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {}

const Other = (props: IProps) => {
  const { children } = props;
  return <>{children}</>;
};

export default Other;
