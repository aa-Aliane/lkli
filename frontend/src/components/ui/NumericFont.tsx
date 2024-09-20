import React from "react";

interface IProps extends React.ComponentPropsWithoutRef<"p"> {}

const NumericFont = (props: IProps) => {
  const { children, className, ...otherProps } = props;

  return (
    <p className={`ff-secondary ${className ? className : ""}`} {...otherProps}>
      {children}
    </p>
  );
};

export default NumericFont;
