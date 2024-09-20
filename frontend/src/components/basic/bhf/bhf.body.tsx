import React from "react";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {}

const Body = (props: IProps) => {
  const { className, children, ...otherProps } = props;
  return (
    <div className={className} {...otherProps}>
      {children}
    </div>
  );
};

export default Body;
